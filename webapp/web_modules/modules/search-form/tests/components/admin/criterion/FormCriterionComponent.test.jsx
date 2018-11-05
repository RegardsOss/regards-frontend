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
 **/
import { shallow } from 'enzyme'
import { spy } from 'sinon'
import { assert } from 'chai'
import {
  Table,
  TableBody,
  TableRow,
} from 'material-ui/Table'
import Dialog from 'material-ui/Dialog'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { CardActionsComponent, CardActionsView } from '@regardsoss/components'
import Styles from '../../../../src/styles/styles'
import FormCriterionComponent from '../../../../src/components/admin/criterion/FormCriterionComponent'
import FormCriteriaComponent from '../../../../src/components/admin/criterion/FormCriteriaComponent'

/**
 * Tests for FormCriterionComponent
 * @author Sébastien binda
 */
describe('[SEARCH FORM] Testing FormCriterionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  const context = buildTestContext(Styles)

  it('Should render an empty FormCriterionComponent', () => {
    const props = {
      changeField: () => { },
      defaultCriterion: [],
      criterion: [],
      layout: {
        id: 'main',
        type: 'type',
      },
      selectableAttributes: {},
      availableCriterion: {},
    }
    const wrapper = shallow(<FormCriterionComponent {...props} />, { context })

    const tableList = wrapper.find(Table)
    const tableRows = wrapper.find(TableBody).find(TableRow)
    let editDialog = wrapper.find(Dialog)
    const buttonsCard = wrapper.find(CardActionsComponent)

    assert.equal(tableList.length, 1, 'There should be a table containing criterion')
    assert.equal(tableRows.length, 0, 'There should not be table rows, as there is no criterion to edit.')
    assert.equal(editDialog.length, 1, 'There should be an hidden criterion dialog edition')
    assert.equal(buttonsCard.length, 1, 'There should a card containing buttons cancel and add')
    assert.equal(editDialog.prop('open'), false, 'The edit criterion dialog should not be opened')

    // Simulate add a new criterion
    const buttonsWrapper = buttonsCard.dive()
    const buttons = buttonsWrapper.find(CardActionsView).dive()
    const addNewButton = buttons.find('Connect(WithResourceDisplayControl(MainActionButtonComponent))')
    assert.equal(addNewButton.length, 1, 'There should be a add new button')

    addNewButton.simulate('click')
    wrapper.update()
    editDialog = wrapper.find(Dialog)
    assert.equal(editDialog.prop('open'), true, 'The edit criterion dialog should be opened')
    const formcriteria = editDialog.find(FormCriteriaComponent)
    assert.equal(formcriteria.length, 1, 'There should be a form to create a new criteria')
    assert.equal(formcriteria.prop('criteria'), null, 'The form criteria should not have a criteria param')
    assert.equal(formcriteria.prop('layout'), props.layout, 'The layout configuration passed to the formcriteria component should the one from the props.')
  })
  // eslint-disable-next-line mocha/no-skipped-tests
  xit('Should render a formCriterionComponent with defined criterion list', () => {
    const changeFieldCallback = spy()
    const props = {
      changeField: changeFieldCallback,
      currentNamespace: 'conf',
      defaultCriterion: [],
      criterion: [{
        id: 0,
        active: true,
        label: 'criterion',
        pluginId: 0,
        container: 'content',
        conf: {},
      }, {
        id: 1,
        active: true,
        label: 'criterion_1',
        pluginId: 1,
        container: 'content',
        conf: {},
      }],
      layout: {
        id: 'main',
        type: 'test',
      },
      selectableAttributes: {},
      availableCriterion: {},
    }
    const wrapper = shallow(<FormCriterionComponent {...props} />, { context })

    const tableList = wrapper.find(Table)
    let tableRows = wrapper.find(TableBody).find(TableRow)
    let editDialog = wrapper.find(Dialog)
    const buttonsCard = wrapper.find(CardActionsComponent)

    assert.equal(tableList.length, 1, 'There should be a table containing criterion')
    assert.equal(tableRows.length, 2, 'There should not be table rows, as there is no criterion to edit.')
    assert.equal(editDialog.length, 1, 'There should be an hidden criterion dialog edition')
    assert.equal(buttonsCard.length, 1, 'There should a card containing buttons cancel and add')
    assert.equal(editDialog.prop('open'), false, 'The edit criterion dialog should not be opened')


    const editButton = tableRows.first().find(Edit).parent()
    const deleteButton = tableRows.first().find(Delete).parent()

    // Simulate edit on a given criteria
    editButton.simulate('click')
    wrapper.update()
    editDialog = wrapper.find(Dialog)
    assert.equal(editDialog.prop('open'), true, 'The edit criterion dialog should be opened')
    const formcriteria = editDialog.find(FormCriteriaComponent)
    assert.equal(formcriteria.length, 1, 'There should be a form to create a new criteria')
    assert.equal(formcriteria.prop('criteria'), props.criterion[0], 'The form criteria should have a criteria param')
    assert.equal(formcriteria.prop('layout'), props.layout, 'The layout configuration passed to the formcriteria component should the one from the props.')

    // Simulate delete on a given criteria
    assert(changeFieldCallback.notCalled, 'The change callback should not been called here')
    deleteButton.simulate('click')
    wrapper.update()
    tableRows = wrapper.find(TableBody).find(TableRow)
    assert(changeFieldCallback.calledOnce, 'The change callback should have been called here')
    assert(changeFieldCallback.calledWith(
      'conf.criterion',
      [props.criterion[1]],
    ), 'The delete callback is not valid')
  })
})
