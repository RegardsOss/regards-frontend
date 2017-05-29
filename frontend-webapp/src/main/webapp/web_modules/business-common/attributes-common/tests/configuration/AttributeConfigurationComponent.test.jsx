/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { spy } from 'sinon'
import { assert } from 'chai'
import { CardHeader } from 'material-ui/Card'
import Checkbox from 'material-ui/Checkbox'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import AttributeConfigurationComponent from '../../src/configuration/AttributeConfigurationComponent'

const options = {
  context: buildTestContext(),
}

/**
 * Tests for AttributeConfigurationComponent
 * @author Sébastien binda
 */
describe('[ATTRIBUTES COMMON] Testing AttributeConfigurationComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)


  it('should exists', () => {
    assert.isDefined(AttributeConfigurationComponent)
  })

  it('Should render a AttributeConfigurationComponent with a given fragment', () => {
    const onChangeSpy = spy()
    const attributeProp = {
      content: {
        id: 0,
        type: 'string',
        name: 'test',
        label: 'Test attribute',
        fragment: {
          name: 'test',
        },
      },
    }
    const attributeConfProp = {
      attributeFullQualifiedName: 'test.test',
      visibility: true,
      facetable: false,
    }
    const props = {
      attribute: attributeProp,
      conf: attributeConfProp,
      onChange: onChangeSpy,
      allowFacettes: true,
    }

    const wrapper = shallow(
      <AttributeConfigurationComponent {...props} />, options,
    )

    const attributeName = wrapper.find(CardHeader).find({ title: attributeProp.content.label })
    assert.lengthOf(attributeName, 1, 'There title of the card attribute should be the attribute name')

    const facetable = wrapper.find(Checkbox).find({ checked: false })
    assert.lengthOf(facetable, 1, 'There should be only one unchecked checkbox')

    const visibility = wrapper.find(Checkbox).find({ checked: true })
    assert.lengthOf(visibility, 1, 'There should be only one checked checkbox')

    visibility.simulate('check')
    assert(onChangeSpy.calledWith('test.test', {
      attributeFullQualifiedName: 'test.test',
      visibility: false,
      facetable: false,
    }))

    facetable.simulate('check')
    assert(onChangeSpy.calledWith('test.test', {
      attributeFullQualifiedName: 'test.test',
      visibility: false,
      facetable: true,
    }))
  })


  it('Should render a AttributeConfigurationComponent with default fragment', () => {
    const onChangeSpy = spy()
    const attributeProp = {
      content: {
        id: 0,
        type: 'string',
        name: 'test',
        label: 'Test attribute',
        fragment: {
          name: 'default',
        },
      },
    }
    const attributeConfProp = {
      attributeFullQualifiedName: 'default.test',
      visibility: true,
      facetable: true,
    }
    const props = {
      attribute: attributeProp,
      conf: attributeConfProp,
      onChange: onChangeSpy,
      allowFacettes: true,
    }

    const wrapper = shallow(
      <AttributeConfigurationComponent {...props} />, options,
    )

    const attributeName = wrapper.find(CardHeader).find({ title: attributeProp.content.label })
    assert.lengthOf(attributeName, 1, 'There title of the card attribute should be the attribute name')

    const checked = wrapper.find(Checkbox).find({ checked: true })
    assert.lengthOf(checked, 2, 'There should be only one checked checkbox')

    const unchecked = wrapper.find(Checkbox).find({ checked: false })
    assert.lengthOf(unchecked, 0, 'There should be only one unchecked checkbox')
  })

  it('Should render a AttributeConfigurationComponent with default fragment and no visibility access', () => {
    const onChangeSpy = spy()
    const attributeProp = {
      content: {
        id: 0,
        name: 'test',
        type: 'string',
        label: 'Test attribute',
        fragment: {
          name: 'default',
        },
      },
    }
    const attributeConfProp = {
      attributeFullQualifiedName: 'default.test',
      visibility: false,
      facetable: false,
    }
    const props = {
      attribute: attributeProp,
      conf: attributeConfProp,
      onChange: onChangeSpy,
      allowFacettes: true,
    }

    const wrapper = shallow(
      <AttributeConfigurationComponent {...props} />, options,
    )

    const attributeName = wrapper.find(CardHeader).find({ title: attributeProp.content.label })
    assert.lengthOf(attributeName, 1, 'There title of the card attribute should be the attribute name')

    const checked = wrapper.find(Checkbox).find({ checked: true })
    assert.lengthOf(checked, 0, 'There should be only one checked checkbox')

    const unchecked = wrapper.find(Checkbox).find({ checked: false })
    assert.lengthOf(unchecked, 2, 'There should be only one unchecked checkbox')
  })
})
