/**
 * LICENSE_PLACEHOLDER
 **/
import { DataManagementShapes } from '@regardsoss/shape'
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table'

class AttributeModelComponent extends React.Component {
  static propTypes = {
    attribute: DataManagementShapes.AttributeModel,
  }

  showIfAttributeIsNotOptional = modelAttribute => {
    if (!modelAttribute.content.optional) {
      return " (*)"
    }
    return null
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
            <TableRowColumn>{attribute.content.name}{this.showIfAttributeIsNotOptional(attribute)}</TableRowColumn>
            <TableRowColumn>{attribute.content.type}</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    )
  }
}

export default AttributeModelComponent
