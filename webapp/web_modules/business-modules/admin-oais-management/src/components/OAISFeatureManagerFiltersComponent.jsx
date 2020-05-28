/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  TableLayout, TableHeaderLine, TableHeaderOptionsArea, TableHeaderOptionGroup, TableHeaderAutoCompleteFilterContainer, DatePickerField, TableHeaderTextField,
} from '@regardsoss/components'
import { searchSourcesActions, searchSourcesSelectors } from '../clients/SearchSourcesClient'
import { searchSessionsActions, searchSessionsSelectors } from '../clients/SearchSessionsClient'
import OAISCriterionShape from '../shapes/OAISCriterionShape'

/**
 * OAIS Feature manager filters component.
 * @author Simon MILHAU
 */
export class OAISFeatureManagerFiltersComponent extends React.Component {
  static propTypes = {
    featureManagerFilters: OAISCriterionShape,
    changeSessionFilter: PropTypes.func.isRequired,
    changeSourceFilter: PropTypes.func.isRequired,
    changeProviderIdFilter: PropTypes.func.isRequired,
    changeFrom: PropTypes.func.isRequired,
    changeTo: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { intl: { formatMessage, locale }, moduleTheme: { filter } } = this.context
    const {
      featureManagerFilters, changeSourceFilter, changeSessionFilter, changeProviderIdFilter, changeFrom, changeTo,
    } = this.props
    return (
      <React.Fragment key="imLine">
        <TableLayout>
          <TableHeaderLine key="idLine">
            <TableHeaderOptionsArea key="idLini" reducible alignLeft>
              <TableHeaderOptionGroup key="idLina">
                <TableHeaderAutoCompleteFilterContainer
                  onChangeText={changeSourceFilter}
                  text={featureManagerFilters.sessionOwner || ''}
                  hintText={formatMessage({ id: 'oais.packages.list.filters.source' })}
                  style={filter.autocomplete}
                  key="sourceAuto"
                  arrayActions={searchSourcesActions}
                  arraySelectors={searchSourcesSelectors}
                />
                <TableHeaderAutoCompleteFilterContainer
                  onChangeText={changeSessionFilter}
                  text={featureManagerFilters.session || ''}
                  hintText={formatMessage({ id: 'oais.packages.list.filters.session' })}
                  style={filter.autocomplete}
                  key="sessionAuto"
                  arrayActions={searchSessionsActions}
                  arraySelectors={searchSessionsSelectors}
                />
                <TableHeaderTextField
                  title={formatMessage({ id: 'oais.packages.tooltip.providerId' })}
                  value={featureManagerFilters.providerId || ''}
                  hintText={formatMessage({ id: 'oais.packages.list.filters.providerId' })}
                  onChange={changeProviderIdFilter}
                />
              </TableHeaderOptionGroup>
              <TableHeaderOptionGroup key="dateForm">
                <DatePickerField
                  id="filter.from"
                  value={null}
                  dateHintText={formatMessage({
                    id: 'oais.aips.list.filters.from.label',
                  })}
                  onChange={changeFrom}
                  locale={locale}
                  key="datefrom"
                />
                <DatePickerField
                  id="filter.to"
                  value={null}
                  defaultTime="23:59:59"
                  dateHintText={formatMessage({ id: 'oais.aips.list.filters.to.label' })}
                  onChange={changeTo}
                  locale={locale}
                  key="dateto"
                />
              </TableHeaderOptionGroup>
            </TableHeaderOptionsArea>
          </TableHeaderLine>
        </TableLayout>
      </React.Fragment>
    )
  }
}

export default OAISFeatureManagerFiltersComponent
