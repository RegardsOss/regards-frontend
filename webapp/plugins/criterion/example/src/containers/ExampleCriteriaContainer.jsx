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
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import ShoppingIcon from 'material-ui/svg-icons/action/shopping-basket'
import NapIcon from 'material-ui/svg-icons/content/weekend'
import { connect } from 'react-redux'
import { PluginCriterionContainer, PluginsClientsMap } from '@regardsoss/plugins-api'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import buildExampleClient from '../clients/example/ExampleClientBuilder'

export class ExampleCriteriaContainer extends PluginCriterionContainer {
  /**
   * Stores clients map for each client and plugin instance ID, to avoid building new instances each
   * time mapStateToProps and mapDispatchToProps are called
   */
  static CLIENTS_MAP = new PluginsClientsMap()

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { pluginInstanceId }) {
    // 1 - get selectors for this plugin instance ID
    const exampleSelectors = ExampleCriteriaContainer.CLIENTS_MAP.getClient(buildExampleClient, pluginInstanceId).selectors
    // 2 - select in state fetching data (state and results)
    return {
      // we select here the current to do value
      currentTodo: exampleSelectors.getTodo(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch, { pluginInstanceId }) {
    // 1 - get actions for this plugin instance ID
    const exampleActions = ExampleCriteriaContainer.CLIENTS_MAP.getClient(buildExampleClient, pluginInstanceId).actions
    return {
      // Note here the use of dispatch method, that is connected with Redux system
      setTodo: todo => dispatch(exampleActions.doSomething(todo)),
    }
  }

  static propTypes = {
    // parent props
    ...PluginCriterionContainer.propTypes,
    // From mapStateToProps
    currentTodo: PropTypes.string,
    // From mapDispatchToProps
    setTodo: PropTypes.func.isRequired,
  }

  static contextTypes = {
    // enable plugin theme access through this.context
    ...themeContextType,
    // enable i18n access trhough this.context
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    this.state = { // note: this local state could also be set in redux store
      value: '',
    }
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
    const { currentTodo, setTodo } = this.props
    const attributeLabel = this.props.attributes.searchField.name ? this.props.attributes.searchField.name : null
    const { intl: { formatMessage }, moduleTheme: { rootStyle, labelSpanStyle, textFieldStyle } } = this.context

    return (
      <div style={rootStyle}>
        <span style={labelSpanStyle}>
          {attributeLabel}
        </span>
        <TextField
          id="search"
          // Note: getFieldHintText provides a short label for plugins fields, according with BOUND_TYPE:
          // BOUND_TYPE.NONE: Only attribute type
          // BOUND_TYPE.LOWER_BOUND: ">= {Min found value for attribute}" if lower bound was found, attribute type otherwise
          // BOUND_TYPE.UPPER_BOUND: "<= {Max found value for attribute}" if upper bound was found, attribute type otherwise
          // BOUND_TYPE.ANY_BOUND: "[{min value}; {max value}]" if one of thoses were found, attribute type otherwise
          // Here, as specified in plugin-info.json, we are working with STRING attribute type ad therefore attribute
          // cannot have bounds. Hence only BOUND_TYPE.NONE makes sense
          floatingLabelText={this.getFieldHintText('searchField', PluginCriterionContainer.BOUND_TYPE.NONE)}
          title={this.getFieldTooltip('searchField')}
          value={this.state.value}
          onChange={(event, value) => {
            this.changeValue(value)
          }}
          style={textFieldStyle}
        />
        {/* Demonstrate the redux usage through 2 actions dispatcher and one displayer */}
        <IconButton onClick={() => setTodo('example.criterion.todo.shopping')}>
          <ShoppingIcon />
        </IconButton>
        <IconButton onClick={() => setTodo('example.criterion.todo.nap')}>
          <NapIcon />
        </IconButton>
        { /** Show current to do if any or default message */
          currentTodo
            ? formatMessage({ id: 'example.criterion.current.todo' }, {
              todo: formatMessage({ id: currentTodo }), // internationalized the message parameter (see i18n files)
            })
            : formatMessage({ id: 'example.criterion.no.todo' }) // NONE
        }
      </div>
    )
  }
}

// We need here to connect the container with store so that mapStateToProps and mapDispatchToProps will be called by Redux system
export default connect(
  ExampleCriteriaContainer.mapStateToProps,
  ExampleCriteriaContainer.mapDispatchToProps)(ExampleCriteriaContainer)
