/*
 * LICENSE_PLACEHOLDER
 */
import { browserHistory } from 'react-router'
import { FormattedMessage } from 'react-intl'
import { Card, CardText } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import AppBar from 'material-ui/AppBar'
import ProjectConnection from '@regardsoss/model/src/admin/ProjectConnection'
import ProjectConnectionFormComponent from './ProjectConnectionFormComponent'

/**
 * React component using the {@link ProjectConnectionFormComponent} to allow edition of the passed {@link ProjectConnection}.
 *
 * @author Xavier-Alexandre Brochard
 */
export class ProjectConnectionEditComponent extends React.Component {

  static propTypes = {
    projectConnection: ProjectConnection.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
  }


  handleBackClick = () => {
    browserHistory.goBack()
  }

  render() {
    const { projectConnection, onSubmit, onCancel } = this.props
    return (
      <Card>
        <AppBar
          title={<FormattedMessage
            id="database.form.edit.title"
            values={{
              microservice: projectConnection.content.microservice,
            }}
          />}
          iconElementLeft={<IconButton onTouchTap={this.handleBackClick}><ArrowBack /></IconButton>}
        />
        <CardText>
          <ProjectConnectionFormComponent
            projectConnection={projectConnection}
            onSubmit={onSubmit}
            onCancel={onCancel}
          />
        </CardText>
      </Card>
    )
  }
}

export default ProjectConnectionEditComponent
