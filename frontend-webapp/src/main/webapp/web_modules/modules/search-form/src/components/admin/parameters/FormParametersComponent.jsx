/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { LazyModuleComponent, modulesManager } from '@regardsoss/modules'
import { AccessShapes, DataManagementShapes } from '@regardsoss/shape'
import ModuleConfiguration from '../../../models/ModuleConfiguration'
/**
 * Component to display search results parameters
 * @author Sébastien binda
 */
class FormParametersComponent extends React.Component {

  static propTypes = {
    project: PropTypes.string.isRequired,
    appName: PropTypes.string.isRequired,
    adminForm: PropTypes.shape({
      changeField: PropTypes.func,
      form: ModuleConfiguration,
    }),
    attributes: AccessShapes.AttributeConfigurationArray,
    attributesRegroupements: AccessShapes.AttributesGroupConfigurationArray,
    selectableAttributes: DataManagementShapes.AttributeModelList,
    resultType: PropTypes.string,
  }

  render() {
    const moduleConf = {
      attributesConf: this.props.attributes,
      attributesRegroupementsConf: this.props.attributesRegroupements,
      selectableAttributes: this.props.selectableAttributes,
      resultType: this.props.resultType,
      hideDatasetsConfiguration: false,
    }

    const module = {
      type: modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS,
      active: true,
      applicationId: this.props.appName,
      conf: moduleConf,
    }

    return (
      <LazyModuleComponent
        project={this.props.project}
        appName={this.props.appName}
        module={module}
        admin
        adminForm={this.props.adminForm}
      />
    )
  }

}

export default FormParametersComponent
