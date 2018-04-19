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
import { connect } from '@regardsoss/redux'
import { CatalogShapes } from '@regardsoss/shape'
import { descriptionLevelModel } from '@regardsoss/entities-common'
import { descriptionLevelActions } from '../../model/description/DescriptionLevelModel'
import ItemLink from '../../components/user/ItemLink'

/**
* Item link container (provides links to store)
*/
export class ItemLinkContainer extends React.Component {
  static mapDispatchToProps = dispatch => ({
    dispatchShowDescription: entity =>
      dispatch(descriptionLevelActions.show(entity, descriptionLevelModel.DescriptionLevelActions.TABS_ENUM.PROPERTIES)),
  })

  static propTypes = {
    Icon: PropTypes.func.isRequired,
    entity: CatalogShapes.Entity.isRequired,
    additiveLineComponent: PropTypes.node, // an optional additive line component
    onSelect: PropTypes.func.isRequired,
    locked: PropTypes.bool.isRequired,
    selected: PropTypes.bool.isRequired,
    onStateChange: PropTypes.func, // optional callback on state change: (newState:ItemLink.States) => void
    // from mapDispatchToProps
    dispatchShowDescription: PropTypes.func.isRequired,
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
    const { locked, onSelect } = this.props
    if (!locked) {
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