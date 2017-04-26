/**
* LICENSE_PLACEHOLDER
**/
import { connect } from '@regardsoss/redux'
import { CatalogEntity } from '@regardsoss/model'
import GraphContextActions from '../../model/graph/GraphContextActions'
import ItemLink from '../../components/user/ItemLink'

/**
* Item link container (provides links to store)
*/
export class ItemLinkContainer extends React.Component {

  static mapDispatchToProps = dispatch => ({
    dispatchShowDescription: entity => dispatch(GraphContextActions.showDescription(entity)),
  })

  static propTypes = {
    Icon: React.PropTypes.func.isRequired,
    entity: CatalogEntity.isRequired,
    additiveLineComponent: React.PropTypes.node, // an optional additive line component
    onSelect: React.PropTypes.func.isRequired,
    locked: React.PropTypes.bool.isRequired,
    selected: React.PropTypes.bool.isRequired,
    onStateChange: React.PropTypes.func, // optional callback on state change: (newState:ItemLink.States) => void
    // from mapDispatchToProps
    dispatchShowDescription: React.PropTypes.func.isRequired,
  }

  componentWillMount = () => {
    // initialize state
    const { locked, selected } = this.props
    this.updateDisplayState(this.getNewState(locked, selected, false))
  }

  componentWillReceiveProps = (nextProps) => {
    // update state, in case of locked or selected properties changed
    const { locked, selected } = nextProps
    const hover = [ItemLink.States.HOVER, ItemLink.States.SELECTED_HOVER].includes(this.state.currentState)
    this.updateDisplayState(this.getNewState(locked, selected, hover))
  }


  /**
  * Mouse over handler
  */
  onMouseOver = () => {
    const { locked, selected } = this.props
    this.updateDisplayState(this.getNewState(locked, selected, true))
  }

  /**
   * Mouse out handler
   */
  onMouseOut = () => {
    const { locked, selected } = this.props
    this.updateDisplayState(this.getNewState(locked, selected, false))
  }

  /**
   * On link click handler: dispatch selection
   */
  onLinkClicked = () => {
    const { locked, selected, onSelect } = this.props
    if (!locked && !selected) {
      onSelect()
    }
  }

  /**
   * On information clicked : dispatch show description
   */
  onDescriptionClicked = () => {
    const { dispatchShowDescription, entity } = this.props
    dispatchShowDescription(entity)
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

  /**
  * Updates component state
  */
  updateDisplayState = (displayState) => {
    if (this.state === null || this.state.displayState !== displayState) {
      // A - update this component state
      this.setState({
        displayState,
      })
      // B - notify listener
      const { onStateChange } = this.props
      if (onStateChange) {
        onStateChange(displayState)
      }
    }
  }

  render() {
    const { Icon, entity: { content: { label } }, additiveLineComponent } = this.props
    const { displayState } = this.state
    return (
      <ItemLink
        text={label}
        Icon={Icon}
        additiveLineComponent={additiveLineComponent}
        displayState={displayState}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        onLinkClicked={this.onLinkClicked}
        onDescriptionClicked={this.onDescriptionClicked}
      />
    )
  }
}
export default connect(null, ItemLinkContainer.mapDispatchToProps)(ItemLinkContainer)
