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
import values from 'lodash/values'
import compose from 'lodash/fp/compose'
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { withI18n } from '@regardsoss/i18n'
import { withModuleStyle } from '@regardsoss/theme'
import { DamDomain } from '@regardsoss/domain'
import { DataManagementShapes, UIShapes } from '@regardsoss/shape'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { StringComparison } from '@regardsoss/form-utils'
import { uiSettingsActions, uiSettingsSelectors } from '../clients/UISettingsClient'
import { modelActions, modelSelectors } from '../clients/ModelClient'
import EditSettingsComponent from '../components/EditSettingsComponent'
import messages from '../i18n'
import styles from '../styles'

/**
 * Container for settings edition
 * @author Raphaël Mechali
 */
export class EditSettingsContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      fetchingModels: modelSelectors.isFetching(state),
      dataModels: modelSelectors.getList(state),
      fetchingSettings: uiSettingsSelectors.isFetching(state),
      // retrieve results, avoiding to default values to know if the object is unexisting
      settings: uiSettingsSelectors.getResult(state),
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
      getDataModels: () => dispatch(modelActions.fetchEntityList(null, { type: DamDomain.ENTITY_TYPES_ENUM.DATA })),
      getSettings: () => dispatch(uiSettingsActions.getSettings()),
      createSettings: (settings) => dispatch(uiSettingsActions.createSettings(settings)),
      updateSettings: (settings) => dispatch(uiSettingsActions.updateSettings(settings)),
    }
  }

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // from mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    fetchingModels: PropTypes.bool.isRequired, // used only in onPropertiesUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    dataModels: DataManagementShapes.ModelList, // used only in onPropertiesUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    fetchingSettings: PropTypes.bool.isRequired, // used only in onPropertiesUpdated
    settings: UIShapes.UISettings,
    // from mapDispatchToProps
    getDataModels: PropTypes.func.isRequired,
    getSettings: PropTypes.func.isRequired,
    createSettings: PropTypes.func.isRequired,
    updateSettings: PropTypes.func.isRequired,
  }

  /** Initial state */
  state = {
    modelsLoaded: false,
    dataModelNames: [],
    settingsLoaded: false,
    creating: true,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component did mount. Used here to start data retrieval
   */
  componentDidMount = () => {
    const { getDataModels, getSettings } = this.props
    getDataModels() // pull data model list
    getSettings() // pull current settings values
  }

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
      fetchingSettings, settings,
      fetchingModels, dataModels,
    } = newProps
    const newState = { ...this.state }
    if (oldProps.fetchingSettings && !fetchingSettings) {
      // fetching done. Determinate if we are creating or updating settings, as
      // user app settings are not initially created on tenants
      newState.settingsLoaded = true
      newState.creating = !settings
    }
    if (oldProps.fetchingModels && !fetchingModels) {
      // fetching done, keep only available model names for child component
      newState.modelsLoaded = true
      newState.dataModelNames = values(dataModels).map(({ content: { name } }) => name).sort(StringComparison.compare)
    }
    if (!isEqual(this.state, newState)) {
      this.setState(newState)
    }
  }

  /**
   * Callback: return to card list
   */
  onBack = () => {
    const { params: { project } } = this.props
    browserHistory.push(`/admin/${project}/ui/board`)
  }

  /**
   * Callback: user submitted settings values
   * @param {*} settings edited settings values
   */
  onSubmitSettings = (settings) => {
    const { createSettings, updateSettings } = this.props
    const updateMethod = this.state.creating ? createSettings : updateSettings
    updateMethod(settings)
    this.onBack()
  }

  render() {
    const { settings } = this.props
    const { modelsLoaded, dataModelNames, settingsLoaded } = this.state
    return (
      <LoadableContentDisplayDecorator
        isLoading={!modelsLoaded || !settingsLoaded}
      >
        <EditSettingsComponent
          settings={settings}
          dataModelNames={dataModelNames}
          onBack={this.onBack}
          onSubmit={this.onSubmitSettings}
        />
      </LoadableContentDisplayDecorator>)
  }
}

export default compose(
  connect(EditSettingsContainer.mapStateToProps, EditSettingsContainer.mapDispatchToProps),
  withI18n(messages), withModuleStyle(styles))(EditSettingsContainer)
