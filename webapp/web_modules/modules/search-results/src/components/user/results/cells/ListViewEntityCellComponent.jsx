/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { AccessShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { ShowableAtRender } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import AddElementToCartContainer from '../../../../containers/user/results/options/AddElementToCartContainer'
import DownloadEntityFileComponent from '../options/DownloadEntityFileComponent'
import EntityDescriptionComponent from '../options/EntityDescriptionComponent'
import OneElementServicesContainer from '../../../../containers/user/results/options/OneElementServicesContainer'
import SearchRelatedEntitiesComponent from '../options/SearchRelatedEntitiesComponent'

/**
 * Shape for render data properties (packed to be efficient at render time)
 */
export const AttributeRenderData = PropTypes.shape({
  key: PropTypes.string.isRequired,
  label: PropTypes.string, // optional as it is not provided for thumbnail
  unit: PropTypes.string, // optional unit type of attribute
  renderers: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
    RenderConstructor: PropTypes.func.isRequired,
  })).isRequired,
})
/**
 * Component to display datasets in search results.
 *
 * @author Sébastien binda
 */
class ListViewEntityCellComponent extends React.Component {
  static propTypes = {
    // Entity to display
    entity: AccessShapes.EntityWithServices.isRequired, // Entity to display
    enableDownload: PropTypes.bool.isRequired,
    thumbnailRenderData: AttributeRenderData, // no thumbnail when not provided
    gridAttributesRenderData: PropTypes.arrayOf(AttributeRenderData).isRequired,
    selectionEnabled: PropTypes.bool,
    servicesEnabled: PropTypes.bool.isRequired,
    entitySelected: PropTypes.bool.isRequired,
    displayLabel: PropTypes.bool,
    displayVertically: PropTypes.bool,
    isDescAvailableFor: PropTypes.func.isRequired,
    // auth info
    accessToken: PropTypes.string,
    projectName: PropTypes.string.isRequired,
    // Callback
    onSelectEntity: PropTypes.func.isRequired,
    onSearchEntity: PropTypes.func,
    onAddToCart: PropTypes.func,
    onShowDescription: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static defaultProps = {
    displayLabel: true,
    displayVertically: false,
  }

  /**
   * Callback: user requested description display
   */
  onShowDescription = () => {
    const { entity, onShowDescription } = this.props
    onShowDescription(entity)
  }

  /**
   * Renders title area of the list cell (title, with checkbox if selection enabled, empty space and options)
   */
  renderTitle = () => {
    const {
      entity, selectionEnabled, servicesEnabled, enableDownload, entitySelected, displayLabel, displayVertically, projectName, accessToken,
      isDescAvailableFor, onSelectEntity, onSearchEntity, onAddToCart,
    } = this.props
    const { moduleTheme } = this.context
    const {
      rootStyles, labelGroup, checkboxStyles, labelStyles, optionsBarVerticalStyles, optionsBarHorizontalStyles, option,
    } = moduleTheme.user.listViewStyles.title
    const optionsBarStyles = displayVertically ? optionsBarVerticalStyles : optionsBarHorizontalStyles
    const services = get(entity, 'content.services', [])

    return (
      <div style={rootStyles}>
        {/* A. clickable title area, with checkbox when it can be selected */}
        <div style={labelGroup}>
          {selectionEnabled ? (
            <Checkbox
              onCheck={onSelectEntity}
              checked={entitySelected}
              style={checkboxStyles}
            />) : null}
          <ShowableAtRender show={displayLabel}>
            <h2 style={labelStyles}>
              {entity.content.label}
            </h2>
          </ShowableAtRender>
        </div>
        {/* B. Options bar */}
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
          <ShowableAtRender show={isDescAvailableFor(entity.content.entityType)}>
            <EntityDescriptionComponent
              entity={entity}
              onShowDescription={this.onShowDescription}
              style={option.buttonStyles}
              iconStyle={option.iconStyles}
            />
          </ShowableAtRender>
          {/* B-3 Show dataset content when enabled */}
          <ShowableAtRender show={!!onSearchEntity}>
            <SearchRelatedEntitiesComponent
              entity={entity}
              onSearchEntity={onSearchEntity}
              style={option.buttonStyles}
              iconStyle={option.iconStyles}
            />
          </ShowableAtRender>
          {/* B-4. services, when enabled */}
          <ShowableAtRender show={servicesEnabled && !!services.length}>
            <OneElementServicesContainer
              entity={entity}
              style={option.buttonStyles}
              iconStyle={option.iconStyles}
            />
          </ShowableAtRender>
          {/* B-5. add to cart,  when available (ie has callback) - not showable because callback is required by the AddElementToCartContainer */}
          {onAddToCart ? (
            <AddElementToCartContainer
              entity={entity}
              onAddToCart={onAddToCart}
              style={option.buttonStyles}
              iconStyle={option.iconStyles}
            />) : null
          }
        </div>
      </div>
    )
  }

  /**
   * Renders a single attribute through dedicated values renderer (using common entities render)
   * @param {AttributeRenderData} renderData render data for attribute
   * @return {[React.Element]} built components array for value
   */
  renderAttributeValue = ({ key, renderers, unit }) => {
    const { entity } = this.props
    const { intl: { formatMessage } } = this.context
    return flatMap(renderers, ({ path, RenderConstructor }, index) => [
      // insert separator if mutilple values
      index > 0 ? (<div key={`separator.${path}`}>{formatMessage({ id: 'results.cell.multiple.values.separator' })}</div>) : null,
      <RenderConstructor key={path} value={get(entity, path)} unit={unit} />])
  }

  /**
   * Renders attributes to show in grid into a matrix as follow:
   * Element at 0, 2, ... are labels
   * Elements at 1, 3, ... are values
   * @param gridAttributeModels attribute models to show in grid
   * @return built columns matrix
   */
  renderAsColumns = (gridAttributeModels) => {
    const { muiTheme, moduleTheme } = this.context
    const { labelCellStyle, valueCellStyle } = moduleTheme.user.listViewStyles
    const { listRowsByColumnCount } = muiTheme.module.searchResults
    return gridAttributeModels.reduce((columnsAcc, model, index) => {
      // 1 - Render label and value
      const labelCell = <div key={model.key} style={labelCellStyle}>{model.label}</div>
      const valueCell = <div key={model.key} style={valueCellStyle}>{this.renderAttributeValue(model)}</div>
      // 2 assign them to the current columns (or new columns if required), knowing we build two columns for one attribute
      const columnIndex = (index / listRowsByColumnCount) * 2
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
    const { thumbnailRenderData, gridAttributesRenderData } = this.props
    const { moduleTheme } = this.context

    const {
      attributesStyles, thumbnailColumnStyle, labelColumnStyles, valueColumnStyles,
    } = moduleTheme.user.listViewStyles

    // 2 - prepare label columns and value columns
    const asColumns = this.renderAsColumns(gridAttributesRenderData)

    return (
      <div style={attributesStyles}>
        {/* 1. show thumbnail column if configured */
          thumbnailRenderData ? (
            <div style={thumbnailColumnStyle}>
              {
                this.renderAttributeValue(thumbnailRenderData, false)
              }
            </div>) : null
        }
        {/* 2. show label/values alternated columns */}
        {asColumns.map((column, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={`column.index.${index}`} style={index % 2 === 0 ? labelColumnStyles : valueColumnStyles}>
            { // render the column cells
              column.map(cell => cell)
            }
          </div>
        ))
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
    const { moduleTheme: { user: { listViewStyles } } } = this.context
    return (
      <div style={listViewStyles.rootStyles}>
        {/* 1. title */
          this.renderTitle()
        }
        {/* 2 . Attribute */
          this.renderAttributes()
        }
      </div>
    )
  }
}
export default ListViewEntityCellComponent
