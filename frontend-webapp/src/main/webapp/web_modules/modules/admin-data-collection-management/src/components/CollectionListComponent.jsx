/**
 * LICENSE_PLACEHOLDER
 **/
import { map } from 'lodash'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import IconButton from 'material-ui/IconButton'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import ContentCopy from 'material-ui/svg-icons/content/content-copy'
import Delete from 'material-ui/svg-icons/action/delete'
import { Collection } from '@regardsoss/model'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * React component to list collections.
 */
export class CollectionListComponent extends React.Component {

  static propTypes = {
    collectionList: React.PropTypes.objectOf(Collection),
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
    const { collectionList, handleEdit, handleDelete, handleDuplicate, createUrl, backUrl } = this.props
    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
      hoverButtonDelete: this.context.muiTheme.palette.accent1Color,
      hoverButtonDuplicate: this.context.muiTheme.palette.primary3Color,
    }
    return (
      <Card>
        <CardTitle
          title={<FormattedMessage id="collection.list.title" />}
          subtitle={<FormattedMessage id="collection.list.subtitle" />}
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
                <TableHeaderColumn><FormattedMessage id="collection.list.table.fragment" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="collection.list.table.name" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="collection.list.table.description" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="collection.list.table.type" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="collection.list.table.actions" /></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              preScanRows={false}
              showRowHover
            >
              {map(collectionList, (collection, i) => (
                <TableRow key={i}>
                  <TableRowColumn>{collection.content.name}</TableRowColumn>
                  <TableRowColumn>{collection.content.name}</TableRowColumn>
                  <TableRowColumn>{collection.content.description}</TableRowColumn>
                  <TableRowColumn>{collection.content.type}</TableRowColumn>
                  <TableRowColumn>
                    <IconButton onTouchTap={() => handleDuplicate(collection.content.id)}>
                      <ContentCopy hoverColor={style.hoverButtonDuplicate} />
                    </IconButton>
                    <IconButton onTouchTap={() => handleEdit(collection.content.id)}>
                      <Edit hoverColor={style.hoverButtonEdit} />
                    </IconButton>
                    <IconButton onTouchTap={() => handleDelete(collection.content.id)}>
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
                id="collection.list.action.add"
              />
            }
            secondaryButtonLabel={<FormattedMessage id="collection.list.action.cancel" />}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default CollectionListComponent

