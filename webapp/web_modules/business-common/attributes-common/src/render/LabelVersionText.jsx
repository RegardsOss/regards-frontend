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

import { DamDomain } from '@regardsoss/domain'
import { CatalogShapes, UIShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Component that publishes an entity label text
 * @author Raphaël Mechali
 */
class LabelVersionText extends React.Component {
  static propTypes = {
    entity: CatalogShapes.Entity.isRequired,
    uiSettings: UIShapes.UISettings.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * Should show version for entity with current settings?
   * @param {*} entity matching CatalogShapes.Entity
   * @param {*} settings matching UIShapes.UISettings
   * @return {boolean} true if version should be shown, false otherwaise
   */
  static shouldShowVersion(entity, settings) {
    const { content: { entityType } } = entity
    // For PM57: only DATA should show version
    return settings.showVersion // has admin requested it?
    && entityType === DamDomain.ENTITY_TYPES_ENUM.DATA // is entity data? (or a document, they are handle in same way here)
  }

  /**
   * Formats label as parameter
   * @param {*} entity matching CatalogShapes.Entity
   * @param {*} settings matching UIShapes.UISettings
   * @return {boolean} true if version should be shown, false otherwaise
   */
  static formatLabel(formatMessage, entity, settings) {
    const { content: { label, version } } = entity
    return LabelVersionText.shouldShowVersion(entity, settings)
      ? formatMessage({ id: 'attribute.render.version.label' }, { label, version: version.toString() })
      : formatMessage({ id: 'attribute.render.simple.label' }, { label })
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const { entity, uiSettings } = this.props
    return LabelVersionText.formatLabel(formatMessage, entity, uiSettings)
  }
}

export default LabelVersionText
