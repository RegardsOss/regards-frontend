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
import FlatButton from 'material-ui/FlatButton'
import { DamDomain, UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import TypeTabComponent from '../../../../../../../src/components/user/tabs/results/header/options/TypeTabComponent'
import styles from '../../../../../../../src/styles'
import { dataContext } from '../../../../../../dumps/data.context.dump'

const context = buildTestContext(styles)

/**
 * Test TypeTabComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing TypeTabComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(TypeTabComponent)
  })
  it('should render correctly selected (from context)', () => {
    const props = {
      type: DamDomain.ENTITY_TYPES_ENUM.DATASET,
      tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
      resultsContext: dataContext,
      onTypeSelected: () => {},
    }

    const enzymeWrapper = shallow(<TypeTabComponent {...props} />, { context })
    const button = enzymeWrapper.find(FlatButton)
    assert.lengthOf(button, 1)
    testSuiteHelpers.assertWrapperProperties(button, {
      label: 'The datasets', // from configuration, en locale
      onClick: props.onTypeSelected,
      secondary: true, // initial mode
    })
    assert.isOk(button.props().icon, 'There should be an icon')
  })
  it('should render correctly unselected (from context)', () => {
    const props = {
      type: DamDomain.ENTITY_TYPES_ENUM.DATA,
      tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
      resultsContext: dataContext,
      onTypeSelected: () => {},
    }
    const enzymeWrapper = shallow(<TypeTabComponent {...props} />, { context })
    const button = enzymeWrapper.find(FlatButton)
    assert.lengthOf(button, 1)
    testSuiteHelpers.assertWrapperProperties(button, {
      label: 'The data', // from configuration, en locale
      onClick: props.onTypeSelected,
      secondary: false, // not initial mode
    })
    assert.isOk(button.props().icon, 'There should be an icon')
  })
})
