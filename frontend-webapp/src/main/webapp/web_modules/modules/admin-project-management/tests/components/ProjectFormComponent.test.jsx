import { shallow } from 'enzyme'
import { expect } from 'chai'
import { ProjectFormComponent } from '../../src/components/ProjectFormComponent'
import { Field } from '@regardsoss/form-utils'

// Test a component rendering
describe('[ADMIN PROJECT MANAGEMENT] Testing form container', () => {
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
    const enzymeWrapper = shallow(<ProjectFormComponent {...props} />)
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
    const enzymeWrapper = shallow(<ProjectFormComponent {...props} />)
    const subComponent = enzymeWrapper.find(Field)
    expect(subComponent).to.have.length(4)
  })
})
