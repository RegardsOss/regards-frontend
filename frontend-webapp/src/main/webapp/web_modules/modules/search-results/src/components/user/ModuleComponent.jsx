/**
 * LICENSE_PLACEHOLDER
 **/
import { AccessShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { DynamicModule } from '@regardsoss/components'
import { dependencies } from '../../user-dependencies'
import ModuleConfiguration from '../../models/ModuleConfiguration'
import SearchResultsContainer from '../../containers/user/results/SearchResultsContainer'
import NavigationContainer from '../../containers/user/navigation/NavigationContainer'

/**
 * Search results module view
 */
class ModuleComponent extends React.Component {
  static propTypes = {
    // default modules properties
    ...AccessShapes.runtimeDispayModuleFields,
    // redefines expected configuration shape
    moduleConf: ModuleConfiguration.isRequired,

    // request configuration
    searchQuery: PropTypes.string,
    facettesQuery: PropTypes.string,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const {
      appName,
      project,
      facettesQuery,
      attributeModels,
      description,
      page,
      moduleConf: {
        enableDownload,
        enableFacettes,
        enableQuicklooks,
        searchQuery,
        attributes,
        attributesQuicklook,
        datasetAttributes,
        documentAttributes,
        attributesRegroupements,
        displayMode,
        displayConf,
      },
    } = this.props
    return (
      <DynamicModule
        titleComponent={
          <NavigationContainer
            type={this.props.type}
            description={description}
            page={page}
          />
        }
        requiredDependencies={dependencies}
        {...this.props}
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
          attributesConf={attributes}
          attributesQuicklookConf={attributesQuicklook}
          attributesRegroupementsConf={attributesRegroupements}
          datasetAttributesConf={datasetAttributes}
          documentAttributesConf={documentAttributes}
          attributeModels={attributeModels}
          displayConf={displayConf}
        />
      </DynamicModule >
    )
  }
}
export default ModuleComponent
