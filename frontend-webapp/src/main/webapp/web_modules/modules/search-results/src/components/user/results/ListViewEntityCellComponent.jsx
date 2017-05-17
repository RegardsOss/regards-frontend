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
import { DetailViewContainer } from '@regardsoss/entities-common'
import { getTypeRender } from '@regardsoss/attributes-common'
import { TableColumnConfiguration, TableColumnConfigurationController } from '@regardsoss/components'
import downloadDescriptionClient from '../../../client/DownloadDescriptionClient'
import { ModelAttributesActions, ModelAttributesSelectors } from '../../../client/ModelAttributeClient'


/**
 * Component to display datasets in search results.
 *
 * @author Sébastien binda
 */
class ListViewEntityCellComponent extends React.Component {

  static propTypes = {

    // Parameters set by table component

    // Entity to display
    entity: CatalogEntity.isRequired,
    attributes: PropTypes.objectOf(AttributeModel),
    // eslint-disable-next-line react/no-unused-prop-types
    lineHeight: PropTypes.number.isRequired,
    // Parameters to handle row selection
    isTableSelected: PropTypes.bool,
    selectTableEntityCallback: PropTypes.func,

    // Parameters set by columnConfiguration

    // Columns configuration to display
    tableColumns: PropTypes.arrayOf(TableColumnConfiguration),
    // Callback to run a new search with the given tag
    onSearchTag: PropTypes.func,
    // Callback when click on entity label
    onClick: PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    styles: PropTypes.object,
    // Display checbox for entities selection ?
    displayCheckBoxes: PropTypes.bool,
  }

  static contextTypes = {
    ...themeContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      style: this.props.styles.lineOut,
      descriptionOpen: false,
    }
  }

  onCloseDescription = () => {
    this.setState({
      descriptionOpen: false,
    })
  }

  /**
   * Callback to display entity description
   */
  onEntityInformation = () => {
    this.setState({
      descriptionOpen: true,
    })
  }

  /**
   * Callback when a dataset is selected. Click on his label
   */
  onEntitySelection = () => {
    this.props.onClick(this.props.entity)
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

  displayTitle = () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {this.props.displayCheckBoxes ? <Checkbox
        onCheck={this.props.selectTableEntityCallback}
        defaultChecked={this.props.isTableSelected}
        style={{
          width: 'auto',
        }}
      /> : null}
      <span
        onMouseEnter={this.props.onClick ? this.setHoverClickableStyle : undefined}
        onMouseLeave={this.props.onClick ? this.setStandardStyle : undefined}
        onTouchTap={this.props.onClick ? this.onEntitySelection : undefined}
        style={{
          marginRight: 10,
        }}
      >{this.props.entity.content.label}</span>
      <div
        style={{
          display: 'flex',
          right: 15,
          position: 'absolute',
        }}
      >
        {this.displayDownload()}
        <InfoIcon
          onTouchTap={this.onEntityInformation}
          style={{
            cursor: 'pointer',
            marginLeft: 15,
          }}
        />
      </div>
    </div>
  )

  displayDescription = () => {
    if (this.state.descriptionOpen) {
      return (
        <DetailViewContainer
          dialogHeightPercent={50}
          dialogWidthPercent={60}
          open={this.state.descriptionOpen}
          entity={this.props.entity}
          onClose={this.onCloseDescription}
          downloadDescriptionClient={downloadDescriptionClient}
          fetchModelAttributesActions={ModelAttributesActions}
          fetchModelAttributesSelectors={ModelAttributesSelectors}
          onSearchTag={this.handleSearchTag}
        />
      )
    }
    return null
  }

  displayDownload = () => {
    const rawdata = find(this.props.entity.content.files, file => file.type === ObjectLinkedFileTypes.RAWDATA)
    if (rawdata) {
      return (
        <div>
          <a href={rawdata.uri} download title="download">
            <GetApp
              style={{ cursor: 'pointer' }}
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
    this.onCloseDescription()
    this.props.onSearchTag(tag)
  }

  /**
   * Display a dataset cell
   *
   * @returns {XML}
   */
  render() {
    return (
      <Card
        style={this.state.style}
      >
        <CardHeader
          title={this.displayTitle()}
          titleStyle={{
            fontSize: '1.3em',
          }}
          style={{
            paddingBottom: 0,
          }}
        />
        <CardText
          style={{
            overflow: 'hidden',
          }}
        >
          <Divider />
          {this.displayThumbmail()}
          <div
            style={{
              display: 'inline-block',
            }}
          >
            <div style={this.props.styles.line}>
              {this.displayEntityAttributes()}
            </div>
          </div>
          {this.displayDescription()}
        </CardText>
      </Card>
    )
  }
}
export default ListViewEntityCellComponent
