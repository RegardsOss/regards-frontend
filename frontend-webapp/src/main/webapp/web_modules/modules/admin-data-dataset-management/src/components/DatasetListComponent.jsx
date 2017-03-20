/**
 * LICENSE_PLACEHOLDER
 **/
import { map } from 'lodash'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'
import { Dataset } from '@regardsoss/model'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { HateoasIconAction, HateoasKeys } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import DatasetActions from '../model/DatasetActions'

/**
 * React component to list datasets.
 */
export class DatasetListComponent extends React.Component {

  static propTypes = {
    datasetList: React.PropTypes.objectOf(Dataset),
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
    const { datasetList, handleEdit, handleDelete, createUrl, backUrl } = this.props
    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
      hoverButtonDelete: this.context.muiTheme.palette.accent1Color,
    }
    return (
      <Card>
        <CardTitle
          title={<FormattedMessage id="dataset.list.title" />}
          subtitle={<FormattedMessage id="dataset.list.subtitle" />}
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
                <TableHeaderColumn><FormattedMessage id="dataset.list.table.label" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="dataset.list.table.model" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="dataset.list.table.actions" /></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              preScanRows={false}
              showRowHover
            >
              {map(datasetList, (dataset, i) => (
                <TableRow key={i}>
                  <TableRowColumn>{dataset.content.label}</TableRowColumn>
                  <TableRowColumn>{dataset.content.model.name}</TableRowColumn>
                  <TableRowColumn>
                    <HateoasIconAction
                      entityLinks={dataset.links}
                      hateoasKey={HateoasKeys.UPDATE}
                      onTouchTap={() => handleEdit(dataset.content.id)}
                    >
                      <Edit hoverColor={style.hoverButtonEdit} />
                    </HateoasIconAction>
                    <HateoasIconAction
                      entityLinks={dataset.links}
                      hateoasKey={HateoasKeys.DELETE}
                      onTouchTap={() => handleDelete(dataset.content.id)}
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
                id="dataset.list.action.add"
              />
            }
            mainHateoasDependency={DatasetActions.getDependency(RequestVerbEnum.POST)}
            secondaryButtonLabel={<FormattedMessage id="dataset.list.action.cancel" />}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default DatasetListComponent

