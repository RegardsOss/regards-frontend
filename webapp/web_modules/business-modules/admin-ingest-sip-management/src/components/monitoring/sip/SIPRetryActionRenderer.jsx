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
import { IngestShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'

/**
* Action button to retry ingest for SIP in error state
 * @author Sébastien Binda
*/
class SIPRetryActionRenderer extends React.Component {
  static propTypes = {
    entity: PropTypes.shape({
      content: IngestShapes.IngestProcessingChain,
      links: PropTypes.array,
    }),
    onRetry: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static iconStyle = { height: 23, width: 23 }

  static buttonStyle = { padding: 0, height: 30, width: 30 }

  handleClick = () => {
    this.props.onRetry(this.props.entity.content)
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const { entity: { links } } = this.props
    if (isNil(find(links, { rel: 'retry' }))) {
      return null
    }
    return (
      <IconButton
        title={formatMessage({ id: 'sip.list.retry.action' })}
        iconStyle={SIPRetryActionRenderer.iconStyle}
        style={SIPRetryActionRenderer.buttonStyle}
        onClick={this.handleClick}
      >
        <Redo />
      </IconButton>
    )
  }
}
export default SIPRetryActionRenderer
