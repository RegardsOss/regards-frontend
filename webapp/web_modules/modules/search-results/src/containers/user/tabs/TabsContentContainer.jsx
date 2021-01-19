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
import { connect } from '@regardsoss/redux'
import { UIShapes } from '@regardsoss/shape'
import { resultsContextSelectors } from '../../../clients/ResultsContextClient'
import TabsContentComponent from '../../../components/user/tabs/TabsContentComponent'

/**
 * Tabs content container: provides to child component the tab state
 * @author Raphaël Mechali
 */
export class TabsContentContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { moduleId }) {
    return {
      resultsContext: resultsContextSelectors.getResultsContext(state, moduleId),
    }
  }

  static propTypes = {
    moduleId: PropTypes.number.isRequired,
    appName: PropTypes.string.isRequired,
    project: PropTypes.string.isRequired,
    // from mapStateToProps
    resultsContext: UIShapes.ResultsContext.isRequired,
  }

  render() {
    const {
      moduleId, appName, project, resultsContext,
    } = this.props
    return (
      <TabsContentComponent
        moduleId={moduleId}
        appName={appName}
        project={project}
        resultsContext={resultsContext}
      />
    )
  }
}
export default connect(TabsContentContainer.mapStateToProps)(TabsContentContainer)
