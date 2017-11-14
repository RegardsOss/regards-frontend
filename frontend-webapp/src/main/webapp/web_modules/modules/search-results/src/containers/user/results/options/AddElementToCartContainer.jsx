/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import keys from 'lodash/keys'
import omit from 'lodash/omit'
import { AccessShapes } from '@regardsoss/shape'
import AddElementToCartComponent from '../../../../components/user/results/options/AddElementToCartComponent'

/**
* Add element to cart option container
* @author Raphaël Mechali
*/
export class AddElementToCartContainer extends React.Component {

  static propTypes = {
    rowIndex: PropTypes.number, // from cell API, to be excluded in sub component props
    // Entity. Note: when used in options column, this is provided by the table cell API
    entity: AccessShapes.EntityWithServices.isRequired,
    // optional callback: add element to cart (entity) => ()
    onAddToCart: PropTypes.func.isRequired,
    //... other properties reported to sub-componentt
  }

  onAddToCart = () => {
    const { entity, onAddToCart } = this.props
    onAddToCart(entity)
  }

  render() {
    const subComponentProperties = omit(this.props, keys(AddElementToCartContainer.propTypes))
    return (
      <AddElementToCartComponent onAddToCart={this.onAddToCart} {...subComponentProperties} />
    )
  }
}
export default AddElementToCartContainer
