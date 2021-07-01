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
import { browserHistory } from 'react-router'
import values from 'lodash/values'
import { connect } from '@regardsoss/redux'
import { AdminShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { sourcesSelectors } from '../clients/SourcesClient'
import SourcesComponent from '../components/SourcesComponent'
import { SOURCE_FILTER_PARAMS } from '../domain/filters'

/**
 * Comment Here
 * @author Théo Lasserre
 */
export class SourcesContainer extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    selectedSource: AdminShapes.Source,
    onSelected: PropTypes.func.isRequired,
    selectedSession: AdminShapes.Session,
    onApplyFilters: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types, react/no-unused-prop-types
    filters: PropTypes.object.isRequired,
    // from mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    sources: AdminShapes.SourceList,
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      sources: sourcesSelectors.getList(state),
    }
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static extractFiltersFromURL = () => {
    const { query } = browserHistory.getCurrentLocation()
    const urlFilters = {}
    urlFilters[SOURCE_FILTER_PARAMS.NAME] = SourcesComponent.DEFAULT_FILTERS_STATE[SOURCE_FILTER_PARAMS.NAME]
    urlFilters[SOURCE_FILTER_PARAMS.STATUS] = SourcesComponent.DEFAULT_FILTERS_STATE[SOURCE_FILTER_PARAMS.STATUS]
    if (values(query).length > 0) {
      const {
        sourceName, sourceState,
      } = query
      if (sourceName) {
        urlFilters[SOURCE_FILTER_PARAMS.NAME] = sourceName
      }
      if (sourceState) {
        urlFilters[SOURCE_FILTER_PARAMS.STATUS] = sourceState
      }
    }
    return urlFilters
  }

  render() {
    const {
      project, onSelected, selectedSource, selectedSession, onApplyFilters,
      filters, sources,
    } = this.props
    return (
      <SourcesComponent
        project={project}
        onSelected={onSelected}
        selectedSource={selectedSource}
        selectedSession={selectedSession}
        onApplyFilters={onApplyFilters}
        sources={sources}
        filters={filters}
      />
    )
  }
}
export default connect(
  SourcesContainer.mapStateToProps, null)(SourcesContainer)
