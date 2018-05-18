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
import IconButton from 'material-ui/IconButton'
import DownloadIcon from 'material-ui/svg-icons/file/file-download'
import { DownloadButton } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'


/**
 * File download option cell component
 * @author Raphaël Mechali
 */
class FileDownloadComponent extends React.Component {
  static propTypes = {
    canDownload: PropTypes.bool.isRequired,
    downloadURL: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { canDownload, downloadURL } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <DownloadButton
        tooltip={formatMessage({ id: 'files.list.cell.options.download.tooltip' })}
        downloadURL={downloadURL}
        ButtonIcon={null} // remove default icon, use children instead for an Icon button
        ButtonConstructor={IconButton}
        disabled={!canDownload}
      >
        <DownloadIcon />
      </DownloadButton>
    )
  }
}
export default FileDownloadComponent
