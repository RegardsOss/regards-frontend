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
import find from 'lodash/find'
import Download from 'mdi-material-ui/Download'
import { IngestShapes, CommonShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { HateoasIconAction } from '@regardsoss/components'

/**
* Edit button action cell for the infinite table used to display ingest processing chains
* @author Sébastien Binda
*/
class IngestProcessingChainTableExportAction extends React.Component {
  static propTypes = {
    entity: PropTypes.shape({
      content: IngestShapes.IngestProcessingChain,
      links: PropTypes.arrayOf(CommonShapes.HateOASLink),
    }),
    accessToken: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static iconStyle = { height: 23, width: 23 }

  static buttonStyle = { padding: 0, height: 30, width: 30 }

  getExportUrlFromHateoas = (links) => {
    const { accessToken } = this.props
    const exportLink = find(links, (link) => (
      link.rel === 'export'
    ))
    if (!exportLink) {
      return null
    }
    return `${exportLink.href}?token=${accessToken}` || ''
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const { entity } = this.props
    return (
      <HateoasIconAction
        entityLinks={entity.links}
        hateoasKey="export"
        href={this.getExportUrlFromHateoas(entity.links)}
        title={formatMessage({ id: 'processing-chain.export.tooltip' })}
        disableInsteadOfHide
      >
        <Download hoverColor={IngestProcessingChainTableExportAction.buttonStyle} />
      </HateoasIconAction>
    )
  }
}
export default IngestProcessingChainTableExportAction
