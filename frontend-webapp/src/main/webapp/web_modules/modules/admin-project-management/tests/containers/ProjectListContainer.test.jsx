import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import sinon from 'sinon'
import { ProjectListContainer } from '../../src/containers/ProjectListContainer'
import ProjectListComponent from '../../src/components/ProjectListComponent'

// Test a components rendering
describe('[ADMIN PROJECT MANAGEMENT] Testing project list container', () => {
  before(() => {
    sinon.stub(console, 'error', (warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })
  it('should exists', () => {
    assert.isDefined(ProjectListContainer)
    assert.isDefined(ProjectListComponent)
  })

  it('should render self and subcomponents', () => {
    const props = {
      // from mapStateToProps
      projectList: {
        'project name': {
          content: {
            id: 1,
            name: 'project name',
            description: 'project desc',
            icon: 'http://localhost:1888/yeah.gif',
            isPublic: true,
          },
        },
      },
      // from mapDispatchToProps
      fetchProjectList: () => { },
      deleteProject: () => { },
      onLogout: () => { },
      updateLicense: () => { },
    }

    const enzymeWrapper = shallow(<ProjectListContainer {...props} />)
    const subComponent = enzymeWrapper.find(ProjectListComponent)
    expect(subComponent).to.have.length(1)
  })
})
