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
import { browserHistory } from 'react-router'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { DataProviderShapes } from '@regardsoss/shape'
import { DataProviderDomain } from '@regardsoss/domain'

const PRODUCT_RUNNING_SIP_STATES = [
  DataProviderDomain.ProductSIPStateEnum.NOT_SCHEDULED,
  DataProviderDomain.ProductSIPStateEnum.SCHEDULED,
]

const PRODUCT_ERROR_SIP_STATES = [
  DataProviderDomain.ProductSIPStateEnum.GENERATION_ERROR,
]

/**
* Component to render the activity indicator for ne chain into the chain monitoring list
* @author Sébastien Binda
*/
class AcquisitionProcessingChainMonitoringProductsRenderer extends React.Component {
  static propTypes = {
    entity: PropTypes.shape({
      content: DataProviderShapes.AcquisitionProcessingChainMonitorContent,
      links: PropTypes.array,
    }),
    project: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  goToAllProductList = () => {
    const { project, entity: { content: { chain: { id } } } } = this.props
    const url = `/admin/${project}/data/acquisition/dataprovider/monitoring/chains/${id}/products`
    browserHistory.push(url)
  }

  goToInProgressProductList = () => {
    const { project, entity: { content: { chain: { id } } } } = this.props
    const url = `/admin/${project}/data/acquisition/dataprovider/monitoring/chains/${id}/products?sipState=${PRODUCT_RUNNING_SIP_STATES.join(',')}`
    browserHistory.push(url)
  }

  goToErrorProductList = () => {
    const { project, entity: { content: { chain: { id } } } } = this.props
    const url = `/admin/${project}/data/acquisition/dataprovider/monitoring/chains/${id}/products?sipState=${PRODUCT_ERROR_SIP_STATES.join(',')}`
    browserHistory.push(url)
  }

  renderTotal = () => {
    const { entity: { content } } = this.props
    const { intl: { formatMessage }, moduleTheme: { monitoring: { totalStyle } } } = this.context
    return (
      <span
        key="all"
        style={totalStyle}
        onClick={this.goToAllProductList}
        title={formatMessage({ id: 'acquisition-chain.monitor.list.total-products.tooltip' })}
      >
        {content.nbProducts}
      </span>
    )
  }

  renderError = () => {
    const { entity: { content } } = this.props
    const { intl: { formatMessage }, moduleTheme: { monitoring: { errorStyle } } } = this.context
    if (content.nbProductErrors >= 0) {
      return (
        <span
          key="error"
          style={errorStyle}
          onClick={this.goToErrorProductList}
          title={formatMessage({ id: 'acquisition-chain.monitor.list.error-nb-products.tooltip' })}
        >
          {content.nbProductErrors}
        </span>
      )
    }
    return null
  }

  renderInProgress = () => {
    const { entity: { content } } = this.props
    const { intl: { formatMessage }, moduleTheme: { monitoring: { inProgressStyle } } } = this.context
    if (content.nbProductsInProgress >= 0) {
      return (
        <span
          key="progress"
          style={inProgressStyle}
          onClick={this.goToInProgressProductList}
          title={formatMessage({ id: 'acquisition-chain.monitor.list.inprogress-nb-products.tooltip' })}
        >
          {content.nbProductsInProgress}
        </span>
      )
    }
    return null
  }

  render() {
    return [
      this.renderTotal(),
      this.renderInProgress(),
      this.renderError(),
    ]
  }
}
export default AcquisitionProcessingChainMonitoringProductsRenderer
