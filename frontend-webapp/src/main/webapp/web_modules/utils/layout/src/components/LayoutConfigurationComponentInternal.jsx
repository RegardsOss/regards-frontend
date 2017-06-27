/**
 * LICENSE_PLACEHOLDER
 **/
import { AccessShapes } from '@regardsoss/shape'
import { Card, CardText } from 'material-ui/Card'
import Dialog from 'material-ui/Dialog'
import { i18nContextType } from '@regardsoss/i18n'
import Container from './Container'
import ContainerConfigurationProvider from './ContainerConfigurationProvider'
import ContainerHelper from '../ContainerHelper'

const DELETE_ACTION = 'DELETE'
const ADD_ACTION = 'ADD'
const EDIT_ACTION = 'EDIT'
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
    actionType: '',
  }

  /**
   * Callback to update an existing container
   * @param container
   */
  onUpdate = (container) => {
    const newLayout = ContainerHelper.replaceContainerInLayout(container, this.props.layout)
    this.props.onChange(newLayout)
    this.handleClose()
  }

  /**
   * Callaback to add a new container
   * @param container
   */
  onCreate = (container) => {
    const newLayout = ContainerHelper.addContainerInLayout(this.state.parentContainer, container, this.props.layout)
    this.props.onChange(newLayout)
    this.handleClose()
  }

  /**
   * Close container edition dialog
   */
  handleClose = () => {
    this.setState({ editorOpened: false })
  }

  /**
   * Open container edition dialog
   */
  handleOpen = (action, container) => {
    this.setState({
      editorOpened: true,
      containerToEdit: action === EDIT_ACTION ? container : null,
      parentContainer: action === ADD_ACTION ? container : null,
      actionType: action,
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
    const { intl } = this.context
    const dialogTitle = intl.formatMessage({ id: 'container.configuration.edit.dialog.title' })

    return (
      <div >
        <Card>
          <CardText>
            <Container
              appName="admin"
              container={this.props.layout}
              project={this.props.project}
              onContainerClick={this.containerSelection}
              configurationMode
              mainContainer
            />
          </CardText>
        </Card>
        <Dialog
          title={dialogTitle}
          modal={false}
          open={this.state.editorOpened}
          onRequestClose={this.handleClose}
        >
          <ContainerConfigurationProvider
            key={this.state.containerToEdit ? this.state.containerToEdit.id : 'create'}
            container={this.state.containerToEdit}
            hideDynamicContentOption={this.props.hideDynamicContentOption}
            onCancel={this.handleClose}
            onSubmit={this.state.containerToEdit ? this.onUpdate : this.onCreate}
          />
        </Dialog>
      </div >
    )
  }

}

export default LayoutConfigurationComponent
