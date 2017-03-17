/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { stub } from 'sinon'
import { assert } from 'chai'
import { I18nProvider } from '@regardsoss/i18n'
import ApplicationsListComponent from '../../src/components/ApplicationsListComponent'
import { UnconnectedApplicationListContainer } from '../../src/containers/ApplicationListContainer'

/**
 * Tests for ApplicationListContainer
 * @author Sébastien binda
 */
describe('[ADMIN UI-CONFIGURATION] Testing Application list container', () => {
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
  it('Should render correctly the ApplicationListComponent', () => {
    const props = {
      params: {
        project: 'testProject',
        applicationId: 'testApp',
      },
    }
    const wrapper = shallow(
      <UnconnectedApplicationListContainer
        {...props}
      />,
    )

    assert.isTrue(wrapper.find(ApplicationsListComponent).length === 1, 'There should be a ApplicationsListComponent displayed')
    assert.isTrue(wrapper.find(I18nProvider).length === 1, 'There should be a I18nProvider')
  })
})
