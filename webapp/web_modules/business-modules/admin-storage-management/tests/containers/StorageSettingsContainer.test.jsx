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
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { StorageSettingsContainer } from '../../src/containers/StorageSettingsContainer'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test StorageSettingsContainer
 * @author Théo Lasserre
 */
describe('[ADMIN STORAGE MANAGEMENT] Testing StorageSettingsContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(StorageSettingsContainer)
  })
  it('should render correctly', () => {
    const props = {
      params: {
        project: 'any',
      },
      settings: {
        0: {
          content: {
            name: 'store_files',
            description: '',
            value: false,
            defaultValue: false,
          },
        },
        1: {
          content: {
            name: 'storage_location',
            description: '',
            value: 'C:/dossier1/dossier2/',
            defaultValue: 'C:/dossier1/dossier2/',
          },
        },
        2: {
          content: {
            name: 'storage_sub_directory',
            description: '',
            value: 'test',
            defaultValue: 'test',
          },
        },
      },
      hasErrorSettings: false,
      storages: [],
      isFetchingStorages: false,
      hasErrorStorages: false,
      getStorages: () => { },
      fetchSettings: testSuiteHelpers.getSuccessDispatchStub(),
      updateSettings: () => { },
      flushSettings: () => { },
    }
    const enzymeWrapper = shallow(<StorageSettingsContainer {...props} />, { context })
    // check i18n
    const i18nProviderWrapper = enzymeWrapper.find(I18nProvider)
    assert.lengthOf(i18nProviderWrapper, 1, 'i18n should be provided to child component')
    // check loader wrapper
    const loaderWrapper = enzymeWrapper.find(LoadableContentDisplayDecorator)
    assert.lengthOf(loaderWrapper, 1, 'There should be a loader wrapper')
    testSuiteHelpers.assertWrapperProperties(loaderWrapper, {
      isLoading: true,
      isContentError: false,
    })
  })
  it('should render correctly in error', () => {
    const props = {
      params: {
        project: 'any',
      },
      settings: {
        0: {
          content: {
            name: 'store_files',
            description: '',
            value: false,
            defaultValue: false,
          },
        },
        1: {
          content: {
            name: 'storage_location',
            description: '',
            value: 'C:/dossier1/dossier2/',
            defaultValue: 'C:/dossier1/dossier2/',
          },
        },
        2: {
          content: {
            name: 'storage_sub_directory',
            description: '',
            value: 'test',
            defaultValue: 'test',
          },
        },
      },
      hasErrorSettings: true,
      storages: [],
      isFetchingStorages: false,
      hasErrorStorages: false,
      getStorages: () => { },
      fetchSettings: testSuiteHelpers.getSuccessDispatchStub(),
      updateSettings: () => { },
      flushSettings: () => { },
    }
    const enzymeWrapper = shallow(<StorageSettingsContainer {...props} />, { context })
    // check loader wrapper
    const loaderWrapper = enzymeWrapper.find(LoadableContentDisplayDecorator)
    assert.lengthOf(loaderWrapper, 1, 'There should be a loader wrapper')
    testSuiteHelpers.assertWrapperProperties(loaderWrapper, {
      isLoading: true,
      isContentError: true,
    })
  })
})
