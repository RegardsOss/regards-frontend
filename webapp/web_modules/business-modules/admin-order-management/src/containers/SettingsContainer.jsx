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
import keys from 'lodash/keys'
import find from 'lodash/find'
import map from 'lodash/map'
import isEqual from 'lodash/isEqual'
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { CommonShapes } from '@regardsoss/shape'
import { I18nProvider } from '@regardsoss/i18n'
import { ModuleStyleProvider } from '@regardsoss/theme'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import SettingsComponent from '../components/SettingsComponent'
import {
  settingsActions, settingsSelectors,
} from '../clients/SettingsClient'
import messages from '../i18n'
import styles from '../styles'

/**
 * SettingsContainer
 * @author Théo Lasserre
 */
export class SettingsContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // from mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    settings: CommonShapes.SettingsList,
    hasErrorSettings: PropTypes.bool.isRequired,
    // from mapDispatchToProps
    fetchSettings: PropTypes.func.isRequired,
    updateSettings: PropTypes.func.isRequired,
    flushSettings: PropTypes.func.isRequired,
  }

  /**
   * Redux: forEach state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      settings: settingsSelectors.getList(state),
      hasErrorSettings: settingsSelectors.hasError(state),
    }
  }

  /**
   * Redux: forEach dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      fetchSettings: () => dispatch(settingsActions.fetchEntityList()),
      updateSettings: (settingName, settingValue) => dispatch(settingsActions.updateEntity(settingName, settingValue)),
      flushSettings: () => dispatch(settingsActions.flush()),
    }
  }

  state = {
    settings: null,
    isFetchingSettings: true,
  }

  /**
   * Lifecycle method component did mount, used here to start loading server data
   */
  componentDidMount() {
    this.props.fetchSettings().then((actionResult) => {
      if (!actionResult.error) {
        this.setState({
          isFetchingSettings: false,
        })
      }
    })
  }

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  componentWillUnmount = () => {
    const { flushSettings } = this.props
    flushSettings()
  }

  onPropertiesUpdated = (oldProps, newProps) => {
    const {
      settings,
    } = newProps

    const oldState = this.state || {}
    const newState = { ...oldState }
    if (!isEqual(oldProps.settings, settings)) {
      newState.settings = settings
    }
    if (!isEqual(oldState, newState)) {
      this.setState(newState)
    }
  }

  /**
   * On back button clicked callback
   */
  onBack = () => {
    const { params: { project } } = this.props
    browserHistory.push(`/admin/${project}/commands/board`)
  }

  /**
   * On submit callback
   * @param {*} values edited settrings values
   */
  onSubmit = (values) => {
    const { updateSettings } = this.props
    const tasks = map(keys(values), (key) => updateSettings(key, values[key]))
    Promise.all(tasks)
      .then((actionResults) => {
        if (!find(actionResults, (actionResult) => actionResult.error)) {
          this.onBack()
        }
      })
  }

  render() {
    const { hasErrorSettings } = this.props
    const {
      settings, isFetchingSettings,
    } = this.state
    return (
      <I18nProvider messages={messages}>
        <ModuleStyleProvider module={styles}>
          <LoadableContentDisplayDecorator
            isLoading={isFetchingSettings}
            isContentError={hasErrorSettings}
            isEmpty={!settings}
          >
            <SettingsComponent
              settings={settings}
              onBack={this.onBack}
              onSubmit={this.onSubmit}
            />
          </LoadableContentDisplayDecorator>
        </ModuleStyleProvider>
      </I18nProvider>
    )
  }
}
export default connect(
  SettingsContainer.mapStateToProps,
  SettingsContainer.mapDispatchToProps)(SettingsContainer)
