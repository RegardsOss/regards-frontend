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
  Card, CardText,
} from 'material-ui/Card'
import { CommonDomain } from '@regardsoss/domain'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import {
  TableFilterSortingAndVisibilityAndChipsComponent,
  CardHeaderActions,
} from '@regardsoss/components'
import LTAManagerTableComponent from './LTAManagerTableComponent'
import RequestFiltersComponent from './RequestFiltersComponent'
import { requestActions, requestSelectors } from '../clients/LTAClient'
import { filtersActions, filtersSelectors } from '../clients/FiltersClient'
import { FILTERS_I18N } from '../domain/filters'
/**
 * @author Théo Lasserre
 */
class LTAManagerComponent extends React.Component {
  static propTypes = {
    onBack: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    onDeleteRequest: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    isPaneOpened: false,
  }

  onRefresh = () => {
    const { onRefresh } = this.props
    const { currentRequestParameters } = this.state
    onRefresh(currentRequestParameters)
  }

  handleFiltersPane = () => {
    const { isPaneOpened } = this.state
    this.setState({
      isPaneOpened: !isPaneOpened,
    })
  }

  updateRefreshParameters = (requestParameters) => {
    this.setState({
      currentRequestParameters: requestParameters,
    })
  }

  render() {
    const {
      onBack, onDeleteRequest, isLoading,
    } = this.props
    const { isPaneOpened } = this.state
    const { intl: { formatMessage }, moduleTheme: { filterButtonStyle } } = this.context
    return (
      <Card>
        <CardHeaderActions
          title={formatMessage({ id: 'lta.card.title' })}
          mainButtonLabel={formatMessage({ id: 'lta.card.action.refresh' })}
          mainButtonType="submit"
          mainButtonClick={this.onRefresh}
          secondaryButtonLabel={formatMessage({ id: 'lta.card.action.filter' })}
          secondaryButtonClick={this.handleFiltersPane}
          secondaryButtonStyle={filterButtonStyle}
          thirdButtonLabel={formatMessage({ id: 'lta.card.action.cancel' })}
          thirdButtonClick={onBack}
        />
        <CardText>
          <TableFilterSortingAndVisibilityAndChipsComponent
            pageActions={requestActions}
            pageSelectors={requestSelectors}
            onDeleteRequest={onDeleteRequest}
            isPagePostFetching
            updateRefreshParameters={this.updateRefreshParameters}
            filtersActions={filtersActions}
            filtersSelectors={filtersSelectors}
            filtersI18n={FILTERS_I18N}
          >
            <RequestFiltersComponent
              key={CommonDomain.TableFilterComponentType.COMPONENT_TYPE.FILTER}
              isPaneOpened={isPaneOpened}
              onCloseFiltersPane={this.handleFiltersPane}
            />
            <LTAManagerTableComponent
              key={CommonDomain.TableFilterComponentType.COMPONENT_TYPE.COMPONENT}
              isLoading={isLoading}
            />
          </TableFilterSortingAndVisibilityAndChipsComponent>
        </CardText>
      </Card>
    )
  }
}
export default LTAManagerComponent
