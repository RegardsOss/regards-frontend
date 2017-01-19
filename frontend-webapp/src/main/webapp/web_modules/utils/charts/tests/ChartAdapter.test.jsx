/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert, expect } from 'chai'
import ChartAdapter, { HeadlessPlaceholder } from '../src/ChartAdapter'

describe('[Chart util] Testing component headless', () => {
  it('should exists', () => {
    assert.isDefined(ChartAdapter)
  })
  it('should render headless, not breaking the tests', () => {
    const enzymeWrapper = shallow(<ChartAdapter
      ChartComponent="Pie"
      data={{
        labels: ['Red'],
        datasets: [{
          data: [300],
          backgroundColor: ['#FF6384'],
          hoverBackgroundColor: ['#FF6384'],
        }],
      }}
      options={{
        legend: {
          labels: {
            fontColor: '#000000',
          },
        },
      }}
    />)
    // check that the headless place holder is rendered instead
    expect(enzymeWrapper.find(HeadlessPlaceholder)).to.have.length(1)
  })
})
