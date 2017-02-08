/**
 * LICENSE_PLACEHOLDER
 **/
import {Layout} from '@regardsoss/model'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Container from './Container'
import ContainerHelper from '../ContainerHelper'

/**
 * Component to display configure a given layout
 * @author Sébastien Binda
 */
class LayoutConfigurationComponent extends React.Component {


  static propTypes = {
    layout: Layout,
    project: React.PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = {
      editingLayout: props.layout
    }
  }

  containerSelection = (action, container) => {
    console.log("Click on container : ", action, container)
    switch (action) {
      case 'DELETE':
        console.log("Deleting",container.id, this.state.editingLayout)
        const newLayout = ContainerHelper.removeContainerFromLayout(container.id, this.state.editingLayout)
        console.log("New layout",newLayout)
        this.setState({
          editingLayout: newLayout
        })
        break
      default:
        console.error("Undefined action")
    }
  }


  render() {

    return (
      <Card>
        <CardText>
          <Container
            appName="admin"
            container={this.state.editingLayout}
            project={this.props.project}
            onContainerClick={this.containerSelection}
            configurationMode
            mainContainer
          />
        </CardText>
      </Card>
    )

  }

}

export default LayoutConfigurationComponent
