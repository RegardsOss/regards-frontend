/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { Link } from 'react-router'
import find from 'lodash/find'
import Edit from 'mdi-material-ui/Pencil'
import { IngestShapes, CommonShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { ResourceIconAction } from '@regardsoss/components'
import { AcquisitionProcessingChainEditActions } from '../../clients/AcquisitionProcessingChainClient'

/**
* Edit button action cell for the infinite table used to display ingest processing chains
* @author Sébastien Binda
*/
class AcquisitionProcessingChainTableEditAction extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    entity: PropTypes.shape({
      content: IngestShapes.IngestProcessingChain,
      links: PropTypes.arrayOf(CommonShapes.HateOASLink),
    }),
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static iconStyle = { height: 23, width: 23 }

  static buttonStyle = { padding: 0, height: 30, width: 30 }

  static editDependency = AcquisitionProcessingChainEditActions.getDependency('PUT')

  isEditable = () => {
    const { links } = this.props.entity
    return !!find(links, (l) => l.rel === 'update', false)
  }

  render() {
    const { project } = this.props
    const { intl: { formatMessage } } = this.context
    const chain = this.props.entity.content
    return (
      <ResourceIconAction
        resourceDependencies={AcquisitionProcessingChainTableEditAction.editDependency}
        title={formatMessage({ id: 'acquisition-chain.list.edit.tooltip' })}
        iconStyle={AcquisitionProcessingChainTableEditAction.iconStyle}
        style={AcquisitionProcessingChainTableEditAction.buttonStyle}
        disabled={!this.isEditable()}
      >
        <Link to={`/admin/${project}/data/acquisition/dataprovider/chain/${chain.chainId}/edit`}>
          <Edit />
        </Link>
      </ResourceIconAction>
    )
  }
}
export default AcquisitionProcessingChainTableEditAction
