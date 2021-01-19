/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import find from 'lodash/find'
import { connect } from '@regardsoss/redux'
import { DataManagementShapes } from '@regardsoss/shape'
import { modelAttributesSelectors, modelAttributesActions } from '../clients/ModelAttributesClient'
import ModelAttributeComponent from '../components/ModelAttributeComponent'
import { modelAttributeComputationTypesSelectors } from '../clients/ModelAttributeComputationTypesClient'

export class ModelAttributeContainer extends React.Component {
  static propTypes = {
    shouldDisplayHeader: PropTypes.bool,
    // eslint-disable-next-line react/no-unused-prop-types
    attribute: DataManagementShapes.AttributeModel,
    // from mapStateToProps
    modelAttribute: DataManagementShapes.ModelAttribute,
    modelAttributeComputationType: DataManagementShapes.ModelAttributeComputationTypes,
    // from mapDispatchToProps
    updateModelAttribute: PropTypes.func,
  }

  handleComputationUpdate = (computationConfId) => {
    let updatedModelAttribute
    if (computationConfId) {
      const computationPluginConf = find(this.props.modelAttributeComputationType.content.pluginConfigurations, (pluginConfiguration) => (
        pluginConfiguration.content.id === computationConfId
      ))
      updatedModelAttribute = { ...this.props.modelAttribute.content, computationConf: computationPluginConf.content }
    } else {
      updatedModelAttribute = { ...this.props.modelAttribute.content, computationConf: null }
    }
    return this.props.updateModelAttribute(this.props.modelAttribute.content.id, updatedModelAttribute, updatedModelAttribute.model.name)
  }

  render() {
    const { modelAttribute, modelAttributeComputationType, shouldDisplayHeader } = this.props
    if (modelAttribute) {
      return (
        <ModelAttributeComponent
          pluginConfigurationList={modelAttributeComputationType.content.pluginConfigurations}
          pluginMetaDataList={modelAttributeComputationType.content.pluginMetaDatas}
          modelAttribute={modelAttribute}
          handleComputationUpdate={this.handleComputationUpdate}
          shouldDisplayHeader={shouldDisplayHeader}
        />
      )
    }
    return null
  }
}

const mapStateToProps = (state, ownProps) => ({
  modelAttribute: modelAttributesSelectors.getByAttributeModelId(state, ownProps.attribute.content.id),
  modelAttributeComputationType: modelAttributeComputationTypesSelectors.getById(state, ownProps.attribute.content.type),
})

const mapDispatchToProps = (dispatch) => ({
  updateModelAttribute: (id, values, modelName) => dispatch(modelAttributesActions.updateEntity(id, values, { modelName })),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModelAttributeContainer)
