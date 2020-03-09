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
import FlatButton from 'material-ui/FlatButton'
import CheckBoxOutLineIcon from 'mdi-material-ui/CheckboxBlankOutline'
import CheckBoxIcon from 'mdi-material-ui/CheckboxMarked'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Option to toggle on / off filtering only elements with quicklooks
 * @author Léo Mieulet
 */
export class ToggleOnlyQuicklookComponent extends React.Component {
  static propTypes = {
    selected: PropTypes.bool.isRequired,
    onToggled: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { selected, onToggled } = this.props
    const [icon, titleKey] = !selected
      // select all
      ? [<CheckBoxOutLineIcon key="0" />, 'table.filter.select.only.quicklook.tooltip']
      // deselect all
      : [<CheckBoxIcon key="1" />, 'table.filter.deselect.only.quicklook.label']
    return (
      <FlatButton
        onClick={onToggled}
        icon={icon}
        title={this.context.intl.formatMessage({ id: titleKey })}
        label={this.context.intl.formatMessage({ id: 'table.filter.only.quicklook.label' })}
      />
    )
  }
}

export default ToggleOnlyQuicklookComponent
