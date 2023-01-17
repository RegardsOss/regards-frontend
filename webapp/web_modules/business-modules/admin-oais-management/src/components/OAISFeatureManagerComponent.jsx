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
import some from 'lodash/some'
import endsWith from 'lodash/endsWith'
import includes from 'lodash/includes'
import { browserHistory } from 'react-router'
import { Card, CardText } from 'material-ui/Card'
import {
  Breadcrumb, TableHeaderLine, CardHeaderActions, TableFilterSortingAndVisibilityContainer,
  TableLayout, FiltersChipsContainer,
} from '@regardsoss/components'
import { IngestDomain, CommonDomain } from '@regardsoss/domain'
import PageView from 'mdi-material-ui/CardSearch'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import clientByPane from '../domain/ClientByPane'
import OAISSwitchTables from './OAISSwitchTables'
import AIPFeatureManagerFiltersComponent from './AIPFeatureManagerFiltersComponent'
import RequestsFeatureManagerFiltersComponent from './RequestsFeatureManagerFiltersComponent'
import OAISRequestManagerComponent from './requests/OAISRequestManagerComponent'
import OAISPackageManagerComponent from './packages/OAISPackageManagerComponent'
import { filtersActions, filtersSelectors } from '../clients/FiltersClient'
import { FILTERS_I18N } from '../domain/filters'

/**
 * OAIS Feature manager component.
 * @author Simon MILHAU
 */
class OAISFeatureManagerComponent extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      project: PropTypes.string,
      session: PropTypes.string,
      type: PropTypes.string,
    }),
    modeSelectionAllowed: PropTypes.bool.isRequired, // version mode selection allowed to current user?
    isLoading: PropTypes.bool,
    storages: PropTypes.arrayOf(PropTypes.string),
    onRefresh: PropTypes.func.isRequired,
    onDeleteRequests: PropTypes.func.isRequired,
    onRetryRequests: PropTypes.func.isRequired,
    onAbortRequests: PropTypes.func.isRequired,
    onSelectVersionOption: PropTypes.func.isRequired,
    onModifyAip: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    paneType: IngestDomain.REQUEST_TYPES_ENUM.AIP,
    currentRequestParameters: {},
    isFilterPaneOpened: false,
  }

  UNSAFE_componentWillMount = () => {
    const { params: { type } } = this.props
    if (includes(IngestDomain.REQUEST_TYPES, type)) {
      this.onSwitchToPane(type)
    }
  }

  updatePaneURL = (pane) => {
    const { pathname, query, search } = browserHistory.getCurrentLocation()
    let newPathName
    if (some(IngestDomain.REQUEST_TYPES, (reqType) => endsWith(pathname, reqType))) {
      newPathName = `${pathname.substring(0, pathname.lastIndexOf('/'))}/${pane}`
    } else {
      newPathName = `${pathname}/${pane}`
    }
    browserHistory.replace({
      pathname: newPathName,
      search,
      query,
    })
  }

  /**
  * Update state with pane type
  * @param {*} paneType see FeatureManagerComponent.PANES for values
  */
  onSwitchToPane = (paneType) => {
    this.updatePaneURL(paneType)
    this.setState({
      paneType,
    })
  }

  updateRefreshParameters = (requestParameters) => {
    this.setState({
      currentRequestParameters: requestParameters,
    })
  }

  handleFiltersPane = () => {
    const { isFilterPaneOpened } = this.state
    this.setState({
      isFilterPaneOpened: !isFilterPaneOpened,
    })
  }

  renderBreadCrumb = () => {
    const { onBack } = this.props
    const { intl: { formatMessage } } = this.context
    const elements = [formatMessage({ id: 'oais.session.title' })]
    return (
      <Breadcrumb
        rootIcon={<PageView />}
        elements={elements}
        labelGenerator={(label) => label}
        onAction={onBack}
      />
    )
  }

  getDisplayComponents = (paneType) => {
    const { isLoading, storages, modeSelectionAllowed } = this.props
    const { isFilterPaneOpened } = this.state
    if (paneType === IngestDomain.REQUEST_TYPES_ENUM.AIP) {
      return [
        <AIPFeatureManagerFiltersComponent
          key={CommonDomain.TableFilterComponentType.COMPONENT_TYPE.FILTER}
          isPaneOpened={isFilterPaneOpened}
          onCloseFiltersPane={this.handleFiltersPane}
          storages={storages}
        />,
        <OAISPackageManagerComponent
          key={CommonDomain.TableFilterComponentType.COMPONENT_TYPE.COMPONENT}
          isLoading={isLoading}
          paneType={paneType}
        />,
      ]
    }
    return [
      <RequestsFeatureManagerFiltersComponent
        key={CommonDomain.TableFilterComponentType.COMPONENT_TYPE.FILTER}
        isPaneOpened={isFilterPaneOpened}
        onCloseFiltersPane={this.handleFiltersPane}
      />,
      <OAISRequestManagerComponent
        key={CommonDomain.TableFilterComponentType.COMPONENT_TYPE.COMPONENT}
        isLoading={isLoading}
        paneType={paneType}
        modeSelectionAllowed={modeSelectionAllowed}
      />,
    ]
  }

  render() {
    const { intl: { formatMessage }, moduleTheme: { filterButtonStyle } } = this.context
    const {
      params, onRefresh, onBack, onDeleteRequests, onRetryRequests, onAbortRequests, onSelectVersionOption, onModifyAip,
    } = this.props
    const { paneType, currentRequestParameters } = this.state
    return (
      <div>
        <Card>
          <CardHeaderActions
            title={this.renderBreadCrumb()}
            mainButtonLabel={formatMessage({ id: 'oais.aips.session.refresh.button' })}
            mainButtonType="submit"
            mainButtonClick={() => onRefresh(currentRequestParameters, paneType)}
            secondaryButtonLabel={formatMessage({ id: 'oais.aips.session.filter.button' })}
            secondaryButtonClick={this.handleFiltersPane}
            secondaryButtonStyle={filterButtonStyle}
            thirdButtonLabel={formatMessage({ id: 'oais.aips.session.button.back' })}
            thirdButtonClick={onBack}
          />
          <CardText>
            <FiltersChipsContainer
              filtersActions={filtersActions}
              filtersSelectors={filtersSelectors}
              filtersI18n={FILTERS_I18N}
            />
            <TableLayout>
              <TableHeaderLine>
                <OAISSwitchTables
                  params={params}
                  onSwitchToPane={this.onSwitchToPane}
                  openedPane={paneType}
                  bodyParameters={currentRequestParameters}
                />
              </TableHeaderLine>
            </TableLayout>
            <TableFilterSortingAndVisibilityContainer
              pageActions={clientByPane[paneType].actions}
              pageSelectors={clientByPane[paneType].selectors}
              isPagePostFetching
              updateRefreshParameters={this.updateRefreshParameters}
              onDeleteRequests={onDeleteRequests}
              onRetryRequests={onRetryRequests}
              onAbortRequests={onAbortRequests}
              onSelectVersionOption={onSelectVersionOption}
              onModifyAip={onModifyAip}
              filtersActions={filtersActions}
              filtersSelectors={filtersSelectors}
              filtersI18n={FILTERS_I18N}
            >
              {this.getDisplayComponents(paneType)}
            </TableFilterSortingAndVisibilityContainer>
          </CardText>
        </Card>
      </div>
    )
  }
}

export default OAISFeatureManagerComponent
