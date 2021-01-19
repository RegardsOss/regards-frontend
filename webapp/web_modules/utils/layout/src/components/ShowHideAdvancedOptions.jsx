/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import KeyboardArrowUp from 'mdi-material-ui/ChevronUp'
import KeyboardArrowDown from 'mdi-material-ui/ChevronDown'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

/**
 * Component to show and hide advanced option section
 * @author Xavier-Alexaandre Brochard
 * @author Raphaël Mechali
 */
class ShowHideAdvancedOptions extends React.Component {
  static propTypes = {
    advanced: PropTypes.bool.isRequired, // is advanced section currently displayed?
    onClick: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const { advanced, onClick } = this.props
    const { muiTheme, moduleTheme, intl: { formatMessage } } = this.context
    return (
      <span
        onClick={onClick}
        style={moduleTheme.showAdvancedOption}
      >
        { /** show icon */
         advanced
           ? <KeyboardArrowUp color={muiTheme.palette.primary1Color} />
           : <KeyboardArrowDown color={muiTheme.palette.primary1Color} />
        }
        { /** show label */
      advanced
        ? formatMessage({ id: 'container.form.advanced.mode.hide' })
        : formatMessage({ id: 'container.form.advanced.mode.show' })
        }
      </span>)
  }
}

export default ShowHideAdvancedOptions
