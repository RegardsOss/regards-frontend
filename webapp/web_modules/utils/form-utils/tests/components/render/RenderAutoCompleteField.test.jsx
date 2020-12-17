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
import { expect, assert } from 'chai'
import AutoComplete from 'material-ui/AutoComplete'
import { testSuiteHelpers, buildTestContext, ReduxFormTestHelper } from '@regardsoss/tests-helpers'
import { RenderAutoCompleteField } from '../../../src/components/render/RenderAutoCompleteField'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * @author Sébastien Binda
 */
describe('[FORM UTILS] Testing RenderAutoCompleteField', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RenderAutoCompleteField)
  })
  it('should retrieve the AutoComplete component', () => {
    const props = {
      label: 'Some label',
      input: ReduxFormTestHelper.getInputFieldProps('isItInteresting', ''),
      meta: ReduxFormTestHelper.getMetaFieldProps(),
      hintText: 'Some hint text',
      onNewRequest: () => { },
      onUpdateInput: () => { },
      searchText: 'Some search text',
      dataSource: [
        {
          textField: 'The text field value',
          valueField: 'The valud field value',
        },
        {
          textField: 'The other text field value',
          valueField: 'The other value field value',
        },
      ],
      dataSourceConfig: {
        text: 'textField',
        value: 'valueField',
      },
      openOnFocus: true,
    }
    const enzymeWrapper = shallow(<RenderAutoCompleteField {...props} />, { context })
    const subComponent = enzymeWrapper.find(AutoComplete)
    expect(subComponent).to.have.length(1)
    // Test render of material ui component with props provided by our RenderAutoCompleteField
    subComponent.dive()
  })
})
