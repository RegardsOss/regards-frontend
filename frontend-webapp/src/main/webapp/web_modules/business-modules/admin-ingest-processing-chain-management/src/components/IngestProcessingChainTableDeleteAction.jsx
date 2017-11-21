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
import Reset from 'material-ui/svg-icons/action/highlight-off'
import IconButton from 'material-ui/IconButton'
import { IngestShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'

/**
* Delete button action cell for the infinite table used to display ingest processing chains
* @author Sébastien Binda
*/
class IngestProcessingChainTableDeleteAction extends React.Component {

  static propTypes = {
    entity: PropTypes.shape({
      content: IngestShapes.IngestProcessingChain,
      links: PropTypes.array,
    }),
    onDelete: PropTypes.func.isRequired,
    rowIndex: PropTypes.number.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static iconStyle = { height: 23, width: 23 }
  static buttonStyle = { padding: 0, height: 30, width: 30 }

  onDelete = () => {
    const chain = this.props.entity.content
    this.props.onDelete(chain.name, this.props.rowIndex)
  }

  isDeletable = () => {
    const { links } = this.props.entity
    return find(links, l => l.rel === 'delete', false) !== false
  }

  render() {
    const { intl: { formatMessage } } = this.context

    return (
      <IconButton
        title={formatMessage({ id: 'processing-chain.delete.tooltip' })}
        iconStyle={IngestProcessingChainTableDeleteAction.iconStyle}
        style={IngestProcessingChainTableDeleteAction.buttonStyle}
        onTouchTap={this.onDelete}
        disabled={this.isDeletable()}
      >
        <Reset />
      </IconButton>
    )
  }
}
export default IngestProcessingChainTableDeleteAction
