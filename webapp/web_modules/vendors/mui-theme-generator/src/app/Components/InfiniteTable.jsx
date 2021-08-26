import {
  TableLayout, InfiniteTableContainer, TableColumnBuilder,
  TableHeaderLineLoadingSelectAllAndResults,
} from '@regardsoss/components'
import Dollar from 'mdi-material-ui/CurrencyUsd'
import IconButton from 'material-ui/IconButton'
import { themeContextType } from '@regardsoss/theme'

const EditButtonComponent = () => (
  <IconButton
    title="Buy"
  >
    <Dollar />
  </IconButton>
)

const getColumns = () => ([
  new TableColumnBuilder('column.name').titleHeaderCell().propertyRenderCell('label')
    .label('Serie name')
    .build(),
  new TableColumnBuilder('column.type').titleHeaderCell().propertyRenderCell('number')
    .label('Number of episodes')
    .build(),
  new TableColumnBuilder().optionsColumn([{
    OptionConstructor: EditButtonComponent,
  }]).build(),
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

const InfiniteTable = (props,
  { muiTheme: { components: { infiniteTable: { admin: { minRowCount, maxRowCount } } } } }) => (
    <TableLayout>
      <TableHeaderLineLoadingSelectAllAndResults isFetching={false} resultsCount={sampleEntities.length} />
      <InfiniteTableContainer
        columns={getColumns()}
        entities={sampleEntities}
        entitiesCount={sampleEntities.length}
        minRowCount={minRowCount}
        maxRowCount={maxRowCount}
      />
    </TableLayout>
)
InfiniteTable.contextTypes = {
  ...themeContextType,
}
export default InfiniteTable
