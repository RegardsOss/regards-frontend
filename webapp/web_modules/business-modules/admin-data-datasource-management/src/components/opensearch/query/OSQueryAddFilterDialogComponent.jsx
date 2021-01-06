/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEqual from 'lodash/isEqual'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'
import makeSelectable from 'material-ui/List/makeSelectable'
import FlatButton from 'material-ui/FlatButton'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { DescriptorHelper } from '../../../domain/opensearch/DescriptorHelper'

const SelectableList = makeSelectable(List)

/**
 * Dialog component to add a request filter in OpenSearch crawler request configuration
 *
 * @author Raphaël Mechali
 */
class OSQueryAddFilterDialogComponent extends React.Component {
  static propTypes = {
    // Available parameters on OpenSearch API
    availableParameters: PropTypes.arrayOf(DataManagementShapes.OpenSearchURLParameterDescription).isRequired,
    // filters already added
    selectedFilters: PropTypes.arrayOf(DataManagementShapes.OpenSearchURLParameterDescription),
    // is currently open?
    open: PropTypes.bool.isRequired,
    // Dialog close callback: () => ()
    onClose: PropTypes.func.isRequired,
    // Add confirm callback: (filter) => ()
    onConfirmAddFilter: PropTypes.func.isRequired,
  }

  static defaultProps = {
    selectedFilters: [],
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /** Possible attributes (present or not) of a request parameter to be used as filter (note that corresponding keys must be declared in messages)  */
  static FILTER_PARAMETER_ATTRIBUTES = [
    'name',
    'value',
    'title',
    'minInclusive',
    'minExclusive',
    'maxInclusive',
    'maxExclusive',
    'pattern',
  ]

  state = {
    // filter text, to filter request parameters list
    filterText: '',
    // currently selected filter
    selectedFilter: null,
    // currently available filters
    availableFilters: [],
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    if (!isEqual(oldProps.availableParameters, newProps.availableParameters) || !isEqual(oldProps.selectedFilters, newProps.selectedFilter)) {
      // update filters state when available or selected filters change
      this.onFiltersUpdated(this.state.filterText, newProps.availableParameters, newProps.selectedFilters)
    }
  }

  /**
   * Filters (list or filter text) were updated, update both in state and selected selectedFilter if not found anymore
   * @param {string} filterText filter text as input by the user
   * @param {*} urlDescriptor OpenSearch URL descriptor (see props for shape)
   * @param {[*]} selectedFilters selected filters (see props for shape)
   *
   */
  onFiltersUpdated = (filterText = '', availableParameters = [], selectedFilters = []) => {
    const { selectedFilter } = this.state
    const availableFilters = availableParameters
      // Remove if filtered by text or already selected
      .filter((filter) => (!filterText || filter.name.toLowerCase().includes(filterText))
        && !selectedFilters.some((addedFilter) => addedFilter.name === filter.name))
    // B - Is current filter still in available filters?
    const nextSelectedFilter = selectedFilter && availableFilters.includes(selectedFilter) ? selectedFilter : null
    this.setState({
      filterText,
      selectedFilter: nextSelectedFilter,
      availableFilters,
    })
  }

  /**
   * User entered text to filter available parameters (filters...)
   * @param {*} evt event (unused)
   * @param {string} text input text
   */
  onFilterInput = (evt, text) => this.onFiltersUpdated(text, this.props.availableParameters, this.props.selectedFilters)

  /**
   * User selected a filter: display description and allow adding it
   * @param {*} evt event (unused)
   * @param {*} selectedFilter selected user filter, matching DataManagementShapes.OpenSearchURLParameterDescription
   */
  onSelectFilter = (evt, selectedFilter) => this.setState({ selectedFilter })

  /**
   * User confirmed edition, commit parameter add
   */
  onConfirm = () => {
    const { selectedFilter } = this.state
    const { onConfirmAddFilter } = this.props
    if (selectedFilter) {
      // reset local state
      this.setState({
        filterText: '',
        selectedFilter: null,
      }, () => onConfirmAddFilter(selectedFilter))
    } // else: ignore event, already closing
  }

  /**
   * User cancelled edition
   */
  onCancel = () => {
    const { onClose } = this.props
    // reset local state
    this.setState({
      filterText: '',
      selectedFilter: null,
    }, () => onClose())
  }

  /**
   * Renders selected filter description
   * @return {[React.Component]} components to render
   */
  renderDescription = () => {
    const { selectedFilter } = this.state
    const {
      intl: { formatMessage },
      moduleTheme: { openSearchCrawler: { queryFilters: { addFilterDialog } } },
    } = this.context
    if (selectedFilter) {
      return [
        // A - Render all available attributes in parameter
        ...OSQueryAddFilterDialogComponent.FILTER_PARAMETER_ATTRIBUTES.map((key) => {
          const value = selectedFilter[key]
          if (value) {
            return (
              <div key={key}>
                <div style={addFilterDialog.descriptionFieldLabel}>
                  {formatMessage({ id: `opensearch.crawler.form.query.filters.parameter.${key}` })}
                </div>
                <div style={addFilterDialog.descriptionFieldValue}>
                  {value}
                </div>
              </div>)
          }
          return null
        }),
        // B - Render options if any
        DescriptorHelper.hasParameterOptions(selectedFilter) ? (
          <div key="options">
            <div style={addFilterDialog.descriptionFieldLabel}>
              {formatMessage({ id: 'opensearch.crawler.form.query.possibleValues' })}
            </div>
            <ul style={addFilterDialog.descriptionOptionsList}>
              {DescriptorHelper.getParameterOptions(selectedFilter).map((option) => (
                <li key={option.value}>
                  {option.value}
                </li>
              ))}
            </ul>
          </div>) : null,
      ]
    }
    // No selection message
    return (
      <div style={addFilterDialog.noSelectionMessage}>
        {formatMessage({ id: 'opensearch.crawler.form.query.filters.parameter.no.selection' })}
      </div>)
  }

  render() {
    const { selectedFilter, availableFilters, filterText } = this.state
    const {
      intl: { formatMessage },
      moduleTheme: { openSearchCrawler: { queryFilters: { addFilterDialog } } },
    } = this.context
    const { open } = this.props
    return (
      <Dialog
        title={formatMessage({ id: 'opensearch.crawler.form.query.dialog.title' })}
        actions={<>
          <FlatButton
            label={formatMessage({ id: 'datasource.list.action.cancel' })}
            onClick={this.onCancel}
            key="cancel"
            primary
          />
          <FlatButton
            label={formatMessage({ id: 'opensearch.crawler.form.query.add.label' })}
            onClick={this.onConfirm}
            key="confirm"
            disabled={!selectedFilter}
          />
        </>}
        open={open}
        modal
        autoDetectWindowHeight
      >
        <div style={addFilterDialog.mainContainer}>
          <div style={addFilterDialog.listContainer}>
            <TextField
              id="filterInput"
              value={filterText}
              onChange={this.onFilterInput}
              placeholder={formatMessage({ id: 'opensearch.crawler.form.query.filter' })}
              autoFocus
              fullWidth
            />
            <SelectableList
              value={selectedFilter}
              onChange={this.onSelectFilter}
            >
              { /** REnder all available items */
                availableFilters.map((filter) => (
                  <ListItem
                    key={filter.value}
                    value={filter}
                  >
                    {filter.name}
                  </ListItem>
                ))
                }
            </SelectableList>
          </div>
          <div style={addFilterDialog.descriptionContainer}>
            { /** Render selected attribute an dialog options on right */
              this.renderDescription()
            }
          </div>
        </div>
      </Dialog>)
  }
}
export default OSQueryAddFilterDialogComponent
