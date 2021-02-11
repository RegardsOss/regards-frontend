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
import Checkbox from 'material-ui/Checkbox'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import AttributeSelectionComponent from '../../../../src/configuration/dialog/add/AttributeSelectionComponent'
import styles from '../../../../src/styles'
import { attributeModelsDictionary } from '../../../dumps/AttributeModels.dump'
import AttributeRender from '../../../../src/render/AttributeRender'

const context = buildTestContext(styles)

/**
 * Test AttributeSelectionComponent
 * @author Raphaël Mechali
 */
describe('[Attributes Common] Testing AttributeSelectionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AttributeSelectionComponent)
  })
  it('should render correctly selected', () => {
    const spliedCallbackParameters = {}
    const props = {
      index: 25,
      attribute: {
        attributeModel: attributeModelsDictionary[3],
        selected: true,
      },
      onToggleAttributeSelection: (index) => {
        spliedCallbackParameters.index = index
      },
    }
    const enzymeWrapper = shallow(<AttributeSelectionComponent {...props} />, { context })
    const checkbox = enzymeWrapper.find(Checkbox)
    assert.lengthOf(checkbox, 1, 'There should be the checkbox')
    testSuiteHelpers.assertWrapperProperties(checkbox, {
      label: AttributeRender.getRenderLabel(props.attribute.attributeModel, context.intl),
      checked: props.attribute.selected,
      onCheck: enzymeWrapper.instance().onToggleAttributeSelection,
    })
    // Test callback report
    checkbox.props().onCheck()
    assert.equal(spliedCallbackParameters.index, props.index)
  })
  it('should render correctly unselected', () => {
    const spliedCallbackParameters = {}
    const props = {
      index: 2,
      attribute: {
        attributeModel: attributeModelsDictionary[4],
        selected: false,
      },
      onToggleAttributeSelection: (index) => {
        spliedCallbackParameters.index = index
      },
    }
    const enzymeWrapper = shallow(<AttributeSelectionComponent {...props} />, { context })
    const checkbox = enzymeWrapper.find(Checkbox)
    assert.lengthOf(checkbox, 1, 'There should be the checkbox')
    testSuiteHelpers.assertWrapperProperties(checkbox, {
      label: AttributeRender.getRenderLabel(props.attribute.attributeModel, context.intl),
      checked: props.attribute.selected,
      onCheck: enzymeWrapper.instance().onToggleAttributeSelection,
    })
    // Test callback report
    checkbox.props().onCheck()
    assert.equal(spliedCallbackParameters.index, props.index)
  })
})
