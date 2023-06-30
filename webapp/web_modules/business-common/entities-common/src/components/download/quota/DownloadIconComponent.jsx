/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import DownloadIcon from 'mdi-material-ui/Download'
import QuotaWarnIcon from 'mdi-material-ui/Alert'
import QuotaConsumedIcon from 'mdi-material-ui/AlertOctagon'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { QUOTA_INFO_STATE_ENUM } from '../../../definitions/download/quota/QuotaInfoStateEnum'
import { QuotaInfo } from '../../../definitions/download/quota/QuotaInfoShape'
import styles from '../../../styles'

/**
 * Download icon component: shows quota states as overlay if corresponding file is internal raw data
 * @author Raphaël Mechali
 */
export class InnerDownloadIconComponent extends React.Component {
  static propTypes = {
    constrainedByQuota: PropTypes.bool.isRequired,
    quotaInfo: QuotaInfo.isRequired,
    // From MUI, report to main icon
    style: PropTypes.objectOf(PropTypes.any),
    activeRootContainerInitial: PropTypes.bool,
  }

  static defaultProps = {
    style: {},
    activeRootContainerInitial: false,
  }

  static contextTypes = {
    ...themeContextType,
  }

  /** Root container style, to handle overlay icon */
  static ROOT_CONTAINER_STYLE = {
    position: 'relative',
  }

  /** Root container initial style, to handle overlay icon */
  static ROOT_CONTAINER_INITIAL_STYLE = {
    position: 'initial',
  }

  getContainerStyle = () => {
    const { activeRootContainerInitial } = this.props
    return activeRootContainerInitial ? InnerDownloadIconComponent.ROOT_CONTAINER_INITIAL_STYLE : InnerDownloadIconComponent.ROOT_CONTAINER_STYLE
  }

  render() {
    const {
      constrainedByQuota, quotaInfo: { quotaState, rateState }, style,
    } = this.props
    const { moduleTheme: { downloadIcon: { backgroundIcon, foregroundWarningIcon, foregroundConsumedIcon } } } = this.context
    return (
      <div style={this.getContainerStyle()}>
        {/* Background icon (merge with computed MUI styles) */}
        <DownloadIcon style={{ ...backgroundIcon, ...style }} />
        {/* Foregroud warning icon: only when WARN / CONSUMED are relevant for data */
          (() => {
            if (constrainedByQuota) {
              if (quotaState === QUOTA_INFO_STATE_ENUM.CONSUMED || rateState === QUOTA_INFO_STATE_ENUM.CONSUMED) {
                return <QuotaConsumedIcon style={foregroundConsumedIcon} />
              }
              if (quotaState === QUOTA_INFO_STATE_ENUM.WARNING || rateState === QUOTA_INFO_STATE_ENUM.WARNING) {
                return <QuotaWarnIcon style={foregroundWarningIcon} />
              }
            }
            // not internal raw data or no warn / no error
            return null
          })()
        }
      </div>)
  }
}

export const DownloadIconComponent = withModuleStyle(styles)(InnerDownloadIconComponent)
