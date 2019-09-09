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
import map from 'lodash/map'
import Refresh from 'material-ui/svg-icons/navigation/refresh'
import Filter from 'mdi-material-ui/Filter'
import Close from 'mdi-material-ui/Close'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import {
  TableHeaderLine, TableHeaderOptionsArea, TableHeaderOptionGroup, DatePickerField, TableHeaderAutoCompleteFilterContainer,
} from '@regardsoss/components'
import { IngestShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { IngestDomain } from '@regardsoss/domain'
import RelaunchSelectedSIPsContainer from '../../containers/sip/options/RelaunchSelectedSIPsContainer'
import DeleteSelectedSIPsContainer from '../../containers/sip/options/DeleteSelectedSIPsContainer'
import { searchSourcesActions, searchSourcesSelectors } from '../../clients/session/SearchSourcesClient'
import { searchSessionsActions, searchSessionsSelectors } from '../../clients/session/SearchSessionsClient'

/**
* Component to display filters on SIPListComponent
* @author Sébastien Binda
*/
class SIPListFiltersComponent extends React.Component {
  static propTypes = {
    editedFilters: PropTypes.objectOf(PropTypes.any),
    handleRefresh: PropTypes.func.isRequired,
    chains: IngestShapes.IngestProcessingChainList.isRequired,
    isEmptySelection: PropTypes.bool.isRequired,
    onRelaunchSelectedDialog: PropTypes.func.isRequired,
    onDeleteSelectedDialog: PropTypes.func.isRequired,
    onApplyFilters: PropTypes.func.isRequired,
    onFilterUpdated: PropTypes.func.isRequired,
    onClearFilters: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  changeChainFilter = (event, key, newValue) => this.props.onFilterUpdated({ processing: newValue })

  changeDateFilter = newValue => this.props.onFilterUpdated({ from: newValue })

  changeStateFilter = (event, key, newValues) => this.props.onFilterUpdated({ state: newValues })

  changeSessionFilter = newValues => this.props.onFilterUpdated({ session: newValues })

  changeSourceFilter = newValues => this.props.onFilterUpdated({ source: newValues })

  changeProviderIdFilter = (event, newValues) => this.props.onFilterUpdated({ providerId: newValues })

  renderFilters = () => {
    const { intl, moduleTheme: { filter } } = this.context
    const { chains, editedFilters } = this.props
    return (
      <TableHeaderLine key="filtersLine">
        <TableHeaderOptionsArea key="filtersArea" reducible alignLeft>
          <TableHeaderOptionGroup key="first">
            <TableHeaderAutoCompleteFilterContainer
              onChangeText={this.changeSourceFilter}
              text={editedFilters.source || ''}
              arrayActions={searchSourcesActions}
              arraySelectors={searchSourcesSelectors}
              hintText={intl.formatMessage({ id: 'oais.filters.source.title' })}
              style={filter.autocomplete}
            />
            <TableHeaderAutoCompleteFilterContainer
              onChangeText={this.changeSessionFilter}
              text={editedFilters.session || ''}
              arrayActions={searchSessionsActions}
              arraySelectors={searchSessionsSelectors}
              hintText={intl.formatMessage({ id: 'oais.filters.session.title' })}
              style={filter.autocomplete}
            />
          </TableHeaderOptionGroup>
          <TableHeaderOptionGroup key="second">
            <SelectField
              autoWidth
              style={filter.fieldStyle}
              hintText={intl.formatMessage({
                id: 'oais.sips.listfilters.chain.label',
              })}
              value={editedFilters.processing || ''}
              onChange={this.changeChainFilter}
            >
              <MenuItem value={null} primaryText="" />
              {map(chains, chain => <MenuItem key={chain.content.name} value={chain.content.name} primaryText={chain.content.name} />)}
            </SelectField>
            <TextField
              value={editedFilters.providerId || ''}
              onChange={this.changeProviderIdFilter}
              hintText={intl.formatMessage({ id: 'oais.sips.listfilters.providerId.label' })}
              style={filter.fieldStyle}
            />
          </TableHeaderOptionGroup>
          <TableHeaderOptionGroup key="third">
            <SelectField
              autoWidth
              multiple
              style={filter.fieldStyle}
              hintText={intl.formatMessage({
                id: 'oais.sips.listfilters.status.label',
              })}
              value={editedFilters.state || ''}
              onChange={this.changeStateFilter}
            >
              <MenuItem value={null} primaryText="" />
              {map(IngestDomain.SIPStateEnum, status => (<MenuItem
                key={status}
                value={status}
                primaryText={intl.formatMessage({
                  id: `sip.state.${status}`,
                })}
              />))}
            </SelectField>
            <DatePickerField
              value={editedFilters.from || undefined}
              dateHintText={intl.formatMessage({
                id: 'oais.sips.listfilters.date.label',
              })}
              onChange={this.changeDateFilter}
              locale={intl.locale}
            />
          </TableHeaderOptionGroup>
        </TableHeaderOptionsArea>
      </TableHeaderLine>
    )
  }

  renderRefreshLine = () => (
    <TableHeaderLine key="buttonsLine">
      <TableHeaderOptionsArea key="headerLine">
        <TableHeaderOptionGroup>
          <FlatButton
            key="clear"
            label={this.context.intl.formatMessage({ id: 'oais.sips.session.clear.filters.button' })}
            icon={<Close />}
            disabled={
              !this.props.editedFilters.from
              && !this.props.editedFilters.state
              && !this.props.editedFilters.processing
              && !this.props.editedFilters.providerId
              && !this.props.editedFilters.source
              && !this.props.editedFilters.session
            }
            onClick={this.props.onClearFilters}
          />
          <FlatButton
            key="apply"
            label={this.context.intl.formatMessage({ id: 'oais.sips.session.apply.filters.button' })}
            icon={<Filter />}
            onClick={this.props.onApplyFilters}
          />
          <RelaunchSelectedSIPsContainer
            disabled={this.props.isEmptySelection}
            onRelaunch={this.props.onRelaunchSelectedDialog}
          />
          <DeleteSelectedSIPsContainer
            disabled={this.props.isEmptySelection}
            onDelete={this.props.onDeleteSelectedDialog}
          />
        </TableHeaderOptionGroup>
      </TableHeaderOptionsArea>
      <TableHeaderOptionsArea key="buttonArea">
        <TableHeaderOptionGroup>
          <FlatButton
            label={this.context.intl.formatMessage({ id: 'oais.sips.session.refresh.button' })}
            icon={<Refresh />}
            onClick={this.props.handleRefresh}
          />
        </TableHeaderOptionGroup>
      </TableHeaderOptionsArea>
    </TableHeaderLine>
  )

  render() {
    return [
      this.renderFilters(),
      this.renderRefreshLine(),
    ]
  }
}
export default SIPListFiltersComponent
