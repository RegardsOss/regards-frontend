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
import IconButton from 'material-ui/IconButton'
import DetailIcon from 'material-ui/svg-icons/action/search'
import { i18nContextType } from '@regardsoss/i18n'

/**
* Shows dated item selection detail
* @author Raphaël Mechali
*/
class ShowDatedItemSelectionDetailComponent extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    onShowDetail: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }


  render() {
    const { intl: { formatMessage } } = this.context
    const { disabled, onShowDetail } = this.props
    return (
      <IconButton
        disabled={disabled}
        onClick={onShowDetail}
        title={formatMessage({ id: 'order-cart.module.basket.table.show.selection.detail.tooltip' })}
      >
        <DetailIcon />
      </IconButton>
    )
  }
}
export default ShowDatedItemSelectionDetailComponent
