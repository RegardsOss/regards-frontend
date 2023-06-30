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
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'
import { CatalogDomain } from '@regardsoss/domain'
import { CatalogClient } from '@regardsoss/client'
import { connect } from '@regardsoss/redux'
import { UIShapes } from '@regardsoss/shape'
import { StabilityDelayer } from '@regardsoss/display-control'
import { PluginsClientsMap } from '@regardsoss/plugins-api'
import buildClient from '../client/ValidationGeoClient'
import GeoZoneComponent from '../components/GeoZoneComponent'
import { SEARCH_MODES, SEARCH_MODES_ENUM } from '../domain/SearchMode'
import { FIELDS_ENUM } from '../domain/Fields'

/**
 * Main criterion container
 *
 * @author Théo Lasserre
 */
export class GeoZoneContainer extends React.Component {
  /**
   * Specifying the default state expected by this component (see propTypes for types)
   */
  static DEFAULT_STATE = {
    [FIELDS_ENUM.LON_MIN]: '',
    [FIELDS_ENUM.LON_MAX]: '',
    [FIELDS_ENUM.LAT_MIN]: '',
    [FIELDS_ENUM.LAT_MAX]: '',
    searchMode: SEARCH_MODES_ENUM.CONTAINS,
    error: false,
  }

  /**
   * Stores clients map for each client and plugin instance ID, to avoid building new instances each
   * time mapStateToProps and mapDispatchToProps are called
   */
  static CLIENTS_MAP = new PluginsClientsMap()

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch, { pluginInstanceId }) {
    const validateGeoActions = GeoZoneContainer.CLIENTS_MAP.getClient(buildClient, pluginInstanceId).actions
    return {
      dispatchValidateGeo: (wtkString) => dispatch(validateGeoActions.validateGeo(wtkString)),
    }
  }

  static propTypes = {
    // configured plugin label, where object key is locale and object value message
    label: UIShapes.IntlMessage.isRequired,
    // state shared and consumed by this criterion
    state: PropTypes.shape({
      lonMin: PropTypes.string,
      lonMax: PropTypes.string,
      latMin: PropTypes.string,
      latMax: PropTypes.string,
      searchMode: PropTypes.oneOf(SEARCH_MODES).isRequired,
      error: PropTypes.bool.isRequired,
    }),
    // Connected client to validate a geo
    geoValidateClient: PropTypes.shape({
      actions: PropTypes.instanceOf(CatalogClient.GeoValidateActions),
    }),
    // Callback to share state update with parent form like (state, requestParameters) => ()
    publishState: PropTypes.func.isRequired,
    // from mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    dispatchValidateGeo: PropTypes.func.isRequired,
  }

  /** Using default props to ensure a default plugin state */
  static defaultProps = {
    state: GeoZoneContainer.DEFAULT_STATE,
  }

  /**
   * Converts state as parameter into OpenSearch request parameters
   * @param {{searchText: string, searchMode: string}} state
   * @param {*} attribute criterion attribute
   * @return {*} corresponding OpenSearch request parameters
   */
  static convertToRequestParameters({
    lonMin, lonMax, latMin, latMax, error,
  }) {
    return !isEmpty(lonMin) && !isEmpty(lonMax) && !isEmpty(latMin) && !isEmpty(latMax) && !error ? {
      [CatalogDomain.CatalogSearchQueryHelper.GEOMETRY_PARAMETER_NAME]: CatalogDomain.CatalogSearchQueryHelper.buildPolygonSearch(lonMin, lonMax, latMin, latMax),
    } : {}
  }

  /** Instance stability delayer, used to avoid fetching before user stopped typing for a given delay */
  stabilityDelayer = new StabilityDelayer()

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update current options on context change and selected option on list change
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const { state, dispatchValidateGeo, publishState } = newProps
    const oldStateValues = {
      [FIELDS_ENUM.LON_MIN]: get(oldProps, `state.${FIELDS_ENUM.LON_MIN}`),
      [FIELDS_ENUM.LON_MAX]: get(oldProps, `state.${FIELDS_ENUM.LON_MAX}`),
      [FIELDS_ENUM.LAT_MIN]: get(oldProps, `state.${FIELDS_ENUM.LAT_MIN}`),
      [FIELDS_ENUM.LAT_MAX]: get(oldProps, `state.${FIELDS_ENUM.LAT_MAX}`),
    }
    // dispatch validation of the polygon when every values are set
    // apply a delay to prevent multiple network call when user is typping
    if ((!isEqual(oldStateValues[FIELDS_ENUM.LON_MIN], state[FIELDS_ENUM.LON_MIN]) || !isEqual(oldStateValues[FIELDS_ENUM.LON_MAX], state[FIELDS_ENUM.LON_MAX]) || !isEqual(oldStateValues[FIELDS_ENUM.LAT_MIN], state[FIELDS_ENUM.LAT_MIN]) || !isEqual(oldStateValues[FIELDS_ENUM.LAT_MAX], state[FIELDS_ENUM.LAT_MAX]))
      && (!isEmpty(state[FIELDS_ENUM.LON_MIN]) && !isEmpty(state[FIELDS_ENUM.LON_MAX]) && !isEmpty(state[FIELDS_ENUM.LAT_MIN]) && !isEmpty(state[FIELDS_ENUM.LAT_MAX]))) {
      // when search text changes (user is typing text), update options after an inactivity time ellapsed
      this.stabilityDelayer.onEvent(() => dispatchValidateGeo(CatalogDomain.CatalogSearchQueryHelper.buildPolygonSearch(state[FIELDS_ENUM.LON_MIN], state[FIELDS_ENUM.LON_MAX], state[FIELDS_ENUM.LAT_MIN], state[FIELDS_ENUM.LAT_MAX])).then((actionResult) => {
        const nextState = {
          ...state,
          error: actionResult.error,
        }
        publishState(nextState, GeoZoneContainer.convertToRequestParameters(nextState))
      }))
    }
  }

  onTextInput = (searchText, field) => {
    const { state, publishState } = this.props
    const nextState = {
      ...state,
      [field]: searchText,
    }
    publishState(nextState, GeoZoneContainer.convertToRequestParameters(nextState))
  }

  /**
   * Inner callback: new mode selected. Updates state and query
   * @param {string} searchMode selected, from SEARCH_MODES_ENUM
   */
  onSelectMode = (searchMode) => {
    const { state, publishState } = this.props
    if (searchMode === state.searchMode) {
      return // avoid resetting state without change
    }
    const nextState = { ...state, searchMode }
    publishState(nextState, GeoZoneContainer.convertToRequestParameters(nextState))
  }

  render() {
    const {
      label, state: {
        lonMin, lonMax, latMin, latMax, searchMode,
      },
    } = this.props
    return (
      <GeoZoneComponent
        label={label}
        lonMin={lonMin}
        lonMax={lonMax}
        latMin={latMin}
        latMax={latMax}
        onSelectMode={this.onSelectMode}
        searchMode={searchMode}
        onTextInput={this.onTextInput}
      />)
  }
}

// Connect client and retrieve it as props
export default
connect(null,
  GeoZoneContainer.mapDispatchToProps)(GeoZoneContainer)
