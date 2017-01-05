import { map } from 'lodash'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import IconButton from 'material-ui/IconButton'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'
import { Fragment } from '@regardsoss/model'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * React components to list project.
 */
export class FragmentListComponent extends React.Component {

  static propTypes = {
    fragmentList: React.PropTypes.objectOf(Fragment),
    handleDelete: React.PropTypes.func.isRequired,
    handleEdit: React.PropTypes.func.isRequired,
    createUrl: React.PropTypes.string.isRequired,
    backUrl: React.PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }


  render() {
    const { fragmentList, handleEdit, handleDelete, createUrl, backUrl } = this.props
    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
      hoverButtonDelete: this.context.muiTheme.palette.accent1Color,
      hoverButtonView: this.context.muiTheme.palette.pickerHeaderColor,
    }
    return (
      <Card>
        <CardTitle
          title={<FormattedMessage id="fragment.list.title" />}
          subtitle={<FormattedMessage id="fragment.list.subtitle" />}
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
                <TableHeaderColumn><FormattedMessage id="fragment.list.table.name" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="fragment.list.table.description" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="fragment.list.table.actions" /></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              preScanRows={false}
              showRowHover
            >
              {map(fragmentList, (fragment, i) => (
                <TableRow key={i}>
                  <TableRowColumn>{fragment.content.name}</TableRowColumn>
                  <TableRowColumn>{fragment.content.description}</TableRowColumn>
                  <TableRowColumn>
                    <IconButton onTouchTap={() => handleEdit(fragment.content.id)}>
                      <Edit hoverColor={style.hoverButtonEdit} />
                    </IconButton>
                    <IconButton onTouchTap={() => handleDelete(fragment.content.id)}>
                      <Delete hoverColor={style.hoverButtonDelete} />
                    </IconButton>
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
                id="fragment.list.action.add"
              />
            }
            secondaryButtonLabel={<FormattedMessage id="fragment.list.action.cancel" />}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default FragmentListComponent

