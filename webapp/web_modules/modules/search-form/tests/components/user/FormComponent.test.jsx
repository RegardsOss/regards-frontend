/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import FormComponent from '../../../src/components/user/FormComponent'
import FormLayout from '../../../src/components/user/FormLayout'
import Styles from '../../../src/styles/styles'
import { DUMP } from '../../dump/plugins.dump'

const options = {
  context: buildTestContext(Styles),
}
/**
 * Tests form FomComponent
 * @author Sébastien binda
 */
describe('[FORM MODULE] Testing FormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(FormComponent)
  })
  it('Should render form configured layout with given plugins', () => {
    const props = {
      appName: 'x',
      project: 'y',
      type: 'search-form',
      description: 'Test',
      moduleConf: {
        layout: {
          id: 'my-container',
          type: 'idk',
        },
      },
      plugins: DUMP,
      pluginsProps: {
        initialQuery: 'any',
      },
      onSearch: () => { },
      onClearAll: () => { },
    }

    const enzymeWrapper = shallow(<FormComponent {...props} />, options)
    const layoutWrapper = enzymeWrapper.find(FormLayout)
    assert.lengthOf(layoutWrapper, 1, 'There should be the layout wrapper')
  })
})
