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
    collectionModels: PropTypes.objectOf(Model).isRequired,
    // attributes that user can display on datasets
    selectableAttributes: PropTypes.objectOf(AttributeModel),
  }

  static contextTypes = {
    ...themeContextType,
  }

  validateSelectedLevels = selectedLevels => isEmpty(selectedLevels) ? 'search.graph.levels.selection.none.selected.error' : null

  render() {
    const { collectionModels, appName, project, adminForm, selectableAttributes } = this.props
    const formConf = adminForm.form.conf
    const currentAttributesConfiguration = formConf && formConf.graphDatasetAttributes ? formConf.graphDatasetAttributes : []
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
            attributesConf={currentAttributesConfiguration}
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
