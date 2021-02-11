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
 * along w
 * ith REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import GroupIcon from 'mdi-material-ui/Cog'
import { UIShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'

/**
 * Shows a button to reactive static parameter criterion
 *
 * @author Léo Mieulet
 */
class ReactiveStaticParameterCriterionComponent extends React.Component {
  static propTypes = {
    staticParameter: UIShapes.StaticParameterCriterion.isRequired,
    onSelectStaticParameter: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  onReactiveStaticParameter = () => {
    const { staticParameter, onSelectStaticParameter } = this.props
    onSelectStaticParameter(staticParameter)
  }

  render() {
    const { staticParameter } = this.props
    const { intl: { formatMessage } } = this.context
    const { moduleTheme: { user: { filters } } } = this.context
    return (
      <Chip
        style={filters.styleInactive}
        onClick={this.onReactiveStaticParameter}
        title={formatMessage({ id: 'search.filter.static.reactive' })}
      >
        <Avatar
          color={filters.disabledColor}
          icon={<GroupIcon />}
        />
        { staticParameter.label }
      </Chip>
    )
  }
}
export default ReactiveStaticParameterCriterionComponent
