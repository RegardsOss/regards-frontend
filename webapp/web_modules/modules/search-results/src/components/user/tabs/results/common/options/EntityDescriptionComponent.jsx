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
import omit from 'lodash/omit'
import IconButton from 'material-ui/IconButton/IconButton'
import DescriptionIcon from 'mdi-material-ui/InformationOutline'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Option to show description in results table
 * @author Raphaël Mechali
 */
class EntityDescriptionComponent extends React.Component {
  static propTypes = {
    // Entity. Note: when used in options column, this is provided by the table cell API
    entity: AccessShapes.EntityWithServices.isRequired,
    onShowDescription: PropTypes.func.isRequired,
    // other properties are reported to the button
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /** Properties that should not be reported to render child button */
  static NON_REPORTED_PROPS = ['entity', 'rowIndex', 'onShowDescription']

  /**
   * On show description callback
   * @param {CatalogEntity} entity entity that was requested by user for description display
   */
  onShowDescription = () => {
    const { entity, onShowDescription } = this.props
    onShowDescription(entity)
  }

  render() {
    const { intl: { formatMessage } } = this.context
    return (
      <IconButton
        onClick={this.onShowDescription}
        title={formatMessage({ id: 'show.description.tooltip' })}
        {...omit(this.props, EntityDescriptionComponent.NON_REPORTED_PROPS)}
      >
        <DescriptionIcon />
      </IconButton>
    )
  }
}
export default EntityDescriptionComponent
