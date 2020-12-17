/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import find from 'lodash/find'
import Edit from 'mdi-material-ui/Pencil'
import IconButton from 'material-ui/IconButton'
import { IngestShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { withResourceDisplayControl } from '@regardsoss/display-control'
import { AcquisitionProcessingChainEditActions } from '../../clients/AcquisitionProcessingChainClient'

export const ResourceIconAction = withResourceDisplayControl(IconButton)

/**
* Edit button action cell for the infinite table used to display ingest processing chains
* @author Sébastien Binda
*/
class AcquisitionProcessingChainTableEditAction extends React.Component {
  static propTypes = {
    entity: PropTypes.shape({
      content: IngestShapes.IngestProcessingChain,
      links: PropTypes.array,
    }),
    onEdit: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static iconStyle = { height: 23, width: 23 }

  static buttonStyle = { padding: 0, height: 30, width: 30 }

  static editDependency = AcquisitionProcessingChainEditActions.getDependency('PUT')

  isEditable = () => {
    const { links } = this.props.entity
    return !!find(links, l => l.rel === 'update', false)
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const chain = this.props.entity.content
    return (
      <ResourceIconAction
        resourceDependencies={AcquisitionProcessingChainTableEditAction.editDependency}
        hideDisabled={false}
        className={`selenium-edit-${chain.chainId}`}
        title={formatMessage({ id: 'acquisition-chain.list.edit.tooltip' })}
        iconStyle={AcquisitionProcessingChainTableEditAction.iconStyle}
        style={AcquisitionProcessingChainTableEditAction.buttonStyle}
        onClick={() => this.props.onEdit(chain.chainId)}
        disabled={!this.isEditable()}
      >
        <Edit />
      </ResourceIconAction>
    )
  }
}
export default AcquisitionProcessingChainTableEditAction
