/**
 * LICENSE_PLACEHOLDER
 **/
import { Layout } from '@regardsoss/model'
import { Card, CardText } from 'material-ui/Card'
import Dialog from 'material-ui/Dialog'
import Container from './Container'
import ContainerConfigurationComponent from './ContainerConfigurationComponent'
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
    layout: Layout,
    project: PropTypes.string,
    onChange: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      editorOpened: false,
      containerToEdit: null,
      actionType: '',
    }
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
    const dialogTitle = 'Container configuration'

    return (
      <div>
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
          <ContainerConfigurationComponent
            key={this.state.containerToEdit ? this.state.containerToEdit.id : 'create'}
            container={this.state.containerToEdit}
            onCancel={this.handleClose}
            onSubmit={this.state.containerToEdit ? this.onUpdate : this.onCreate}
          />
        </Dialog>
      </div>
    )
  }

}

export default LayoutConfigurationComponent

export {
  ADD_ACTION,
  DELETE_ACTION,
  EDIT_ACTION,
}
