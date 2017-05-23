/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'
import ContentCopy from 'material-ui/svg-icons/content/content-copy'
import { CardActionsComponent, SVGIconFromString } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { HateoasIconAction, HateoasToggle, HateoasKeys, ResourceIconAction } from '@regardsoss/display-control'
import { PluginConf as UIPluginConfiguration, Plugin as UIPlugin } from '@regardsoss/model'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { uiPluginConfigurationActions } from '../client/UIPluginConfigurationClient'
import moduleStyles from '../styles/styles'

const styles = moduleStyles().plugin

/**
 * React component to list datasets.
 *
 * @author Léo Mieulet
 */
class ServiceConfigurationListComponent extends React.Component {

  static propTypes = {
    uiPluginConfigurationList: PropTypes.objectOf(PropTypes.shape({
      content: UIPluginConfiguration,
    })),
    plugin: UIPlugin,
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


  render() {
    const { uiPluginConfigurationList, plugin, handleToggleActivation, handleDuplicate, handleToggleDefault, handleEdit, handleDelete, createUrl, backUrl } = this.props
    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
      hoverButtonDelete: this.context.muiTheme.palette.accent1Color,
      hoverButtonDuplicate: this.context.muiTheme.palette.primary3Color,
    }
    return (
      <Card>
        <CardTitle
          title={<FormattedMessage id="service.listconf.title" values={{ value: plugin.info.name }} />}
          subtitle={this.context.intl.formatMessage({ id: 'service.listconf.subtitle' })}
        />
        <CardText>
          <div className={styles.line.classes}>
            <div className={styles.description.classes}>
              <div><FormattedMessage id="service.listconf.plugin.title" /> </div>
              <div><FormattedMessage id="service.listconf.plugin.description" values={{ value: plugin.info.description }} /> </div>
              <div><FormattedMessage id="service.listconf.plugin.version" values={{ value: plugin.info.version }} /> </div>
              <div><FormattedMessage id="service.listconf.plugin.author" values={{ value: plugin.info.author }} /> </div>
              <div><FormattedMessage id="service.listconf.plugin.company" values={{ value: plugin.info.company }} /> </div>
              <div><FormattedMessage id="service.listconf.plugin.email" values={{ value: plugin.info.email }} /> </div>
              <div><FormattedMessage id="service.listconf.plugin.license" values={{ value: plugin.info.license }} /> </div>
              <div><FormattedMessage id="service.listconf.plugin.url" values={{ value: plugin.info.url }} /> </div>
            </div>
            <div className={styles.icon.classes}>
              <SVGIconFromString
                viewBox={plugin.info.icon.viewBox}
                style={styles.icon.style}
                icon={plugin.info.icon.content}
              />
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
                  <TableRowColumn>{uiPluginConfiguration.content.conf.label}</TableRowColumn>
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
                      toggled={uiPluginConfiguration.content.default}
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
                      resourceDependency={uiPluginConfigurationActions.getDependency(RequestVerbEnum.POST)}
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
            mainHateoasDependency={uiPluginConfigurationActions.getDependency(RequestVerbEnum.POST)}
            secondaryButtonLabel={this.context.intl.formatMessage({ id: 'service.listconf.action.back' })}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default ServiceConfigurationListComponent

