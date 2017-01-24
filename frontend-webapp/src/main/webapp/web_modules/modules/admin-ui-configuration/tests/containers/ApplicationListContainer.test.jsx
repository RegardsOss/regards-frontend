/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { I18nProvider } from '@regardsoss/i18n'
import ApplicationsListComponent from '../../src/components/ApplicationsListComponent'
import { UnconnectedApplicationListContainer } from '../../src/containers/ApplicationListContainer'

describe('[ADMIN UI-CONFIGURATION] Testing Application list container', () => {
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
