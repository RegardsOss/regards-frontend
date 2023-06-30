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
import {
  Card, CardText, CardActions,
} from 'material-ui/Card'
import PageView from 'mdi-material-ui/CardSearch'
import {
  CardActionsComponent, Breadcrumb, TableFilterSortingAndVisibilityAndChipsComponent,
  TableFilterSortingAndVisibilityContainer, CardHeaderActions,
} from '@regardsoss/components'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import { CommonDomain } from '@regardsoss/domain'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import AcquisitionProcessingChainListFiltersComponent from './AcquisitionProcessingChainListFiltersComponent'
import AcquisitionProcessingChainTableComponent from './AcquisitionProcessingChainTableComponent'
import { AcquisitionProcessingChainActions, AcquisitionProcessingChainSelectors } from '../../clients/AcquisitionProcessingChainClient'
import { filtersActions, filtersSelectors } from '../../clients/FiltersClient'
import { FILTERS_I18N } from '../../domain/filters'
import messages from '../../i18n'
import styles from '../../styles'
import dependencies from '../../dependencies'

/**
* Component to display list of acquisition processing chains
* @author Sébastien Binda
*/
export class AcquisitionProcessingChainListComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    resultsCount: PropTypes.number.isRequired,
    createUrl: PropTypes.string.isRequired,
    entitiesLoading: PropTypes.bool.isRequired,
    onRefresh: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onRunChain: PropTypes.func.isRequired,
    onStopChain: PropTypes.func.isRequired,
    onMultiToggleSelection: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    isOneCheckboxToggled: PropTypes.bool.isRequired,
    hasAccess: PropTypes.bool.isRequired,
  }

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    currentRequestParameters: {},
    isPaneOpened: false,
  }

  renderBreadCrump = () => {
    const { intl: { formatMessage } } = this.context
    const elements = [formatMessage({ id: 'acquisition-chain-breadcrumb.label' })]
    return (
      <Breadcrumb
        rootIcon={<PageView />}
        elements={elements}
        labelGenerator={(label) => label}
        onAction={() => { }}
      />
    )
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
    const { intl: { formatMessage }, moduleTheme: { chains: { filterButtonStyle } } } = this.context
    const {
      onBack, resultsCount, entitiesLoading,
      onMultiToggleSelection, isOneCheckboxToggled, hasAccess, onToggle,
      onDelete, onStopChain, onRunChain, project, createUrl,
    } = this.props
    const { isPaneOpened } = this.state
    return (
      <Card>
        <CardHeaderActions
          title={this.renderBreadCrump()}
          subtitle={formatMessage({ id: 'acquisition-chain.list.subtitle' })}
          mainButtonLabel={formatMessage({ id: 'acquisition-chain.list.refresh.button' })}
          mainButtonType="submit"
          mainButtonClick={this.onRefresh}
          secondaryButtonLabel={formatMessage({ id: 'acquisition-chain.list.filter.button' })}
          secondaryButtonClick={this.handleFiltersPane}
          secondaryButtonStyle={filterButtonStyle}
          thirdButtonLabel={formatMessage({ id: 'acquisition-chain.list.back.button' })}
          thirdButtonClick={onBack}
        />
        <CardText>
          <TableFilterSortingAndVisibilityAndChipsComponent
            pageActions={AcquisitionProcessingChainActions}
            pageSelectors={AcquisitionProcessingChainSelectors}
            onMultiToggleSelection={onMultiToggleSelection}
            onToggle={onToggle}
            onDelete={onDelete}
            onStopChain={onStopChain}
            onRunChain={onRunChain}
            updateRefreshParameters={this.updateRefreshParameters}
            filtersActions={filtersActions}
            filtersSelectors={filtersSelectors}
            filtersI18n={FILTERS_I18N}
          >
            <AcquisitionProcessingChainListFiltersComponent
              key={CommonDomain.TableFilterComponentType.COMPONENT_TYPE.FILTER}
              isPaneOpened={isPaneOpened}
              onCloseFiltersPane={this.handleFiltersPane}
            />
            <AcquisitionProcessingChainTableComponent
              key={CommonDomain.TableFilterComponentType.COMPONENT_TYPE.COMPONENT}
              project={project}
              pageSize={TableFilterSortingAndVisibilityContainer.PAGE_SIZE}
              hasAccess={hasAccess}
              updateErrorMessage={this.updateErrorMessage}
              entitiesLoading={entitiesLoading}
              resultsCount={resultsCount}
              isOneCheckboxToggled={isOneCheckboxToggled}
            />
          </TableFilterSortingAndVisibilityAndChipsComponent>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonUrl={createUrl}
            mainHateoasDependencies={dependencies.addDependencies}
            mainButtonLabel={formatMessage({ id: 'acquisition-chain.list.addnew.button' })}
          />
        </CardActions>
      </Card>
    )
  }
}
export default withModuleStyle(styles)(withI18n(messages)(AcquisitionProcessingChainListComponent))
