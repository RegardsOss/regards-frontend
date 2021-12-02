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

/**
 * ProjectUserListComponent
 * @author Théo Lasserre
 */
import { browserHistory } from 'react-router'
import endsWith from 'lodash/endsWith'
import map from 'lodash/map'
import reduce from 'lodash/reduce'
import keys from 'lodash/keys'
import isEmpty from 'lodash/isEmpty'
import {
  Card, CardText, CardTitle, CardActions,
} from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import { MenuItem } from 'material-ui/IconMenu'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { CardActionsComponent } from '@regardsoss/components'
import dependencies from '../../dependencies'
import ProjectUserAccountContainer from '../../containers/ProjectUserAccountContainer'
import ProjectUserAccountComponent from './ProjectUserAccountComponent'
import ProjectUserQuotaContainer from '../../containers/ProjectUserQuotaContainer'
import ProjectUserQuotaComponent from './ProjectUserQuotaComponent'
import ProjectUserAccessRightContainer from '../../containers/ProjectUserAccessRightContainer'
import ProjectUserAccessRightComponent from './ProjectUserAccessRightComponent'
import { VISUALISATION_MODES, VISUALISATION_MODES_ENUM } from '../../domain/VisualisationModes'

class ProjectUserListComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    csvLink: PropTypes.string.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    visualisationMode: PropTypes.oneOf(VISUALISATION_MODES_ENUM),
    onRefresh: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static getDefaultFilters = (visualisationMode) => {
    switch (visualisationMode) {
      case VISUALISATION_MODES.ACCOUNT:
        return ProjectUserAccountComponent.DEFAULT_FILTERS_STATE
      case VISUALISATION_MODES.QUOTA:
        return ProjectUserQuotaComponent.DEFAULT_FILTERS_STATE
      case VISUALISATION_MODES.ACCESS_RIGHT:
        return ProjectUserAccessRightComponent.DEFAULT_FILTERS_STATE
      default:
        return null
    }
  }

  state = {
    visualisationMode: VISUALISATION_MODES.ACCOUNT, // default visualisation mode
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const { visualisationMode } = newProps
    if (!isEmpty(visualisationMode) && oldProps.visualisationMode !== visualisationMode) {
      this.onChangeVisualisationMode(visualisationMode)
    }
  }

  /**
   * Inner callback: updates location with user state changes (not yet reflected in class state)
   * @param {boolean} showOnlyLowQuotaUsers show only low quota users?
   */
  onUpdateLocation = (visualisationMode) => {
    const { pathname, query } = browserHistory.getCurrentLocation()
    let newPathName
    let newQuery = query
    if (endsWith(pathname, 'list')) {
      newPathName = `${pathname}/${visualisationMode}`
    } else {
      newPathName = pathname.substring(0, pathname.lastIndexOf('/') + 1) + visualisationMode
    }

    // Remove incoherent parameters from url
    const defaultFiltersState = {
      ...ProjectUserListComponent.getDefaultFilters(visualisationMode),
    }
    if (defaultFiltersState) {
      newQuery = reduce(keys(query), (acc, value, key) => {
        let newAcc = {
          ...acc,
        }
        if (keys(defaultFiltersState).includes(value)) {
          newAcc = {
            ...newAcc,
            [value]: query[value],
          }
        }
        return newAcc
      }, {})
    }
    browserHistory.replace({
      pathname: newPathName,
      search: new URLSearchParams(newQuery).toString(),
      query: newQuery,
    })
  }

  onChangeVisualisationMode = (value) => {
    this.setState({
      visualisationMode: value,
    })
    this.onUpdateLocation(value)
  }

  getProjectUserContainer = (visualisationMode) => {
    const {
      project, onRefresh, csvLink,
    } = this.props
    if (visualisationMode === VISUALISATION_MODES.ACCOUNT) {
      return <ProjectUserAccountContainer
        project={project}
        csvLink={csvLink}
        onRefresh={onRefresh}
      />
    }
    if (visualisationMode === VISUALISATION_MODES.QUOTA) {
      return <ProjectUserQuotaContainer
        project={project}
        csvLink={csvLink}
        onRefresh={onRefresh}
      />
    }
    if (visualisationMode === VISUALISATION_MODES.ACCESS_RIGHT) {
      return <ProjectUserAccessRightContainer
        project={project}
        csvLink={csvLink}
        onRefresh={onRefresh}
      />
    }
    return null
  }

  render() {
    const { onCreate, onBack } = this.props
    const { visualisationMode } = this.state
    const {
      intl: { formatMessage }, moduleTheme: {
        usersList: {
          selectVisualisationModeStyle,
        },
      },
    } = this.context
    return (
      <Card>
        <CardTitle title={formatMessage({ id: 'projectUser.list.card.title' })} subtitle={formatMessage({ id: 'projectUser.list.card.subtitle' })} />
        <SelectField
          id="account.list.table.filters.status"
          value={visualisationMode}
          onChange={(event, index, value) => this.onChangeVisualisationMode(value)}
          style={selectVisualisationModeStyle}
        >
          {map(VISUALISATION_MODES, (mode) => (
            <MenuItem key={mode} value={mode} primaryText={formatMessage({ id: `projectUser.list.card.selectField.${mode}` })} />
          ))}
        </SelectField>
        <CardText>
          {this.getProjectUserContainer(visualisationMode)}
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonClick={onCreate}
            mainButtonLabel={formatMessage({ id: 'projectUser.list.all.action.create' })}
            mainHateoasDependencies={dependencies.addDependencies}
            secondaryButtonLabel={formatMessage({ id: 'projectUser.list.action.cancel' })}
            secondaryButtonClick={onBack}
          />
        </CardActions>
      </Card>
    )
  }
}
export default ProjectUserListComponent
