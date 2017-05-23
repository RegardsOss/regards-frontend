/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { FormattedDate, FormattedTime } from 'react-intl'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import DateRangeAttributesRender from '../../src/render/DateRangeAttributesRender'


/**
 * Tests for AttributeConfigurationComponent
 * @author Sébastien binda
 */
describe('[ATTRIBUTES COMMON] Testing DateRangeAttributesRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('Should render an array of date', () => {
    const props = {
      attributes: {
        'test.attribute': {
          lowerBound: '2017-01-07T12:00:00',
          upperBound: '2017-01-07T15:00:00',
        },
      },
    }
    const wrapper = shallow(<DateRangeAttributesRender {...props} />)

    const dates = wrapper.find(FormattedDate)
    const times = wrapper.find(FormattedTime)
    assert.lengthOf(dates, 2, 'There should be 3 formatted date elements rendered')
    assert.lengthOf(times, 2, 'There should be 3 formatted times elements rendered')
  })

  it('Should render an empty value', () => {
    const props = {
      attributes: {
        'test.attribute': 'error',
      },
    }
    const wrapper = shallow(<DateRangeAttributesRender {...props} />)

    const value = wrapper.text()
    assert.equal(value, '', 'There should be an empty value rendered')
  })

  it('Should render multiples attributes dates arrays', () => {
    const props = {
      attributes: {
        'test.attribute': {
          lowerBound: '2017-01-07T12:00:00',
          upperBound: '2017-01-07T15:00:00',
        },
        'test.attribute2': {
          lowerBound: '2017-01-07T12:00:00',
          upperBound: '2017-01-07T15:00:00',
        },
      },
    }
    const wrapper = shallow(
      <DateRangeAttributesRender {...props} />)

    const dates = wrapper.find(FormattedDate)
    const times = wrapper.find(FormattedTime)
    assert.lengthOf(dates, 4, 'There should be 3 formatted date elements rendered')
    assert.lengthOf(times, 4, 'There should be 3 formatted times elements rendered')
  })
})
