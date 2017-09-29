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
import React from 'react'
import replace from 'lodash/replace'
import { FormattedMessage } from 'react-intl'
import TextField from 'material-ui/TextField'
import { DataManagementShapes } from '@regardsoss/shape'
import { PluginContainer } from '@regardsoss/plugins'

export class SampleCriteria extends PluginContainer {

  static propTypes = {
    /**
     * List of attributes associated to the plugin.
     * Keys of this object are the "name" props of the attributes defined in the plugin-info.json
     * Value of each keys are the attribute id (retrieved from the server) associated
     */
    attributes: DataManagementShapes.AttributeModelList,
  }

  /**
   * Class constructor
   * @param props
   */
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }
  }

  /**
   * Method to change the value of the field
   *
   * @param value
   */
  changeValue = (value) => {
    this.setState({ value })
  }

  /**
   * Method to create openSearch request associated to the current criteria
   *
   * @param state
   * @returns {string}
   */
  getPluginSearchQuery = (state) => {
    const attributeName = this.getAttributeName('searchField')
    let openSearchQuery = ''
    if (state.value && state.value.length > 0) {
      // Create openSearch query by adding " characters around the requested value
      openSearchQuery = `${attributeName}:"${state.value}"`
    }
    return openSearchQuery
  }

  parseOpenSearchQuery = (parameterName, openSearchQuery) =>
    // Return the value without the additional " characters
    replace(openSearchQuery, /"/g)

  /**
   * Method to display search criteria
   */
  render() {
    const attributeLabel = this.getAttributeLabel('searchField')

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            margin: '0px 10px',
          }}
        >
          {attributeLabel}
        </span>
        <TextField
          id="search"
          floatingLabelText={<FormattedMessage id="criterion.search.field.label" />}
          value={this.state.value}
          onChange={(event, value) => {
            this.changeValue(value)
          }}
          style={{
            top: -13,
            margin: '0px 10px',
            maxWidth: 165,
          }}
        />
      </div>
    )
  }
}
export default SampleCriteria
