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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import SelectField from 'material-ui/SelectField'
import { CardTitle, CardActions } from 'material-ui/Card'
import { browserHistory } from 'react-router'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { TableFilterSortingAndVisibilityAndChipsComponent } from '@regardsoss/components'
import { filtersActions, filtersSelectors } from '../../../src/clients/FiltersClient'
import { projectUserActions, projectUserSelectors } from '../../../src/clients/ProjectUserClient'
import ProjectUserAccountFiltersComponent from '../../../src/components/list/filters/ProjectUserAccountFiltersComponent'
import ProjectUserQuotaFiltersComponent from '../../../src/components/list/filters/ProjectUserQuotaFiltersComponent'
import ProjectUserAccountComponent from '../../../src/components/list/ProjectUserAccountComponent'
import ProjectUserQuotaComponent from '../../../src/components/list/ProjectUserQuotaComponent'
import ProjectUserListComponent from '../../../src/components/list/ProjectUserListComponent'
import ProjectUserAccessRightComponent from '../../../src/components/list/ProjectUserAccessRightComponent'
import ProjectUserAccessRightFiltersComponent from '../../../src/components/list/filters/ProjectUserAccessRightFiltersComponent'
import { VISUALISATION_MODES } from '../../../src/domain/VisualisationModes'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

// Test a component rendering
describe('[ADMIN PROJECTUSER MANAGEMENT] Testing project user list component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ProjectUserListComponent)
  })
  it('should render correctly', () => {
    browserHistory.setMockedResult({
      pathname: 'test://www.test.tst',
      query: {},
      hash: '',
    })
    const props = {
      project: '',
      visualisationMode: VISUALISATION_MODES.ACCOUNT,
      onRefresh: () => { },
      onCreate: () => { },
      onBack: () => { },
      origins: {},
      isLoading: false,
      onEdit: () => { },
      onDeleteAccount: () => { },
      onValidate: () => { },
      onDownloadCSV: () => { },
      onDeny: () => { },
      onDisable: () => { },
      onEnable: () => { },
      onSendEmailConfirmation: () => { },
      roleList: {},
      onSetMaxQuota: () => { },
      uiSettings: {
        showVersion: false,
        documentModels: [],
        primaryQuicklookGroup: 'pipou',
        quotaWarningCount: 150,
        rateWarningCount: 5,
      },
      groups: {},
    }
    const enzymeWrapper = shallow(<ProjectUserListComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(CardTitle), 1, 'CardTitle should be set')
    assert.lengthOf(enzymeWrapper.find(CardActions), 2, 'CardActions should be set')
    assert.lengthOf(enzymeWrapper.find(SelectField), 1, 'SelectField should be set')
    const tableVisibilityComponent = enzymeWrapper.find(TableFilterSortingAndVisibilityAndChipsComponent)
    assert.lengthOf(tableVisibilityComponent, 1, 'TableFilterSortingAndVisibilityAndChipsComponent should be set')
    testSuiteHelpers.assertWrapperProperties(tableVisibilityComponent, {
      pageActions: projectUserActions,
      pageSelectors: projectUserSelectors,
      onDeleteAccount: props.onDeleteAccount,
      onEnable: props.onEnable,
      onValidate: props.onValidate,
      onDeny: props.onDeny,
      onDisable: props.onDisable,
      onSendEmailConfirmation: props.onSendEmailConfirmation,
      onSetMaxQuota: props.onSetMaxQuota,
      onDownloadCSV: props.onDownloadCSV,
      updateRefreshParameters: enzymeWrapper.instance().updateRefreshParameters,
      filtersActions,
      filtersSelectors,
      filtersI18n: enzymeWrapper.instance().buildFiltersI18n(),
    }, 'Component should define the expected properties and callbacks')

    // ACCOUNT TAB
    let filterComponent = enzymeWrapper.find(ProjectUserAccountFiltersComponent)
    assert.lengthOf(filterComponent, 1, 'ProjectUserAccountFiltersComponent should be set')
    testSuiteHelpers.assertWrapperProperties(filterComponent, {
      isPaneOpened: enzymeWrapper.instance().state.isPaneOpened,
      onCloseFiltersPane: enzymeWrapper.instance().handleFiltersPane,
      origins: props.origins,
      roleList: props.roleList,
    }, 'Component should define the expected properties and callbacks')
    let tableComponent = enzymeWrapper.find(ProjectUserAccountComponent)
    assert.lengthOf(tableComponent, 1, 'ProjectUserAccountComponent should be set')
    testSuiteHelpers.assertWrapperProperties(tableComponent, {
      project: props.project,
      isLoading: props.isLoading,
      onEdit: props.onEdit,
    }, 'Component should define the expected properties and callbacks')
    let quotaFilterComponent = enzymeWrapper.find(ProjectUserQuotaFiltersComponent)
    assert.lengthOf(quotaFilterComponent, 0, 'ProjectUserQuotaFiltersComponent should not be set')
    let quotaTableComponent = enzymeWrapper.find(ProjectUserQuotaComponent)
    assert.lengthOf(quotaTableComponent, 0, 'ProjectUserQuotaComponent should not be set')
    let accessRightFilterComponent = enzymeWrapper.find(ProjectUserAccessRightFiltersComponent)
    assert.lengthOf(accessRightFilterComponent, 0, 'ProjectUserAccessRightFiltersComponent should not be set')
    let accessRightTableComponent = enzymeWrapper.find(ProjectUserAccessRightComponent)
    assert.lengthOf(accessRightTableComponent, 0, 'ProjectUserAccessRightComponent should not be set')

    // Change tab
    enzymeWrapper.setState({
      visualisationMode: VISUALISATION_MODES.QUOTA,
    })

    // QUOTA TAB
    filterComponent = enzymeWrapper.find(ProjectUserAccountFiltersComponent)
    assert.lengthOf(filterComponent, 0, 'ProjectUserAccountFiltersComponent should not be set')
    tableComponent = enzymeWrapper.find(ProjectUserAccountComponent)
    assert.lengthOf(tableComponent, 0, 'ProjectUserAccountComponent should not be set')
    quotaFilterComponent = enzymeWrapper.find(ProjectUserQuotaFiltersComponent)
    assert.lengthOf(quotaFilterComponent, 1, 'ProjectUserQuotaFiltersComponent should be set')
    testSuiteHelpers.assertWrapperProperties(quotaFilterComponent, {
      isPaneOpened: enzymeWrapper.instance().state.isPaneOpened,
      onCloseFiltersPane: enzymeWrapper.instance().handleFiltersPane,
    }, 'Component should define the expected properties and callbacks')
    quotaTableComponent = enzymeWrapper.find(ProjectUserQuotaComponent)
    assert.lengthOf(quotaTableComponent, 1, 'ProjectUserQuotaComponent should be set')
    testSuiteHelpers.assertWrapperProperties(quotaTableComponent, {
      project: props.project,
      isLoading: props.isLoading,
      onEdit: props.onEdit,
      uiSettings: props.uiSettings,
    }, 'Component should define the expected properties and callbacks')
    accessRightFilterComponent = enzymeWrapper.find(ProjectUserAccessRightFiltersComponent)
    assert.lengthOf(accessRightFilterComponent, 0, 'ProjectUserAccessRightFiltersComponent should not be set')
    accessRightTableComponent = enzymeWrapper.find(ProjectUserAccessRightComponent)
    assert.lengthOf(accessRightTableComponent, 0, 'ProjectUserAccessRightComponent should not be set')

    // Change tab
    enzymeWrapper.setState({
      visualisationMode: VISUALISATION_MODES.ACCESS_RIGHT,
    })

    // ACCESS RIGHT TAB
    filterComponent = enzymeWrapper.find(ProjectUserAccountFiltersComponent)
    assert.lengthOf(filterComponent, 0, 'ProjectUserAccountFiltersComponent should not be set')
    tableComponent = enzymeWrapper.find(ProjectUserAccountComponent)
    assert.lengthOf(tableComponent, 0, 'ProjectUserAccountComponent should not be set')
    quotaFilterComponent = enzymeWrapper.find(ProjectUserQuotaFiltersComponent)
    assert.lengthOf(quotaFilterComponent, 0, 'ProjectUserQuotaFiltersComponent should not be set')
    quotaTableComponent = enzymeWrapper.find(ProjectUserQuotaComponent)
    assert.lengthOf(quotaTableComponent, 0, 'ProjectUserQuotaComponent should not be set')
    accessRightFilterComponent = enzymeWrapper.find(ProjectUserAccessRightFiltersComponent)
    assert.lengthOf(accessRightFilterComponent, 1, 'ProjectUserAccessRightFiltersComponent should be set')
    testSuiteHelpers.assertWrapperProperties(accessRightFilterComponent, {
      isPaneOpened: enzymeWrapper.instance().state.isPaneOpened,
      onCloseFiltersPane: enzymeWrapper.instance().handleFiltersPane,
      groups: props.groups,
    }, 'Component should define the expected properties and callbacks')
    accessRightTableComponent = enzymeWrapper.find(ProjectUserAccessRightComponent)
    assert.lengthOf(accessRightTableComponent, 1, 'ProjectUserAccessRightComponent should be set')
    testSuiteHelpers.assertWrapperProperties(accessRightTableComponent, {
      isLoading: props.isLoading,
      onEdit: props.onEdit,
    }, 'Component should define the expected properties and callbacks')
  })
})
