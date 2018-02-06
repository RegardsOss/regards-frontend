/**
 * LICENSE_PLACEHOLDER
 **/
import { DataManagementShapes, AccessShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { DynamicModule } from '@regardsoss/components'
import { dependencies } from '../../user-dependencies'
import SearchResultsContainer from '../../containers/user/results/SearchResultsContainer'
import NavigationContainer from '../../containers/user/navigation/NavigationContainer'
import { DISPLAY_MODE_VALUES } from '../../definitions/DisplayModeEnum'
import DisplayModuleConf from '../../models/DisplayModuleConf'

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
    enableDownload: PropTypes.bool.isRequired,
    enableQuicklooks: PropTypes.bool.isRequired,
    displayMode: PropTypes.oneOf(DISPLAY_MODE_VALUES),
    displayConf: DisplayModuleConf,
    // eslint-disable-next-line react/no-unused-prop-types
    facettesQuery: PropTypes.string,

    // Attributes configurations for results columns
    attributesConf: AccessShapes.AttributeConfigurationArray,
    attributesQuicklookConf: AccessShapes.AttributeConfigurationArray,
    attributesRegroupementsConf: AccessShapes.AttributesGroupConfigurationArray,
    datasetAttributesConf: AccessShapes.AttributeConfigurationArray,
    documentAttributesConf: AccessShapes.AttributeConfigurationArray,
    attributeModels: DataManagementShapes.AttributeModelList,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const {
      appName, project, resultsTitle, searchQuery, enableFacettes, expanded, onExpandChange, facettesQuery, enableDownload, enableQuicklooks,
      displayMode, attributesConf, attributesRegroupementsConf, datasetAttributesConf, documentAttributesConf, attributeModels, displayConf,
      attributesQuicklookConf,
    } = this.props
    return (
      <DynamicModule
        title={
          <NavigationContainer
            resultsTitle={resultsTitle}
          />
        }
        onExpandChange={onExpandChange}
        expanded={expanded}
        requiredDependencies={dependencies}
      >
        <SearchResultsContainer
          appName={appName}
          project={project}
          enableFacettes={enableFacettes}
          enableDownload={enableDownload}
          enableQuicklooks={enableQuicklooks}
          displayMode={displayMode}
          searchQuery={searchQuery}
          facettesQuery={facettesQuery}
          attributesConf={attributesConf}
          attributesQuicklookConf={attributesQuicklookConf}
          attributesRegroupementsConf={attributesRegroupementsConf}
          datasetAttributesConf={datasetAttributesConf}
          documentAttributesConf={documentAttributesConf}
          attributeModels={attributeModels}
          displayConf={displayConf}
        />
      </DynamicModule >
    )
  }
}
export default ModuleComponent
