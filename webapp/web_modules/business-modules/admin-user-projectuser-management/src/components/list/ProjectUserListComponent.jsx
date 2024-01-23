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
import {
  AdminShapes, CommonShapes, UIShapes, DataManagementShapes,
} from '@regardsoss/shape'
import { CommonDomain, AdminDomain } from '@regardsoss/domain'
import { CardActionsComponent, TableFilterSortingAndVisibilityAndChipsComponent } from '@regardsoss/components'
import dependencies from '../../dependencies'
import { projectUserActions, projectUserSelectors } from '../../clients/ProjectUserClient'
import ProjectUserAccountFiltersComponent from './filters/ProjectUserAccountFiltersComponent'
import ProjectUserQuotaFiltersComponent from './filters/ProjectUserQuotaFiltersComponent'
import ProjectUserAccessRightFiltersComponent from './filters/ProjectUserAccessRightFiltersComponent'
import ProjectUserAccountComponent from './ProjectUserAccountComponent'
import ProjectUserQuotaComponent from './ProjectUserQuotaComponent'
import ProjectUserAccessRightComponent from './ProjectUserAccessRightComponent'
import { VISUALISATION_MODES, VISUALISATION_MODES_ENUM } from '../../domain/VisualisationModes'
import { FILTERS_I18N } from '../../domain/filters'
import { filtersActions, filtersSelectors } from '../../clients/FiltersClient'

class ProjectUserListComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    onDownloadCSV: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    visualisationMode: PropTypes.oneOf(VISUALISATION_MODES_ENUM),
    onRefresh: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
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
        return AdminDomain.ProjectUserFilters.buildAccountDefault()
      case VISUALISATION_MODES.QUOTA:
        return AdminDomain.ProjectUserFilters.buildQuotaDefault()
      case VISUALISATION_MODES.ACCESS_RIGHT:
        return AdminDomain.ProjectUserFilters.buildAccessRightDefault()
      default:
        return null
    }
  }

  /**
   * Inner callback: updates location with user state changes (not yet reflected in class state)
   * @param {boolean} showOnlyLowQuotaUsers show only low quota users?
   */
  static onUpdateLocation(visualisationMode) {
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

  state = {
    visualisationMode: VISUALISATION_MODES.ACCOUNT, // default visualisation mode
    isPaneOpened: false,
    currentRequestParameters: {},
    filtersI18n: FILTERS_I18N,
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

  onChangeVisualisationMode = (value) => {
    this.setState({
      visualisationMode: value,
      isPaneOpened: false,
    })
    ProjectUserListComponent.onUpdateLocation(value)
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
      [AdminDomain.FILTER_PARAMS.USE_QUOTA_LIMITATION]: currentRequestParameters[AdminDomain.FILTER_PARAMS.USE_QUOTA_LIMITATION] ? uiSettings.quotaWarningCount : null,
    }
    onRefresh(refreshParameters)
  }

  getDisplayComponents = (visualisationMode) => {
    const {
      project, origins, roleList,
      isLoading, onEdit, uiSettings, groups,
    } = this.props
    const { isPaneOpened } = this.state
    if (visualisationMode === VISUALISATION_MODES.ACCOUNT) {
      return [<ProjectUserAccountFiltersComponent
        key={CommonDomain.TableFilterComponentType.COMPONENT_TYPE.FILTER}
        origins={origins}
        roleList={roleList}
        isPaneOpened={isPaneOpened}
        onCloseFiltersPane={this.handleFiltersPane}
      />,
        <ProjectUserAccountComponent
          key={CommonDomain.TableFilterComponentType.COMPONENT_TYPE.COMPONENT}
          project={project}
          isLoading={isLoading}
          onEdit={onEdit}
        />]
    }
    if (visualisationMode === VISUALISATION_MODES.QUOTA) {
      return [<ProjectUserQuotaFiltersComponent
        key={CommonDomain.TableFilterComponentType.COMPONENT_TYPE.FILTER}
        isPaneOpened={isPaneOpened}
        onCloseFiltersPane={this.handleFiltersPane}
        uiSettings={uiSettings}
      />,
        <ProjectUserQuotaComponent
          key={CommonDomain.TableFilterComponentType.COMPONENT_TYPE.COMPONENT}
          project={project}
          onEdit={onEdit}
          isLoading={isLoading}
          uiSettings={uiSettings}
        />]
    }
    if (visualisationMode === VISUALISATION_MODES.ACCESS_RIGHT) {
      return [<ProjectUserAccessRightFiltersComponent
        key={CommonDomain.TableFilterComponentType.COMPONENT_TYPE.FILTER}
        isPaneOpened={isPaneOpened}
        onCloseFiltersPane={this.handleFiltersPane}
        groups={groups}
      />,
        <ProjectUserAccessRightComponent
          key={CommonDomain.TableFilterComponentType.COMPONENT_TYPE.COMPONENT}
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

  buildFiltersI18n = () => {
    const { roleList } = this.props
    const { filtersI18n } = this.state
    return ({
      ...filtersI18n,
      [AdminDomain.FILTER_PARAMS.ROLE]: {
        labelKey: 'projectUser.list.table.role.label',
        hintTextKey: 'projectUser.list.table.role.label',
        chipValueKeys: reduce(roleList, (acc, role) => ({
          ...acc,
          [role.content.name]: `projectUser.list.table.role.${role.content.name}`,
        }), {}),
      },
    })
  }

  render() {
    const {
      onCreate, onBack, onDeleteAccount, onEnable, onValidate, onDownloadCSV,
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
              secondaryButtonLabel={formatMessage({ id: 'projectUser.list.filter' })}
              secondaryButtonClick={this.handleFiltersPane}
              secondaryButtonStyle={filterButtonStyle}
            />
          </CardActions>
        </div>
        <CardText>
          <TableFilterSortingAndVisibilityAndChipsComponent
            pageActions={projectUserActions}
            pageSelectors={projectUserSelectors}
            onDeleteAccount={onDeleteAccount}
            onEnable={onEnable}
            onValidate={onValidate}
            onDeny={onDeny}
            onDisable={onDisable}
            onSendEmailConfirmation={onSendEmailConfirmation}
            onSetMaxQuota={onSetMaxQuota}
            onDownloadCSV={onDownloadCSV}
            isPagePostFetching
            updateRefreshParameters={this.updateRefreshParameters}
            filtersActions={filtersActions}
            filtersSelectors={filtersSelectors}
            filtersI18n={this.buildFiltersI18n()}
          >
            {this.getDisplayComponents(visualisationMode)}
          </TableFilterSortingAndVisibilityAndChipsComponent>
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
