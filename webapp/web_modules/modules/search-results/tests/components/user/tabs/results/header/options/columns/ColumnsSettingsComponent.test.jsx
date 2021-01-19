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
import { DamDomain } from '@regardsoss/domain'
import { PositionedDialog, TableColumnBuilder } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ColumnsSettingsComponent from '../../../../../../../../src/components/user/tabs/results/header/options/columns/ColumnsSettingsComponent'
import styles from '../../../../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test ColumnsSettingsComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing ColumnsSettingsComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ColumnsSettingsComponent)
  })
  it('should render correctly hidden', () => {
    const props = {
      open: false,
      presentationModels: [],
      onDone: () => { },
      onResetColumns: () => { },
      onClose: () => { },
    }
    const enzymeWrapper = shallow(<ColumnsSettingsComponent {...props} />, { context })
    const dialog = enzymeWrapper.find(PositionedDialog)
    assert.lengthOf(dialog, 1)
    assert.isFalse(dialog.props().open)
  })
  it('should render correctly visible', () => {
    const props = {
      open: true,
      presentationModels: [],
      onDone: () => { },
      onResetColumns: () => { },
      onClose: () => { },
    }
    const enzymeWrapper = shallow(<ColumnsSettingsComponent {...props} />, { context })
    const dialog = enzymeWrapper.find(PositionedDialog)
    assert.lengthOf(dialog, 1)
    assert.isTrue(dialog.props().open)
  })
  it('should update correctly models through onChangeVisibility, onMove and onDone', () => {
    // initial models: selection, c1:label (sorting), c2: IP ID (sorting), c3: creation date, options
    const initialPresentationModels = [{
      key: TableColumnBuilder.selectionColumnKey,
      visible: true,
    }, {
      key: 'c1',
      label: {
        en: 'c1.en',
        fr: 'c1.fr',
      },
      visible: true,
      attributes: [DamDomain.AttributeModelController.getStandardAttributeModel(
        DamDomain.AttributeModelController.standardAttributesKeys.label)],
      enableSorting: true,
    }, {
      key: 'c2',
      label: {
        en: 'c2.en',
        fr: 'c2.fr',
      },
      visible: true,
      attributes: [DamDomain.AttributeModelController.getStandardAttributeModel(
        DamDomain.AttributeModelController.standardAttributesKeys.id)],
      enableSorting: true,
    }, {
      key: 'c3',
      label: {
        en: 'c3.en',
        fr: 'c3.fr',
      },
      visible: true,
      attributes: [DamDomain.AttributeModelController.getStandardAttributeModel(
        DamDomain.AttributeModelController.standardAttributesKeys.id)],
      enableSorting: true,
    }, { // options column
      key: TableColumnBuilder.optionsColumnKey,
      visible: false,
    }]

    let spiedOnDonePM = null
    const props = {
      open: true,
      presentationModels: initialPresentationModels,
      onDone: (presentationModels) => { spiedOnDonePM = presentationModels },
      onResetColumns: () => { },
      onClose: () => { },
    }
    const enzymeWrapper = shallow(<ColumnsSettingsComponent {...props} />, { context })
    assert.deepEqual(enzymeWrapper.state().editionModels, initialPresentationModels, '[Init] presentation models are unchanged')
    assert.isTrue(enzymeWrapper.state().valid, '[Init] model is valid')
    assert.isFalse(enzymeWrapper.state().modified, '[Init] model is not modified')

    // 1 - make the options column visible and hide the c3 column
    let instance = enzymeWrapper.instance()
    instance.onChangeVisibility(initialPresentationModels[3], false)
    instance.onChangeVisibility(initialPresentationModels[4], true)
    enzymeWrapper.update()
    let nextPresentationModels = [
      initialPresentationModels[0],
      initialPresentationModels[1],
      initialPresentationModels[2], {
        ...initialPresentationModels[3],
        visible: false,
      }, {
        ...initialPresentationModels[4],
        visible: true,
      }]
    assert.deepEqual(enzymeWrapper.state().editionModels, nextPresentationModels, '[1] presentation models visibility should be correctly updated')
    assert.isTrue(enzymeWrapper.state().valid, '[1] model is valid')
    assert.isTrue(enzymeWrapper.state().modified, '[1] model is modified')

    // 2 - move selection column after c3 then move c3 before c1
    instance = enzymeWrapper.instance()
    instance.onMove(0, 3)
    instance.onMove(2, 0)
    enzymeWrapper.update()
    nextPresentationModels = [
      nextPresentationModels[3],
      nextPresentationModels[1],
      nextPresentationModels[2],
      nextPresentationModels[0],
      nextPresentationModels[4],
    ]
    assert.deepEqual(enzymeWrapper.state().editionModels, nextPresentationModels, '[2] presentation models positions should be correctly updated')
    assert.isTrue(enzymeWrapper.state().valid, '[2] model is valid')
    assert.isTrue(enzymeWrapper.state().modified, '[2] model is modified')

    // 3 - test invalid model (all columns hidden)
    instance = enzymeWrapper.instance()
    instance.onChangeVisibility(initialPresentationModels[0], false)
    instance.onChangeVisibility(initialPresentationModels[1], false)
    instance.onChangeVisibility(initialPresentationModels[2], false)
    instance.onChangeVisibility(initialPresentationModels[3], false)
    instance.onChangeVisibility(initialPresentationModels[4], false)
    enzymeWrapper.update()
    nextPresentationModels = nextPresentationModels.map((m) => ({ ...m, visible: false }))
    assert.deepEqual(enzymeWrapper.state().editionModels, nextPresentationModels, '[3] presentation models visibility should be correctly updated')
    assert.isFalse(enzymeWrapper.state().valid, '[3] model is not valid (all columns hidden)')
    assert.isTrue(enzymeWrapper.state().modified, '[3] model is modified')

    // 4 - set back c3, c2, selection and options visible
    instance = enzymeWrapper.instance()
    instance.onChangeVisibility(initialPresentationModels[0], true)
    instance.onChangeVisibility(initialPresentationModels[2], true)
    instance.onChangeVisibility(initialPresentationModels[3], true)
    instance.onChangeVisibility(initialPresentationModels[4], true)
    enzymeWrapper.update()
    // check nothing was committed so far
    assert.isNull(spiedOnDonePM)
    // call onDone
    instance.onDone()
    nextPresentationModels = [{
      ...nextPresentationModels[0],
      visible: true,
    },
    nextPresentationModels[1], {
      ...nextPresentationModels[2],
      visible: true,
    }, {
      ...nextPresentationModels[3],
      visible: true,
    }, {
      ...nextPresentationModels[4],
      visible: true,
    },
    ]
    assert.deepEqual(spiedOnDonePM, nextPresentationModels, '[4] Committed models should be correctly updated')
  })
})
