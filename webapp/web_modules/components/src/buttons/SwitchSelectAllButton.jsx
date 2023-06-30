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
import SelectAllIcon from 'mdi-material-ui/CheckboxMarked'
import UnselectAllIcon from 'mdi-material-ui/CheckboxBlankOutline'
import compose from 'lodash/fp/compose'
import FlatButton from 'material-ui/FlatButton'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { HOCUtils } from '@regardsoss/display-control'
import messages from './i18n'
import styles from './styles'

/**
 * A standard select all / unselect all button to be reused (does nothing but graphics and messages)
 * @author Raphaël Mechali
 */
export class SwitchSelectAllButton extends React.Component {
  static propTypes = {
    // are all selected in current state?
    areAllSelected: PropTypes.bool.isRequired,
    // on select all callback
    onSelectAll: PropTypes.func.isRequired,
    // on unselect all callback
    onUnselectAll: PropTypes.func.isRequired,
    // optional select all tooltip
    selectAllTooltip: PropTypes.string,
    // optional select all icon
    selectAllIcon: PropTypes.element,
    // optional unselect all tooltip
    unselectAllTooltip: PropTypes.string,
    // optional unselect all icon
    unselectAllIcon: PropTypes.element,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static defaultProps = {
    selectAllIcon: <SelectAllIcon />,
    unselectAllIcon: <UnselectAllIcon />,
  }

  render() {
    const {
      areAllSelected,
      onSelectAll, selectAllTooltip, selectAllIcon,
      onUnselectAll, unselectAllTooltip, unselectAllIcon,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { switchSelectAllButton: { labelStyle, iconStyle } } } = this.context

    // compute icon to add this button style
    let iconWithStyles = null
    if (areAllSelected) {
      iconWithStyles = unselectAllIcon
    } else {
      iconWithStyles = selectAllIcon
    }
    iconWithStyles = iconWithStyles ? HOCUtils.cloneChildrenWith(iconWithStyles, iconStyle) : null

    return (
      <FlatButton
        label={formatMessage({ id: areAllSelected ? 'components.buttons.unselect.all' : 'components.buttons.select.all' })}
        icon={iconWithStyles}
        onClick={areAllSelected ? onUnselectAll : onSelectAll}
        title={areAllSelected ? unselectAllTooltip : selectAllTooltip}
        labelStyle={labelStyle}
      />
    )
  }
}

export default compose(withI18n(messages), withModuleStyle(styles))(SwitchSelectAllButton)
