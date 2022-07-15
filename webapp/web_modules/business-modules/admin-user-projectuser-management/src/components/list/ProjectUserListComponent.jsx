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
import RaisedButton from 'material-ui/RaisedButton'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  AdminShapes, CommonShapes, UIShapes, DataManagementShapes,
} from '@regardsoss/shape'
import { CardActionsComponent, TableFilterSortingAndVisibilityContainer } from '@regardsoss/components'
import dependencies from '../../dependencies'
import { projectUserActions, projectUserSelectors } from '../../clients/ProjectUserClient'
import ProjectUserAccountFiltersComponent, { ProjectUserAccountFiltersComponent as ProjectUserAccountFiltersComponentClass } from './filters/ProjectUserAccountFiltersComponent'
import ProjectUserQuotaFiltersComponent, { ProjectUserQuotaFiltersComponent as ProjectUserQuotaFiltersComponentClass } from './filters/ProjectUserQuotaFiltersComponent'
import ProjectUserAccessRightFiltersComponent, { ProjectUserAccessRightFiltersComponent as ProjectUserAccessRightFiltersComponentClass } from './filters/ProjectUserAccessRightFiltersComponent'
import ProjectUserAccountComponent from './ProjectUserAccountComponent'
import ProjectUserQuotaComponent from './ProjectUserQuotaComponent'
import ProjectUserAccessRightComponent from './ProjectUserAccessRightComponent'
import { VISUALISATION_MODES, VISUALISATION_MODES_ENUM } from '../../domain/VisualisationModes'
import QUOTA_FILTERS from '../../domain/QuotaFilters'

class ProjectUserListComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    csvLink: PropTypes.string.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    visualisationMode: PropTypes.oneOf(VISUALISATION_MODES_ENUM),
    onRefresh: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    totalElements: PropTypes.number.isRequired,
    origins: CommonShapes.ServiceProviderList.isRequired,
    isLoading: PropTypes.bool.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDeleteAccount: PropTypes.func.isRequired,
    onValidate: PropTypes.func.isRequired,
    onDeny: PropTypes.func.isRequired,
    onDisable: PropTypes.func.isRequired,
    onEnable: PropTypes.func.isRequired,
    onSendEmailConfirmation: PropTypes.func.isRequired,
    roleList: AdminShapes.RoleList.isRequired,
    onSetMaxQuota: PropTypes.func.isRequired,
    uiSettings: UIShapes.UISettings.isRequired,
    groups: DataManagementShapes.AccessGroupList.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static getDefaultFilters = (visualisationMode) => {
    switch (visualisationMode) {
      case VISUALISATION_MODES.ACCOUNT:
        return ProjectUserAccountFiltersComponentClass.DEFAULT_FILTERS_STATE
      case VISUALISATION_MODES.QUOTA:
        return ProjectUserQuotaFiltersComponentClass.DEFAULT_FILTERS_STATE
      case VISUALISATION_MODES.ACCESS_RIGHT:
        return ProjectUserAccessRightFiltersComponentClass.DEFAULT_FILTERS_STATE
      default:
        return null
    }
  }

  state = {
    visualisationMode: VISUALISATION_MODES.ACCOUNT, // default visualisation mode
    isPaneOpened: false,
    currentRequestParameters: {},
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
      isPaneOpened: false,
    })
    this.onUpdateLocation(value)
  }

  updateRefreshParameters = (requestParameters) => {
    this.setState({
      currentRequestParameters: requestParameters,
    })
  }

  onRefresh = () => {
    const { onRefresh, uiSettings } = this.props
    const { currentRequestParameters } = this.state
    const refreshParameters = {
      ...currentRequestParameters,
      [QUOTA_FILTERS.USE_QUOTA_LIMITATION]: currentRequestParameters[QUOTA_FILTERS.USE_QUOTA_LIMITATION] ? uiSettings.quotaWarningCount : null,
    }
    onRefresh(refreshParameters)
  }

  getDisplayComponents = (visualisationMode) => {
    const {
      project, csvLink, origins, roleList, totalElements,
      isLoading, onEdit, uiSettings, groups,
    } = this.props
    const { isPaneOpened } = this.state
    if (visualisationMode === VISUALISATION_MODES.ACCOUNT) {
      return [<ProjectUserAccountFiltersComponent
        key={TableFilterSortingAndVisibilityContainer.COMPONENT_TYPE.FILTER}
        origins={origins}
        roleList={roleList}
        isPaneOpened={isPaneOpened}
        onCloseFiltersPane={this.handleFiltersPane}
      />,
        <ProjectUserAccountComponent
          key={TableFilterSortingAndVisibilityContainer.COMPONENT_TYPE.COMPONENT}
          project={project}
          csvLink={csvLink}
          totalElements={totalElements}
          isLoading={isLoading}
          onEdit={onEdit}
        />]
    }
    if (visualisationMode === VISUALISATION_MODES.QUOTA) {
      return [<ProjectUserQuotaFiltersComponent
        key={TableFilterSortingAndVisibilityContainer.COMPONENT_TYPE.FILTER}
        isPaneOpened={isPaneOpened}
        onCloseFiltersPane={this.handleFiltersPane}
      />,
        <ProjectUserQuotaComponent
          key={TableFilterSortingAndVisibilityContainer.COMPONENT_TYPE.COMPONENT}
          project={project}
          csvLink={csvLink}
          totalElements={totalElements}
          onEdit={onEdit}
          isLoading={isLoading}
          uiSettings={uiSettings}
        />]
    }
    if (visualisationMode === VISUALISATION_MODES.ACCESS_RIGHT) {
      return [<ProjectUserAccessRightFiltersComponent
        key={TableFilterSortingAndVisibilityContainer.COMPONENT_TYPE.FILTER}
        isPaneOpened={isPaneOpened}
        onCloseFiltersPane={this.handleFiltersPane}
        groups={groups}
      />,
        <ProjectUserAccessRightComponent
          key={TableFilterSortingAndVisibilityContainer.COMPONENT_TYPE.COMPONENT}
          csvLink={csvLink}
          totalElements={totalElements}
          onEdit={onEdit}
          isLoading={isLoading}
        />]
    }
    return null
  }

  handleFiltersPane = () => {
    const { isPaneOpened } = this.state
    this.setState({
      isPaneOpened: !isPaneOpened,
    })
  }

  render() {
    const {
      onCreate, onBack, onDeleteAccount, onEnable, onValidate,
      onDeny, onDisable, onSendEmailConfirmation, onSetMaxQuota,
    } = this.props
    const { visualisationMode } = this.state
    const {
      intl: { formatMessage }, moduleTheme: {
        usersList: {
          selectVisualisationModeStyle, headerDivStyle,
          cardActionDivStyle, filterButtonStyle,
        },
      },
    } = this.context

    return (
      <Card>
        <div style={headerDivStyle}>
          <CardTitle
            title={formatMessage({ id: 'projectUser.list.card.title' })}
            subtitle={formatMessage({ id: 'projectUser.list.card.subtitle' })}
          />
          <CardActions style={cardActionDivStyle}>
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
            <CardActionsComponent
              mainButtonLabel={formatMessage({ id: 'projectUser.list.refresh' })}
              mainButtonType="submit"
              mainButtonClick={this.onRefresh}
            />
            <RaisedButton
              onClick={this.handleFiltersPane}
              label={formatMessage({ id: 'projectUser.list.filter' })}
              secondary
              style={filterButtonStyle}
            />
          </CardActions>
        </div>
        <CardText>
          <TableFilterSortingAndVisibilityContainer
            pageActions={projectUserActions}
            pageSelectors={projectUserSelectors}
            onDeleteAccount={onDeleteAccount}
            onEnable={onEnable}
            onValidate={onValidate}
            onDeny={onDeny}
            onDisable={onDisable}
            onSendEmailConfirmation={onSendEmailConfirmation}
            onSetMaxQuota={onSetMaxQuota}
            updateRefreshParameters={this.updateRefreshParameters}
          >
            {this.getDisplayComponents(visualisationMode)}
          </TableFilterSortingAndVisibilityContainer>
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
