/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { FormattedMessage } from 'react-intl'
import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'
import { PluginCriterionContainer } from '@regardsoss/plugins-api'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

export class ExampleCriteriaComponent extends PluginCriterionContainer {
  static propTypes = {
    // parent props
    ...PluginCriterionContainer.propTypes,
    // From mapStateToProps
    test: PropTypes.bool,
    // From mapDispatchToProps
    /**
     * Just for checking that  we can dispatch an action from the plugin
     */
    testDispatch: PropTypes.func,
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

  componentDidMount() {
    this.props.testDispatch()
  }

  changeValue = (value) => {
    this.props.onChange({
      attribute: this.props.attributes.searchField,
      comparator: 'EQ',
      value,
    }, this.props.pluginInstanceId)
    this.setState({
      value,
    })
  }

  getPluginSearchQuery = (state) => {
    let openSearchQuery = ''
    if (state.value && state.value.length > 0) {
      openSearchQuery = `"${state.value}"`
    }
    return openSearchQuery
  }

  handleClear = () => {
    this.changeValue('')
  }

  render() {
    const attributeLabel = this.props.attributes.searchField.name ? this.props.attributes.searchField.name : null
    const { moduleTheme: { rootStyle, labelSpanStyle, textFieldStyle } } = this.context

    return (
      <div style={rootStyle}>
        <span style={labelSpanStyle} >
          {attributeLabel}
        </span>
        <TextField
          id="search"
          floatingLabelText={<FormattedMessage id="criterion.search.field.label" />}
          value={this.state.value}
          onChange={(event, value) => {
            this.changeValue(value)
          }}
          style={textFieldStyle}
        />
      </div>
    )
  }
}
const mapStateToProps = state => ({
  test: state['plugins.string-criteria'].pluginTest.pluginTest,
})
const mapDispatchToProps = dispatch => ({
  testDispatch: () => dispatch({ type: 'plugin/TEST' }),
})

export default connect(mapStateToProps, mapDispatchToProps)(ExampleCriteriaComponent)
