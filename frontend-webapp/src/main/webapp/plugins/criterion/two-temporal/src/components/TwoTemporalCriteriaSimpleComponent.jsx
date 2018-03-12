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
import isNaN from 'lodash/isNaN'
import merge from 'lodash/merge'
import isEqual from 'lodash/isEqual'
import Arrow from 'material-ui/svg-icons/navigation/arrow-forward'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { DataManagementShapes } from '@regardsoss/shape'
import { PluginCriterionContainer } from '@regardsoss/plugins-api'
import TemporalCriteriaComponent from './TemporalCriteriaComponent'

/**
 * Component allowing the user to configure the temporal value of two different attributes.
 * For example, it will display:
 *   [attributeName1] / [attributeName2] : 23/02/2017 08:00 → 23/02/2017 12:00
 *
 * @author Xavier-Alexandre Brochard
 */
export class TwoTemporalCriteriaSimpleComponent extends PluginCriterionContainer {
  static propTypes = {
    // parent props
    ...PluginCriterionContainer.propTypes,
    /**
     * List of attributes associated to the plugin.
     * Keys of this object are the "name" props of the attributes defined in the plugin-info.json
     * Value of each keys are the attribute id (retrieved from the server) associated
     */
    attributes: DataManagementShapes.AttributeModelList,
  }

  static contextTypes = {
    // enable plugin theme access through this.context
    ...themeContextType,
    // enable i18n access trhough this.context
    ...i18nContextType,
  }

  state = {
    firstField: undefined,
    secondField: undefined,
  }

  componentWillMount() {
    const defaultState = this.props.getDefaultState(this.props.pluginInstanceId)
    if (this.state && defaultState) {
      const newState = merge({}, this.state, defaultState)
      this.setState(newState)
    }

    const initValues = {}
    const firstFieldValue = this.getAttributeInitValue('firstField', this.props)
    const secondFieldValue = this.getAttributeInitValue('secondField', this.props)
    // Invert second and first field
    if (firstFieldValue) {
      initValues.secondField = this.parseOpenSearchQuery('firstField', firstFieldValue)
    }
    if (secondFieldValue) {
      initValues.firstField = this.parseOpenSearchQuery('secondField', secondFieldValue)
    }

    this.setState(initValues)
    this.props.registerClear(this.handleClear)
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.initialValues, nextProps.initialValues)) {
      // If initial value change from this props to new ones, update state with the new attribute values

      const initValues = {}
      const firstFieldValue = this.getAttributeInitValue('firstField', nextProps)
      const secondFieldValue = this.getAttributeInitValue('secondField', nextProps)
      // Invert second and first field
      if (firstFieldValue) {
        initValues.secondField = this.parseOpenSearchQuery('firstField', firstFieldValue)
      }
      if (secondFieldValue) {
        initValues.firstField = this.parseOpenSearchQuery('secondField', secondFieldValue)
      }

      this.setState(initValues)
    }
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
    let searchQuery = ''
    if (state.firstField) {
      searchQuery = this.criteriaToOpenSearchFormat('secondField', state.firstField, true)
    }
    if (state.secondField) {
      if (searchQuery && searchQuery.length > 0) {
        searchQuery = `${searchQuery} AND `
      }
      const searchQuery2 = this.criteriaToOpenSearchFormat('firstField', state.secondField, false)
      searchQuery = `${searchQuery}${searchQuery2}`
    }
    return searchQuery
  }

  /**
   * Format criterion to openSearch format for plugin handler
   * @param attribute
   * @param value
   * @param isStart
   * @returns {string}
   */
  criteriaToOpenSearchFormat = (attribute, value, isStart) => {
    let openSearchQuery = ''
    if (value) {
      switch (isStart) {
        case false:
          openSearchQuery = `${this.getAttributeName(attribute)}:[* TO ${value.toISOString()}]`
          break
        case true:
          openSearchQuery = `${this.getAttributeName(attribute)}:[${value.toISOString()} TO *]`
          break
        default:
          openSearchQuery = ''
      }
    }
    return openSearchQuery
  }

  /**
   * Clear all fields
   */
  handleClear = () => {
    this.changeValue1(undefined)
    this.changeValue2(undefined)
  }

  parseOpenSearchQuery = (parameterName, openSearchQuery) => {
    if (openSearchQuery.includes('[')) {
      const values = openSearchQuery.match(/\[[ ]{0,1}([^ ]*) TO ([^ ]*)[ ]{0,1}\]/)
      if (values.length === 3) {
        const value = values[1] !== '*' ? values[1] : values[2]
        const date = new Date(value)
        return isNaN(date.getTime()) ? null : date
      }
    }
    return undefined
  }

  render() {
    const { firstField, secondField } = this.state
    const {
      moduleTheme: {
        rootStyle, lineStyle, labelSpanStyle, lineGroupStyle,
      },
    } = this.context

    return (
      <div style={rootStyle}>
        <div style={lineStyle}>
          <span style={labelSpanStyle}>
            {this.getAttributeLabel('firstField')} / {this.getAttributeLabel('secondField')} :
          </span>
          <div style={lineGroupStyle}>
            <TemporalCriteriaComponent
              label={this.getAttributeLabel('firstField')}
              value={firstField}
              onChange={this.changeValue1}
              hideAttributeName
            />
            <Arrow />
            <TemporalCriteriaComponent
              label={this.getAttributeLabel('secondField')}
              value={secondField}
              onChange={this.changeValue2}
              hideAttributeName
              isStopDate
            />
          </div>
        </div>
      </div>
    )
  }
}

export default TwoTemporalCriteriaSimpleComponent
