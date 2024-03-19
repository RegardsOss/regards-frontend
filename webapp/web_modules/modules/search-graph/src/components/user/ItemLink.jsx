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
import values from 'lodash/values'
import LockIcon from 'mdi-material-ui/Lock'
import InformationIcon from 'mdi-material-ui/InformationOutline'
import IconButton from 'material-ui/IconButton'
import { CatalogShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { ShowableAtRender } from '@regardsoss/components'
import { DescriptionProperties } from '../../shapes/DescriptionProperties'

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
    entity: CatalogShapes.Entity.isRequired,
    Icon: PropTypes.func.isRequired,
    additiveLineComponent: PropTypes.node, // an optional additive line component
    // parent container control
    onMouseOver: PropTypes.func.isRequired,
    onMouseOut: PropTypes.func.isRequired,
    onLinkClicked: PropTypes.func.isRequired,
    // description control (From root HOC)
    descriptionProperties: DescriptionProperties.isRequired, // From description HOC
    // show state of this component
    displayState: PropTypes.oneOf(values(ItemLink.States)).isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  UNSAFE_componentWillMount() {
    this.updateDisplayStateStyles(null, this.props.displayState)
  }

  UNSAFE_componentWillReceiveProps({ displayState: nextState }) {
    const { displayState: previousState } = this.props
    this.updateDisplayStateStyles(previousState, nextState)
  }

  /**
   * User callback: show description
   */
  onShowDescription = () => {
    const { descriptionProperties: { onShowDescription }, entity } = this.props
    onShowDescription(entity)
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
      Icon, entity, displayState, additiveLineComponent,
      onMouseOver, onMouseOut, onLinkClicked,
      descriptionProperties: { showDescriptionOption, isDescriptionAvailableFor },
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
          <ShowableAtRender show={displayState === ItemLink.States.LOCKED}>
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
          {entity.content.label}
        </div>
        {
          /* Additive line component if any */
          additiveLineComponent || null
        }
        {/* Show description button, when it is available for collection OR datasets (to align all elements together) */
          showDescriptionOption ? (
            <IconButton
              title={formatMessage({ id: 'search.graph.entity.detail.tooltip' })}
              iconStyle={informationButton.iconStyles}
              style={informationButton.styles}
              onClick={this.onShowDescription}
              disabled={!isDescriptionAvailableFor(entity.content.entityType)}
            >
              <InformationIcon />
            </IconButton>) : null
        }
      </div>
    )
  }
}
export default ItemLink
