/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import keys from 'lodash/keys'
import { AttributeModel, PluginConfiguration, PluginMetaData } from '@regardsoss/model'
import AttributeModelComponent from './AttributeModelComponent'
import ModelAttributeContainer from '../containers/ModelAttributeContainer'
import ItemTypes from './ItemTypes'

class FragmentComponent extends React.Component {
  static propTypes = {
    pluginConfigurationList: PropTypes.objectOf(PluginConfiguration),
    pluginMetaDataList: PropTypes.objectOf(PluginMetaData),
    attributes: PropTypes.arrayOf(AttributeModel).isRequired,
    type: PropTypes.string.isRequired,
  }

  getComponent = (attribute, id) => {
    if (this.props.type === ItemTypes.ATTR_ASSOCIATED) {
      return (<ModelAttributeContainer
        pluginConfigurationList={this.props.pluginConfigurationList}
        pluginMetaDataList={this.props.pluginMetaDataList}
        attribute={attribute}
        key={attribute.content.id}
        shouldDisplayHeader={id === 0}
      />)
    }
    return (<AttributeModelComponent attribute={attribute} key={attribute.content.id} />)
  }

  render() {
    const { attributes } = this.props
    const style = {
      paddingTop: 10,
    }
    return (
      <div style={style}>
        {attributes[keys(attributes)[0]].content.fragment.name}
        <hr />
        {map(attributes, (attribute, id) => (
          this.getComponent(attribute, id)
        ))}
      </div>
    )
  }
}

export default FragmentComponent
