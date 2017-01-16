import { map, forEach } from 'lodash'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import { Tabs, Tab } from 'material-ui/Tabs'
import { CardActionsComponent } from '@regardsoss/components'
import { Role } from '@regardsoss/model'
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
              >
                <ResourceAccessFormByMicroserviceContainer
                  microserviceName={microserviceName}
                  currentRole={currentRole}
                />
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

