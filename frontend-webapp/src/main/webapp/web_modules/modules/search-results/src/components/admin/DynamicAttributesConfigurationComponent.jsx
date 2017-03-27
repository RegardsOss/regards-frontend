/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import find from 'lodash/find'
import Subheader from 'material-ui/Subheader'
import { FormattedMessage } from 'react-intl'
import { AttributeModelController, AttributeConfiguration, AttributeModel } from '@regardsoss/model'
import AttributeConfigurationComponent from './AttributeConfigurationComponent'

/**
 * React component to display and configure an attribute for search results
 * @author Sébastien binda
 */
class DynamicAttributesConfigurationComponent extends React.Component {

  static propTypes = {
    attributesConf: React.PropTypes.arrayOf(AttributeConfiguration).isRequired,
    selectableAttributes: React.PropTypes.objectOf(AttributeModel).isRequired,
    onChangeAttributeConfiguration: React.PropTypes.func.isRequired,
  }

  render = () => (
    <div>
      <Subheader><FormattedMessage id="form.attributes.section.title" /></Subheader>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {map(this.props.selectableAttributes, (selectableAttribute) => {
          const attributeId = AttributeModelController.getAttributeFullyQualifiedName(selectableAttribute)
            // Search existing associated attribute configuration if there is one
          let conf = find(this.props.attributesConf, configuration => configuration.attributeFullQualifiedName === attributeId)
          if (!conf) {
            conf = {
              attributeFullQualifiedName: attributeId,
              visibility: false,
              facetable: false,
              order: undefined,
            }
          }
          return (
            <AttributeConfigurationComponent
              key={selectableAttribute.content.id}
              attribute={selectableAttribute}
              conf={conf}
              onChange={this.props.onChangeAttributeConfiguration}
            />)
        })}
      </div>
    </div>
    )

}
export default DynamicAttributesConfigurationComponent
