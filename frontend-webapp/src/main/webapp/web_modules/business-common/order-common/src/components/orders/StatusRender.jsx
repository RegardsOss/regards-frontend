/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { OrderDomain } from '@regardsoss/domain'
import PendingIcon from 'material-ui/svg-icons/action/autorenew'
import RunningIcon from 'material-ui/svg-icons/av/play-arrow'
import PausedIcon from 'material-ui/svg-icons/av/pause'
import ExpiredIcon from 'material-ui/svg-icons/action/alarm-off'
import FailedIcon from 'material-ui/svg-icons/alert/error'
import DoneWithWarningIcon from 'material-ui/svg-icons/alert/warning'
import DoneIcon from 'material-ui/svg-icons/navigation/check'
import RemovedIcon from 'material-ui/svg-icons/content/remove-circle'
import UnknownIcon from 'material-ui/svg-icons/action/help'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

const UNKNOWN = 'UNKNOWN'

/**
* Status render
* @author Raphaël Mechali
*/
class StatusRender extends React.Component {

  static propTypes = {
    value: PropTypes.oneOf(OrderDomain.ORDER_STATUS),
  }


  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /**
   * State to render map
   */
  static stateToIcon = {
    [OrderDomain.ORDER_STATUS_ENUM.PENDING]: PendingIcon,
    [OrderDomain.ORDER_STATUS_ENUM.RUNNING]: RunningIcon,
    [OrderDomain.ORDER_STATUS_ENUM.PAUSED]: PausedIcon,
    [OrderDomain.ORDER_STATUS_ENUM.EXPIRED]: ExpiredIcon,
    [OrderDomain.ORDER_STATUS_ENUM.FAILED]: FailedIcon,
    [OrderDomain.ORDER_STATUS_ENUM.DONE_WITH_WARNING]: DoneWithWarningIcon,
    [OrderDomain.ORDER_STATUS_ENUM.DONE]: DoneIcon,
    [OrderDomain.ORDER_STATUS_ENUM.DELETED]: RemovedIcon,
    [OrderDomain.ORDER_STATUS_ENUM.REMOVED]: RemovedIcon,
    [UNKNOWN]: UnknownIcon,
  }

  render() {
    const { value: status } = this.props
    const { intl: { formatMessage } } = this.context
    const { moduleTheme: { statusCell }, muiTheme } = this.context

    // render status: do not fail on unknwon (may be a null / undefined value)
    const consideredStatus = OrderDomain.ORDER_STATUS.includes(status) ? status : UNKNOWN

    // compute icon, text and color
    const IconConstructor = StatusRender.stateToIcon[consideredStatus]
    const text = formatMessage({ id: `order.list.cell.status.${consideredStatus}.text` })
    const tooltip = formatMessage({ id: `order.list.cell.status.${consideredStatus}.tooltip` })
    const color = muiTheme['module:order-history'][`color.${consideredStatus}`]

    // compute color (ignore if admin destroyed it in theme conf =)
    const cellStyle = color ? { ...statusCell.style, color } : statusCell

    return (
      <div style={cellStyle} title={tooltip}>
        <IconConstructor color={color} style={statusCell.iconStyle} />
        <div style={statusCell.textStyle}>
          {text}
        </div>
      </div>
    )
  }
}
export default StatusRender
