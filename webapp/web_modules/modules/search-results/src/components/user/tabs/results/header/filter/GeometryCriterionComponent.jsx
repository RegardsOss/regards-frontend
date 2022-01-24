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
import GeometryIcon from 'mdi-material-ui/Select'
import { UIShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import ApplyingCriterionComponent from './ApplyingCriterionComponent'

/**
 * Shows an applying geometry filter
 * @author Raphaël Mechali
 */
class GeometryCriterionComponent extends React.Component {
  static propTypes = {
    geometryCriterion: UIShapes.GeometryCriterion.isRequired,
    onUnselectGeometry: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /** Icon for selected geometry criterion */
  static ICON = <GeometryIcon />

  render() {
    const { geometryCriterion, onUnselectGeometry } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <ApplyingCriterionComponent
        label={formatMessage({ id: 'search.filter.geometry.label' })}
        selectedCriterion={geometryCriterion}
        onUnselectCriterion={onUnselectGeometry}
        filterIcon={GeometryCriterionComponent.ICON}
      />
    )
  }
}
export default GeometryCriterionComponent
