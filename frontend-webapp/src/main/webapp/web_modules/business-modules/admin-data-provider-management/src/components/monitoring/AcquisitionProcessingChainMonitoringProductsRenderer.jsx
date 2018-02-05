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
      content: DataProviderShapes.AcquisitionProcessingChainMonitorContent,
      links: PropTypes.array,
    }),
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static defaultProps = {}

  renderTotal = () => {
    const { entity: { content } } = this.props
    const { intl: { formatMessage }, moduleTheme: { monitoring: { totalStyle } } } = this.context
    return (
      <span key="all" style={totalStyle} title={formatMessage({ id: 'acquisition-chain.monitor.list.total-products.tooltip' })}>
        {content.nbProducts}
      </span >
    )
  }

  renderError = () => {
    const { entity: { content } } = this.props
    const { intl: { formatMessage }, moduleTheme: { monitoring: { errorStyle } } } = this.context
    if (content.nbProductErrors >= 0) {
      return (
        <span key="error" style={errorStyle} title={formatMessage({ id: 'acquisition-chain.monitor.list.error-nb-products.tooltip' })}>
          {content.nbProductErrors}
        </span >
      )
    }
    return null
  }

  renderInProgress = () => {
    const { entity: { content } } = this.props
    const { intl: { formatMessage }, moduleTheme: { monitoring: { inProgressStyle } } } = this.context
    if (content.nbProductsInProgress >= 0) {
      return (
        <span key="progress" style={inProgressStyle} title={formatMessage({ id: 'acquisition-chain.monitor.list.inprogress-nb-products.tooltip' })}>
          {content.nbProductsInProgress}
        </span >
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
