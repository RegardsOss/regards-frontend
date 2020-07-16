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
import DescriptionIcon from 'mdi-material-ui/InformationOutline'
import { CatalogShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import TreeLinkComponent from './TreeLinkComponent'

/**
 * Displays a entity version cell (similar to entity cell but shows only version and always allows link following)
 * @author Raphaël Mechali
 */
class VersionCellComponent extends React.Component {
  static propTypes = {
    entity: CatalogShapes.Entity,
    // Callback: user selected an entity link. (entity:CalaogShapes.Entity) => ()
    onSelectEntityLink: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * User clicked this link: propage show entity description request to parent
   */
  onClick = () => {
    const { entity, onSelectEntityLink } = this.props
    onSelectEntityLink(entity)
  }

  render() {
    const { entity } = this.props
    const { intl: { formatMessage } } = this.context
    const { content: { label } } = entity // TODO: use version here now!!!
    return (
      <TreeLinkComponent
        text={label}
        tooltip={formatMessage({ id: 'module.description.tree.section.OTHER_VERSIONS.show.tooltip' })}
        disabled={false}
        selected={false} // cannot be selected
        onClick={this.onClick}
        IconConstructor={DescriptionIcon}
        section={false}
      />)
  }
}
export default VersionCellComponent
