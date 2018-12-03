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
import FeedbackDisplayContainer from '../../containers/user/feedback/FeedbackDisplayContainer'
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
    // resolved attribute models containing standard attributes
    attributeModels: DataManagementShapes.AttributeModelList,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const {
      appName,
      project,
      id,
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
      restrictedDatasetsIds,
      searchQueryParameters,
      displayMode,
      displayConf,
      datasetsSectionLabelFr,
      datasetsSectionLabelEn,
      dataSectionLabelFr,
      dataSectionLabelEn,
      data,
      quicklook,
      dataset,
      document,
    } = moduleConf
    const locale = get(this.context, 'intl.locale', 'en')
    const datasetsSectionLabel = locale === 'fr' ? datasetsSectionLabelFr : datasetsSectionLabelEn
    const dataSectionLabel = locale === 'fr' ? dataSectionLabelFr : dataSectionLabelEn
    const { moduleTheme: { user: { rootModuleContainer } } } = this.context
    return (
      <div style={rootModuleContainer}>
        {/* Main pane */}
        <DynamicModulePane
          titleComponent={
            <NavigationContainer
              type={this.props.type}
              description={description}
              page={page}
            />
          }
          requiredDependencies={dependencies}
          id={id}
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
            restrictedDatasetsIds={restrictedDatasetsIds}
            searchQueryParameters={searchQueryParameters}
            datasetsSectionLabel={datasetsSectionLabel}
            dataSectionLabel={dataSectionLabel}
            attributeModels={attributeModels}
            // typed views configuration
            data={data}
            quicklook={quicklook}
            dataset={dataset}
            document={document}
          />
        </DynamicModulePane>
        {/* Feedback handling for long actions in module */}
        <FeedbackDisplayContainer />
      </div>
    )
  }
}
export default ModuleComponent
