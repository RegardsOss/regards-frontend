/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { UserContainer } from '../../../src/containers/user/UserContainer'
import EntityDescriptionComponent from '../../../src/components/user/EntityDescriptionComponent'
import styles from '../../../src/styles/styles'
import { fullModuleConf } from '../../dumps/configuration.dump'
import { dataEntity } from '../../dumps/entities.dump'

const context = buildTestContext(styles)


describe('[Description] Testing UserContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(UserContainer)
  })
  it('should not render when shadow module (configuration storage only)', () => {
    const props = {
      projectName: 'project1',
      accessToken: 'abcdef....',
      appName: 'any',
      type: 'description',
      moduleConf: fullModuleConf, // missing runtime => shadow

      selectedPath: [0],

      setSelectedPath: () => {},
    }

    const enzymeWrapper = shallow(<UserContainer {...props} />, { context })
    const component = enzymeWrapper.find(EntityDescriptionComponent)
    assert.lengthOf(component, 0, 'Shadow module should hide sub components')
  })

  it('should render correctly with runtime data', () => {
    const props = {
      projectName: 'project1',
      accessToken: 'abcdef....',
      appName: 'any',
      type: 'description',
      moduleConf: {
        ...fullModuleConf, // missing runtime => shadow
        runtime: {
          entity: dataEntity,
          onNavigate: () => {},
        },
      },
      selectedPath: [0],
      setSelectedPath: () => {},
    }
    const enzymeWrapper = shallow(<UserContainer {...props} />, { context })
    const component = enzymeWrapper.find(EntityDescriptionComponent)
    assert.lengthOf(component, 1, 'Component should be rendered')
    testSuiteHelpers.assertWrapperProperties(component, {
      accessToken: props.accessToken,
      projectName: props.projectName,
      moduleConf: props.moduleConf,
      selectedPath: props.selectedPath,
      onSelectTreePath: enzymeWrapper.instance().onSelectTreePath,
      onShowDescription: enzymeWrapper.instance().onShowDescription,
      onSearch: enzymeWrapper.instance().onSearch,
    }, 'component properties should be correctly computed')
    // TODO more tests when tree model is ready to be transfered to children
  })
})
