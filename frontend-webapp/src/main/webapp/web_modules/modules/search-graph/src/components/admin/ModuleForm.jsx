/**
* LICENSE_PLACEHOLDER
**/
import isEmpty from 'lodash/isEmpty'
import { FormattedMessage } from 'react-intl'
import { Tabs, Tab } from 'material-ui/Tabs'
import { Model } from '@regardsoss/model'
import { themeContextType } from '@regardsoss/theme'
import { FieldArray } from '@regardsoss/form-utils'
import ModuleConfiguration from '../../model/ModuleConfiguration'
import SelectedLevelFormRender from './SelectedLevelFormRender'
import SearchResultForm from './SearchResultForm'

const fieldName = 'conf.graphLevels'

/**
* Module form component for admin instance
*/
class ModuleForm extends React.Component {

  static propTypes = {
    project: React.PropTypes.string.isRequired,
    appName: React.PropTypes.string.isRequired,
    adminForm: React.PropTypes.shape({
      changeField: React.PropTypes.func,
      form: ModuleConfiguration,
    }),
    // values pool as fetched and normalized
    collectionModels: React.PropTypes.objectOf(Model).isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  validateSelectedLevels = selectedLevels => isEmpty(selectedLevels) ? 'search.graph.levels.selection.none.selected.error' : null

  render() {
    const { collectionModels, appName, project, adminForm } = this.props
    return (
      <Tabs>
        <Tab label={<FormattedMessage id="search.graph.configuration.tab" />}>
          <FieldArray
            name={fieldName}
            component={SelectedLevelFormRender}
            validate={this.validateSelectedLevels}
            collectionModels={collectionModels}
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
