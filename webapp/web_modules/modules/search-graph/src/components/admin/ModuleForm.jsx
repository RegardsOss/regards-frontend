/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import { i18nContextType } from '@regardsoss/i18n'
import { Tabs, Tab } from 'material-ui/Tabs'
import { DataManagementShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { FieldArray } from '@regardsoss/form-utils'
import { ModulePaneStateField } from '@regardsoss/modules-api'
import { Title } from '@regardsoss/components'
import { MainAttributesConfigurationComponent } from '@regardsoss/attributes-common'
import ModuleConfiguration from '../../model/ModuleConfiguration'
import SelectedLevelFormRender from './SelectedLevelFormRender'
import SearchResultForm from './SearchResultForm'

/**
* Module form component for admin instance
*/
class ModuleForm extends React.Component {
  static propTypes = {
    project: PropTypes.string,
    appName: PropTypes.string.isRequired,
    adminForm: PropTypes.shape({
      currentNamespace: PropTypes.string,
      isCreating: PropTypes.bool,
      isDuplicating: PropTypes.bool,
      isEditing: PropTypes.bool,
      changeField: PropTypes.func,
      form: ModuleConfiguration,
    }),
    // values pool as fetched and normalized
    collectionModels: DataManagementShapes.ModelList.isRequired,
    // attributes that user can display on datasets
    selectableAttributes: DataManagementShapes.AttributeModelList,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    this.LEVELS_FIELD_NAME = `${props.adminForm.currentNamespace}.graphLevels`
    this.DATASET_ATTRIBUTES_FIELD_NAME = `${props.adminForm.currentNamespace}.graphDatasetAttributes`
  }

  validateSelectedLevels = selectedLevels => isEmpty(selectedLevels) ? 'search.graph.levels.selection.none.selected.error' : null

  render() {
    const {
      collectionModels, appName, project, adminForm, selectableAttributes,
    } = this.props
    const { intl: { formatMessage } } = this.context
    const { currentNamespace } = adminForm
    const formConf = get(adminForm.form, currentNamespace)
    const currentAttributesConfiguration = formConf && formConf.graphDatasetAttributes ? formConf.graphDatasetAttributes : []
    return (
      <Tabs>
        <Tab label={formatMessage({ id: 'search.graph.configuration.tab' })}>
          <ModulePaneStateField currentNamespace={currentNamespace} />
          <Title
            level={3}
            label={formatMessage({ id: 'search.graph.configuration.levels.message' })}
          />
          <FieldArray
            name={this.LEVELS_FIELD_NAME}
            component={SelectedLevelFormRender}
            validate={this.validateSelectedLevels}
            collectionModels={collectionModels}
          />
          <Title
            level={3}
            label={formatMessage({ id: 'search.graph.configuration.attributes.message' })}
          />
          <MainAttributesConfigurationComponent
            allowFacettes={false}
            allowAttributesRegroupements={false}
            attributesFieldName={this.DATASET_ATTRIBUTES_FIELD_NAME}
            attributesConf={currentAttributesConfiguration}
            selectableAttributes={selectableAttributes}
            changeField={adminForm.changeField}
          />
        </Tab>
        <Tab label={formatMessage({ id: 'search.graph.results.tab' })}>
          <SearchResultForm
            appName={appName}
            project={project}
            adminForm={adminForm}
          />
        </Tab>
      </Tabs>
    )
  }
}
export default ModuleForm
