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
import get from 'lodash/get'
import map from 'lodash/map'
import values from 'lodash/values'
import Refresh from 'material-ui/svg-icons/navigation/refresh'
import Filter from 'mdi-material-ui/Filter'
import Close from 'mdi-material-ui/Close'
import Plus from 'mdi-material-ui/PlaylistPlus'
import Minus from 'mdi-material-ui/PlaylistMinus'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import { TableHeaderLine, TableHeaderOptionsArea, TableHeaderOptionGroup, DatePickerField } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import AIPStatusEnum from './AIPStatusEnum'

/**
* Component to display filters on AIPListComponent
* @author Léo Mieulet
*/
class AIPListFiltersComponent extends React.Component {
  static propTypes = {
    initialFilters: PropTypes.objectOf(PropTypes.string),
    isEmptySelection: PropTypes.bool.isRequired,
    sessionTags: PropTypes.arrayOf(PropTypes.string),
    searchingSessionTags: PropTypes.bool.isRequired,

    applyFilters: PropTypes.func.isRequired,
    handleRefresh: PropTypes.func.isRequired,
    openAddTagModal: PropTypes.func.isRequired,
    openRemoveTagModal: PropTypes.func.isRequired,
  }

  static defaultProps = {}

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    filters: {},
  }

  componentWillMount() {
    const { initialFilters } = this.props
    if (initialFilters) {
      let filters = {}
      if (initialFilters.state) {
        filters = {
          ...initialFilters,
          state: [initialFilters.state],
        }
      } else {
        filters = {
          ...initialFilters,
        }
      }
      this.setState({
        filters,
      })
    }
  }

  componentDidMount() {
    if (values(this.state.filters).length > 0) {
      this.handleFilter()
    }
  }

  /**
    * Clear all filters
    */
  handleClearFilters = () => {
    this.setState({ filters: {} })
    this.props.applyFilters({})
  }

  handleFilter = () => {
    const {
      from, to, state, aipId, tags,
    } = this.state.filters
    const newFilters = {}
    if (from) {
      newFilters.from = from.toISOString()
    }
    if (to) {
      newFilters.to = to.toISOString()
    }
    if (state) {
      newFilters.state = state
    }
    if (tags) {
      newFilters.tags = tags
    }
    if (aipId) {
      // Add '%' caracter at starts and ends of the string to search for matching pattern and not strict value.
      newFilters.aipId = `%${aipId}%`
    }
    this.props.applyFilters(newFilters)
  }

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


  renderFilters = () => {
    const { intl, moduleTheme: { filter } } = this.context
    const { searchingSessionTags, sessionTags } = this.props
    return (
      <TableHeaderLine key="filtersLine">
        <TableHeaderOptionsArea key="filtersArea" reducible alignLeft>
          <TableHeaderOptionGroup key="second">
            <SelectField
              style={filter.fieldStyle}
              hintText={intl.formatMessage({
                id: 'aips.list.filters.status.label',
              })}
              value={get(this.state, 'filters.state', undefined)}
              onChange={this.changeStateFilter}
            >
              <MenuItem value={null} primaryText="" />
              {map(AIPStatusEnum, status => (<MenuItem
                key={status}
                value={status}
                primaryText={intl.formatMessage({
                  id: status,
                })}
              />))}
            </SelectField>
          </TableHeaderOptionGroup>

          {!searchingSessionTags ? (
            <TableHeaderOptionGroup key="tags">
              <SelectField
                style={filter.fieldStyle}
                hintText={intl.formatMessage({
                  id: 'aips.list.filters.tag.label',
                })}
                value={get(this.state, 'filters.tags', undefined)}
                onChange={this.changeTagsFilter}
                multiple
              >
                <MenuItem value={null} primaryText="" />
                {map(sessionTags, tag => (<MenuItem
                  key={tag}
                  value={tag}
                  primaryText={tag}
                />))}
              </SelectField>
            </TableHeaderOptionGroup>
          ) : null}
          <TableHeaderOptionGroup>
            <DatePickerField
              value={get(this.state, 'filters.from', undefined)}
              dateHintText={intl.formatMessage({
                id: 'aips.list.filters.from.label',
              })}
              onChange={this.changeFrom}
              locale={intl.locale}
            />
            <DatePickerField
              value={this.state.filters.to}
              defaultTime="23:59:59"
              dateHintText={intl.formatMessage({ id: 'aips.list.filters.to.label' })}
              onChange={this.changeTo}
              locale={intl.locale}
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
            label="Add tag"
            icon={<Plus />}
            disabled={this.props.isEmptySelection}
            onClick={this.props.openAddTagModal}
          />
          <FlatButton
            key="remove tag"
            label="Remove tag"
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
            label={this.context.intl.formatMessage({ id: 'aips.session.clear.filters.button' })}
            icon={<Close />}
            disabled={
              !get(this.state, 'filters.from') &&
              !get(this.state, 'filters.state') &&
              !get(this.state, 'filters.tags') &&
              !get(this.state, 'filters.aipId')
            }
            onClick={this.handleClearFilters}
          />
          <FlatButton
            key="apply"
            label={this.context.intl.formatMessage({ id: 'aips.session.apply.filters.button' })}
            icon={<Filter />}
            onClick={this.handleFilter}
          />
          <FlatButton
            label={this.context.intl.formatMessage({ id: 'aips.session.refresh.button' })}
            icon={<Refresh />}
            onClick={this.props.handleRefresh}
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
