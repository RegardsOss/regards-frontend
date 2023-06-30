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
import { expect } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { LazyModuleComponent } from '@regardsoss/modules'
import ApplicationLayout from '../../src/components/ApplicationLayout'
import testLayout from './TestLayout'
import testModules from './TestModules'
import Container from '../../src/components/Container'

const context = buildTestContext()
/**
 * Tests for ApplicationLayout
 * @author Sébastien Binda
 */
describe('[LAYOUT] Testing Application layout ', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('Should render correctly an application layout Container with ApplicationLayout', () => {
    const wrapper = shallow(
      <Container
        appName="testApp"
        project="test"
        container={testLayout}
      />,
      { context },
    )

    expect(wrapper.find('.mainapp')).to.have.length(1)
    expect(wrapper.find(Container)).to.have.length(3)

    const wrapper2 = shallow(
      <Container
        appName="testApp"
        project="test"
        container={testLayout.containers[1]}
        modules={testModules}
      />,
      { context },
    )

    expect(wrapper2.find('.row')).to.have.length(1)
    expect(wrapper2.find('.header')).to.have.length(0)
    expect(wrapper2.find('.body')).to.have.length(1)
    expect(wrapper2.find(LazyModuleComponent)).to.have.length(2)
    expect(wrapper2.find(Container)).to.have.length(2)
  })
  it('Should render correctly an application layout factory with ApplicationLayout', () => {
    const wrapper = shallow(
      <ApplicationLayout
        appName="testApp"
        project="test"
        layout={testLayout}
      />,
      { context },
    )

    expect(wrapper.find(Container)).to.have.length(1)
  })
})
