/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import map from 'lodash/map'
import TextField from 'material-ui/TextField'
import Filter from 'mdi-material-ui/Filter'
import Close from 'mdi-material-ui/Close'
import Plus from 'mdi-material-ui/PlaylistPlus'
import Minus from 'mdi-material-ui/PlaylistMinus'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import { StorageDomain } from '@regardsoss/domain'
import { StorageShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { StringComparison } from '@regardsoss/form-utils'
import {
  TableHeaderLine, TableHeaderOptionsArea, TableHeaderOptionGroup, DatePickerField, AutoCompleteTextField,
} from '@regardsoss/components'

/**
* Component to display filters on AIPListComponent
* @author Léo Mieulet
*/
class AIPListFiltersComponent extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    currentFilters: PropTypes.objectOf(PropTypes.any), // used only in onPropertiesUpdated
    isEmptySelection: PropTypes.bool.isRequired,
    sessionTags: PropTypes.arrayOf(PropTypes.string),
    searchingSessionTags: PropTypes.bool.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    dataStorages: PropTypes.arrayOf(StorageShapes.PrioritizedDataStorageContent), // used only in onPropertiesUpdated

    onApplyFilters: PropTypes.func.isRequired,
    openAddTagModal: PropTypes.func.isRequired,
    openRemoveTagModal: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * Converts filters to state
   * @param {*} filters request filters
   * @return {*} state converted from request filters
   */
  static convertFiltersToState({
    state, providerId, tags, storedOn, from, to,
  }) {
    return {
      state,
      providerId,
      tags,
      storedOn,
      from: from && new Date(from), // convert string to date (or returns undefined)
      to: to && new Date(to), // convert string to date (or returns undefined)
    }
  }

  /**
     * Converts state to filters
     * @param {*} state AIPListComponent state
     * @return {*} request filters converted from state
     */
  static convertStateToFilters({
    from, to, state, tags, providerId, storedOn,
  }) {
    return {
      state,
      providerId,
      tags,
      storedOn,
      from: from && from.toISOString(), // convert date to string
      to: to && to.toISOString(), // convert date to string
    }
  }

  state = {
    filters: {},
    orderedDataStorages: [],
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesUpdated(this.props, nextProps)


  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const { currentFilters, dataStorages } = newProps
    const newState = { ...this.state }
    // 1 - When parent current filters are updated (and different of this filters), update edition model
    // Note: that mechanism allows specifically to restore initial filters or filters externally changed
    if (!isEqual(oldProps.currentFilters, currentFilters)) {
      newState.filters = AIPListFiltersComponent.convertFiltersToState(currentFilters)
    }
    // 2 - Prepare ordered datastorages pool for selection
    if (!isEqual(oldProps.dataStorages, dataStorages)) {
      newState.selectableDataStorages = [...dataStorages].sort((str1, str2) => StringComparison.compare(
        str1.dataStorageConfiguration.label, str2.dataStorageConfiguration.label))
    }


    // Apply computed diff
    if (!isEqual(this.state, newState)) {
      this.setState(newState)
    }
  }

  /**
   * Clear all filters
   */
  handleClearFilters = () => this.props.onApplyFilters({})

  /**
   * Applies current filters
   */
  onApplyFilters = () => this.props.onApplyFilters(AIPListFiltersComponent.convertStateToFilters(this.state.filters))

  changeFrom = (newValue) => {
    this.setState({
      filters: {
        ...this.state.filters,
        from: newValue,
      },
    })
  }

  changeTo = (newValue) => {
    this.setState({
      filters: {
        ...this.state.filters,
        to: newValue,
      },
    })
  }

  changeStateFilter = (event, key, newValue) => {
    this.setState({
      filters: {
        ...this.state.filters,
        state: newValue,
      },
    })
  }

  changeProviderIdFilter = (event, newValue) => {
    this.setState({
      filters: {
        ...this.state.filters,
        providerId: newValue,
      },
    })
  }


  changeTagsFilter = (event, key, newValue) => {
    if (newValue !== null && newValue.length > 0) {
      this.setState({
        filters: {
          ...this.state.filters,
          tags: newValue,
        },
      })
    }
  }


  /**
   * On or many storages were selected, update filters state
   * @param {*} event
   * @param {string} key
   * @param {*} newValue selected storages
   */
  onStorageSelected = (event, key, newValue) => {
    this.setState({
      filters: {
        ...this.state.filters,
        storedOn: newValue,
      },
    })
  }

  onAttributeSelected = () => {
    // TODO function that do what ?
  }

  onUpdateInput = (searchText = '') => {
    //TODO function that update query session
  }

  /**
   * @return {*} Rendered filters as React components
   */
  renderFilters = () => {
    const { searchingSessionTags, sessionTags } = this.props
    const { intl: { formatMessage, locale }, moduleTheme: { filter } } = this.context
    const { selectableDataStorages } = this.state // get ordered data storages list
    return (
      <TableHeaderLine key="filtersLine">
        <TableHeaderOptionsArea key="filtersArea" reducible alignLeft>
          <TableHeaderOptionGroup key="second">
            { /* Session selector */ }
            <AutoCompleteTextField
              name="attributeSelector"
              currentHintText=""
              currentHints={[{ id: '0', text: 'test', value: 'boom' },{ id: '1', text: 'testy', value: 'boom2' }]}
              onUpdateInput={this.onUpdateInput}
              onFilterSelected={this.onAttributeSelected}
            />
            { /* AIP data storage (as multiple choices) */ }
            <SelectField
              style={filter.fieldStyle}
              hintText={formatMessage({
                id: 'oais.aips.list.filters.data.storage.label',
              })}
              value={get(this.state, 'filters.storedOn', [])}
              onChange={this.onStorageSelected}
              multiple
            >
              {selectableDataStorages.map(storage => (<MenuItem
                key={storage.id}
                value={storage.id}
                primaryText={storage.dataStorageConfiguration.label}
              />))}
            </SelectField>
            { /* AIP status (as single choice) */ }
            <SelectField
              style={filter.fieldStyle}
              hintText={formatMessage({ id: 'oais.aips.list.filters.status.label' })}
              value={get(this.state, 'filters.state', null)}
              onChange={this.changeStateFilter}
            >
              <MenuItem value={null} primaryText="" />
              {StorageDomain.AIP_STATUS.map(status => (<MenuItem
                key={status}
                value={status}
                primaryText={formatMessage({
                  id: status,
                })}
              />))}
            </SelectField>
            { /* AIP provider ID (input field) */ }
            <TextField
              value={get(this.state, 'filters.providerId', '')}
              onChange={this.changeProviderIdFilter}
              hintText={formatMessage({ id: 'oais.aips.list.filters.providerId.label' })}
              style={filter.fieldStyle}
            />
          </TableHeaderOptionGroup>

          { /* AIP status (as multiple choices) */
            !searchingSessionTags ? (
              <TableHeaderOptionGroup key="tags">
                <SelectField
                  style={filter.fieldStyle}
                  hintText={formatMessage({
                    id: 'oais.aips.list.filters.tag.label',
                  })}
                  value={get(this.state, 'filters.tags', [])}
                  onChange={this.changeTagsFilter}
                  multiple
                >
                  {map(sessionTags, tag => (<MenuItem
                    key={tag}
                    value={tag}
                    primaryText={tag}
                  />))}
                </SelectField>
              </TableHeaderOptionGroup>
            ) : null}
          { /* AIP Dates selectors */ }
          <TableHeaderOptionGroup>
            <DatePickerField
              value={get(this.state, 'filters.from', undefined)}
              dateHintText={formatMessage({
                id: 'oais.aips.list.filters.from.label',
              })}
              onChange={this.changeFrom}
              locale={locale}
            />
            <DatePickerField
              value={this.state.filters.to}
              defaultTime="23:59:59"
              dateHintText={formatMessage({ id: 'oais.aips.list.filters.to.label' })}
              onChange={this.changeTo}
              locale={locale}
            />
          </TableHeaderOptionGroup>
        </TableHeaderOptionsArea>
      </TableHeaderLine>
    )
  }


  renderRefreshLine = () => (
    <TableHeaderLine key="buttonsLine">
      <TableHeaderOptionsArea>
        <TableHeaderOptionGroup>
          <FlatButton
            key="add tag"
            label={this.context.intl.formatMessage({ id: 'oais.aips.list.add-tag.button' })}
            icon={<Plus />}
            disabled={this.props.isEmptySelection}
            onClick={this.props.openAddTagModal}
          />
          <FlatButton
            key="remove tag"
            label={this.context.intl.formatMessage({ id: 'oais.aips.list.remove-tag.button' })}
            icon={<Minus />}
            disabled={this.props.isEmptySelection}
            onClick={this.props.openRemoveTagModal}
          />
        </TableHeaderOptionGroup>
      </TableHeaderOptionsArea>
      <TableHeaderOptionsArea key="buttonArea">
        <TableHeaderOptionGroup>
          <FlatButton
            key="clear"
            label={this.context.intl.formatMessage({ id: 'oais.aips.session.clear.filters.button' })}
            icon={<Close />}
            disabled={
              !get(this.state, 'filters.from')
              && !get(this.state, 'filters.state')
              && !get(this.state, 'filters.tags')
              && !get(this.state, 'filters.providerId')
              && !get(this.state, 'filters.dataStorages', []).length
            }
            onClick={this.handleClearFilters}
          />
          <FlatButton
            key="apply"
            label={this.context.intl.formatMessage({ id: 'oais.aips.session.apply.filters.button' })}
            icon={<Filter />}
            onClick={this.onApplyFilters}
          />
        </TableHeaderOptionGroup>
      </TableHeaderOptionsArea>
    </TableHeaderLine>
  )

  render() {
    return [
      this.renderFilters(),
      this.renderRefreshLine(),
    ]
  }
}
export default AIPListFiltersComponent
