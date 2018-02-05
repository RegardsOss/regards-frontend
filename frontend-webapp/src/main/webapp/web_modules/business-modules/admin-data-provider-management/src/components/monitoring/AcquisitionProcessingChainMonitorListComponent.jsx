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
  TableColumnBuilder,
  TableLayout,
  NoContentComponent,
  PageableInfiniteTableContainer,
  CardActionsComponent,
} from '@regardsoss/components'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { AcquisitionProcessingChainMonitorActions, AcquisitionProcessingChainMonitorSelectors } from '../../clients/AcquisitionProcessingChainMonitorClient'
import { tableActions } from '../../clients/TableClient'
import AcquisitionProcessingChainMonitoringTableRunAction from './AcquisitionProcessingChainMonitoringTableRunAction'
import AcquisitionProcessingChainMonitoringActivityRenderer from './AcquisitionProcessingChainMonitoringActivityRenderer'
import AcquisitionProcessingChainMonitoringProductsRenderer from './AcquisitionProcessingChainMonitoringProductsRenderer'
import AcquisitionProcessingChainMonitoringFilesRenderer from './AcquisitionProcessingChainMonitoringFilesRenderer'
import messages from '../../i18n'
import styles from '../../styles'

/**
* Component to display list of acquisition processing chains monitoring
* @author Sébastien Binda
*/
class AcquisitionProcessingChainMonitorMonitorComponent extends React.Component {
  static propTypes = {
    fetchPage: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    onRunChain: PropTypes.func.isRequired,
  }

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static PAGE_SIZE = 100

  render() {
    const { intl: { formatMessage }, muiTheme } = this.context
    const {
      onBack, onRunChain,
    } = this.props

    const fixedColumnWidth = muiTheme['components:infinite-table'].fixedColumnsWidth

    const emptyComponent = (
      <NoContentComponent
        title={formatMessage({ id: 'generation-chain.monitor.empty.title' })}
        Icon={AddToPhotos}
      />
    )

    const columns = [
      TableColumnBuilder.buildSimplePropertyColumn('column.name', formatMessage({ id: 'generation-chain.monitor.list.label' }), 'content.chain.label'),
      TableColumnBuilder.buildSimpleColumnWithCell('column.running', formatMessage({ id: 'generation-chain.monitor.list.running' }), {
        Constructor: AcquisitionProcessingChainMonitoringActivityRenderer,
      }),
      TableColumnBuilder.buildSimpleColumnWithCell('column.products', formatMessage({ id: 'generation-chain.monitor.list.total-nb-products' }), {
        Constructor: AcquisitionProcessingChainMonitoringProductsRenderer,
      }),
      TableColumnBuilder.buildSimpleColumnWithCell('column.files', formatMessage({ id: 'generation-chain.monitor.list.total-nb-files' }), {
        Constructor: AcquisitionProcessingChainMonitoringFilesRenderer,
      }),
      TableColumnBuilder.buildOptionsColumn('column.files.actions', [{
        OptionConstructor: AcquisitionProcessingChainMonitoringTableRunAction,
        optionProps: { onRunChain },
      },
      ], true, fixedColumnWidth),
    ]
    return (
      <Card>
        <CardTitle
          title={formatMessage({ id: 'generation-chain.monitor.list.title' })}
          subtitle={formatMessage({ id: 'generation-chain.monitor.list.subtitle' })}
        />
        <CardText>
          <TableLayout>
            <PageableInfiniteTableContainer
              name="generation-chain-monitor-table"
              pageActions={AcquisitionProcessingChainMonitorActions}
              pageSelectors={AcquisitionProcessingChainMonitorSelectors}
              tableActions={tableActions}
              columns={columns}
              emptyComponent={emptyComponent}
              displayColumnsHeader
              displayedRowsCount={10}
              queryPageSize={AcquisitionProcessingChainMonitorMonitorComponent.PAGE_SIZE}
            />
          </TableLayout>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonTouchTap={onBack}
            // TODO : Set hateoas dependencies for data-provider
            // mainHateoasDependencies={addDependencies}
            mainButtonLabel={formatMessage({ id: 'generation-chain.monitoring.back.button' })}
          />
        </CardActions>
      </Card>
    )
  }
}
export default withModuleStyle(styles)(withI18n(messages)(AcquisitionProcessingChainMonitorMonitorComponent))
