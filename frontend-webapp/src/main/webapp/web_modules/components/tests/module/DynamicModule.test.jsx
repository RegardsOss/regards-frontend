/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DynamicModule } from '../../src/module/DynamicModule'
import ModuleTitle from '../../src/module/ModuleTitle'
import styles from '../../src/module/styles/styles'

const context = buildTestContext(styles)

/**
* Test DynamicModule
* @author Raphaël Mechali
*/
describe('[Components] Testing DynamicModule', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DynamicModule)
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
    }
    const wrapper = shallow(
      (
        <DynamicModule {...props} >
          <div>Some content</div>
        </DynamicModule>
      ), { context },
    )


    // check card rendering
    const cardWrapper = wrapper.find(Card)
    assert.lengthOf(cardWrapper, 1, 'There should be the card')

    // check title rendering && expanded state
    assert.isTrue(wrapper.state().expanded, 'Module should be expanded')
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
      expanded: wrapper.state().expanded,
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
      isAuthenticated: false,
    }
    const wrapper = shallow(
      (
        <DynamicModule {...props} >
          <div>Some content</div>
        </DynamicModule>
      ), { context },
    )

    // check card rendering
    const cardWrapper = wrapper.find(Card)
    assert.lengthOf(cardWrapper, 1, 'There should be the card')

    // check title rendering && expanded state
    assert.isFalse(wrapper.state().expanded, 'Module should be expanded')
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
      expanded: wrapper.state().expanded,
      onExpandChange: wrapper.instance().onExpandChange,
    }, 'Title properties should be correctly reported')
  })
})
