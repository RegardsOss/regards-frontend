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
import { assert } from 'chai'
import { shallow } from 'enzyme'
import { CatalogDomain, UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { LastVersionOnlyContainer } from '../../src/containers/LastVersionOnlyContainer'
import LastVersionOnlyComponent from '../../src/components/LastVersionOnlyComponent'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
 * Test LastVersionOnlyContainer
 *
 * @author Raphaël Mechali
 */
describe('[Last version only criterion criterion] Testing LastVersionOnlyContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(LastVersionOnlyContainer)
  })
  it('should render correctly without initial state', () => {
    const props = {
      label: {
        [UIDomain.LOCALES_ENUM.en]: 'Label1',
        [UIDomain.LOCALES_ENUM.fr]: 'Libellé1',
      },
      publishState: () => {},
    }
    const enzymeWrapper = shallow(<LastVersionOnlyContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(LastVersionOnlyComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      label: props.label,
      checked: LastVersionOnlyContainer.DEFAULT_STATE.checked,
      onToggled: enzymeWrapper.instance().onToggled,
    }, 'Component properties should be correctly reported (from default state)')
  })
  it('should render self and sub components with initial state, publishing state and parameters on updates', () => {
    const spiedPublishState = {}
    const props = {
      label: {
        [UIDomain.LOCALES_ENUM.en]: 'Label1',
        [UIDomain.LOCALES_ENUM.fr]: 'Libellé1',
      },
      publishState: (nextState, nextParameters) => {
        spiedPublishState.nextState = nextState
        spiedPublishState.nextParameters = nextParameters
      },
      state: {
        checked: true,
      },
    }
    const enzymeWrapper = shallow(<LastVersionOnlyContainer {...props} />, { context })
    let componentWrapper = enzymeWrapper.find(LastVersionOnlyComponent)
    assert.lengthOf(componentWrapper, 1, '0 - There should be the component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      label: props.label,
      checked: true,
      onToggled: enzymeWrapper.instance().onToggled,
    }, 'Component properties should be correctly reported (from initial state)')
    // 1 - toggle off and check no request is built
    enzymeWrapper.instance().onToggled()
    assert.deepEqual(spiedPublishState.nextState, { checked: false }, '1 - checked state should be toggled off')
    assert.deepEqual(spiedPublishState.nextParameters, {}, '1 - the puglin should emit no parameter when toggled off')
    // 2 - set previous state as state, toggle on and check request is correctly built
    enzymeWrapper.setProps({
      ...props,
      state: spiedPublishState.nextState,
    })
    componentWrapper = enzymeWrapper.find(LastVersionOnlyComponent)
    assert.lengthOf(componentWrapper, 1, '2 - There should be the component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      label: props.label,
      checked: false,
      onToggled: enzymeWrapper.instance().onToggled,
    }, '2 - Component properties should be correctly reported (from updated state)')
    enzymeWrapper.instance().onToggled()
    assert.deepEqual(spiedPublishState.nextState, { checked: true }, '2 - checked state should be toggled on')
    assert.deepEqual(spiedPublishState.nextParameters, {
      [CatalogDomain.CatalogSearchQueryHelper.Q_PARAMETER_NAME]: new CatalogDomain.OpenSearchQueryParameter(
        CatalogDomain.OpenSearchQuery.SAPN.last, true).toQueryString(),
    }, '2 - Only last version data should be built')
  })
})
