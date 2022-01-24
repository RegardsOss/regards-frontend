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
import {
  TableHeaderLine, TableHeaderOptionsArea, TableHeaderOptionGroup, TableHeaderAutoCompleteFilterContainer,
} from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { SessionsMonitoringFilterErrorsOnlyComponent } from './filters/SessionsMonitoringFilterErrorsOnlyComponent'
import { SessionsMonitoringFilterLastSessionComponent } from './filters/SessionsMonitoringFilterLastSessionComponent'
import { SessionsMonitoringFilterFromComponent } from './filters/SessionsMonitoringFilterFromComponent'
import { SessionsMonitoringFilterToComponent } from './filters/SessionsMonitoringFilterToComponent'
import { SessionsMonitoringFilterClearComponent } from './filters/SessionsMonitoringFilterClearComponent'
import { SessionsMonitoringFilterApplyComponent } from './filters/SessionsMonitoringFilterApplyComponent'
import { SessionsMonitoringChooseColumnsComponent } from './filters/SessionsMonitoringChooseColumnsComponent'
import { searchSourcesActions, searchSourcesSelectors } from '../../clients/session/SearchSourcesClient'
import { searchSessionsActions, searchSessionsSelectors } from '../../clients/session/SearchSessionsClient'

/**
 * Filter component for session board
 * @author Kévin Picart
 */
export class SessionsMonitoringFiltersComponent extends React.Component {
  static propTypes = {
    initialFilters: PropTypes.shape({
      source: PropTypes.string,
      session: PropTypes.string,
      lastSessionOnly: PropTypes.bool.isRequired,
      errorsOnly: PropTypes.bool.isRequired,
      from: PropTypes.instanceOf(Date),
      to: PropTypes.instanceOf(Date),
    }).isRequired,
    onApplyFilters: PropTypes.func.isRequired,
    onClearFilters: PropTypes.func.isRequired,
    filtersEdited: PropTypes.bool.isRequired,
    canEmptyFilters: PropTypes.bool.isRequired,
    onToggleErrorsOnly: PropTypes.func.isRequired,
    onToggleLastSession: PropTypes.func.isRequired,
    onChangeFrom: PropTypes.func.isRequired,
    onChangeTo: PropTypes.func.isRequired,
    onChangeSource: PropTypes.func.isRequired,
    onChangeSession: PropTypes.func.isRequired,
    onChangeColumnsVisibility: PropTypes.func.isRequired,
    columns: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      visible: PropTypes.bool.isRequired,
    })).isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const {
      filtersEdited, onToggleErrorsOnly, onApplyFilters, onClearFilters, onToggleLastSession,
      onChangeFrom, onChangeTo, onChangeSource, onChangeSession, onChangeColumnsVisibility, columns, canEmptyFilters,
      initialFilters: {
        source, session, lastSessionOnly, errorsOnly, from, to,
      },
    } = this.props
    const { intl: { formatMessage } } = this.context
    const { moduleTheme: { sessionsStyles: { filters: { autocomplete } } } } = this.context

    return (
      <TableHeaderLine>
        <TableHeaderOptionsArea reducible alignLeft>
          <TableHeaderOptionGroup>
            <TableHeaderAutoCompleteFilterContainer
              onChangeText={onChangeSource}
              text={source}
              arrayActions={searchSourcesActions}
              arraySelectors={searchSourcesSelectors}
              hintText={formatMessage({ id: 'acquisition-sessions.filters.sources-hint' })}
              style={autocomplete}
            />
            <TableHeaderAutoCompleteFilterContainer
              onChangeText={onChangeSession}
              text={session}
              arrayActions={searchSessionsActions}
              arraySelectors={searchSessionsSelectors}
              hintText={formatMessage({ id: 'acquisition-sessions.filters.sessions-hint' })}
              style={autocomplete}
            />
            <SessionsMonitoringFilterFromComponent
              onChangeFrom={onChangeFrom}
              from={from}
            />
            <SessionsMonitoringFilterToComponent
              onChangeTo={onChangeTo}
              to={to}
            />
          </TableHeaderOptionGroup>
          <TableHeaderOptionGroup>
            <SessionsMonitoringFilterLastSessionComponent
              onToggleLastSession={onToggleLastSession}
              lastSession={lastSessionOnly}
            />
            <SessionsMonitoringFilterErrorsOnlyComponent
              onToggleErrorsOnly={onToggleErrorsOnly}
              errorsOnly={errorsOnly}
            />
          </TableHeaderOptionGroup>
        </TableHeaderOptionsArea>
        <TableHeaderOptionsArea reducible>
          <TableHeaderOptionGroup>
            <SessionsMonitoringFilterClearComponent
              onClearFilters={onClearFilters}
              canEmptyFilters={canEmptyFilters}
            />
            <SessionsMonitoringFilterApplyComponent
              onApplyFilters={onApplyFilters}
              filtersEdited={filtersEdited}
            />
            <SessionsMonitoringChooseColumnsComponent
              onChangeColumnsVisibility={onChangeColumnsVisibility}
              columns={columns}
            />
          </TableHeaderOptionGroup>
        </TableHeaderOptionsArea>
      </TableHeaderLine>)
  }
}
