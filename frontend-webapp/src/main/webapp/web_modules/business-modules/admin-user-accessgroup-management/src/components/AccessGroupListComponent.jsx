/**
 * LICENSE_PLACEHOLDER
 **/
import { map } from 'lodash'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import ContentCopy from 'material-ui/svg-icons/content/content-copy'
import Delete from 'material-ui/svg-icons/action/delete'
import { HateoasIconAction, HateoasKeys } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { AccessGroup } from '@regardsoss/model'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import AccessGroupActions from '../model/AccessGroupActions'

/**
 * React component to list accessgroups.
 */
export class AccessGroupListComponent extends React.Component {

  static propTypes = {
    accessGroupList: React.PropTypes.objectOf(AccessGroup),
    handleDelete: React.PropTypes.func.isRequired,
    handleEdit: React.PropTypes.func.isRequired,
    handleDuplicate: React.PropTypes.func.isRequired,
    createUrl: React.PropTypes.string.isRequired,
    backUrl: React.PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }


  render() {
    const { accessGroupList, handleEdit, handleDelete, handleDuplicate, createUrl, backUrl } = this.props
    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
      hoverButtonDelete: this.context.muiTheme.palette.accent1Color,
      hoverButtonDuplicate: this.context.muiTheme.palette.primary3Color,
    }
    return (
      <Card>
        <CardTitle
          title={<FormattedMessage id="group.list.title" />}
          subtitle={<FormattedMessage id="group.list.subtitle" />}
        />
        <CardText>
          <Table
            selectable={false}
          >
            <TableHeader
              enableSelectAll={false}
              adjustForCheckbox={false}
              displaySelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn><FormattedMessage id="group.list.table.name" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="group.list.table.nbUser" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="group.list.table.actions" /></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              preScanRows={false}
              showRowHover
            >
              {map(accessGroupList, (accessGroup, i) => (
                <TableRow className={`selenium-group-${accessGroup.content.name}`} key={i}>
                  <TableRowColumn>{accessGroup.content.name}</TableRowColumn>
                  <TableRowColumn>{accessGroup.content.users.length}</TableRowColumn>
                  <TableRowColumn>
                    <HateoasIconAction
                      entityLinks={accessGroup.links}
                      hateoasKey={HateoasKeys.UPDATE}
                      onTouchTap={() => handleEdit(accessGroup.content.name)}
                    >
                      <Edit hoverColor={style.hoverButtonEdit} />
                    </HateoasIconAction>
                    <HateoasIconAction
                      entityLinks={accessGroup.links}
                      hateoasKey={HateoasKeys.UPDATE}
                      onTouchTap={() => handleDuplicate(accessGroup.content.name)}
                    >
                      <ContentCopy hoverColor={style.hoverButtonDuplicate} />
                    </HateoasIconAction>
                    <HateoasIconAction
                      entityLinks={accessGroup.links}
                      hateoasKey={HateoasKeys.DELETE}
                      onTouchTap={() => handleDelete(accessGroup.content.name)}
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
                id="group.list.action.add"
              />
            }
            mainButtonClassName="selenium-createButton"
            mainHateoasDependency={AccessGroupActions.getDependency(RequestVerbEnum.POST)}
            secondaryButtonLabel={<FormattedMessage id="group.list.action.cancel" />}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default AccessGroupListComponent

