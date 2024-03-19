/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

import map from 'lodash/map'
import { themeContextType } from '@regardsoss/theme'
import isEqual from 'lodash/isEqual'
import AutoCompleteTextField from '../../list/AutoCompleteTextField'

/**
 * Filter AutoComplete
 * @author Kévin Picart
 */
class TableHeaderAutoCompleteFilter extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    prepareHints: PropTypes.func.isRequired,
    currentHints: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.any), PropTypes.objectOf(PropTypes.any)]).isRequired,
    onUpdateInput: PropTypes.func.isRequired,
    onFilterSelected: PropTypes.func.isRequired,
    hintText: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    noData: PropTypes.bool.isRequired,
    style: PropTypes.objectOf(PropTypes.string),
  }

  state = {
    currentHints: [],
  }

  static contextTypes = {
    ...themeContextType,
  }

  /**
    * Lifecycle method: component will mount. Used here to detect first properties change and update local state
    */
  UNSAFE_componentWillMount() {
    this.onPropertiesUpdated({}, this.props)
  }

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.onPropertiesUpdated(this.props, nextProps)
  }

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param nextProps next component properties
   */
  onPropertiesUpdated = (oldProps, nextProps) => {
    if (!isEqual(oldProps, nextProps)) {
      const nextHints = map(nextProps.currentHints, (element) => nextProps.prepareHints(element))
      this.setState({ currentHints: nextHints })
    }
  }

  render() {
    const {
      // eslint-disable-next-line no-unused-vars
      text, onUpdateInput, onFilterSelected, hintText, isFetching, noData, style, prepareHints, ...otherProps
    } = this.props
    const { currentHints } = this.state
    const { moduleTheme: { header: { autocomplete } } } = this.context

    return (
      <AutoCompleteTextField
        {...otherProps}
        hintText={hintText}
        currentHintText={text}
        currentHints={currentHints}
        isFetching={isFetching}
        isInError={noData}
        onUpdateInput={onUpdateInput}
        onFilterSelected={onFilterSelected}
        textFieldStyle={autocomplete.textStyle}
        style={style}
      />
    )
  }
}
export default TableHeaderAutoCompleteFilter
