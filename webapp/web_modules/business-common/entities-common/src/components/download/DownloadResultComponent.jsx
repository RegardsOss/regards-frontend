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
import { DownloadButton } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'

/**
* Auto Download pre fetched blob content from local URL
* Donwload is activated at component mount
* @author Sébastien Binda
*/
class DownloadResultComponent extends React.Component {
  static propTypes = {
    localAccessURL: PropTypes.string.isRequired, // Not URL as it may be local URL (prefixed by blob)
    // Name of the file to download. When not provided, the names comes from local
    // access URL attachment header (if any) or defaults to URL
    fileName: PropTypes.string, // Note: when not provided, the names comes from local access URL attachment header (if any)
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /** Button reference */
  downloadButtonRef = React.createRef()

  componentDidMount() {
    this.downloadButtonRef.current.forceDownload()
  }

  render() {
    const { localAccessURL, fileName } = this.props
    return (
      <DownloadButton
        ref={this.downloadButtonRef}
        downloadURL={localAccessURL}
        downloadName={fileName}
        hidden
        isBlank
      />)
  }
}

export default DownloadResultComponent
