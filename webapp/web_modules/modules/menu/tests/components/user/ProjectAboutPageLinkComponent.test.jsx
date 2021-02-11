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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import IconButton from 'material-ui/IconButton'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { LazyModuleComponent, modulesManager } from '@regardsoss/modules'
import ProjectAboutPageLinkComponent from '../../../src/components/user/ProjectAboutPageLinkComponent'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test ProjectAboutPageLinkComponent
* @author Raphaël Mechali
*/
describe('[Menu] Testing ProjectAboutPageLinkComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ProjectAboutPageLinkComponent)
  })
  it('should render correctly in default mode', () => {
    const props = {
      appName: 'hello-app',
      project: 'hello-world',
      projectAboutPage: 'gg.com',
      hidePage: false,
    }
    const enzymeWrapper = shallow(<ProjectAboutPageLinkComponent {...props} />, { context })
    const moduleWrapper = enzymeWrapper.find(LazyModuleComponent)
    assert.lengthOf(moduleWrapper, 1, 'The module should be rendered')
    const moduleProps = moduleWrapper.props()
    assert.equal(moduleProps.project, props.project, 'Project should be correctly reported')
    assert.equal(moduleProps.appName, props.appName, 'appName should be correctly reported')
    assert.isOk(moduleProps.module, 'There should be module field')
    assert.equal(moduleProps.module.type, modulesManager.AllDynamicModuleTypes.PROJECT_ABOUT_PAGE, 'Module type should be correctly set')
    assert.equal(moduleProps.module.applicationId, props.appName, 'Application ID should be correctly set')
    assert.isTrue(moduleProps.module.active, 'Module should be active')
    assert.isOk(moduleProps.module.conf, 'There should be module configuration')
    assert.equal(moduleProps.module.conf.htmlPath, props.projectAboutPage, 'page URL should be correctly set')
    assert.isOk(moduleProps.module.conf.buttonComponent, 'The button should be locally built')
  })
  it('should render correctly hiding page (preview mode)', () => {
    const props = {
      appName: 'hello-app',
      project: 'hello-world',
      projectAboutPage: 'gg.com',
      hidePage: true,
    }
    const enzymeWrapper = shallow(<ProjectAboutPageLinkComponent {...props} />, { context })
    const moduleWrapper = enzymeWrapper.find(LazyModuleComponent)
    assert.lengthOf(moduleWrapper, 0, 'The module should not be used when hiding page')
    assert.lengthOf(enzymeWrapper.find(IconButton), 1, 'The button should be directly rendered')
  })
})
