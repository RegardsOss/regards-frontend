/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import TitleIcon from 'mdi-material-ui/ProgressDownload'
import QuotaIcon from 'mdi-material-ui/DownloadLock'
import RateIcon from 'mdi-material-ui/Speedometer'
import { QuotaInfo, QUOTA_INFO_STATE_ENUM } from '@regardsoss/entities-common'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * Shows user profile quota information
 * @author Raphaël Mechali
 */
class ProfileQuotaInformationComponent extends React.Component {
  static propTypes = {
    quotaInfo: QuotaInfo.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const {
      quotaInfo: {
        currentQuota, maxQuota, quotaState,
        currentRate, rateLimit, rateState,
      },
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { notifications: { quotaInformation } } } = this.context
    const quotaStateStyles = quotaInformation.quotaValueRow[quotaState]
    const rateStateStyles = quotaInformation.quotaValueRow[rateState]
    return (
      <div style={quotaInformation.rootContainer}>
        {/* 1. Title */}
        <div style={quotaInformation.title.root}>
          <TitleIcon />
          <div style={quotaInformation.title.text}>{formatMessage({ id: 'user.profile.quota.info.title' })}</div>
        </div>
        {/* 2. Explanations  */}
        <div style={quotaInformation.message}>{formatMessage({ id: 'user.profile.quota.info.message.raw.data.download.definition' })}</div>
        <div style={quotaInformation.message}>{formatMessage({ id: 'user.profile.quota.info.message.contact.notice' })}</div>
        {/* 3. Current status */}
        <div style={quotaInformation.quotaValuesTitle}>{formatMessage({ id: 'user.profile.quota.info.title.current.status' })}</div>
        {/* 3.A Current quota (status and values, as remaining downloads) */}
        <div style={quotaInformation.quotaValueRow.root}>
          <QuotaIcon style={quotaStateStyles.icon} />
          <div style={quotaStateStyles.text}>
            {
          quotaState === QUOTA_INFO_STATE_ENUM.UNLIMITED
            ? formatMessage({ id: 'user.profile.quota.info.message.unlimited.download' })
            : formatMessage({ id: 'user.profile.quota.info.message.remaining.downloads' }, { remainingQuota: Math.max(0, maxQuota - currentQuota), maxQuota })
          }
          </div>
        </div>
        {/* 3.B Current rate) */}
        <div style={quotaInformation.quotaValueRow.root}>
          <RateIcon style={rateStateStyles.icon} />
          <div style={rateStateStyles.text}>
            {
          rateState === QUOTA_INFO_STATE_ENUM.UNLIMITED
            ? formatMessage({ id: 'user.profile.quota.info.message.unlimited.rate' })
            : formatMessage({ id: 'user.profile.quota.info.message.remaining.rate' }, { currentRate, rateLimit })
          }
          </div>
        </div>
      </div>
    )
  }
}
export default ProfileQuotaInformationComponent
