/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import find from 'lodash/find'
import Subheader from 'material-ui/Subheader'
import { FormattedMessage } from 'react-intl'
import { AttributeModelController, AttributeConfiguration } from '@regardsoss/model'
import AttributeConfigurationComponent from './AttributeConfigurationComponent'

/**
 * React component to display and configure a standard attribute for search results
 * @author Sébastien binda
 */
class StandardAttributesConfigurationComponent extends React.Component {

  static propTypes = {
    attributesConf: React.PropTypes.arrayOf(AttributeConfiguration).isRequired,
    onChangeAttributeConfiguration: React.PropTypes.func.isRequired,
  }

  render = () => {
    const standardAttributes = AttributeModelController.StandardAttributes

    return (
      <div>
        <Subheader><FormattedMessage id="form.attributes.standard.section.title" /></Subheader>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {map(standardAttributes, (standardAttribute) => {
            // Search existing associated attribute configuration if there is one
            let conf = find(this.props.attributesConf, configuration => configuration.attributeFullQualifiedName === standardAttribute)
            if (!conf) {
              conf = {
                attributeFullQualifiedName: standardAttribute,
                visibility: false,
                facetable: false,
                order: undefined,
              }
            }
            return (
              <AttributeConfigurationComponent
                key={standardAttribute}
                attribute={{
                  content: {
                    label: standardAttribute,
                    name: standardAttribute,
                    fragment: {
                      name: '',
                    },
                  },
                }}
                conf={conf}
                onChange={this.props.onChangeAttributeConfiguration}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

export default StandardAttributesConfigurationComponent
