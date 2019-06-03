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
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'
import CardTitle from 'material-ui/Card/CardTitle'
import CardText from 'material-ui/Card/CardText'
import { FormattedMessage } from 'react-intl'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { CardActionsComponent } from '@regardsoss/components'
import { DescriptorHelper } from '../domain/DescriptorHelper'

/**
 * Dialog component to add a request filter in OpenSearch crawler request configuration
 *
 * @author Raphaël Mechali
 */
class OSQueryAddFilterDialogComponent extends React.Component {
  static propTypes = {
    // request parameters already selected by the user
    selectedFilters: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,

    })),
    // all available request parameters
    filters: DataManagementShapes.OpenSearchURLDescription.isRequired,
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
    'title',
    'minInclusive',
    'minExclusive',
    'maxInclusive',
    'maxExclusive',
    'pattern',
  ]

  /** Inner division style for selectable query filter name */
  static FILTER_ITEM_INNER_DIV_STYLE = { fontSize: '0.95em', paddingTop: 7, paddingBottom: 7 }

  /** Style for root parameter rendering container  */
  static ROOT_PARAMETER_RENDER_STYLE = { marginBottom: 5 }


  state = {
    // filter text, to filter request parameters list
    filterText: '',
    // currently selected filter
    selectedFilter: null,
  }

  /**
   * User entered text to filter available parameters (filters...)
   * @param {*} evt event TODO OTHERS?
   */
  onFilterInput = (evt, b, c) => {
    console.error('OTHERS?', b, c) // TODO
    this.setState({
      filterText: evt.target.value.toLowerCase(),
    })
  }

  /**
   * User selected a filter: display description and allow adding it
   * @param {*} selectedFilter selected user filter, matching DataManagementShapes.OpenSearchURLParameterDescription
   */
  onSelectFilter = (selectedFilter) => {
    this.setState({
      selectedFilter,
    })
  }

  /**
   * User confirmed edition, commit parameter add
   */
  onConfirm = () => {
    const { selectedFilter } = this.state
    const { onConfirmAddFilter } = this.props
    onConfirmAddFilter(selectedFilter)
  }

  /**
   * User cancelled edition
   */
  onCancel = () => this.props.onClose()

  /**
   * Renders a parameter attribute
   * @param {string} key parameter attribute key (used to retrieve value and label)
   * @return {React.ReactElement} render element
   */
  renderParameterAttribute = (key) => {
    const { currentFilter } = this.state
    const { intl: { formatMessage } } = this.context
    return currentFilter && currentFilter[key] ? (
      <div style={OSQueryAddFilterDialogComponent.ROOT_PARAMETER_RENDER_STYLE}>
        {/* TODO NO!! */}
        <strong>{formatMessage({ id: `opensearch.crawler.form.query.filters.parameter.${key}` })}</strong>
        <span>{this.state.currentFilter[key]}</span>
      </div>
    ) : null // that atttribute was not found in parameter
  }

  /**
   * Renders available parameters list for selection (removes already used ones and those that do not match filter text)
   * @return {[React.Component]} rendered items
   */
  renderParametersAsList = () => {
    const { filters, selectedFilters } = this.props
    const { filterText } = this.state
    const { muiTheme } = this.context
    const selected = { backgroundColor: muiTheme.palette.primary1Color }
    return filters.parameter
      .filter(filter => filterText && filter.name.toLowerCase().includes(filterText)
        && !selectedFilters.find(field => field.name === filter.name))
      .map(filter => (
        <ListItem
          style={this.state.selectedFilter === filter ? selected : null}
          innerDivStyle={OSQueryAddFilterDialogComponent.FILTER_ITEM_INNER_DIV_STYLE}
          key={filter.name}
          onClick={() => this.onSelectFilter(filter)} // TODO this is bullshit
        >
          {filter.name}
        </ListItem>
      ))
  }

  render() {
    const { selectedFilter, filterText } = this.state
    const { intl: { formatMessage } } = this.context
    const { open } = this.props
    return (
      <Dialog bodyStyle={{ padding: 0 }} open={open} modal>
        <div style={{ display: 'flex', maxHeight: 400 }}>
          <div
            style={{
              overflowY: 'scroll',
              overflowX: 'hidden',
            }}
            className="col-xs-35 col-lg-30"
          >
            <List>
              <div style={{ padding: '0 25px' }}>
                <TextField
                  style={{ width: '100%' }}
                  value={filterText}
                  onChange={this.onFilterInput}
                  placeholder={formatMessage({ id: 'opensearch.crawler.form.query.filter' })}
                />
              </div>
              {this.renderParametersAsList()}
            </List>
          </div>
          <div className="col-xs-65 col-lg-70">
            { /** Render selected attribute an dialog options on right */ }
            <>
              <CardTitle>{ selectedFilter ? selectedFilter.name : formatMessage({ id: 'opensearch.crawler.form.query.filters.parameter.no.selection' })}</CardTitle>
              <CardText>
                { /** Render all possible parameter attribute fields */
                  OSQueryAddFilterDialogComponent.FILTER_PARAMETER_ATTRIBUTES.map(this.renderParameterAttribute)
                }
                { // Render options if available
                  DescriptorHelper.hasParameterOptions(selectedFilter).length ? (
                  <>
                    <FormattedMessage id="opensearch.crawler.form.query.possibleValues" />
                    <ul>
                      {DescriptorHelper.getParameterOptions(selectedFilter).map(option => (
                        <li key={option.value}>{option.value}</li>
                      ))}
                    </ul>
                  </>
                  ) : null
                }
                <div
                  style={{ position: 'absolute', bottom: 10, right: 10 }}
                >
                  <CardActionsComponent
                    mainButtonLabel={formatMessage({ id: 'opensearch.crawler.form.query.add' })}
                    isMainButtonDisabled={!selectedFilter}
                    mainButtonClick={this.onConfirm}
                    secondaryButtonLabel={formatMessage({ id: 'datasource.list.action.cancel' })}
                    secondaryButtonClick={this.onCancel}
                  />
                </div>
              </CardText>
            </>
            )

          </div>
        </div>
      </Dialog>)
  }
}
export default OSQueryAddFilterDialogComponent
