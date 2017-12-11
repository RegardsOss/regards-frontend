/**
 * LICENSE_PLACEHOLDER
 **/
import { DataManagementShapes, AccessShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { DynamicModule } from '@regardsoss/components'
import SearchResultsContainer from '../../containers/user/results/SearchResultsContainer'
import NavigationContainer from '../../containers/user/navigation/NavigationContainer'

/**
* Search results module view
*/
class ModuleComponent extends React.Component {

  static propTypes = {
    // sub modules rendering
    appName: PropTypes.string,
    project: PropTypes.string,
    resultsTitle: PropTypes.string,

    // expanded state management
    expanded: PropTypes.bool.isRequired,
    onExpandChange: PropTypes.func.isRequired,

    // initial configuration
    // eslint-disable-next-line react/no-unused-prop-types
    searchQuery: PropTypes.string,

    // configuration
    enableFacettes: PropTypes.bool.isRequired,
    displayDatasets: PropTypes.bool.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    facettesQuery: PropTypes.string,

    // Attributes configurations for results columns
    attributesConf: AccessShapes.AttributeConfigurationArray,
    attributesRegroupementsConf: AccessShapes.AttributesGroupConfigurationArray,
    datasetAttributesConf: AccessShapes.AttributeConfigurationArray,
    attributeModels: DataManagementShapes.AttributeModelList,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const {
      appName, project, resultsTitle, searchQuery, enableFacettes, expanded, onExpandChange, facettesQuery,
      displayDatasets, attributesConf, attributesRegroupementsConf, datasetAttributesConf, attributeModels } = this.props

    return (
      <DynamicModule
        title={
          <NavigationContainer
            resultsTitle={resultsTitle}
            displayDatasets={displayDatasets}
          />
        }
        onExpandChange={onExpandChange}
        expanded={expanded}
      >
        <SearchResultsContainer
          appName={appName}
          project={project}
          enableFacettes={enableFacettes}
          displayDatasets={displayDatasets}
          searchQuery={searchQuery}
          facettesQuery={facettesQuery}
          attributesConf={attributesConf}
          attributesRegroupementsConf={attributesRegroupementsConf}
          datasetAttributesConf={datasetAttributesConf}
          attributeModels={attributeModels}
        />
      </DynamicModule >
    )
  }
}
export default ModuleComponent
