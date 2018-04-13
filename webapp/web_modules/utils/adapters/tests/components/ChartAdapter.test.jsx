/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 */
import { shallow } from 'enzyme'
import { assert, expect } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import ChartAdapter, { HeadlessPlaceholder } from '../../src/components/ChartAdapter'

describe('[Adapters] Testing component headless', () => {
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
