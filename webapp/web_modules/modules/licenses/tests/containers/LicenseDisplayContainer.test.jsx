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
import { expect, assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { SingleContentURLDialogContainer } from '@regardsoss/components'
import { LicenseDisplayContainer } from '../../src/containers/LicenseDisplayContainer'
import style from '../../src/styles/styles'

const options = {
  context: buildTestContext(style),
}

// Test a component rendering
describe('[LICENSE MODULE] Testing license module container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(LicenseDisplayContainer)
  })
  it('should render self and subcomponents', () => {
    const props = {
      // from  mapDispatchToProps
      licenseLink: undefined,
      accepted: undefined,
      // from mapDispatchToProps
      fetchLicenseInformation: () => { },
      flushLicenseInformation: () => { },
      sendAcceptLicense: () => { },
      logout: () => { },
    }
    const enzymeWrapper = shallow(<LicenseDisplayContainer {...props} />, options)

    // loading: not displaying dialog
    let subComponent = enzymeWrapper.find(SingleContentURLDialogContainer)
    expect(subComponent).to.have.length(0)

    // after loading : displaying dialog when license not accepted
    props.licenseLink = 'http://www.viedemerde.fr'
    props.accepted = false
    enzymeWrapper.setProps(props)
    subComponent = enzymeWrapper.find(SingleContentURLDialogContainer)
    expect(subComponent).to.have.length(1)

    // after accepted, hiding dialog
    props.accepted = true
    enzymeWrapper.setProps(props)
    subComponent = enzymeWrapper.find(SingleContentURLDialogContainer)
    expect(subComponent).to.have.length(0)
  })
})
