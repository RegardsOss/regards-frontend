/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { DataManagementShapes } from '@regardsoss/shape'
import { StringValueRender } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Table cell render for attribute
 * @author Raphaël Mechali
 */
class AttributeRender extends React.Component {
  static propTypes = {
    entity: DataManagementShapes.AttributeModel.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /** List of fragments that should not be rendered */
  static NON_RENDERED_FRAGMENTS = ['default']

  /**
   * Builds render label for attribute modelas parameter (shared for different render systems)
   * @param {*} attributeModel attribute model (inside or without content field)
   * @param {intl} intl from context
   * @return string to show as render
   */
  static getRenderLabel(attributeModel, intl) {
    const { label, name, fragment } = attributeModel.content || attributeModel
    const pathElements = []
    // 1 - Build full path
    if (fragment && fragment.name && !AttributeRender.NON_RENDERED_FRAGMENTS.includes(fragment.name)) {
      pathElements.push(fragment.name)
    }
    pathElements.push(name)
    const path = pathElements.join(intl.formatMessage({ id: 'attribute.render.path.join.string' }))
    //
    return intl.formatMessage({ id: 'attribute.render.label' }, { label, path })
  }

  render() {
    const { entity } = this.props
    const { intl } = this.context
    return <StringValueRender value={AttributeRender.getRenderLabel(entity, intl)} />
  }
}
export default AttributeRender
