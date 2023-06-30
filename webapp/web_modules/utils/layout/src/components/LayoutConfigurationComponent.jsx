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
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import Container, { ADD_ACTION, EDIT_ACTION, DELETE_ACTION } from './Container'
import ContainerConfigurationProvider from './ContainerConfigurationProvider'
import ContainerHelper from '../ContainerHelper'
import messages from '../i18n'

/**
 * Component to display configure a given layout
 * @author Sébastien Binda
 */
class LayoutConfigurationComponent extends React.Component {
  static propTypes = {
    layout: AccessShapes.Layout,
    hideDynamicContentOption: PropTypes.bool,
    project: PropTypes.string,
    onChange: PropTypes.func,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  state = {
    editorOpened: false,
    containerToEdit: null,
  }

  /**
   * Callback to update an existing container
   * @param container
   */
  onUpdate = (container) => {
    const nextContainer = {
      ...this.state.containerToEdit, // recover previously set values
      ...container,
    }
    const newLayout = ContainerHelper.replaceContainerInLayout(nextContainer, this.props.layout)
    // Deselect the previous dynamic container if the new one is dynamic
    ContainerHelper.selectDynamicContainerInLayout(nextContainer, newLayout)
    this.props.onChange(newLayout)
    this.handleClose()
  }

  /**
   * Callaback to add a new container
   * @param container
   */
  onCreate = (container) => {
    const newLayout = ContainerHelper.addContainerInLayout(this.state.parentContainer, container, this.props.layout)
    // Deselect the previous dynamic container if the new one is dynamic
    ContainerHelper.selectDynamicContainerInLayout(container, newLayout)
    this.props.onChange(newLayout)
    this.handleClose()
  }

  /**
   * Close container edition dialog
   */
  handleClose = () => {
    this.setState({ containerToEdit: null, editorOpened: false })
  }

  /**
   * Open container edition dialog
   */
  handleOpen = (action, container) => {
    this.setState({
      editorOpened: true,
      containerToEdit: action === EDIT_ACTION ? container : null,
      parentContainer: action === ADD_ACTION ? container : null,
    })
  }

  /**
   * Callback after selection of an action from a container ADD, EDIT or DELETE
   * @param action
   * @param container
   */
  containerSelection = (action, container) => {
    switch (action) {
      case DELETE_ACTION: {
        const newLayout = ContainerHelper.removeContainerFromLayout(container.id, this.props.layout)
        this.props.onChange(newLayout)
        break
      }
      case EDIT_ACTION: {
        this.handleOpen(action, container)
        break
      }
      case ADD_ACTION: {
        this.handleOpen(action, container)
        break
      }
      default: {
        console.error('Undefined action')
      }
    }
  }

  render() {
    return (
      <div>
        <Container
          appName="admin"
          container={this.props.layout}
          project={this.props.project}
          onContainerClick={this.containerSelection}
          configurationMode
          mainContainer
        />
        <ContainerConfigurationProvider
          container={this.state.containerToEdit}
          hideDynamicContentOption={this.props.hideDynamicContentOption}
          open={this.state.editorOpened}
          onCancel={this.handleClose}
          onSubmit={this.state.containerToEdit ? this.onUpdate : this.onCreate}
        />
      </div>
    )
  }
}

export default withI18n(messages)(LayoutConfigurationComponent)
