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
import { Collection } from '@regardsoss/model'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { HateoasIconAction, ResourceIconAction, HateoasKeys } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { collectionActions } from '../client/CollectionClient'

/**
 * React component to list collections.
 */
export class CollectionListComponent extends React.Component {

  static propTypes = {
    collectionList: PropTypes.objectOf(Collection),
    handleDelete: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDuplicate: PropTypes.func.isRequired,
    createUrl: PropTypes.string.isRequired,
    backUrl: PropTypes.string.isRequired,
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
                <TableHeaderColumn><FormattedMessage id="collection.list.table.label" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="collection.list.table.model" /></TableHeaderColumn>
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
                  <TableRowColumn>{collection.content.label}</TableRowColumn>
                  <TableRowColumn>{collection.content.model.name}</TableRowColumn>
                  <TableRowColumn>
                    <HateoasIconAction
                      entityLinks={collection.links}
                      hateoasKey={HateoasKeys.UPDATE}
                      onTouchTap={() => handleEdit(collection.content.id)}
                    >
                      <Edit
                        hoverColor={style.hoverButtonEdit
                      }
                      />
                    </HateoasIconAction>
                    <ResourceIconAction
                      resourceDependency={collectionActions.getDependency(RequestVerbEnum.POST)}
                      onTouchTap={() => handleDuplicate(collection.content.id)}
                    >
                      <ContentCopy hoverColor={style.hoverButtonDuplicate} />
                    </ResourceIconAction>
                    <HateoasIconAction
                      entityLinks={collection.links}
                      hateoasKey={HateoasKeys.DELETE}
                      onTouchTap={() => handleDelete(collection.content.id)}
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
                id="collection.list.action.add"
              />
            }
            mainHateoasDependency={collectionActions.getDependency(RequestVerbEnum.POST)}
            secondaryButtonLabel={<FormattedMessage id="collection.list.action.cancel" />}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default CollectionListComponent

