/**
 * LICENSE_PLACEHOLDER
 **/
import { Table, Column } from 'fixed-data-table'
import './fixed-data-table-mui.css'
import FixedTableCell from './FixedTableCell'
import FixedTableHeaderCell from './FixedTableHeaderCell'

/**
 * Fixed data table from facebook library integrated with material ui theme
 * and infinite scroll functionnality
 */
class FixedTable extends React.Component {

  static propTypes={
    entities: React.PropTypes.arrayOf(React.PropTypes.object),
  }

  constructor(props) {
    super(props)
    const height = window.innerHeight - 60
    const width = window.innerWidth - 60
    this.state = {
      height,
      width,
      columnWidths: {
        label: width / 3,
        format: width / 3,
        language: width / 3,
      },
    }
  }


  onColumnResizeEndCallback = (newColumnWidth, columnKey) => {
    console.log(newColumnWidth, columnKey)
    this.setState(({ columnWidths }) => ({
      columnWidths: {
        ...columnWidths,
        [columnKey]: newColumnWidth,
      },
    }))
  }

  render() {
    const { columnWidths, width, height } = this.state
    const { entities } = this.props
    return (
      <Table
        rowHeight={50}
        headerHeight={40}
        rowsCount={entities.length}
        onColumnResizeEndCallback={this.onColumnResizeEndCallback}
        isColumnResizing={false}
        width={width}
        height={height}
        {...this.props}
      >
        <Column
          columnKey="label"
          header={<FixedTableHeaderCell label="label" />}
          cell={<FixedTableCell data={entities} col="label" />}
          fixed
          width={columnWidths.label}
          felxgrow={1}
          isResizable
        />
        <Column
          columnKey="format"
          header={<FixedTableHeaderCell label="format" />}
          cell={<FixedTableCell data={entities} col="format" />}
          fixed
          width={columnWidths.format}
          felxgrow={1}
          isResizable
        />
        <Column
          columnKey="language"
          header={<FixedTableHeaderCell label="language" />}
          cell={<FixedTableCell data={entities} col="language" />}
          fixed
          width={columnWidths.language}
          flexGrow={1}
          isResizable
        />
      </Table>
    )
  }
}

export default FixedTable
