/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  it('should render correctly expanded', () => {
    const props = {
      appName: 'x',
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
      locale: 'en',
      options: [<div key="an.option">An option </div>],
      expandable: true,
      expanded: true,
      isAuthenticated: true,
      dispatchSetInitialState: () => { },
      dispatchSetExpanded: () => { },
    }
    const wrapper = shallow(
      (
        <DynamicModulePane {...props} >
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
      locale: props.locale,
      description: props.description,
      page: props.page,
      titleComponent: props.titleComponent,
      options: props.options,
      expandable: props.expandable,
      expanded: props.expanded,
      onExpandChange: wrapper.instance().onExpandChange,
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
      options: [<div key="an.option">An option </div>],
      expandable: true,
      expanded: false,
      locale: 'fr',
      isAuthenticated: false,
      dispatchSetInitialState: () => { },
      dispatchSetExpanded: () => { },
    }
    const wrapper = shallow(
      (
        <DynamicModulePane {...props} >
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
      locale: props.locale,
      description: props.description,
      page: props.page,
      titleComponent: props.titleComponent,
      options: props.options,
      expandable: props.expandable,
      expanded: props.expanded,
      onExpandChange: wrapper.instance().onExpandChange,
    }, 'Title properties should be correctly reported')
  })
  it('should attempt initializing its own state in redux store from module configuration when in user app', () => {
    let spiedInitialization = {}
    const props = {
      appName: 'user',
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
      locale: 'en',
      isAuthenticated: false,
      dispatchSetInitialState: (expandable, expanded) => {
        spiedInitialization = { expandable, expanded }
      },
      dispatchSetExpanded: () => { },
      moduleConf: {
        primaryPane: UIDomain.MODULE_PANE_DISPLAY_MODES_ENUM.EXPANDED_COLLAPSIBLE,
      },
    }
    shallow(<DynamicModulePane {...props} ><div /></DynamicModulePane>, { context })
    assert.equal(spiedInitialization.expandable, true, 'EXPANDED_COLLAPSIBLE shoud be resolved as expandable')
    assert.equal(spiedInitialization.expanded, true, 'EXPANDED_COLLAPSIBLE shoud be resolved as expanded')

    const props2 = {
      ...props,
      moduleConf: {
        primaryPane: UIDomain.MODULE_PANE_DISPLAY_MODES_ENUM.COLLAPSED_EXPANDABLE,
      },
    }
    shallow(<DynamicModulePane {...props2} ><div /></DynamicModulePane>, { context })
    assert.equal(spiedInitialization.expandable, true, 'COLLAPSED_EXPANDABLE shoud be resolved as expandable')
    assert.equal(spiedInitialization.expanded, false, 'COLLAPSED_EXPANDABLE shoud be resolved as not expanded')

    const props3 = {
      ...props,
      moduleConf: {
        primaryPane: UIDomain.MODULE_PANE_DISPLAY_MODES_ENUM.ALWAYS_EXPANDED,
      },
    }
    shallow(<DynamicModulePane {...props3} ><div /></DynamicModulePane>, { context })
    assert.equal(spiedInitialization.expandable, false, 'ALWAYS_EXPANDED shoud be resolved as not expandable')
    assert.equal(spiedInitialization.expanded, true, 'ALWAYS_EXPANDED shoud be resolved as expanded')
  })
})
