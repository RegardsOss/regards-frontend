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
import FlatButton from 'material-ui/FlatButton'
import { i18nContextType } from '@regardsoss/i18n'
import FiltersIcon from 'mdi-material-ui/Filter'

/**
 * Option to enable filters (hides when user cannot access filters functionnality, performed by parent container)
 * @author Raphaël Mechali
 */
class ToggleFiltersComponent extends React.Component {
  static propTypes = {
    filtersEnabled: PropTypes.bool.isRequired,
    onFiltersToggled: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const { onFiltersToggled, filtersEnabled } = this.props
    return (
      <FlatButton
        label={formatMessage({ id: 'search.results.toggle.filters' })}
        onClick={onFiltersToggled}
        icon={<FiltersIcon />}
        secondary={filtersEnabled}
      />
    )
  }
}
export default ToggleFiltersComponent
