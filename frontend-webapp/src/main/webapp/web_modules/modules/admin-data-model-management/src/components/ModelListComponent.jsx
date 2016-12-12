import { map } from 'lodash'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import IconButton from 'material-ui/IconButton'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Input from 'material-ui/svg-icons/action/input'
import Delete from 'material-ui/svg-icons/action/delete'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * React component to list project.
 */
export class ProjectListComponent extends React.Component {

  static propTypes = {
    modelList: React.PropTypes.objectOf(
      React.PropTypes.shape({
        content: React.PropTypes.shape({
          id: React.PropTypes.number,
          name: React.PropTypes.string,
          description: React.PropTypes.string,
          type: React.PropTypes.string,
        }),
      }),
    ),
    handleDelete: React.PropTypes.func.isRequired,
    handleOpen: React.PropTypes.func.isRequired,
    handleEdit: React.PropTypes.func.isRequired,
    createUrl: React.PropTypes.string.isRequired,
    backUrl: React.PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  getVisibility = (isPublic) => {
    if (isPublic) {
      return (<FormattedMessage id="model.list.value.isPublic" />)
    }
    return (<FormattedMessage id="model.list.value.isPrivate" />)
  }

  getType = (isDeleted) => {
    if (isDeleted) {
      return (<FormattedMessage id="model.list.value.isDeleted" />)
    }
    return (null)
  }

  render() {
    const { modelList, handleEdit, handleDelete, handleOpen, createUrl, backUrl } = this.props
    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
      hoverButtonDelete: this.context.muiTheme.palette.accent1Color,
      hoverButtonView: this.context.muiTheme.palette.pickerHeaderColor,
    }
    return (
      <Card>
        <CardTitle
          title={<FormattedMessage id="model.list.title" />}
          subtitle={<FormattedMessage id="model.list.subtitle" />}
        />
        <CardText>
          <Table
            selectable
          >
            <TableHeader
              enableSelectAll={false}
              adjustForCheckbox={false}
              displaySelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn><FormattedMessage id="model.list.table.name" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="model.list.table.description" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="model.list.table.type" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="model.list.table.actions" /></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              preScanRows={false}
              showRowHover
            >
              {map(modelList, (model, i) => (
                <TableRow key={i}>
                  <TableRowColumn>{model.content.name}</TableRowColumn>
                  <TableRowColumn>{model.content.description}</TableRowColumn>
                  <TableRowColumn>{this.getType(model.content.type)}</TableRowColumn>
                  <TableRowColumn>
                    <IconButton
                      onTouchTap={() => handleOpen(model.content.id)}
                    >
                      <Input hoverColor={style.hoverButtonView} />
                    </IconButton>

                    <IconButton onTouchTap={() => handleEdit(model.content.id)}>
                      <Edit hoverColor={style.hoverButtonEdit} />
                    </IconButton>

                    <IconButton onTouchTap={() => handleDelete(model.content.id)}>
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
                id="model.list.action.add"
              />
            }
            secondaryButtonLabel={<FormattedMessage id="model.list.action.cancel" />}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default ProjectListComponent

