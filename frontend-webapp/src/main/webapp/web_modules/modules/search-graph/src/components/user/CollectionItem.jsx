/**
* LICENSE_PLACEHOLDER
**/
import CollectionIcon from 'material-ui/svg-icons/file/folder'
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-drop-down'
import { themeContextType } from '@regardsoss/theme'
import { CatalogEntity } from '@regardsoss/model'
import ItemLinkContainer from '../../containers/user/ItemLinkContainer'
import ItemLink from './ItemLink'

/**
* Displays a collection
*/
class CollectionItem extends React.Component {

  static propTypes = {
    collection: CatalogEntity.isRequired,
    expensible: React.PropTypes.bool.isRequired,
    selected: React.PropTypes.bool.isRequired,
    onSelect: React.PropTypes.func.isRequired,
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
    const { collection, expensible, selected, onSelect } = this.props
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
