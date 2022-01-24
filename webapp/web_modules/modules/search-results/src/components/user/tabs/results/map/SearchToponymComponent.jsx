/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const {
      toponymFilterText, isFetching, isInError, onUpdateToponymsFilter, onToponymFilterSelected,
      matchingToponyms, currentLocale,
    } = this.props
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
          currentHints={getToponymHints(matchingToponyms, currentLocale, toponymField.menuItem)}
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
