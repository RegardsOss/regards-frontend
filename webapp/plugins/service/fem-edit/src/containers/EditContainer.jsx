/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { AccessShapes, DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { CatalogClient } from '@regardsoss/client'
import { themeContextType } from '@regardsoss/theme'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { BasicSignalSelectors, BasicSignalsSelectors } from '@regardsoss/store-utils'
import withRequestsClient from './withRequestsClient'
import withModelAttributesClient from './withModelAttributesClient'
import EditComponent from '../components/EditComponent'

/**
 * Main fem-edit plugin container
 * @author C-S
 */
export class EditContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, props) {
    const { modelAttributesClient, editClient } = props
    return {
      modelAttributeList: modelAttributesClient.selectors.getResult(state),
      error: editClient.selectors.getError(state),
      isFetching: editClient.selectors.isFetching(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component methods to interact with the store
   */
  static mapDispatchToProps(dispatch, props) {
    const { modelAttributesClient, editClient } = props
    return {
      editFeatures: (searchContext) => dispatch(editClient.actions.update(searchContext)),
      fetchModelAttributes: (searchContext) => dispatch(modelAttributesClient.actions.getCommonModelAttributes(searchContext)),
    }
  }

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    target: AccessShapes.PluginTarget.isRequired,
    pluginInstanceId: PropTypes.string.isRequired,
    // Connected client to use to delete features on fem
    editClient: PropTypes.shape({
      actions: PropTypes.instanceOf(CatalogClient.FEMFeatureRequestsActions),
      selectors: PropTypes.instanceOf(BasicSignalsSelectors),
    }).isRequired,
    modelAttributesClient: PropTypes.shape({
      actions: PropTypes.instanceOf(CatalogClient.SearchEntitiesCommonModelAttributesActions),
      selectors: PropTypes.instanceOf(BasicSignalSelectors),
    }).isRequired,
    // From mapDispatchToProps
    editFeatures: PropTypes.func.isRequired,
    fetchModelAttributes: PropTypes.func.isRequired,
    // form mapStatesToprops
    error: PropTypes.shape({
      hasError: PropTypes.bool.isRequired,
    }).isRequired,
    isFetching: PropTypes.bool.isRequired,
    modelAttributeList: DataManagementShapes.AttributeModelArray,
  }

  static contextTypes = {
    // enable plugin theme access through this.context
    ...themeContextType,
    // enable i18n access through this.context
    ...i18nContextType,
  }

  state = {
    isLoading: true,
  }

  componentDidMount() {
    const { searchContext } = this.props.target
    this.props.fetchModelAttributes(searchContext).then(() => {
      // Ignore error, just play attributes
      this.setState({
        isLoading: false,
      })
    })
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

  cancel = () => {
    this.props.onClose()
  }

  onSubmit = ({ properties }) => {
    const { searchContext } = this.props.target
    this.props.editFeatures({
      searchRequest: searchContext,
      feature: { properties },
    })
  }

  render() {
    const { target: { entitiesCount }, modelAttributeList } = this.props
    const { isLoading } = this.state
    return (

      <LoadableContentDisplayDecorator
        isLoading={isLoading}
      >
        <EditComponent
          onSubmit={this.onSubmit}
          attributeModelList={modelAttributeList}
          onCancel={this.cancel}
          pluginInstanceId={this.props.pluginInstanceId}
          entitiesCount={entitiesCount}
        />
      </LoadableContentDisplayDecorator>
    )
  }
}

// Connect clients to props and retrieve injected clients as props
export default withModelAttributesClient(withRequestsClient(
  // REDUX connected container
  connect(EditContainer.mapStateToProps, EditContainer.mapDispatchToProps)(EditContainer),
))
