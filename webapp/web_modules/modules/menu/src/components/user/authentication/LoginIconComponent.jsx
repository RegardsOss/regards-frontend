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

import LoginIcon from 'mdi-material-ui/AccountCircle'
import QuotaStatusIcon from 'mdi-material-ui/DownloadCircle'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { QUOTA_INFO_STATES, QUOTA_INFO_STATE_ENUM } from '@regardsoss/entities-common'

/**
 * Login icon component: shows an overlay icon when quota or rate are in WARNING/CONSUMED states
 * @author Raphaël Mechali
 */
class LoginIconComponent extends React.Component {
  static propTypes = {
    quotaState: PropTypes.oneOf(QUOTA_INFO_STATES).isRequired,
    rateState: PropTypes.oneOf(QUOTA_INFO_STATES).isRequired,
    // From MUI
    style: PropTypes.objectOf(PropTypes.any),
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /** Root container style, to handle overlay icon */
  static ROOT_CONTAINER_STYLE = {
    position: 'relative',
    display: 'inline',
  }

  render() {
    const {
      quotaState, rateState, style, // provided by MUI to its components
    } = this.props
    const { moduleTheme: { user: { profile: { mainIcon, quotaStatusIcon: { warning, consumed } } } } } = this.context
    return ( // root container: prepares overlay using 'relative' placement
      <div style={{
        ...style,
        ...LoginIconComponent.ROOT_CONTAINER_STYLE,
      }}
      >
        {/* profile icon (static position to ensure parent is based on its size)  */}
        <LoginIcon style={mainIcon} />
        {/** overlay status icon if any is required */
          (() => {
            let locStyle = null
            if (quotaState === QUOTA_INFO_STATE_ENUM.CONSUMED || rateState === QUOTA_INFO_STATE_ENUM.CONSUMED) {
              locStyle = consumed
            } else if (quotaState === QUOTA_INFO_STATE_ENUM.WARNING || rateState === QUOTA_INFO_STATE_ENUM.WARNING) {
              locStyle = warning
            } else {
              // exit case: no status icon (IDLE / UNLIMITED)
              return null
            }
            return <QuotaStatusIcon style={locStyle} />
          })()
        }
      </div>
    )
  }
}
export default LoginIconComponent
