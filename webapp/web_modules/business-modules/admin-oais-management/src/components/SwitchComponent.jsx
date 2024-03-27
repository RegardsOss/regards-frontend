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
import isEqual from 'lodash/isEqual'
import FlatButton from 'material-ui/FlatButton'
import { RefreshIndicatorComponent } from '@regardsoss/components'
import { IngestDomain } from '@regardsoss/domain'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/** Minimum time the loading button will be visible */
const MINIMUM_VISIBLE_TIME = 1500

/**
 * Tab loader component, show count of elements and a refresh indicator.
 */
class SwitchComponent extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    loading: PropTypes.bool.isRequired, // used only in onPropertiesUpdated
    pane: PropTypes.string.isRequired,
    paneType: PropTypes.oneOf(IngestDomain.REQUEST_TYPES).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    nbElementsInfos: PropTypes.object.isRequired,
    onSwitchToPane: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    loadingVisible: false,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount() {
    this.onPropertiesUpdated({}, this.props)
  }

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.onPropertiesUpdated(this.props, nextProps)
  }

  /**
   * Lifecycle method: component will unmount: prevents here to call set state when component is not mounted
   */
  componentWillUnmount() {
    this.willUnmount = true
  }

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const nextState = { ...this.state }
    if (oldProps.loading !== newProps.loading) {
      // clear any previous timer
      if (this.currentTimeout) {
        clearTimeout(this.currentTimeout)
      }
      // Compute next state
      if (newProps.loading) {
        // Entering a loading visibility period: show loading component and keep visibility period start time
        nextState.loadingVisible = true
        this.visiblePeriodStartMS = new Date().getTime()
      } else if (this.visiblePeriodStartMS) {
        // exiting a loading visibility period: make sure the MINIMUM_VISIBLE_TIME has been ellapsed
        const currentTimeMS = new Date().getTime()
        const totalVisibilityDuration = currentTimeMS - this.visiblePeriodStartMS
        if (totalVisibilityDuration >= MINIMUM_VISIBLE_TIME) {
          // yes: exit loading visible immediately
          nextState.loadingVisible = false
          this.currentTimeout = null
        } else {
          // no: wait missing time then hide
          this.currentTimeout = setTimeout(this.onVisibilityPeriodFinished, MINIMUM_VISIBLE_TIME - totalVisibilityDuration)
        }
      }
    }
    if (!isEqual(this.state, nextState)) {
      this.setState(nextState)
    }
  }

  /**
   * On visibility period ellapsed: hide loading
   */
  onVisibilityPeriodFinished = () => {
    this.currentTimeout = null // delete current timeout
    if (!this.willUnmount) {
      this.setState({ loadingVisible: false }) // hide loading
    }
  }

  render() {
    const {
      moduleTheme: {
        switchTable: {
          divStyle, displayIndicator, switchButton, displayNone, indicatorStyle,
        },
      }, intl: { formatMessage },
    } = this.context
    const {
      pane, paneType, nbElementsInfos, onSwitchToPane,
    } = this.props
    const { loadingVisible } = this.state
    return (
      <div style={divStyle}>
        <FlatButton
          label={loadingVisible ? formatMessage({ id: `oais.packages.switch-to.${pane}.label.loading` })
            : formatMessage({ id: `oais.packages.switch-to.${pane}.label` }, { nbElements: nbElementsInfos.nbElements })}
          title={formatMessage({ id: `oais.packages.switch-to.${pane}.title` })}
          onClick={() => onSwitchToPane(pane)}
          style={paneType === pane ? switchButton : null}
          disabled={paneType === pane}
        />
        <div style={loadingVisible ? displayIndicator : displayNone}>
          <RefreshIndicatorComponent
            left={0}
            top={2}
            status="loading"
            style={indicatorStyle}
            size={30}
          />
        </div>
      </div>
    )
  }
}
export default SwitchComponent
