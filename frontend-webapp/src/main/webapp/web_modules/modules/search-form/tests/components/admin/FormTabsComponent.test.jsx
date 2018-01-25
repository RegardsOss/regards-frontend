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
import FormTabsComponent from '../../../src/components/admin/FormTabsComponent'
import Styles from '../../../src/styles/styles'
import FormParametersComponent from '../../../src/components/admin/parameters/FormParametersComponent'
import FormDatasetsConfigurationComponent from '../../../src/components/admin/datasets/FormDatasetsConfigurationComponent'
import FormLayoutComponent from '../../../src/components/admin/layout/FormLayoutComponent'
import FormCriterionComponent from '../../../src/components/admin/criterion/FormCriterionComponent'
import FormPreviewComponent from '../../../src/components/admin/preview/FormPreviewComponent'


const options = {
  context: buildTestContext(Styles),
}

/**
 * Tests for FormTabsComponent
 * @author Sébastien binda
 */
describe('[SEARCH FORM] Testing FormTabsComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('Should render form tabs', () => {
    const props = {
      project: 'test',
      appName: 'test',
      adminForm: {
        isCreating: true,
        isDuplicating: false,
        isEditing: false,
        changeField: () => { },
        form: {
          id: 1,
          name: 'testModule',
          description: 'description',
          active: true,
          applicationId: 'test',
          container: 'content',
          enableFacettes: true,
          conf: {},
          layout: {
            id: 'main',
            type: 'letype',
          },
        },
      },
      defaultConf: {
        datasets: {},
        criterion: [],
        layout: {
          id: 'main',
          type: 'letype',
        },
        enableFacettes: false,
        resultType: null,
      },
      selectableAttributes: {},
      disableChangeDatasets: false,
      availableCriterion: {},
      criterionFetching: false,
    }
    const wrapper = shallow(<FormTabsComponent {...props} />, options)

    const paramTab = wrapper.find(FormParametersComponent)
    const datasetTab = wrapper.find(FormDatasetsConfigurationComponent)
    const layoutTab = wrapper.find(FormLayoutComponent)
    const criterionTab = wrapper.find(FormCriterionComponent)
    const previewTab = wrapper.find(FormPreviewComponent)

    assert(paramTab.length === 1)
    assert(datasetTab.length === 1)
    assert(layoutTab.length === 1)
    assert(criterionTab.length === 1)
    assert(previewTab.length === 1)
  })
})
