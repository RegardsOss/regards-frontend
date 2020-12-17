/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import { ListItem } from 'material-ui/List'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { SelectableList, CardActionsComponent } from '@regardsoss/components'
import { AdminShapes } from '@regardsoss/shape'
import { AdminDomain } from '@regardsoss/domain'
import ResourceAccessFormByMicroserviceContainer from '../containers/ResourceAccessFormByMicroserviceContainer'

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
    ...themeContextType,
  }

  state = {
    activeMicroservice: values(STATIC_CONF.MSERVICES)[0],
  }

  /**
   * Returns role label for role name as parameter
   * @param {string} name role name, mandatory
   * @return {string} label to use
   */
  getRoleLabel = (name) => AdminDomain.DEFAULT_ROLES.includes(name) ? this.context.intl.formatMessage({ id: `role.name.${name}` }) : name

  activateTab = (microservice) => {
    this.setState({
      activeMicroservice: microservice,
    })
  }

  render() {
    const { backUrl, microserviceList, currentRole } = this.props
    const { moduleTheme } = this.context
    const { activeMicroservice } = this.state
    const {
      microserviceSplitPanel: {
        layoutStyle, leftColumnStyle, rightColumnStyle, leftListStyle, titleStyle, contentStyle,
      },
    } = moduleTheme
    return (
      <Card>
        <CardTitle
          title={this.context.intl.formatMessage({ id: 'role.list.title' }, { role: this.getRoleLabel(currentRole.content.name) })}
          subtitle={this.context.intl.formatMessage({ id: 'role.list.subtitle' })}
        />
        <CardText>
          <div style={layoutStyle}>
            <div style={titleStyle} />
            <div style={contentStyle}>
              <div style={leftColumnStyle} className="col-xs-33 col-lg-25">
                <SelectableList
                  style={leftListStyle}
                  defaultValue={activeMicroservice}
                  onSelect={this.activateTab}
                >
                  {map(microserviceList, (microserviceName, id) => (
                    <ListItem
                      key={`${microserviceName}`}
                      value={microserviceName}
                      primaryText={microserviceName}
                    />
                  ))}
                </SelectableList>
              </div>
              <div style={rightColumnStyle} className="selenium-microservices-controller col-xs-67 col-lg-75">
                <ResourceAccessFormByMicroserviceContainer
                  key={activeMicroservice}
                  microserviceName={activeMicroservice}
                  currentRole={this.props.currentRole}
                  roleResources={this.props.roleResources}
                  editRoleResources={this.props.editRoleResources}
                />
              </div>
            </div>
          </div>
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
