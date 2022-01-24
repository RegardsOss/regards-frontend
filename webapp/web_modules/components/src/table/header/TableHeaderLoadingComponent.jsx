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
import isEqual from 'lodash/isEqual'
import CircularProgress from 'material-ui/CircularProgress'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import TableHeaderContentBox from './TableHeaderContentBox'
import TableHeaderText from './TableHeaderText'

/** Minimum time the loading button will be visible */
const MINIMUM_VISIBLE_TIME = 1500

/**
 * Table loader component, shown in table sub header area. It waits automatically half the refresh time before hiding.
 * When hidden, it shows children instead of self
 */
class TableHeaderLoadingComponent extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    loading: PropTypes.bool.isRequired, // used only in onPropertiesUpdated
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
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
        // note: when this.visiblePeriodStartMS is not set, the component is initially hidden. Default state is then OK
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
    const { moduleTheme: { header }, intl: { formatMessage } } = this.context
    const { children } = this.props
    const { loadingVisible } = this.state
    return (
      loadingVisible ? (
        // return loading component when visible
        <TableHeaderContentBox>
          <CircularProgress
            size={header.loading.size}
            thickness={header.loading.thickness}
            color={header.loading.color}
          />
          <TableHeaderText
            text={formatMessage({ id: 'table.loading.message' })}
            className="selenium-infiniteTableLoading"
          />
        </TableHeaderContentBox>) : (children || null) // return children when loading is hidden
    )
  }
}
export default TableHeaderLoadingComponent
