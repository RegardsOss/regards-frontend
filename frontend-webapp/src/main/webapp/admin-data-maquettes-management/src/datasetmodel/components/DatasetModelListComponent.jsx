
import { Card, CardTitle, CardText } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import { TableRowColumn, Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table'
import Delete from 'material-ui/svg-icons/action/delete'
import { map } from 'lodash'
import FlatButton from 'material-ui/FlatButton'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import { CardActionsComponent } from '@regardsoss/components'

/**
 */
function ModelListComponent({ datasetModels, getBackUrl, getCreateUrl }) {
  return (
    <Card
      initiallyExpanded
    >
      <CardTitle
        title={
          <FormattedMessage
            id="datamanagement.datasetmodel.list.header"
          />
          }
      />
      <CardText>
        <Table
          selectable={false}
          multiSelectable={false}
        >
          <TableHeader
            enableSelectAll={false}
            adjustForCheckbox={false}
            displaySelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn>
                <FormattedMessage
                  id="datamanagement.datasetmodel.table.name"
                />
              </TableHeaderColumn>
              <TableHeaderColumn>
                <FormattedMessage
                  id="datamanagement.datasetmodel.table.actions"
                />
              </TableHeaderColumn>
              <TableHeaderColumn />
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} preScanRows={false}>
            {map(datasetModels, (datasetModel, id) => (

              <TableRow
                key={id}
              >
                <TableRowColumn>
                  {datasetModel.name}
                </TableRowColumn>
                <TableRowColumn>
                  <FlatButton
                    icon={<Edit />}
                    disabled
                  />
                </TableRowColumn>
                <TableRowColumn>
                  <FlatButton
                    icon={<Delete />}
                    disabled
                  />
                </TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>

        <CardActionsComponent
          secondaryButtonUrl={getBackUrl()}
          secondaryButtonLabel={
            <FormattedMessage
              id="datamanagement.datasetmodel.list.action.back"
            />
            }
          mainButtonUrl={getCreateUrl()}
          mainButtonLabel={
            <FormattedMessage
              id="datamanagement.datasetmodel.list.action.add"
            />
            }
        />
      </CardText>
    </Card>
  )
}
ModelListComponent.propTypes = {
  getBackUrl: React.PropTypes.func.isRequired,
  getCreateUrl: React.PropTypes.func.isRequired,
  datasetModels: React.PropTypes.arrayOf(React.PropTypes.objectOf(React.PropTypes.string)).isRequired,
}
export default ModelListComponent
