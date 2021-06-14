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
 * REGARDS is distributed inputRelated the hope that it will be useful,
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
import { Card } from 'material-ui/Card'
import { ListItem } from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import DiffusionComponent from '../../src/components/DiffusionComponent'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
    * Test DiffusionComponent
    * @author Théo Lasserre
    */
describe('[ADMIN DASHBOARD MANAGEMENT] Testing DiffusionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DiffusionComponent)
  })
  it('should render correctly', () => {
    const props = {
      project: 'any',
      sessionStep: {
        id: 0,
        stepId: 'metacatalog',
        source: 'Test_Source1',
        session: 'Test_Session1',
        type: 'DISSEMINATION',
        inputRelated: 3,
        outputRelated: 3,
        state: {
          errors: 3,
          waiting: 2,
          running: 1,
        },
        properties: {},
        lastUpdateDate: '01/01/21',
      },
    }
    const enzymeWrapper = shallow(<DiffusionComponent {...props} />, { context })

    const cardWrapper = enzymeWrapper.find(Card)
    assert.lengthOf(cardWrapper, 1, 'There should be a Card')

    const listItemWrapper = enzymeWrapper.find(ListItem)
    assert.lengthOf(listItemWrapper, 2, 'There should be 2 ListItem')

    const buttonWrapper = enzymeWrapper.find(RaisedButton)
    assert.lengthOf(buttonWrapper, 1, 'There should be 1 RaisedButton')
  })
})
