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
import compose from 'lodash/fp/compose'
import { DataManagementShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { withModuleStyle } from '@regardsoss/theme'
import messages from '../../i18n'
import { modelAttributesActions, modelAttributesSelectors } from '../../clients/ModelAttributesClient'
import { modelSelectors, modelActions } from '../../clients/ModelClient'
import OSResultsConfigurationComponent, { OSResultsConfiguration } from '../../components/opensearch/results/OSResultsConfigurationComponent'
import styles from '../../styles'

/**
 * Container for OpenSearch crawler results conversion configuration component
 * @author Maxime Bouveron
 */
export class OSResultsConfigurationContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      modelList: modelSelectors.getList(state),
      modelAttributeList: modelAttributesSelectors.getList(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      fetchModelAttributeList: (modelName) => dispatch(modelAttributesActions.fetchEntityList({ modelName })),
      flushModelAttribute: () => dispatch(modelAttributesActions.flush()),
      fetchModelList: () => dispatch(modelActions.fetchEntityList({}, { type: 'DATA' })),
    }
  }

  static propTypes = {
    initialValues: OSResultsConfiguration.isRequired,
    onBack: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    isEditing: PropTypes.bool.isRequired,
    // from mapStateToProps
    modelList: DataManagementShapes.ModelList.isRequired,
    modelAttributeList: DataManagementShapes.ModelAttributeList.isRequired,
    // from mapDispatchToProps
    fetchModelAttributeList: PropTypes.func.isRequired,
    flushModelAttribute: PropTypes.func.isRequired,
    fetchModelList: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const promises = [this.props.fetchModelList(), this.props.flushModelAttribute()]
    if (this.props.initialValues) {
      promises.push(this.props.fetchModelAttributeList(this.props.initialValues.modelName))
    }
    Promise.all(promises)
  }

  handleModelChange = (modelName) => {
    this.props.fetchModelAttributeList(modelName)
  }

  render() {
    const {
      onBack, onSubmit, isEditing, initialValues,
      modelAttributeList, modelList,
    } = this.props
    return (
      <I18nProvider messages={messages}>
        <OSResultsConfigurationComponent
          onSubmit={onSubmit}
          onBack={onBack}
          isEditing={isEditing}
          modelList={modelList}
          initialValues={initialValues}
          modelAttributeList={modelAttributeList}
          onModelSelected={this.handleModelChange}
        />
      </I18nProvider>
    )
  }
}
export default compose(
  connect(OSResultsConfigurationContainer.mapStateToProps, OSResultsConfigurationContainer.mapDispatchToProps),
  withModuleStyle(styles))(OSResultsConfigurationContainer)
