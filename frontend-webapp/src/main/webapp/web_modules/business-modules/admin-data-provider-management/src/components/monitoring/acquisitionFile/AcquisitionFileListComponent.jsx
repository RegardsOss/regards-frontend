/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import AddToPhotos from 'material-ui/svg-icons/image/add-to-photos'
import {
  PageableInfiniteTableContainer, TableColumnBuilder, TableLayout, TableHeaderLineLoadingAndResults,
  NoContentComponent, CardActionsComponent, DateValueRender,
} from '@regardsoss/components'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import AcquisitionFileListFiltersComponent from './AcquisitionFileListFiltersComponent'
import AcquisitionFileStateRender from './AcquisitionFileStateRender'
import { TableAcquisitionFileActions } from '../../../clients/TableClient'
import { AcquisitionFileActions, AcquisitionFileSelectors } from '../../../clients/AcquisitionFileClient'
import messages from '../../../i18n'
import styles from '../../../styles'

/**
* Component to display the list of AcquisitionFiles of a given acquisition processing chain
* @author Sébastien Binda
*/
class AcquisitionFileListComponent extends React.Component {
  static propTypes = {
    initialFilters: PropTypes.objectOf(PropTypes.string),
    contextFilters: PropTypes.objectOf(PropTypes.string),
    pageSize: PropTypes.number.isRequired,
    resultsCount: PropTypes.number.isRequired,
    entitiesLoading: PropTypes.bool.isRequired,
    onRefresh: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  }

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static AUTO_REFRESH_PERIOD = 10000

  state = {
    appliedFilters: {},
  }

  componentWillMount() {
    this.setState({
      appliedFilters: this.props.contextFilters,
    })
    this.autoRefresh()
  }

  componentWillUnmount = () => {
    clearTimeout(this.timeout)
  }

  /**
  * Handle refresh action
  */
  handleRefresh = () => this.props.onRefresh(this.state.appliedFilters)

  /**
  * Use javascript setTimeout to run auto refresh of acquisition chains
  */
  autoRefresh = () => {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
    this.handleRefresh().then((ActionResult) => {
      this.timeout = setTimeout(this.autoRefresh, AcquisitionFileListComponent.AUTO_REFRESH_PERIOD)
    })
  }

  /**
   * Callback to apply specific filters for Product search
   */
  applyFilters = (filters) => {
    const { contextFilters } = this.props
    const appliedFilters = { ...filters, ...contextFilters }
    this.setState({ appliedFilters })
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const {
      onBack, pageSize, resultsCount, entitiesLoading, initialFilters,
    } = this.props
    const { appliedFilters } = this.state

    const emptyComponent = (
      <NoContentComponent
        title={formatMessage({ id: 'acquisition.file.empty.title' })}
        Icon={AddToPhotos}
      />
    )

    const columns = [
      TableColumnBuilder.buildSimplePropertyColumn('column.filePath',
        formatMessage({ id: 'acquisition.file.list.filePath' }), 'content.filePath', 1),
      TableColumnBuilder.buildSimplePropertyColumn('column.acqDate',
        formatMessage({ id: 'acquisition.file.list.acqDate' }), 'content.acqDate', 2, true, DateValueRender),
      TableColumnBuilder.buildSimplePropertyColumn('column.state',
        formatMessage({ id: 'acquisition.file.list.state' }), 'content.state', 3, true, AcquisitionFileStateRender),
    ]
    const title = appliedFilters.productId ?
      formatMessage({ id: 'acquisition.file.list.product.title' }, { product: appliedFilters.productId }) :
      formatMessage({ id: 'acquisition.file.list.title' })
    return (
      <Card>
        <CardTitle
          title={title}
          subtitle={formatMessage({ id: 'acquisition.file.list.subtitle' })}
        />
        <CardText>
          <TableLayout>
            <AcquisitionFileListFiltersComponent
              initialFilters={initialFilters}
              applyFilters={this.applyFilters}
              handleRefresh={this.handleRefresh}
            />
            <TableHeaderLineLoadingAndResults isFetching={entitiesLoading} resultsCount={resultsCount} />
            <PageableInfiniteTableContainer
              name="file-table"
              pageActions={AcquisitionFileActions}
              pageSelectors={AcquisitionFileSelectors}
              tableActions={TableAcquisitionFileActions}
              requestParams={appliedFilters}
              columns={columns}
              emptyComponent={emptyComponent}
              displayColumnsHeader
              minRowCount={0}
              maxRowCount={10}
              queryPageSize={pageSize}
            />
          </TableLayout>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonClick={onBack}
            mainButtonLabel={formatMessage({ id: 'acquisition.file.list.back.button' })}
          />
        </CardActions>
      </Card>
    )
  }
}
export default withModuleStyle(styles)(withI18n(messages)(AcquisitionFileListComponent))