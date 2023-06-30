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
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { DataProviderShapes, CommonShapes } from '@regardsoss/shape'
import { HateoasToggle } from '@regardsoss/components'

/**
 * Renderer for acquisition processing chain mode
 * @author Raphaël Mechali
 */
export class AcquisitionProcessingChainModeRenderer extends React.Component {
  static propTypes = {
    entity: PropTypes.shape({
      content: DataProviderShapes.AcquisitionProcessingChainMonitorContent,
      links: PropTypes.arrayOf(CommonShapes.HateOASLink),
    }),
    onToggle: PropTypes.func,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /** HateOAS Link to delete on All storages  */
  static CHANGE_MODE_LINK = 'patch'

  static TOGGLE_VALUES = {
    MANUAL: 'MANUAL',
    AUTO: 'AUTO',
  }

  onToggle = () => {
    const { entity, onToggle } = this.props
    let toggleMode = AcquisitionProcessingChainModeRenderer.TOGGLE_VALUES.MANUAL
    if (entity.content.chain.mode === AcquisitionProcessingChainModeRenderer.TOGGLE_VALUES.MANUAL) {
      toggleMode = AcquisitionProcessingChainModeRenderer.TOGGLE_VALUES.AUTO
    }
    onToggle(entity, 'ONLY_MODE', toggleMode)
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const { entity: { content: { chain: { mode } }, links } } = this.props
    const {
      moduleTheme: {
        chains: {
          toggles: {
            toggleContainer, toggleModeColor, toggleStyle, toggleGridLabel, toggleGridToggle,
          },
        },
      },
    } = this.context
    const isToggled = mode !== AcquisitionProcessingChainModeRenderer.TOGGLE_VALUES.MANUAL

    return (

      <div style={toggleContainer}>
        <div style={toggleGridLabel}>
          { isToggled ? formatMessage({ id: 'acquisition-chain.list.mode.auto' }) : formatMessage({ id: 'acquisition-chain.list.mode.manual' }) }
        </div>
        <div style={toggleGridToggle}>
          <HateoasToggle
            entityLinks={links}
            hateoasKey={AcquisitionProcessingChainModeRenderer.CHANGE_MODE_LINK}
            alwaysDisplayforInstanceUser={false}
            disableInsteadOfHide
            toggled={isToggled}
            onToggle={this.onToggle}
            thumbStyle={toggleModeColor}
            thumbSwitchedStyle={toggleModeColor}
            style={toggleStyle}
          />
        </div>
      </div>

    )
  }
}
