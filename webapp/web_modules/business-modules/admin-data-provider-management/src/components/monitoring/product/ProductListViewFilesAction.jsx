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
import FilesIcon from 'mdi-material-ui/FileTree'
import IconButton from 'material-ui/IconButton'
import { DataProviderShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'

/**
* Edit button action cell for the infinite table used to display ingest processing chains
* @author Sébastien Binda
*/
class ProductListViewFilesAction extends React.Component {
  static propTypes = {
    entity: DataProviderShapes.Product.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static iconStyle = { height: 23, width: 23 }

  static buttonStyle = { padding: 0, height: 30, width: 30 }

  render() {
    const { intl: { formatMessage } } = this.context
    const { entity: { content: { id } } } = this.props
    return (
      <IconButton
        className={`selenium-run-${id}`}
        title={formatMessage({ id: 'acquisition-product.list.view.files.tooltip' })}
        iconStyle={ProductListViewFilesAction.iconStyle}
        style={ProductListViewFilesAction.buttonStyle}
        onClick={() => this.props.onClick(id)}
      >
        <FilesIcon />
      </IconButton>
    )
  }
}
export default ProductListViewFilesAction
