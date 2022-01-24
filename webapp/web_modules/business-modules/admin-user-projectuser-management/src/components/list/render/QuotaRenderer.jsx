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
import isNaN from 'lodash/isNaN'
import QuotaStatusIcon from 'mdi-material-ui/DownloadCircle'
import { AccessShapes, UIShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { QuotaInfoConstants } from '@regardsoss/entities-common'

/**
 * User quota cell renderer
 * @author Raphaël Mechali
 */
class QuotaRenderer extends React.Component {
  static propTypes = {
    entity: AccessShapes.ProjectUser.isRequired,
    uiSettings: UIShapes.UISettings.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { entity: { content: { currentQuota, maxQuota } }, uiSettings: { quotaWarningCount } } = this.props
    const { intl: { formatMessage }, moduleTheme: { usersList: { quotaCell: { root, icon } } } } = this.context

    const unlimitedQuota = isNaN(maxQuota) || maxQuota === QuotaInfoConstants.UNLIMITED
    const consumed = !unlimitedQuota && currentQuota >= maxQuota
    const warning = !unlimitedQuota && currentQuota + quotaWarningCount >= maxQuota
    return (
      <div style={root}>
        <div>
          { /* 1. Consumed current / total quota text (or unlimited status) */
          unlimitedQuota
            ? formatMessage({ id: 'projectUser.list.table.unlimited.quota.message' })
            : formatMessage({ id: 'projectUser.list.table.current.quota.message' }, { currentQuota, maxQuota })
          }
        </div>
        {/* 2. Optional icon, to be shown only when in warning or consumed */
          warning || consumed
            ? <QuotaStatusIcon style={consumed ? icon.consumed : icon.warning} />
            : null
        }
      </div>
    )
  }
}
export default QuotaRenderer
