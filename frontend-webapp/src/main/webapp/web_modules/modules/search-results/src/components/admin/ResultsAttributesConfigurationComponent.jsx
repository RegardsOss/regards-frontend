/**
 * LICENSE_PLACEHOLDER
 **/
import { map, isEqual, concat, remove, values } from 'lodash'
import {
  AttributeModel,
  AttributeConfiguration,
  AttributeConfigurationController,
  AttributesRegroupementConfiguration,
} from '@regardsoss/model'
import StandardAttributesConfigurationComponent from './StandardAttributesConfigurationComponent'
import DynamicAttributesConfigurationComponent from './DynamicAttributesConfigurationComponent'
import AttributeRegroupementConfigurationComponent from './AttributeRegroupementConfigurationComponent'

/**
 * Component to display attributes configuration list.
 * @author Sébastien binda
 */
class ResultsAttributesConfigurationComponent extends React.Component {

  static propTypes = {
    // Available Attributes for configuration
    selectableAttributes: React.PropTypes.objectOf(AttributeModel).isRequired,
    // Initial configuration of the current module
    defaultAttributesConf: React.PropTypes.arrayOf(AttributeConfiguration),
    defaultAttributesRegroupementsConf: React.PropTypes.arrayOf(AttributesRegroupementConfiguration),
    // Current configuration
    attributesConf: React.PropTypes.arrayOf(AttributeConfiguration),
    attributesRegroupementsConf: React.PropTypes.arrayOf(AttributesRegroupementConfiguration),
    // Redux-form function to change current form values
    changeField: React.PropTypes.func.isRequired,
  }

  /**
   * At mount, check that the configuration is valid with the available attributes.
   */
  componentDidMount() {
    if (this.props.attributesConf) {
      const updatedConf = this.removeUnavailableAttributesConfiguration(this.props.attributesConf)
      if (!isEqual(updatedConf, this.props.attributesConf)) {
        this.props.changeField('conf.attributes', updatedConf)
      }
    }
  }

  /**
   * If available attributes changes, update the configuration by using the initial configuration
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (isEqual(!nextProps.selectableAttributes, this.props.selectableAttributes)) {
      // The available attributes changed. So the current configuration is no longer valid.
      if (this.props.attributesConf) {
        this.props.changeField('conf.attributes', this.removeUnavailableAttributesConfiguration(this.props.defaultAttributesConf))
      }
      if (this.props.attributesRegroupementsConf) {
        this.props.changeField('conf.attributesRegroupements', this.props.defaultAttributesRegroupementsConf)
      }
    }
  }

  /**
   * Change attribute configuration into the redux-form
   * @param attributeId
   * @param conf
   */
  onChange = (attributeFullQualifiedName, conf) => {
    let newConf = true
    // If conf for the given attribute already exists, then update it
    let newAttributesConf = []
    if (this.props.attributesConf) {
      newAttributesConf = map(this.props.attributesConf, (attributeConf) => {
        if (attributeConf.attributeFullQualifiedName === attributeFullQualifiedName) {
          newConf = false
          return conf
        }
        return attributeConf
      })
    }

    // Else add the new attribute conf
    if (newConf) {
      newAttributesConf.push(conf)
    }
    this.props.changeField('conf.attributes', newAttributesConf)
  }

  /**
   * Callback when a property of an attribute is changed
   * @param label
   * @param conf
   */
  onChangeRegroupement = (label, conf) => {
    let newConf = true
    // If conf for the given attribute already exists, then update it
    let newAttributesConf = []
    if (this.props.attributesRegroupementsConf) {
      newAttributesConf = map(this.props.attributesRegroupementsConf, (attributeConf) => {
        if (attributeConf.label === label) {
          newConf = false
          return conf
        }
        return attributeConf
      })
    }

    // Else add the new attribute conf
    if (newConf) {
      newAttributesConf.push(conf)
    }
    this.props.changeField('conf.attributesRegroupements', newAttributesConf)
  }

  /**
   * Callback called to remove an existing regroupement
   */
  onDeleteRegroupement = (regroupementConf) => {
    const newAttributesConf = concat([], this.props.attributesRegroupementsConf)
    remove(newAttributesConf, conf => conf.label === regroupementConf.label)
    this.props.changeField('conf.attributesRegroupements', newAttributesConf)
  }

  /**
   * Update given attributes configuration with avaialble attributes.
   * If configuration contains attributes that are not available, so remove theme
   */
  removeUnavailableAttributesConfiguration(attributesConf) {
    // Remove attribute configuration for unavailable attributes
    const updatedAttributesConf = concat([], attributesConf)
    remove(updatedAttributesConf,
      attributeConf => !AttributeConfigurationController.findAttributeConf(values(this.props.selectableAttributes), attributeConf),
    )
    return updatedAttributesConf
  }

  render() {
    const attributesRegroupementConf = this.props.attributesRegroupementsConf ? this.props.attributesRegroupementsConf : []
    const attributesConf = this.props.attributesConf ? this.props.attributesConf : []
    return (
      <div>
        <AttributeRegroupementConfigurationComponent
          selectableAttributes={this.props.selectableAttributes}
          attributesRegroupementsConf={attributesRegroupementConf}
          onChangeRegroupenentConfiguration={this.onChangeRegroupement}
          onDeleteRegroupement={this.onDeleteRegroupement}
        />
        <StandardAttributesConfigurationComponent
          attributesConf={attributesConf}
          onChangeAttributeConfiguration={this.onChange}
        />
        <DynamicAttributesConfigurationComponent
          selectableAttributes={this.props.selectableAttributes}
          attributesConf={attributesConf}
          onChangeAttributeConfiguration={this.onChange}
        />
      </div>
    )
  }
}

export default ResultsAttributesConfigurationComponent
