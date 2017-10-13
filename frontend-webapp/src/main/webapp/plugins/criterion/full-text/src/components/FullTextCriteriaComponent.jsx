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
import { FormattedMessage } from 'react-intl'
import TextField from 'material-ui/TextField'
import { DataManagementShapes } from '@regardsoss/shape'
import { PluginCriterionContainer } from '@regardsoss/plugins-api'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { ClearFieldButton } from '@regardsoss/components'

class FullTextCriteriaComponent extends PluginCriterionContainer {

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

  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }
  }

  changeValue = (value) => {
    this.setState({ value })
  }

  getPluginSearchQuery = (state) => {
    let openSearchQuery = ''
    if (state.value && state.value.length > 0) {
      openSearchQuery = `"${state.value}"`
    }
    return openSearchQuery
  }

  /**
   * Clear the entered value
   */
  handleClear = () => this.changeValue('')

  render() {
    const { moduleTheme: { rootStyle, textFieldStyle } } = this.context
    const clearButtonDisplayed = this.state.value !== ''

    return (
      <div style={rootStyle}>
        <TextField
          id="search"
          floatingLabelText={<FormattedMessage id="criterion.search.field.label" />}
          value={this.state.value}
          onChange={(event, value) => {
            this.changeValue(value)
          }}
          style={textFieldStyle}
        />
        <ClearFieldButton onTouchTap={this.handleClear} displayed={clearButtonDisplayed} />
      </div>
    )
  }
}

export default FullTextCriteriaComponent
