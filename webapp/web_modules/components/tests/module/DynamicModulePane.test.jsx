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
import { Card } from 'material-ui/Card'
import { UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DynamicModulePane } from '../../src/module/DynamicModulePane'
import NoContentMessageInfo from '../../src/cards/NoContentMessageInfo'
import ModuleTitle from '../../src/module/ModuleTitle'
import styles from '../../src/module/styles/styles'

const context = buildTestContext(styles)

/**
* Test DynamicModulePane
* @author Raphaël Mechali
*/
describe('[Components] Testing DynamicModulePane', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DynamicModulePane)
  })
  it('should render correctly expanded, in user app', () => {
    const props = {
      appName: UIDomain.APPLICATIONS_ENUM.USER,
      project: 'y',
      type: 'any',
      description: 'any module',
      page: {
        home: true,
        iconType: 'CUSTOM',
        customIconURL: 'custom.svg',
        title: {
          fr: 'quelconque',
          en: 'any',
        },
      },
      expandable: true,
      mainModule: true,
      options: [<div key="an.option">An option </div>],
      isAuthenticated: true,
      presentationState: UIDomain.PRESENTATION_STATE_ENUM.NORMAL,
      dispatchSetInitialState: () => { },
      dispatchSetMinimized: () => { },
      dispatchSetNormal: () => { },
      dispatchSetMaximized: () => { },
    }
    const wrapper = shallow(
      (
        <DynamicModulePane {...props}>
          <div>Some content</div>
        </DynamicModulePane>
      ), { context },
    )

    // check card rendering
    const cardWrapper = wrapper.find(Card)
    assert.lengthOf(cardWrapper, 1, 'There should be the card')

    // check title rendering && expanded state
    const titleWrapper = cardWrapper.find(ModuleTitle)
    assert.lengthOf(titleWrapper, 1, 'There should be the module title')
    testSuiteHelpers.assertWrapperProperties(titleWrapper, {
      type: props.type,
      description: props.description,
      page: props.page,
      titleComponent: props.titleComponent,
      options: props.options,
      expandable: props.expandable,
      presentationState: props.presentationState,
      onSetMinimized: props.dispatchSetMinimized,
      onSetNormalState: props.dispatchSetNormal,
      onSetMaximized: props.dispatchSetMaximized,
      showLayoutOptions: true, // as it is in user app
    }, 'Title properties should be correctly reported')
  })
  it('should render correctly collapsed', () => {
    const props = {
      appName: 'x',
      project: 'y',
      type: 'any',
      description: 'any',
      page: {
        home: false,
        iconType: 'DEFAULT',
        customIconURL: null,
        title: {
          fr: 'quelconque',
          en: 'any',
        },
      },
      mainModule: false,
      options: [<div key="an.option">An option </div>],
      expandable: true,
      presentationState: UIDomain.PRESENTATION_STATE_ENUM.MINIMIZED,
      isAuthenticated: false,
      subtitle: 'Any subtitle',
      dispatchSetInitialState: () => { },
      dispatchSetMinimized: () => { },
      dispatchSetNormal: () => { },
      dispatchSetMaximized: () => { },
    }
    const wrapper = shallow(
      (
        <DynamicModulePane {...props}>
          <div>Some content</div>
        </DynamicModulePane>
      ), { context },
    )

    // check card rendering
    const cardWrapper = wrapper.find(Card)
    assert.lengthOf(cardWrapper, 1, 'There should be the card')

    // check title rendering && expanded state
    const titleWrapper = cardWrapper.find(ModuleTitle)
    assert.lengthOf(titleWrapper, 1, 'There should be the module title')

    testSuiteHelpers.assertWrapperProperties(titleWrapper, {
      type: props.type,
      description: props.description,
      page: props.page,
      titleComponent: props.titleComponent,
      subtitle: props.subtitle,
      options: props.options,
      expandable: props.expandable,
      presentationState: props.presentationState,
      onSetMinimized: props.dispatchSetMinimized,
      onSetNormalState: props.dispatchSetNormal,
      onSetMaximized: props.dispatchSetMaximized,
      showLayoutOptions: false, // as it is not in user app
    }, 'Title properties should be correctly reported')
  })
  it('should render correctly maximized', () => {
    const props = {
      appName: 'x',
      project: 'y',
      type: 'any',
      description: 'any',
      page: {
        home: false,
        iconType: 'DEFAULT',
        customIconURL: null,
        title: {
          fr: 'quelconque',
          en: 'any',
        },
      },
      options: [<div key="an.option">An option </div>],
      expandable: false,
      presentationState: UIDomain.PRESENTATION_STATE_ENUM.MAXIMIZED,
      isAuthenticated: false,
      dispatchSetInitialState: () => { },
      dispatchSetMinimized: () => { },
      dispatchSetNormal: () => { },
      dispatchSetMaximized: () => { },
    }
    const wrapper = shallow(
      (
        <DynamicModulePane {...props}>
          <div>Some content</div>
        </DynamicModulePane>
      ), { context },
    )

    // check card rendering
    const cardWrapper = wrapper.find(Card)
    assert.lengthOf(cardWrapper, 1, 'There should be the card')

    // check title rendering && expanded state
    const titleWrapper = cardWrapper.find(ModuleTitle)
    assert.lengthOf(titleWrapper, 1, 'There should be the module title')
    testSuiteHelpers.assertWrapperProperties(titleWrapper, {
      type: props.type,
      description: props.description,
      page: props.page,
      titleComponent: props.titleComponent,
      options: props.options,
      expandable: props.expandable,
      presentationState: props.presentationState,
      onSetMinimized: props.dispatchSetMinimized,
      onSetNormalState: props.dispatchSetNormal,
      onSetMaximized: props.dispatchSetMaximized,
      showLayoutOptions: false, // as it is not in user app
    }, 'Title properties should be correctly reported')
  })
  it('should attempt initializing its own state in redux store from module configuration when in user app', () => {
    let spiedInitialization = {}
    const props = {
      appName: UIDomain.APPLICATIONS_ENUM.USER,
      project: 'y',
      type: 'any',
      description: 'any',
      page: {
        home: false,
        iconType: 'DEFAULT',
        customIconURL: null,
        title: {
          fr: 'quelconque',
          en: 'any',
        },
      },
      options: [<div key="an.option">An option </div>],
      expandable: true,
      expanded: false,
      isAuthenticated: false,
      dispatchSetInitialState: (expandable, expanded) => {
        spiedInitialization = { expandable, expanded }
      },
      moduleConf: {
        primaryPane: UIDomain.MODULE_PANE_DISPLAY_MODES_ENUM.EXPANDED_COLLAPSIBLE,
      },
      dispatchSetMinimized: () => { },
      dispatchSetNormal: () => { },
      dispatchSetMaximized: () => { },
    }
    shallow(<DynamicModulePane {...props}><div /></DynamicModulePane>, { context })
    assert.equal(spiedInitialization.expandable, true, 'EXPANDED_COLLAPSIBLE shoud be resolved as expandable')
    assert.equal(spiedInitialization.expanded, true, 'EXPANDED_COLLAPSIBLE shoud be resolved as expanded')

    const props2 = {
      ...props,
      moduleConf: {
        primaryPane: UIDomain.MODULE_PANE_DISPLAY_MODES_ENUM.COLLAPSED_EXPANDABLE,
      },
    }
    shallow(<DynamicModulePane {...props2}><div /></DynamicModulePane>, { context })
    assert.equal(spiedInitialization.expandable, true, 'COLLAPSED_EXPANDABLE shoud be resolved as expandable')
    assert.equal(spiedInitialization.expanded, false, 'COLLAPSED_EXPANDABLE shoud be resolved as not expanded')

    const props3 = {
      ...props,
      moduleConf: {
        primaryPane: UIDomain.MODULE_PANE_DISPLAY_MODES_ENUM.ALWAYS_EXPANDED,
      },
    }
    shallow(<DynamicModulePane {...props3}><div /></DynamicModulePane>, { context })
    assert.equal(spiedInitialization.expandable, false, 'ALWAYS_EXPANDED shoud be resolved as not expandable')
    assert.equal(spiedInitialization.expanded, true, 'ALWAYS_EXPANDED shoud be resolved as expanded')
  })
  it('should hide module when fetching', () => {
    const props = {
      appName: 'x',
      project: 'y',
      type: 'any',
      description: 'any',
      fetching: true,
      page: {
        home: false,
        iconType: 'DEFAULT',
        customIconURL: null,
        title: {
          fr: 'quelconque',
          en: 'any',
        },
      },
      expandable: false,
      presentationState: UIDomain.PRESENTATION_STATE_ENUM.MAXIMIZED,
      isAuthenticated: true,
      dispatchSetInitialState: () => { },
      dispatchSetMinimized: () => { },
      dispatchSetNormal: () => { },
      dispatchSetMaximized: () => { },
    }
    const enzymeWrapper = shallow(<DynamicModulePane {...props}><div /></DynamicModulePane>, { context })
    let noContentWrapper = enzymeWrapper.find(NoContentMessageInfo)
    assert.lengthOf(noContentWrapper, 1, 'There should be authentication message displayer')
    assert.isTrue(noContentWrapper.props().noContent, 'Module content should be blocked as module is loading content')
    assert.equal(noContentWrapper.props().titleKey, 'dynamic.module.loading.title', 'Loading title should be shown')
    assert.equal(noContentWrapper.props().messageKey, 'dynamic.module.loading.message', 'Loading message should be shown')

    enzymeWrapper.setProps({ ...props, fetching: false })
    noContentWrapper = enzymeWrapper.find(NoContentMessageInfo)
    assert.isFalse(noContentWrapper.props().noContent, 'Module content should be shown as module is no longer loading')
  })
  it('should hide module when authentication is required but no user is logged', () => {
    const props = {
      appName: 'x',
      project: 'y',
      type: 'any',
      description: 'any',
      page: {
        home: false,
        iconType: 'DEFAULT',
        customIconURL: null,
        title: {
          fr: 'quelconque',
          en: 'any',
        },
      },
      expandable: false,
      presentationState: UIDomain.PRESENTATION_STATE_ENUM.MAXIMIZED,
      requiresAuthentication: true,
      isAuthenticated: false,
      dispatchSetInitialState: () => { },
      dispatchSetMinimized: () => { },
      dispatchSetNormal: () => { },
      dispatchSetMaximized: () => { },
    }
    const enzymeWrapper = shallow(<DynamicModulePane {...props}><div /></DynamicModulePane>, { context })
    let noContentWrapper = enzymeWrapper.find(NoContentMessageInfo)
    assert.lengthOf(noContentWrapper, 1, 'There should be authentication message displayer')
    assert.isTrue(noContentWrapper.props().noContent, 'Module content should be blocked as user is not authenticated')
    assert.equal(noContentWrapper.props().titleKey, 'dynamic.module.not.authenticated.title', 'Not authenticated title should be shown')
    assert.equal(noContentWrapper.props().messageKey, 'dynamic.module.not.authenticated.message', 'Not authenticated message should be shown')

    enzymeWrapper.setProps({ ...props, isAuthenticated: true })
    noContentWrapper = enzymeWrapper.find(NoContentMessageInfo)
    assert.isFalse(noContentWrapper.props().noContent, 'Module content should be shown as user is authenticated')
  })
  it('should hide module when there are missing dependencies and show it back when dependencies are available', () => {
    const props = {
      appName: 'x',
      project: 'y',
      type: 'any',
      description: 'any',
      page: {
        home: false,
        iconType: 'DEFAULT',
        customIconURL: null,
        title: {
          fr: 'quelconque',
          en: 'any',
        },
      },
      expandable: false,
      presentationState: UIDomain.PRESENTATION_STATE_ENUM.MAXIMIZED,
      requiresAuthentication: false,
      isAuthenticated: false,
      fetching: false,
      requiredDependencies: ['dep1', 'dep3'],
      availableDependencies: [],
      dispatchSetInitialState: () => { },
      dispatchSetMinimized: () => { },
      dispatchSetNormal: () => { },
      dispatchSetMaximized: () => { },
    }
    const enzymeWrapper = shallow(<DynamicModulePane {...props}><div /></DynamicModulePane>, { context })
    let noContentWrapper = enzymeWrapper.find(NoContentMessageInfo)
    assert.lengthOf(noContentWrapper, 1, 'There should be rights message displayer')
    assert.isTrue(noContentWrapper.props().noContent, 'Module content should be blocked as user has not all dependencies (1)')
    assert.equal(noContentWrapper.props().titleKey, 'dynamic.module.not.authenticated.title', 'Not authenticated title should be used while user is not authenticated (missing rights for PUBLIC profile)')
    assert.equal(noContentWrapper.props().messageKey, 'dynamic.module.not.authenticated.message', 'Not authenticated message should be shown while user is not authenticated (missing rights for PUBLIC profile)')

    enzymeWrapper.setProps({ ...props, isAuthenticated: true })
    noContentWrapper = enzymeWrapper.find(NoContentMessageInfo)
    assert.isTrue(noContentWrapper.props().noContent, 'Module content should be blocked as user has not all dependencies (2)')
    assert.equal(noContentWrapper.props().titleKey, 'dynamic.module.unsufficient.rights.title', 'Missing dependencies title should be shown')
    assert.equal(noContentWrapper.props().messageKey, 'dynamic.module.unsufficient.rights.message', 'Missing dependencies message should be shown')

    enzymeWrapper.setProps({ ...props, availableDependencies: ['dep1', 'dep2', 'dep3'] })
    noContentWrapper = enzymeWrapper.find(NoContentMessageInfo)
    assert.isFalse(noContentWrapper.props().noContent, 'Module content should be shown as user has now enough rights')
  })
})
