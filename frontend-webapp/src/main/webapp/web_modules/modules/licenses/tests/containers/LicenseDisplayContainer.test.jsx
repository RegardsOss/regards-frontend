import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub } from 'sinon'
import { SingleContentURLDialogContainer } from '@regardsoss/components'
import { LicenseDisplayContainer } from '../../src/containers/LicenseDisplayContainer'

// Test a component rendering
describe('[LICENSE MODULE] Testing license module container', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    stub(console, 'error').callsFake((warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })
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
    const context = {
      muiTheme: {},
      moduleTheme: {
        dialog: {
          bodyStyle: {},
          heightPercent: 50,
          widthPercent: 50,
        },
      },
    }
    const enzymeWrapper = shallow(<LicenseDisplayContainer {...props} />, { context })

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
