/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { InfiniteTableContainer } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers, ReduxFormTestHelper } from '@regardsoss/tests-helpers'
import DocumentModelsFieldArrayComponent from '../../src/components/DocumentModelsFieldArrayComponent'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test DocumentModelsFieldArrayComponent
 * @author Raphaël Mechali
 */
describe('[ADMIN UI SETTINGS MANAGEMENT] Testing DocumentModelsFieldArrayComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DocumentModelsFieldArrayComponent)
  })
  it('should render and update with selection updates correctly', () => {
    const models = [1, 2, 3, 4, 5].map((v) => `model${v}`)
    const props = {
      dataModelNames: models,
      fields: ReduxFormTestHelper.getFieldsProps([models[0], models[3]]),
    }
    const enzymeWrapper = shallow(<DocumentModelsFieldArrayComponent {...props} />, { context })
    // 1- check initial render
    let tables = enzymeWrapper.find(InfiniteTableContainer)
    assert.lengthOf(tables, 2, '(1) There should be available and selected tables')
    assert.deepEqual(tables.at(0).props().entities, [models[1], models[2], models[4]], '(1) Selectable models should be correctly computed')
    assert.deepEqual(tables.at(1).props().entities, props.fields.getAll(), '(1) Selected models should be correctly computed')

    // 2- test adding a model
    enzymeWrapper.instance().onSelectDocumentModelOptionComponent(models[1])
    assert.deepEqual(props.fields.getAll(), [models[0], models[3], models[1]], '(2) Selected models should be correctly updated on add')
    // force a render with new props reference (that trick is required here as redux form renders on store changes)
    enzymeWrapper.setProps({
      dataModelNames: models,
      fields: { ...props.fields }, // new reference
    })
    tables = enzymeWrapper.find(InfiniteTableContainer)
    assert.lengthOf(tables, 2, '(2) There should be available and selected tables')
    assert.deepEqual(tables.at(0).props().entities, [models[2], models[4]], '(2) Selectable models should be correctly computed')
    assert.deepEqual(tables.at(1).props().entities, props.fields.getAll(), '(2) Selected models should be correctly computed')

    // 3- test removing two models
    enzymeWrapper.instance().onUnselectDocumentModelOptionComponent(0)
    enzymeWrapper.instance().onUnselectDocumentModelOptionComponent(1)
    assert.deepEqual(props.fields.getAll(), [models[3]], '(3) Selected models should be correctly updated on remove')
    // same trick used before
    enzymeWrapper.setProps({
      dataModelNames: models,
      fields: { ...props.fields }, // new reference
    })
    tables = enzymeWrapper.find(InfiniteTableContainer)
    assert.lengthOf(tables, 2, '(3) There should be available and selected tables')
    assert.deepEqual(tables.at(0).props().entities, [models[0], models[1], models[2], models[4]], '(3) Selectable models should be correctly computed')
    assert.deepEqual(tables.at(1).props().entities, props.fields.getAll(), '(3) Selected models should be correctly computed')
  })
})
