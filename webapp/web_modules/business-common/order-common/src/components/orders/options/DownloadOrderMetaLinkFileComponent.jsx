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
import omit from 'lodash/omit'
import IconButton from 'material-ui/IconButton'
import DownloadMetalinkIcon from 'mdi-material-ui/Link'
import { DownloadButton } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/** Constructor wrapper to use the IconButton within a DropDownButton */
const IconButtonConstructorWrapper = (props) => (
  <IconButton {...(omit(props, ['label', 'labelPosition']))}>
    <DownloadMetalinkIcon />
  </IconButton>)

/**
 * Download order metalink file table option
 * @author Raphaël Mechali
 */
class DownloadOrderMetaLinkFileComponent extends React.Component {
  static propTypes = {
    canDownload: PropTypes.bool.isRequired,
    downloadMetalinkURL: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const { canDownload, downloadMetalinkURL } = this.props
    const { intl: { formatMessage } } = this.context

    return (
      <DownloadButton
        key="download.order.files.metalink"
        ButtonConstructor={IconButtonConstructorWrapper}
        downloadURL={downloadMetalinkURL}
        title={formatMessage({ id: 'order.list.option.cell.download.metalink.tooltip' })}
        disabled={!canDownload}
      />)
  }
}
export default DownloadOrderMetaLinkFileComponent
