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
import omit from 'lodash/omit'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import includes from 'lodash/includes'
import slice from 'lodash/slice'
import filter from 'lodash/filter'
import map from 'lodash/map'
import { GeoJsonFeaturesCollection } from '@regardsoss/mizar-adapter'

const getReactCompoName = (WrappedComponent) => WrappedComponent.displayName || WrappedComponent.name || 'Component'

/**
 * Builds a page of features each time feature collection is updated and instanciate a new DecoratedComponent each time.
 * When used with PrimitiveDataSource helps prevent to reload all Cesium datas every times.
 * (Using Primitives makes Cesium 'blink' when feature collection is updated).
 * @author Théo Lasserre
 */
export const withPagedFeaturesHOC = (DecoratedComponent) => {
  class PagedPrimitiveDataSourceHOC extends React.Component {
    static propTypes = {
      data: GeoJsonFeaturesCollection,
      // eslint-disable-next-line react/forbid-prop-types
      stroke: PropTypes.object.isRequired, // Cesium Color
      // eslint-disable-next-line react/forbid-prop-types
      strokeWidth: PropTypes.number.isRequired,
      pageSize: PropTypes.number,
    }

    static defaultProps = {
      pageSize: 1,
    }

    // When there are this number of empty pages, they all will be removed.
    // Instead of removing empty pages each time an item is removed we clear empty pages when this amount is reached.
    // This is for aesthetic reason, removing a page every times makes Cesium 'blink'.
    // Furthermore, an empty page is a useless node in the DOM tree.
    static MAX_ALLOWED_EMPTY_PAGES = 100

    static displayName = `withPagedFeaturesHOC(${getReactCompoName(DecoratedComponent)})`

    /** Properties that should not be reported to render child button */
    static NON_REPORTED_PROPS = ['pageSize']

    state = {
      pages: [], // a page is composed by a number of items. one item is one feature.
      totalNumberOfItems: 0, // count of every items in every pages
    }

    /**
     * Lifecycle method: component will mount. Used here to detect first properties change and update local state
     */
    UNSAFE_componentWillMount() {
      this.onPropertiesUpdated({}, this.props)
    }

    /**
     * Lifecycle method: component receive props. Used here to detect properties change and update local state
     * @param {*} nextProps next component properties
     */
    UNSAFE_componentWillReceiveProps(nextProps) {
      this.onPropertiesUpdated(this.props, nextProps)
    }

    /**
     * Properties change detected: update local state
     * @param oldProps previous component properties
     * @param newProps next component properties
     */
    onPropertiesUpdated = (oldProps, newProps) => {
      const { pageSize } = newProps
      const { totalNumberOfItems, pages } = this.state
      const features = get(newProps, 'data.features', [])
      let newState = { ...this.state }
      if (features.length !== totalNumberOfItems) {
        // create one or multiple pages
        // we want to create a new page with the new features (features is composed by old features and the new ones, totalNumberOfItems counts old features).
        if (features.length > totalNumberOfItems && !isEmpty(features)) {
          // If there are too much new features for one page we need to create multiple pages.
          // Usefull when mounting selectedProducts (multiple selectedProducts for a pageSize of 1)
          const newPages = !isEmpty(pages) ? [...pages] : []
          let newNumberOfElements = totalNumberOfItems
          let i = totalNumberOfItems
          do {
            const numberOfElements = i + pageSize < features.length ? i + pageSize : features.length
            const featuresSlice = slice(features, i, numberOfElements)
            if (!isEmpty(featuresSlice)) {
              newPages.push({
                items: featuresSlice,
              })
              newNumberOfElements = numberOfElements
              i = newNumberOfElements
            }
          } while (i < features.length)
          newState = {
            totalNumberOfItems: newNumberOfElements,
            pages: newPages,
          }
        }
        // remove an item of a page.
        // there are less new features than the number of items already loaded.
        if (features.length < totalNumberOfItems) {
          const newFeaturesIds = map(features, (newFeature) => newFeature.id)
          // remove an item of a page.
          // do not remove empty pages directly as it will makes Cesium 'blink'
          let newPages = map(pages, (page) => ({
            items: filter(page.items, (item) => includes(newFeaturesIds, item.id)),
          }))
          const newNumberOfElements = features.length
          // remove empty pages when there are too much of them
          const nonEmptyPages = filter(newPages, (newPage) => !isEmpty(newPage.items))
          if (newPages.length - nonEmptyPages.length >= PagedPrimitiveDataSourceHOC.MAX_ALLOWED_EMPTY_PAGES) {
            newPages = nonEmptyPages
          }
          newState = {
            totalNumberOfItems: newNumberOfElements,
            pages: newPages,
          }
        }
        if (!isEqual(this.state, newState)) {
          this.setState(newState)
        }
      }
    }

    render() {
      const { pages } = this.state
      return map(pages, (page, index) => <DecoratedComponent
        {...omit(this.props, PagedPrimitiveDataSourceHOC.NON_REPORTED_PROPS)}
        key={`page-${index}`}
        features={page.items}
      />)
    }
  }
  return PagedPrimitiveDataSourceHOC
}
