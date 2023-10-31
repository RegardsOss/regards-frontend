/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import get from 'lodash/get'
import some from 'lodash/some'
import omit from 'lodash/omit'
import { CommonDomain, DamDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
import AddElementToCartComponent from '../../../../../../components/user/tabs/results/common/options/AddElementToCartComponent'

const DATA_ACCESS_GRANTED_LINK = 'dataobjects-files'

/**
 * Add element to cart option container
 * @author Raphaël Mechali
 */
export class AddElementToCartContainer extends React.Component {
  static propTypes = {
    // Entity. Note: when used in options column, this is provided by the table cell API
    entity: AccessShapes.EntityWithServices.isRequired,
    // optional callback: add element to cart (entity) => ()
    onAddElementToCart: PropTypes.func.isRequired,
    // ...other properties reported to sub-component
  }

  /** List of property keys that should not be reported to sub component */
  static NON_REPORTED_PROPS = [
    'rowIndex',
    'entity',
    'onAddElementToCart',
  ]

  /** Orderable data files types */
  static ORDERABLE_FILES_TYPES = [
    CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_HD,
    CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_MD,
    CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_SD,
    CommonDomain.DATA_TYPES_ENUM.RAWDATA,
  ]

  /**
   * Check if the entity contains at least one orderable file (any quicklook or any raw data)
   * @param {*} entity
   * @returns
   */
  static canOrderDataObject = (entity) => {
    const {
      content: {
        files,
      },
    } = entity
    return AddElementToCartContainer.ORDERABLE_FILES_TYPES.some((fileType) => get(files, `${fileType}.length`, 0) > 0)
  }

  /**
   * Callback: user adds entity into the basket
   */
  onAddElementToCart = () => {
    const { entity, onAddElementToCart } = this.props
    if (this.canAddToCart()) {
      onAddElementToCart(entity)
    }
  }

  canOrderDatasetData = (links) => some(links, (link) => link.rel === DATA_ACCESS_GRANTED_LINK)

  /**
   * Is add to cart possible with current entity ?
   * @return {boolean} true when add to cart is possible for entity
   */
  canAddToCart() {
    const {
      entity,
    } = this.props
    const {
      content: {
        entityType,
      },
      links,
    } = entity
    // add to cart is allowed when:
    // the object is a dataset and has dataobjects link (A)
    // Or : the object is a data object and has an orderable file (any quicklook or any raw data)
    return (entityType === DamDomain.ENTITY_TYPES_ENUM.DATASET && this.canOrderDatasetData(links)) // (A)
      || (entityType === DamDomain.ENTITY_TYPES_ENUM.DATA
        && AddElementToCartContainer.canOrderDataObject(entity))// (B)
  }

  render() {
    const subComponentProperties = omit(this.props, AddElementToCartContainer.NON_REPORTED_PROPS)
    return (
      <AddElementToCartComponent canAddToCart={this.canAddToCart()} onAddElementToCart={this.onAddElementToCart} {...subComponentProperties} />
    )
  }
}

export default AddElementToCartContainer
