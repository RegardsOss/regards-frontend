import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { Field } from '@regardsoss/form-utils'
import { RoleFormComponent } from '../../src/components/RoleFormComponent'

// Test a component rendering
describe('[ADMIN USER ROLE MANAGEMENT] Testing form container', () => {
  it('should exists', () => {
    assert.isDefined(RoleFormComponent)
  })

  it('should render edit form', () => {
    const props = {
      currentProject: {
        content: {
          id: '1',
          name: 'project name',
          description: 'project desc',
          icon: 'project icon',
          isPublic: true,
        },
      },
      backUrl: '/some/url',
      onSubmit: () => {},
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
      // from reduxForm
      submitting: false,
      pristine: false,
      handleSubmit: () => {},
      initialize: () => {},
    }
    const enzymeWrapper = shallow(<RoleFormComponent {...props} />)
    const subComponent = enzymeWrapper.find(Field)
    expect(subComponent).to.have.length(4)
  })
})
