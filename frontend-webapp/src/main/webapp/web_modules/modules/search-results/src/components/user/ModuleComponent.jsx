/**
 * LICENSE_PLACEHOLDER
 **/
import get from 'lodash/get'
import { AccessShapes, DataManagementShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
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

    attributeModels: DataManagementShapes.AttributeModelList,

    // request configuration
    searchQuery: PropTypes.string,
    facettesQuery: PropTypes.string,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
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
        datasetsSectionLabelFr,
        datasetsSectionLabelEn,
        dataSectionLabelFr,
        dataSectionLabelEn,
      },
    } = this.props

    const locale = get(this.context, 'intl.locale', 'en')
    const datasetsSectionLabel = locale === 'fr' ? datasetsSectionLabelFr : datasetsSectionLabelEn
    const dataSectionLabel = locale === 'fr' ? dataSectionLabelFr : dataSectionLabelEn
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
          datasetsSectionLabel={datasetsSectionLabel}
          dataSectionLabel={dataSectionLabel}
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
