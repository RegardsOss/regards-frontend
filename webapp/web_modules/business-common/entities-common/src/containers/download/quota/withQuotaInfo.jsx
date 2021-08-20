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
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import isNil from 'lodash/isNil'
import { UIDomain } from '@regardsoss/domain'
import { AccessProjectClient, UIClient } from '@regardsoss/client'
import { connect } from '@regardsoss/redux'
import { AccessShapes, UIShapes } from '@regardsoss/shape'
import { QUOTA_INFO_STATE_ENUM } from '../../../definitions/download/quota/QuotaInfoStateEnum'
import { QuotaInfoConstants } from '../../../definitions/download/quota/QuotaInfoConstants'

/** Current quota information in user app context */
const currentQuotaInformationSelectors = UIClient.getCurrentQuotaInformationSelectors()

/** Common UI settings selectors in user app context */
const uiSettingsSelectors = AccessProjectClient.getUISettingsSelectors()

const getReactCompoName = (WrappedComponent) => WrappedComponent.displayName || WrappedComponent.name || 'Component'

/**
 * Computes the state of quota related parameter
 * @param {number} current value for parameter
 * @param {number} max value for parameter
 * @param {number} warningCount as a differential value from current value to max
 * @return {string} from QUOTA_INFO_STATE_ENUM
 **/
export function computeQuotaState(current, max, warningCount) {
  if (max === QuotaInfoConstants.UNLIMITED) {
    return QUOTA_INFO_STATE_ENUM.UNLIMITED
  }
  const remainingQuota = max - current
  if (remainingQuota <= 0) {
    return QUOTA_INFO_STATE_ENUM.CONSUMED
  }
  if (remainingQuota <= warningCount) {
    return QUOTA_INFO_STATE_ENUM.WARNING
  }
  return QUOTA_INFO_STATE_ENUM.IDLE
}

/**
 * Decorates a React component with Regards Quota and rate information and computed related information (quotaInfo field add).
 * That decorator is designed to be used in user app but supports being used outside for coding easiness (in such case, it
 * provides infinite quota  * and rate, as those functionalities are related with user app catalog and order)
  *
 * @type {function}
 * @param {React.Component} DecoratedComponent The component to enhance
 * @return {React.Component}
 * @author Raphaël Mechali
 */
export const withQuotaInfo = (DecoratedComponent) => {

  class WithQuotaInfo extends React.Component {
    static propTypes = {
      // Set by mapStateToProps
      // eslint-disable-next-line react/no-unused-prop-types
      quotaInfo: AccessShapes.QuotaInformation.isRequired, // react/no-unused-prop-types: used only in onPropertiesUpdated
      // eslint-disable-next-line react/no-unused-prop-types
      uiSettings: UIShapes.UISettings.isRequired, // react/no-unused-prop-types: used only in onPropertiesUpdated
      // eslint-disable-next-line react/no-unused-prop-types
      dynamicModuleId: PropTypes.number, // react/no-unused-prop-types: used only in onPropertiesUpdated
      // other properties are consumed by the DecoratedComponent
      ...(DecoratedComponent.propTypes || {}),
    }

    static displayName = `withQuotaInfo(${getReactCompoName(DecoratedComponent)})`

    /** Quota information used as a replacement in admin app */
    static ADMIN_QUOTA_INFO = {
      currentQuota: 0,
      maxQuota: -1,
      currentRate: 0,
      rateLimit: -1,
    }

    /**
     * Redux: map state to props function
     * @param {*} state: current redux state
     * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
     * @return {*} list of component properties extracted from redux state
     */
    static mapStateToProps(state) {
      // algorithm: to avoid returning new values, we use internally here the dynamic module ID, that is instantiated only for user app
      // when found, we are in user app, otherwise (undefined) we are in admin app (cannot be performed through selectors,
      // as reducer is not installed in admin)
      const dynamicModuleId = get(state, 'user.appState.dynamicModuleId')
      const inUserApp = !isNil(dynamicModuleId)
      return {
        dynamicModuleId,
        quotaInfo: inUserApp ? currentQuotaInformationSelectors.getQuotaInformation(state) : WithQuotaInfo.ADMIN_QUOTA_INFO,
        uiSettings: inUserApp ? uiSettingsSelectors.getSettings(state) : UIDomain.UISettingsConstants.DEFAULT_SETTINGS,
      }
    }

    /**
     * Extracts decorator props
     * @param {*} quotaInfo matching AccessShapes.QuotaInformation
     * @param {*} uiSettings matching UIShapes.UISettings
     * @param {number} dynamicModuleId current dynamic module ID (used here to determinate if in user app or outside)
     * @return {*} decorator props matching PropTypes.shape({ ...QuotaInfoDecoratorProperties })
     */
    static extractDecoratorProps(quotaInfo, uiSettings, dynamicModuleId) {
      const { // when storage is down, initialize to unlimited quota (no internal file to download anyways)
        currentQuota = 0, maxQuota = -1, currentRate = 0, rateLimit = -1,
      } = quotaInfo
      const { quotaWarningCount, rateWarningCount } = uiSettings
      const quotaState = computeQuotaState(currentQuota, maxQuota, quotaWarningCount)
      const rateState = computeQuotaState(currentRate, rateLimit, rateWarningCount)
      return {
        currentQuota,
        maxQuota,
        quotaState,
        currentRate,
        rateLimit,
        rateState,
        downloadDisabled: quotaState === QUOTA_INFO_STATE_ENUM.CONSUMED || rateState === QUOTA_INFO_STATE_ENUM.CONSUMED,
        inUserApp: !isNil(dynamicModuleId),
        quotaWarningCount,
      }
    }

    state = {
      props: {},
    }

    /**
     * Lifecycle method: component will mount. Used here to detect first properties change and update local state
     */
    UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

    /**
     * Lifecycle method: component receive props. Used here to detect properties change and update local state
     * @param {*} nextProps next component properties
     */
    UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

    /**
     * Properties change detected: update local state
     * @param oldProps previous component properties
     * @param newProps next component properties
     */
    onPropertiesUpdated = (oldProps, newProps) => {
      const {
        quotaInfo, uiSettings, dynamicModuleId, ...props
      } = newProps
      const nextState = {
        props: {
          ...props,
          quotaInfo: WithQuotaInfo.extractDecoratorProps(quotaInfo, uiSettings, dynamicModuleId),
        },
      }
      if (!isEqual(this.state, nextState)) {
        this.setState(nextState)
      }
    }

    render() {
      const { props } = this.state
      return <DecoratedComponent {...props} />
    }
  }

  return connect(WithQuotaInfo.mapStateToProps)(WithQuotaInfo)
}
