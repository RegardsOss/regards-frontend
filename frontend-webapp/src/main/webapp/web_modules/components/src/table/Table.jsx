/**
 * LICENSE_PLACEHOLDER
 **/
import { map, find } from 'lodash'
import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
}
  from 'material-ui/Table'

/**
 * Custom table
 */
class CustomTable extends React.Component {

  static propTypes = {
    headerColumns: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        label: React.PropTypes.string,
        attributes: React.PropTypes.arrayOf(React.PropTypes.string),
        hidden: React.PropTypes.bool,
      }),
    ),
    entities: React.PropTypes.arrayOf(React.PropTypes.object),
  }

  renderEntityAttribute = (column, entity, key) => {
    if (entity.content[column.attributes[0]]) {
      return <TableRowColumn>{entity.content[column.attributes[0]]}</TableRowColumn>
    }
    const attribute = find(entity.content.attributes, (attr, idx) => idx === column.attributes[0])

    return <TableRowColumn key={key}>{attribute}</TableRowColumn>
  }

  render() {
    if (!this.props.entities || this.props.entities.length === 0) {
      return null
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            {map(this.props.headerColumns, (column, idx) =>
              <TableHeaderColumn key={idx}>{column.label}</TableHeaderColumn>,
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {map(this.props.entities, (entity, idx) => (
            <TableRow key={idx} selected={false}>
              {map(this.props.headerColumns, (column, key) =>
                    this.renderEntityAttribute(column, entity, key))
                  }
            </TableRow>
              ))}
        </TableBody>
      </Table>
    )
  }

}

export default CustomTable
