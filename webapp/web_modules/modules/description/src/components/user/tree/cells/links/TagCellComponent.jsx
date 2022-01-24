/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { CatalogDomain } from '@regardsoss/domain'
import TreeLinkComponent from './TreeLinkComponent'

/**
 * Word tag cell component
 * @author Raphaël Mechali
 */
class TagCellComponent extends React.Component {
  static propTypes = {
    tag: PropTypes.string.isRequired,
  }

  render() {
    const { tag } = this.props
    const couplingTag = CatalogDomain.TagsHelper.isCouplingTag(tag)
    const tagLabel = couplingTag ? CatalogDomain.TagsHelper.parseCouplingTag(tag).label : tag
    return (
      <TreeLinkComponent
        text={tagLabel}
        tooltip={tagLabel}
        selected={false} // not selectable
        disabled // simple text, not a link
        section={false}
      />)
  }
}
export default TagCellComponent
