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
import { isEqual } from 'lodash/isEqual'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { StorageDomain } from '@regardsoss/domain'
import PrioritizedDataStorageFormComponent from '../../src/components/PrioritizedDataStorageFormComponent'
import { PrioritizedDataStorageFormContainer } from '../../src/containers/PrioritizedDataStorageFormContainer'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test  PrioritizedDataStorageFormContainer
* @author Sébastien Binda
*/
describe('[ADMIN STORAGE MANAGEMENT] Testing  PrioritizedDataStorageFormContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(PrioritizedDataStorageFormContainer)
  })
  it('should render correctly a form for creation', () => {
    const props = {
      // from router
      params: {
        project: 'test',
        type: StorageDomain.DataStorageTypeEnum.ONLINE,
      },
      entity: null,
      fetch: () => new Promise(() => { }),
      update: () => new Promise(() => { }),
      create: () => new Promise(() => { }),
    }
    const enzymeWrapper = shallow(<PrioritizedDataStorageFormContainer {...props} />, { context })
    const loadings = enzymeWrapper.find(LoadableContentDisplayDecorator)
    assert.equal(loadings.length, 1, 'There should have a loading component rendered')
    assert.equal(loadings.at(0).props().isLoading, false, 'Loading should be false')

    const divedComponent = loadings.at(0).dive()
    const components = divedComponent.find(PrioritizedDataStorageFormComponent)
    assert.equal(components.length, 1, 'There should have a PrioritizedDataStorageFormComponent rendered')
    const component = components.at(0)
    const expectedProps = {
      mode: 'create',
      entity: null,
      type: StorageDomain.DataStorageTypeEnum.ONLINE,
      backUrl: `/admin/${props.params.project}/data/acquisition/storage/storages`,
      onUpdate: props.update,
      onCreate: props.create,
    }
    assert.deepEqual(component.props(), expectedProps, 'Props passed to component from container is not valid')
  })
  it('should render correctly a form for edition', () => {
    const entity = DumpProvider.getFirstEntity('StorageClient', 'PrioritizedDataStorage')
    const props = {
      // from router
      params: {
        project: 'test',
        type: StorageDomain.DataStorageTypeEnum.ONLINE,
        mode: 'edit',
        id: `${entity.content.id}`,
      },
      entity,
      fetch: () => new Promise(() => { }),
      update: () => new Promise(() => { }),
      create: () => new Promise(() => { }),
    }
    assert.isNotNull(props.entity, 'Dump entity not valid')
    const enzymeWrapper = shallow(<PrioritizedDataStorageFormContainer {...props} />, { context })
    let loadings = enzymeWrapper.find(LoadableContentDisplayDecorator)
    assert.equal(loadings.length, 1, 'There should have a loading component rendered')
    assert.equal(loadings.at(0).props().isLoading, true, 'Loading should be true')
    enzymeWrapper.setState({ isLoading: false })
    loadings = enzymeWrapper.find(LoadableContentDisplayDecorator)
    assert.equal(loadings.at(0).props().isLoading, false, 'Loading should be false')

    const divedComponent = loadings.at(0).dive()
    const components = divedComponent.find(PrioritizedDataStorageFormComponent)
    assert.equal(components.length, 1, 'There should have a PrioritizedDataStorageFormComponent rendered')
    const component = components.at(0)
    const expectedProps = {
      mode: 'edit',
      entity,
      type: StorageDomain.DataStorageTypeEnum.ONLINE,
      backUrl: `/admin/${props.params.project}/data/acquisition/storage/storages`,
      onUpdate: props.update,
      onCreate: props.create,
    }
    assert.deepEqual(component.props(), expectedProps, 'Props passed to component from container is not valid')
  })
})
