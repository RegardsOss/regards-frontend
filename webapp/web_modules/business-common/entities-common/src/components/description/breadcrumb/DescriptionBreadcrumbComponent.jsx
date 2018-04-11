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
import { CatalogShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { Breadcrumb } from '@regardsoss/components'

/**
* Description breadcrumb view component
*/
class NavigationComponent extends React.Component {
  static propTypes = {
    // all entities in current description path
    descriptionPath: PropTypes.arrayOf(CatalogShapes.Entity),
    onEntitySelected: PropTypes.func.isRequired, // on breadcrumb entity selected (entity, index) => void
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * Entity label generator for breadcrumb
   * @param entity entity
   * @param level entity level in breadcrumb
   */
  getEntityLabel = (entity, level) => {
    const { intl: { formatMessage } } = this.context
    const entityLabel = entity.content.label
    return level ? entityLabel : formatMessage({ id: 'description.breadcrumb.root' }, { entityLabel })
  }


  render() {
    const { descriptionPath, onEntitySelected } = this.props
    return (

      <Breadcrumb elements={descriptionPath} labelGenerator={this.getEntityLabel} onAction={onEntitySelected} />
    )
  }
}
export default NavigationComponent
