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
import { browserHistory } from 'react-router'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { DataProviderShapes } from '@regardsoss/shape'

/**
* Component to render the activity indicator for ne chain into the chain monitoring list
* @author Sébastien Binda
*/
class AcquisitionProcessingChainMonitoringProductsRenderer extends React.Component {
  static propTypes = {
    entity: PropTypes.shape({
      content: DataProviderShapes.ProductContent,
      links: PropTypes.array,
    }),
    project: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static defaultProps = {}

  goToSIPSessionMonitoring = () => {
    const { project, entity: { content: { session } } } = this.props
    const url = `/admin/${project}/data/acquisition/sip/session?id=${session}`
    browserHistory.push(url)
  }


  render() {
    const { entity: { content: { session } } } = this.props
    const { intl: { formatMessage }, moduleTheme: { monitoring: { productSessionLink } } } = this.context
    return (
      <span
        style={productSessionLink}
        onClick={this.goToSIPSessionMonitoring}
        title={formatMessage({ id: 'acquisition.product.list.sip.session.link.title' })}
      >
        {session}
      </span>)
  }
}
export default AcquisitionProcessingChainMonitoringProductsRenderer
