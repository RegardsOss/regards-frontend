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
import EntityDescriptionComponent from '../../../src/components/user/EntityDescriptionComponent'
import styles from '../../../src/styles/styles'
import { fullModuleConf } from '../../dumps/configuration.dump'
import { dataEntity } from '../../dumps/entities.dump'

const context = buildTestContext(styles)

describe('[Description] Testing EntityDescriptionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(EntityDescriptionComponent)
  })
  it('should render correctly', () => {
    const props = {
      projectName: 'project1',
      accessToken: 'abcdef....',
      moduleConf: {
        ...fullModuleConf,
        runtime: {
          entity: dataEntity,
          onNavigate: () => {},
        },
      },
      selectedPath: [0],
      onSelectTreePath: () => {},
      onShowDescription: () => {},
      onSearch: () => {},
    }
    shallow(<EntityDescriptionComponent {...props} />, { context })
    // TODO more tests
  })
})
