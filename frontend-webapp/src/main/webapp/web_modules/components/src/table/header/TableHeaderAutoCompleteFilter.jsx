/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import omit from 'lodash/omit'
import AutoComplete from 'material-ui/AutoComplete'
import MenuItem from 'material-ui/MenuItem'
import LoadingIcon from 'material-ui/svg-icons/av/loop'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import AutoCompleteTextField from '../../list/AutoCompleteTextField'

/** Default filter method: doesn't filter (let the parent filter the current hint text) */
const NO_FILTER = () => true

/**
 * Table header auto complete filter: It uses the AutoCompleteTextField and customizes styles for table header.
 * see AutoCompleteTextField for API detail
 *
 * @author Raphaël Mechali
 */
class TableHeaderAutoCompleteFilter extends React.Component {
  static propTypes = {
    // API is reported from delegate AutoCompleteTextField
    ...AutoCompleteTextField.propTypes,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { moduleTheme: { header: { autocomplete } } } = this.context
    return (
      <AutoCompleteTextField
        {...this.props}
        textFieldStyle={autocomplete.textStyle}
      />
    )
  }
}

export default TableHeaderAutoCompleteFilter
