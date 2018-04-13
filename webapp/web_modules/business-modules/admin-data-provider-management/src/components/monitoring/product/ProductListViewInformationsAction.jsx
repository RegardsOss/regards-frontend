/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import InfoIcon from 'material-ui/svg-icons/action/info-outline'
import IconButton from 'material-ui/IconButton'
import { DataProviderShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'

/**
* Button action cell for the infinite table used to display the ProductInformationDialog
* @author Sébastien Binda
*/
class ProductListViewInformationsAction extends React.Component {
  static propTypes = {
    entity: DataProviderShapes.Product,
    onClick: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static iconStyle = { height: 23, width: 23 }
  static buttonStyle = { padding: 0, height: 30, width: 30 }

  render() {
    const { intl: { formatMessage } } = this.context
    const { entity: { content } } = this.props
    return (
      <IconButton
        className={`selenium-run-product-info-button-${content.id}`}
        title={formatMessage({ id: 'acquisition-product.list.product.info.tooltip' })}
        iconStyle={ProductListViewInformationsAction.iconStyle}
        style={ProductListViewInformationsAction.buttonStyle}
        onClick={() => this.props.onClick(content)}
      >
        <InfoIcon />
      </IconButton>
    )
  }
}
export default ProductListViewInformationsAction
