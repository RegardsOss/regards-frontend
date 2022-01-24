/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ModuleIcon } from '../../src/module/ModuleIcon'
import styles from '../../src/module/styles'

const context = buildTestContext(styles)

/**
 * Test ModuleIcon
 * @author Raphaël Mechali
 */
describe('[Components] Testing ModuleIcon', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ModuleIcon)
  })
  it('should render correctly with no icon', () => {
    const props = {
      iconDisplayMode: 'NONE',
      defaultIconURL: 'any',
    }
    const enzymeWrapper = shallow(<ModuleIcon {...props} />, { context })
    const iconWrapper = enzymeWrapper.findWhere((n) => !!n.props().url) // we need here to search for the node due to multiple context layers
    assert.lengthOf(iconWrapper, 0, 'The component should not render in no icon mode')
  })
  it('should render correctly with default icon', () => {
    const props = {
      iconDisplayMode: 'DEFAULT',
      defaultIconURL: 'any',
      customIconURL: 'customIcon',
    }
    const enzymeWrapper = shallow(<ModuleIcon {...props} />, { context })
    const iconWrapper = enzymeWrapper.findWhere((n) => !!n.props().url) // we need here to search for the node due to multiple context layers
    assert.lengthOf(iconWrapper, 1, 'The component should render in default mode')
    assert.equal(iconWrapper.props().url, props.defaultIconURL, 'default icon should be rendered')
  })
  it('should render correctly with custom icon', () => {
    const props = {
      iconDisplayMode: 'CUSTOM',
      defaultIconURL: 'any',
      customIconURL: 'customIcon',
    }
    const enzymeWrapper = shallow(<ModuleIcon {...props} />, { context })
    const iconWrapper = enzymeWrapper.findWhere((n) => !!n.props().url) // we need here to search for the node due to multiple context layers
    assert.lengthOf(iconWrapper, 1, 'The component should render in custom mode')
    assert.equal(iconWrapper.props().url, props.customIconURL, 'custom icon should be rendered')
  })
  it('should render default icon when not specified', () => {
    const props = {
      defaultIconURL: 'any',
    }
    const enzymeWrapper = shallow(<ModuleIcon {...props} />, { context })
    const iconWrapper = enzymeWrapper.findWhere((n) => !!n.props().url) // we need here to search for the node due to multiple context layers
    assert.lengthOf(iconWrapper, 1, 'The component should render in default mode')
    assert.equal(iconWrapper.props().url, props.defaultIconURL, 'default icon should be rendered')
  })
  it('should render default icon when custom icon is missing', () => {
    const props = {
      iconDisplayMode: 'CUSTOM',
      defaultIconURL: 'any',
    }
    const enzymeWrapper = shallow(<ModuleIcon {...props} />, { context })
    const iconWrapper = enzymeWrapper.findWhere((n) => !!n.props().url) // we need here to evaluate the property due to multiple context layers
    assert.lengthOf(iconWrapper, 1, 'The component should render in default mode')
    assert.equal(iconWrapper.props().url, props.defaultIconURL, 'default icon should be rendered')
  })
})
