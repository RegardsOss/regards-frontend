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
import IconButton from 'material-ui/IconButton'
import RetryIcon from 'mdi-material-ui/Replay'
import { i18nContextType } from '@regardsoss/i18n'

/**
  * Retry order table option
  * @author Sébastien Binda
  */
class RetryOrderComponent extends React.Component {
  static propTypes = {
    canRetry: PropTypes.bool.isRequired,
    onRetry: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { onRetry, canRetry } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <IconButton
        disabled={!canRetry}
        onClick={onRetry}
        title={formatMessage({ id: 'order.list.option.cell.retry.order.tooltip' })}
      >
        <RetryIcon />
      </IconButton>
    )
  }
}
export default RetryOrderComponent
