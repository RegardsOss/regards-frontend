/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import IconButton from 'material-ui/IconButton'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import ContentCopy from 'material-ui/svg-icons/content/content-copy'
import Delete from 'material-ui/svg-icons/action/delete'
import { FormattedMessage } from 'react-intl'
import { DataManagementShapes } from '@regardsoss/shape'
import { CardActionsComponent, ConfirmDialogComponent, ShowableAtRender, ActionsMenuCell } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { withHateoasDisplayControl, withResourceDisplayControl, HateoasKeys } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { collectionActions } from '../clients/CollectionClient'

const HateoasIconAction = withHateoasDisplayControl(IconButton)
const ResourceIconAction = withResourceDisplayControl(IconButton)

/**
 * React component to list collections.
 */
export class CollectionListComponent extends React.Component {

  static propTypes = {
    collectionList: DataManagementShapes.CollectionList,
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

  state = {
    deleteDialogOpened: false,
    entityToDelete: null,
  }

  closeDeleteDialog = () => {
    this.setState({
      deleteDialogOpened: false,
      entityToDelete: null,
    })
  }

  openDeleteDialog = (entity) => {
    this.setState({
      deleteDialogOpened: true,
      entityToDelete: entity,
    })
  }

  renderDeleteConfirmDialog = () => {
    const name = this.state.entityToDelete ? this.state.entityToDelete.content.label : ' '
    const title = this.context.intl.formatMessage({ id: 'collection.list.delete.message' }, { name })
    return (
      <ShowableAtRender
        show={this.state.deleteDialogOpened}
      >
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponent.dialogTypes.DELETE}
          onConfirm={() => {
            this.props.handleDelete(this.state.entityToDelete.content.id)
          }}
          onClose={this.closeDeleteDialog}
          title={title}
        />
      </ShowableAtRender>
    )
  }


  render() {
    const { collectionList, handleEdit, handleDuplicate, createUrl, backUrl } = this.props
    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
      hoverButtonDelete: this.context.muiTheme.palette.accent1Color,
      hoverButtonDuplicate: this.context.muiTheme.palette.primary3Color,
    }
    const { intl } = this.context
    return (
      <Card>
        <CardTitle
          title={this.context.intl.formatMessage({ id: 'collection.list.title' })}
          subtitle={this.context.intl.formatMessage({ id: 'collection.list.subtitle' })}
        />
        <CardText>
          {this.renderDeleteConfirmDialog()}
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
                    <ActionsMenuCell>
                      <HateoasIconAction
                        entityLinks={collection.links}
                        hateoasKey={HateoasKeys.UPDATE}
                        onTouchTap={() => handleEdit(collection.content.id)}
                        breakpoint={940}
                        title={intl.formatMessage({ id: 'collection.list.action.edit' })}
                      >
                        <Edit
                          hoverColor={style.hoverButtonEdit
                          }
                        />
                      </HateoasIconAction>
                      <ResourceIconAction
                        resourceDependencies={collectionActions.getDependency(RequestVerbEnum.POST)}
                        onTouchTap={() => handleDuplicate(collection.content.id)}
                        breakpoint={995}
                        title={intl.formatMessage({ id: 'collection.list.action.duplicate' })}
                      >
                        <ContentCopy hoverColor={style.hoverButtonDuplicate} />
                      </ResourceIconAction>
                      <HateoasIconAction
                        entityLinks={collection.links}
                        hateoasKey={HateoasKeys.DELETE}
                        onTouchTap={() => this.openDeleteDialog(collection)}
                        breakpoint={1065}
                        title={intl.formatMessage({ id: 'collection.list.action.delete' })}
                      >
                        <Delete hoverColor={style.hoverButtonDelete} />
                      </HateoasIconAction>
                    </ActionsMenuCell>
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
            mainHateoasDependencies={[collectionActions.getDependency(RequestVerbEnum.POST)]}
            secondaryButtonLabel={this.context.intl.formatMessage({ id: 'collection.list.action.cancel' })}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default CollectionListComponent

