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
import find from 'lodash/find'
import reduce from 'lodash/reduce'
import get from 'lodash/get'
import { UIShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import {
  getSortConfigId, isNewSortConfig, isNewSortConfigId,
} from './SortUtils'
import NewSortingShape from './NewSortingShape'

/**
 * Renders sort label in the table
 * @author Léo Mieulet
 */
class SortLabelRender extends React.Component {
  static propTypes = {
    entity: PropTypes.oneOfType([UIShapes.SortingCriterion, NewSortingShape]).isRequired,
    // sortable attribute to retrieve labels
    sortableAttributes: UIShapes.SortableAttributes.isRequired,
    // current sort config
    currentSortings: PropTypes.arrayOf(PropTypes.oneOfType([UIShapes.SortingCriterion, NewSortingShape])).isRequired,
    onSetNewSortAttrId: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * Returns label for provided sort attribute id
   * @param sortEntityId attribute id to display label
   * @param sortableAttributes sortable attributes
   * @return {string} label to display
   */
  static getLabel = (sortEntityId, sortableAttributes, { formatMessage, locale }) => {
    if (isNewSortConfigId(sortEntityId)) {
      // Return the default message related to a newly created sort parameter
      return formatMessage({ id: 'search.results.configure.sorting.create.new.sort' })
    }
    // Find the attribute in the list of available sorting attributes
    const sortableAttribute = find(sortableAttributes, (sortAttr) => getSortConfigId(sortAttr) === sortEntityId)
    // Either use the internationalized label of the entity of its technical label
    return (sortableAttribute.label && sortableAttribute.label[locale])
      || get(sortableAttribute, 'attribute.content.label')
      || get(sortableAttribute, 'attribute.content.name')
  }

  onNewSortAttributeSelected = (event, i, value) => {
    const { onSetNewSortAttrId } = this.props
    onSetNewSortAttrId(value)
  }

  /**
   * @return {[React.Element]} list of available attribute that can be used to this new sort
   */
  getAvailableAttrOptions = () => {
    const { currentSortings, sortableAttributes } = this.props
    const { intl: { locale, formatMessage } } = this.context
    return reduce(sortableAttributes, (acc, sortableAttr) => {
      const sortAttrId = getSortConfigId(sortableAttr)
      // Ignore attributes that are already declared in currentSortings
      if (find(currentSortings, (currentSorting) => sortAttrId === getSortConfigId(currentSorting))) {
        return acc
      }
      // 1 - compute label
      const attrLabel = SortLabelRender.getLabel(sortAttrId, sortableAttributes, { locale, formatMessage })
      // 2 - add menu item in returned list
      return [
        ...acc,
        <MenuItem
          key={sortAttrId}
          primaryText={attrLabel}
          value={sortAttrId}
        />,
      ]
    }, [])
  }

  render() {
    const { moduleTheme: { user: { ordersDialog } }, intl } = this.context
    const { entity, sortableAttributes } = this.props
    if (isNewSortConfig(entity)) {
      return (
        <SelectField
          onChange={this.onNewSortAttributeSelected}
          hintText={intl.formatMessage({ id: 'search.results.configure.sorting.create.new.sort.input' })}
        >
          {this.getAvailableAttrOptions()}
        </SelectField>
      )
    }
    const labelText = SortLabelRender.getLabel(getSortConfigId(entity), sortableAttributes, intl)
    return (
      <div
        style={ordersDialog.labelColumnCell}
        title={labelText}
      >
        {
          labelText
        }
      </div>
    )
  }
}
export default SortLabelRender
