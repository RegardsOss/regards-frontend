/**
 * LICENSE_PLACEHOLDER
 **/
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { map } from 'lodash'
import Paper from 'material-ui/Paper'
import { AttributeModel } from '@regardsoss/model'
import ItemTypes from './ItemTypes'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

class AttributeModelComponent extends React.Component {
  static propTypes = {
    attribute: AttributeModel,
  }

  render() {
    const { attribute } = this.props
    return (
      <Table
        selectable
      >
        <TableBody
          displayRowCheckbox={false}
          preScanRows={false}
          showRowHover
        >
          <TableRow>
            <TableRowColumn>{attribute.content.name}</TableRowColumn>
            <TableRowColumn>{attribute.content.type}</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    )
  }
}

export default AttributeModelComponent
