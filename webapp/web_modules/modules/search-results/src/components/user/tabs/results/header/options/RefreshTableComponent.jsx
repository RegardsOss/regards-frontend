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
import { UIDomain } from '@regardsoss/domain'
import { CommonShapes, UIShapes } from '@regardsoss/shape'
import { BasicPageableActions } from '@regardsoss/store-utils'
import { RefreshPageableTableOption } from '@regardsoss/components'
import { getSearchCatalogClient } from '../../../../../../clients/SearchEntitiesClient'

/**
 * Allow to refresh all results
 * @author Léo Mieulet
 */
class RefreshTableComponent extends React.Component {
  static propTypes = {
    tabType: PropTypes.oneOf(UIDomain.RESULTS_TABS).isRequired,
    resultsContext: UIShapes.ResultsContext.isRequired,
    requestParameters: CommonShapes.RequestParameters.isRequired,
    searchActions: PropTypes.instanceOf(BasicPageableActions).isRequired,
  }

  render() {
    const {
      requestParameters, searchActions, resultsContext, tabType,
    } = this.props
    const { selectedMode } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)
    const pageSize = UIDomain.ResultsContextConstants.PAGE_SIZE_FOR[selectedMode]
    // connecter aux autres props
    // vérifier que le refactor que hier soit good (test...)
    return (
      <RefreshPageableTableOption
        shouldRefetchAll
        pageSize={pageSize}
        requestParams={requestParameters}
        pageableTableActions={searchActions}
        pageableTableSelectors={getSearchCatalogClient(tabType).searchSelectors}
      />
    )
  }
}
export default RefreshTableComponent
