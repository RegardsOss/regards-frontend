/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import SearchToponymComponent from '../../../../../../src/components/user/tabs/results/map/SearchToponymComponent'
import { SearchToponymContainer } from '../../../../../../src/containers/user/tabs/results/map/SearchToponymContainer'
import styles from '../../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test SearchToponymContainer
 * @author Théo Lasserre
 */
describe('[ Module name] Testing SearchToponymContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SearchToponymContainer)
  })
  it('should render correctly', () => {
    const props = {
      // callback: user selected a toponym
      onToponymSelected: () => { },
      // from mapStateToProps
      isFetching: false,
      toponyms: {
        id: {
          content: {
            labelFr: 'fr',
            labelEn: 'en',
            businessId: 'id',
          },
        },
      },
      currentLocale: UIDomain.LOCALES_ENUM.fr,
      // from mapDispatchToProps
      dispatchGetToponyms: () => { },
    }
    const enzymeWrapper = shallow(<SearchToponymContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(SearchToponymComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      toponymFilterText: enzymeWrapper.state().toponymFilterText,
      matchingToponyms: props.toponyms,
      isInError: enzymeWrapper.state().isInError,
      isFetching: props.isFetching,
      onUpdateToponymsFilter: enzymeWrapper.instance().onUpdateTextFilter,
      onToponymFilterSelected: enzymeWrapper.instance().onFilterSelected,
      currentLocale: props.currentLocale,
    }, 'Component should define the expected properties')
  })
})
