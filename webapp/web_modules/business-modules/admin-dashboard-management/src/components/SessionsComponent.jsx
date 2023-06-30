/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { sessionsActions, sessionsSelectors } from '../clients/SessionsClient'
import ReferencedProductsRender from './render/ReferencedProductsRender'
import DiffusedProductsRender from './render/DiffusedProductsRender'
import NameRender from './render/NameRender'

/**
  * SessionsComponent
  * @author Théo Lasserre
  */
class SessionsComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    onSelected: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    sessions: AdminShapes.SessionList,
    // eslint-disable-next-line react/forbid-prop-types, react/no-unused-prop-types
    filters: PropTypes.object.isRequired,
    selectedSourceId: PropTypes.string,
    selectedSessionId: PropTypes.string,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static COLUMN_KEYS = {
    SESSION_NAME: 'sessionName',
    REFERENCED_PRODUCTS: 'referencedProducts',
    DIFFUSED_PRODUCTS: 'diffusedProducts',
  }

  static EMPTY_COMPONENT = (
    <NoContentComponent
      titleKey="dashboard.sessions.table.empty"
      Icon={AddToPhotos}
    />)

  static PAGE_SIZE = STATIC_CONF.TABLE.PAGE_SIZE || 20

  render() {
    const {
      project, onSelected, filters, selectedSourceId, selectedSessionId,
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
      new TableColumnBuilder(SessionsComponent.COLUMN_KEYS.SESSION_NAME)
        .label(formatMessage({ id: 'dashboard.sessions.table.column.sessionName' }))
        .rowCellDefinition({
          Constructor: NameRender,
          props: {
            onSelected,
            selectedEntityId: selectedSessionId,
            entityType: AdminDomain.SESSION_FILTER_PARAMS.SELECTED_SESSION,
          },
        }).titleHeaderCell()
        .build(),
      // 2 - referenced product
      new TableColumnBuilder(SessionsComponent.COLUMN_KEYS.REFERENCED_PRODUCTS)
        .label(formatMessage({ id: 'dashboard.sessions.table.column.referencedProducts' }))
        .rowCellDefinition({
          Constructor: ReferencedProductsRender,
          props: { entityType: AdminDomain.SESSION_FILTER_PARAMS.SELECTED_SESSION },
        }).titleHeaderCell()
        .optionsSizing(2.80)
        .build(),
      // 2 - catalogued product
      new TableColumnBuilder(SessionsComponent.COLUMN_KEYS.DIFFUSED_PRODUCTS)
        .label(formatMessage({ id: 'dashboard.sessions.table.column.diffusedProducts' }))
        .rowCellDefinition({
          Constructor: DiffusedProductsRender,
          props: { entityType: AdminDomain.SESSION_FILTER_PARAMS.SELECTED_SESSION },
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
                    title={formatMessage({ id: 'dashboard.sessions.title' })}
                    style={cardTitleStyle}
                  />
                </TableHeaderOptionGroup>
              </TableHeaderOptionsArea>
            </TableHeaderLine>
            <PageableInfiniteTableContainer
              name="sessions-table"
              minRowCount={minRowCount}
              maxRowCount={!isEmpty(selectedSessionId) ? minRowCount : maxRowCount}
              pageActions={sessionsActions}
              pageSelectors={sessionsSelectors}
              requestParams={{ ...filters, [AdminDomain.SOURCE_FILTER_PARAMS.NAME]: selectedSourceId || null, tenant: project }}
              pageSize={SessionsComponent.PAGE_SIZE}
              columns={columns}
              emptyComponent={SessionsComponent.EMPTY_COMPONENT}
            />
          </TableLayout>
        </CardText>
      </Card>
    )
  }
}
export default SessionsComponent
