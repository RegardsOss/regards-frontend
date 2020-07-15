/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { connect } from '@regardsoss/redux'
import { AccessShapes } from '@regardsoss/shape'
import Subheader from 'material-ui/Subheader'
import RaisedButton from 'material-ui/RaisedButton'
import DeleteIcon from 'mdi-material-ui/Delete'
import { i18nContextType } from '@regardsoss/i18n'
import { CatalogClient } from '@regardsoss/client'
import { themeContextType } from '@regardsoss/theme'
import withClient from './withClient'

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
  static mapStateToProps(state, { notifyClient }) {
    return {
      error: notifyClient.selectors.getError(state),
      isFetching: notifyClient.selectors.isFetching(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch, { notifyClient }) {
    return {
      renotifyFeatures: (searchContext) => dispatch(notifyClient.actions.notify(searchContext)),
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
    // From mapDispatchToProps
    renotifyFeatures: PropTypes.func.isRequired,
    // form mapStatesToprops
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

  componentDidUpdate(previousProps) {
    // detect change
    if (this.props.error.hasError !== previousProps.error.hasError || this.props.isFetching !== previousProps.isFetching) {
      // close the popup when the fetch is done and there is no error
      if (!this.props.error.hasError && !this.props.isFetching) {
        this.props.onClose()
      }
    }
  }

  notifyFem = () => {
    const { searchContext } = this.props.target
    this.props.renotifyFeatures(searchContext)
  }

  cancel = () => {
    this.props.onClose()
  }

  render() {
    const { intl: { formatMessage }, moduleTheme } = this.context
    const { entitiesCount } = this.props.target
    return (
      <div style={moduleTheme.body}>
        <Subheader>{formatMessage({ id: 'plugin.title' })}</Subheader>
        <div style={moduleTheme.contentWrapper}>
          {formatMessage({ id: 'plugin.message' }, { nbElement: entitiesCount })}
          {formatMessage({ id: 'plugin.question' })}
          <div style={moduleTheme.buttonsWrapper}>
            <RaisedButton
              label={formatMessage({ id: 'plugin.cancel' })}
              onClick={this.cancel}
            />
            <RaisedButton
              label={formatMessage({ id: 'plugin.valid' })}
              primary
              onClick={this.notifyFem}
              icon={<DeleteIcon />}
            />
          </div>
        </div>
      </div>
    )
  }
}
// Connect clients and retrieve them as props
export default withClient(
  // REDUX connected container
  connect(NotifyContainer.mapStateToProps, NotifyContainer.mapDispatchToProps)(NotifyContainer),
)
