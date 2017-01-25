/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import sinon from 'sinon'
import { Field } from '@regardsoss/form-utils'
import { RoleFormComponent } from '../../src/components/RoleFormComponent'

// Test a component rendering
describe('[ADMIN USER ROLE MANAGEMENT] Testing form container', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    sinon.stub(console, 'error', (warning) => { throw new Error(warning) })
  })
  after(() => {
    console.error.restore()
  })

  it('should exists', () => {
    assert.isDefined(RoleFormComponent)
  })

  it('should render edit form', () => {
    const props = {
      currentRole: {
        content: {
          id: 1,
          name: 'project name',
          description: 'project desc',
          icon: 'project icon',
          isPublic: true,
          authorizedAddresses: ['1.2.3.4', '15.87.65.42'],
        },
      },
      backUrl: '/some/url',
      onSubmit: () => {},
      change: () => {},
      // from reduxForm
      submitting: false,
      pristine: false,
      handleSubmit: () => {},
      initialize: () => {},
    }
    const enzymeWrapper = shallow(<RoleFormComponent {...props} />)
    const subComponent = enzymeWrapper.find(Field)
    expect(subComponent).to.have.length(3)
  })

  it('should render create form', () => {
    const props = {
      backUrl: '/some/url',
      onSubmit: () => {},
      change: () => {},
      // from reduxForm
      submitting: false,
      pristine: false,
      handleSubmit: () => {},
      initialize: () => {},
    }
    const enzymeWrapper = shallow(<RoleFormComponent {...props} />)
    const subComponent = enzymeWrapper.find(Field)
    expect(subComponent).to.have.length(3)
  })
})
