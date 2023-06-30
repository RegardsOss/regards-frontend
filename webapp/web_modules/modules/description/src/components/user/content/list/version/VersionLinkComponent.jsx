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
import DescriptionIcon from 'mdi-material-ui/InformationOutline'
import { CatalogShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import PageElement from '../common/PageElement'
import PageLinkCellComponent from '../common/PageLinkCellComponent'

/**
 * Display an entity version as link
 * @author Raphaël Mechali
 */
class VersionLinkComponent extends React.Component {
  static propTypes = {
    entity: CatalogShapes.Entity.isRequired,
    // Callback: user selected an entity link. (entity:CatalogShapes.Entity) => ()
    onSelectEntityLink: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * User callback: on entity link clicked. Show entity description
   */
  onSelectEntityLink = () => {
    const { entity, onSelectEntityLink } = this.props
    onSelectEntityLink(entity)
  }

  render() {
    const { entity: { content: { version } } } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <PageElement>
        <PageLinkCellComponent
          text={formatMessage({ id: 'module.description.common.version.link.label' }, { version })}
          tooltip={formatMessage({ id: 'module.description.common.version.link.tooltip' })}
          LinkIconConstructor={DescriptionIcon}
          disabled={false}
          onClick={this.onSelectEntityLink}
        />
      </PageElement>)
  }
}
export default VersionLinkComponent
