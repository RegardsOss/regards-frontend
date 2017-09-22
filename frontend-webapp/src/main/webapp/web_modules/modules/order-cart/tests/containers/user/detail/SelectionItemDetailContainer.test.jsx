/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import SelectionItemDetailComponent from '../../../../src/components/user/detail/SelectionItemDetailComponent'
import { SelectionItemDetailContainer } from '../../../../src/containers/user/detail/SelectionItemDetailContainer'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test SelectionItemDetailContainer
* @author Raphaël Mechali
*/
describe('[Order Cart] Testing SelectionItemDetailContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SelectionItemDetailContainer)
  })
  it('should render correctly without detail', () => {
    const props = {
      detail: {
        visible: false,
        date: undefined,
        datasetLabel: undefined,
        openSearchRequest: undefined,
      },
      dispatchHideDetail: () => { },
    }
    const enzymeWrapper = shallow(<SelectionItemDetailContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(SelectionItemDetailComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the sub component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      ...props.detail,
      onClose: props.dispatchHideDetail,
    }, 'Properties should be correctly reported to component')
  })
  it('should render correctly with detail', () => {
    const props = {
      detail: {
        visible: true,
        date: '2017-09-08T15:59:57.664Z',
        datasetLabel: 'test-ds-label',
        openSearchRequest: 'testrequest',
      },
      dispatchHideDetail: () => { },
    }
    const enzymeWrapper = shallow(<SelectionItemDetailContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(SelectionItemDetailComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the sub component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      ...props.detail,
      onClose: props.dispatchHideDetail,
    }, 'Properties should be correctly reported to component')
  })
  it('should render correctly after detail were hidden', () => {
    const props = {
      detail: {
        visible: false,
        date: '2017-09-08T15:59:57.664Z',
        datasetLabel: 'test-ds-label',
        openSearchRequest: 'testrequest',
      },
      dispatchHideDetail: () => { },
    }
    const enzymeWrapper = shallow(<SelectionItemDetailContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(SelectionItemDetailComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the sub component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      ...props.detail,
      onClose: props.dispatchHideDetail,
    }, 'Properties should be correctly reported to component')
  })
})
