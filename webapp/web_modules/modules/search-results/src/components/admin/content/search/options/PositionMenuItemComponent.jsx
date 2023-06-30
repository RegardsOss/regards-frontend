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
import isEmpty from 'lodash/isEmpty'
import MenuItem from 'material-ui/MenuItem'
import { UIShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Item to perform a position operation on table element (either on a group or a criterion).
 * - When criterion index is not provided, it stands for a group
 * - When index is 0, is stands for 'First position'
 * @author Raphaël Mechali
 */
class PositionMenuItemComponent extends React.Component {
  static propTypes = {
    label: UIShapes.OptionalIntlMessage,
    index: PropTypes.number.isRequired,
    group: PropTypes.bool.isRequired,
    // callback: (event) => ()
    onClick: PropTypes.func.isRequired,
    // ...other properties: event object fields
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * Formats reference to a given group / criterion (shared to other components)
   * @param {*} intl context intl
   * @param {number} index index in list
   * @param {{*}} label map of label by locale
   */
  static formatReference({ formatMessage, locale }, label, index) {
    if (index < 0) { // first
      return formatMessage({ id: 'search.results.form.configuration.search.pane.options.common.position.first.label' })
    }
    // compute usable reference label (default to index if localized text cannot be displayed)
    const localizedLabel = label[locale]
    return isEmpty(localizedLabel)
      ? formatMessage({ id: 'search.results.form.configuration.search.pane.options.common.position.simple.reference' }, { index: index + 1 })
      : formatMessage({ id: 'search.results.form.configuration.search.pane.options.common.position.reference.with.label' }, { index: index + 1, label: localizedLabel })
  }

  /**
   * Formats an element label (shared to other components)
   * @param {*} intl context intl
   * @param {boolean} group is a group?
   * @param {number} index index in list
   * @param {{*}} label map of label by locale
   */
  static formatLabel(intl, label, index, group) {
    const reference = PositionMenuItemComponent.formatReference(intl, label, index)
    if (index < 0) { // first
      return reference
    }
    return intl.formatMessage({
      id: 'search.results.form.configuration.search.pane.options.common.position.after.label',
    }, {
      // type label (group / criterion)
      elementType: intl.formatMessage({
        id: group
          ? 'search.results.form.configuration.search.pane.options.common.position.after.group.type.label'
          : 'search.results.form.configuration.search.pane.options.common.position.after.criterion.type.label',
      }),
      reference,
    })
  }

  /**
   * User callback: option was clicked
   */
  onClick = () => {
    const {
      // eslint-disable-next-line no-unused-vars
      label, index, group, onClick, ...eventProps
    } = this.props
    onClick(eventProps || {})
  }

  render() {
    const { label, index, group } = this.props
    const { intl } = this.context
    return (
      <MenuItem
        primaryText={PositionMenuItemComponent.formatLabel(intl, label, index, group)}
        onClick={this.onClick}
      />
    )
  }
}
export default PositionMenuItemComponent
