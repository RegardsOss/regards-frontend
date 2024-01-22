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
import get from 'lodash/get'
import EmailOpenOutline from 'mdi-material-ui/EmailOpenOutline'
import EmailAlertOutline from 'mdi-material-ui/EmailAlertOutline'
import IconButton from 'material-ui/IconButton'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { AdminShapes } from '@regardsoss/shape'
import { STATUS_ENUM } from '../../../../domain/statusEnum'
/**
 * @author Théo Lasserre
 */
class NotificationStatusCell extends React.Component {
  static propTypes = {
    entity: AdminShapes.NotificationWithinContent,
    onReadNotification: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /**
   * User callback: open notification
   */
  onOpenNotification = () => {
    const { entity: { content }, onReadNotification } = this.props
    onReadNotification(content)
  }

  render() {
    const { entity } = this.props
    const { muiTheme, intl: { formatMessage } } = this.context
    const status = get(entity, 'content.status', STATUS_ENUM.UNREAD)
    return (
      <IconButton
        onClick={this.onOpenNotification}
        title={status === STATUS_ENUM.READ ? formatMessage({ id: 'user.menu.notification.table.cell.status.read.title' }) : formatMessage({ id: 'user.menu.notification.table.cell.status.unread.title' })}
      >
        {
          status === STATUS_ENUM.READ ? <EmailOpenOutline /> : <EmailAlertOutline color={muiTheme.palette.primary1Color} />
        }
      </IconButton>
    )
  }
}
export default NotificationStatusCell
