/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import find from 'lodash/find'
import Subheader from 'material-ui/Subheader'
import { FormattedMessage } from 'react-intl'
import { AccessShapes } from '@regardsoss/shape'
import { AttributeModelController } from '@regardsoss/domain/dam'
import AttributeConfigurationComponent from './AttributeConfigurationComponent'

/**
 * React component to display and configure a standard attribute for search results
 * @author Sébastien binda
 */
class StandardAttributesConfigurationComponent extends React.Component {

  static propTypes = {
    allowFacettes: PropTypes.bool.isRequired,
    attributesConf: PropTypes.arrayOf(AccessShapes.AttributeConfigurationContent).isRequired,
    onChangeAttributeConfiguration: PropTypes.func.isRequired,
  }

  render = () => {
    const standardAttributes = AttributeModelController.StandardAttributes
    const { allowFacettes, attributesConf, onChangeAttributeConfiguration } = this.props

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
            let conf = find(attributesConf, configuration => configuration.attributeFullQualifiedName === standardAttribute)
            if (!conf) {
              conf = {
                attributeFullQualifiedName: standardAttribute,
                visibility: false,
                facetable: false,
                initialSort: false,
                order: undefined,
              }
            }
            const attributes = {
              content: {
                label: standardAttribute,
                name: standardAttribute,
                jsonPath: standardAttribute,
                fragment: {
                  name: '',
                },
              },
            }
            return (
              <AttributeConfigurationComponent
                key={standardAttribute}
                allowFacettes={allowFacettes}
                attribute={attributes}
                conf={conf}
                onChange={onChangeAttributeConfiguration}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

export default StandardAttributesConfigurationComponent
