
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
class DatasourceModelListComponent extends React.Component {

  getCreateUrl = () => {
    return this.props.getCreateUrl()
  }
  getBackUrl = () => {
    return this.props.getBackUrl()
  }


  render() {
    const { datasourceModels } = this.props
    return (
      <Card
        initiallyExpanded
      >
        <CardTitle
          title={
            <FormattedMessage
              id="datamanagement.datasourcemodel.list.header"
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
                    id="datamanagement.datasourcemodel.table.name"
                  />
                </TableHeaderColumn>
                <TableHeaderColumn>
                  <FormattedMessage
                    id="datamanagement.datasourcemodel.table.actions"
                  />
                </TableHeaderColumn>
                <TableHeaderColumn />
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} preScanRows={false}>
              {map(datasourceModels, (datasourceModel, id) => (

                <TableRow
                  key={id}
                >
                  <TableRowColumn>
                    {datasourceModel.name}
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
            secondaryButtonUrl={this.getBackUrl()}
            secondaryButtonLabel={
              <FormattedMessage
                id="datamanagement.datasourcemodel.list.action.back"
              />
            }
            mainButtonUrl={this.getCreateUrl()}
            mainButtonLabel={
              <FormattedMessage
                id="datamanagement.datasourcemodel.list.action.add"
              />
            }
          />
        </CardText>
      </Card>
    )
  }
}

DatasourceModelListComponent.propTypes = {
  getBackUrl: React.PropTypes.func.isRequired,
  getCreateUrl: React.PropTypes.func.isRequired,
  datasourceModels: React.PropTypes.arrayOf(React.PropTypes.objectOf(React.PropTypes.string)).isRequired,
}

export default DatasourceModelListComponent
