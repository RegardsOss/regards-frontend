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
import isEqual from 'lodash/isEqual'
import Alert from 'mdi-material-ui/AlertCircleOutline'
import Chip from 'material-ui/Chip'
import FlatButton from 'material-ui/FlatButton'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/** Minimum time the loading button will be visible */
const MINIMUM_VISIBLE_TIME = 1500

/**
 * Table loader component, shown in table sub header area. It waits automatically half the refresh time before hiding.
 */
class SwitchComponent extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    loading: PropTypes.bool.isRequired, // used only in onPropertiesUpdated
    pane: PropTypes.string.isRequired,
    openedPane: PropTypes.string.isRequired,
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
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

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

  displayIcon = (elementCount) => {
    const {
      moduleTheme: { tableStyle: { overlayStyle } },
    } = this.context
    return (
      <div style={overlayStyle.style}>
        <Alert style={overlayStyle.icon.style} />
        <Chip
          labelStyle={overlayStyle.chip.labelStyle}
          style={overlayStyle.chip.style}
        >
          {elementCount}
        </Chip>
      </div>)
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
      pane, openedPane, nbElementsInfos, onSwitchToPane,
    } = this.props
    const { loadingVisible } = this.state
    return (
      <div style={divStyle}>
        <FlatButton
          label={loadingVisible ? formatMessage({ id: `feature.references.switch-to.${pane}.label.loading` })
            : formatMessage({ id: `feature.references.switch-to.${pane}.label` }, { productsNb: nbElementsInfos.nbElements })}
          title={formatMessage({ id: `feature.references.switch-to.${pane}.title` })}
          onClick={() => onSwitchToPane(pane)}
          style={openedPane === pane ? switchButton : null}
          disabled={openedPane === pane}
        />
        <div style={loadingVisible ? displayIndicator : displayNone}>
          <RefreshIndicator
            left={0}
            top={2}
            status="loading"
            style={indicatorStyle}
            size={30}
          />
        </div>
        {nbElementsInfos.nbErrors !== 0 && !loadingVisible ? this.displayIcon(nbElementsInfos.nbErrors, pane) : null}
      </div>
    )
  }
}
export default SwitchComponent
