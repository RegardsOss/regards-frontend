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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import { SearchEngineConfigurationInfoDialog } from '../../../src/components/configuration/SearchEngineConfigurationInfoDialog'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test SearchEngineConfigurationInfoDialog
* @author Sébastien Binda
*/
describe('[ADMIN SEARCH ENGINES] Testing SearchEngineConfigurationInfoDialog', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SearchEngineConfigurationInfoDialog)
  })
  it('should render correctly', () => {
    const props = {
      searchEngineConfiguration: DumpProvider.getNthEntity('CatalogClient', 'SearchEngineConfiguration', 1),
      onClose: () => { },
      accessToken: 'token',
      projectName: 'project',
    }
    const enzymeWrapper = shallow(<SearchEngineConfigurationInfoDialog {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find('a'), 1, 'The component should display a link to the search request endpoint')
  })
})
