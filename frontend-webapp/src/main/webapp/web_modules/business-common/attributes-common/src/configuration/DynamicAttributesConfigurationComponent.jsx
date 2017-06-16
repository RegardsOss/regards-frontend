/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import find from 'lodash/find'
import Subheader from 'material-ui/Subheader'
import IconButton from 'material-ui/IconButton'
import Close from 'material-ui/svg-icons/navigation/close'
import TextField from 'material-ui/TextField'
import { i18nContextType } from '@regardsoss/i18n'
import { FormattedMessage } from 'react-intl'
import { AttributeModelController, AttributeConfiguration, AttributeModel } from '@regardsoss/model'
import AttributeConfigurationComponent from './AttributeConfigurationComponent'

/**
 * React component to display and configure an attribute for search results
 * @author Sébastien binda
 */
class DynamicAttributesConfigurationComponent extends React.Component {

  static propTypes = {
    allowFacettes: PropTypes.bool.isRequired,
    attributesConf: PropTypes.arrayOf(AttributeConfiguration).isRequired,
    selectableAttributes: PropTypes.objectOf(AttributeModel).isRequired,
    onChangeAttributeConfiguration: PropTypes.func.isRequired,
  }
  static contextTypes = {
    ...i18nContextType,
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
    const styles = { margin: '0px 15px' }
    const attrStyles = { display: 'flex', flexWrap: 'wrap' }
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
            hintText={this.context.intl.formatMessage({ id: 'form.attributes.filter.label' })}
            value={filter}
            style={styles}
            onChange={this.changeFilter}
          />
          <IconButton
            tooltip="clear"
            onTouchTap={() => this.changeFilter(null, '')}
          >
            <Close />
          </IconButton>
        </div>
        <div style={attrStyles}>
          {map(selectableAttributes, (selectableAttribute) => {
            const attributeId = AttributeModelController.getAttributeAccessPath(selectableAttribute)
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
