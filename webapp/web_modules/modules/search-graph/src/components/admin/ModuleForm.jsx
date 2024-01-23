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
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import { Tabs, Tab } from 'material-ui/Tabs'
import { DamDomain } from '@regardsoss/domain'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { FieldArray, FormPresentation, FieldsGroup } from '@regardsoss/form-utils'
import { ModulePaneStateField } from '@regardsoss/modules-api'
import { AttributesListConfigurationComponent } from '@regardsoss/attributes-common'
import ModuleConfiguration from '../../shapes/ModuleConfiguration'
import SelectedLevelFormRender from './levels/SelectedLevelFormRender'
import SearchResultForm from './SearchResultForm'

/**
 * Module form component for admin instance
 * @author Raphaël Mechali
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

  /** Validate selected levels in form */
  static validateSelectedLevels(selectedLevels) {
    return isEmpty(selectedLevels) ? 'search.graph.levels.selection.none.selected.error' : null
  }

  constructor(props) {
    super(props)
    this.LEVELS_FIELD_NAME = `${props.adminForm.currentNamespace}.graphLevels`
    this.DATASET_ATTRIBUTES_FIELD_NAME = `${props.adminForm.currentNamespace}.graphDatasetAttributes`
  }

  render() {
    const {
      collectionModels, appName, project, adminForm, selectableAttributes,
    } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <Tabs>
        <Tab label={formatMessage({ id: 'search.graph.configuration.tab' })}>
          <FormPresentation>
            <ModulePaneStateField currentNamespace={adminForm.currentNamespace} />
            <FieldsGroup
              title={formatMessage({ id: 'search.graph.configuration.levels.message' })}
              spanFullWidth
            >
              <FieldArray
                name={this.LEVELS_FIELD_NAME}
                component={SelectedLevelFormRender}
                validate={ModuleForm.validateSelectedLevels}
                collectionModels={collectionModels}
              />
            </FieldsGroup>
            <FieldsGroup
              title={formatMessage({ id: 'search.graph.configuration.attributes.message' })}
              spanFullWidth
            >
              <AttributesListConfigurationComponent
                selectableAttributes={selectableAttributes}
                attributesList={get(adminForm.form, this.DATASET_ATTRIBUTES_FIELD_NAME)}
                attributesListFieldName={this.DATASET_ATTRIBUTES_FIELD_NAME}
                changeField={adminForm.changeField}
                hintMessageKey="search.graph.configuration.dataset.attributes.hint"
                allowAttributesGroups={false}
                attributesFilter={DamDomain.AttributeModelController.isSortableAttribute}
                allowLabel
                allowRendererSelection
              />
            </FieldsGroup>
          </FormPresentation>
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
