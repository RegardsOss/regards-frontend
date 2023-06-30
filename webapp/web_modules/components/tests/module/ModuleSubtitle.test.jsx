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
import Subheader from 'material-ui/Subheader/Subheader'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ModuleSubtitle from '../../src/module/ModuleSubtitle'
import styles from '../../src/module/styles/styles'

const context = buildTestContext(styles)

/**
 * Test ModuleSubtitle
 * @author Raphaël Mechali
 */
describe('[Components] Testing ModuleSubtitle', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ModuleSubtitle)
  })
  it('should render correctly with insets', () => {
    const props = {
      text: 'test1',
      iconInsets: true,
    }
    const wrapper = shallow(<ModuleSubtitle {...props} />, { context })
    const subheader = wrapper.find(Subheader)
    assert.lengthOf(subheader, 1, 'There should be a subheader')
    assert.include(subheader.debug(), props.text, 'Subheader text should be correctly reported')
  })
  it('should render correctly without insets', () => {
    const props = {
      text: 'test2',
      iconInsets: false,
    }
    const wrapper = shallow(<ModuleSubtitle {...props} />, { context })
    const subheader = wrapper.find(Subheader)
    assert.lengthOf(subheader, 1, 'There should be a subheader')
    assert.include(subheader.debug(), props.text, 'Subheader text should be correctly reported')
  })
  it('should render null without text', () => {
    const wrapper = shallow(<ModuleSubtitle />, { context })
    assert.lengthOf(wrapper.find(Subheader), 0, 'There should be no subheader')
  })
})
