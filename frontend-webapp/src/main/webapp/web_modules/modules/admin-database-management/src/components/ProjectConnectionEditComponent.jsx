/*
 * LICENSE_PLACEHOLDER
 */
import { FormattedMessage } from 'react-intl'
import { Card, CardTitle, CardText } from 'material-ui/Card'
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

  render() {
    const { projectConnection, onCancel, onSubmit } = this.props
    return (
      <Card>
        <CardTitle
          title={<FormattedMessage
            id="database.form.edit.title"
            values={{
              microservice: projectConnection.content.microservice,
              project: projectConnection.content.project.name,
            }}
          />}
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
