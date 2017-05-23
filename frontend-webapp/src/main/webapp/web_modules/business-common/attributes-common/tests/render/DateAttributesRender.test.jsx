/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { FormattedDate, FormattedTime } from 'react-intl'
import DateAttributesRender from '../../src/render/DateAttributesRender'
/**
 * Tests for AttributeConfigurationComponent
 * @author Sébastien binda
 */
describe('[ATTRIBUTES COMMON] Testing DateAttributesRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('Should render a date value', () => {
    const props = {
      attributes: {
        'test.attribute': '2017-01-07T12:00:00',
      },
    }
    const wrapper = shallow(<DateAttributesRender {...props} />)

    const dates = wrapper.find(FormattedDate)
    const times = wrapper.find(FormattedTime)
    assert.lengthOf(dates, 1, 'There should be 3 formatted date elements rendered')
    assert.lengthOf(times, 1, 'There should be 3 formatted times elements rendered')
  })

  it('Should render an empty value', () => {
    const props = {
      attributes: {
        'test.attribute': 'error',
      },
    }
    const wrapper = shallow(<DateAttributesRender {...props} />)

    const value = wrapper.text()
    assert.equal(value, '', 'There should be an empty value rendered')
  })

  it('Should render multiples dates', () => {
    const props = {
      attributes: {
        'test.attribute': '2017-01-07T12:00:00',
        'test.attribute2': '2017-01-07T12:00:00',
      },
    }
    const wrapper = shallow(<DateAttributesRender {...props} />)

    const dates = wrapper.find(FormattedDate)
    const times = wrapper.find(FormattedTime)
    assert.lengthOf(dates, 2, 'There should be 2 formatted date elements rendered')
    assert.lengthOf(times, 2, 'There should be 2 formatted times elements rendered')
  })
})
