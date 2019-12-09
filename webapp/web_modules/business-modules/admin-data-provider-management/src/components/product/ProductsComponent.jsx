import get from 'lodash/get'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import {
  TableLayout, TableColumnBuilder, PageableInfiniteTableContainer, HelpMessageComponent,
} from '@regardsoss/components'
import { AccessShapes } from '@regardsoss/shape'
import { productActions, productSelectors } from '../../clients/session/SearchProductsClient'
import messages from '../../i18n'

export class ProductsComponent extends React.Component {
  static propTypes = {
    session: AccessShapes.Session,
    sipStates: PropTypes.arrayOf(PropTypes.string),
    productStates: PropTypes.arrayOf(PropTypes.string),
    helpMessage: PropTypes.string,
  }

  static defaultProps = {
    sipStates: [],
    productStates: [],
    helpMessage: '',
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static ERROR_SIP_STATES = ['GENERATION_ERROR', 'INGESTION_FAILED']

  static INCOMPLETE_STATES = ['ACQUIRING']

  static pageSize = 100

  static minRowCount = 5

  static maxRowCount = 8

  render = () => {
    if (!this.props.session) {
      return null
    }
    const { intl: { formatMessage } } = this.context
    const columns = [
      new TableColumnBuilder('column.name').titleHeaderCell().label(formatMessage({ id: 'acquisition-sessions.menus.products.list.name' })).propertyRenderCell('content.productName')
        .fixedSizing(300)
        .build(),
      new TableColumnBuilder('column.error').titleHeaderCell().label(formatMessage({ id: 'acquisition-sessions.menus.products.list.error' })).propertyRenderCell('content.error')
        .build(),
    ]
    const requestParameters = { sipState: this.props.sipStates, state: this.props.productStates, session: get(this.props.session, 'content.name') }
    return (
      <div>
        <HelpMessageComponent message={this.props.helpMessage} />
        <TableLayout>
          <PageableInfiniteTableContainer
            name="products-list"
            pageActions={productActions}
            pageSelectors={productSelectors}
            queryPageSize={ProductsComponent.pageSize}
            minRowCount={ProductsComponent.minRowCount}
            maxRowCount={ProductsComponent.maxRowCount}
            columns={columns}
            requestParams={requestParameters}
          />
        </TableLayout>
      </div>
    )
  }
}
const toExport = withI18n(messages)(ProductsComponent)
toExport.ERROR_SIP_STATES = ProductsComponent.ERROR_SIP_STATES
toExport.INCOMPLETE_STATES = ProductsComponent.INCOMPLETE_STATES
export default toExport
