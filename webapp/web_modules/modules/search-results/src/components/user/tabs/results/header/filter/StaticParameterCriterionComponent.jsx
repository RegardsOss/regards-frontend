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
 * along w
 * ith REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import GroupIcon from 'mdi-material-ui/Cog'
import { UIShapes } from '@regardsoss/shape'
import ApplyingCriterionComponent from './ApplyingCriterionComponent'

/**
 * Shows an applying static parameter criterion
 *
 * @author Léo Mieulet
 */
class StaticParameterCriterionComponent extends React.Component {
  static propTypes = {
    staticParameter: UIShapes.StaticParameterCriterion.isRequired,
    onUnselectStaticParameter: PropTypes.func.isRequired,
  }

  render() {
    const { staticParameter, onUnselectStaticParameter } = this.props
    return (
      <ApplyingCriterionComponent
        label={staticParameter.label}
        selectedCriterion={staticParameter}
        onUnselectCriterion={onUnselectStaticParameter}
        filterIcon={<GroupIcon />}
      />
    )
  }
}
export default StaticParameterCriterionComponent
