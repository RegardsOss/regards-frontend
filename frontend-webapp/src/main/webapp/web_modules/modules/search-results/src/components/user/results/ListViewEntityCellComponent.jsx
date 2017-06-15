/**
 * LICENSE_PLACEHOLDER
 **/
import React from 'react'
import map from 'lodash/map'
import merge from 'lodash/merge'
import find from 'lodash/find'
import Divider from 'material-ui/Divider'
import GetApp from 'material-ui/svg-icons/action/get-app'
import Checkbox from 'material-ui/Checkbox'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import InfoIcon from 'material-ui/svg-icons/action/info-outline'
import {
  CatalogEntity,
  AttributeModel,
  AttributeModelController,
  ObjectLinkedFileTypes,
} from '@regardsoss/model'
import { themeContextType } from '@regardsoss/theme'
import { getTypeRender } from '@regardsoss/attributes-common'
import { TableColumnConfiguration, TableColumnConfigurationController } from '@regardsoss/components'

/**
 * Component to display datasets in search results.
 *
 * @author Sébastien binda
 */
class ListViewEntityCellComponent extends React.Component {

  static propTypes = {

    // Entity to display
    entity: CatalogEntity.isRequired,
    attributes: PropTypes.objectOf(AttributeModel),
    lineHeight: PropTypes.number.isRequired,
    // Parameters to handle row selection
    isTableSelected: PropTypes.bool,
    selectTableEntityCallback: PropTypes.func,
    // Columns configuration to display
    tableColumns: PropTypes.arrayOf(TableColumnConfiguration),
    // Callback to run a new search with the given tag
    onSearchTag: PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    styles: PropTypes.object,
    // Display checbox for entities selection ?
    displayCheckBoxes: PropTypes.bool,
    // callback: on entity selection (or null when not clickable)
    onEntitySelection: PropTypes.func,
    // callback: on show description
    onShowDescription: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      style: this.props.styles.lineOut,
    }
  }
  /**
   * Set the css styles when the cursor is hover the dataset cell
   * @param cursor
   */
  setHoverStyle = () => {
    this.setState({
      style: merge({}, this.props.styles.lineHover),
    })
  }

  setHoverClickableStyle = () => {
    this.setState({
      style: merge({}, this.props.styles.lineHover, { cursor: 'pointer' }),
    })
  }

  /**
   * Set the css styles when the cursor is out the dataset cell
   */
  setStandardStyle = () => {
    this.setState({
      style: this.props.styles.lineOut,
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

    return (
      <div
        key={`${attribute.content.fragment.name}.${attribute.content.name}`}
        style={this.props.styles.attribute}
      >
        <span
          style={this.props.styles.attributeLabel}
        >{attribute.content.label}</span>
        <span
          style={{
            marginRight: 5,
            marginLeft: 5,
          }}
        >:</span>
        <span
          style={this.props.styles.attributeValue}
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
    const defaultAttribute = AttributeModelController.findAttribute(fragmentName, AttributeModelController.DEFAULT_FRAGMENT, this.props.attributes)
    if (defaultAttribute) {
      return this.displayAttribute(defaultAttribute, values)
    }
    // If it is a fragment
    const elements = map(values, (attrValue, key) => {
      const attribute = AttributeModelController.findAttribute(key, fragmentName, this.props.attributes)
      if (attribute) {
        return this.displayAttribute(attribute, attrValue)
      }
      return null
    })
    return elements
  }

  displayEntityProperty = (key, column) => {
    // Do not display special files attributes like thumbmail or rawdata
    if (column.attributes && column.attributes.length > 0 && column.attributes[0] === 'files') {
      return null
    }
    if (TableColumnConfigurationController.doesEntityValuesNotEmptyForColumnConfiguration(column, this.props.entity)) {
      return (
        <div
          key={key}
          style={this.props.styles.attribute}
        >
          <span
            style={this.props.styles.attributeLabel}
          >{column.label}</span>
          <span
            style={{
              marginRight: 5,
              marginLeft: 5,
            }}
          >:</span>
          <span
            style={this.props.styles.attributeValue}
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
  displayThumbmail = () => {
    const thumbmail = find(this.props.entity.content.files, file => file.type === ObjectLinkedFileTypes.THUMBMAIL)
    if (thumbmail) {
      return (
        <div style={this.props.styles.thumbmail}>
          <img height="80" width="80" src={thumbmail.uri} alt="" />
        </div>
      )
    }
    return null
  }

  displayTitle = () => {
    const mainStyle = { display: 'flex', alignItems: 'center' }
    const checkboxStyle = { width: 'auto' }
    const titleStyle = { marginRight: 10 }
    const downloadStyle = { display: 'flex', right: 15, position: 'absolute' }
    const infoIconStyle = { cursor: 'pointer', marginLeft: 15 }
    return (
      <div style={mainStyle}>
        {this.props.displayCheckBoxes ? <Checkbox
          onCheck={this.props.selectTableEntityCallback}
          defaultChecked={this.props.isTableSelected}
          style={checkboxStyle}
        /> : null}
        <span
          onMouseEnter={this.props.onEntitySelection ? this.setHoverClickableStyle : undefined}
          onMouseLeave={this.props.onEntitySelection ? this.setStandardStyle : undefined}
          onTouchTap={this.props.onEntitySelection ? this.props.onEntitySelection : undefined}
          style={titleStyle}
        >{this.props.entity.content.label}</span>
        <div style={downloadStyle}>
          {this.displayDownload()}
          <InfoIcon
            onTouchTap={this.props.onShowDescription}
            style={infoIconStyle}
          />
        </div>
      </div>
    )
  }

  displayDownload = () => {
    const rawdata = find(this.props.entity.content.files, file => file.type === ObjectLinkedFileTypes.RAWDATA)
    if (rawdata) {
      const iconStyle = { cursor: 'pointer' }
      return (
        <div>
          <a href={rawdata.uri} download title="download">
            <GetApp
              style={iconStyle}
              hoverColor={this.context.muiTheme.palette.accent1Color}
            />
          </a>
        </div>
      )
    }
    return null
  }

  displayEntityAttributes = () => {
    const { properties } = this.props.entity.content
    const { tableColumns } = this.props
    if (tableColumns) {
      return map(tableColumns, (column, key) => this.displayEntityProperty(key, column))
    }
    return map(properties, (property, key) => this.displayFragment(key, property))
  }

  handleSearchTag = (tag) => {
    this.props.onSearchTag(tag)
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
    const thumbmail = this.displayThumbmail()

    const cardStyles = Object.assign({}, this.state.style, { height: this.props.lineHeight })

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
          {thumbmail}
          <div style={contentStyle}>
            <div style={this.props.styles.line}>
              {attributes}
            </div>
          </div>
        </CardText>
      </Card>
    )
  }
}
export default ListViewEntityCellComponent
