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
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import { connect } from '@regardsoss/redux'
import { PluginsClientsMap } from '@regardsoss/plugins-api'
import { StabilityDelayer } from '@regardsoss/display-control'
import { UIShapes } from '@regardsoss/shape'
import getSesameClient from '../clients/SesameClient'
import CriterionComponent from '../components/CriterionComponent'
import ConeAngleHelper from '../utils/ConeAngleHelper'
import RightAscensionHelper from '../utils/RightAscensionHelper'
import DeclinaisonHelper from '../utils/DeclinaisonHelper'
import SpatialNameHelper from '../utils/SpatialNameHelper'
import SesameHelper from '../clients/SesameHelper'
import { OPTIONS_ENUM, OPTIONS } from '../domain/Options'

/**
 * Main SNR-criterion plugin container
 * @author Théo Lasserre
 */
export class CriterionContainer extends React.Component {
  /** Default state expected by this component */
  static DEFAULT_STATE = {
    spatialName: '',
    rightAscension: '',
    declinaison: '',
    coneAngle: '',
    resolved: null,
    optionSelected: OPTIONS_ENUM.SNR,
    error: false,
  }

  static CLIENTS_MAP = new PluginsClientsMap()

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { pluginInstanceId }) {
    const sesameSelectors = CriterionContainer.CLIENTS_MAP.getClient(getSesameClient, pluginInstanceId).selectors
    return {
      snrState: sesameSelectors.getSesameState(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch, { pluginInstanceId }) {
    const sesameActions = CriterionContainer.CLIENTS_MAP.getClient(getSesameClient, pluginInstanceId).actions
    return {
      resolveSpatialName: (spatialName) => dispatch(sesameActions.getCoordinates(spatialName)),
    }
  }

  static propTypes = {
    /** Plugin identifier */
    // eslint-disable-next-line react/no-unused-prop-types
    pluginInstanceId: PropTypes.string.isRequired, // used in mapStateToProps and mapDispatchToProps
    // configured plugin label, where object key is locale and object value message
    label: UIShapes.IntlMessage.isRequired,
    /** Criterion search context */
    state: PropTypes.shape({
      spatialName: PropTypes.string,
      coneAngle: PropTypes.string.isRequired,
      resolved: PropTypes.shape({ // required only when resolved
        longitude: PropTypes.number.isRequired,
        latitude: PropTypes.number.isRequired,
      }),
      rightAscension: PropTypes.string,
      declinaison: PropTypes.string,
      optionSelected: PropTypes.oneOf(OPTIONS).isRequired,
    }),
    // Callback to share state update with parent form like (state, requestParameters) => ()
    publishState: PropTypes.func.isRequired,
    // From mapStateToProps...
    snrState: PropTypes.shape({
      error: PropTypes.bool.isRequired,
      spatialName: PropTypes.string,
      resolvedCoordinates: PropTypes.shape({
        // if objet is not null, coordinates are required
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
      }),
    }).isRequired,
    // From mapDispatchToProps...
    // eslint-disable-next-line react/no-unused-prop-types
    resolveSpatialName: PropTypes.func.isRequired,
  }

  /** Using default props to ensure a default plugin state */
  static defaultProps = {
    state: CriterionContainer.DEFAULT_STATE,
  }

  /**
   * Is error state
   * @param {*} state
   */
  static isInError(state) {
    const {
      spatialName, coneAngle, optionSelected, rightAscension, declinaison, resolved,
    } = state
    if (optionSelected === OPTIONS_ENUM.SNR) {
      return SpatialNameHelper.isSpatialNameInError(spatialName, coneAngle, !resolved) || ConeAngleHelper.isAngleSNRInError(spatialName, coneAngle)
    }
    if (optionSelected === OPTIONS_ENUM.DIRECT_VALUES) {
      return RightAscensionHelper.isRightAscensionInError(declinaison, rightAscension, coneAngle)
        || DeclinaisonHelper.isDeclinaisonInError(declinaison, rightAscension, coneAngle)
        || ConeAngleHelper.isAngleDirectValuesInError(declinaison, rightAscension, coneAngle)
    }
    return false
  }

  /**
   * Converts state as parameter into OpenSearch request parameters
   * @param {{coneAngle: number, resolved: { longitude: number, latitude: number}, optionSelected: string, rightAscension: string, declianison: string, error: boolean}} state
   * @return {*} corresponding OpenSearch request parameters
   */
  static convertToRequestParameters({
    coneAngle, resolved, optionSelected, rightAscension, declinaison, error,
  }) {
    if (optionSelected === OPTIONS_ENUM.SNR
      && resolved && !isEmpty(coneAngle) && !error) {
      return {
        lat: resolved.latitude.toString(),
        lon: resolved.longitude.toString(),
        r: (parseFloat(coneAngle) / 2).toString(), // server expects half angle
      }
    }
    if (optionSelected === OPTIONS_ENUM.DIRECT_VALUES
      && !isEmpty(declinaison) && !isEmpty(rightAscension)
      && !isEmpty(coneAngle) && !error) {
      return {
        lat: declinaison,
        lon: SesameHelper.convertRightAscsencionToLongitude(rightAscension),
        r: (parseFloat(coneAngle) / 2).toString(), // server expects half angle
      }
    }
    // emit no request when there are errors
    return {}
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
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const {
      state: nextState, snrState: nextSNRState, publishState, resolveSpatialName,
    } = newProps
    const nextCoordinates = nextSNRState.resolvedCoordinates
    // On plugin load or when user type a spatial name we resolve coordinate
    if (!isEqual(get(oldProps, 'state.spatialName'), nextState.spatialName)) {
      // when search text changes (user is typing text), update resolve spatial name after an inactivity time ellapsed
      this.stabilityDelayer.onEvent(() => resolveSpatialName(nextState.spatialName))
    }
    if (!isEqual(nextState.resolved, nextCoordinates)) {
      const updatedState = {
        ...nextState,
        resolved: nextCoordinates,
        error: CriterionContainer.isInError({ ...nextState, resolved: nextCoordinates }),
      }
      publishState(updatedState, CriterionContainer.convertToRequestParameters(updatedState))
    }
  }

  /**
   * User callback: spatial name edited
   * @param {*} event -
   * @param {string} value user input
   */
  onSpatialNameInput = (event, value) => {
    const { publishState, state } = this.props
    const nextState = {
      ...state,
      spatialName: value,
      resolved: null,
      error: CriterionContainer.isInError({ ...state, spatialName: value, resolved: null }),
    }
    publishState(nextState, CriterionContainer.convertToRequestParameters(nextState))
  }

  /**
   * User callback: angle field input
   * @param {*} event -
   * @param {string} value user input
   */
  onAngleInput = (event, value) => {
    const { publishState, state } = this.props
    const nextState = {
      ...state,
      coneAngle: value,
      error: CriterionContainer.isInError({ ...state, coneAngle: value }),
    }
    publishState(nextState, CriterionContainer.convertToRequestParameters(nextState))
  }

  /**
   * User callback: right ascension input
   * @param {*} event -
   * @param {string} value user input
   */
  onRightAscensionInput = (event, value) => {
    const { publishState, state } = this.props
    const nextState = {
      ...state,
      rightAscension: value,
      error: CriterionContainer.isInError({ ...state, rightAscension: value }),
    }
    publishState(nextState, CriterionContainer.convertToRequestParameters(nextState))
  }

  /**
   * User callback: right ascension input
   * @param {*} event -
   * @param {string} value user input
   */
  onDeclinaisonInput = (event, value) => {
    const { publishState, state } = this.props
    const nextState = {
      ...state,
      declinaison: value,
      error: CriterionContainer.isInError({ ...state, declinaison: value }),
    }
    publishState(nextState, CriterionContainer.convertToRequestParameters(nextState))
  }

  /**
   * User callback: change option input
   * @param {*} event -
   * @param {oneOf(OPTIONS)} optionSelected option selected by user
   */
  onChangeOption = (event, optionSelected) => {
    const { publishState, state } = this.props
    const nextState = {
      ...state,
      optionSelected,
      error: CriterionContainer.isInError({ ...state, optionSelected }),
    }
    publishState(nextState, CriterionContainer.convertToRequestParameters(nextState))
  }

  render() {
    const {
      state: {
        spatialName, coneAngle, rightAscension, declinaison, optionSelected,
      }, snrState: { error }, label,
    } = this.props
    return (
      <CriterionComponent
        label={label}
        spatialName={spatialName}
        onSpatialNameInput={this.onSpatialNameInput}
        angle={coneAngle}
        onAngleInput={this.onAngleInput}
        invalidSNR={error}
        rightAscension={rightAscension}
        declinaison={declinaison}
        onRightAscensionInput={this.onRightAscensionInput}
        onDeclinaisonInput={this.onDeclinaisonInput}
        optionSelected={optionSelected}
        onChangeOption={this.onChangeOption}
      />
    )
  }
}

export default connect(
  CriterionContainer.mapStateToProps,
  CriterionContainer.mapDispatchToProps)(CriterionContainer)
