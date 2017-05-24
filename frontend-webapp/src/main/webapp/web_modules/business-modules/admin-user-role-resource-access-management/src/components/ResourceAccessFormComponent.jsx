import map from 'lodash/map'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import { Tabs, Tab } from 'material-ui/Tabs'
import {i18nContextType} from '@regardsoss/i18n'
import { CardActionsComponent } from '@regardsoss/components'
import { Role, Resource } from '@regardsoss/model'
import ResourceAccessFormByMicroserviceContainer from './../containers/ResourceAccessFormByMicroserviceContainer'

/**
 * React container to edit resource access allowed for the
 * current role
 */
export class ResourceAccessFormComponent extends React.Component {

  static propTypes = {
    microserviceList: PropTypes.arrayOf(PropTypes.string).isRequired,
    backUrl: PropTypes.string.isRequired,
    editRoleResources: PropTypes.func.isRequired,
    currentRole: Role.isRequired,
    roleResources: PropTypes.arrayOf(Resource).isRequired,
  }

  static contextTypes = {
    ...i18nContextType
  }

  state = {
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
          editRoleResources={this.props.editRoleResources}
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
              role: currentRole.content.name,
            }}
          />}
          subtitle={this.context.intl.formatMessage({ id: 'role.list.subtitle' })}
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

