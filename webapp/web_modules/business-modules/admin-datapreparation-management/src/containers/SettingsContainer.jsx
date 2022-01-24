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
import every from 'lodash/every'
import map from 'lodash/map'
import keys from 'lodash/keys'
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { CommonShapes } from '@regardsoss/shape'
import { I18nProvider } from '@regardsoss/i18n'
import { ModuleStyleProvider } from '@regardsoss/theme'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { settingsActions, settingsSelectors } from '../clients/SettingsClient'
import SettingsComponent from '../components/SettingsComponent'
import messages from '../i18n'
import styles from '../styles'

/**
 * @author Théo Lasserre
 */
export class SettingsContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }).isRequired,
    // from mapStateToProps
    settings: CommonShapes.SettingsList,
    hasErrorSettings: PropTypes.bool.isRequired,
    // from mapDispatchToProps
    fetchSettings: PropTypes.func.isRequired,
    updateSetting: PropTypes.func.isRequired,
    flushSettings: PropTypes.func.isRequired,
  }

  /**
   * Redux: map state to props function
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
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      fetchSettings: () => dispatch(settingsActions.fetchEntityList()),
      updateSetting: (settingName, settingValue) => dispatch(settingsActions.updateEntity(settingName, settingValue)),
      flushSettings: () => dispatch(settingsActions.flush()),
    }
  }

  state = {
    isFetching: true,
  }

  /**
   * Lifecycle method component did mount, used here to start loading server data
   */
  componentDidMount() {
    const tasks = []
    tasks.push(this.props.fetchSettings())
    Promise.all(tasks)
      .then((actionResults) => {
        if (every(actionResults, (actionResult) => !actionResult.error)) {
          this.setState({
            isFetching: false,
          })
        }
      })
  }

  componentWillUnmount = () => {
    const { flushSettings } = this.props
    flushSettings()
  }

  /**
   * On back button clicked callback
   */
  onBack = () => {
    const { params: { project } } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/board`)
  }

  /**
   * On submit callback
   * @param {*} values edited settrings values
   */
  onSubmit = (values) => {
    const { updateSetting } = this.props
    const tasks = map(keys(values), (key) => updateSetting(key, values[key]))
    Promise.all(tasks)
      .then((actionResults) => {
        if (every(actionResults, (actionResult) => !actionResult.error)) {
          this.onBack()
        }
      })
  }

  render() {
    const { settings, hasErrorSettings } = this.props
    const { isFetching } = this.state
    return (
      <I18nProvider messages={messages}>
        <ModuleStyleProvider module={styles}>
          <LoadableContentDisplayDecorator
            isLoading={isFetching}
            isContentError={hasErrorSettings}
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
