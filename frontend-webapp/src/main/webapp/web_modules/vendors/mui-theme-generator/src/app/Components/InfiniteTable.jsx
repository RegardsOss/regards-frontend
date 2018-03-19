import {
  TableLayout, InfiniteTableContainer, TableColumnBuilder,
  NoContentComponent, TableHeaderLineLoadingAndResults,
} from '@regardsoss/components'
import Dollar from 'material-ui/svg-icons/editor/monetization-on'
import IconButton from 'material-ui/IconButton'
import { themeContextType } from '@regardsoss/theme'

const EditButtonComponent = () => (
  <IconButton
    title="Buy"
  >
    <Dollar />
  </IconButton>
)

const getColumns = (iconSize) => ([
  TableColumnBuilder.buildSimplePropertyColumn('column.name', "Serie name", 'label'),
  TableColumnBuilder.buildSimplePropertyColumn('column.type', "Number of episodes", 'number'),
  TableColumnBuilder.buildOptionsColumn('', [{
    OptionConstructor: EditButtonComponent,
  }], true, iconSize)
])




const sampleEntities = [
  {
    label: 'Stargate SG-1',
    number: 214
  },
  {
    label: 'Hannibal',
    number: 39
  },
  {
    label: 'Games of thrones',
    number: 67
  },
  {
    label: 'Breaking bad',
    number: 62
  },
]

const InfiniteTable = (props, { muiTheme: { components: { infiniteTable: { fixedColumnsWidth } } } }) => (
  <TableLayout>
    <TableHeaderLineLoadingAndResults isFetching={false} resultsCount={sampleEntities.length} />
    <InfiniteTableContainer
      columns={getColumns(fixedColumnsWidth)}
      entities={sampleEntities}
      entitiesCount={sampleEntities.length}
      minRowCount={0}
      maxRowCount={5}
    />
  </TableLayout>
)
InfiniteTable.contextTypes = {
  ...themeContextType,
}
export default InfiniteTable
