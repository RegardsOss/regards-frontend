
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
function ConnectionListComponent(props) {
  const { connections, getCreateUrl, getBackUrl } = props
  return (
    <Card
      initiallyExpanded
    >
      <CardTitle
        title={<FormattedMessage id="datamanagement.connection.list.header" />}
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
                  id="datamanagement.connection.table.name"
                />
              </TableHeaderColumn>
              <TableHeaderColumn>
                <FormattedMessage
                  id="datamanagement.connection.table.actions"
                />
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} preScanRows={false}>
            {map(connections, (connection, id) => (

              <TableRow
                key={id}
              >
                <TableRowColumn>
                  {connection.name}
                </TableRowColumn>
                <TableRowColumn>
                  <FlatButton icon={<Delete />} disabled />
                  <FlatButton icon={<Edit />} disabled />
                </TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>

        <CardActionsComponent
          secondaryButtonUrl={getBackUrl()}
          secondaryButtonLabel={
            <FormattedMessage
              id="datamanagement.connection.list.action.back"
            />
            }
          mainButtonUrl={getCreateUrl()}
          mainButtonLabel={
            <FormattedMessage
              id="datamanagement.connection.list.action.add"
            />
            }
        />
      </CardText>
    </Card>
    )
}

ConnectionListComponent.propTypes = {
  getBackUrl: React.PropTypes.func.isRequired,
  getCreateUrl: React.PropTypes.func.isRequired,
  connections: React.PropTypes.arrayOf(React.PropTypes.objectOf(React.PropTypes.string)).isRequired,
}

export default ConnectionListComponent
