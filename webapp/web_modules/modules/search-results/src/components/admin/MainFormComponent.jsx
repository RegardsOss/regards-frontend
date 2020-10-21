/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { DamDomain } from '@regardsoss/domain'
import ModuleConfiguration from '../../shapes/ModuleConfiguration'
import { FORM_PAGES, FORM_PAGES_ENUM } from '../../domain/form/FormPagesEnum'
import { FORM_SECTIONS, FORM_SECTIONS_ENUM } from '../../domain/form/FormSectionsEnum'
import { FormSection } from '../../shapes/form/FormSections'
import { PluginMeta } from '../../shapes/form/PluginMeta'
import BrowsingTreeComponent from './tree/BrowsingTreeComponent'
import MainConfigurationComponent from './content/MainConfigurationComponent'
import RestrictionsConfigurationComponent from './content/restrictions/RestrictionsConfigurationComponent'
import EntityTypeConfigurationComponent from './content/EntityTypeConfigurationComponent'
import FiltersConfigurationComponent from './content/FiltersConfigurationComponent'
import SortingConfigurationComponent from './content/SortingConfigurationComponent'
import ViewTypeConfigurationComponent from './content/ViewTypeConfigurationComponent'
import SearchConfigurationComponent from './content/search/SearchConfigurationComponent'

/**
 * Display form to configure main parameters of search form.
 * @author Sébastien binda
 * @author Léo Mieulet
 */
class MainFormComponent extends React.Component {
  static propTypes = {
    // navigation data
    navigationSections: PropTypes.arrayOf(FormSection).isRequired,
    selectedSectionType: PropTypes.oneOf(FORM_SECTIONS).isRequired,
    selectedPageType: PropTypes.oneOf(FORM_PAGES).isRequired,
    // current form and configuration
    currentNamespace: PropTypes.string.isRequired,
    currentFormValues: ModuleConfiguration.isRequired,
    // datasets and models
    datasets: DataManagementShapes.DatasetList.isRequired,
    datasetModels: DataManagementShapes.ModelList.isRequired,
    // Attributes pull by type
    dataAttributeModels: DataManagementShapes.AttributeModelList.isRequired,
    datasetAttributeModels: DataManagementShapes.AttributeModelList.isRequired,
    // Plugins information
    fetchingMetadata: PropTypes.bool, // not required as provided by HOC
    pluginsMetadata: PropTypes.arrayOf(PluginMeta), // not required as provided by HOC
    // Callbacks
    // redux change field callback
    changeField: PropTypes.func.isRequired,
    // browse to page callback (section, page) => ()
    onBrowseToPage: PropTypes.func.isRequired,
  }


  static defaultProps = {
    fetchingMetadata: true, // loading when unknown
    pluginsMetadata: [],
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }


  /**
   * @param {string} sectionType section type, which is also an entity type (precondition)
   * @return [*] available attributes, matching  DataManagementShapes.AttributeModelList shape
   */
  getAvailableAttributesFor = (sectionType) => {
    const { dataAttributeModels, datasetAttributeModels } = this.props
    switch (sectionType) {
      case DamDomain.ENTITY_TYPES_ENUM.DATA:
        return dataAttributeModels
      case DamDomain.ENTITY_TYPES_ENUM.DATASET:
        return datasetAttributeModels
      default:
        throw new Error(`Cannot return attributes pool for type ${sectionType}`)
    }
  }

  /**
   * @return {*} Rendered form for current browsing context
   */
  renderCurrentPage = () => {
    const {
      selectedSectionType, selectedPageType, changeField,
      datasets, datasetModels, dataAttributeModels,
      fetchingMetadata, pluginsMetadata,
      currentFormValues, currentNamespace,
    } = this.props
    switch (selectedSectionType) {
      case FORM_SECTIONS_ENUM.MAIN:
        // specific case: main section with only main configuration page
        return (
          <MainConfigurationComponent
            currentNamespace={currentNamespace}
            currentFormValues={currentFormValues}
            changeField={changeField}
          />)
      case FORM_SECTIONS_ENUM.SEARCH:
        return (
          <SearchConfigurationComponent
            fetchingMetadata={fetchingMetadata}
            pluginsMetadata={pluginsMetadata}
            availableAttributes={dataAttributeModels}
            currentNamespace={currentNamespace}
          />)
      case FORM_SECTIONS_ENUM.FILTERS:
        return (
          <FiltersConfigurationComponent
            availableAttributes={dataAttributeModels}
            currentNamespace={currentNamespace}
            currentFormValues={currentFormValues}
            changeField={changeField}
          />)
      case FORM_SECTIONS_ENUM.RESTRICTIONS:
        return (
          <RestrictionsConfigurationComponent
            currentNamespace={currentNamespace}
            currentRestrictionsValues={currentFormValues.restrictions}
            datasets={datasets}
            datasetModels={datasetModels}
            changeField={changeField}
          />)
      case DamDomain.ENTITY_TYPES_ENUM.DATA:
      case DamDomain.ENTITY_TYPES_ENUM.DATASET: {
        // main case: section is edited entity type group
        const currentTypeNamespace = `${currentNamespace}.viewsGroups.${selectedSectionType}`
        const currentTypeFormValues = get(currentFormValues, `viewsGroups.${selectedSectionType}`)
        const availableAttributes = this.getAvailableAttributesFor(selectedSectionType)
        switch (selectedPageType) {
          case FORM_PAGES_ENUM.MAIN:
            return (
              <EntityTypeConfigurationComponent
                type={selectedSectionType}
                currentTypeNamespace={currentTypeNamespace}
                currentTypeFormValues={currentTypeFormValues}
              />)
          case FORM_PAGES_ENUM.SORTING:
            return (
              <SortingConfigurationComponent
                availableAttributes={availableAttributes}
                currentTypeNamespace={currentTypeNamespace}
                currentTypeFormValues={currentTypeFormValues}
                changeField={changeField}
              />)
          case FORM_PAGES_ENUM.LIST_AND_TABLE:
          case FORM_PAGES_ENUM.QUICKLOOKS:
          case FORM_PAGES_ENUM.MAP:
            return (
              <ViewTypeConfigurationComponent
                pageType={selectedPageType}
                availableAttributes={availableAttributes}
                currentTypeNamespace={currentTypeNamespace}
                currentTypeFormValues={currentTypeFormValues}
                changeField={changeField}
              />)
          default:
            throw new Error(`Unsupported page type ${selectedPageType} in section type ${selectedSectionType}`)
        }
      }
      default:
        throw new Error(`Unsupported section type ${selectedSectionType}`)
    }
  }


  render() {
    const { navigationSections, onBrowseToPage } = this.props
    const { moduleTheme: { configuration } } = this.context

    return (
      <div style={configuration.rootStyle}>
        <div style={configuration.tree.container}>
          <BrowsingTreeComponent navigationSections={navigationSections} onBrowseToPage={onBrowseToPage} />
        </div>
        <div style={configuration.content.container}>{this.renderCurrentPage()}</div>
      </div>)
  }
}

export default MainFormComponent
