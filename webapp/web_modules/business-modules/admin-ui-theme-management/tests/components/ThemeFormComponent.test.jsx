/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { Field } from '@regardsoss/form-utils'
import { ThemeEditor } from '@regardsoss/vendors'
import { ThemeFormComponent } from '../../src/components/ThemeFormComponent'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test ThemeFormComponent
* @author Léo Mieulet
*/
describe('[ADMIN UI THEME MANAGEMENT] Testing ThemeFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ThemeFormComponent)
  })
  it('should render correctly', () => {
    const props = {
      currentTheme: null,
      backUrl: '#',
      isCreating: true,
      onSubmit: () => { },
      // from reduxForm
      submitting: false,
      pristine: false,
      handleSubmit: () => { },
      initialize: () => { },
    }
    const enzymeWrapper = shallow(<ThemeFormComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(Field), 2, 'should contains fields')
    assert.lengthOf(enzymeWrapper.find(ThemeEditor), 1, 'should contains the theme editor')
  })
})
