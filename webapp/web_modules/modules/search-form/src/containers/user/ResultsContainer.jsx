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
import isEqual from 'lodash/isEqual'
import { UIDomain } from '@regardsoss/domain'
import { connect } from '@regardsoss/redux'
import { i18nSelectors, i18nContextType } from '@regardsoss/i18n'
import { LazyModuleComponent, modulesManager } from '@regardsoss/modules'
import { HorizontalAreasSeparator } from '@regardsoss/components'


/**
 * Shows results module for search form.
 * Note: it binds current locale only to get notified when it changes (so that it can stability the module properties reference and not
 * build it when rendering)
 * @author Raphaël Mechali
 */
export class ResultsContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      locale: i18nSelectors.getLocale(state),
    }
  }

  static propTypes = {
    preview: PropTypes.bool,
    // eslint-disable-next-line react/no-unused-prop-types
    id: PropTypes.number, // used in onPropertiesUpdated
    appName: PropTypes.string.isRequired,
    project: PropTypes.string,
    // eslint-disable-next-line
    searchResultsConfiguration: PropTypes.object, // used in onPropertiesUpdated, cannot shape it better due to module exports system
    // eslint-disable-next-line react/no-unused-prop-types
    searchParameters: PropTypes.objectOf(PropTypes.any), // used in onPropertiesUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    restrictedDatasetsIds: PropTypes.arrayOf(PropTypes.string), // used in onPropertiesUpdated
    // from mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    locale: PropTypes.string, // never used, only allows recalling componentWillReceiveProps when changing
  }

  static defaultProps = {
    locale: UIDomain.LOCALES_ENUM.en,
  }

  static contextTypes = {
    ...i18nContextType,
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
      id, appName, searchResultsConfiguration, searchParameters, restrictedDatasetsIds,
    } = newProps
    const { intl: { formatMessage } } = this.context
    const nextState = {
      module: {
        id,
        type: modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS,
        active: true,
        applicationId: appName,
        // replaces page definition
        description: formatMessage({ id: 'results.module.title' }),
        conf: {
          ...searchResultsConfiguration,
          // current results query
          searchParameters,
          // provide dataset context if any
          restrictedDatasetsIds,
        },
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
export default connect(ResultsContainer.mapStateToProps)(ResultsContainer)
