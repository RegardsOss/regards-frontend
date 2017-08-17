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
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import Toggle from 'material-ui/Toggle'
import { FormattedMessage } from 'react-intl'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'
import ContentCopy from 'material-ui/svg-icons/content/content-copy'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { AccessShapes } from '@regardsoss/shape'
import { withHateoasDisplayControl, HateoasKeys, withResourceDisplayControl } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { uiPluginConfigurationActions } from '../clients/UIPluginConfigurationClient'
import moduleStyles from '../styles/styles'

const styles = moduleStyles().plugin
const ResourceIconAction = withResourceDisplayControl(IconButton)
const HateoasIconAction = withHateoasDisplayControl(IconButton)
const HateoasToggle = withHateoasDisplayControl(Toggle)

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
    backUrl: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  renderIcon = () => {
    const { uiPluginDefinition } = this.props
    if (uiPluginDefinition.content.iconUrl) {
      return <img src={uiPluginDefinition.content.iconUrl} alt="" width="75" height="75" />
    }
    return null
  }

  render() {
    const { uiPluginConfigurationList, plugin, handleToggleActivation, handleDuplicate, handleToggleDefault, handleEdit, handleDelete, createUrl, backUrl } = this.props
    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
      hoverButtonDelete: this.context.muiTheme.palette.accent1Color,
      hoverButtonDuplicate: this.context.muiTheme.palette.primary3Color,
    }
    const descriptionMsgValues = { value: plugin.info.description }
    const versionMsgValues = { value: plugin.info.version }
    const authorMsgValues = { value: plugin.info.author }
    const companyMsgValues = { value: plugin.info.company }
    const emailMsgValues = { value: plugin.info.email }
    const licenseMsgValues = { value: plugin.info.license }
    const urlMsgValues = { value: plugin.info.url }
    return (
      <Card>
        <CardTitle
          title={this.context.intl.formatMessage({ id: 'service.listconf.title' }, { value: plugin.info.name })}
          subtitle={this.context.intl.formatMessage({ id: 'service.listconf.subtitle' })}
        />
        <CardText>
          <div className={styles.line.classes}>
            <div className={styles.description.classes}>
              <div><FormattedMessage id="service.listconf.plugin.title" /> </div>
              <div><FormattedMessage id="service.listconf.plugin.description" values={descriptionMsgValues} /> </div>
              <div><FormattedMessage id="service.listconf.plugin.version" values={versionMsgValues} /> </div>
              <div><FormattedMessage id="service.listconf.plugin.author" values={authorMsgValues} /> </div>
              <div><FormattedMessage id="service.listconf.plugin.company" values={companyMsgValues} /> </div>
              <div><FormattedMessage id="service.listconf.plugin.email" values={emailMsgValues} /> </div>
              <div><FormattedMessage id="service.listconf.plugin.license" values={licenseMsgValues} /> </div>
              <div><FormattedMessage id="service.listconf.plugin.url" values={urlMsgValues} /> </div>
            </div>
            <div className={styles.icon.classes}>
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
                <TableHeaderColumn><FormattedMessage id="service.listconf.table.label" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="service.listconf.table.status" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="service.listconf.table.default" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="service.listconf.table.actions" /></TableHeaderColumn>
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
                    <HateoasToggle
                      entityLinks={uiPluginConfiguration.links}
                      hateoasKey={HateoasKeys.UPDATE}
                      toggled={uiPluginConfiguration.content.active}
                      onToggle={() => handleToggleActivation(uiPluginConfiguration.content)}
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    <HateoasToggle
                      entityLinks={uiPluginConfiguration.links}
                      hateoasKey={HateoasKeys.UPDATE}
                      toggled={uiPluginConfiguration.content.linkedToAllEntities}
                      disabled={!uiPluginConfiguration.content.active}
                      onToggle={() => handleToggleDefault(uiPluginConfiguration.content)}
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    <HateoasIconAction
                      entityLinks={uiPluginConfiguration.links}
                      hateoasKey={HateoasKeys.UPDATE}
                      onTouchTap={() => handleEdit(uiPluginConfiguration.content.id)}
                      title={this.context.intl.formatMessage({ id: 'service.listconf.tooltip.edit' })}
                    >
                      <Edit hoverColor={style.hoverButtonEdit} />
                    </HateoasIconAction>
                    <ResourceIconAction
                      resourceDependencies={uiPluginConfigurationActions.getDependency(RequestVerbEnum.POST)}
                      onTouchTap={() => handleDuplicate(uiPluginConfiguration.content.id)}
                      title={this.context.intl.formatMessage({ id: 'service.listconf.tooltip.duplicate' })}
                    >
                      <ContentCopy hoverColor={style.hoverButtonDuplicate} />
                    </ResourceIconAction>
                    <HateoasIconAction
                      entityLinks={uiPluginConfiguration.links}
                      hateoasKey={HateoasKeys.DELETE}
                      onTouchTap={() => handleDelete(uiPluginConfiguration.content.id)}
                      title={this.context.intl.formatMessage({ id: 'service.listconf.tooltip.delete' })}
                    >
                      <Delete hoverColor={style.hoverButtonDelete} />
                    </HateoasIconAction>
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
              <FormattedMessage
                id="service.listconf.action.add"
              />
            }
            mainHateoasDependencies={[uiPluginConfigurationActions.getDependency(RequestVerbEnum.POST)]}
            secondaryButtonLabel={this.context.intl.formatMessage({ id: 'service.listconf.action.back' })}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default ServiceConfigurationListComponent

