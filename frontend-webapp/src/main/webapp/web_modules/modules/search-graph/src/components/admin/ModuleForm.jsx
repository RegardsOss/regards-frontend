/**
* LICENSE_PLACEHOLDER
**/
import isEmpty from 'lodash/isEmpty'
import { FormattedMessage } from 'react-intl'
import { Tabs, Tab } from 'material-ui/Tabs'
import { CardTitle } from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import { Model, AttributeModel } from '@regardsoss/model'
import { themeContextType } from '@regardsoss/theme'
import { FieldArray } from '@regardsoss/form-utils'
import { MainAttributesConfigurationComponent } from '@regardsoss/attributes-configuration'
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
    project: React.PropTypes.string.isRequired,
    appName: React.PropTypes.string.isRequired,
    adminForm: React.PropTypes.shape({
      changeField: React.PropTypes.func,
      form: ModuleConfiguration,
    }),
    // values pool as fetched and normalized
    collectionModels: React.PropTypes.objectOf(Model).isRequired,
    // attributes that user can display on datasets
    selectableAttributes: React.PropTypes.objectOf(AttributeModel),
  }

  static contextTypes = {
    ...themeContextType,
  }

  validateSelectedLevels = selectedLevels => isEmpty(selectedLevels) ? 'search.graph.levels.selection.none.selected.error' : null

  render() {
    const { collectionModels, appName, project, adminForm, selectableAttributes } = this.props
    // attributesConf <== conf.datasetAttributes
    return (
      <Tabs>
        <Tab label={<FormattedMessage id="search.graph.configuration.tab" />}>
          <CardTitle
            title={<FormattedMessage id="search.graph.configuration.levels.title" />}
            subtitle={<FormattedMessage id="search.graph.configuration.levels.subtitle" />}
          />
          <Divider />
          <FieldArray
            name={ModuleForm.LEVELS_FIELD_NAME}
            component={SelectedLevelFormRender}
            validate={this.validateSelectedLevels}
            collectionModels={collectionModels}
          />
          <CardTitle
            title={<FormattedMessage id="search.graph.configuration.attributes.title" />}
            subtitle={<FormattedMessage id="search.graph.configuration.attributes.subtitle" />}
          />
          <Divider />
          <MainAttributesConfigurationComponent
            allowFacettes={false}
            allowAttributesRegroupements={false}
            attributesFieldName={ModuleForm.DATASET_ATTRIBUTES_FIELD_NAME}
            attributesConf={adminForm.form.conf.graphDatasetAttributes}
            selectableAttributes={selectableAttributes}
            changeField={adminForm.changeField}
          />
        </Tab>
        <Tab label={<FormattedMessage id="search.graph.results.tab" />}>
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
