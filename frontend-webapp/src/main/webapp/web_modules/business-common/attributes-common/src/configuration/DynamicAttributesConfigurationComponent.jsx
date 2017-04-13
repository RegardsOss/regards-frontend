/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import find from 'lodash/find'
import Subheader from 'material-ui/Subheader'
import IconButton from 'material-ui/IconButton'
import Close from 'material-ui/svg-icons/navigation/close'
import TextField from 'material-ui/TextField'
import { FormattedMessage } from 'react-intl'
import { AttributeModelController, AttributeConfiguration, AttributeModel } from '@regardsoss/model'
import AttributeConfigurationComponent from './AttributeConfigurationComponent'

/**
 * React component to display and configure an attribute for search results
 * @author Sébastien binda
 */
class DynamicAttributesConfigurationComponent extends React.Component {

  static propTypes = {
    allowFacettes: React.PropTypes.bool.isRequired,
    attributesConf: React.PropTypes.arrayOf(AttributeConfiguration).isRequired,
    selectableAttributes: React.PropTypes.objectOf(AttributeModel).isRequired,
    onChangeAttributeConfiguration: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      filter: '',
    }
  }

  changeFilter = (event, value) => {
    this.setState({
      filter: value,
    })
  }

  render() {
    const { allowFacettes, selectableAttributes, attributesConf, onChangeAttributeConfiguration } = this.props
    const { filter } = this.state
    return (
      <div >
        <Subheader><FormattedMessage id="form.attributes.section.title" /></Subheader>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: 20,
            marginLeft: 5,

          }}
        >
          <TextField
            hintText={<FormattedMessage id="form.attributes.filter.label" />}
            value={filter}
            style={{
              margin: '0px 15px',
            }}
            onChange={this.changeFilter}
          />
          <IconButton
            tooltip="clear"
            onTouchTap={() => this.changeFilter(null, '')}
          >
            <Close />
          </IconButton>
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {map(selectableAttributes, (selectableAttribute) => {
            const attributeId = AttributeModelController.getAttributeFullyQualifiedName(selectableAttribute)
            // Search existing associated attribute configuration if there is one
            let conf = find(attributesConf, configuration => configuration.attributeFullQualifiedName === attributeId)
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
                allowFacettes={allowFacettes}
                attribute={selectableAttribute}
                conf={conf}
                onChange={onChangeAttributeConfiguration}
                filter={`${filter}`}
              />)
          })}
        </div>
      </div >
    )
  }

}
export default DynamicAttributesConfigurationComponent
