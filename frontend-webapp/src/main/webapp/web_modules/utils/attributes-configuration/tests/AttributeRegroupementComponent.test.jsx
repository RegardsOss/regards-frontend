/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { stub, spy } from 'sinon'
import { assert } from 'chai'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { CardHeader } from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'
import AttributeRegroupementComponent from '../src/AttributeRegroupementComponent'

/**
 * Tests for AttributeConfigurationComponent
 * @author Sébastien binda
 */
describe('[ATTRIBUTES CONFIGURATION] Testing AttributeRegroupementComponent', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    stub(console, 'error').callsFake((warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })
  const muiTheme = getMuiTheme({})
  const options = {
    context: {
      muiTheme,
      moduleTheme: {},
      intl: {
        formatMessage: id => (id.id),
      },
    },
  }

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

    const wrapper = shallow(
      <AttributeRegroupementComponent {...props} />, options,
    )

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
