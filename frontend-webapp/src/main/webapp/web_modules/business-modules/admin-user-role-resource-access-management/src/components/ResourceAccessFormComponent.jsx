/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import map from 'lodash/map'
import values from 'lodash/values'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import { Tabs, Tab } from 'material-ui/Tabs'
import { i18nContextType } from '@regardsoss/i18n'
import { CardActionsComponent } from '@regardsoss/components'
import { AdminShapes } from '@regardsoss/shape'
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
    currentRole: AdminShapes.Role.isRequired,
    roleResources: AdminShapes.ResourceArray.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  state = {
    activeMicroservice: values(STATIC_CONF.MSERVICES)[0],
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
          title={this.context.intl.formatMessage({ id: 'role.list.title' }, { role: currentRole.content.name })}
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

