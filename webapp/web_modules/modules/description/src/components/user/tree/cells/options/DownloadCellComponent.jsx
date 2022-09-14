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
import IconButton from 'material-ui/IconButton'
import { DownloadButton } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  DownloadIconComponent, QuotaInfo, QuotaDownloadUtils, withQuotaInfo,
} from '@regardsoss/entities-common'
import { withAuthInfo } from '@regardsoss/authentication-utils'
import { FileData } from '../../../../../shapes/DescriptionState'

/** Button constructor for inner download button graphics */
export const DownloadInnerButton = ({ constrainedByQuota, quotaInfo, ...props }) => (
  <IconButton {...props}>
    <DownloadIconComponent
      constrainedByQuota={constrainedByQuota}
      quotaInfo={quotaInfo}
    />
  </IconButton>)

DownloadInnerButton.propTypes = {
  constrainedByQuota: PropTypes.bool.isRequired,
  quotaInfo: QuotaInfo,
}

/**
 * Cell showing download option
 * @author Raphaël Mechali
 */
export class DownloadCellComponent extends React.Component {
  static propTypes = {
    file: FileData.isRequired,
    // from withAuthInfo
    accessToken: PropTypes.string,
    // from withQuotaInfo
    quotaInfo: QuotaInfo,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const {
      quotaInfo, accessToken,
      file: {
        label, uri, available, type, reference, mimeType,
      },
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { user: { main: { tree: { cell: { iconButton } } } } } } = this.context
    const openInNewTab = STATIC_CONF.OPEN_NEW_TAB_MIME_TYPES.includes(mimeType)
    // If the file mimeType is configured to be open in a new tab, the download <a> link must be configured with target=blanck and no download property
    // this button should be shown only when the file can be downloaded AND is not constrained by quota OR user has a quota (=> not public)
    return available && (!QuotaDownloadUtils.isConstrainedByQuota(type, reference) || accessToken) ? (
      <DownloadButton
        ButtonConstructor={DownloadInnerButton}
        ButtonIcon={null}
        disabled={!QuotaDownloadUtils.canDownload(available, type, reference, quotaInfo, accessToken)}
        downloadName={openInNewTab ? null : label}
        downloadURL={uri}
        tooltip={formatMessage({ id: `module.description.common.${openInNewTab ? 'open' : 'download'}.file.tooltip` }, { fileName: label })}
        // icon button props
        style={iconButton.style}
        iconStyle={iconButton.iconStyle}
        // icon component props
        constrainedByQuota={QuotaDownloadUtils.isConstrainedByQuota(type, reference)}
        quotaInfo={quotaInfo}
        isBlank={openInNewTab}
      />) : null // hide option when not available
  }
}
export default withAuthInfo(withQuotaInfo(DownloadCellComponent))
