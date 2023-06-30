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
import ListViewIcon from 'mdi-material-ui/ViewSequential'
import TableViewIcon from 'mdi-material-ui/TableLarge'
import QuicklookViewIcon from 'mdi-material-ui/ImageAlbum'
import MapViewIcon from 'mdi-material-ui/Map'
import { UIDomain } from '@regardsoss/domain'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * Component to display a type tab
 * @author Raphaël Mechali
 */
class ModeSelectorComponent extends React.Component {
  static propTypes = {
    mode: PropTypes.oneOf(UIDomain.RESULTS_VIEW_MODES).isRequired,
    selected: PropTypes.bool.isRequired,
    onModeSelected: PropTypes.func.isRequired,
  }

  static ICON_CONSTRUCTOR_BY_MODE = {
    [UIDomain.RESULTS_VIEW_MODES_ENUM.LIST]: ListViewIcon,
    [UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE]: TableViewIcon,
    [UIDomain.RESULTS_VIEW_MODES_ENUM.QUICKLOOK]: QuicklookViewIcon,
    [UIDomain.RESULTS_VIEW_MODES_ENUM.MAP]: MapViewIcon,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { mode, selected, onModeSelected } = this.props
    const { intl: { formatMessage }, moduleTheme: { user: { viewModeButton } } } = this.context
    const IconConstructor = ModeSelectorComponent.ICON_CONSTRUCTOR_BY_MODE[mode]
    return (
      <FlatButton
        // label from configuration when provided, default otherwise
        onClick={onModeSelected}
        icon={<IconConstructor />}
        secondary={selected}
        style={viewModeButton}
        title={formatMessage({ id: `view.type.selector.tooltip.for.${mode}` })}
      />
    )
  }
}
export default ModeSelectorComponent
