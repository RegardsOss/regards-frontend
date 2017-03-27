/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { stub } from 'sinon'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { FormattedDate, FormattedTime } from 'react-intl'
import { IntlStub } from '@regardsoss/tests-helpers'
import Styles from '../../../../src/styles/styles'
import DateRangeAttributeCell from '../../../../src/components/user/cells/DateRangeAttributeCell'

/**
 * Tests for AttributeConfigurationComponent
 * @author Sébastien binda
 */
describe('[RESULTS MODULE] Testing DateRange Table cell renderer', () => {
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
      moduleTheme: Styles(muiTheme),
      intl: IntlStub,
    },
  }

  it('Should render an array of date', () => {
    const props = {
      attributes: {
        'test.attribute': {
          lowerBound: '2017-01-07T12:00:00',
          upperBound: '2017-01-07T15:00:00',
        },
      },
    }
    const wrapper = shallow(
      <DateRangeAttributeCell {...props} />, options,
    )

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
    const wrapper = shallow(
      <DateRangeAttributeCell {...props} />, options,
    )

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
      <DateRangeAttributeCell {...props} />, options,
    )

    const dates = wrapper.find(FormattedDate)
    const times = wrapper.find(FormattedTime)
    assert.lengthOf(dates, 4, 'There should be 3 formatted date elements rendered')
    assert.lengthOf(times, 4, 'There should be 3 formatted times elements rendered')
  })
})
