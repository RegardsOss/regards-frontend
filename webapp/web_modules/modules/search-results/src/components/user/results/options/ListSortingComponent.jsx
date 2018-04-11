/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import MenuItem from 'material-ui/MenuItem'
import { AccessShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { DropDownButton } from '@regardsoss/components'

/**
 * Component to display a select field with all the sortable attributes.
 * A selection on an attribute run a new search with the orderBy option.
 *
 * @author Sébastien Binda
 */
class ListSortingComponent extends React.Component {
  static propTypes = {
    // model currently used for sorting, null / undefined if none
    sortingModel: AccessShapes.AttributePresentationModel,
    // all models available
    sortableModels: AccessShapes.AttributePresentationModelArray.isRequired,
    onSortBy: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * Returns presentation model label (see items below)
   * @param model attribute presentation model or null (this menu items contains null element)
   * @return {string} label to use for button
   */
  getLabel = (model) => {
    const { intl: { formatMessage } } = this.context
    const prefix = formatMessage({ id: 'list.sort.prefix.label' })
    return `${prefix} ${model ? model.label : formatMessage({ id: 'list.sort.none.label' })}`
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const { sortingModel, sortableModels, onSortBy } = this.props
    return (
      <DropDownButton
        onChange={onSortBy}
        getLabel={this.getLabel}
        value={sortingModel || null}
      >
        {/* No sort item */}
        <MenuItem
          key="no.sort"
          checked={!sortingModel}
          primaryText={formatMessage({ id: 'list.sort.none.label' })}
          insetChildren
          value={null}
        />
        { /* Map all available items for sorting */
          sortableModels.map((model, key) => (
            <MenuItem
              key={model.key}
              checked={sortingModel && sortingModel.key === model.key}
              value={model}
              primaryText={model.label}
              insetChildren
            />))
        }
      </DropDownButton>
    )
  }
}

export default ListSortingComponent
