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
import { UIDomain } from '@regardsoss/domain'
import FileIcon from 'mdi-material-ui/FileImage'
import { i18nContextType } from '@regardsoss/i18n'
import { DownloadButton } from '@regardsoss/components'
import { withAuthInfo } from '@regardsoss/authentication-utils'
import {
  DownloadIconComponent, QuotaDownloadUtils, QuotaInfo, withQuotaInfo,
} from '@regardsoss/entities-common'
import { FileData } from '../../../../../shapes/DescriptionState'
import PageLinkCellComponent from '../common/PageLinkCellComponent'
import PageElement from '../common/PageElement'
import PageElementOption from '../common/PageElementOption'

/**
 * A file link component for list page displaying (displays as simple text when file is offline)
 * @author Raphaël Mechali
 */
export class FileLinkComponent extends React.Component {
  static propTypes = {
    section: PropTypes.oneOf(UIDomain.DESCRIPTION_BROWSING_SECTIONS).isRequired,
    index: PropTypes.number.isRequired,
    file: FileData.isRequired,
    // Callback: user selected an inner link. (section:BROWSING_SECTION_ENUM, child: number) => ()
    onSelectInnerLink: PropTypes.func.isRequired,
    // from withAuthInfo
    accessToken: PropTypes.string,
    // from with quota info
    quotaInfo: QuotaInfo,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * User callback: file link clicked. Notify parent of this link selection
   */
  onFileLinkClicked = () => {
    const { section, index, onSelectInnerLink } = this.props
    onSelectInnerLink(section, index)
  }

  render() {
    const {
      file: {
        label, available, uri, type, reference, mimeType,
      }, quotaInfo, accessToken,
    } = this.props
    const { intl: { formatMessage } } = this.context
    const openInNewTab = STATIC_CONF.OPEN_NEW_TAB_MIME_TYPES.includes(mimeType)
    return (
      <PageElement>
        <PageLinkCellComponent
          text={label}
          tooltip={formatMessage({ id: 'module.description.common.file.preview.tooltip' }, { fileName: label })}
          LinkIconConstructor={FileIcon}
          // disabled when file is not available, or when file is an internal raw data and quota is consumed
          disabled={!QuotaDownloadUtils.canDownload(available, type, reference, quotaInfo, accessToken)}
          onClick={this.onFileLinkClicked}
        />
        { // Download button when file is available AND is not constrained by quota OR user has a quota (=> not public)
           available && (!QuotaDownloadUtils.isConstrainedByQuota(type, reference) || accessToken) ? (
             <DownloadButton
               ButtonConstructor={PageElementOption}
               disabled={!QuotaDownloadUtils.canDownload(available, type, reference, quotaInfo, accessToken)}
               tooltip={formatMessage({ id: `module.description.common.${openInNewTab ? 'open' : 'download'}.file.tooltip` }, { fileName: label })}
               downloadURL={uri}
               IconConstructor={DownloadIconComponent}
               // icon component props
               constrainedByQuota={QuotaDownloadUtils.isConstrainedByQuota(type, reference)}
               quotaInfo={quotaInfo}
               isBlank={openInNewTab}
             />) : null // hide option when not available
        }
      </PageElement>
    )
  }
}
export default withAuthInfo(withQuotaInfo(FileLinkComponent))
