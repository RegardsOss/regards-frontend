/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { MetadataField, editors } from '@regardsoss/user-metadata-common'
import { ProfileEditionFormComponent } from '../../../../src/components/user/profile/ProfileEditionFormComponent'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Menu] Testing ProfileEditionFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ProfileEditionFormComponent)
  })
  it('should render properly', () => {
    const props = {
      // project metadata
      userMetadata: [{
        key: 'meta1',
        labelKey: 'l1',
        editor: editors.textEditor,
        mandatory: false,
        onlyAtRegistration: false,
      }, {
        key: 'meta2',
        labelKey: 'l2',
        editor: editors.countriesEditor,
        mandatory: true,
        onlyAtRegistration: false,
      }, {
        key: 'meta3',
        labelKey: 'l3',
        editor: editors.countriesEditor,
        mandatory: true,
        onlyAtRegistration: true, // should not be in form
      }],
      onCancel: () => { },
      onEdit: () => { },
      handleSubmit: () => { },
      initialize: () => { },
    }
    const enzymeWrapper = shallow(<ProfileEditionFormComponent {...props} />, { context })
    // we should find one metadata field for each
    assert.lengthOf(enzymeWrapper.find(MetadataField), 2, 'Metadata used "onlyAtRegistration" should be displayed')
  })
})
