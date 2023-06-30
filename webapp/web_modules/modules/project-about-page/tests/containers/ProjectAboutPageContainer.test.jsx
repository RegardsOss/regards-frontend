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
import { expect, assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { SingleContentURLDialogContainer } from '@regardsoss/components'
import ProjectAboutPageContainer from '../../src/containers/ProjectAboutPageContainer'
import style from '../../src/styles/styles'

const options = {
  context: buildTestContext(style),
}

// Test a component rendering
describe('[PROJECT ABOUT PAGE MODULE] Testing ProjectAboutPageContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(ProjectAboutPageContainer)
  })
  it('should render self and subcomponents', () => {
    // simple render test (should not output warn nor cause errors)
    const props = {
      appName: 'x',
      project: 'y',
      type: 'z',
      moduleConf: {
        htmlPath: 'http://www.viedemerde.fr',
      },
    }
    const enzymeWrapper = shallow(<ProjectAboutPageContainer {...props} />, options)
    const subComponent = enzymeWrapper.find(SingleContentURLDialogContainer)
    expect(subComponent).to.have.length(1)
  })
})
