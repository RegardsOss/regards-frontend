/*
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import { ProjectListContainer } from '../../../src/containers/project/ProjectListContainer'
import ProjectListComponent from '../../../src/components/project/ProjectListComponent'

// Test a components rendering
describe('[ADMIN PROJECT MANAGEMENT] Testing project list container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ProjectListContainer)
    assert.isDefined(ProjectListComponent)
  })

  it('should render self and subcomponents', () => {
    const props = {
      // from mapStateToProps
      projectList: DumpProvider.get('AdminClient', 'Project'),
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
