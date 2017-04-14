/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { stub } from 'sinon'
import { FormattedDate, FormattedTime } from 'react-intl'
import DateArrayAttributesRender from '../../src/render/DateArrayAttributesRender'

/**
 * Tests for AttributeConfigurationComponent
 * @author Sébastien binda
 */
describe('[ATTRIBUTES COMMON] Testing DateArrayAttributesRender', () => {
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

  it('Should render an array of date', () => {
    const props = {
      attributes: {
        'test.attribute': [
          '2017-01-07T12:00:00',
          '2017-01-08T12:00:00',
          '2017-01-09T12:00:00',
        ],
      },
    }
    const wrapper = shallow(<DateArrayAttributesRender {...props} />)

    const dates = wrapper.find(FormattedDate)
    const times = wrapper.find(FormattedTime)
    assert.lengthOf(dates, 3, 'There should be 3 formatted date elements rendered')
    assert.lengthOf(times, 3, 'There should be 3 formatted times elements rendered')
  })

  it('Should render an empty value', () => {
    const props = {
      attributes: {
        'test.attribute': 'error',
      },
    }
    const wrapper = shallow(<DateArrayAttributesRender {...props} />)

    const value = wrapper.text()
    assert.equal(value, '', 'There should be an empty value rendered')
  })

  it('Should render multiples attributes dates arrays', () => {
    const props = {
      attributes: {
        'test.attribute': [
          '2017-01-07T12:00:00',
          '2017-01-08T12:00:00',
          '2017-01-09T12:00:00',
        ],
        'test.attribute2': [
          '2017-01-07T12:00:00',
          '2017-01-08T12:00:00',
        ],
      },
    }
    const wrapper = shallow(<DateArrayAttributesRender {...props} />)

    const dates = wrapper.find(FormattedDate)
    const times = wrapper.find(FormattedTime)
    assert.lengthOf(dates, 5, 'There should be 3 formatted date elements rendered')
    assert.lengthOf(times, 5, 'There should be 3 formatted times elements rendered')
  })
})
