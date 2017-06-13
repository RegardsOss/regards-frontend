/**
 * LICENSE_PLACEHOLDER
 **/
import { AttributeModel } from '@regardsoss/model'
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table'

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
