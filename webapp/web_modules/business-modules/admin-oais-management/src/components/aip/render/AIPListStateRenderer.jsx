/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import IconButton from 'material-ui/IconButton'
import Report from 'material-ui/svg-icons/content/report'
import { StorageDomain } from '@regardsoss/domain'
import { StorageShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
/**
 *
 * @author Sébastien Binda
*/
class AIPListStateRenderer extends React.Component {
  static propTypes = {
    // from table cell API
    entity: StorageShapes.AIPWithStorages.isRequired,
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

  /** User callback: button was clicked */
  onClick = () => {
    const { entity, goToAipFiles } = this.props
    goToAipFiles(entity.content)
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const { entity: { content } } = this.props
    const status = content.aip.state
    return (
      <div style={AIPListStateRenderer.lineWrapper}>
        {status}
        { // Render show file for AIPs in error state
          status === StorageDomain.AIP_STATUS_ENUM.STORAGE_ERROR ? (
            <IconButton
              title={formatMessage({ id: 'oais.aips.files.table.tooltip.show-error-files' })}
              iconStyle={AIPListStateRenderer.iconStyle}
              style={AIPListStateRenderer.buttonStyle}
              onClick={this.onClick}
            >
              <Report />
            </IconButton>
          ) : null}
      </div>
    )
  }
}
export default AIPListStateRenderer
