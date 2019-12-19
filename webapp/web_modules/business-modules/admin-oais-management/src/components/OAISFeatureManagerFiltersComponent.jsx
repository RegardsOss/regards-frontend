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
    updateStateFromFeatureManagerFilters: PropTypes.func.isRequired,
    featureManagerFilters: OAISCriterionShape,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  changeSessionFilter = (newValue) => {
    const finalNewValue = newValue && newValue !== '' ? newValue : undefined
    this.props.updateStateFromFeatureManagerFilters({
      session: finalNewValue,
    })
  }

  changeSourceFilter = (newValue) => {
    const finalNewValue = newValue && newValue !== '' ? newValue : undefined
    this.props.updateStateFromFeatureManagerFilters({
      sessionOwner: finalNewValue,
    })
  }

  changeProviderIdFilter = (event, text) => {
    const finalNewValue = text
    this.props.updateStateFromFeatureManagerFilters({
      providerId: finalNewValue,
    })
  }

  changeFrom = (newValue) => {
    const finalNewValue = newValue && newValue !== '' ? newValue : undefined
    this.props.updateStateFromFeatureManagerFilters({
      lastUpdate: {
        from: finalNewValue,
      },
    })
  }

  changeTo = (newValue) => {
    const finalNewValue = newValue && newValue !== '' ? newValue : undefined
    this.props.updateStateFromFeatureManagerFilters({
      lastUpdate: {
        to: finalNewValue,
      },
    })
  }

  render() {
    const { intl: { formatMessage, locale }, moduleTheme: { filter } } = this.context

    return (
      <React.Fragment key="imLine">
        <TableLayout>
          <TableHeaderLine key="idLine">
            <TableHeaderOptionsArea key="idLini" reducible alignLeft>
              <TableHeaderOptionGroup key="idLina">
                <TableHeaderAutoCompleteFilterContainer
                  onChangeText={this.changeSourceFilter}
                  text={this.props.featureManagerFilters.sessionOwner || ''}
                  hintText={formatMessage({ id: 'oais.packages.list.filters.source' })}
                  style={filter.autocomplete}
                  key="sourceAuto"
                  arrayActions={searchSourcesActions}
                  arraySelectors={searchSourcesSelectors}
                />
                <TableHeaderAutoCompleteFilterContainer
                  onChangeText={this.changeSessionFilter}
                  text={this.props.featureManagerFilters.session || ''}
                  hintText={formatMessage({ id: 'oais.packages.list.filters.session' })}
                  style={filter.autocomplete}
                  key="sessionAuto"
                  arrayActions={searchSessionsActions}
                  arraySelectors={searchSessionsSelectors}
                />
                <TableHeaderTextField
                  title={formatMessage({ id: 'oais.packages.tooltip.providerId' })}
                  value={this.props.featureManagerFilters.providerId || ''}
                  hintText={formatMessage({ id: 'oais.packages.list.filters.providerId' })}
                  onChange={this.changeProviderIdFilter}
                />
              </TableHeaderOptionGroup>
              <TableHeaderOptionGroup key="dateForm">
                <DatePickerField
                  value={this.props.featureManagerFilters.from}
                  dateHintText={formatMessage({
                    id: 'oais.aips.list.filters.from.label',
                  })}
                  onChange={this.changeFrom}
                  locale={locale}
                  key="datefrom"
                />
                <DatePickerField
                  value={this.props.featureManagerFilters.to}
                  defaultTime="23:59:59"
                  dateHintText={formatMessage({ id: 'oais.aips.list.filters.to.label' })}
                  onChange={this.changeTo}
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
