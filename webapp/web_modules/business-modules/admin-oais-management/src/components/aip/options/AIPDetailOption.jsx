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
import Code from 'material-ui/svg-icons/action/code'
import IconButton from 'material-ui/IconButton'
import { StorageShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'

/**
* Detail option cell for the infinite table used to display the content of an aip
 * @author Léo Mieulet
*/
class AIPDetailOption extends React.Component {
  static propTypes = {
    entity: StorageShapes.AIPWithStorages.isRequired,
    onViewDetail: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * User callback: button was clicked
   */
  onClick = () => {
    this.props.onViewDetail(this.props.entity.content)
  }

  render() {
    const { intl: { formatMessage } } = this.context
    return (
      <IconButton
        title={formatMessage({ id: 'oais.aips.list.aip-details.title' })}
        onClick={this.onClick}
      >
        <Code />
      </IconButton>
    )
  }
}
export default AIPDetailOption
