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
import isEqual from 'lodash/isEqual'
import omit from 'lodash/omit'
import get from 'lodash/get'
import { UIDomain } from '@regardsoss/domain'
import { CatalogShapes, UIShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'

import { getSearchCatalogClient } from '../../../../../clients/SearchEntitiesClient'

const getReactCompoName = (WrappedComponent) => WrappedComponent.displayName || WrappedComponent.name || 'Component'

/**
 * Decorates a React component to inject the full list of entities that the user had fetched
  *
 * @type {function}
 * @param {React.Component} DecoratedComponent The component to enhance
 * @return {React.Component}
 * @author Léo Mieulet
 */
export const withEntitiesCacheContainer = (DecoratedComponent) => {
  /**
   * Creates a cache with entities from several pages
   * @author Léo Mieulet
   */
  class EntitiesContainer extends React.Component {
    static propTypes = {
      // eslint-disable-next-line react/no-unused-prop-types
      tabType: PropTypes.oneOf(UIDomain.RESULTS_TABS).isRequired,
      // eslint-disable-next-line react/no-unused-prop-types
      resultsContext: UIShapes.ResultsContext.isRequired,

      // from mapStateToProps
      // The current loaded page of entities
      // eslint-disable-next-line react/no-unused-prop-types
      entities: PropTypes.arrayOf(CatalogShapes.Entity).isRequired,
      // eslint-disable-next-line react/no-unused-prop-types
      pageMetadata: PropTypes.shape({
        number: PropTypes.number,
        size: PropTypes.number,
        totalElements: PropTypes.number,
      }),
    }

    static displayName = `withEntitiesCacheContainer(${getReactCompoName(DecoratedComponent)})`

    /** Properties that should not be reported to render child button */
    static NON_REPORTED_PROPS = ['entities', 'pageMetadata']

    /**
     * Redux: map state to props function
     * @param {*} state: current redux state
     * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
     * @return {*} list of component properties extracted from redux state
     */
    static mapStateToProps(state, { tabType }) {
      const { searchSelectors } = getSearchCatalogClient(tabType)

      return {
        // results entities
        entities: searchSelectors.getOrderedList(state),
        pageMetadata: searchSelectors.getMetaData(state),
      }
    }

    /** Initial state */
    state = {
      // Holds all loaded entities (outside content field)
      loadedEntities: [],
    }

    /**
     * Lifecycle hook: component will mount, used here to update component state
     */
    UNSAFE_componentWillMount = () => this.onPropertiesChanged({}, this.props)

    /**
     * Lifecycle hook: component will receive props, used here to update component state
     * @param nextProps component next properties
     */
    UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesChanged(this.props, nextProps)

    /**
    * Updates component state (recompute properties related elements)
    * @param oldProps previous component
    * @param newProps new component props
    */
    onPropertiesChanged = (oldProps, newProps) => {
      const {
        entities,
        pageMetadata,
        tabType,
        resultsContext,
      } = newProps

      // detect entities list changes: re build locally the full list shown (Note: both entities and metadata change together, see BasicPageReducers)
      if (!isEqual(oldProps.entities, entities)) {
        const { selectedMode } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)
        const pageMetadataSize = get(pageMetadata, 'size', UIDomain.ResultsContextConstants.PAGE_SIZE_FOR[selectedMode])
        const pageMetadataNumber = get(pageMetadata, 'number', 0)
        // to handle refresh and filters add, make sure fetched page index is taken in account:
        // keep old entities up to fetched page, then replace list end with the last fetched page
        // as a consequence, when loading sequentially, last page will simply be added at end
        // Note 1: that algorithm assumes no page can be "jumped over"
        // Note 2: slice(0, 0) returns [] and slice (0, 100) => [(0)...(99)]
        const entitiesToKeep = this.state.loadedEntities.slice(0, pageMetadataNumber * pageMetadataSize)
        this.setState({
          loadedEntities: [
            ...entitiesToKeep,
            ...entities,
          ],
        })
      }
    }

    render() {
      const { loadedEntities } = this.state
      return <DecoratedComponent
        {...omit(this.props, EntitiesContainer.NON_REPORTED_PROPS)}
        loadedEntities={loadedEntities}
      />
    }
  }
  return connect(
    EntitiesContainer.mapStateToProps)(EntitiesContainer)
}
