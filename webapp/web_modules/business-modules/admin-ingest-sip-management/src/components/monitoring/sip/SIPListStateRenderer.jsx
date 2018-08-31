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
import { IngestShapes } from '@regardsoss/shape'
import { IngestDomain } from '@regardsoss/domain'
import Report from 'material-ui/svg-icons/content/report'
import IconButton from 'material-ui/IconButton'
import { i18nContextType } from '@regardsoss/i18n'
/**
 *
 * @author Sébastien Binda
*/
class SIPListStateRenderer extends React.Component {
  static propTypes = {
    // from table cell API
    entity: IngestShapes.IngestSIP,
    goToSessionAIPsMonitoring: PropTypes.func.isRequired,
    session: PropTypes.string,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static lineWrapper = {
    display: 'flex',
    alignItems: 'center',
  }

  static iconStyle = { height: 23, width: 23 }

  static buttonStyle = { padding: 0, height: 30, width: 30 }

  render() {
    const { intl: { formatMessage } } = this.context
    const { entity, session } = this.props
    const status = entity.content.state
    // display an icon if the status can contains a stacktrace
    let icon = null
    console.error('entity', entity)
    if (status === IngestDomain.SIPStateEnum.STORE_ERROR) {
      icon = (
        <IconButton
          title={formatMessage({ id: 'sips.list.table.tooltip.go-to-aip-management' })}
          iconStyle={SIPListStateRenderer.iconStyle}
          style={SIPListStateRenderer.buttonStyle}
          onClick={() => this.props.goToSessionAIPsMonitoring(session)}
        >
          <Report />
        </IconButton>
      )
    }
    return (
      <div style={SIPListStateRenderer.lineWrapper}>
        {status}
        {icon}
      </div>
    )
  }
}
export default SIPListStateRenderer
