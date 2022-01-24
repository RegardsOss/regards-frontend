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
import SelectField from 'material-ui/SelectField'
import { browserHistory } from 'react-router'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ProjectUserListComponent from '../../../src/components/list/ProjectUserListComponent'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

// Test a component rendering
describe('[ADMIN PROJECTUSER MANAGEMENT] Testing project project user list component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ProjectUserListComponent)
  })
  it('should render correctly', () => {
    browserHistory.setMockedResult({
      pathname: 'test://www.test.tst',
      query: {},
      hash: '',
    })
    const props = {
      project: '',
      csvLink: '',
      visualisationMode: 'account',
      onRefresh: () => { },
      onCreate: () => { },
      onBack: () => { },
    }
    const enzymeWrapper = shallow(<ProjectUserListComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(SelectField), 1, 'SelectField should be set')
  })
})
