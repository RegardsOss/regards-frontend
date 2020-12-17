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
import get from 'lodash/get'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { DamDomain, UIDomain } from '@regardsoss/domain'
import { getTypeRender } from '@regardsoss/attributes-common'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import QuicklookCellAttributesComponent from '../../../../../../src/components/user/tabs/results/quickooks/QuicklookCellAttributesComponent'
import styles from '../../../../../../src/styles'
import { dataContext } from '../../../../../dumps/data.context.dump'
import { dataEntity } from '../../../../../dumps/entities.dump'

const context = buildTestContext(styles)

/**
 * Test QuicklookCellAttributesComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing QuicklookCellAttributesComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(QuicklookCellAttributesComponent)
  })
  it('should render correctly', () => {
    const props = {
      entity: dataEntity,
      presentationModels: dataContext.tabs[UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS].types[DamDomain.ENTITY_TYPES_ENUM.DATA].modes[UIDomain.RESULTS_VIEW_MODES_ENUM.QUICKLOOK].presentationModels,
      locale: UIDomain.LOCALES_ENUM.en,
    }
    const enzymeWrapper = shallow(<QuicklookCellAttributesComponent {...props} />, { context })
    assert.isTrue(props.presentationModels.length > 0, 'There should be attribute models from converted configuration')
    const renderText = enzymeWrapper.debug()
    props.presentationModels.forEach(({ label: { en: enLabel }, attributes }) => {
      // check each label is displayed
      assert.isTrue(renderText.includes(enLabel), `There should be attribute label ${enLabel}`)
      // check first attribute is rendered with value
      assert.isTrue(attributes.length > 0, `There should be attributes in attributes group ${enLabel}`)
      const { content: { type, jsonPath } } = attributes[0].model
      const attributeValue = get(dataEntity, `content.${jsonPath}`)
      assert.isOk(attributeValue, `Attribute ${enLabel} value should be found`)
      const RenderConstructor = getTypeRender(type)
      const renderComponent = enzymeWrapper.find(RenderConstructor).findWhere(comp => comp.props().value === attributeValue)
      assert.lengthOf(renderComponent, 1, `There should be the rendered attribute ${enLabel} with value ${attributeValue}`)
    })

    // check for fr locale
    const props2 = { ...props, locale: UIDomain.LOCALES_ENUM.fr }
    const enzymeWrapperFR = shallow(<QuicklookCellAttributesComponent {...props2} />, { context })
    const renderTextFR = enzymeWrapperFR.debug()
    props.presentationModels.forEach(({ label: { fr: frLabel }, attributes }) => {
      // cheack each label is displayed
      assert.isTrue(renderTextFR.includes(frLabel), `There should be attribute label ${frLabel}`)
    })
  })
})
