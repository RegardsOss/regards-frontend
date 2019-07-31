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

import isEqual from 'lodash/isEqual'
import { themeContextType } from '@regardsoss/theme'
import { TableHeaderAutoCompleteFilter } from '@regardsoss/components'

/**
 * Session Filter AutoComplete
 * @author Kévin Picart
 */
class SessionsMonitoringAutoCompleteComponent extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onUpdateInput: PropTypes.func.isRequired,
    onFilterSelected: PropTypes.func.isRequired,
    hintText: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    noData: PropTypes.bool.isRequired,
    hintsArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  state = {
    currentHints: [],
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
      if (!isEqual(oldProps, newProps)) {
        const newHintsArray = []
        newProps.hintsArray.forEach((element) => {
          newHintsArray.push({ id: element, text: element, value: element })
        })
        this.setState({ currentHints: newHintsArray })
      }
    }

    render() {
      const {
        text, onUpdateInput, onFilterSelected, hintText, isFetching, noData,
      } = this.props
      const { currentHints } = this.state
      const { moduleTheme: { sessionsStyles: { filters: { autocomplete } } } } = this.context

      return (
        <TableHeaderAutoCompleteFilter
          hintText={hintText}
          currentHintText={text}
          currentHints={currentHints}
          isFetching={isFetching}
          isInError={noData}
          onUpdateInput={onUpdateInput}
          onFilterSelected={onFilterSelected}
          style={autocomplete}
        />
      )
    }
}
export default SessionsMonitoringAutoCompleteComponent
