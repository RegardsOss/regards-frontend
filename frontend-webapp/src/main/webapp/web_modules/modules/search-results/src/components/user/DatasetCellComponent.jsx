/**
 * LICENSE_PLACEHOLDER
 **/
import React from 'react'
import map from 'lodash/map'
import merge from 'lodash/merge'
import find from 'lodash/find'
import Divider from 'material-ui/Divider'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import InfoIcon from 'material-ui/svg-icons/action/info-outline'
import { CatalogEntity, AttributeModel, AttributeModelController, ObjectLinkedFileTypes } from '@regardsoss/model'
import { themeContextType } from '@regardsoss/theme'
import { getTypeRender } from '@regardsoss/attributes-common'
import DatasetDescriptionComponent from './DatasetDescriptionComponent'

/**
 * Component to display datasets in search results.
 *
 * @author Sébastien binda
 */
class DatasetCellComponent extends React.Component {

  static propTypes = {
    entity: CatalogEntity.isRequired,
    onSearchTag: React.PropTypes.func,
    // eslint-disable-next-line react/no-unused-prop-types
    lineHeight: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func,
    attributes: React.PropTypes.objectOf(AttributeModel),
    // eslint-disable-next-line react/forbid-prop-types
    styles: React.PropTypes.object,
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
   * Callback to display dataset description
   */
  onDatasetInformation = () => {
    this.setState({
      descriptionOpen: true,
    })
  }

  /**
   * Callback when a dataset is selected. Click on his label
   */
  onDatasetSelection = () => {
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

  displayDatasetTitle = () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <span
        onMouseEnter={this.setHoverClickableStyle}
        onMouseLeave={this.setHoverStyle}
        onTouchTap={this.onDatasetSelection}
        style={{
          marginRight: 10,
        }}
      >{this.props.entity.content.label}</span>
      <InfoIcon
        onMouseEnter={this.setHoverClickableStyle}
        onMouseLeave={this.setHoverStyle}
        onTouchTap={this.onDatasetInformation}
        style={{
          right: 15,
          position: 'absolute',
        }}
      />
    </div>
  )

  displayDescription = () => {
    if (this.state.descriptionOpen) {
      return (
        <DatasetDescriptionComponent
          entity={this.props.entity}
          onClose={this.onCloseDescription}
          onSearchTag={this.props.onSearchTag}
        />
      )
    }
    return null
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
        onMouseEnter={this.setHoverStyle}
        onMouseLeave={this.setStandardStyle}
      >
        <CardHeader
          title={this.displayDatasetTitle()}
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
              {map(this.props.entity.content.properties, (property, key) => this.displayFragment(key, property),
              )}
            </div>
          </div>
          {this.displayDescription()}
        </CardText>
      </Card>
    )
  }
}
export default DatasetCellComponent
