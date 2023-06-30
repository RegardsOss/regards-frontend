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
import IconButton from 'material-ui/IconButton'
import CheckedIcon from 'mdi-material-ui/CheckboxMarked'
import UncheckedIcon from 'mdi-material-ui/CheckboxBlankOutline'
import { UIShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * Renders column visible state, allows changing with it
 * @author Raphaël Mechali
 */
class ColumnVisibleRender extends React.Component {
  static propTypes = {
    entity: PropTypes.oneOfType([UIShapes.AttributePresentationModel, UIShapes.FunctionalPresentationModel]).isRequired,
    onChangeVisibility: PropTypes.func.isRequired, // (column, boolean) => ()
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * User callback: visibility changed
   */
  onToggleVisibility = () => {
    const { entity, onChangeVisibility } = this.props
    onChangeVisibility(entity, !entity.visible)
  }

  render() {
    const { entity: { visible } } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <IconButton
        onClick={this.onToggleVisibility}
        title={formatMessage({
          id: visible
            ? 'search.results.configure.columns.visible.title'
            : 'search.results.configure.columns.hidden.title',
        })}
      >
        {visible
          ? <CheckedIcon />
          : <UncheckedIcon />}
      </IconButton>
    )
  }
}
export default ColumnVisibleRender
