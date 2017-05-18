/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { spy } from 'sinon'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { AccessGroupListContainer } from '../../src/containers/AccessGroupListContainer'

const context = buildTestContext()

describe('[ADMIN USER ACCESSGROUP MANAGEMENT] Testing AccessGroupListContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AccessGroupListContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })

  it('Render properly loading component during fetching informations', () => {
    const fetchListSpy = spy()
    const props = {
      params: {
        project: 'someprocjet',
      },
      // from mapStateToProps
      accessGroupList: {},
      isFetching: true,
      // from mapDispatchToProps
      fetchAccessGroupList: fetchListSpy,
      deleteAccessGroup: () => {},

    }
    const enzymeWrapper = shallow(<AccessGroupListContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isTrue(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be false')
    assert.isTrue(fetchListSpy.calledOnce)
  })

  it('Render properly empty results', () => {
    const fetchListSpy = spy()
    const props = {
      params: {
        project: 'someprocjet',
      },
      // from mapStateToProps
      accessGroupList: {},
      isFetching: false,
      // from mapDispatchToProps
      fetchAccessGroupList: fetchListSpy,
      deleteAccessGroup: () => {},

    }
    const enzymeWrapper = shallow(<AccessGroupListContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isFalse(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be false')
    assert.isTrue(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isEmpty, 'Empty message should be displayed')
    assert.isTrue(fetchListSpy.calledOnce)
  })

  it('Render properly', () => {
    const fetchListSpy = spy()
    const props = {
      params: {
        project: 'someprocjet',
      },
      // from mapStateToProps
      accessGroupList: DumpProvider.get('DataManagementClient', 'AccessGroup'),
      isFetching: false,
      // from mapDispatchToProps
      fetchAccessGroupList: fetchListSpy,
      deleteAccessGroup: () => {},

    }
    const enzymeWrapper = shallow(<AccessGroupListContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isFalse(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be false')
    assert.isFalse(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isEmpty, 'Empty message should be displayed')
    assert.isTrue(fetchListSpy.calledOnce)
  })
})

