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
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import { DESCRIPTION_TABS_ENUM } from '../../../src/model/DescriptionTabsEnum'
import EntityDescriptionComponent from '../../../src/components/user/EntityDescriptionComponent'
import styles from '../../../src/styles/styles'
import { fullModuleConf } from '../../dumps/configuration.dump'

const context = buildTestContext(styles)

describe('[Description] Testing EntityDescriptionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(EntityDescriptionComponent)
  })
  it('should render correctly no data', () => {
    const props = {
      moduleConf: fullModuleConf,
      // component API
      entity: null,
      currentTab: null,
      projectName: 'project1',
      accessToken: 'abcdef....',

      // control callback
      onSearchTag: null,
      onClose: () => { },
      onChangeTab: () => { },
    }
    shallow(<EntityDescriptionComponent {...props} />, { context })
  })
  it('should render correctly with data', () => {
    const props = {
      moduleConf: fullModuleConf,
      // component API
      entity: DumpProvider.getFirstEntity('AccessProjectClient', 'DataobjectEntity'),
      currentTab: DESCRIPTION_TABS_ENUM.DESCRIPTION,
      projectName: 'project1',
      accessToken: 'abcdef....',

      // control callback
      onSearchTag: null,
      onClose: () => { },
      onChangeTab: () => { },
    }
    shallow(<EntityDescriptionComponent {...props} />, { context })
  })
})
