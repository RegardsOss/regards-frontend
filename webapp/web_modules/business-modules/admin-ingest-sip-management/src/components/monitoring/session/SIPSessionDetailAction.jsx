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
import Arrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import IconButton from 'material-ui/IconButton'
import { IngestShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'

/**
* Action button to list SIPs of the given session.
 * @author Sébastien Binda
*/
class SIPSessionDetailAction extends React.Component {
  static propTypes = {
    entity: IngestShapes.IngestSession,
    onClick: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static iconStyle = { height: 23, width: 23 }

  static buttonStyle = { padding: 0, height: 30, width: 30 }

  handleClick = () => {
    this.props.onClick(this.props.entity.content.id)
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const { entity: { links } } = this.props
    if (isNil(find(links, { rel: 'delete' }))) {
      return null
    }
    return (
      <IconButton
        title={formatMessage({
          id: 'sips.session.table.actions.list',
        })}
        iconStyle={SIPSessionDetailAction.iconStyle}
        style={SIPSessionDetailAction.buttonStyle}
        onClick={this.handleClick}
      >
        <Arrow />
      </IconButton>
    )
  }
}
export default SIPSessionDetailAction
