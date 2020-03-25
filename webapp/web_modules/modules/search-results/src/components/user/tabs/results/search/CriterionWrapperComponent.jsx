/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isNil from 'lodash/isNil'
import { UIShapes } from '@regardsoss/shape'
import { PluginProvider } from '@regardsoss/plugins'
import CriterionLoadingComponent from './CriterionLoadingComponent'

/**
 * Criterion wrapper component: adapts callbacks, loads and displays criterion
 * @author Raphaël Mechali
 */
class CriterionWrapperComponent extends React.Component {
  static propTypes = {
    groupIndex: PropTypes.number.isRequired,
    criterionIndex: PropTypes.number.isRequired,
    criterion: UIShapes.Criterion.isRequired,
    onUpdatePluginState: PropTypes.func.isRequired,
  }

  /** Criterion loading component */
  static LOADING_COMPONENT = <CriterionLoadingComponent />

  state = {
    pluginConf: {},
    pluginProps: {},
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    let newState = { ...this.state }
    const { criterion: { label, state, conf } } = newProps
    const oldCriterion = oldProps.criterion || {}
    // A - each time label / state changes update properties (label covers initialization state), set up pluginProps
    if (!isEqual(oldCriterion.state, state) || !isEqual(oldCriterion.label, label)) {
      newState = {
        ...newState,
        pluginProps: {
          label,
          state: isNil(state) ? undefined : state, // leave state undefined instead of null, to let user set it through defaultProps system
          publishState: this.onUpdateState,
        },
      }
    }
    // B - each time an attribute / configuration change, update plugin configuration (covers initialization case)
    if (!isEqual(oldCriterion.conf, conf)) {
      newState = {
        ...newState,
        pluginConf: conf,
      }
    }

    // Finally set state only when any change was detected (should always be the case when here)
    if (!isEqual(this.state, newState)) {
      this.setState(newState)
    }
  }

  /**
   * Local callback wrapping: criterion plugin published a new state
   */
  onUpdateState = (newState, newRequestParameters) => {
    const { groupIndex, criterionIndex, onUpdatePluginState } = this.props
    onUpdatePluginState(groupIndex, criterionIndex, newState, newRequestParameters)
  }

  render() {
    const {
      criterion: {
        pluginId,
        pluginInstanceId,
      },
    } = this.props
    const { pluginProps, pluginConf } = this.state
    return (
      <PluginProvider
        key={pluginInstanceId}
        pluginInstanceId={pluginInstanceId}
        pluginId={pluginId}
        pluginConf={pluginConf}
        pluginProps={pluginProps}
        displayPlugin
        loadingComponent={CriterionWrapperComponent.LOADING_COMPONENT}
        // TODO test error rendering
        errorComponent={null} // disable plugin rendering when in error
      />
    )
  }
}
export default CriterionWrapperComponent
