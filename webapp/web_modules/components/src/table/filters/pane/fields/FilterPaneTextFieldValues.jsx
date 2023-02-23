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
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import find from 'lodash/find'
import reduce from 'lodash/reduce'
import join from 'lodash/join'
import Chip from 'material-ui/Chip'
import IconButton from 'material-ui/IconButton'
import AddIcon from 'mdi-material-ui/PlusCircle'
import TextField from 'material-ui/TextField'
import get from 'lodash/get'
import {
  FiltersPaneLineComponent,
  TableFilterSortingAndVisibilityContainer,
  TableSelectionModes,
} from '@regardsoss/components'
import { ScrollArea } from '@regardsoss/adapters'
import { CommonDomain } from '@regardsoss/domain'
import { UIShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * @author Théo Lasserre
 */
class FilterPaneTextFieldValues extends React.Component {
  static propTypes = {
    filtersI18n: UIShapes.FiltersI18nList,
    filterKey: PropTypes.string.isRequired,
    updateValuesFilter: PropTypes.func,
    inputValues: TableFilterSortingAndVisibilityContainer.FILTERS_PROP_TYPE,
    matchMode: PropTypes.oneOf(CommonDomain.MATCH_MODE),
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    fieldText: '',
    fieldAlreadyExist: false,
  }

  onKeyPressed = (ev) => {
    if (ev.key === 'Enter') {
      ev.preventDefault()
      this.onAddField()
    }
  }

  onAddField = () => {
    const {
      updateValuesFilter, filterKey, inputValues, matchMode,
    } = this.props
    const { fieldText } = this.state
    const fieldToAdd = fieldText.trim()
    if (fieldToAdd) {
      const currentFilterValues = get(inputValues, `${filterKey}.${CommonDomain.REQUEST_PARAMETERS.VALUES}`)
      const newFilterValues = !isEmpty(currentFilterValues) ? `${join(get(inputValues, `${filterKey}.${CommonDomain.REQUEST_PARAMETERS.VALUES}`), ',')},${fieldToAdd}` : `${fieldToAdd}`
      updateValuesFilter(newFilterValues, filterKey, TableSelectionModes.INCLUDE, false, matchMode)
      this.setState({ fieldText: '' })
    }
  }

  onChangeValue = (event, value) => {
    const { filterKey, inputValues } = this.props
    const currentFilterValues = get(inputValues, `${filterKey}.${CommonDomain.REQUEST_PARAMETERS.VALUES}`)
    this.setState({
      fieldText: value,
      fieldAlreadyExist: find(currentFilterValues, (currentFilterValue) => currentFilterValue === value),
    })
  }

  onRemoveField = (filterValue) => {
    const {
      updateValuesFilter, inputValues, filterKey, matchMode,
    } = this.props
    const currentFilterValues = get(inputValues, `${filterKey}.${CommonDomain.REQUEST_PARAMETERS.VALUES}`)
    const newFilterValues = reduce(currentFilterValues, (acc, value) => {
      if (value !== filterValue) {
        acc.push(value)
      }
      return acc
    }, [])
    updateValuesFilter(newFilterValues, filterKey, TableSelectionModes.INCLUDE, false, matchMode)
  }

  renderChip = (filterValue, index) => {
    const { filterKey } = this.state
    const { moduleTheme: { searchPane: { childrenStyles: { textFieldValuesStyle: { chipStyle, chipValueStyle } } } } } = this.context
    return (
      <Chip
        onRequestDelete={() => this.onRemoveField(filterValue)}
        key={`groupname-${filterKey}-${index}`}
        title={filterValue}
        style={chipStyle}
      >
        <div style={chipValueStyle}>
          {filterValue}
        </div>
      </Chip>)
  }

  isAddIconDisabled = () => {
    const {
      fieldText, fieldAlreadyExist,
    } = this.state
    return !!(isEmpty(fieldText) || fieldAlreadyExist)
  }

  getTextMessage = (chipValues) => {
    const { fieldText, fieldAlreadyExist } = this.state
    const {
      intl: { formatMessage }, moduleTheme: {
        searchPane: {
          childrenStyles: {
            textFieldValuesStyle: {
              addNewElementStyle, defaultElementStyle,
            },
          },
        },
      },
    } = this.context
    let messageText = ''
    let messageStyle = {}
    if (!isEmpty(chipValues)) {
      messageText = formatMessage({ id: 'filter.pane.textfield.values.display' })
      messageStyle = defaultElementStyle
    } else {
      messageText = formatMessage({ id: 'filter.pane.textfield.values.none' })
      messageStyle = defaultElementStyle
    }

    if (!isEmpty(fieldText)) {
      messageStyle = addNewElementStyle
      if (fieldAlreadyExist) {
        messageText = formatMessage({ id: 'filter.pane.textfield.values.exist' })
      } else {
        messageText = formatMessage({ id: 'filter.pane.textfield.values.warn' })
      }
    }
    return { messageText, messageStyle }
  }

  render() {
    const {
      filtersI18n, inputValues, filterKey,
    } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        searchPane: {
          childrenStyles: {
            textFieldValuesStyle: {
              mainDivStyle, textFieldDivStyle, valuesDivStyle, scrollAreaStyle,
              addNewElementStyle, underlineStyle,
            },
          },
        },
      },
    } = this.context

    const { fieldText } = this.state
    const hintTextKey = get(filtersI18n, `${filterKey}.hintTextKey`, '')
    const chipValues = get(inputValues, `${filterKey}.${CommonDomain.REQUEST_PARAMETERS.VALUES}`)
    const textMessage = this.getTextMessage(chipValues)
    return (
      <FiltersPaneLineComponent
        label={formatMessage({ id: filtersI18n[filterKey].labelKey })}
        multiline
      >
        <div style={mainDivStyle}>
          <div style={textFieldDivStyle}>
            <TextField
              hintText={!isEmpty(hintTextKey) ? formatMessage({ id: filtersI18n[filterKey].hintTextKey }) : hintTextKey}
              onKeyPress={this.onKeyPressed}
              value={fieldText}
              onChange={this.onChangeValue}
              errorStyle={textMessage.messageStyle}
              errorText={textMessage.messageText}
              underlineFocusStyle={underlineStyle}
              fullWidth
            />
            <IconButton onClick={this.onAddField} disabled={this.isAddIconDisabled()} iconStyle={!this.isAddIconDisabled() ? addNewElementStyle : null}>
              <AddIcon />
            </IconButton>
          </div>
          <ScrollArea
            vertical
            style={scrollAreaStyle}
          >
            <div style={valuesDivStyle}>
              {map(chipValues, (value, index) => this.renderChip(value, index))}
            </div>
          </ScrollArea>
        </div>
      </FiltersPaneLineComponent>
    )
  }
}
export default FilterPaneTextFieldValues
