import { browserHistory } from 'react-router'
import { FormattedMessage } from 'react-intl'
import { Card, CardText } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import AppBar from 'material-ui/AppBar'
import ProjectConnection from '@regardsoss/model/src/admin/ProjectConnection'
import ProjectConnectionFormComponent from './ProjectConnectionFormComponent'

/**
 * Display edit and create project form
 */
export class ProjectConnectionEditComponent extends React.Component {

  static propTypes = {
    projectConnection: ProjectConnection.isRequired,
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
              microservice: this.props.projectConnection.content.microservice,
            }}
          />}
          iconElementLeft={<IconButton onTouchTap={this.handleBackClick}><ArrowBack /></IconButton>}
        />
        <CardText>
          <ProjectConnectionFormComponent
            projectConnection={this.props.projectConnection}
            onSubmit={() => alert('handle submit')}
            backUrl={'/back/url'}
          />
        </CardText>
      </Card>
    )
  }
}

export default ProjectConnectionEditComponent
