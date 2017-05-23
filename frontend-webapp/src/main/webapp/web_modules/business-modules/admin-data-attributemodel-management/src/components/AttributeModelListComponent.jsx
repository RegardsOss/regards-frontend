import map from 'lodash/map'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import { HateoasIconAction, HateoasKeys } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'
import { AttributeModel } from '@regardsoss/model'
import { CardActionsComponent, ActionsMenuCell, ConfirmDialogComponent, ShowableAtRender } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { fragmentSelectors } from '../client/FragmentClient'
import { attributeModelActions } from '../client/AttributeModelClient'

/**
 * React components to list project.
 */
export class AttributeModelListComponent extends React.Component {

  static propTypes = {
    attrModelList: PropTypes.objectOf(AttributeModel),
    handleDelete: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
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
    const name = this.state.entityToDelete ? this.state.entityToDelete.content.name : ' '
    const title = this.context.intl.formatMessage({ id: 'attrmodel.list.delete.title' }, { name })
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

  getFragmentName = (attrModel) => {
    if (attrModel.content.fragment.name !== fragmentSelectors.noneFragmentName) {
      return attrModel.content.fragment.name
    }
    return ''
  }

  render() {
    const { attrModelList, handleEdit, handleDelete, createUrl, backUrl } = this.props
    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
      hoverButtonDelete: this.context.muiTheme.palette.accent1Color,
      hoverButtonView: this.context.muiTheme.palette.pickerHeaderColor,
    }
    const { intl } = this.context
    return (
      <Card>
        <CardTitle
          title={<FormattedMessage id="attrmodel.list.title" />}
          subtitle={<FormattedMessage id="attrmodel.list.subtitle" />}
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
                <TableHeaderColumn><FormattedMessage id="attrmodel.list.table.fragment" /></TableHeaderColumn>
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
              {map(attrModelList, attrmodel => (
                <TableRow key={attrmodel.content.id}>
                  <TableRowColumn>{this.getFragmentName(attrmodel)}</TableRowColumn>
                  <TableRowColumn>{attrmodel.content.name}</TableRowColumn>
                  <TableRowColumn>{attrmodel.content.description}</TableRowColumn>
                  <TableRowColumn>{attrmodel.content.type}</TableRowColumn>
                  <TableRowColumn>
                    <ActionsMenuCell>
                      <HateoasIconAction
                        entityLinks={attrmodel.links}
                        onTouchTap={() => handleEdit(attrmodel.content.id)}
                        hateoasKey={HateoasKeys.UPDATE}
                        breakpoint={940}
                        title={intl.formatMessage({ id: 'attrmodel.list.action.edit' })}
                      >
                        <Edit hoverColor={style.hoverButtonEdit} />
                      </HateoasIconAction>

                      <HateoasIconAction
                        entityLinks={attrmodel.links}
                        onTouchTap={() => this.openDeleteDialog(attrmodel)}
                        hateoasKey={HateoasKeys.DELETE}
                        breakpoint={995}
                        title={intl.formatMessage({ id: 'attrmodel.list.action.delete' })}
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
                id="attrmodel.list.action.add"
              />
            }
            mainHateoasDependency={attributeModelActions.getDependency(RequestVerbEnum.POST)}
            secondaryButtonLabel={<FormattedMessage id="attrmodel.list.action.cancel" />}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default AttributeModelListComponent

