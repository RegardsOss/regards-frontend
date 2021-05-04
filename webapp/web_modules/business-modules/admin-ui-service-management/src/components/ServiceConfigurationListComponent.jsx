/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
} from 'material-ui/Table'

import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { AccessShapes } from '@regardsoss/shape'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { uiPluginConfigurationActions } from '../clients/UIPluginConfigurationClient'
import EnableConfigurationComponent from './options/EnableConfigurationComponent'
import EnableConfigurationOnAllComponent from './options/EnableConfigurationOnAllComponent'
import EditConfigurationComponent from './options/EditConfigurationComponent'
import DeleteConfigurationComponent from './options/DeleteConfigurationComponent'
import DuplicateConfigurationComponent from './options/DuplicateConfigurationComponent'

/**
 * React component to list datasets.
 *
 * @author Léo Mieulet
 */
class ServiceConfigurationListComponent extends React.Component {
  static propTypes = {
    uiPluginConfigurationList: AccessShapes.UIPluginConfList,
    uiPluginDefinition: AccessShapes.UIPluginDefinition.isRequired,
    plugin: AccessShapes.UIPluginInstanceContent,
    handleDelete: PropTypes.func.isRequired,
    handleDuplicate: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleToggleActivation: PropTypes.func.isRequired,
    handleToggleDefault: PropTypes.func.isRequired,
    createUrl: PropTypes.string.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    backUrl: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static CREATE_DEPENDENCIES = [uiPluginConfigurationActions.getDependency(RequestVerbEnum.POST)]

  renderIcon = () => {
    const { uiPluginDefinition } = this.props
    if (uiPluginDefinition.content.iconUrl) {
      return <img src={uiPluginDefinition.content.iconUrl} alt="" width="75" height="75" />
    }
    return null
  }

  render() {
    const {
      uiPluginConfigurationList, plugin, handleToggleActivation, handleDuplicate, handleToggleDefault, handleEdit, handleDelete, createUrl, backUrl,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { plugin: pluginStyles } } = this.context
    return (
      <Card>
        <CardTitle
          title={formatMessage({ id: 'service.listconf.title' }, { value: plugin.info.name })}
          subtitle={formatMessage({ id: 'service.listconf.subtitle' })}
        />
        <CardText>
          <div className={pluginStyles.line.classes}>
            <div className={pluginStyles.description.classes}>
              <div>
                {formatMessage({ id: 'service.listconf.plugin.title' })}
              </div>
              <div>
                {formatMessage({ id: 'service.listconf.plugin.description' }, { value: plugin.info.description })}
              </div>
              <div>
                {formatMessage({ id: 'service.listconf.plugin.version' }, { value: plugin.info.version })}
              </div>
              <div>
                {formatMessage({ id: 'service.listconf.plugin.author' }, { value: plugin.info.author })}
              </div>
              <div>
                {formatMessage({ id: 'service.listconf.plugin.company' }, { value: plugin.info.company })}
              </div>
              <div>
                {formatMessage({ id: 'service.listconf.plugin.email' }, { value: plugin.info.email })}
              </div>
              <div>
                {formatMessage({ id: 'service.listconf.plugin.license' }, { value: plugin.info.license })}
              </div>
              <div>
                {formatMessage({ id: 'service.listconf.plugin.url' }, { value: plugin.info.url })}
              </div>
            </div>
            <div className={pluginStyles.icon.classes}>
              {this.renderIcon()}
            </div>
          </div>
          <Table
            selectable={false}
          >
            <TableHeader
              enableSelectAll={false}
              adjustForCheckbox={false}
              displaySelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn>{formatMessage({ id: 'service.listconf.table.label' })}</TableHeaderColumn>
                <TableHeaderColumn>{formatMessage({ id: 'service.listconf.table.status' })}</TableHeaderColumn>
                <TableHeaderColumn>{formatMessage({ id: 'service.listconf.table.default' })}</TableHeaderColumn>
                <TableHeaderColumn>{formatMessage({ id: 'service.listconf.table.actions' })}</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              preScanRows={false}
              showRowHover
            >
              {map(uiPluginConfigurationList, (uiPluginConfiguration, i) => (
                <TableRow key={i}>
                  <TableRowColumn>{uiPluginConfiguration.content.label}</TableRowColumn>
                  <TableRowColumn>
                    <EnableConfigurationComponent
                      uiPluginConfiguration={uiPluginConfiguration}
                      onToggleEnabled={handleToggleActivation}
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    <EnableConfigurationOnAllComponent
                      uiPluginConfiguration={uiPluginConfiguration}
                      onToggleEnabledForAll={handleToggleDefault}
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    <EditConfigurationComponent
                      uiPluginConfiguration={uiPluginConfiguration}
                      onEdit={handleEdit}
                    />
                    <DuplicateConfigurationComponent
                      uiPluginConfiguration={uiPluginConfiguration}
                      onDuplicate={handleDuplicate}
                    />
                    <DeleteConfigurationComponent
                      uiPluginConfiguration={uiPluginConfiguration}
                      onDelete={handleDelete}
                    />
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonUrl={createUrl}
            mainButtonLabel={
              formatMessage({ id: 'service.listconf.action.add' })
            }
            mainHateoasDependencies={ServiceConfigurationListComponent.CREATE_DEPENDENCIES}
            secondaryButtonLabel={formatMessage({ id: 'service.listconf.action.back' })}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default ServiceConfigurationListComponent
