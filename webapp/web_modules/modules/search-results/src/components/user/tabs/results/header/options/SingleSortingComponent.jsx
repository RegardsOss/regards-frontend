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
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import { UIShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { DropDownButton } from '@regardsoss/components'

/** Possible soring model types */
export const SingleSortingModelEnum = {
  // option to use to select default sorting
  DEFAULT: 'DEFAULT',
  // custom sorting (multiple values but not default)
  CUSTOM: 'CUSTOM',
  // an attribute
  ATTRIBUTE: 'ATTRIBUTE',
}

/**
 * Component to display a select field with all the sortable attributes.
 * Selection on an attribute run a new search with the sort option for that attribute, removing any previous choice
 * Note that a selected sorting model should always be provided to this component
 *
 * @author Sébastien Binda
 */
class SingleSortingComponent extends React.Component {
  static propTypes = {
    // default sorting model, always provided, even empty
    defaultSortingModel: PropTypes.shape({
      type: PropTypes.oneOf([SingleSortingModelEnum.DEFAULT]).isRequired,
      selected: PropTypes.bool.isRequired,
      sortingCriteria: PropTypes.arrayOf(UIShapes.SortingCriterion).isRequired,
    }).isRequired,
    // custom sorting model, only when set (it comes from an external view that allows multi attributes sorting)
    customSortingModel: PropTypes.shape({
      type: PropTypes.oneOf([SingleSortingModelEnum.CUSTOM]).isRequired,
      selected: PropTypes.bool.isRequired,
      sortingCriteria: PropTypes.arrayOf(UIShapes.SortingCriterion).isRequired,
    }),
    // available sorting models from attributes, always provided, even empty
    attributeSortingModels: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.oneOf([SingleSortingModelEnum.ATTRIBUTE]).isRequired,
      selected: PropTypes.bool.isRequired,
      sortingCriteria: PropTypes.arrayOf(UIShapes.SortingCriterion).isRequired,
      presentationModel: UIShapes.AttributePresentationModel.isRequired,
    })).isRequired,
    // callback: user clicked on a sorting option. (sortingModel) => ()
    onSortBy: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * Computes and returns label to use for sorting model as parameter
   * @param {*} sortingModel sorting model
   * @param {*} intl intl context
   * @return {string} label to use for attribute sorting model
   */
  static getAttributeSortingModelLabel(sortingModel, intl) {
    const { formatMessage, locale } = intl
    switch (sortingModel.type) {
      case SingleSortingModelEnum.DEFAULT:
        return formatMessage({ id: 'search.results.list.sort.default.label' })
      case SingleSortingModelEnum.CUSTOM:
        return formatMessage({ id: 'search.results.list.sort.custom.label' })
      case SingleSortingModelEnum.ATTRIBUTE:
        return sortingModel.presentationModel.label[locale]
      || get(sortingModel.presentationModel, 'attributes[0].content.label')
      || get(sortingModel.presentationModel, 'attributes[0].content.name')
      default:
        throw new Error(`Unknown sorting model type "${sortingModel.type}"`)
    }
  }

  /**
   * @return {*} selected sorting model
   */
  getSelectedSortingModel = () => {
    const { defaultSortingModel, customSortingModel, attributeSortingModels } = this.props
    return [defaultSortingModel, customSortingModel, ...attributeSortingModels].find((sortingModel) => sortingModel && sortingModel.selected)
  }

  /**
   * Returns label for selected sorting model
   * @param sortingModel attribute presentation model or null (this menu items contains null element)
   * @return {string} label to use for button
   */
  getLabel = (sortingModel) => {
    const { intl } = this.context
    return intl.formatMessage({ id: 'search.results.list.sort.label' }, {
      sortElement: SingleSortingComponent.getAttributeSortingModelLabel(sortingModel, intl),
    })
  }

  render() {
    const { intl } = this.context
    const {
      defaultSortingModel, customSortingModel, attributeSortingModels, onSortBy,
    } = this.props
    return (
      <DropDownButton
        onChange={onSortBy}
        getLabel={this.getLabel}
        // value is the selected sorting model, or the default on (if any) or NULL
        value={this.getSelectedSortingModel()}
      >
        {/* customSortingModel if found, as it will always be selected */
          customSortingModel
            ? [
              <MenuItem
                key="custom.sorting.option"
                checked={customSortingModel.selected}
                primaryText={SingleSortingComponent.getAttributeSortingModelLabel(customSortingModel, intl)}
                insetChildren
                value={customSortingModel}
              />,
              // add a separator to other elements, considered 'normal' cases in single sort
              <Divider key="custom.option.menu.separator" />,
            ]
            : null
        }
        {/* Default sorting model */}
        <MenuItem
          key="default.sorting.option"
          checked={defaultSortingModel.selected}
          primaryText={SingleSortingComponent.getAttributeSortingModelLabel(defaultSortingModel, intl)}
          insetChildren
          value={defaultSortingModel}
        />
        { /* Available attributes sorting models */
          attributeSortingModels.map((attrSortingModel) => (
            <MenuItem
              key={attrSortingModel.presentationModel.key}
              checked={attrSortingModel.selected}
              value={attrSortingModel}
              primaryText={SingleSortingComponent.getAttributeSortingModelLabel(attrSortingModel, intl)}
              insetChildren
            />))
        }
      </DropDownButton>
    )
  }
}

export default SingleSortingComponent
