/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { assert } from 'chai'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { CardHeader } from 'material-ui/Card'
import Checkbox from 'material-ui/Checkbox'
import Styles from '../../../src/styles/styles'
import AttributeConfigurationComponent from '../../../src/components/admin/AttributeConfigurationComponent'

/**
 * Tests for AttributeConfigurationComponent
 * @author Sébastien binda
 */
describe('[RESULTS MODULE] Testing AttributeConfigurationComponent', () => {
  const muiTheme = getMuiTheme({})
  const options = {
    context: {
      muiTheme,
      moduleTheme: Styles(muiTheme),
      intl: {
        formatMessage: id => (id.id),
      },
    },
  }

  it('Should render a AttributeConfigurationComponent', () => {
    const onChangeSpy = sinon.spy()
    const attributeProp = {
      id: 0,
      name: 'Test attribute',
    }
    const attributeConfProp = {
      id: 0,
      visibility: true,
      facetable: false,
    }
    const props = {
      attribute: attributeProp,
      conf: attributeConfProp,
      onChange: onChangeSpy,
    }

    const wrapper = shallow(
      <AttributeConfigurationComponent {...props} />, options,
    )

    const attributeName = wrapper.find(CardHeader).find({ title: attributeProp.name })
    assert.lengthOf(attributeName, 1, 'There title of the card attribute should be the attribute name')

    const facetable = wrapper.find(Checkbox).find({ checked: false })
    assert.lengthOf(facetable, 1, 'There should be only one unchecked checkbox')

    const visibility = wrapper.find(Checkbox).find({ checked: true })
    assert.lengthOf(visibility, 1, 'There should be only one checked checkbox')

    visibility.simulate('check')
    assert(onChangeSpy.calledWith(0, {
      id: 0,
      visibility: false,
      facetable: false,
    }))

    facetable.simulate('check')
    assert(onChangeSpy.calledWith(0, {
      id: 0,
      visibility: false,
      facetable: true,
    }))
  })


  it('Should render a AttributeConfigurationComponent', () => {
    const onChangeSpy = sinon.spy()
    const attributeProp = {
      id: 0,
      name: 'Test attribute',
    }
    const attributeConfProp = {
      id: 0,
      visibility: true,
      facetable: true,
    }
    const props = {
      attribute: attributeProp,
      conf: attributeConfProp,
      onChange: onChangeSpy,
    }

    const wrapper = shallow(
      <AttributeConfigurationComponent {...props} />, options,
    )

    const attributeName = wrapper.find(CardHeader).find({ title: attributeProp.name })
    assert.lengthOf(attributeName, 1, 'There title of the card attribute should be the attribute name')

    const checked = wrapper.find(Checkbox).find({ checked: true })
    assert.lengthOf(checked, 2, 'There should be only one checked checkbox')

    const unchecked = wrapper.find(Checkbox).find({ checked: false })
    assert.lengthOf(unchecked, 0, 'There should be only one unchecked checkbox')
  })

  it('Should render a AttributeConfigurationComponent', () => {
    const onChangeSpy = sinon.spy()
    const attributeProp = {
      id: 0,
      name: 'Test attribute',
    }
    const attributeConfProp = {
      id: 0,
      visibility: false,
      facetable: false,
    }
    const props = {
      attribute: attributeProp,
      conf: attributeConfProp,
      onChange: onChangeSpy,
    }

    const wrapper = shallow(
      <AttributeConfigurationComponent {...props} />, options,
    )

    const attributeName = wrapper.find(CardHeader).find({ title: attributeProp.name })
    assert.lengthOf(attributeName, 1, 'There title of the card attribute should be the attribute name')

    const checked = wrapper.find(Checkbox).find({ checked: true })
    assert.lengthOf(checked, 0, 'There should be only one checked checkbox')

    const unchecked = wrapper.find(Checkbox).find({ checked: false })
    assert.lengthOf(unchecked, 2, 'There should be only one unchecked checkbox')
  })


  it('Should render a AttributeConfigurationComponent', () => {
    const onChangeSpy = sinon.spy()
    const attributeProp = {
      id: 0,
      name: 'Test attribute',
    }
    const attributeConfProp = {
      id: 1,
      visibility: false,
      facetable: false,
    }
    const props = {
      attribute: attributeProp,
      conf: attributeConfProp,
      onChange: onChangeSpy,
    }

    const wrapper = shallow(
      <AttributeConfigurationComponent {...props} />, options,
    )

    const attributeName = wrapper.find(CardHeader).find({ title: attributeProp.name })
    assert.lengthOf(attributeName, 1, 'There title of the card attribute should be the attribute name')

    const checked = wrapper.find(Checkbox).find({ checked: true })
    assert.lengthOf(checked, 0, 'There should be only one checked checkbox')

    const unchecked = wrapper.find(Checkbox).find({ checked: false })
    assert.lengthOf(unchecked, 2, 'There should be only one unchecked checkbox')
  })
})
