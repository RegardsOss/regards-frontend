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
      project: 'any',
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
