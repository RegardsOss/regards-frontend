/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import get from 'lodash/get'
import PlayIcon from 'mdi-material-ui/Play'
import DoneIcon from 'mdi-material-ui/Check'
import WarningIcon from 'mdi-material-ui/AlertOutline'
import PauseIcon from 'mdi-material-ui/Pause'
import DeletedIcon from 'mdi-material-ui/Close'
import ClockIcon from 'mdi-material-ui/ClockOutline'
import { DateRelativeValueRender } from '@regardsoss/components'
import { OrderShapes } from '@regardsoss/shape'
import { OrderDomain } from '@regardsoss/domain'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { ORDER_DISPLAY_MODES } from '../../../model/OrderDisplayModes'

/**
* Status progress render
* @author Théo Lasserre
*/
class StatusProgressRender extends React.Component {
  static propTypes = {
    entity: OrderShapes.Order,
    displayMode: PropTypes.oneOf(values(ORDER_DISPLAY_MODES)).isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static ORDER_EXPIRE_MS = STATIC_CONF.ORDER_EXPIRE_ICON_DISPLAY || 3600000

  getStatus = () => {
    const { entity } = this.props
    // return waiting status when waitingForUser is true, return backend status otherwise
    return get(entity, 'content.waitingForUser', false)
      ? OrderDomain.ORDER_STATUS_ENUM.WAITING_USER_DOWNLOAD
      : get(entity, 'content.status', OrderDomain.ORDER_STATUS_ENUM.UNKNOWN)
  }

  getProgress = () => {
    const { entity } = this.props
    return get(entity, 'content.percentCompleted', 0)
  }

  getFontColor = (status) => {
    const {
      muiTheme: { module: { orderHistory: { statut } } },
    } = this.context
    let fontColor

    switch (status) {
      case OrderDomain.ORDER_STATUS_ENUM.WAITING_USER_DOWNLOAD:
        fontColor = statut.fontColors.waitingUserColor
        break
      case OrderDomain.ORDER_STATUS_ENUM.PAUSED:
        fontColor = statut.fontColors.pausedColor
        break
      case OrderDomain.ORDER_STATUS_ENUM.FAILED:
        fontColor = statut.fontColors.errorColor
        break
      case OrderDomain.ORDER_STATUS_ENUM.DONE_WITH_WARNING:
        fontColor = statut.fontColors.warningColor
        break
      default:
        fontColor = statut.fontColors.defaultColor
    }
    return fontColor
  }

  computeStyle = (status) => {
    const {
      moduleTheme: { progressBarModuleStyle },
      muiTheme: { module: { orderHistory: { progressBar } } },
    } = this.context
    let outlineColor
    let backgroundColor
    const fontColor = this.getFontColor(status)

    switch (status) {
      case OrderDomain.ORDER_STATUS_ENUM.RUNNING:
        backgroundColor = progressBar.backgroundColors.runningColor
        break
      case OrderDomain.ORDER_STATUS_ENUM.WAITING_USER_DOWNLOAD:
        backgroundColor = progressBar.backgroundColors.waitingUserColor
        outlineColor = progressBar.outlineColors.waitingUserColor
        break
      case OrderDomain.ORDER_STATUS_ENUM.PAUSED:
        backgroundColor = progressBar.backgroundColors.pausedColor
        outlineColor = progressBar.outlineColors.pausedColor
        break
      case OrderDomain.ORDER_STATUS_ENUM.DONE:
        backgroundColor = progressBar.backgroundColors.doneColor
        outlineColor = progressBar.outlineColors.defaultColor
        break
      case OrderDomain.ORDER_STATUS_ENUM.FAILED:
        backgroundColor = progressBar.backgroundColors.errorColor
        outlineColor = progressBar.outlineColors.errorColor
        break
      case OrderDomain.ORDER_STATUS_ENUM.DONE_WITH_WARNING:
        backgroundColor = progressBar.backgroundColors.warningColor
        outlineColor = progressBar.outlineColors.warningColor
        break
      case OrderDomain.ORDER_STATUS_ENUM.EXPIRED:
        outlineColor = progressBar.outlineColors.warningColor
        break
      default:
        outlineColor = progressBar.outlineColors.defaultColor
        backgroundColor = progressBar.backgroundColors.doneColor
    }

    return {
      progressBarStatut: {
        ...progressBarModuleStyle.progressBarStatut,
        color: fontColor,
      },
      progressBarOutlineStyle: {
        ...progressBarModuleStyle.progressBarOutline,
        backgroundColor: outlineColor,
        height: progressBar.barHeight + 4,
      },
      progressBarStyle: {
        ...progressBarModuleStyle.progressBarStyle,
        height: progressBar.barHeight,
        padding: progressBar.padding,
      },
      progressBarContentStyle: {
        ...progressBarModuleStyle.progressBarContentStyle,
        height: progressBar.barHeight,
        padding: progressBar.padding,
        backgroundColor,
      },
    }
  }

  displayStatusIcon = (status) => {
    const {
      moduleTheme: { progressBarModuleStyle: { statusIconStyle } },
    } = this.context
    let iconToDisplay
    const fontColor = this.getFontColor(status)
    switch (status) {
      case OrderDomain.ORDER_STATUS_ENUM.DONE:
        iconToDisplay = <DoneIcon color={fontColor} style={statusIconStyle} />
        break
      case OrderDomain.ORDER_STATUS_ENUM.RUNNING:
        iconToDisplay = <PlayIcon color={fontColor} style={statusIconStyle} />
        break
      case OrderDomain.ORDER_STATUS_ENUM.FAILED:
        iconToDisplay = <WarningIcon color={fontColor} style={statusIconStyle} />
        break
      case OrderDomain.ORDER_STATUS_ENUM.DONE_WITH_WARNING:
        iconToDisplay = <WarningIcon color={fontColor} style={statusIconStyle} />
        break
      case OrderDomain.ORDER_STATUS_ENUM.PAUSED:
        iconToDisplay = <PauseIcon color={fontColor} style={statusIconStyle} />
        break
      case OrderDomain.ORDER_STATUS_ENUM.DELETED:
        iconToDisplay = <DeletedIcon color={fontColor} style={statusIconStyle} />
        break
      default:
        iconToDisplay = null
    }
    return iconToDisplay
  }

  willExpire = (currentDate, expirationDate) => (currentDate >= expirationDate - StatusProgressRender.ORDER_EXPIRE_MS && currentDate < expirationDate)

  displayExpirationIcon = (currentDate, expirationDate) => {
    const { moduleTheme: { progressBarModuleStyle } } = this.context
    if (expirationDate) {
      if (this.willExpire(currentDate, expirationDate)) {
        return (<ClockIcon style={progressBarModuleStyle.expirationIconStyle} />)
      } if (expirationDate < currentDate) {
        return (<ClockIcon style={progressBarModuleStyle.expiredIconStyle} />)
      }
    }
    return null
  }

  getExpirationIconTitle = (currentDate, expirationDate) => {
    const { intl } = this.context
    if (expirationDate) {
      if (this.willExpire(currentDate, expirationDate)) {
        return intl.formatMessage({ id: 'order.list.cell.status.remainingTime' }, { value: DateRelativeValueRender.getFormattedDate(intl, expirationDate, true) })
      } if (expirationDate < currentDate) {
        return intl.formatMessage({ id: 'order.list.cell.status.expired' })
      }
    }
    return null
  }

  getPercentLabelStyle = () => {
    const { displayMode } = this.props
    const { moduleTheme: { progressBarModuleStyle } } = this.context
    return displayMode === ORDER_DISPLAY_MODES.USER ? progressBarModuleStyle.percentUserLabelStyle : progressBarModuleStyle.percentAdminLabelStyle
  }

  render() {
    const { entity } = this.props
    const { intl, moduleTheme: { progressBarModuleStyle } } = this.context
    const status = this.getStatus()
    const percent = this.getProgress()
    const orderStyle = this.computeStyle(status)
    const entityExpirationDate = get(entity, 'content.expirationDate', null)
    const currentDate = Date.now()
    const expirationDate = entityExpirationDate ? new Date(entityExpirationDate).getTime() : null
    return (
      <div style={progressBarModuleStyle.progressBarContainer}>
        <div style={progressBarModuleStyle.statusContainer}>
          <div style={orderStyle.progressBarStatut}>
            {this.displayStatusIcon(status)}
            {intl.formatMessage({ id: `order.list.cell.status.${status}` })}
          </div>
          <div
            title={this.getExpirationIconTitle(currentDate, expirationDate)}
            style={progressBarModuleStyle.expirationIconContainer}
          >
            {this.displayExpirationIcon(currentDate, expirationDate)}
          </div>
        </div>
        <div style={orderStyle.progressBarOutlineStyle}>
          <div style={orderStyle.progressBarStyle}>
            <div
              style={{
                ...orderStyle.progressBarContentStyle,
                ...{ width: `${percent}%` },
              }}
            />
            <div style={this.getPercentLabelStyle()}>{ `${percent}%` }</div>
          </div>
        </div>
      </div>
    )
  }
}
export default StatusProgressRender
