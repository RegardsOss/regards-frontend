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
import { connect } from '@regardsoss/redux'
import { searchDataobjectsActions, searchDataobjectsSelectors } from '../../../client/ComplexSearchClient'
import SelectionDetailResultsTableComponent from '../../../components/user/detail/SelectionDetailResultsTableComponent'
import { BasketSelelectionRequest } from '../../../../../../data/shape/src/rs-order'

/**
* Selection detail results container
* @author Raphaël Mechali
*/
export class SelectionDetailResultsTableContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      resultsCount: searchDataobjectsSelectors.getResultsCount(state),
      isFetching: searchDataobjectsSelectors.isFetching(state),
    }
  }

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    selectionRequest: BasketSelelectionRequest,
    // from mapStateToProps
    resultsCount: PropTypes.number.isRequired,
    isFetching: PropTypes.bool.isRequired,
  }

  /**
   * Convert basket selection request into a search request for complex search array endpoint
   * @param {*} selectionRequest basket selection request
   */
  static toComplexSearchRequests(selectionRequest) {
    if (selectionRequest) {
      // list with a single element, transform date field name
      return [{
        engineType: selectionRequest.engineType,
        datasetUrn: selectionRequest.datasetUrn,
        searchParameters: selectionRequest.searchParameters,
        entityIdsToInclude: selectionRequest.entityIdsToInclude,
        entityIdsToExclude: selectionRequest.entityIdsToExclude,
        searchDateLimit: selectionRequest.selectionDate,
      }]
    }
    // none
    return []
  }

  /** React lifecycle method: component will mount. Used here to detect properties changed */
  UNSAFE_componentWillMount = () => this.onPropertiesChanged({}, this.props)

  /** React lifecycle method: component will receive new props. Used here to detect properties changed */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesChanged(this.props, nextProps)

  /**
   * On properties changed:
   * recompute and store in state transient values that can be extract from properties but should not be
   * computed at render time for efficiency reasons
   * @param oldProperties old component properties
   * @param newProperties new component properties
   */
  onPropertiesChanged = (oldProperties, newProperties) => {
    // Prepare table search dataobjects request
    if (oldProperties.selectionRequest !== newProperties.selectionRequest) {
      this.setState({
        // report the parameters that will be provided as requests parameters to ComplexSeachActions#fetchPagedEntityList
        bodyParams: {
          requests: SelectionDetailResultsTableContainer.toComplexSearchRequests(newProperties.selectionRequest),
        },
      })
    }
  }

  render() {
    const { resultsCount, isFetching } = this.props
    const { bodyParams } = this.state
    return (
      <SelectionDetailResultsTableComponent
        pageActions={searchDataobjectsActions}
        pageSelectors={searchDataobjectsSelectors}
        bodyParams={bodyParams}
        resultsCount={resultsCount}
        isFetching={isFetching}
      />
    )
  }
}
export default connect(SelectionDetailResultsTableContainer.mapStateToProps)(SelectionDetailResultsTableContainer)
