/**
* LICENSE_PLACEHOLDER
**/
import values from 'lodash/values'
import LockIcon from 'material-ui/svg-icons/action/lock'
import InformationIcon from 'material-ui/svg-icons/action/info-outline'
import IconButton from 'material-ui/IconButton'
import { i18nContextType } from '@regardsoss/i18n'
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
  static selectStyles = (newState, {
    defaultStyles = {}, lockedStyles = {}, hoverStyles = {}, selectedStyles = {},
  }, basicStyles = {}) => {
    switch (newState) {
      case ItemLink.States.DEFAULT:
        return { ...basicStyles, ...defaultStyles }
      case ItemLink.States.LOCKED:
        return { ...basicStyles, ...lockedStyles }
      case ItemLink.States.HOVER:
      case ItemLink.States.SELECTED_HOVER:
        return { ...basicStyles, ...hoverStyles }
      case ItemLink.States.SELECTED:
        return { ...basicStyles, ...selectedStyles }
      default:
        throw new Error('Unknown state')
    }
  }

  static propTypes = {
    text: PropTypes.string.isRequired,
    Icon: PropTypes.func.isRequired,
    additiveLineComponent: PropTypes.node, // an optional additive line component
    // parent container control
    onMouseOver: PropTypes.func.isRequired,
    onMouseOut: PropTypes.func.isRequired,
    onLinkClicked: PropTypes.func.isRequired,
    onDescriptionClicked: PropTypes.func.isRequired,
    // show state of this component
    displayState: PropTypes.oneOf(values(ItemLink.States)).isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  componentWillMount() {
    this.updateDisplayStateStyles(null, this.props.displayState)
  }

  componentWillReceiveProps = ({ displayState: nextState }) => {
    const { displayState: previousState } = this.props
    this.updateDisplayStateStyles(previousState, nextState)
  }

  updateDisplayStateStyles = (previousState, newState) => {
    if (previousState !== newState) {
      // update state
      const { moduleTheme: { user: { itemLink: { root, icon, text } } } } = this.context
      // 1 - update styles and store it all in state
      const rootStyles = ItemLink.selectStyles(newState, root, root.commonStyles)
      const textStyles = ItemLink.selectStyles(newState, text, text.commonStyles)
      const iconStyles = ItemLink.selectStyles(newState, icon, icon.commonStyles)
      this.setState({
        rootStyles,
        textStyles,
        iconStyles,
      })
    }
  }

  render() {
    const {
      Icon, text, displayState, additiveLineComponent,
      onMouseOver, onMouseOut, onLinkClicked, onDescriptionClicked,
    } = this.props
    const { rootStyles, textStyles, iconStyles } = this.state
    const {
      moduleTheme: { user: { itemLink: { iconsOverlay, lockIcon, informationButton } } },
      intl: { formatMessage },
    } = this.context

    return (
      <div
        style={rootStyles}
      >
        {/* Type icons overlay */}
        <div
          style={iconsOverlay.styles}
          onMouseOut={onMouseOut}
          onMouseOver={onMouseOver}
        >
          {/* Conditional: lock icon (shown only when locked) */}
          <ShowableAtRender show={displayState === ItemLink.States.LOCKED} >
            <LockIcon style={lockIcon.styles} />
          </ShowableAtRender>
          {/* File type icon */}
          <Icon style={iconStyles} />
        </div>
        {/* Link div */}
        <div
          style={textStyles}
          onMouseOut={onMouseOut}
          onMouseOver={onMouseOver}
          onClick={onLinkClicked}
        >
          {text}
        </div>
        {
          /* Additive line component if any */
          additiveLineComponent || null
        }
        {/* Show description button */}
        <IconButton
          title={formatMessage({ id: 'search.graph.entity.detail.tooltip' })}
          iconStyle={informationButton.iconStyles}
          style={informationButton.styles}
          onClick={onDescriptionClicked}
        >
          <InformationIcon />
        </IconButton>
      </div>
    )
  }
}
export default ItemLink
