/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import DownloadIcon from 'mdi-material-ui/Download'
import Chip from 'material-ui/Chip'
import { DownloadButton, ShowableAtRender } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/** Constructor wrapper to use the IconButton within a DropDownButton */
const IconButtonConstructorWrapper = (props) => <IconButton {...(omit(props, ['label', 'labelPosition']))} />

/**
 * Download order files as zip table option
 * @author Raphaël Mechali
 */
class DownloadOrderFilesAsZipComponent extends React.Component {
  static propTypes = {
    isWaitingUser: PropTypes.bool.isRequired,
    availableFilesCount: PropTypes.number.isRequired,
    canDownload: PropTypes.bool.isRequired,
    downloadZipURL: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /** Max files count */
  static MAX_FILES_COUNT = 99

  /** Max files hit text */
  static MAX_FILES_TEXT = `${DownloadOrderFilesAsZipComponent.MAX_FILES_COUNT}+`

  /** Replacement char for no digit */
  static NO_DIGIT_CHAR = '\u00A0'

  /**
   * Computes a number or text digits count
   * @param {number|string} value value
   * @return {number} digits count in text
   */
  static computeDigitsCount(value) {
    return (`${value}`).length
  }

  render() {
    const {
      isWaitingUser, canDownload, downloadZipURL, availableFilesCount,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { downloadWithCount }, muiTheme } = this.context
    // compute displayed text (null if it should be hidden)
    let filesCountText = null
    if (availableFilesCount > 0) {
      if (availableFilesCount > DownloadOrderFilesAsZipComponent.MAX_FILES_COUNT) {
        // more than max
        filesCountText = DownloadOrderFilesAsZipComponent.MAX_FILES_TEXT
      } else {
        // find missing elements count to 'stabilize' chip width
        const digitsCount = DownloadOrderFilesAsZipComponent.computeDigitsCount(availableFilesCount)
        const missingDigits = DownloadOrderFilesAsZipComponent.MAX_FILES_TEXT.length - digitsCount
        // dispatch missing count before and after the value (note: we use 2 character to obtain an equivalent size)
        const halfFillingText = new Array(missingDigits + 1).join(DownloadOrderFilesAsZipComponent.NO_DIGIT_CHAR)
        filesCountText = halfFillingText + availableFilesCount + halfFillingText
      }
    }

    // if command is waiting, incite the user to download it with animation
    let buttonStyle = downloadWithCount.iconButton.style
    if (isWaitingUser && canDownload) {
      buttonStyle = {
        ...buttonStyle,
        animation: muiTheme.module.orderHistory['waiting.user.download.animation'],
      }
    }

    return (
      <DownloadButton
        key="download.order.files.zip"
        downloadURL={downloadZipURL}
        ButtonConstructor={IconButtonConstructorWrapper}
        title={formatMessage({ id: 'order.list.option.cell.download.zip.tooltip' })}
        disabled={!canDownload}
        style={buttonStyle}
        iconStyle={downloadWithCount.iconButton.iconStyle}
      >
        <div>
          <ShowableAtRender show={!!filesCountText}>
            <div style={downloadWithCount.overlay.style}>
              <Chip
                labelStyle={downloadWithCount.overlay.chip.labelStyle}
                style={downloadWithCount.overlay.chip.style}
              >
                {filesCountText}
              </Chip>
            </div>
          </ShowableAtRender>
          <DownloadIcon
            style={downloadWithCount.icon.style}
            color={canDownload ? muiTheme.flatButton.textColor : muiTheme.flatButton.disabledTextColor}
          />
        </div>
      </DownloadButton>
    )
  }
}
export default DownloadOrderFilesAsZipComponent
