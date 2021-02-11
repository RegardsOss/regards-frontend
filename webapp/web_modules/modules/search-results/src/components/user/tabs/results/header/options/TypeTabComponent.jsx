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
import get from 'lodash/get'
import FlatButton from 'material-ui/FlatButton'
import { DamDomain, UIDomain } from '@regardsoss/domain'
import { UIShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { EntityTypeIcon } from '@regardsoss/entities-common'

/**
 * Component to display entities type tab
 * @author Raphaël Mechali
 */
class TypeTabComponent extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(DamDomain.ENTITY_TYPES).isRequired,
    tabType: PropTypes.oneOf(UIDomain.RESULTS_TABS).isRequired,
    resultsContext: UIShapes.ResultsContext.isRequired,
    onTypeSelected: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const {
      type, tabType, resultsContext, onTypeSelected,
    } = this.props
    const { intl: { locale, formatMessage } } = this.context
    const IconConstructor = EntityTypeIcon.ICON_CONSTRUCTOR_BY_TYPE[type]
    const { selectedType, tab } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)
    return (
      <FlatButton
        // label from configuration when provided, default otherwise
        label={get(tab.types[type], `label.${locale}`) || formatMessage({ id: `search.results.default.tab.label.for.${type}` })}
        onClick={onTypeSelected}
        icon={<IconConstructor />}
        secondary={type === selectedType}
      />
    )
  }
}
export default TypeTabComponent
