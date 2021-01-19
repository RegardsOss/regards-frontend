/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
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
