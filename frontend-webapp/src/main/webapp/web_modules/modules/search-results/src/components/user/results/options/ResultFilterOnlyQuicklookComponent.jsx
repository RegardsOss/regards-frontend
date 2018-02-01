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
import FlatButton from 'material-ui/FlatButton'
import CheckBoxOutLineIcon from 'material-ui/svg-icons/toggle/check-box-outline-blank'
import CheckBoxIcon from 'material-ui/svg-icons/toggle/check-box'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Display only DataObjects having a quicklook
 * @author Léo Mieulet
 */
export class TableSelectAllOption extends React.Component {
  static propTypes = {
    displayOnlyQuicklook: PropTypes.bool.isRequired,
    onToggleDisplayOnlyQuicklook: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { displayOnlyQuicklook, onToggleDisplayOnlyQuicklook } = this.props
    const [icon, titleKey] = !displayOnlyQuicklook ?
      // select all
      [<CheckBoxOutLineIcon key="0" />, 'table.filter.select.only.quicklook.tooltip'] :
      // deselect all
      [<CheckBoxIcon key="1" />, 'table.filter.deselect.only.quicklook.label']
    return (
      <FlatButton
        onClick={onToggleDisplayOnlyQuicklook}
        icon={icon}
        title={this.context.intl.formatMessage({ id: titleKey })}
        label={this.context.intl.formatMessage({ id: 'table.filter.only.quicklook.label' })}
      />
    )
  }
}

export default TableSelectAllOption
