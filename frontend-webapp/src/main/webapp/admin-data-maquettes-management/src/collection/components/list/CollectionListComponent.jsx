
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
class CollectionListComponent extends React.Component {


  getCreateUrl = () => (
    this.props.getCreateUrl()
    )
  getBackUrl = () => (
    this.props.getBackUrl()
)


  render() {
    const { collections } = this.props
    return (
      <Card
        initiallyExpanded
      >
        <CardTitle
          title={<FormattedMessage id="datamanagement.collection.list.header" />}
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
                    id="datamanagement.collection.table.name"
                  />
                </TableHeaderColumn>
                <TableHeaderColumn>
                  <FormattedMessage
                    id="datamanagement.collection.table.actions"
                  />
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} preScanRows={false}>
              {map(collections, (collection, id) => (

                <TableRow
                  key={id}
                >
                  <TableRowColumn>
                    {collection.name}
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
            secondaryButtonUrl={this.getBackUrl()}
            secondaryButtonLabel={
              <FormattedMessage
                id="datamanagement.collection.list.action.back"
              />
            }
            mainButtonUrl={this.getCreateUrl()}
            mainButtonLabel={
              <FormattedMessage
                id="datamanagement.collection.list.action.add"
              />
            }
          />
        </CardText>
      </Card>
    )
  }
}

CollectionListComponent.propTypes = {
  getBackUrl: React.PropTypes.func.isRequired,
  getCreateUrl: React.PropTypes.func.isRequired,
  collections: React.PropTypes.arrayOf(React.PropTypes.objectOf(React.PropTypes.string)).isRequired,
}

export default CollectionListComponent
