/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import flatMap from 'lodash/flatMap'
import { UIShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { DescriptionEntity } from '../../../shapes/DescriptionState'
import BreadcrumbLinkComponent from './BreadcrumbLinkComponent'
import BreadcrumbSeparatorComponent from './BreadcrumbSeparatorComponent'

/**
 * Description breadcrumb main component
 * @author Raphaël Mechali
 */
class BreadcrumbComponent extends React.Component {
  static propTypes = {
    settings: UIShapes.UISettings.isRequired,
    selectedEntityIndex: PropTypes.number.isRequired,
    descriptionPath: PropTypes.arrayOf(DescriptionEntity).isRequired,
    // On selected entity index callback (index: number) => ()
    onSelectEntityIndex: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const {
      settings, descriptionPath, selectedEntityIndex, onSelectEntityIndex,
    } = this.props
    const { moduleTheme: { user: { header: { breadcrumb: { root } } } } } = this.context
    return (
      <div style={root}>
        { // map each path element to element + separator
        flatMap(descriptionPath, (descriptionEntity, index) => [
          // 1 - Separator when not first link
          index > 0 ? <BreadcrumbSeparatorComponent key={`${descriptionEntity.entityWithTreeEntry.entity.content.id}.separator`} /> : null,
          // 2 - Link
          <BreadcrumbLinkComponent
            key={`${descriptionEntity.entityWithTreeEntry.entity.content.id}.link`}
            settings={settings}
            descriptionEntity={descriptionEntity}
            entityIndex={index}
            selected={index === selectedEntityIndex}
            onSelectEntityIndex={onSelectEntityIndex}
          />])
        }
      </div>)
  }
}
export default BreadcrumbComponent
