import { map } from 'lodash'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import { Tabs, Tab } from 'material-ui/Tabs'
import { CardActionsComponent } from '@regardsoss/components'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { Role, Resource } from '@regardsoss/model'
import ResourceAccessFormByMicroserviceContainer from './../containers/ResourceAccessFormByMicroserviceContainer'

/**
 * React container to edit resource access allowed for the
 * current role
 */
export class ResourceAccessFormComponent extends React.Component {

  static propTypes = {
    microserviceList: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    backUrl: React.PropTypes.string.isRequired,
    currentRole: Role.isRequired,
    roleResources: React.PropTypes.arrayOf(Resource).isRequired,
  }

  state= {
    activeMicroservice: STATIC_CONFIGURATION.microservices[0],
  }

  activateTab = (microservice) => {
    this.setState({
      activeMicroservice: microservice,
    })
  }

  renderTab = (microserviceName) => {
    if (microserviceName === this.state.activeMicroservice) {
      return (
        <ResourceAccessFormByMicroserviceContainer
          microserviceName={this.state.activeMicroservice}
          currentRole={this.props.currentRole}
          roleResources={this.props.roleResources}
        />
      )
    }
    return null
  }

  render() {
    const { backUrl, microserviceList, currentRole } = this.props
    return (
      <Card>
        <CardTitle
          title={<FormattedMessage
            id="role.list.title"
            values={{
              role: this.props.currentRole.content.name,
            }}
          />}
          subtitle={<FormattedMessage id="role.list.subtitle" />}
        />
        <CardText>
          <Tabs >
            {map(microserviceList, (microserviceName, id) => (
              <Tab
                label={microserviceName}
                key={id}
                onActive={() => this.activateTab(microserviceName)}
              >
                {this.renderTab(microserviceName)}
              </Tab>
            ))}
          </Tabs>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonLabel={
              <FormattedMessage
                id="role.list.action.back"
              />
            }
            mainButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default ResourceAccessFormComponent

