/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import React from 'react'
import map from 'lodash/map'
import merge from 'lodash/merge'
import find from 'lodash/find'
import IconButton from 'material-ui/IconButton'
import Divider from 'material-ui/Divider'
import DownloadIcon from 'material-ui/svg-icons/action/get-app'
import Checkbox from 'material-ui/Checkbox'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import { DamDomain, CatalogDomain } from '@regardsoss/domain'
import { AccessShapes, DataManagementShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { getTypeRender } from '@regardsoss/attributes-common'
import { TableColumnConfiguration, TableColumnConfigurationController, DownloadButton, ShowableAtRender } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import AddElementToCartButton from '../options/AddElementToCartButton'
import OneElementServicesButton from '../options/OneElementServicesButton'
import EntityDescriptionButton from '../options/EntityDescriptionButton'

/**
 * Component to display datasets in search results.
 *
 * @author Sébastien binda
 */
class ListViewEntityCellComponent extends React.Component {

  static propTypes = {

    // Entity to display
    entity: AccessShapes.EntityWithServices.isRequired, // Entity to display
    attributes: PropTypes.objectOf(DataManagementShapes.AttributeModel),
    lineHeight: PropTypes.number.isRequired,
    // Parameters to handle row selection
    isTableSelected: PropTypes.bool,
    selectTableEntityCallback: PropTypes.func,
    // Columns configuration to display
    tableColumns: PropTypes.arrayOf(TableColumnConfiguration),
    // Display checbox for entities selection ?
    displayCheckbox: PropTypes.bool,
    // Show services for entity?
    enableServices: PropTypes.bool.isRequired,
    // optional callback: add element to cart (entity) => ()
    onAddToCart: PropTypes.func,
    // callback: on entity selection (or null when not clickable)
    onEntitySelection: PropTypes.func,
    // callback: on show description
    onShowDescription: PropTypes.func.isRequired,
    // callback: parent service starting handler
    onServiceStarted: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }


  /** Life cycle hook, component will mount. Initializes state */
  componentWillMount = () => this.setStandardStyle()

  /**
   * Set the css styles when the cursor is hover the dataset cell
   * @param cursor
   */
  setHoverStyle = () => {
    const { moduleTheme: { user: { listViewStyles } } } = this.context
    this.setState({
      style: merge({}, listViewStyles.lineHover),
    })
  }

  setHoverClickableStyle = () => {
    const { moduleTheme: { user: { listViewStyles } } } = this.context
    this.setState({
      style: merge({}, listViewStyles.lineHover, { cursor: 'pointer' }),
    })
  }

  /**
   * Set the css styles when the cursor is out the dataset cell
   */
  setStandardStyle = () => {
    const { moduleTheme: { user: { listViewStyles } } } = this.context
    this.setState({
      style: listViewStyles.lineOut,
    })
  }

  /**
   * Display the value of an attribute. An attribute is one AttribureModel of a framgent.
   * Fragments are avaialables in the "properties" property of the dataset entity.
   *
   * @param attribute
   * @param attributeValue
   * @returns {XML}
   */
  displayAttribute(attribute, attributeValue) {
    const attributes = {}
    attributes[`${attribute.content.fragment.name}.${attribute.content.name}`] = attributeValue

    const valueCellRenderer = getTypeRender(attribute.content.type)
    const element = React.createElement(valueCellRenderer, {
      attributes,
    })
    const { moduleTheme: { user: { listViewStyles } } } = this.context
    return (
      <div
        key={`${attribute.content.fragment.name}.${attribute.content.name}`}
        style={listViewStyles.attribute}
      >
        <span
          style={listViewStyles.attributeLabel}
        >{attribute.content.label}</span>
        <span
          style={{
            marginRight: 5,
            marginLeft: 5,
          }}
        >:</span>
        <span
          style={listViewStyles.attributeValue}
        >
          {element}
        </span>
      </div>
    )
  }

  /**
   * Display all the attributes of the given fragment. A fragment is a collection of ModelAttribute
   *
   * @param fragmentName
   * @param values
   * @returns {*}
   */
  displayFragment = (fragmentName, values) => {
    // Does the fragment is an attibute of default fragment ?
    const defaultAttribute = DamDomain.AttributeModelController.findAttribute(fragmentName, DamDomain.AttributeModelController.DEFAULT_FRAGMENT, this.props.attributes)
    if (defaultAttribute) {
      return this.displayAttribute(defaultAttribute, values)
    }
    // If it is a fragment
    const elements = map(values, (attrValue, key) => {
      const attribute = DamDomain.AttributeModelController.findAttribute(key, fragmentName, this.props.attributes)
      if (attribute) {
        return this.displayAttribute(attribute, attrValue)
      }
      return null
    })
    return elements
  }

  displayEntityProperty = (key, column) => {
    // Do not display special files attributes like thumbmail or rawdata
    const { moduleTheme: { user: { listViewStyles } } } = this.context
    if (column.attributes && column.attributes.length > 0 && column.attributes[0] === 'files') {
      return null
    }
    if (TableColumnConfigurationController.doesEntityValuesNotEmptyForColumnConfiguration(column, this.props.entity)) {
      return (
        <div
          key={key}
          style={listViewStyles.attribute}
        >
          <span
            style={listViewStyles.attributeLabel}
          >{column.label}</span>
          <span
            style={{
              marginRight: 5,
              marginLeft: 5,
            }}
          >:</span>
          <span
            style={listViewStyles.attributeValue}
          >
            {TableColumnConfigurationController.getConfiguredColumnValueForEntity(column, this.props.entity)}
          </span>
        </div>
      )
    }
    return null
  }

  /**
   * Display the thumbmail of the current dataset if any is defined in the "FILES" property of the entity.
   * @returns {XML}
   */
  displayThumbnail = () => {
    const thumbnail = find(this.props.entity.content.files, file => file.dataType === CatalogDomain.OBJECT_LINKED_FILE_ENUM.THUMBNAIL)
    const { moduleTheme: { user: { listViewStyles } } } = this.context
    if (thumbnail) {
      return (
        <div style={listViewStyles.thumbnail}>
          <img height="80" width="80" src={thumbnail.fileRef} alt="" />
        </div>
      )
    }
    return null
  }

  displayTitle = () => {
    const { onShowDescription, onAddToCart } = this.props
    const { moduleTheme: { user: { listViewStyles } } } = this.context
    const { rootStyles, checkboxStyles, titleLabelStyles, optionsBarStyles, option } = listViewStyles.title
    return (
      <div style={rootStyles}>
        {this.props.displayCheckbox ? <Checkbox
          onCheck={this.props.selectTableEntityCallback}
          defaultChecked={this.props.isTableSelected}
          style={checkboxStyles}
        /> : null}
        <span
          onMouseEnter={this.props.onEntitySelection ? this.setHoverClickableStyle : undefined}
          onMouseLeave={this.props.onEntitySelection ? this.setStandardStyle : undefined}
          onTouchTap={this.props.onEntitySelection ? this.props.onEntitySelection : undefined}
          style={titleLabelStyles}
        >{this.props.entity.content.label}</span>
        <div style={optionsBarStyles}>
          {this.displayDownload() // Download if available
          }
          {this.displayServices() // Services if any
          }
          <EntityDescriptionButton // Description
            style={option.buttonStyles}
            iconStyle={option.iconStyles}
            onShowDescription={onShowDescription}
          />
          <ShowableAtRender show={!!onAddToCart}>
            <AddElementToCartButton // Add to cart, only when callback is available
              onAddToCart={onAddToCart}
              style={option.buttonStyles}
              iconStyle={option.iconStyles}
            />
          </ShowableAtRender>
        </div>
      </div>
    )
  }

  displayDownload = () => {
    const rawdata = find(this.props.entity.content.files, file => file.dataType === CatalogDomain.OBJECT_LINKED_FILE_ENUM.RAWDATA)
    if (rawdata) {
      const { intl: { formatMessage }, moduleTheme: { user: { listViewStyles } } } = this.context
      return (
        <DownloadButton
          style={listViewStyles.option.buttonStyles}
          tooltip={formatMessage({ id: 'download.tooltip' })}
          iconStyle={listViewStyles.option.iconStyles}
          downloadURL={rawdata.fileRef}
          ButtonIcon={null} // remove default icon, use children instead for an Icon button
          ButtonConstructor={IconButton}
        >
          <DownloadIcon />
        </DownloadButton>)
    }
    return null
  }

  displayServices = () => {
    const { entity: { content: { services = [] } }, enableServices, onServiceStarted } = this.props
    const { moduleTheme: { user: { listViewStyles } } } = this.context
    const { option } = listViewStyles.title
    return enableServices && services.length ? (
      <OneElementServicesButton
        style={option.buttonStyles}
        iconStyle={option.iconStyles}
        services={services}
        onServiceStarted={onServiceStarted}
      />) : null
  }

  displayEntityAttributes = () => {
    const { properties } = this.props.entity.content
    const { tableColumns } = this.props
    if (tableColumns) {
      return map(tableColumns, (column, key) => this.displayEntityProperty(key, column))
    }
    return map(properties, (property, key) => this.displayFragment(key, property))
  }

  /**
   * Display a dataset cell
   *
   * @returns {XML}
   */
  render() {
    const titleStyle = { fontSize: '1.3em' }
    const headerStyle = { paddingBottom: 0 }
    const textStyle = { overflow: 'hidden' }
    const contentStyle = { display: 'inline-block' }

    const title = this.displayTitle()
    const attributes = this.displayEntityAttributes()
    const thumbnail = this.displayThumbnail()

    const cardStyles = Object.assign({}, this.state.style, { height: this.props.lineHeight })

    const { moduleTheme: { user: { listViewStyles } } } = this.context

    return (
      <Card
        style={cardStyles}
      >
        <CardHeader
          title={title}
          titleStyle={titleStyle}
          style={headerStyle}
        />
        <CardText style={textStyle}>
          <Divider />
          {thumbnail}
          <div style={contentStyle}>
            <div style={listViewStyles.line}>
              {attributes}
            </div>
          </div>
        </CardText>
      </Card>
    )
  }
}
export default ListViewEntityCellComponent
