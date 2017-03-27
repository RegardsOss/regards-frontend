/**
 * LICENSE_PLACEHOLDER
 **/
import React from 'react'
import map from 'lodash/map'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import Chip from 'material-ui/Chip'
import { CatalogEntity, AttributeModel, AttributeModelController } from '@regardsoss/model'
import { themeContextType } from '@regardsoss/theme'
import CustomCellByAttributeTypeEnum from './cells/CustomCellByAttributeTypeEnum'
import DefaultCell from './cells/DefaultCell'
/**
 * Component to display datasets in search results.
 *
 * @author Sébastien binda
 */
class DatasetCellComponent extends React.Component {

  static propTypes = {
    entity: CatalogEntity.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    lineHeight: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func,
    attributes: React.PropTypes.arrayOf(AttributeModel),
  }

  static contextTypes = {
    ...themeContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      style: { height: '100%', width: '95%', margin: 'auto', cursor: 'pointer' },
    }
  }

  onDatasetSelection = () => {
    this.props.onClick(this.props.entity)
  }

  setHoverStyle = () => {
    this.setState({
      style: {
        height: '100%',
        width: '95%',
        margin: 'auto',
        cursor: 'pointer',
        backgroundColor: this.context.muiTheme.palette.primary3Color,
      },
    })
  }
  setStandardStyle = () => {
    this.setState({
      style: { height: '100%', width: '95%', margin: 'auto', cursor: 'pointer' },
    })
  }

  getFragmentValue = (fragmentName, values) => {
    // Does the fragment is an attibute of default fragment ?
    const defaultAttribute = AttributeModelController.findAttribute(fragmentName, AttributeModelController.DEFAULT_FRAGMENT, this.props.attributes)
    if (defaultAttribute) {
      return this.displayAttributeValue(defaultAttribute, values)
    }
    // If it is a fragment
    const elements = map(values, (attrValue, key) => {
      const attribute = AttributeModelController.findAttribute(key, fragmentName, this.props.attributes)
      if (attribute) {
        return this.displayAttributeValue(attribute, attrValue)
      }
      return null
    })
    return elements
  }

  displayAttributeValue(attribute, attributeValue) {
    const attributes = {}
    attributes[`${attribute.content.fragment.name}.${attribute.content.name}`] = attributeValue

    let valueCellRenderer = CustomCellByAttributeTypeEnum[attribute.content.type]
    if (!valueCellRenderer) {
      valueCellRenderer = DefaultCell
    } else {
      console.log('ATTR', attribute.content.type, valueCellRenderer)
    }

    const element = React.createElement(valueCellRenderer, {
      attributes,
    })

    return (
      <Chip key={attribute.content.id} style={{ margin: '5px 5px' }}>
        <span
          style={{ display: 'flex', flexDirection: 'row' }}
        >
          <span
            style={{
              color: this.context.muiTheme.palette.accent1Color,
            }}
          >{attribute.content.label}</span>
          {' : '}
          {element}
        </span>
      </Chip>
    )
  }

  render() {
    return (
      <Card
        style={this.state.style}
        onMouseEnter={this.setHoverStyle}
        onMouseLeave={this.setStandardStyle}
        onTouchTap={this.onDatasetSelection}
      >
        <CardHeader
          title={this.props.entity.content.label}
          titleStyle={{
            fontSize: '1.3em',
          }}
          style={{
            paddingBottom: 0,
          }}
        />
        <CardText>
          <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 10 }}>
            {map(this.props.entity.content.properties, (property, key) => this.getFragmentValue(key, property),
            )}
          </div>
        </CardText>
      </Card>
    )
  }
}
export default DatasetCellComponent
