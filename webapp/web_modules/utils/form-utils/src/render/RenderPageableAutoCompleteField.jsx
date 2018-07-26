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
import values from 'lodash/values'
import get from 'lodash/get'
import map from 'lodash/map'
import { connect } from '@regardsoss/redux'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import { withModuleStyle, themeContextType } from '@regardsoss/theme'
import RenderAutoCompleteField from './RenderAutoCompleteField'
import styles from '../styles'
import messages from '../i18n/Locales'

/**
* A redux form renderer to display a AutoComplete field with pageable entities from server
* @author Sébastien Binda
*/
class RenderPageableAutoCompleteField extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, ownProps) {
    return {}
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps(dispatch, ownProps) {
    return {
      fetchEntities: queryParams => dispatch(ownProps.entityActions.fetchPagedEntityList(0, ownProps.pageSize, {}, queryParams)),
    }
  }

  static propTypes = {
    fullWidth: PropTypes.bool,
    hintText: PropTypes.string.isRequired,
    floatingLabelText: PropTypes.string,
    onSelect: PropTypes.func,
    // eslint-disable-next-line react/no-unused-prop-types
    pageSize: PropTypes.number.isRequired,
    // eslint-disable-next-line react/forbid-prop-types, react/no-unused-prop-types
    entityActions: PropTypes.object,
    entitiesPayloadKey: PropTypes.string.isRequired,
    entitiesConfig: PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
    entitiesFilterProperty: PropTypes.string.isRequired,
    validate: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.func), PropTypes.func]),
    // From redux field
    input: PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
      ]),
      name: PropTypes.string,
    }),
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string,
    }),
    // from mapDispatchToProps
    fetchEntities: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    searchText: '',
    isLoading: false,
    entities: [],
    inputUpdateTimeout: null,
  }

  componentDidMount() {
    this.searchEntities()
  }

  /**
   * Set the search text into the search field and wait for user ends to enter the full text he wants before sending filter request
   * to server.
   * @param {*} searchText: filter text given by user
   */
  onUpdateInput = (searchText) => {
    this.setState({
      searchText,
    }, () => {
      if (this.state.inputUpdateTimeout) {
        clearTimeout(this.state.inputUpdateTimeout)
      }
      this.setState({
        inputUpdateTimeout: setTimeout(() => this.searchEntities(searchText), 400),
      })
    })
  }

  searchEntities = (searchText) => {
    this.setState({
      isLoading: true,
    }, () => {
      this.props.fetchEntities(searchText ? { [this.props.entitiesFilterProperty]: searchText } : {}).then((actionResults) => {
        const entities = values(get(actionResults, `payload.entities.${this.props.entitiesPayloadKey}`, {})) || []
        this.setState({
          entities,
          isLoading: false,
        })
      })
    })
  }

  render() {
    const { intl, intl: { formatMessage } } = this.context
    const {
      input, meta, fullWidth, floatingLabelText, hintText, validate, entitiesConfig, onSelect,
    } = this.props
    const { isLoading, searchText } = this.state
    const dsContents = map(this.state.entities, d => d.content)
    const loadingDatasource = [formatMessage({ id: 'render.pageableAutoCompleteField.loading' })]
    const ds = isLoading ? loadingDatasource : dsContents
    const dsConfig = isLoading ? undefined : entitiesConfig
    return (
      <RenderAutoCompleteField
        input={input}
        meta={meta}
        fullWidth={fullWidth}
        hintText={hintText}
        floatingLabelText={floatingLabelText}
        onNewRequest={onSelect}
        searchText={searchText}
        onUpdateInput={this.onUpdateInput}
        dataSource={ds}
        dataSourceConfig={dsConfig}
        enableOnlyDatasourceValues
        validate={validate}
        intl={intl}
      />
    )
  }
}
const connected = connect(
  RenderPageableAutoCompleteField.mapStateToProps,
  RenderPageableAutoCompleteField.mapDispatchToProps,
)(RenderPageableAutoCompleteField)

export default withI18n(messages)(withModuleStyle(styles)(connected))
