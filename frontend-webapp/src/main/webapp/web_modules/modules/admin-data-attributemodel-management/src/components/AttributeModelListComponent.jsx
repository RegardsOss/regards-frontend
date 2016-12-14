import { map } from 'lodash'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import IconButton from 'material-ui/IconButton'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'
import { AttributeModel } from '@regardsoss/model'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * React component to list project.
 */
export class AttributeModelListComponent extends React.Component {

  static propTypes = {
    attrModelList: React.PropTypes.objectOf(AttributeModel),
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
    const { modelList, handleEdit, handleDelete, createUrl, backUrl } = this.props
    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
      hoverButtonDelete: this.context.muiTheme.palette.accent1Color,
      hoverButtonView: this.context.muiTheme.palette.pickerHeaderColor,
    }
    return (
      <Card>
        <CardTitle
          title={<FormattedMessage id="attrmodel.list.title" />}
          subtitle={<FormattedMessage id="attrmodel.list.subtitle" />}
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
                <TableHeaderColumn><FormattedMessage id="attrmodel.list.table.name" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="attrmodel.list.table.description" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="attrmodel.list.table.type" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="attrmodel.list.table.actions" /></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              preScanRows={false}
              showRowHover
            >
              {map(modelList, (attrmodel, i) => (
                <TableRow key={i}>
                  <TableRowColumn>{attrmodel.content.name}</TableRowColumn>
                  <TableRowColumn>{attrmodel.content.description}</TableRowColumn>
                  <TableRowColumn>{attrmodel.content.type}</TableRowColumn>
                  <TableRowColumn>

                    <IconButton onTouchTap={() => handleEdit(attrmodel.content.id)}>
                      <Edit hoverColor={style.hoverButtonEdit} />
                    </IconButton>

                    <IconButton onTouchTap={() => handleDelete(attrmodel.content.id)}>
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
                id="attrmodel.list.action.add"
              />
            }
            secondaryButtonLabel={<FormattedMessage id="attrmodel.list.action.cancel" />}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default AttributeModelListComponent

