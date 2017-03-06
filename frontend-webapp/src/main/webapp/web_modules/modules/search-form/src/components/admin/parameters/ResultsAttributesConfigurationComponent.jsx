/**
 * LICENSE_PLACEHOLDER
 **/
import { map, isEqual, concat, remove, find } from 'lodash'
import { List } from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import Subheader from 'material-ui/Subheader'
import { AttributeModel } from '@regardsoss/model'
import AttributeConfiguration from '../../../models/attributes/AttributeConfiguration'
import AttributesRegroupementConfiguration from '../../../models/attributes/AttributesRegroupementConfiguration'
import AttributeConfigurationComponent from './AttributeConfigurationComponent'

/**
 * Component to display attributes configuration list.
 * @author Sébastien binda
 */
class ResultsAttributesConfigurationComponent extends React.Component {

  static propTypes = {
    // Available Attributes for configuration
    selectableAttributes: React.PropTypes.objectOf(AttributeModel).isRequired,
    // Initial configuration of the current module
    defaultAttributesConf: React.PropTypes.arrayOf(AttributeConfiguration).isRequired,
    defaultAttributesRegroupementsConf: React.PropTypes.arrayOf(AttributesRegroupementConfiguration).isRequired,
    // Current configuration
    attributesConf: React.PropTypes.arrayOf(AttributeConfiguration),
    attributesRegroupementConf: React.PropTypes.arrayOf(AttributesRegroupementConfiguration),
    // Redux-form function to change current form values
    changeField: React.PropTypes.func.isRequired,
  }

  /**
   * At mount, check that the configuration is valid with the available attributes.
   */
  componentDidMount() {
    this.props.changeField('conf.attributes', this.removeUnavailableAttributesConfiguration(this.props.defaultAttributesConf))
  }

  /**
   * If available attributes changes, update the configuration by using the initial configuration
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (isEqual(!nextProps.selectableAttributes, this.props.selectableAttributes)) {
      // The avaialbe attributes changed. So the current configuration is no longer valid.
      this.props.changeField('conf.attributes', this.removeUnavailableAttributesConfiguration(this.props.defaultAttributesConf))
      this.props.changeField('conf.attributesRegroupements', this.props.defaultAttributesRegroupementsConf)
    }
  }

  /**
   * Change attribute configuration into the redux-form
   * @param attributeId
   * @param conf
   */
  onChange = (attributeId, conf) => {
    let newConf = true
    // If conf for the given attribute already exists, then update it
    let newAttributesConf = []
    if (this.props.attributesConf) {
      newAttributesConf = map(this.props.attributesConf, (attributeConf) => {
        if (attributeConf.id === attributeId) {
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
   * Update given attributes configuration with avaialble attributes.
   * If configuration contains attributes that are not available, so remove theme
   */
  removeUnavailableAttributesConfiguration(attributesConf) {
    // Remove attribute configuration for unavailable attributes
    const updatedAttributesConf = concat([], attributesConf)
    remove(updatedAttributesConf, attributeConf => find(this.props.selectableAttributes, attribute => attribute.content.id === attributeConf.id))
    return updatedAttributesConf
  }

  render() {
    return (
      <div>
        <RaisedButton label="Add attributes regroupement" secondary />
        <List>
          <Subheader>Configure attributes regroupement to display after every search result</Subheader>

          <Subheader>Configure attributes retrieved from each search result</Subheader>
          {map(this.props.selectableAttributes, (selectableAttribute) => {
            // Search existing associated attribute configuration if there is one
            const conf = find(this.props.attributesConf, configuration => configuration.id === selectableAttribute.content.id)
            return (<AttributeConfigurationComponent
              key={selectableAttribute.content.id}
              attribute={selectableAttribute.content}
              conf={conf}
              onChange={this.onChange}
            />)
          })}
        </List>
      </div>
    )
  }

}

export default ResultsAttributesConfigurationComponent
