/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEqual from 'lodash/isEqual'
import { LazyModuleComponent, modulesManager } from '@regardsoss/modules'
import { HorizontalAreasSeparator } from '@regardsoss/components'


/**
 * Shows results module for search form.
 * @author Raphaël Mechali
 */
export class ResultsContainer extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    id: PropTypes.number, // used in onPropertiesUpdated
    appName: PropTypes.string.isRequired,
    project: PropTypes.string,
    preview: PropTypes.bool,
    // eslint-disable-next-line react/no-unused-prop-types
    resultsModuleTitle: PropTypes.string.isRequired, // used in onPropertiesUpdated
    // eslint-disable-next-line
    searchResultsConfiguration: PropTypes.object, // used in onPropertiesUpdated, cannot shape it better due to module exports system
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
   componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const {
      id, appName, searchResultsConfiguration, resultsModuleTitle,
    } = newProps
    const nextState = {
      module: {
        id,
        type: modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS,
        active: true,
        applicationId: appName,
        // replaces page definition
        description: resultsModuleTitle,
        conf: searchResultsConfiguration,
      },
    }
    if (!isEqual(this.state, nextState)) {
      this.setState(nextState)
    }
  }

  render() {
    const { preview, project, appName } = this.props
    const { module } = this.state
    if (preview) {
      // Do not show results in preview mode
      return null
    }
    return (
      <React.Fragment>
        <HorizontalAreasSeparator />
        <LazyModuleComponent
          project={project}
          appName={appName}
          module={module}
        />
      </React.Fragment>
    )
  }
}
export default ResultsContainer
