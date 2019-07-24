/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isNil from 'lodash/isNil'
import find from 'lodash/find'
import Redo from 'material-ui/svg-icons/content/redo'
import IconButton from 'material-ui/IconButton'
import { StorageShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'

/**
* Action button to retry storage for AIP in error state
 * @author Sébastien Binda
*/
class AIPStoreRetryOption extends React.Component {
  static propTypes = {
    entity: StorageShapes.AIPWithStorages.isRequired,
    onRetry: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  onClick = () => {
    this.props.onRetry(this.props.entity.content)
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const { entity: { links } } = this.props
    return (
      <IconButton
        disabled={isNil(find(links, { rel: 'retry' }))}
        title={formatMessage({ id: 'aips.list.aip-retry.title' })}
        onClick={this.onClick}
      >
        <Redo />
      </IconButton>
    )
  }
}
export default AIPStoreRetryOption
