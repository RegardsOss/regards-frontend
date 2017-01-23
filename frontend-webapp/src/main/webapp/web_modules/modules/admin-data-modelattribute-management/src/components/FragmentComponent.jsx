/**
 * LICENSE_PLACEHOLDER
 **/
import { keys, map } from 'lodash'
import { AttributeModel } from '@regardsoss/model'
import AttributeModelComponent from './AttributeModelComponent'
import ModelAttributeContainer from '../containers/ModelAttributeContainer'
import ItemTypes from './ItemTypes'

class Fragment extends React.Component {
  static propTypes = {
    attributes: React.PropTypes.arrayOf(AttributeModel).isRequired,
    type: React.PropTypes.string.isRequired,
  }

  getComponent = (attribute, id) => {
    if (this.props.type === ItemTypes.ATTR_ASSOCIATED) {
      return (<ModelAttributeContainer attribute={attribute} key={id} />)
    }
    return (<AttributeModelComponent attribute={attribute} key={id} />)
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

export default Fragment
