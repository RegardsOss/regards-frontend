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
import flatMap from 'lodash/flatMap'
import get from 'lodash/get'
import Checkbox from 'material-ui/Checkbox'
import { UIDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { ShowableAtRender } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import AddElementToCartContainer from '../../../../../containers/user/tabs/results/common/options/AddElementToCartContainer'
import OneElementServicesContainer from '../../../../../containers/user/tabs/results/common/options/OneElementServicesContainer'
import DownloadEntityFileComponent from '../common/options/DownloadEntityFileComponent'
import EntityDescriptionComponent from '../common/options/EntityDescriptionComponent'
import SearchRelatedEntitiesComponent from '../common/options/SearchRelatedEntitiesComponent'

/**
 * Shape for runtime thumbnail render data
 */
export const ListThumbnailRenderData = PropTypes.shape({
  key: PropTypes.string.isRequired,
  renderers: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
    RenderConstructor: PropTypes.func.isRequired,
  })).isRequired,
})

/**
 * Shape for runtime attributes render data
 */
export const ListAttributeRenderData = PropTypes.shape({
  key: PropTypes.string.isRequired,
  label: PropTypes.objectOf(PropTypes.string).isRequired, // labels map by locale
  renderers: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
    RenderConstructor: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    props: PropTypes.objectOf(PropTypes.any), // optionnaly other props
  })).isRequired,
})
/**
 * Component to display a list cell
 *
 * @author Sébastien binda
 */
class ListCellComponent extends React.Component {
  static propTypes = {
    // tab type
    tabType: PropTypes.oneOf(UIDomain.RESULTS_TABS).isRequired,
    // Entity to display
    entity: AccessShapes.EntityWithServices.isRequired,
    // Runtime display data for attributes
    thumbnailRenderData: ListThumbnailRenderData,
    gridAttributesRenderData: PropTypes.arrayOf(ListAttributeRenderData).isRequired,
    // Description option management
    descriptionAvailable: PropTypes.bool.isRequired,
    onShowDescription: PropTypes.func,
    // Download option management
    enableDownload: PropTypes.bool.isRequired,
    accessToken: PropTypes.string,
    projectName: PropTypes.string.isRequired,
    // Basket management (no basket when not provided)
    onAddElementToCart: PropTypes.func,
    // services management
    enableServices: PropTypes.bool.isRequired,
    // Navigate to management
    enableSearchEntity: PropTypes.bool.isRequired,
    onSearchEntity: PropTypes.func.isRequired,
    // Selection management
    enableSelection: PropTypes.bool.isRequired,
    selected: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
    disableLabelDisplay: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * Callback: user requested description display
   */
  onShowDescription = () => {
    const { entity, onShowDescription } = this.props
    onShowDescription(entity)
  }

  renderCheckbox = () => {
    const { onSelect, selected } = this.props
    const { moduleTheme } = this.context
    const {
      checkboxStyles, checkBoxRippleStyle,
    } = moduleTheme.user.listViewStyles.title
    return <Checkbox
      onCheck={onSelect}
      checked={selected}
      style={checkboxStyles}
      rippleStyle={checkBoxRippleStyle}
    />
  }

  renderOptionsBarStyles = () => {
    const {
      tabType, entity, enableServices, enableDownload,
      projectName, accessToken, descriptionAvailable,
      enableSearchEntity, onSearchEntity, onAddElementToCart,
    } = this.props
    const { moduleTheme } = this.context
    const {
      optionsBarStyles, option,
    } = moduleTheme.user.listViewStyles.title
    const services = get(entity, 'content.services', [])
    return (
      <div style={optionsBarStyles}>
        {/* B-1. Download, when available. Like below, due to props, we can't use a showable at render */}
        <ShowableAtRender show={enableDownload}>
          <DownloadEntityFileComponent
            entity={entity}
            style={option.buttonStyles}
            iconStyle={option.iconStyles}
            accessToken={accessToken}
            projectName={projectName}
          />
        </ShowableAtRender>
        {/* B-2. Description  */}
        <ShowableAtRender show={descriptionAvailable}>
          <EntityDescriptionComponent
            entity={entity}
            onShowDescription={this.onShowDescription}
            style={option.buttonStyles}
            iconStyle={option.iconStyles}
          />
        </ShowableAtRender>
        {/* B-3 Show dataset content when enabled */}
        <ShowableAtRender show={enableSearchEntity}>
          <SearchRelatedEntitiesComponent
            entity={entity}
            onSearchEntity={onSearchEntity}
            style={option.buttonStyles}
            iconStyle={option.iconStyles}
          />
        </ShowableAtRender>
        {/* B-4. services, when enabled */}
        <ShowableAtRender show={enableServices && !!services.length}>
          <OneElementServicesContainer
            entity={entity}
            tabType={tabType}
            style={option.buttonStyles}
            iconStyle={option.iconStyles}
          />
        </ShowableAtRender>
        {/* B-5. add to cart,  when available (ie has callback) - not showable because callback is required by the AddElementToCartContainer */}
        {onAddElementToCart ? (
          <AddElementToCartContainer
            entity={entity}
            onAddElementToCart={onAddElementToCart}
            style={option.buttonStyles}
            iconStyle={option.iconStyles}
          />) : null}
      </div>
    )
  }

  /**
   * Renders title area of the list cell (title, with checkbox if selection enabled, empty space and options)
   */
  renderTitle = () => {
    const {
      entity, enableSelection,
    } = this.props
    const { moduleTheme } = this.context
    const {
      rootStyles, labelGroup, labelStyles,
    } = moduleTheme.user.listViewStyles.title
    return (
      <div style={rootStyles}>
        {/* A. clickable title area, with checkbox when it can be selected */}
        <div style={labelGroup}>
          {enableSelection ? (
            this.renderCheckbox()) : null}
          <h2 style={labelStyles}>
            {entity.content.label}
          </h2>
        </div>
        {/* B. Options bar */}
        {this.renderOptionsBarStyles()}
      </div>
    )
  }

  /**
   * Renders a single attribute through dedicated values renderer (using common entities render)
   * @param {AttributeRenderData} renderData render data for attribute
   * @return {[React.Element]} built components array for value
   */
  renderAttributeValue = ({ key, renderers }) => {
    const { entity } = this.props
    const { intl: { formatMessage } } = this.context
    return flatMap(renderers, ({ path, RenderConstructor, props = {} }, index) => [
      // insert separator if mutilple values
      index > 0 ? (<div key={`separator.${key}`}>{formatMessage({ id: 'results.cell.multiple.values.separator' })}</div>) : null,
      <RenderConstructor key={`render:${key}#${index}`} value={get(entity, path)} {...props} />])
  }

  /**
   * Renders thumbnail
   * @param {*} thumbnailRenderData matching ListThumbnailRenderData
   */
  renderThumbnail = (thumbnailRenderData) => {
    if (thumbnailRenderData) {
      const { entity } = this.props
      const { key, renderers: [{ path, RenderConstructor }] } = thumbnailRenderData
      const { moduleTheme: { user: { listViewStyles: { thumbnailColumnStyle, thumbnailDimensions } } } } = this.context
      return (
        <div style={thumbnailColumnStyle}>
          <RenderConstructor key={key} value={get(entity, path)} dimensions={thumbnailDimensions} />
        </div>
      )
    }
    return null
  }

  /**
   * Renders attributes to show in grid into a matrix as follow:
   * Element at 0, 2, ... are labels
   * Elements at 1, 3, ... are values
   * @param gridAttributeModels attribute models to show in grid
   * @return built columns matrix
   */
  renderAsColumns = (gridAttributeModels) => {
    const { muiTheme, moduleTheme, intl: { locale } } = this.context
    const { labelCellStyle, valueCellStyle } = moduleTheme.user.listViewStyles
    const { rowsByColumnCount } = muiTheme.module.searchResults.list
    return gridAttributeModels.reduce((columnsAcc, model, index) => {
      // 1 - Render label and value
      const labelCell = <div key={`label.${model.key}`} style={labelCellStyle}>{model.label[locale]}</div>
      const valueCell = <div key={`value.${model.key}`} style={valueCellStyle}>{this.renderAttributeValue(model)}</div>
      // 2 assign them to the current columns (or new columns if required), knowing we build two columns for one attribute
      const columnIndex = (index / rowsByColumnCount) * 2
      if (columnIndex >= columnsAcc.length) {
        // 2.a - Add new columns
        return [...columnsAcc, [labelCell], [valueCell]]
      }
      // 2.b - push in previously built columns
      columnsAcc[columnsAcc.length - 2].push(labelCell)
      columnsAcc[columnsAcc.length - 1].push(valueCell)
      return columnsAcc
    }, [])
  }

  /**
   * Renders this cell attributes
   * @return {React.Element} render data
   */
  renderAttributes = () => {
    const {
      thumbnailRenderData, gridAttributesRenderData, disableLabelDisplay, enableSelection,
    } = this.props
    const { moduleTheme } = this.context

    const {
      attributesStyles, labelColumnStyles, valueColumnStyles, altOptionsBarStyles,
    } = moduleTheme.user.listViewStyles

    // 2 - prepare label columns and value columns
    const asColumns = this.renderAsColumns(gridAttributesRenderData)

    return (
      <div style={attributesStyles}>
        {
          disableLabelDisplay && enableSelection
            ? (this.renderCheckbox()) : null
        }
        {/* 1. show thumbnail column if configured */
          this.renderThumbnail(thumbnailRenderData)
        }
        {/* 2. show label/values alternated columns */}
        {asColumns.map((column, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={`column.index.${index}`} style={index % 2 === 0 ? labelColumnStyles : valueColumnStyles}>
            { // render the column cells
              column.map((cell) => cell)
            }
          </div>
        ))}
        {
          disableLabelDisplay
            ? <div style={altOptionsBarStyles}>
              {this.renderOptionsBarStyles()}
            </div> : null
        }
      </div>
    )
  }

  /**
   * Display a dataset cell
   *
   * @returns {XML}
   */
  render() {
    const { disableLabelDisplay } = this.props
    const { moduleTheme: { user: { listViewStyles } } } = this.context
    return (
      <div style={listViewStyles.rootStyles}>
        {/* 1. title */
          !disableLabelDisplay && this.renderTitle()
        }
        {/* 2 . Attribute */
          this.renderAttributes()
        }
      </div>
    )
  }
}
export default ListCellComponent
