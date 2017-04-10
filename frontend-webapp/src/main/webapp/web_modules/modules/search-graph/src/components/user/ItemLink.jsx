/**
* LICENSE_PLACEHOLDER
**/
import LockIcon from 'material-ui/svg-icons/action/lock'
import InformationIcon from 'material-ui/svg-icons/action/info-outline'
import IconButton from 'material-ui/IconButton'
import { themeContextType } from '@regardsoss/theme'
import { ShowableAtRender } from '@regardsoss/components'

/**
* Shows an item label taking in account the locked state and exposing over state. Please note that over state is computed for  main action,
* information action 'lives aside'
*/
class ItemLink extends React.Component {

  /**
   * Possible component states
   */
  static States = {
    LOCKED: 'locked',
    DEFAULT: 'default', // not hover, not selected
    SELECTED: 'selected', // selected
    HOVER: 'hover', // hover
    SELECTED_HOVER: 'selected_hover', // selected and hover
  }

  /**
 * Selects styles based on new state and styles holder, described after
 * @param newState String, one of States
 * @param basicStyles : always applied styles
 * @param stylesHolder : object holding styles, with structure:
 * {
 *  defaultStyles: {} - styles applied in default state
 *  hoverStyles: {} - styles applied in hover state
 *  selectedStyles: {} - styles applied in selected state
 * }
 * @return appliable style objects in state
 */
  static selectStyles = (newState, stylesHolder, basicStyles) => {
    switch (newState) {
      case ItemLink.States.DEFAULT:
        return { ...basicStyles, ...stylesHolder.defaultStyles }
      case ItemLink.States.LOCKED:
        return { ...basicStyles, ...stylesHolder.lockedStyles }
      case ItemLink.States.HOVER:
      case ItemLink.States.SELECTED_HOVER:
        return { ...basicStyles, ...stylesHolder.hoverStyles }
      case ItemLink.States.SELECTED:
        return { ...basicStyles, ...stylesHolder.selectedStyles }
      default:
        throw new Error('Unknown state')
    }
  }

  static propTypes = {
    locked: React.PropTypes.bool.isRequired,
    selected: React.PropTypes.bool.isRequired,
    onSelect: React.PropTypes.func.isRequired,
    text: React.PropTypes.string.isRequired,
    Icon: React.PropTypes.func.isRequired,
    // optional callback on state change: (newState:States) => void
    onStateChange: React.PropTypes.func,
  }

  static contextTypes = {
    ...themeContextType,
  }

  componentWillMount = () => {
    // initialize state
    const { locked, selected } = this.props
    this.updateState(this.getNewState(locked, selected, false))
  }

  componentWillReceiveProps = (nextProps) => {
    // update state, in case of locked or selected properties changed
    const { locked, selected } = nextProps
    const hover = [ItemLink.States.HOVER, ItemLink.States.HOVER].includes(this.state.currentState)
    this.updateState(this.getNewState(locked, selected, hover))
  }


  /**
   * Mouse over handler
   */
  onMouseOver = () => {
    const { locked, selected } = this.props
    this.updateState(this.getNewState(locked, selected, true))
  }

  /**
   * Mouse out handler
   */
  onMouseOut = () => {
    const { locked, selected } = this.props
    this.updateState(this.getNewState(locked, selected, false))
  }

  /**
   * Click handler
   */
  onLinkClick = () => {
    const { locked, onSelect } = this.props
    if (!locked) {
      onSelect()
    }
  }

  onInformationClick = () => {
    // TODO
  }

  getNewState = (locked, selected, hover) => {
    if (locked) {
      return ItemLink.States.LOCKED
    }
    if (hover) {
      return selected ? ItemLink.States.SELECTED_HOVER : ItemLink.States.HOVER
    }
    if (selected) {
      return ItemLink.States.SELECTED
    }
    return ItemLink.States.DEFAULT
  }

  updateState = (newState) => {
    const currentState = this.state ? this.state.currentState : null
    if (newState !== currentState) {
      // update state
      const { onStateChange } = this.props
      const { moduleTheme: { user: { itemLink: { root, icon, text } } } } = this.context
      // 1 - update styles and store it all in state
      const rootStyles = ItemLink.selectStyles(newState, root, root.commonStyles)
      const textStyles = ItemLink.selectStyles(newState, text, text.commonStyles)
      const iconStyles = ItemLink.selectStyles(newState, icon, icon.commonStyles)
      this.setState({
        currentState: newState,
        rootStyles,
        textStyles,
        iconStyles,
      })
      // 2 - notify lister if any
      if (onStateChange) {
        onStateChange(newState)
      }
    }
  }

  render() {
    const { Icon, text } = this.props
    const { rootStyles, textStyles, iconStyles } = this.state
    const { moduleTheme: { user: { itemLink: { iconsOverlay, lockIcon, informationButton } } } } = this.context
    /* eslint-disable jsx-a11y/no-static-element-interactions*/
    return (
      <div
        style={rootStyles}
      >
        <div
          style={iconsOverlay.styles}
          onMouseOut={this.onMouseOut}
          onMouseOver={this.onMouseOver}
        >
          <ShowableAtRender show={this.state.currentState === ItemLink.States.LOCKED} >
            <LockIcon style={lockIcon.styles} />
          </ShowableAtRender>
          <Icon style={iconStyles} />
        </div>
        <div
          style={textStyles}
          onMouseOut={this.onMouseOut}
          onMouseOver={this.onMouseOver}
          onClick={this.onLinkClick}
        >
          {text}
        </div>
        <IconButton iconStyle={informationButton.iconStyles} style={informationButton.styles}>
          <InformationIcon />
        </IconButton>
      </div>
    )
    /* eslint-enable jsx-a11y/no-static-element-interactions*/
  }
}
export default ItemLink
