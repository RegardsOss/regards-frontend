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
import omit from 'lodash/omit'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import DownloadIcon from 'material-ui/svg-icons/file/file-download'
import DownloadZip from 'mdi-material-ui/ZipBox'
import DownloadMetalink from 'material-ui/svg-icons/content/link'
import { DropDownButton } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/** Constructor wrapper to use the IconButton within a DropDownButton */
const IconButtonConstructorWrapper = props => (
  <IconButton {...(omit(props, ['label', 'labelPosition']))}>
    <DownloadIcon />
  </IconButton>)

/**
*  Download order files option
* @author Raphaël Mechali
*/
class DownloadOrderFilesComponent extends React.Component {

  static propTypes = {
    // callbacks, disabled when not provided
    onDownloadZip: PropTypes.func,
    onDownloadMetalink: PropTypes.func,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static NO_LABEL_FUNCTION = () => { }

  /**
   * On value changed
   */
  onValueChanged = (selectedDownloadCallback) => {
    // run callback
    selectedDownloadCallback()
  }

  render() {
    const { onDownloadZip, onDownloadMetalink } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <DropDownButton
        title={formatMessage({ id: 'order.list.option.cell.download.title' })}
        getLabel={DownloadOrderFilesComponent.NO_LABEL_FUNCTION}
        onChange={this.onValueChanged}
        disabled={!onDownloadZip && !onDownloadMetalink}
        ButtonConstructor={IconButtonConstructorWrapper}
      >
        {/* Download zip if available */
          onDownloadZip ? (
            <MenuItem
              key="download.order.files.zip"
              leftIcon={<DownloadZip />}
              value={onDownloadZip}
              primaryText={formatMessage({ id: 'order.list.option.cell.download.zip.message' })}
            />) : null
        }
        {/* Download meta links if available */
          onDownloadZip ? (
            <MenuItem
              key="download.order.files.metalink"
              leftIcon={<DownloadMetalink />}
              value={onDownloadZip}
              primaryText={formatMessage({ id: 'order.list.option.cell.download.metalink.message' })}
            />) : null

        }
      </DropDownButton>
    )
  }
}
export default DownloadOrderFilesComponent
