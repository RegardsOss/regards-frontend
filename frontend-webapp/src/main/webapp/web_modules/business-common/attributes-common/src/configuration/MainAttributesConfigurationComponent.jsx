/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import isEqual from 'lodash/isEqual'
import concat from 'lodash/concat'
import remove from 'lodash/remove'
import transform from 'lodash/transform'
import values from 'lodash/values'
import Divider from 'material-ui/Divider'
import { AccessShapes, DataManagementShapes } from '@regardsoss/shape'
import { ShowableAtRender } from '@regardsoss/components'
import StandardAttributesConfigurationComponent from './StandardAttributesConfigurationComponent'
import DynamicAttributesConfigurationComponent from './DynamicAttributesConfigurationComponent'
import AttributeRegroupementConfigurationComponent from './AttributeRegroupementConfigurationComponent'

/**
 * Component to display attributes configuration list.
 * Please note that the component i18n should defined in using module
 * @author Sébastien binda
 */
class MainAttributesConfigurationComponent extends React.Component {

  static propTypes = {
    // Available Attributes for configuration
    selectableAttributes: DataManagementShapes.AttributeModelList.isRequired,
    // Initial configuration of the current module
    defaultAttributesConf: PropTypes.arrayOf(AccessShapes.AttributeConfigurationContent),
    defaultAttributesRegroupementsConf: PropTypes.arrayOf(AccessShapes.AttributesGroupConfigurationContent),
    // Current configuration
    attributesConf: PropTypes.arrayOf(AccessShapes.AttributeConfigurationContent),
    attributesRegroupementsConf: PropTypes.arrayOf(AccessShapes.AttributesGroupConfigurationContent),
    // shold allow facettes configuration?
    allowFacettes: PropTypes.bool.isRequired,
    // should allow attributes regroupement configuration?
    allowAttributesRegroupements: PropTypes.bool.isRequired,
    // attributes field name in redux form
    attributesFieldName: PropTypes.string.isRequired,
    // attributes regroupement field name in redux form (not required, used only when regroupement are allowed)
    regroupementsFieldName: PropTypes.string,
    // Redux-form function to change current form values
    changeField: PropTypes.func.isRequired,
  }

  /**
   * At mount, check that the configuration is valid with the available attributes.
   */
  componentDidMount() {
    const { attributesConf, changeField, attributesFieldName } = this.props
    if (attributesConf) {
      const updatedConf = this.removeUnavailableAttributesConfiguration(attributesConf)
      if (!isEqual(updatedConf, attributesConf)) {
        changeField(attributesFieldName, updatedConf)
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
        this.props.changeField(this.props.attributesFieldName, this.removeUnavailableAttributesConfiguration(this.props.defaultAttributesConf))
      }
      if (this.props.attributesRegroupementsConf) {
        this.props.changeField(this.props.regroupementsFieldName, this.props.defaultAttributesRegroupementsConf)
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
    const { attributesConf, changeField, attributesFieldName } = this.props
    if (attributesConf) {
      newAttributesConf = map(attributesConf, (attributeConf) => {
        if (attributeConf.attributeFullQualifiedName === attributeFullQualifiedName) {
          newConf = false
          return conf
        }
        return attributeConf
      })
    }

    // Check if there is more than one defaultSort configured
    if (conf.initialSort) {
      newAttributesConf = transform(newAttributesConf, (results, attributeConf) => {
        if (attributeConf.attributeFullQualifiedName !== attributeFullQualifiedName) {
          attributeConf.initialSort = false
        }
        results.push(attributeConf)
      }, [])
    }

    // Else add the new attribute conf
    if (newConf) {
      newAttributesConf.push(conf)
    }
    changeField(attributesFieldName, newAttributesConf)
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
    this.props.changeField(this.props.regroupementsFieldName, newAttributesConf)
  }

  /**
   * Callback called to remove an existing regroupement
   */
  onDeleteRegroupement = (regroupementConf) => {
    const newAttributesConf = concat([], this.props.attributesRegroupementsConf)
    remove(newAttributesConf, conf => conf.label === regroupementConf.label)
    this.props.changeField(this.props.regroupementsFieldName, newAttributesConf)
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
    const { attributesConf = [], attributesRegroupementsConf = [], allowAttributesRegroupements, allowFacettes } = this.props
    const styles = { marginTop: 20 }
    return (
      <div>
        <StandardAttributesConfigurationComponent
          attributesConf={attributesConf}
          allowFacettes={allowFacettes}
          onChangeAttributeConfiguration={this.onChange}
        />
        <Divider style={styles} />
        <DynamicAttributesConfigurationComponent
          selectableAttributes={this.props.selectableAttributes}
          attributesConf={attributesConf}
          allowFacettes={allowFacettes}
          onChangeAttributeConfiguration={this.onChange}
        />
        <ShowableAtRender show={allowAttributesRegroupements}>
          <AttributeRegroupementConfigurationComponent
            selectableAttributes={this.props.selectableAttributes}
            attributesRegroupementsConf={attributesRegroupementsConf}
            onChangeRegroupenentConfiguration={this.onChangeRegroupement}
            onDeleteRegroupement={this.onDeleteRegroupement}
          />
          <Divider style={styles} />
        </ShowableAtRender>
      </div>
    )
  }
}

export default MainAttributesConfigurationComponent
