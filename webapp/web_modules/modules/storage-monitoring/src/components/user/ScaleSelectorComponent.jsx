/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { FormattedMessage } from 'react-intl'
import MenuItem from 'material-ui/MenuItem'
import LinearScale from 'material-ui/svg-icons/editor/linear-scale'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { DropDownButton } from '@regardsoss/components'
import { storage } from '@regardsoss/units'

/**
* Scale selector component
* @author Raphaël Mechali
*/
export class ScaleSelectorComponent extends React.Component {
  static propTypes = {
    scale: storage.StorageUnitScaleShape.isRequired, // currently selected scale
    onUnitScaleChanged: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static SELECTOR_ICON = <LinearScale />

  /**
   * Formats the scale as parameter
   * @param {*} scale scale
   */
  getLabel = (scale) => {
    const { intl: { formatMessage } } = this.context
    return formatMessage({ id: scale.messageKey })
  }

  render() {
    const { scale: selectedScale, onUnitScaleChanged } = this.props
    return (
      <DropDownButton
        value={selectedScale}
        getLabel={this.getLabel}
        onChange={onUnitScaleChanged}
        icon={ScaleSelectorComponent.SELECTOR_ICON}
      >
        {storage.StorageUnitScale.all.map(scale => (
          <MenuItem
            key={scale.id}
            value={scale}
            primaryText={
              <FormattedMessage id={scale.messageKey} />
            }
          />
        ))}
      </DropDownButton>
    )
  }
}
// add storage i18n context to internationalize scales
export default withI18n(storage.messages, true)(ScaleSelectorComponent)
