/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  TableHeaderLine, TableHeaderOptionsArea, TableHeaderOptionGroup,
} from '@regardsoss/components'
import { SessionsMonitoringFilterErrorsOnlyComponent } from './filters/SessionsMonitoringFilterErrorsOnlyComponent'
import { SessionsMonitoringFilterLastSessionComponent } from './filters/SessionsMonitoringFilterLastSessionComponent'
import { SessionsMonitoringFilterSourceComponent } from './filters/SessionsMonitoringFilterSourceComponent'
import { SessionsMonitoringFilterSessionComponent } from './filters/SessionsMonitoringFilterSessionComponent'
import { SessionsMonitoringFilterFromComponent } from './filters/SessionsMonitoringFilterFromComponent'
import { SessionsMonitoringFilterToComponent } from './filters/SessionsMonitoringFilterToComponent'
import { SessionsMonitoringFilterClearComponent } from './filters/SessionsMonitoringFilterClearComponent'
import { SessionsMonitoringFilterApplyComponent } from './filters/SessionsMonitoringFilterApplyComponent'
import { SessionsMonitoringFilterColumnsSelectorComponent } from './filters/SessionsMonitoringFilterColumnsSelectorComponent'

/**
 * Filter component for session board
 * @author Kévin Picart
 */
export class SessionsMonitoringFiltersComponent extends React.Component {
  static propTypes = {
    initialFilters: PropTypes.shape({
      source: PropTypes.string.isRequired,
      session: PropTypes.string.isRequired,
      lastSessionOnly: PropTypes.bool.isRequired,
      errorsOnly: PropTypes.bool.isRequired,
      from: PropTypes.instanceOf(Date),
      to: PropTypes.instanceOf(Date),
    }).isRequired,
    onApplyFilters: PropTypes.func.isRequired,
    onClearFilters: PropTypes.func.isRequired,
    filtersEdited: PropTypes.bool.isRequired,
    onToggleErrorsOnly: PropTypes.func.isRequired,
    onToggleLastSession: PropTypes.func.isRequired,
    onChangeFrom: PropTypes.func.isRequired,
    onChangeTo: PropTypes.func.isRequired,
    onChangeSource: PropTypes.func.isRequired,
    onChangeSession: PropTypes.func.isRequired,
    onColumnsSelector: PropTypes.func.isRequired,
  }

  render() {
    const {
      filtersEdited, onToggleErrorsOnly, onApplyFilters, onClearFilters, onToggleLastSession, onChangeFrom, onChangeTo, onChangeSource, onChangeSession, onColumnsSelector,
      initialFilters: {
        source, session, lastSessionOnly, errorsOnly, from, to,
      },
    } = this.props

    return (
      <TableHeaderLine>
        <TableHeaderOptionsArea reducible alignLeft>
          <TableHeaderOptionGroup>
            <SessionsMonitoringFilterSourceComponent
              onChangeSource={onChangeSource}
              source={source}
            />
            <SessionsMonitoringFilterSessionComponent
              onChangeSession={onChangeSession}
              session={session}
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
          <TableHeaderOptionGroup>
            <SessionsMonitoringFilterFromComponent
              onChangeFrom={onChangeFrom}
              from={from}
            />
            <SessionsMonitoringFilterToComponent
              onChangeTo={onChangeTo}
              to={to}
            />
          </TableHeaderOptionGroup>
        </TableHeaderOptionsArea>
        <TableHeaderOptionsArea reducible>
          <TableHeaderOptionGroup>
            <SessionsMonitoringFilterClearComponent
              onClearFilters={onClearFilters}
            />
            <SessionsMonitoringFilterApplyComponent
              onApplyFilters={onApplyFilters}
              filtersEdited={filtersEdited}
            />
            <SessionsMonitoringFilterColumnsSelectorComponent
              onColumnsSelector={onColumnsSelector}
            />
          </TableHeaderOptionGroup>
        </TableHeaderOptionsArea>
      </TableHeaderLine>
    )
  }
}
