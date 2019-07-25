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
import { StorageShapes } from '@regardsoss/shape'
import Report from 'material-ui/svg-icons/content/report'
import IconButton from 'material-ui/IconButton'
import { i18nContextType } from '@regardsoss/i18n'
/**
 *
 * @author Léo Mieulet
*/
class AIPFileListStateRenderer extends React.Component {
  static propTypes = {
    // from table cell API
    entity: StorageShapes.DataObject,
    onShow: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static lineWrapper = {
    display: 'flex',
    alignItems: 'center',
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const { entity } = this.props
    const status = entity.content.state
    // display an icon if the status can contains a stacktrace
    let icon = null
    if (status === 'ERROR') {
      icon = (
        <IconButton
          title={formatMessage({ id: 'oais.aips.files.table.tooltip.show-stacktrace' })}
          onClick={() => this.props.onShow(entity)}
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
