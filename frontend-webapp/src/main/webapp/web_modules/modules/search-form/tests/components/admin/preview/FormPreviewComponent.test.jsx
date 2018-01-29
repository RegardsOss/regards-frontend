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
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { DefaultLayout } from '@regardsoss/layout'
import { LazyModuleComponent } from '@regardsoss/modules'
import Styles from '../../../../src/styles/styles'
import FormPreviewComponent from '../../../../src/components/admin/preview/FormPreviewComponent'

/**
 * Tests for FormPreviewComponent
 * @author Sébastien binda
 */
describe('[SEARCH FORM] Testing FormPreviewComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  const context = buildTestContext(Styles)

  it('Should render a FormPreviewComponent', () => {
    const props = {
      project: 'test',
      currentNamespace: 'conf',
      module: {
        id: 12,
        type: 'formModule',
        description: 'Form module test',
        active: false,
        applicationId: 'test',
        container: 'content',
        conf: {
          layout: DefaultLayout,
        },
      },
    }
    const wrapper = shallow(<FormPreviewComponent {...props} />, { context })

    const lazyModule = wrapper.find(LazyModuleComponent)
    assert(lazyModule.length === 1, 'The current module sould be rendered with a LayModuleComponent')
    const renderedModule = lazyModule.prop('module')
    assert(renderedModule.active === true, 'The module in preview mode should always be active')
  })
})
