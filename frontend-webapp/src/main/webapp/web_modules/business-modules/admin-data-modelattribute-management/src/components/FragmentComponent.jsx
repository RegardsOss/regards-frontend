/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import keys from 'lodash/keys'
import { DataManagementShapes } from '@regardsoss/shape'
import AttributeModelComponent from './AttributeModelComponent'
import ModelAttributeContainer from '../containers/ModelAttributeContainer'
import ItemTypes from './ItemTypes'

class FragmentComponent extends React.Component {
  static propTypes = {
    attributes: DataManagementShapes.AttributeModelArray.isRequired,
    type: PropTypes.string.isRequired,
  }

  getComponent = (attribute, id) => {
    if (this.props.type === ItemTypes.ATTR_ASSOCIATED) {
      return (<ModelAttributeContainer
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
