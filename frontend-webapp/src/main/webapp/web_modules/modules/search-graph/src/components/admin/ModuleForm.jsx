/**
* LICENSE_PLACEHOLDER
**/
import isEmpty from 'lodash/isEmpty'
import { i18nContextType } from '@regardsoss/i18n'
import { Tabs, Tab } from 'material-ui/Tabs'
import { CardTitle } from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import { DataManagementShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { FieldArray } from '@regardsoss/form-utils'
import { MainAttributesConfigurationComponent } from '@regardsoss/attributes-common'
import ModuleConfiguration from '../../model/ModuleConfiguration'
import SelectedLevelFormRender from './SelectedLevelFormRender'
import SearchResultForm from './SearchResultForm'

/**
* Module form component for admin instance
*/
class ModuleForm extends React.Component {

  static LEVELS_FIELD_NAME = 'conf.graphLevels'
  static DATASET_ATTRIBUTES_FIELD_NAME = 'conf.graphDatasetAttributes'

  static propTypes = {
    project: PropTypes.string.isRequired,
    appName: PropTypes.string.isRequired,
    adminForm: PropTypes.shape({
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

  validateSelectedLevels = selectedLevels => isEmpty(selectedLevels) ? 'search.graph.levels.selection.none.selected.error' : null

  render() {
    const { collectionModels, appName, project, adminForm, selectableAttributes } = this.props
    const formConf = adminForm.form.conf
    const currentAttributesConfiguration = formConf && formConf.graphDatasetAttributes ? formConf.graphDatasetAttributes : []
    return (
      <Tabs>
        <Tab label={this.context.intl.formatMessage({ id: 'search.graph.configuration.tab' })}>
          <CardTitle
            title={this.context.intl.formatMessage({ id: 'search.graph.configuration.levels.title' })}
            subtitle={this.context.intl.formatMessage({ id: 'search.graph.configuration.levels.subtitle' })}
          />
          <Divider />
          <FieldArray
            name={ModuleForm.LEVELS_FIELD_NAME}
            component={SelectedLevelFormRender}
            validate={this.validateSelectedLevels}
            collectionModels={collectionModels}
          />
          <CardTitle
            title={this.context.intl.formatMessage({ id: 'search.graph.configuration.attributes.title' })}
            subtitle={this.context.intl.formatMessage({ id: 'search.graph.configuration.attributes.subtitle' })}
          />
          <Divider />
          <MainAttributesConfigurationComponent
            allowFacettes={false}
            allowAttributesRegroupements={false}
            attributesFieldName={ModuleForm.DATASET_ATTRIBUTES_FIELD_NAME}
            attributesConf={currentAttributesConfiguration}
            selectableAttributes={selectableAttributes}
            changeField={adminForm.changeField}
          />
        </Tab>
        <Tab label={this.context.intl.formatMessage({ id: 'search.graph.results.tab' })}>
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
