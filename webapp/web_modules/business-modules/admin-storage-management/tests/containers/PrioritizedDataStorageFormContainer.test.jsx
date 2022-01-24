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
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import StorageLocationFormComponent, { FORM_MODE } from '../../src/components/StorageLocationFormComponent'
import { StorageLocationFormContainer } from '../../src/containers/StorageLocationFormContainer'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test  StorageLocationFormContainer
* @author Sébastien Binda
*/
describe('[ADMIN STORAGE MANAGEMENT] Testing  StorageLocationFormContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(StorageLocationFormContainer)
  })
  it('should render correctly a form for creation', () => {
    const props = {
      // from router
      params: {
        project: 'test',
      },
      entity: null,
      fetch: () => new Promise(() => { }),
      update: () => new Promise(() => { }),
      create: () => new Promise(() => { }),
    }
    const enzymeWrapper = shallow(<StorageLocationFormContainer {...props} />, { context })
    const loadings = enzymeWrapper.find(LoadableContentDisplayDecorator)
    assert.equal(loadings.length, 1, 'There should have a loading component rendered')
    assert.equal(loadings.at(0).props().isLoading, false, 'Loading should be false')

    const divedComponent = loadings.at(0).dive()
    const components = divedComponent.find(StorageLocationFormComponent)
    assert.equal(components.length, 1, 'There should have a StorageLocationFormComponent rendered')
    const component = components.at(0)
    const expectedProps = {
      mode: FORM_MODE.CREATE,
      entity: null,
      backUrl: `/admin/${props.params.project}/data/acquisition/storage/storages`,
      onUpdate: props.update,
      onCreate: props.create,
    }
    assert.deepEqual(component.props(), expectedProps, 'Props passed to component from container is not valid')
  })
  it('should render correctly a form for edition', () => {
    const entity = DumpProvider.getFirstEntity('StorageClient', 'StorageLocation')
    const props = {
      // from router
      params: {
        project: 'test',
        mode: FORM_MODE.EDIT,
        name: `${entity.content.name}`,
      },
      entity,
      fetch: () => new Promise(() => { }),
      update: () => new Promise(() => { }),
      create: () => new Promise(() => { }),
    }
    assert.isNotNull(props.entity, 'Dump entity not valid')
    const enzymeWrapper = shallow(<StorageLocationFormContainer {...props} />, { context })
    let loadings = enzymeWrapper.find(LoadableContentDisplayDecorator)
    assert.equal(loadings.length, 1, 'There should have a loading component rendered')
    assert.equal(loadings.at(0).props().isLoading, true, 'Loading should be true')
    enzymeWrapper.setState({ isLoading: false })
    loadings = enzymeWrapper.find(LoadableContentDisplayDecorator)
    assert.equal(loadings.at(0).props().isLoading, false, 'Loading should be false')

    const divedComponent = loadings.at(0).dive()
    const components = divedComponent.find(StorageLocationFormComponent)
    assert.equal(components.length, 1, 'There should have a StorageLocationFormComponent rendered')
    const component = components.at(0)
    const expectedProps = {
      mode: FORM_MODE.EDIT,
      entity,
      backUrl: `/admin/${props.params.project}/data/acquisition/storage/storages`,
      onUpdate: props.update,
      onCreate: props.create,
    }
    assert.deepEqual(component.props(), expectedProps, 'Props passed to component from container is not valid')
  })
})
