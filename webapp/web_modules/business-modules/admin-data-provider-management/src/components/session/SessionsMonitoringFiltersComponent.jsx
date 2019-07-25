/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import Filter from 'mdi-material-ui/Filter'
import Close from 'mdi-material-ui/Close'
import FlatButton from 'material-ui/FlatButton'
import Menu from 'mdi-material-ui/ViewSequential'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import {
  TableHeaderLine, TableHeaderOptionsArea, TableHeaderOptionGroup, DatePickerField,
} from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

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
      from: PropTypes.date,
      to: PropTypes.date,
    }).isRequired,
    onApplyFilters: PropTypes.func.isRequired,
    onClearFilters: PropTypes.func.isRequired,
    filtersEdited: PropTypes.bool.isRequired,
    onToggleErrorsOnly: PropTypes.func.isRequired,
    onToggleLastSession: PropTypes.func.isRequired,
    onChangeFrom: PropTypes.func.isRequired,
    onChangeTo: PropTypes.func.isRequired,
  }

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const {
      filtersEdited, onToggleErrorsOnly, onApplyFilters, onClearFilters, onToggleLastSession, onChangeFrom, onChangeTo,
      initialFilters: {
        source, session, lastSessionOnly, errorsOnly, from, to,
      },
    } = this.props
    const { intl, moduleTheme: { sessionsStyles: { smallIconButton } } } = this.context
    return (
      <TableHeaderLine>
        <TableHeaderOptionsArea reducible alignLeft>
          <TableHeaderOptionGroup>
            <TextField
              // style={filter.fieldStyle}
              hintText={intl.formatMessage({
                id: 'acquisition-sessions.filters.source',
              })}
              onChange={this.changeId}
              defaultValue={source}
              // value={get(this.state, 'filters.id', '')}
            />
          </TableHeaderOptionGroup>
          <TableHeaderOptionGroup>
            <Checkbox
              label={intl.formatMessage({ id: 'acquisition-sessions.filters.last-session' })}
              onCheck={onToggleLastSession}
              checked={lastSessionOnly}
            />
            <Checkbox
              label={intl.formatMessage({ id: 'acquisition-sessions.filters.errors-only' })}
              onCheck={onToggleErrorsOnly}
              checked={errorsOnly}
            />
          </TableHeaderOptionGroup>
          <TableHeaderOptionGroup>
            <DatePickerField
              dateHintText={intl.formatMessage({ id: 'acquisition-sessions.filters.from.label' })}
              onChange={onChangeFrom}
              locale={intl.locale}
              value={from}
            />
            <DatePickerField
              value={to}
              defaultTime="23:59:59"
              dateHintText={intl.formatMessage({ id: 'acquisition-sessions.filters.to.label' })}
              onChange={onChangeTo}
              locale={intl.locale}
            />
          </TableHeaderOptionGroup>
        </TableHeaderOptionsArea>
        <TableHeaderOptionsArea reducible>
          <TableHeaderOptionGroup>
            <FlatButton
              label={intl.formatMessage({ id: 'acquisition-sessions.filters.reset' })}
              icon={<Close />}
              //disabled={!this.state.filters.id && !this.state.filters.to && !this.state.filters.from}
              onClick={onClearFilters}
            />
            <FlatButton
              label={intl.formatMessage({ id: 'acquisition-sessions.filters.apply' })}
              icon={<Filter />}
              disabled={!filtersEdited}
              onClick={onApplyFilters}
            />
            <FlatButton
              icon={<Menu />}
              fullWidth={false}
              onClick={this.handleColumnFilter}
              style={smallIconButton}
              title={intl.formatMessage({ id: 'acquisition-sessions.filters.column-selector' })}
            />
          </TableHeaderOptionGroup>
        </TableHeaderOptionsArea>
      </TableHeaderLine>
    )
  }
}
