/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { FormattedMessage } from 'react-intl'
import TemporalCriteriaComponent from './TemporalCriteriaComponent'
import ClearButton from './ClearButton'
import AttributeModel from '../common/AttributeModel'
import EnumTemporalComparator from '../model/EnumTemporalComparator'
import PluginComponent from '../common/PluginComponent'

/**
 * Component allowing the user to configure the temporal value of a single attribute with two date comparators (before, after, ...).
 * For example, it will display:
 *   23/02/2017 08:00 < [attributeName] < 23/02/2017 12:00
 *
 * The plugin's output is the execution of the passed {@code onChange} prop.
 *
 * @author Xavier-Alexandre Brochard
 */
export class TwoTemporalCriteriaComposedComponent extends PluginComponent {

  static propTypes = {
    /**
     * List of attributes associated to the plugin.
     * Keys of this object are the "name" props of the attributes defined in the plugin-info.json
     * Value of each keys are the attribute id (retrieved from the server) associated
     */
    attributes: React.PropTypes.objectOf(AttributeModel),
  }

  state = {
    firstField: undefined,
    secondField: undefined,
  }

  changeValue1 = (value) => {
    this.setState({
      firstField: value,
    })
  }

  changeValue2 = (value) => {
    this.setState({
      secondField: value,
    })
  }

  getPluginSearchQuery = (state) => {
    const { firstField, secondField } = state
    const lvalue1 = firstField ? firstField.toISOString() : '*'
    const lvalue2 = secondField ? secondField.toISOString() : '*'
    let searchQuery = ''
    if (firstField || secondField) {
      searchQuery = `${this.getAttributeName('firstField')}:[${lvalue1} TO ${lvalue2}]`
    }
    return searchQuery
  }

  parseOpenSearchQuery = (parameterName, openSearchQuery) => {
    let date = null
    const groups = openSearchQuery.match(/\[[ ]{0,1}([^ ]*) TO ([^ ]*)[ ]{0,1}\]/)
    if (groups.length === 3) {
      if (parameterName === 'firstField') {
        date= new Date(groups[1])
      } else {
        date = new Date(groups[2])
      }
      if (isNaN(date.getTime())){
        date = null
      }
    }
    return date
  }

  /**
   * Clear the entered values
   */
  handleClear = () => {
    this.changeValue1(undefined)
    this.changeValue2(undefined)
  }

  render() {
    const { firstField, secondField } = this.state
    const clearButtonDisplayed = !isNil(firstField) || !isNil(secondField)

    return (
      <div style={{ display: 'flex' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <span style={{ margin: '0px 10px' }}>
            <FormattedMessage id="criterion.aggregator.between"
                              values={{label: this.getAttributeLabel('firstField')}}
            />
          </span>
          <TemporalCriteriaComponent
            label={this.getAttributeLabel('firstField')}
            comparator={EnumTemporalComparator.GE}
            value={firstField}
            onChange={this.changeValue1}
            hideAttributeName
            hideComparator
          />
          <FormattedMessage id="criterion.aggregator.and"/>
          <TemporalCriteriaComponent
            label={this.getAttributeLabel('secondField')}
            comparator={EnumTemporalComparator.LE}
            value={secondField}
            onChange={this.changeValue2}
            hideAttributeName
            hideComparator
          />
          <ClearButton onTouchTap={this.handleClear} displayed={clearButtonDisplayed}/>
        </div>
      </div>
    )
  }
}

export default TwoTemporalCriteriaComposedComponent
