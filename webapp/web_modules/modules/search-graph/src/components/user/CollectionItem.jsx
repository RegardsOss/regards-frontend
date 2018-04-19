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
import CollectionIcon from 'material-ui/svg-icons/file/folder'
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-drop-down'
import { themeContextType } from '@regardsoss/theme'
import { CatalogShapes } from '@regardsoss/shape'
import ItemLinkContainer from '../../containers/user/ItemLinkContainer'
import ItemLink from './ItemLink'

/**
* Displays a collection
*/
class CollectionItem extends React.Component {
  static propTypes = {
    collection: CatalogShapes.Entity.isRequired,
    expensible: PropTypes.bool.isRequired,
    selected: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  componentWillMount = () => {
    // initialize this state styles
    this.onItemLinkStateChange(ItemLink.States.DEFAULT)
  }

  /**
   * Handles item state change. Note: no need to optimize state update here, the item link component transfers as few events as possible
   * @param newLinkState new link state
   */
  onItemLinkStateChange = (newLinkState) => {
    // store in state the current right arrow appearance (to avoid computing new references at runtime)
    const { moduleTheme: { user: { collectionItem, itemLink } } } = this.context
    this.setState({
      arrowStyles: ItemLink.selectStyles(newLinkState, itemLink.icon, collectionItem.arrow.commonStyles),
    })
  }

  render() {
    const {
      collection, expensible, selected, onSelect,
    } = this.props
    const { arrowStyles } = this.state
    const { moduleTheme: { user: { collectionItem } } } = this.context
    return (
      <div style={collectionItem.styles} >
        <ItemLinkContainer
          entity={collection}
          Icon={CollectionIcon}
          additiveLineComponent={expensible ? <ArrowDown style={arrowStyles} /> : null}
          onSelect={onSelect}
          selected={selected}
          locked={false}
          onStateChange={this.onItemLinkStateChange}
        />
      </div>
    )
  }
}
export default CollectionItem