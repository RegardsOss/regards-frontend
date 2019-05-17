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
import DatasetsIcon from 'material-ui/svg-icons/image/collections-bookmark'
import DataIcon from 'material-ui/svg-icons/av/library-books'
import DocumentsIcon from 'mdi-material-ui/ImageMultiple'
import ListViewIcon from 'mdi-material-ui/ViewSequential'
import QuicklookViewIcon from 'mdi-material-ui/ImageAlbum'
import MapViewIcon from 'material-ui/svg-icons/maps/map'
import SortIcon from 'mdi-material-ui/SortDescending'
import FiltersIcon from 'mdi-material-ui/Filter'
import MainSettingIcon from 'material-ui/svg-icons/action/settings'
import ViewSettingIcon from 'mdi-material-ui/TableSettings'
import { DamDomain } from '@regardsoss/domain'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { FormSection, FormPage } from '../../../shapes/form/FormSections'
import { FORM_SECTIONS_ENUM } from '../../../domain/form/FormSectionsEnum'
import { FORM_PAGES_ENUM } from '../../../domain/form/FormPagesEnum'

/**
 * Browsing tree cell
 * @author Raphaël Mechali
 */
class BrowsingTreeCell extends React.Component {
  static propTypes = {
    section: FormSection.isRequired,
    page: FormPage,
    // depth level in tree
    level: PropTypes.number.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /** Section icons constructors by section type */
  static SECTION_ICON_CONSTRUCTORS = {
    [FORM_SECTIONS_ENUM.MAIN]: MainSettingIcon,
    [DamDomain.ENTITY_TYPES_ENUM.DATA]: DatasetsIcon,
    [DamDomain.ENTITY_TYPES_ENUM.DATASET]: DataIcon,
    [DamDomain.ENTITY_TYPES_ENUM.DOCUMENT]: DocumentsIcon,
  }

  /** Page icon constructors by page type */
  static PAGE_ICON_CONSTRUCTORS = {
    [FORM_PAGES_ENUM.MAIN]: ViewSettingIcon,
    [FORM_PAGES_ENUM.FILTERS]: FiltersIcon,
    [FORM_PAGES_ENUM.SORTING]: SortIcon,
    [FORM_PAGES_ENUM.LIST_AND_TABLE]: ListViewIcon,
    [FORM_PAGES_ENUM.QUICKLOOKS]: QuicklookViewIcon,
    [FORM_PAGES_ENUM.MAP]: MapViewIcon,
  }

  render() {
    const { section, page, level } = this.props
    const {
      intl: { formatMessage },
      moduleTheme: { configuration: { tree: { cell: { root, selected, regular } } } },
    } = this.context
    const isSection = level === 0
    // selected (only for enties that have a matching page)
    const isSelected = page ? page.selected : false
    // retrieve icon construcor
    const IconConstructor = isSection
      ? BrowsingTreeCell.SECTION_ICON_CONSTRUCTORS[section.type]
      : BrowsingTreeCell.PAGE_ICON_CONSTRUCTORS[page.type]

    const stateStyles = isSelected ? selected : regular
    return (
      <div style={root}>
        { /* Icon */ }
        <IconConstructor style={stateStyles.icon} />
        <div style={isSection ? stateStyles.section : stateStyles.page}>
          { /* Label */
            formatMessage({
              id: isSection
                ? `search.results.form.configuration.tree.section.label.${section.type}`
                : `search.results.form.configuration.tree.page.label.${page.type}`,
            })
          }
        </div>
      </div>)
  }
}
export default BrowsingTreeCell