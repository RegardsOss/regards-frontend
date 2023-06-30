/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import MenuItem from 'material-ui/MenuItem'
import IconMenu from 'material-ui/IconMenu'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import StorageLocationStorageErrorRenderer from '../../src/components/StorageLocationStorageErrorRenderer'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test StorageLocationStorageErrorRenderer
 * @author Kévin Picart
 * @author Sébastien Binda
 */
describe('[ADMIN STORAGE MANAGEMENT] Testing StorageLocationStorageErrorRenderer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(StorageLocationStorageErrorRenderer)
  })
  it('should render correctly without error', () => {
    const entity = DumpProvider.getFirstEntity('StorageClient', 'StorageLocation')
    const props = {
      entity,
      onStorageErrors: () => {},
      availableDependencies: [
        ...StorageLocationStorageErrorRenderer.retryResource,
        ...StorageLocationStorageErrorRenderer.deleteResource,
        ...StorageLocationStorageErrorRenderer.viewResource,
      ],
    }
    const enzymeWrapper = shallow(<StorageLocationStorageErrorRenderer {...props} />, { context })
    assert.include(enzymeWrapper.debug(), 'storage.location.list.errors.count', 'Errors count label should be shown')
    assert.lengthOf(enzymeWrapper.find(IconMenu), 0, 'No option should be available')
  })
  it('should render correctly with errors', () => {
    const entity = DumpProvider.getFirstEntity('StorageClient', 'StorageLocation')
    // 1 - No right to interact
    entity.content.nbStorageError = 2
    const props = {
      entity: {
        content: {
          ...DumpProvider.getFirstEntity('StorageClient', 'StorageLocation').content,
          nbStorageError: 8,
        },
      },
      onStorageErrors: () => {},
      availableDependencies: [],
    }
    const enzymeWrapper = shallow(<StorageLocationStorageErrorRenderer {...props} />, { context })
    assert.include(enzymeWrapper.debug(), 'storage.location.list.errors.count', 'Errors count label should be shown')
    assert.lengthOf(enzymeWrapper.find(IconMenu), 0, 'No option should be available')
    // 2 - With view only
    const props2 = {
      ...props,
      availableDependencies: [
        ...StorageLocationStorageErrorRenderer.viewResource,
      ],
    }
    enzymeWrapper.setProps(props2)
    assert.include(enzymeWrapper.debug(), 'storage.location.list.errors.count', 'Errors count label should be shown')
    let menuWrapper = enzymeWrapper.find(IconMenu)
    assert.lengthOf(menuWrapper, 1, 'There should be the menu')
    let optionsWrapper = menuWrapper.find(MenuItem)
    assert.lengthOf(optionsWrapper, 1, 'There should be view option')
    testSuiteHelpers.assertWrapperProperties(optionsWrapper.at(0), {
      primaryText: 'storage.location.list.view.storage',
      onClick: enzymeWrapper.instance().onViewStorageErrors,
    }, 'Single available option should be view detail')
    // 3 - all options
    const props3 = {
      ...props,
      availableDependencies: [
        ...StorageLocationStorageErrorRenderer.retryResource,
        ...StorageLocationStorageErrorRenderer.deleteResource,
        ...StorageLocationStorageErrorRenderer.viewResource,
      ],
    }
    enzymeWrapper.setProps(props3)
    assert.include(enzymeWrapper.debug(), 'storage.location.list.errors.count', 'Errors count label should be shown')
    menuWrapper = enzymeWrapper.find(IconMenu)
    assert.lengthOf(enzymeWrapper.find(IconMenu), 1, 'There should be the menu')
    optionsWrapper = menuWrapper.find(MenuItem)
    assert.lengthOf(optionsWrapper, 3, 'There should be all options')
    testSuiteHelpers.assertWrapperProperties(optionsWrapper.at(0), {
      primaryText: 'storage.location.list.relaunch.storage',
      onClick: enzymeWrapper.instance().onRelaunchStoragesErrors,
    }, 'Option 1 should be retry')
    testSuiteHelpers.assertWrapperProperties(optionsWrapper.at(1), {
      primaryText: 'storage.location.list.delete.storage',
      onClick: enzymeWrapper.instance().onDeleteStoragesErrors,
    }, 'Option 2 should be delete')
    testSuiteHelpers.assertWrapperProperties(optionsWrapper.at(2), {
      primaryText: 'storage.location.list.view.storage',
      onClick: enzymeWrapper.instance().onViewStorageErrors,
    }, 'Option 3 should be view detail')
  })
})
