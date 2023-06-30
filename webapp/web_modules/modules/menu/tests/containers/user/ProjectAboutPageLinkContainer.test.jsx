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
import { UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ShowableAtRender } from '@regardsoss/components'
import { ProjectAboutPageLinkContainer } from '../../../src/containers/user/ProjectAboutPageLinkContainer'
import ProjectAboutPageLinkComponent from '../../../src/components/user/ProjectAboutPageLinkComponent'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test ProjectAboutPageLinkContainer
* @author Raphaël Mechali
*/
describe('[Menu] Testing ProjectAboutPageLinkContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ProjectAboutPageLinkContainer)
  })
  it('should render empty with project page, in display mode USER', () => {
    const props = {
      appName: UIDomain.APPLICATIONS_ENUM.USER,
      project: 'hello-world',
      displayMode: UIDomain.MENU_DISPLAY_MODES_ENUM.USER,
    }
    const enzymeWrapper = shallow(<ProjectAboutPageLinkContainer {...props} />, { context })
    const showable = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(showable, 1, 'There should be a showable')
    assert.isFalse(showable.props().show, 'Component should be hidden')
  })
  it('should render correctly, showing project page, when in real use modes', () => {
    const props = {
      appName: UIDomain.APPLICATIONS_ENUM.USER,
      project: 'hello-world',
      projectAboutPage: 'gg-bg/pmu.fr',
      displayMode: UIDomain.MENU_DISPLAY_MODES_ENUM.USER,
    }
    const enzymeWrapper = shallow(<ProjectAboutPageLinkContainer {...props} />, { context })
    const showable = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(showable, 1, 'There should be a showable')
    assert.isTrue(showable.props().show, 'Component should be shown')
    const componentWrapper = enzymeWrapper.find(ProjectAboutPageLinkComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      appName: UIDomain.APPLICATIONS_ENUM.USER,
      project: 'hello-world',
      projectAboutPage: 'gg-bg/pmu.fr',
      hidePage: false,
    })
  })
  it('should render correctly, hiding project page, when in preview mode', () => {
    const props = {
      appName: UIDomain.APPLICATIONS_ENUM.USER,
      project: 'hello-world',
      projectAboutPage: 'gg-bg/pmu.fr',
      displayMode: UIDomain.MENU_DISPLAY_MODES_ENUM.PREVIEW,
    }
    const enzymeWrapper = shallow(<ProjectAboutPageLinkContainer {...props} />, { context })
    const showable = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(showable, 1, 'There should be a showable')
    assert.isTrue(showable.props().show, 'Component should be shown')
    const componentWrapper = enzymeWrapper.find(ProjectAboutPageLinkComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      appName: UIDomain.APPLICATIONS_ENUM.USER,
      project: 'hello-world',
      projectAboutPage: 'gg-bg/pmu.fr',
      hidePage: true,
    })
  })
})
