/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert, expect } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import ChartAdapter, { HeadlessPlaceholder } from '../../src/components/ChartAdapter'

describe('[Chart util] Testing component headless', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ChartAdapter)
  })
  it('should render headless, not breaking the tests', () => {
    const data = {
      labels: ['Red'],
      datasets: [{
        data: [300],
        backgroundColor: ['#FF6384'],
        hoverBackgroundColor: ['#FF6384'],
      }],
    }
    const options = {
      legend: {
        labels: {
          fontColor: '#000000',
        },
      },
    }
    const enzymeWrapper = shallow(<ChartAdapter
      ChartComponent="Pie"
      data={data}
      options={options}
    />)
    // check that the headless place holder is rendered instead
    expect(enzymeWrapper.find(HeadlessPlaceholder)).to.have.length(1)
  })
})
