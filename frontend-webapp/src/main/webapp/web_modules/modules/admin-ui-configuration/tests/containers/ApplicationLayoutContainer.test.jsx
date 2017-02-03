/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import sinon from 'sinon'
import { I18nProvider } from '@regardsoss/i18n'
import ApplicationLayoutComponent from '../../src/components/ApplicationLayoutComponent'
import { UnconnectedApplicationLayoutContainer } from '../../src/containers/ApplicationLayoutContainer'

/**
 * Tests for ApplicationLayoutContainer
 * @author Sébastien binda
 */
describe('[ADMIN UI-CONFIGURATION] Testing Layout container', () => {
  it('Should render correctly a layout container', () => {
    const fetchLayoutCallBack = sinon.spy()
    const updateLayoutCallBack = sinon.spy()
    const props = {
      params: {
        project: 'testProject',
        applicationId: 'testApp',
      },
      isFetching: false,
      layout: {
        content: {},
      },
      fetchLayout: fetchLayoutCallBack,
      updateLayout: updateLayoutCallBack,
    }
    const wrapper = shallow(
      <UnconnectedApplicationLayoutContainer
        {...props}
      />,
    )

    assert.isTrue(fetchLayoutCallBack.calledOnce, 'Fetch layout entities should be called at container mount')
    assert.isTrue(wrapper.find(ApplicationLayoutComponent).length === 1, 'There should be a ApplicationLayoutComponent displayed')
    assert.isTrue(wrapper.find(I18nProvider).length === 1, 'There should be a I18nProvider')
  })
})
