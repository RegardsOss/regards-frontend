/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import { connect } from '@regardsoss/redux'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { i18nContextType } from '@regardsoss/i18n'
import { AccessShapes, NotifierShapes } from '@regardsoss/shape'
import { CatalogClient, NotifierClient } from '@regardsoss/client'
import { themeContextType } from '@regardsoss/theme'
import withClient from './withClient'
import withRecipientsClient from './withRecipientsClient'
import NotifyComponent from '../components/NotifyComponent'

/**
 * Main fem-notify plugin container
 * @author C-S
 */
export class NotifyContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { notifyClient, recipientsClient }) {
    return {
      error: notifyClient.selectors.getError(state),
      isFetching: notifyClient.selectors.isFetching(state),
      recipientList: recipientsClient.selectors.getResult(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch, { notifyClient, recipientsClient }) {
    return {
      renotifyFeatures: (searchContext, recipientList) => dispatch(notifyClient.actions.notify(searchContext, recipientList)),
      fetchRecipients: () => dispatch(recipientsClient.actions.fetchRecipients()),
    }
  }

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    target: AccessShapes.PluginTarget.isRequired,
    // Connected client to use to delete features on fem
    notifyClient: PropTypes.shape({
      actions: PropTypes.instanceOf(CatalogClient.FEMFeatureRequestsActions),
      selectors: PropTypes.func.isRequired,
    }).isRequired,
    recipientsClient: PropTypes.shape({
      actions: PropTypes.instanceOf(NotifierClient.RecipientsActions),
      selectors: PropTypes.func.isRequired,
    }).isRequired,
    // From mapDispatchToProps
    renotifyFeatures: PropTypes.func.isRequired,
    fetchRecipients: PropTypes.func.isRequired,
    // form mapStatesToprops
    recipientList: NotifierShapes.RecipientList,
    error: PropTypes.shape({
      hasError: PropTypes.bool.isRequired,
    }).isRequired,
    isFetching: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    // enable plugin theme access through this.context
    ...themeContextType,
    // enable i18n access through this.context
    ...i18nContextType,
  }

  UNSAFE_componentWillMount() {
    const { fetchRecipients } = this.props
    fetchRecipients()
  }

  componentDidUpdate(previousProps) {
    // detect change
    if (this.props.error.hasError !== previousProps.error.hasError || this.props.isFetching !== previousProps.isFetching) {
      // close the popup when the fetch is done and there is no error
      if (!this.props.error.hasError && !this.props.isFetching) {
        this.props.onClose()
      }
    }
  }

  onNotifyRecipients = (recipients) => {
    const { renotifyFeatures, onClose } = this.props
    const { searchContext } = this.props.target
    let recipientIds = []
    if (!isEmpty(recipients)) {
      recipientIds = map(recipients, (recipient) => recipient.businessId)
    }
    renotifyFeatures(searchContext, recipientIds).then((actionResult) => {
      if (!actionResult.error) {
        onClose()
      }
    })
  }

  render() {
    const { recipientList, isFetching } = this.props
    return (
      <LoadableContentDisplayDecorator
        isLoading={isFetching}
      >
        <NotifyComponent
          recipientList={recipientList}
          onNotifyRecipients={this.onNotifyRecipients}
        />
      </LoadableContentDisplayDecorator>
    )
  }
}
// Connect clients and retrieve them as props
export default withClient(withRecipientsClient(
  // REDUX connected container
  connect(NotifyContainer.mapStateToProps, NotifyContainer.mapDispatchToProps)(NotifyContainer),
))
