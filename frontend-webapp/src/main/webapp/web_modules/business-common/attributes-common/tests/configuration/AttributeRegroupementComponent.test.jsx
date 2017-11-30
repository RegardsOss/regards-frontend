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
import { spy } from 'sinon'
import { assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { CardHeader } from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'
import AttributeRegroupementComponent from '../../src/configuration/AttributeRegroupementComponent'

const options = {
  context: buildTestContext(),
}
/**
 * Tests for AttributeConfigurationComponent
 * @author Sébastien binda
 */
describe('[ATTRIBUTES COMMON] Testing AttributeRegroupementComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AttributeRegroupementComponent)
  })

  it('Should render a AttributeRegroupementComponent', () => {
    const onChangeSpy = spy()
    const onDeleteSpy = spy()
    const onEditSpy = spy()

    const attributeConfProp = {
      label: 'Test regroupement',
      visibility: true,
      attributes: [],
    }
    const props = {
      conf: attributeConfProp,
      onChange: onChangeSpy,
      onDelete: onDeleteSpy,
      onEdit: onEditSpy,
    }

    const wrapper = shallow(<AttributeRegroupementComponent {...props} />, options)

    const attributeName = wrapper.find(CardHeader).find({ title: attributeConfProp.label })
    assert.lengthOf(attributeName, 1, 'There title of the card attribute should be the attribute name')

    const visibility = wrapper.find(Checkbox).find({ checked: true })
    assert.lengthOf(visibility, 1, 'There should be only one checked checkbox')

    visibility.simulate('check')
    assert(onChangeSpy.calledWith(attributeConfProp.label, {
      label: attributeConfProp.label,
      visibility: false,
      attributes: [],
    }))

    const items = wrapper.find(MenuItem)
    assert.lengthOf(items, 2, 'There should be two menu options')

    items.at(0).simulate('touchTap')
    assert(onEditSpy.calledWith(attributeConfProp))

    items.at(1).simulate('touchTap')
    assert(onDeleteSpy.calledWith(attributeConfProp))
  })
})
