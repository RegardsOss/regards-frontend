/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import ListSectionPageComponent from '../common/ListSectionPageComponent'
import TagCellComponent from './TagCellComponent'

/**
 * Tags section page component, showing tags list
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
class TagsSectionPageComponent extends React.Component {
  static propTypes = {
    allowSearching: PropTypes.bool,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    scrollAreaHeight: PropTypes.number,
    onSearchWord: PropTypes.func.isRequired,
  }

  /**
   * Renders a tag
   * @param {string} tag
   * @return {React.ReactElement} render element
   */
  renderTag = (tag) => {
    const { onSearchWord, allowSearching } = this.props
    return <TagCellComponent
      key={tag}
      tag={tag}
      allowSearching={allowSearching}
      onSearchWord={onSearchWord}
    />
  }

  render() {
    const { tags, scrollAreaHeight } = this.props
    return (
      <ListSectionPageComponent
        elements={tags}
        buildElementNode={this.renderTag}
        scrollAreaHeight={scrollAreaHeight}
      />
    )
  }
}
export default TagsSectionPageComponent
