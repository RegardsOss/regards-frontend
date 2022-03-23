/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { OrderShapes, ProcessingShapes } from '@regardsoss/shape'
import { BasicListSelectors } from '@regardsoss/store-utils'
import { i18nContextType } from '@regardsoss/i18n'
import { connect } from '@regardsoss/redux'
import { ProcessingDomain } from '@regardsoss/domain'
import { StringValueRender } from '@regardsoss/components'

/**
 * Order datasets processing container
 * @author Théo Lasserre
 */
export class OrderDatasetsProcessingContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps = (state, { processingSelectors }) => ({
    processingList: processingSelectors.getList(state),
  })

  static propTypes = {
    entity: OrderShapes.DatasetTask.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    processingSelectors: PropTypes.instanceOf(BasicListSelectors).isRequired,
    // from mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    processingList: ProcessingShapes.ProcessingList.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  getProcessingLabel = () => {
    const { entity, processingList } = this.props
    const { intl: { formatMessage } } = this.context
    let processingLabel = formatMessage({ id: 'datasets.list.column.processing.undefined' })
    const processingInfos = ProcessingDomain.ProcessingUtils.getDatasetProcessing(entity, processingList)
    if (processingInfos) {
      processingLabel = processingInfos.processingLabel
    }
    return processingLabel
  }

  render() {
    return (
      <StringValueRender
        value={this.getProcessingLabel()}
      />
    )
  }
}
export default connect(OrderDatasetsProcessingContainer.mapStateToProps)(OrderDatasetsProcessingContainer)
