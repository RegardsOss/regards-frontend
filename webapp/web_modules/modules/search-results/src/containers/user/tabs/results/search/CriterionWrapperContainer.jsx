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
import flatMap from 'lodash/flatMap'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import isNil from 'lodash/isNil'
import { DamDomain, UIDomain, CatalogDomain } from '@regardsoss/domain'
import { UIShapes } from '@regardsoss/shape'
import { AttributeBoundsConfiguration } from '@regardsoss/api'
import { connect } from '@regardsoss/redux'
import reduce from 'lodash/reduce'
import { SearchCriteriaGroupRuntime } from '../../../../../shapes/search/SearchCriteriaGroupRuntime'
import { SearchCriterionRuntime } from '../../../../../shapes/search/SearchCriterionRuntime'
import { attributesBoundsActions } from '../../../../../clients/AttributesBoundsClient'
import CriterionWrapperComponent from '../../../../../components/user/tabs/results/search/CriterionWrapperComponent'

/**
 * Container for criterion wrapper: resolves runtime properties and configuration (with attributes bounds related to previous
 * criteria)
 * @author Raphaël Mechali
 */
export class CriterionWrapperContainer extends React.Component {
  static propTypes = {
    groupIndex: PropTypes.number.isRequired,
    criterionIndex: PropTypes.number.isRequired,
    criterion: SearchCriterionRuntime.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    groups: PropTypes.arrayOf(SearchCriteriaGroupRuntime).isRequired, // used in onPropertiesUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    rootContextCriteria: PropTypes.arrayOf(UIShapes.BasicCriterion).isRequired, // used in onPropertiesUpdated
    onUpdatePluginState: PropTypes.func.isRequired,
    // from mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    dispatchFetchBounds: PropTypes.func.isRequired, // used in onPropertiesUpdated
  }

  /** Types of attributes that accept bounds */
  static BOUNDABLE_TYPES = [
    DamDomain.MODEL_ATTR_TYPES.INTEGER,
    DamDomain.MODEL_ATTR_TYPES.DOUBLE,
    DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601,
    DamDomain.MODEL_ATTR_TYPES.LONG,
  ]

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      dispatchFetchBounds: (attributesPath, contextQuery) => dispatch(attributesBoundsActions.fetchAttributesBounds(attributesPath, contextQuery)),
    }
  }

  /**
   * Builds context request parameters for this criterion, as the sum of root context parameters and other criteria parameters
   *
   * @param {[*]} rootContextCriteria
   * @param {[*]} groups criteria groups as an array of UIShapes UIShapes.BasicCriterion
   * @param {number} rootContextCriteria considered criterion group index
   * @param {number} rootContextCriteria considered criterion index in group
   * @return {*} built search context, matching CatalogShapes.SearchContext
   */
  static getSearchContext(rootContextCriteria, groups, groupIndex, criterionIndex) {
    // A - Build the array of BasicCriterion applying (excluding itself)
    const contextCriteria = [
      ...rootContextCriteria,
      ...flatMap(groups, ({ criteria }, gI) => gI !== groupIndex ? criteria : criteria.filter(
        (c, cI) => cI !== criterionIndex)),
    ]
    // B - Convert to a a search context object
    return {
      engineType: CatalogDomain.LEGACY_SEARCH_ENGINE,
      searchParameters: UIDomain.ResultsContextHelper.getQueryParametersFromCriteria(contextCriteria),
    }
  }

  /** Request ID (used to handle concurrency at instance level) */
  currentRequestId = 0

  /** Initial state */
  state = {
    pluginConf: {},
    pluginProps: {},
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
    let newState = { ...this.state }
    const {
      groups, groupIndex, criterionIndex,
      criterion: { label, state, conf },
      rootContextCriteria, dispatchFetchBounds,
    } = newProps
    const oldCriterion = oldProps.criterion || {}
    // A - each time label / state changes update properties (label covers initialization state), set up pluginProps
    if (!isEqual(oldCriterion.state, state) || !isEqual(oldCriterion.label, label)) {
      newState = {
        ...newState,
        pluginProps: {
          label,
          state: isNil(state) ? undefined : state, // leave state undefined instead of null, to let user set it through defaultProps system
          publishState: this.onUpdateState,
          searchContext: this.state.pluginProps.searchContext, // Report previously known parameters, in case (B) is skipped
        },
      }
    }
    // B - Each time the context parameter changes (root context + parent criteria request), update attributes bounds
    // Nota: it also work for initialization as contextParameters are initially null
    const nextSearchContext = CriterionWrapperContainer.getSearchContext(rootContextCriteria, groups, groupIndex, criterionIndex)
    if (!isEqual(this.state.pluginProps.searchContext, nextSearchContext)) {
      // B.1 - Store context parameters for criterion
      newState.pluginProps = {
        ...newState.pluginProps,
        searchContext: nextSearchContext,
      }

      // B.2 - Rebuild configuration: Mark bounds status in attributes and keep boundable ones in order to fetch them later on
      const { confAcc: pluginConf, boundAttrAcc: boundableAttributesPath } = reduce(conf.attributes, ({ confAcc, boundAttrAcc }, attribute, key) => {
        const isBoundableAttribute = CriterionWrapperContainer.BOUNDABLE_TYPES.includes(attribute.type)
        return {
          confAcc: {
            ...confAcc,
            attributes: {
              ...confAcc.attributes,
              [key]: {
                ...attribute,
                boundsInformation: {
                  exists: isBoundableAttribute,
                  loading: isBoundableAttribute, // will be started immediately
                  error: false,
                },
              },
            },
          },
          // keep attribute as required for fetching (avoid inserting doubles though)
          boundAttrAcc: isBoundableAttribute && !boundAttrAcc.includes(attribute.jsonPath) ? [...boundAttrAcc, attribute.jsonPath] : boundAttrAcc,
        }
      }, { confAcc: { ...conf, attributes: {} }, boundAttrAcc: [] })
      newState.pluginConf = pluginConf

      // B.3 - start updating attributes bounds if there is any boundable attribute
      if (boundableAttributesPath.length) {
        this.onBoundsUpdate(dispatchFetchBounds, boundableAttributesPath, nextSearchContext.searchParameters)
      }
    }

    // Finally set state only when any change was detected (should always be the case when here)
    if (!isEqual(this.state, newState)) {
      this.setState(newState)
    }
  }

  /**
   * Bounds update was triggered
   * @param {Function} dispatchFetchBounds dispatches fetch action
   * @param {[string]} boundableAttributesPath, never empty
   * @param {*} contextParameters matching CommonShapes.RequestParameters
   */
  onBoundsUpdate = (dispatchFetchBounds, boundableAttributesPath, contextParameters) => {
    this.currentRequestId += 1 // Reseve a request ID (concurrency management)
    this.fetchBounds(this.currentRequestId, dispatchFetchBounds, boundableAttributesPath, contextParameters)
  }

  /**
   * Performs fetch bound.
   * @param {number} request ID, used here to create a closure context on current value at fetch stating time
   * @param {Function} dispatchFetchBounds dispatches fetch action
   * @param {[string]} boundableAttributesPath, never empty
   * @param {*} contextParameters matching CommonShapes.RequestParameters
   */
  fetchBounds = (requestId, dispatchFetchBounds, boundableAttributesPath, contextParameters) => {
    dispatchFetchBounds(boundableAttributesPath, contextParameters)
      .then(({ payload, error }) => {
        if (requestId === this.currentRequestId) {
          // ...only when this request is still up to date
          if (error) {
            // an error occurred, redirect to catch handler
            throw new Error('Failed fetching bounds')
          }
          // prepare update bounds information by attribute path
          const boundsByAttribute = get(payload, `entities.${AttributeBoundsConfiguration.normalizrKey}`, {})
          const newAttributesBoundsInformation = boundableAttributesPath.reduce((acc, attrPath) => ({
            ...acc,
            [attrPath]: { // set only difference here
              loading: false,
              lowerBound: get(boundsByAttribute[attrPath], 'content.lowerBound'),
              upperBound: get(boundsByAttribute[attrPath], 'content.upperBound'),
            },
          }), {})
          this.onBoundsInformationUpdated(newAttributesBoundsInformation)
        }
      })
      .catch(() => this.onBoundsInformationUpdated(boundableAttributesPath.reduce((acc, attrPath) => ({
        ...acc,
        [attrPath]: { // set only difference here: mark loading done
          loading: false,
          error: true,
        },
      }), {})))
  }

  /**
   * Current bounds information were updated, commit corresponding state
   * @param {*} informationUpdate map of bounds information update, by attribute path
   */
  onBoundsInformationUpdated = (informationUpdate) => {
    this.setState({
      pluginConf: {
        ...this.state.pluginConf,
        attributes: reduce(this.state.pluginConf.attributes, (acc, attribute, key) => ({
          ...acc,
          [key]: informationUpdate[attribute.jsonPath] ? {
            // updated attribute
            ...attribute,
            boundsInformation: {
              ...attribute.boundsInformation,
              ...informationUpdate[attribute.jsonPath], // update only modified fields
            },
          } : attribute, // no update for that attribute
        }), {}),
      },
    })
  }

  /**
   * Local callback wrapping: criterion plugin published a new state
   */
  onUpdateState = (newState, newRequestParameters) => {
    const { groupIndex, criterionIndex, onUpdatePluginState } = this.props
    onUpdatePluginState(groupIndex, criterionIndex, newState, newRequestParameters)
  }

  render() {
    const { criterion: { pluginId, pluginInstanceId } } = this.props
    const { pluginProps, pluginConf } = this.state
    return (
      <CriterionWrapperComponent
        pluginId={pluginId}
        pluginInstanceId={pluginInstanceId}
        pluginProps={pluginProps}
        pluginConf={pluginConf}
      />
    )
  }
}
export default connect(null, CriterionWrapperContainer.mapDispatchToProps)(CriterionWrapperContainer)
