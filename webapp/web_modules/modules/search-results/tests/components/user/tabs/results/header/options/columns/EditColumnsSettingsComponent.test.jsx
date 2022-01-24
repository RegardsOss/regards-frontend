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
import { DamDomain } from '@regardsoss/domain'
import { TableColumnBuilder } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import EditColumnsSettingsComponent from '../../../../../../../../src/components/user/tabs/results/header/options/columns/EditColumnsSettingsComponent'
import ColumnsSettingsComponent from '../../../../../../../../src/components/user/tabs/results/header/options/columns/ColumnsSettingsComponent'
import styles from '../../../../../../../../src/styles'

const context = buildTestContext(styles)

const presentationModels = [{ // 1- selection
  key: TableColumnBuilder.selectionColumnKey,
  visible: true,
}, { // 2 - an attribute model
  key: 'anything.else.key',
  label: {
    en: 'IDK.en',
    fr: 'IDK.fr',
  },
  visible: true,
  attributes: [
    DamDomain.AttributeModelController.getStandardAttributeModel(
      DamDomain.AttributeModelController.standardAttributesKeys.label),
    DamDomain.AttributeModelController.getStandardAttributeModel(
      DamDomain.AttributeModelController.standardAttributesKeys.id),
  ],
  enableSorting: false,
}, { // 3 - options column
  key: TableColumnBuilder.optionsColumnKey,
  visible: false,
}]

/**
 * Test EditColumnsSettingsComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing EditColumnsSettingsComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(EditColumnsSettingsComponent)
  })
  it('should render correctly', () => {
    const props = {
      presentationModels,
      onReset: () => { },
      onApply: () => { },
    }
    const enzymeWrapper = shallow(<EditColumnsSettingsComponent {...props} />, { context })
    // check show button is displayed
    const button = enzymeWrapper.find(FlatButton)
    assert.lengthOf(button, 1, 'There must be show edit dialog button')
    testSuiteHelpers.assertWrapperProperties(button, {
      label: 'search.results.configure.columns.option',
      onClick: enzymeWrapper.instance().onShowEditDialog,
    })

    // check dialog properties (must be initially closed)
    const dialogComp = enzymeWrapper.find(ColumnsSettingsComponent)
    assert.lengthOf(dialogComp, 1)
    testSuiteHelpers.assertWrapperProperties(dialogComp, {
      open: false,
      presentationModels: props.presentationModels,
      onDone: enzymeWrapper.instance().onDone,
      onReset: enzymeWrapper.instance().onReset,
      onClose: enzymeWrapper.instance().onClose,
    })
  })
  it('should perform cancel and hide', () => {
    const props = {
      presentationModels,
      onReset: () => { },
      onApply: () => { },
    }
    const enzymeWrapper = shallow(<EditColumnsSettingsComponent {...props} />, { context })
    // simulate click to open dialog
    const button = enzymeWrapper.find(FlatButton)
    assert.lengthOf(button, 1, 'There must be show edit dialog button')
    button.props().onClick()
    enzymeWrapper.update()
    let dialogComp = enzymeWrapper.find(ColumnsSettingsComponent)
    assert.lengthOf(dialogComp, 1, 'There must be the dialog displayer component')
    assert.isTrue(dialogComp.props().open)

    enzymeWrapper.instance().onClose()
    enzymeWrapper.update()
    dialogComp = enzymeWrapper.find(ColumnsSettingsComponent)
    assert.isFalse(dialogComp.props().open, 'Dialog should now be closed')
  })
  it('should perform done and hide correctly', () => {
    let spiedConfigureColumns = null
    const props = {
      presentationModels,
      onReset: () => { },
      onApply: (spiedParam) => { spiedConfigureColumns = spiedParam },
    }
    const enzymeWrapper = shallow(<EditColumnsSettingsComponent {...props} />, { context })
    // simulate click to open dialog
    const button = enzymeWrapper.find(FlatButton)
    assert.lengthOf(button, 1, 'There must be show edit dialog button')
    button.props().onClick()
    enzymeWrapper.update()
    let dialogComp = enzymeWrapper.find(ColumnsSettingsComponent)
    assert.lengthOf(dialogComp, 1, 'There must be the dialog displayer component')
    assert.isTrue(dialogComp.props().open)

    assert.isNull(spiedConfigureColumns, 'On done should not have been called yet')
    enzymeWrapper.instance().onDone('dumb.parameter')
    enzymeWrapper.update()
    dialogComp = enzymeWrapper.find(ColumnsSettingsComponent)
    assert.isFalse(dialogComp.props().open, 'Dialog should now be closed')
    assert.equal(spiedConfigureColumns, 'dumb.parameter', 'Parent done callback should have been called with parameter')
  })
  it('should perform reset and hide correctly', () => {
    let spiedResetCall = false
    const props = {
      presentationModels,
      onReset: () => { spiedResetCall = true },
      onApply: () => { },
    }
    const enzymeWrapper = shallow(<EditColumnsSettingsComponent {...props} />, { context })
    // simulate click to open dialog
    const button = enzymeWrapper.find(FlatButton)
    assert.lengthOf(button, 1, 'There must be show edit dialog button')
    button.props().onClick()
    enzymeWrapper.update()
    let dialogComp = enzymeWrapper.find(ColumnsSettingsComponent)
    assert.lengthOf(dialogComp, 1, 'There must be the dialog displayer component')
    assert.isTrue(dialogComp.props().open)

    assert.isFalse(spiedResetCall, 'Reset calback should not have been called yet')
    enzymeWrapper.instance().onResetColumns()
    enzymeWrapper.update()
    dialogComp = enzymeWrapper.find(ColumnsSettingsComponent)
    assert.isFalse(dialogComp.props().open, 'Dialog should now be closed')
    assert.isTrue(spiedResetCall, 'Parent reset callback should have been called')
  })
})
