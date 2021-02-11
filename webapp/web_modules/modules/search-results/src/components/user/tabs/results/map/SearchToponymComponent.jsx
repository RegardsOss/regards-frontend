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

import { AccessShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { getToponymHints } from '@regardsoss/toponym-common'
import {
  AutoCompleteTextField,
} from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import isEqual from 'lodash/isEqual'

/**
 * Map form component to search in toponym list
 * @author Théo Lasserre
 */
class SearchToponymComponent extends React.Component {
  static propTypes = {
    toponymFilterText: PropTypes.string.isRequired, // current filter text
    // eslint-disable-next-line react/no-unused-prop-types
    matchingToponyms: AccessShapes.SearchToponymList, // used in onPropertiesUpdated, current toponym list
    isInError: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    onUpdateToponymsFilter: PropTypes.func.isRequired, // user entered some key value, callback to update matching toponym list
    onToponymFilterSelected: PropTypes.func.isRequired, // callback: user selected a toponym OR entered some text
    // eslint-disable-next-line react/no-unused-prop-types
    currentLocale: PropTypes.string.isRequired,
  }

  state = {
    currentHints: [],
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
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
  const {
    moduleTheme: {
      user: {
        mapViewStyles: {
          toponymField: {
            menuItem,
          },
        },
      },
    },
  } = this.context
  // when available values change, rebuild the hints datasource (avoids consuming time and memory at render)
  if (!isEqual(oldProps.matchingToponyms, newProps.matchingToponyms)) {
    this.setState({
      currentHints: getToponymHints(newProps.matchingToponyms, newProps.currentLocale, menuItem),
    })
  }
}

render() {
  const {
    toponymFilterText, isFetching, isInError, onUpdateToponymsFilter, onToponymFilterSelected,
  } = this.props
  const {
    currentHints,
  } = this.state
  const {
    intl: { formatMessage },
    moduleTheme: {
      user: {
        mapViewStyles: {
          toponymField,
        },
      },
    },
  } = this.context
  return (
    <div style={toponymField.wrapperStyle}>
      <AutoCompleteTextField
        name="searchToponym"
        hintText={formatMessage({ id: 'results.map.search.hintText' })}
        currentHintText={toponymFilterText}
        currentHints={currentHints}
        isFetching={isFetching}
        isInError={isInError}
        onUpdateInput={onUpdateToponymsFilter}
        onFilterSelected={onToponymFilterSelected}
        openOnFocus
        listStyle={toponymField.listStyle}
        textFieldStyle={toponymField.textFieldStyle}
        underlineStyle={toponymField.underlineStyle}
      />
    </div>
  )
}
}
export default SearchToponymComponent
