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
import includes from 'lodash/includes'
import some from 'lodash/some'
import endsWith from 'lodash/endsWith'
import { browserHistory } from 'react-router'
import { Card, CardText } from 'material-ui/Card'
import {
  Breadcrumb, TableFilterSortingAndVisibilityContainer,
  CardHeaderActions, FiltersChipsContainer, TableHeaderLine,
  TableLayout,
} from '@regardsoss/components'
import { FemDomain, CommonDomain, UIDomain } from '@regardsoss/domain'
import PageView from 'mdi-material-ui/CardSearch'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { NotifierShapes } from '@regardsoss/shape'
import ReferencesManagerComponent, { REFERENCES_COLUMN_KEYS } from './ReferencesManagerComponent'
import RequestManagerComponent, { REQUESTS_COLUMN_KEYS } from './RequestManagerComponent'
import RequestManagerFiltersComponent from './filters/RequestManagerFiltersComponent'
import ReferenceManagerFiltersComponent from './filters/ReferenceManagerFiltersComponent'
import SwitchTablesContainer from '../containers/SwitchTablesContainer'
import { FILTERS_I18N } from '../domain/filters'
import clientByPane from '../domain/ClientByPane'
import { filtersActions, filtersSelectors } from '../clients/FiltersClient'

/**
* Feature manager component.
* @author Théo Lasserre
*/
class FeatureManagerComponent extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      project: PropTypes.string,
      type: PropTypes.string,
    }),
    onBack: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    onDeleteRequests: PropTypes.func.isRequired,
    onRetryRequests: PropTypes.func.isRequired,
    onNotifyRequests: PropTypes.func.isRequired,
    onForceErrorRequests: PropTypes.func.isRequired,
    recipientList: NotifierShapes.RecipientArray,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static updatePaneURL(pane) {
    const { pathname, query, search } = browserHistory.getCurrentLocation()
    let newPathName
    if (some(FemDomain.REQUEST_TYPES, (reqType) => endsWith(pathname, reqType))) {
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

  state = {
    paneType: FemDomain.REQUEST_TYPES_ENUM.REFERENCES,
    currentRequestParameters: {},
    isFilterPaneOpened: false,
  }

  UNSAFE_componentWillMount = () => {
    const { params: { type } } = this.props
    if (includes(FemDomain.REQUEST_TYPES, type)) {
      this.onSwitchToPane(type)
    }
  }

  /**
  * Update state with pane type
  * @param {*} paneType see FeatureManagerComponent.PANES for values
  */
  onSwitchToPane = (paneType) => {
    FeatureManagerComponent.updatePaneURL(paneType)
    this.setState({
      paneType,
    })
  }

  updateRefreshParameters = (requestParameters) => {
    const { paneType } = this.state
    const columnKeys = paneType === FemDomain.REQUEST_TYPES_ENUM.REFERENCES ? REFERENCES_COLUMN_KEYS : REQUESTS_COLUMN_KEYS
    // We remove sorting parameters that are not used in this pane
    const filteredRequestParameters = UIDomain.SortingHelper.buildSortingParameters(requestParameters, columnKeys)
    this.setState({
      currentRequestParameters: filteredRequestParameters,
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
    const elements = [formatMessage({ id: 'feature.references.title' })]
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
    const { isFetching, recipientList } = this.props
    const { isFilterPaneOpened } = this.state
    if (paneType === FemDomain.REQUEST_TYPES_ENUM.REFERENCES) {
      return [
        <ReferenceManagerFiltersComponent
          key={CommonDomain.TableFilterComponentType.COMPONENT_TYPE.FILTER}
          isPaneOpened={isFilterPaneOpened}
          onCloseFiltersPane={this.handleFiltersPane}
        />,
        <ReferencesManagerComponent
          key={CommonDomain.TableFilterComponentType.COMPONENT_TYPE.COMPONENT}
          isFetching={isFetching}
          paneType={paneType}
          recipientList={recipientList}
        />,
      ]
    }
    return [
      <RequestManagerFiltersComponent
        key={CommonDomain.TableFilterComponentType.COMPONENT_TYPE.FILTER}
        isPaneOpened={isFilterPaneOpened}
        onCloseFiltersPane={this.handleFiltersPane}
      />,
      <RequestManagerComponent
        key={CommonDomain.TableFilterComponentType.COMPONENT_TYPE.COMPONENT}
        paneType={paneType}
        isFetching={isFetching}
      />,
    ]
  }

  render() {
    const {
      params, onBack, onRefresh, onDeleteRequests, onNotifyRequests, onRetryRequests, onForceErrorRequests,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { card: { filterButtonStyle } } } = this.context
    const { paneType, currentRequestParameters } = this.state
    return (
      <div>
        <Card>
          <CardHeaderActions
            title={this.renderBreadCrumb()}
            mainButtonLabel={formatMessage({ id: 'feature.button.refresh' })}
            mainButtonType="submit"
            mainButtonClick={() => onRefresh(currentRequestParameters, paneType)}
            secondaryButtonLabel={formatMessage({ id: 'feature.button.filter' })}
            secondaryButtonClick={this.handleFiltersPane}
            secondaryButtonStyle={filterButtonStyle}
            thirdButtonLabel={formatMessage({ id: 'feature.button.back' })}
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
                <SwitchTablesContainer
                  params={params}
                  onSwitchToPane={this.onSwitchToPane}
                  featureManagerFilters={currentRequestParameters}
                  paneType={paneType}
                />
              </TableHeaderLine>
            </TableLayout>
            <TableFilterSortingAndVisibilityContainer
              pageActions={clientByPane[paneType].actions}
              pageSelectors={clientByPane[paneType].selectors}
              updateRefreshParameters={this.updateRefreshParameters}
              onDeleteRequests={onDeleteRequests}
              onNotifyRequests={onNotifyRequests}
              onRetryRequests={onRetryRequests}
              onForceErrorRequests={onForceErrorRequests}
              pathParams={paneType !== FemDomain.REQUEST_TYPES_ENUM.REFERENCES ? { type: paneType } : {}}
              isPagePostFetching
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

export default FeatureManagerComponent
