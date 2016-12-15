import { browserHistory } from 'react-router'
import { FormattedMessage } from 'react-intl'
import { Card, CardText } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import AppBar from 'material-ui/AppBar'
import ProjectConnectionFormComponent from './ProjectConnectionFormComponent'

/**
 * Display edit and create project form
 */
export class ProjectConnectionEditComponent extends React.Component {

  static propTypes = {
    currentProjectConnection: React.PropTypes.shape({
      content: React.PropTypes.shape({
        id: React.PropTypes.number,
        projectName: React.PropTypes.string,
        microservice: React.PropTypes.string,
        userName: React.PropTypes.string,
        password: React.PropTypes.string,
        driverClassName: React.PropTypes.string,
        url: React.PropTypes.string,
      }),
    }).isRequired,
  }


  handleBackClick = () => {
    browserHistory.goBack()
  }

  render() {
    return (
      <Card>
        <AppBar
          title={<FormattedMessage
            id="database.form.edit.title"
            values={{
              microservice: this.props.currentProjectConnection.content.microservice,
            }}
          />}
          iconElementLeft={<IconButton onTouchTap={this.handleBackClick}><ArrowBack /></IconButton>}
        />
        <CardText>
          <ProjectConnectionFormComponent
            currentProjectConnection={this.props.currentProjectConnection}
            onSubmit={() => alert('handle submit')}
            backUrl={'/back/url'}
          />
        </CardText>
      </Card>
    )
  }
}

export default ProjectConnectionEditComponent
