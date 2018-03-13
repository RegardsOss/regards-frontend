/**
* LICENSE_PLACEHOLDER
**/
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import { i18nContextType } from '@regardsoss/i18n'
import { Tabs, Tab } from 'material-ui/Tabs'
import { DataManagementShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { FieldArray } from '@regardsoss/form-utils'
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
    const formConf = get(adminForm.form, adminForm.currentNamespace)
    const currentAttributesConfiguration = formConf && formConf.graphDatasetAttributes ? formConf.graphDatasetAttributes : []
    return (
      <Tabs>
        <Tab label={formatMessage({ id: 'search.graph.configuration.tab' })}>
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
