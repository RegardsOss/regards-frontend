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
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { DataProviderShapes, CommonShapes } from '@regardsoss/shape'
import { HateoasToggle } from '@regardsoss/components'

/**
 * Switch renderer for mode selection
 * @author Kévin Picart
 */
export class AcquisitionProcessingChainEnabledRenderer extends React.Component {
  static propTypes = {
    entity: PropTypes.shape({
      content: DataProviderShapes.AcquisitionProcessingChainMonitorContent,
      links: PropTypes.arrayOf(CommonShapes.HateOASLink),
    }),
    onToggle: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /** HateOAS Link to delete on All storages  */
  static CHANGE_ENABLE_LINK = 'patch'

  onToggle = () => {
    const { entity, onToggle } = this.props
    onToggle(entity.content.chainId, 'ONLY_ACTIVITY', !entity.content.chain.active)
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const { entity: { content: { chain: { active } }, links } } = this.props
    const {
      moduleTheme: {
        chains: {
          toggles: {
            toggleContainer, toggleStyle, toggleGridLabel, toggleGridToggle,
          },
        },
      },
    } = this.context

    return (
      <div style={toggleContainer}>
        <div style={toggleGridLabel}>
          { active ? formatMessage({ id: 'acquisition-chain.list.enabled.true' }) : formatMessage({ id: 'acquisition-chain.list.enabled.false' }) }
        </div>
        <div style={toggleGridToggle}>
          <HateoasToggle
            entityLinks={links}
            hateoasKey={AcquisitionProcessingChainEnabledRenderer.CHANGE_ENABLE_LINK}
            alwaysDisplayforInstanceUser={false}
            disableInsteadOfHide
            toggled={active}
            onToggle={this.onToggle}
            style={toggleStyle}
          />
        </div>
      </div>
    )
  }
}
