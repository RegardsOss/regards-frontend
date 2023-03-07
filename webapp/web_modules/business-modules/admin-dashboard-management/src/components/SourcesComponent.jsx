/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEmpty from 'lodash/isEmpty'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { AdminShapes } from '@regardsoss/shape'
import { AdminDomain } from '@regardsoss/domain'
import {
  NoContentComponent,
  TableColumnBuilder,
  TableLayout,
  PageableInfiniteTableContainer,
  TableHeaderOptionsArea,
  TableHeaderLine,
  TableHeaderOptionGroup,
} from '@regardsoss/components'
import AddToPhotos from 'mdi-material-ui/PlusBoxMultiple'
import Card from 'material-ui/Card'
import CardTitle from 'material-ui/Card/CardTitle'
import CardText from 'material-ui/Card/CardText'
import { sourcesActions, sourcesSelectors } from '../clients/SourcesClient'
import ReferencedProductsRender from './render/ReferencedProductsRender'
import DiffusedProductsRender from './render/DiffusedProductsRender'
import NameRender from './render/NameRender'
/**
 * SourcesComponent
 * @author Théo Lasserre
 */
class SourcesComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    onSelected: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    sources: AdminShapes.SourceList,
    // eslint-disable-next-line react/forbid-prop-types, react/no-unused-prop-types
    filters: PropTypes.object.isRequired,
    selectedSessionId: PropTypes.string,
    selectedSourceId: PropTypes.string,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static COLUMN_KEYS = {
    SOURCE_NAME: 'sourceName',
    REFERENCED_PRODUCTS: 'referencedProducts',
    DIFFUSED_PRODUCTS: 'diffusedProducts',
  }

  static EMPTY_COMPONENT = (
    <NoContentComponent
      titleKey="dashboard.sources.table.empty"
      Icon={AddToPhotos}
    />)

  static PAGE_SIZE = STATIC_CONF.TABLE.PAGE_SIZE || 20

  render() {
    const {
      project, onSelected, filters, selectedSessionId, selectedSourceId,
    } = this.props
    const {
      intl: { formatMessage }, muiTheme, moduleTheme: {
        dashboardStyle: {
          componentDiv: {
            cardStyle, cardTextStyle, cardTitleStyle,
          },
        },
      },
    } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    const columns = [ // eslint wont fix: Major API rework required
      // 1 - source name
      new TableColumnBuilder(SourcesComponent.COLUMN_KEYS.SOURCE_NAME)
        .label(formatMessage({ id: 'dashboard.sources.table.column.sourceName' }))
        .rowCellDefinition({
          Constructor: NameRender,
          props: {
            onSelected,
            selectedEntityId: selectedSourceId,
            entityType: AdminDomain.SOURCE_FILTER_PARAMS.SELECTED_SOURCE,
          },
        }).titleHeaderCell()
        .build(),
      // 2 - referenced product
      new TableColumnBuilder(SourcesComponent.COLUMN_KEYS.REFERENCED_PRODUCTS)
        .label(formatMessage({ id: 'dashboard.sources.table.column.referencedProducts' }))
        .rowCellDefinition({
          Constructor: ReferencedProductsRender,
          props: { entityType: AdminDomain.SOURCE_FILTER_PARAMS.SELECTED_SOURCE },
        }).titleHeaderCell()
        .optionsSizing(2.75)
        .build(),
      // 2 - catalogued product
      new TableColumnBuilder(SourcesComponent.COLUMN_KEYS.DIFFUSED_PRODUCTS)
        .label(formatMessage({ id: 'dashboard.sources.table.column.diffusedProducts' }))
        .rowCellDefinition({
          Constructor: DiffusedProductsRender,
          props: { entityType: AdminDomain.SOURCE_FILTER_PARAMS.SELECTED_SOURCE },
        }).titleHeaderCell()
        .optionsSizing(2.75)
        .build(),
    ]

    return (
      <Card style={cardStyle}>
        <CardText style={cardTextStyle}>
          <TableLayout>
            <TableHeaderLine key="filters">
              <TableHeaderOptionsArea reducible alignLeft>
                <TableHeaderOptionGroup>
                  <CardTitle
                    title={formatMessage({ id: 'dashboard.sources.title' })}
                    style={cardTitleStyle}
                  />
                </TableHeaderOptionGroup>
              </TableHeaderOptionsArea>
            </TableHeaderLine>
            <PageableInfiniteTableContainer
              key="source"
              name="sources-table"
              minRowCount={minRowCount}
              maxRowCount={!isEmpty(selectedSessionId) ? minRowCount : maxRowCount}
              pageActions={sourcesActions}
              pageSelectors={sourcesSelectors}
              requestParams={{ ...filters, tenant: project }}
              pageSize={SourcesComponent.PAGE_SIZE}
              columns={columns}
              emptyComponent={SourcesComponent.EMPTY_COMPONENT}
            />
          </TableLayout>
        </CardText>
      </Card>
    )
  }
}
export default SourcesComponent
