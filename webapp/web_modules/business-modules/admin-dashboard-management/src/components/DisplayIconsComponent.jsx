/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

import sum from 'lodash/sum'
import map from 'lodash/map'
import get from 'lodash/get'
import { themeContextType } from '@regardsoss/theme'
import { AdminShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import IconButton from 'material-ui/IconButton'
import Chip from 'material-ui/Chip'
import Running from 'mdi-material-ui/PlayCircleOutline'
import Alert from 'mdi-material-ui/AlertOutline'
import Error from 'mdi-material-ui/AlertCircleOutline'
import { DISPLAY_ICON_TYPE, DISPLAY_ICON_TYPE_ENUM } from '../domain/displayIconTypes'
import { ICON_TYPE_ENUM } from '../domain/iconType'

/**
 * Display Icons Component either for source & session table or session step title
 * @author Théo Lasserre
 */
class DisplayIconsComponent extends React.Component {
  static propTypes = {
    entity: PropTypes.oneOfType([
      AdminShapes.Source,
      AdminShapes.Session,
      AdminShapes.SessionStep,
    ]).isRequired,
    displayIconType: PropTypes.oneOf(DISPLAY_ICON_TYPE).isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  getValue = (entity, iconType, displayIconType) => (displayIconType === DISPLAY_ICON_TYPE_ENUM.COUNT ? get(entity, `content.managerState.${iconType}`, false) : get(entity, `state.${iconType}`, 0))

  displayIcons = (runnings) => {
    const { moduleTheme: { displayIconsComponentStyle: { displayIconsDivStyle } } } = this.context
    return (<div style={displayIconsDivStyle}>
      {runnings ? this.displayIcon(ICON_TYPE_ENUM.RUNNING) : null}
    </div>)
  }

  // Display icon in session step title
  displayIcon = (iconType) => {
    const {
      intl: { formatMessage },
      moduleTheme: { dashboardStyle: { tableStyle: { overlayStyle } }, displayIconsComponentStyle: { displayIconDivStyle } },
    } = this.context
    let iconComponent
    switch (iconType) {
      case ICON_TYPE_ENUM.RUNNING:
        iconComponent = <Running style={overlayStyle.icon.runningStyle} />
        break
      case ICON_TYPE_ENUM.WAITING:
        iconComponent = <Alert style={overlayStyle.icon.waitingStyle} />
        break
      case ICON_TYPE_ENUM.ERRORS:
        iconComponent = <Error style={overlayStyle.icon.errorStyle} />
        break
      default:
    }
    return <div style={displayIconDivStyle} title={formatMessage({ id: `dashboard.table.icon.tooltip.${iconType}` })}>
      {iconComponent}
    </div>
  }

  getElementCount = (iconType) => {
    const { entity } = this.props
    let elementCount = 0
    if (iconType === ICON_TYPE_ENUM.WAITING || iconType === ICON_TYPE_ENUM.ERRORS) {
      elementCount = sum(map(entity.content.steps, (step) => step.state[iconType]))
    }
    return elementCount
  }

  // Display icons in session or source table
  displayIconsWithCount = (errors, waitings, runnings) => {
    const { moduleTheme: { displayIconsComponentStyle: { displayIconsWithCountDivStyle } } } = this.context
    return (<div style={displayIconsWithCountDivStyle}>
      {runnings ? this.displayIconWithCount(ICON_TYPE_ENUM.RUNNING) : null}
      {waitings ? this.displayIconWithCount(ICON_TYPE_ENUM.WAITING) : null}
      {errors ? this.displayIconWithCount(ICON_TYPE_ENUM.ERRORS) : null}
    </div>)
  }

  displayIconWithCount = (iconType) => {
    const {
      intl: { formatMessage }, moduleTheme: { dashboardStyle: { tableStyle: { overlayStyle } }, displayIconsComponentStyle: { displayNone } },
    } = this.context
    let iconComponent
    const elementCount = this.getElementCount(iconType)
    switch (iconType) {
      case ICON_TYPE_ENUM.RUNNING:
        iconComponent = <Running style={overlayStyle.icon.runningAltStyle} />
        break
      case ICON_TYPE_ENUM.WAITING:
        iconComponent = <Alert style={elementCount === 0 ? overlayStyle.icon.waitingStyle : overlayStyle.icon.waitingAltStyle} />
        break
      case ICON_TYPE_ENUM.ERRORS:
        iconComponent = <Error style={elementCount === 0 ? overlayStyle.icon.errorStyle : overlayStyle.icon.errorAltStyle} />
        break
      default:
    }
    return (<div style={overlayStyle.iconDivStyle} title={formatMessage({ id: `dashboard.table.icon.tooltip.${iconType}` })}>
      <IconButton
        disabled
        style={overlayStyle.iconButton.style}
      />
      <div style={overlayStyle.style}>
        <Chip
          labelStyle={overlayStyle.chip.labelStyle}
          style={elementCount !== 0 ? overlayStyle.chip.style : displayNone}
        >
          {elementCount}
        </Chip>
        {iconComponent}
      </div>
    </div>)
  }

  render() {
    const { entity, displayIconType } = this.props
    const { moduleTheme: { displayIconsComponentStyle: { mainDivStyle } } } = this.context
    const errors = this.getValue(entity, ICON_TYPE_ENUM.ERRORS, displayIconType)
    const waitings = this.getValue(entity, ICON_TYPE_ENUM.WAITING, displayIconType)
    const runnings = this.getValue(entity, ICON_TYPE_ENUM.RUNNING, displayIconType)
    return (
      <div style={mainDivStyle}>
        {
          displayIconType === DISPLAY_ICON_TYPE_ENUM.COUNT
            ? this.displayIconsWithCount(errors, waitings, runnings)
            : this.displayIcons(runnings)
        }
      </div>
    )
  }
}
export default DisplayIconsComponent
