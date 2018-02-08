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
      content: DataProviderShapes.AcquisitionProcessingChainMonitorContent,
      links: PropTypes.array,
    }),
    project: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static defaultProps = {}

  goToAllFileList = () => {
    const { project, entity: { content: { chain: { id } } } } = this.props
    const url = `/admin/${project}/data/acquisition/dataprovider/monitoring/chains/${id}/files`
    browserHistory.push(url)
  }

  goToInProgressFileList = () => {
    const { project, entity: { content: { chain: { id } } } } = this.props
    const url = `/admin/${project}/data/acquisition/dataprovider/monitoring/chains/${id}/files?state=IN_PROGRESS`
    browserHistory.push(url)
  }

  goToErrorFileList = () => {
    const { project, entity: { content: { chain: { id } } } } = this.props
    const url = `/admin/${project}/data/acquisition/dataprovider/monitoring/chains/${id}/files?state=ERROR`
    browserHistory.push(url)
  }

  renderTotal = () => {
    const { entity: { content } } = this.props
    const { intl: { formatMessage }, moduleTheme: { monitoring: { totalStyle } } } = this.context
    return (
      <span
        key="all"
        style={totalStyle}
        onClick={this.goToAllFileList}
        title={formatMessage({ id: 'acquisition-chain.monitor.list.total-files.tooltip' })}
      >
        {content.nbFiles}
      </span >
    )
  }

  renderError = () => {
    const { entity: { content } } = this.props
    const { intl: { formatMessage }, moduleTheme: { monitoring: { errorStyle } } } = this.context
    if (content.nbFileErrors >= 0) {
      return (
        <span
          key="error"
          style={errorStyle}
          onClick={this.goToErrorFileList}
          title={formatMessage({ id: 'acquisition-chain.monitor.list.error-nb-files.tooltip' })}
        >
          {content.nbFileErrors}
        </span >
      )
    }
    return null
  }

  renderInProgress = () => {
    const { entity: { content } } = this.props
    const { intl: { formatMessage }, moduleTheme: { monitoring: { inProgressStyle } } } = this.context
    if (content.nbFilesInProgress >= 0) {
      return (
        <span
          key="progress"
          style={inProgressStyle}
          onClick={this.goToInProgressFileList}
          title={formatMessage({ id: 'acquisition-chain.monitor.list.inprogress-nb-files.tooltip' })}
        >
          {content.nbFilesInProgress}
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
