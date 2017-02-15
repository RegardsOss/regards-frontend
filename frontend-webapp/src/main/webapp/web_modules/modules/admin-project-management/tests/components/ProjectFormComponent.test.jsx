import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { Field } from '@regardsoss/form-utils'
import { ProjectFormComponent } from '../../src/components/ProjectFormComponent'

// Test a component rendering
describe('[ADMIN PROJECT MANAGEMENT] Testing form container', () => {
  it('should exists', () => {
    assert.isDefined(ProjectFormComponent)
  })

  it('should render edit form', () => {
    const props = {
      currentProject: {
        content: {
          id: 1,
          name: 'project name',
          description: 'project desc',
          icon: 'project icon',
          isPublic: true,
          isAccessible: false,
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
    expect(subComponent).to.have.length(6)
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
    expect(subComponent).to.have.length(6)
  })
})
