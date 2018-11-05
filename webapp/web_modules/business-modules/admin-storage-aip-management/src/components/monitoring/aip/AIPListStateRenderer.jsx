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
import { StorageShapes } from '@regardsoss/shape'
import Report from 'material-ui/svg-icons/content/report'
import IconButton from 'material-ui/IconButton'
import { i18nContextType } from '@regardsoss/i18n'
import AIPStatusEnum from './AIPStatusEnum'
/**
 *
 * @author Sébastien Binda
*/
class AIPFileListStateRenderer extends React.Component {
  static propTypes = {
    // from table cell API
    entity: StorageShapes.AIP,
    goToAipFiles: PropTypes.func.isRequired,
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
    const { entity } = this.props
    const status = entity.content.state
    // display an icon if the status can contains a stacktrace
    let icon = null
    if (status === AIPStatusEnum.STORAGE_ERROR) {
      icon = (
        <IconButton
          title={formatMessage({ id: 'aips.files.table.tooltip.show-error-files' })}
          iconStyle={AIPFileListStateRenderer.iconStyle}
          style={AIPFileListStateRenderer.buttonStyle}
          onClick={() => this.props.goToAipFiles(entity.content)}
        >
          <Report />
        </IconButton>
      )
    }
    return (
      <div style={AIPFileListStateRenderer.lineWrapper}>
        {status}
        {icon}
      </div>
    )
  }
}
export default AIPFileListStateRenderer
