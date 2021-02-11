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
import QuotaStatusIcon from 'mdi-material-ui/DownloadCircle'
import { computeQuotaState, QUOTA_INFO_STATE_ENUM } from '@regardsoss/entities-common'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * Renders total cell
 * @author Raphaël Mechali
 */
class TotalQuotaRenderComponent extends React.Component {
  static propTypes = {
    totalQuota: PropTypes.number.isRequired, // order total quota
    currentQuota: PropTypes.number.isRequired, // user current quota
    maxQuota: PropTypes.number.isRequired, // user max quota
    quotaWarningCount: PropTypes.number.isRequired, // low quota warning, expressed as a quota difference to max
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const {
      totalQuota, currentQuota, maxQuota, quotaWarningCount,
    } = this.props
    const {
      intl: { formatMessage },
      moduleTheme: { user: { content: { table: { totalRow: { quotaCell: { container, icon } } } } } },
    } = this.context
    // Compute state after order
    const allowedQuota = Math.max(maxQuota - currentQuota, 0)
    const afterOrderQuota = Math.max(allowedQuota - totalQuota, 0)
    // compute after order status (but display warning / consumed only when some quota is consumed)
    const afterOrderStatus = !totalQuota ? QUOTA_INFO_STATE_ENUM.IDLE : computeQuotaState(currentQuota + totalQuota, maxQuota, quotaWarningCount)
    return (
      <div
        style={container}
        title={(() => {
          // 1 - compute warning message
          let warningMessage
          switch (afterOrderStatus) {
            case QUOTA_INFO_STATE_ENUM.WARNING:
              warningMessage = formatMessage({ id: 'order-cart.module.basket.table.cell.total.quota.warning.message' })
              break
            case QUOTA_INFO_STATE_ENUM.CONSUMED:
              warningMessage = formatMessage({ id: 'order-cart.module.basket.table.cell.total.quota.consumed.message' })
              break
            default:
            case QUOTA_INFO_STATE_ENUM.UNLIMITED:
            case QUOTA_INFO_STATE_ENUM.IDLE:
              // no warning
              warningMessage = ''
          }
          // 2 - produce tooltip using it
          return formatMessage({ id: 'order-cart.module.basket.table.cell.total.quota.tooltip' }, {
            totalQuota, allowedQuota, afterOrderQuota, warningMessage,
          })
        })()}
      >
        {/* 1. Cell label */}
        <div>{formatMessage({ id: 'order-cart.module.basket.table.cell.total.quota.label' }, { totalQuota, allowedQuota })}</div>
        {/* 2. Warning icon if any */
          (() => {
            switch (afterOrderStatus) {
              case QUOTA_INFO_STATE_ENUM.WARNING:
                return <QuotaStatusIcon style={icon.warning} />
              case QUOTA_INFO_STATE_ENUM.CONSUMED:
                return <QuotaStatusIcon style={icon.consumed} />
              default:
                return null
            }
          })()

        }
      </div>
    )
  }
}
export default TotalQuotaRenderComponent
