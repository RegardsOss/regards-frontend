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
import ContentCopy from 'material-ui/svg-icons/content/content-copy'
import IconButton from 'material-ui/IconButton'
import { IngestShapes } from '@regardsoss/shape'
import { withResourceDisplayControl, allMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import { i18nContextType } from '@regardsoss/i18n'
import { addDependencies } from '../../dependencies'

const IconButtonWithResourceDisplayControl = withResourceDisplayControl(IconButton)

/**
* Edit button action cell for the infinite table used to display ingest processing chains
* @author Sébastien Binda
*/
class AcquisitionProcessingChainTableDuplicateAction extends React.Component {
  static propTypes = {
    entity: PropTypes.shape({
      content: IngestShapes.IngestProcessingChain,
      links: PropTypes.array,
    }),
    onDuplicate: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static iconStyle = { height: 23, width: 23 }
  static buttonStyle = { padding: 0, height: 30, width: 30 }

  render() {
    const { intl: { formatMessage } } = this.context
    const chain = this.props.entity.content
    return (
      <IconButtonWithResourceDisplayControl
        className={`selenium-edit-${chain.id}`}
        title={formatMessage({ id: 'acquisition-chain.list.duplicate.tooltip' })}
        iconStyle={AcquisitionProcessingChainTableDuplicateAction.iconStyle}
        style={AcquisitionProcessingChainTableDuplicateAction.buttonStyle}
        onTouchTap={() => this.props.onDuplicate(chain.id)}
        resourceDependencies={addDependencies}
        displayLogic={allMatchHateoasDisplayLogic}
      >
        <ContentCopy />
      </IconButtonWithResourceDisplayControl>
    )
  }
}
export default AcquisitionProcessingChainTableDuplicateAction