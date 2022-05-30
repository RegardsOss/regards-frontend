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
import isNil from 'lodash/isNil'
import TextField from 'material-ui/TextField'
import { CommonDomain } from '@regardsoss/domain'
import { UIShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { NumericalComparatorSelector } from '@regardsoss/components'
import {
  AttributeModelWithBounds,
} from '@regardsoss/plugins-api'

/**
  * Main criterion component
  * @author Théo Lasserre
  */
class CriterionComponent extends React.Component {
   static propTypes = {
     label: UIShapes.IntlMessage.isRequired,
     lowerBound: AttributeModelWithBounds.isRequired,
     upperBound: AttributeModelWithBounds.isRequired,
     error: PropTypes.bool.isRequired,
     value: PropTypes.string,
     operator: PropTypes.oneOf(CommonDomain.EnumNumericalComparators).isRequired,
     availableComparators: PropTypes.arrayOf(PropTypes.oneOf(CommonDomain.EnumNumericalComparators)).isRequired,
     onTextChange: PropTypes.func.isRequired,
     onOperatorSelected: PropTypes.func.isRequired,
   }

   static contextTypes = {
     // enable plugin theme access through this.context
     ...themeContextType,
     // enable i18n access trhough this.context
     ...i18nContextType,
   }

   /** Error text placeholder (used to display empty error on text field) */
   static ERROR_TEXT_PLACEHOLDER = ' '

   render() {
     const {
       label, lowerBound, upperBound,
       error, value, operator, availableComparators,
       onTextChange, onOperatorSelected,
     } = this.props
     const { intl, muiTheme } = this.context

     // compute no value state with attribute bounds
     const hasNovalue = isNil(lowerBound) && isNil(upperBound)
     return (
       <tr>
         {/* 1. label */}
         <td style={muiTheme.module.searchResults.searchPane.criteria.firstCell}>
           {`${label[intl.locale]}`}
         </td>
         {/* 2. Comparison selector */}
         <td style={muiTheme.module.searchResults.searchPane.criteria.nextCell}>
           <NumericalComparatorSelector
             operator={operator}
             operators={availableComparators}
             onSelect={onOperatorSelected}
             disabled={hasNovalue}
           />
         </td>
         {/* 3. input box */}
         <td style={muiTheme.module.searchResults.searchPane.criteria.nextCell}>
           <TextField
             hintText={`[${lowerBound.boundsInformation.lowerBound}, ${upperBound.boundsInformation.upperBound}]`}
             errorText={error ? CriterionComponent.ERROR_TEXT_PLACEHOLDER : null}
             value={value}
             onChange={onTextChange}
             disabled={hasNovalue}
             fullWidth
           />
         </td>
       </tr>
     )
   }
}
export default CriterionComponent
