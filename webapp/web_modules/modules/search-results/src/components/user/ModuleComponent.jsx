/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import get from 'lodash/get'
import { AccessShapes, DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { DynamicModulePane } from '@regardsoss/components'
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
      moduleConf,
    } = this.props
    const {
      enableDownload,
      enableFacettes,
      facettesInitiallySelected,
      enableQuicklooks,
      restrictedDatasetsIpIds,
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
    } = moduleConf
    const locale = get(this.context, 'intl.locale', 'en')
    const datasetsSectionLabel = locale === 'fr' ? datasetsSectionLabelFr : datasetsSectionLabelEn
    const dataSectionLabel = locale === 'fr' ? dataSectionLabelFr : dataSectionLabelEn
    return (
      <DynamicModulePane
        titleComponent={
          <NavigationContainer
            type={this.props.type}
            description={description}
            page={page}
          />
        }
        requiredDependencies={dependencies}
        moduleConf={moduleConf}
        {...this.props}
      >
        <SearchResultsContainer
          appName={appName}
          project={project}
          enableFacettes={enableFacettes}
          facettesInitiallySelected={facettesInitiallySelected}
          enableDownload={enableDownload}
          enableQuicklooks={enableQuicklooks}
          displayMode={displayMode}
          displayConf={displayConf}
          restrictedDatasetsIpIds={restrictedDatasetsIpIds}
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
        />
      </DynamicModulePane >
    )
  }
}
export default ModuleComponent
