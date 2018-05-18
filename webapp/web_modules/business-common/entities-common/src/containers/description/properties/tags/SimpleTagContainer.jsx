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
import { TagTypes } from '@regardsoss/domain/catalog'
import TagComponent from '../../../../components/description/properties/tags/TagComponent'

/**
* A simple tag container
*/
class SimpleTagContainer extends React.Component {
  static propTypes = {
    tag: PropTypes.string.isRequired,
    // callback: on search tag (or null)
    onSearchTag: PropTypes.func,
  }

  onSearchTag = () => {
    const { onSearchTag, tag } = this.props
    if (onSearchTag) {
      onSearchTag({
        type: TagTypes.WORD,
        data: tag,
      })
    }
  }

  render() {
    const { onSearchTag, tag } = this.props
    return (
      <TagComponent
        tagLabel={tag}
        onSearchTag={onSearchTag ? this.onSearchTag : null}
        onShowDescription={null}
        isEntity={false}
      />
    )
  }
}
export default SimpleTagContainer
