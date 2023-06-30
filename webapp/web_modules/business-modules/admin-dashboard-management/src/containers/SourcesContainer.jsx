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
import { connect } from '@regardsoss/redux'
import { AdminShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { sourcesSelectors } from '../clients/SourcesClient'
import SourcesComponent from '../components/SourcesComponent'

/**
 * Sources Container
 * @author Théo Lasserre
 */
export class SourcesContainer extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    selectedSource: AdminShapes.Source,
    onSelected: PropTypes.func.isRequired,
    selectedSession: AdminShapes.Session,
    // eslint-disable-next-line react/forbid-prop-types, react/no-unused-prop-types
    filters: PropTypes.object.isRequired,
    selectedSessionId: PropTypes.string,
    selectedSourceId: PropTypes.string,
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

  render() {
    const {
      project, onSelected, selectedSource, selectedSession,
      filters, sources, selectedSessionId, selectedSourceId,
    } = this.props
    return (
      <SourcesComponent
        project={project}
        onSelected={onSelected}
        selectedSource={selectedSource}
        selectedSession={selectedSession}
        sources={sources}
        filters={filters}
        selectedSessionId={selectedSessionId}
        selectedSourceId={selectedSourceId}
      />
    )
  }
}
export default connect(
  SourcesContainer.mapStateToProps, null)(SourcesContainer)
