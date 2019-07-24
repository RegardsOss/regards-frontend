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
import get from 'lodash/get'
import { connect } from '@regardsoss/redux'
import { UIClient } from '@regardsoss/client'
import { AccessShapes, CatalogShapes } from '@regardsoss/shape'
import { AuthenticationParametersSelectors, AuthenticationClient } from '@regardsoss/authentication-utils'
import { buildDescriptionModuleConsumerID } from '@regardsoss/entities-common'
import { descriptionLevelsActions, descriptionLevelsSelectors } from '../../clients/DescriptionLevelClient'
import { ModuleConfiguration } from '../../shapes/ModuleConfiguration'
import { DESCRIPTION_TABS } from '../../model/DescriptionTabsEnum'
import EntityDescriptionComponent from '../../components/user/EntityDescriptionComponent'

// get default client actions and selectors
const dialogActions = new UIClient.DialogRequestsActions()
const dialogSelectors = UIClient.getDialogRequestsSelectors()

/**
 * Module container for runtime. This container handles dialog requests. When it should be handled by this module,
 * it initiliazes description context and provide the parameters to sub components.
 * @author Raphaël Mechali
 */
export class UserContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      dialogState: dialogSelectors.getDialogState(state),
      // user auth info
      accessToken: AuthenticationClient.authenticationSelectors.getAccessToken(state),
      projectName: AuthenticationParametersSelectors.getProject(state),
      // currently shown entity from context (intialized and binded by this container)
      shownEntity: descriptionLevelsSelectors.getShownEntity(state),
      // currently shown tab from context
      currentTab: descriptionLevelsSelectors.getCurrentTab(state),
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
      initializeContext: entity => dispatch(descriptionLevelsActions.initializeContext(entity)),
      onClose: () => {
        // dispose navigation context (locally reported context)
        dispatch(descriptionLevelsActions.closeDescription())
        // clear dialog request in dialog state
        dispatch(dialogActions.hide())
      },
      onChangeTab: newTab => dispatch(descriptionLevelsActions.changeTab(newTab)),
    }
  }

  /**
   * Computes if module instance should be visible, given its consumer ID, the current dialog request state and module configuration
   * @param {string} consumerID module instance consumer ID
   * @param {*} dialogState dialog state (see DialogRequests model, from UIClient)
   * @param {ModuleConfiguration} modeulConf module instance configuration
   * @return {boolean} true when module should be visible (ie: matches with current dialog request AND accepts request for entity by configuration)
   */
  static isDialogVisible(consumerID, dialogState = { visible: false }, moduleConf) {
    if (dialogState.visible && dialogState.consumerID === consumerID) {
      // there is currently a dialog request for this module.
      // Should module handle it?
      const entityType = get(dialogState, 'parameters.entity.content.entityType')
      return moduleConf[entityType].showDescription
    }
    return false
  }

  static propTypes = {
    // default modules properties
    ...AccessShapes.runtimeDispayModuleFields,
    // redefines expected configuration shape
    moduleConf: ModuleConfiguration.isRequired,

    // from map state to props
    // current dialog request, maybe handled by this component
    dialogState: PropTypes.shape({
      visible: PropTypes.bool.isRequired,
      consumerID: PropTypes.string, // provided only when visible
      parameters: PropTypes.object, // depends on request, this module expects { entity, onSearchTag }
    }).isRequired,
    // bound from current description context
    shownEntity: CatalogShapes.Entity, // entity shown or null
    currentTab: PropTypes.oneOf(DESCRIPTION_TABS),

    accessToken: PropTypes.string,
    projectName: PropTypes.string.isRequired,

    // from map dispatch to props
    initializeContext: PropTypes.func.isRequired, // initializes or releases the current description context
    onClose: PropTypes.func.isRequired, // closes the current dialog request
    onChangeTab: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    // keep this module dialog consumer ID
    this.consumerID = buildDescriptionModuleConsumerID(props.id)
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
   * Properties change detected: update the description context
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const { dialogState, moduleConf, initializeContext } = newProps
    // detect dialog request or dialog close for this module (on main dialog client)
    // on change, report it in description level context (locally used context)
    const wasVisible = UserContainer.isDialogVisible(this.consumerID, oldProps.dialogState, oldProps.moduleConf)
    const becomesVisible = UserContainer.isDialogVisible(this.consumerID, dialogState, moduleConf)
    if (!wasVisible && becomesVisible) {
      const { entity } = dialogState.parameters
      initializeContext(entity)
    }
  }

  /**
   * Local on search tag implementation: closes the description dialog when user searches a tag
   * @note: this method must be called with onSearchTag method only
   * @param tag searched tag
   */
  onSearchTag = (tag) => {
    // pre: on search tag is always available when entering here (current navigation context is set)
    const { dialogState, onClose } = this.props
    const onSearchTag = get(dialogState, 'parameters.onSearchTag')
    onSearchTag(tag)
    onClose()
  }

  render() {
    const {
      currentTab, shownEntity, accessToken, projectName, moduleConf, onChangeTab, onClose,
    } = this.props

    // render component with currently shown entity (it will hide if entity is undefined)
    return (
      <EntityDescriptionComponent
        currentTab={currentTab}
        entity={shownEntity}
        moduleConf={moduleConf}
        open={!!shownEntity}

        accessToken={accessToken}
        projectName={projectName}

        onSearchTag={this.onSearchTag}
        onChangeTab={onChangeTab}
        onClose={onClose}
      />)
  }
}
export default connect(
  UserContainer.mapStateToProps,
  UserContainer.mapDispatchToProps)(UserContainer)
