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
import SearchIcon from 'mdi-material-ui/Magnify'
import { CatalogDomain } from '@regardsoss/domain'
import { i18nContextType } from '@regardsoss/i18n'
import PageTextCellComponent from '../common/PageTextCellComponent'
import PageElementOption from '../common/PageElementOption'
import PageElement from '../common/PageElement'

/**
 * Display a tag and search option in tags list page
 * @author Raphaël Mechali
 */
class TagCellComponent extends React.Component {
  static propTypes = {
    allowSearching: PropTypes.bool,
    tag: PropTypes.string.isRequired,
    // on search word tag
    onSearchWord: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * On search tag clicked
   */
  onSearchTag = () => {
    const { tag, onSearchWord } = this.props
    onSearchWord(tag)
  }

  render() {
    const { tag, allowSearching } = this.props
    const { intl: { formatMessage } } = this.context
    const couplingTag = CatalogDomain.TagsHelper.isCouplingTag(tag)
    const tagLabel = couplingTag ? CatalogDomain.TagsHelper.parseCouplingTag(tag).label : tag
    return (
      <PageElement>
        <PageTextCellComponent text={tagLabel} />
        { allowSearching ? (
          <PageElementOption
            IconConstructor={SearchIcon}
            title={formatMessage({
              id: couplingTag
                ? 'module.description.common.search.coupling.tag.tooltip'
                : 'module.description.common.search.simple.tag.tooltip',
            }, { tag: tagLabel })}
            onClick={this.onSearchTag}
          />) : null}
      </PageElement>)
  }
}
export default TagCellComponent
