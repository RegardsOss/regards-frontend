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
import { CatalogDomain, CommonDomain } from '@regardsoss/domain'
import { UIShapes } from '@regardsoss/shape'
import { AttributeModelWithBounds, NumberRange } from '@regardsoss/plugins-api'
import isNil from 'lodash/isNil'
import { parseFloat } from 'window-or-global'
import CriterionComponent from '../components/CriterionComponent'

/**
  * Search form criteria plugin
  *
  * @author Théo Lasserre
  */
export class CriterionContainer extends React.Component {
  /** Default state */
  static DEFAULT_STATE = {
    error: false,
    value: '',
    operator: CommonDomain.EnumNumericalComparator.EQ,
  }

   static propTypes = {
     /** Configuration attributes, by attributes logical name (see plugin-info.json) */
     attributes: PropTypes.shape({
       lowerBound: AttributeModelWithBounds.isRequired,
       upperBound: AttributeModelWithBounds.isRequired,
     }).isRequired,
     // configured plugin label, where object key is locale and object value message
     label: UIShapes.IntlMessage.isRequired,
     // state shared and consumed by this criterion
     state: PropTypes.shape({
       error: PropTypes.bool.isRequired,
       value: PropTypes.string,
       operator: PropTypes.oneOf(CommonDomain.EnumNumericalComparators).isRequired,
     }),
     // Callback to share state update with parent form like (state, requestParameters) => ()
     publishState: PropTypes.func.isRequired,
   }

   /** Using default props to ensure a default plugin state */
  static defaultProps = {
    state: CriterionContainer.DEFAULT_STATE,
  }

   /** Available comparison operators */
   static AVAILABLE_COMPARATORS = [
     CommonDomain.EnumNumericalComparator.SL,
     CommonDomain.EnumNumericalComparator.EQ,
     CommonDomain.EnumNumericalComparator.SG,
   ]

   /**
    * Is error state with text and operator as parameter? In error when:
    * (pre) : there is an input text and selected operator AND
    * A - There is some some text but is cannot be parsed into a valid number value (OR)
    * B - The number value is valid but outside attributes bounds
    * @param {*} attribute matching AttributeModelWithBounds shape
    * @param {string} text input text
    * @param {string} operator selected operator, from CommonDomain.EnumNumericalComparator
    */
   static isInError(lowerBound, upperBound, text, operator) {
     const value = parseFloat(text)
     // No error when no input
     if (isNil(text)) {
       return false
     }
     switch (operator) {
       case CommonDomain.EnumNumericalComparator.SL:
         return value < lowerBound.boundsInformation.lowerBound
       case CommonDomain.EnumNumericalComparator.SG:
         return value > upperBound.boundsInformation.upperBound
       case CommonDomain.EnumNumericalComparator.EQ:
         return !(value >= lowerBound.boundsInformation.lowerBound && value <= upperBound.boundsInformation.upperBound)
       default:
         return false
     }
   }

   /**
    * Converts state as parameter into OpenSearch request parameters
    * @param {{value: number, operator: string}} plugin state
    * @param {*} attribute criterion attribute
    * @return {*} corresponding OpenSearch request parameters
    */
   static convertToRequestParameters({ error, value, operator }, lowerBound, upperBound) {
     switch (operator) {
       case CommonDomain.EnumNumericalComparator.SL:
         return error || !value ? {} : {
           q: NumberRange.getNumberQueryParameter(lowerBound.jsonPath,
             NumberRange.convertToRange(parseFloat(value), operator)).toQueryString(),
         }
       case CommonDomain.EnumNumericalComparator.SG:
         return error || !value ? {} : {
           q: NumberRange.getNumberQueryParameter(upperBound.jsonPath,
             NumberRange.convertToRange(parseFloat(value), operator)).toQueryString(),
         }
       case CommonDomain.EnumNumericalComparator.EQ:
         return error || !value ? {} : {
           q: new CatalogDomain.OpenSearchQuery([
             NumberRange.getNumberQueryParameter(lowerBound.jsonPath, new NumberRange(null, parseFloat(value))),
             NumberRange.getNumberQueryParameter(upperBound.jsonPath, new NumberRange(parseFloat(value), null)),
           ]).toQueryString(),
         }
       default:
         return null
     }
   }

   /**
    * Callback function: user input a new number value
    *
    * @param {*} event original event
    * @param {string} value new input text
    */
   onTextChange = (event, value) => {
     // update state value and publish new state with query
     const { publishState, attributes: { lowerBound, upperBound }, state: { operator } } = this.props
     const nextState = {
       error: CriterionContainer.isInError(lowerBound, upperBound, value, operator),
       value,
       operator,
     }
     publishState(nextState, CriterionContainer.convertToRequestParameters(nextState, lowerBound, upperBound))
   }

   /**
    * Callback function: user selected another operator
    * @param {string} operator operator from EnumNumericalComparator
    */
   onOperatorSelected = (operator) => {
     // update state opetarator and publish new state with query
     const { publishState, attributes: { lowerBound, upperBound }, state: { value } } = this.props
     const nextState = {
       error: CriterionContainer.isInError(lowerBound, upperBound, value, operator),
       value,
       operator,
     }
     publishState(nextState, CriterionContainer.convertToRequestParameters(nextState, lowerBound, upperBound))
   }

   render() {
     const { label, attributes: { lowerBound, upperBound }, state: { error, value, operator } } = this.props
     return (
       <CriterionComponent
         label={label}
         lowerBound={lowerBound}
         upperBound={upperBound}
         error={error}
         value={value}
         operator={operator}
         availableComparators={CriterionContainer.AVAILABLE_COMPARATORS}
         onTextChange={this.onTextChange}
         onOperatorSelected={this.onOperatorSelected}
       />
     )
   }
}

export default CriterionContainer
