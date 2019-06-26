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
import CollectionsIcon from 'mdi-material-ui/FileTree'
import DatasetsIcon from 'mdi-material-ui/Archive'
import DataIcon from 'mdi-material-ui/FileDocument'
import DocumentsIcon from 'mdi-material-ui/FileImage'
import DescriptionIcon from 'material-ui/svg-icons/action/info-outline'
import WordIcon from 'mdi-material-ui/FileWordBox'
import { UIDomain, CatalogDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { Breadcrumb, ModuleIcon } from '@regardsoss/components'

/**
 * Component to display navigation bar.
 *
 * @author Sébastien binda
 */
class NavigationComponent extends React.Component {
  /** Root tag type */
  static ROOT_TAG = 'ROOT_TAG'

  static propTypes = {
    // module page definition
    page: AccessShapes.ModulePage,
    defaultIconURL: PropTypes.string.isRequired,
    // navigation levels currently defined (necessarily one or more elements)
    navigationLevels: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.oneOf([
          NavigationComponent.ROOT_TAG,
          UIDomain.ResultsContextConstants.DESCRIPTION_LEVEL,
          ...CatalogDomain.TAG_TYPES,
        ]).isRequired,
        label: PropTypes.shape({
          en: PropTypes.string.isRequired,
          fr: PropTypes.string.isRequired,
        }).isRequired,
        isNavigationAllowed: PropTypes.bool.isRequired,
      })).isRequired,
    onLevelSelected: PropTypes.func.isRequired, // on level selected in breadcrumb: (level, index) => void
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * @param {*} levelTag level tag (or null) repects Tag shape
   * @param {number} index level
   * @return {string} level label
   **/
  getLevelLabel = (levelTag, index) => {
    const { intl: { locale } } = this.context
    return levelTag.label[locale]
  }

  /**
   * @returns {boolean} true if navigation is allowed for element as parameter
   */
  isNavigationAllowed = (elt, index) => elt.isNavigationAllowed

  /**
   * Provides icon to use for level (handles root level)
   * @param {*} element corresponding element
   * @param {number} index corresponding element index in breadcrumb
   * @return {React.Element} built icon
   */
  getLevelIcon = (element, index) => {
    const { page, defaultIconURL } = this.props
    if (index === 0) {
      return (
        <ModuleIcon
          key="rootIcon"
          iconDisplayMode={get(page, 'iconType')}
          defaultIconURL={defaultIconURL}
          customIconURL={get(page, 'customIconURL')}
        />)
    }
    switch (element.type) {
      case UIDomain.ResultsContextConstants.DESCRIPTION_LEVEL:
        return <DescriptionIcon key="index" />
      case CatalogDomain.TAG_TYPES_ENUM.COLLECTION:
        return <CollectionsIcon key="index" />
      case CatalogDomain.TAG_TYPES_ENUM.DATA:
        return <DataIcon key="index" />
      case CatalogDomain.TAG_TYPES_ENUM.DATASET:
        return <DatasetsIcon key="index" />
      case CatalogDomain.TAG_TYPES_ENUM.DOCUMENT:
        return <DocumentsIcon key="index" />
      case CatalogDomain.TAG_TYPES_ENUM.WORD:
        return <WordIcon key="index" />
      case NavigationComponent.ROOT_TAG:
      default:
        throw new Error(`Unexpected navigation level type ${element.type}`)
    }
  }

  render() {
    const { navigationLevels, onLevelSelected } = this.props
    return (
      <Breadcrumb
        elements={navigationLevels}
        labelGenerator={this.getLevelLabel}
        iconGenerator={this.getLevelIcon}
        navigationAllowedPredicate={this.isNavigationAllowed}
        onAction={onLevelSelected}
      />
    )
  }
}

export default NavigationComponent
