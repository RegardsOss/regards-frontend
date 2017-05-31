/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { spy } from 'sinon'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { ApplicationLayoutContainer } from '../../src/containers/ApplicationLayoutContainer'
import LayoutDumpNetwork from '../model/dump/LayoutDumpNetwork'
/**
 * Tests for ApplicationLayoutContainer
 * @author Sébastien binda
 */
describe('[ADMIN UI LAYOUT MANAGEMENT] Testing Layout container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('Should render correctly a layout container', () => {
    const fetchLayoutCallBack = spy()
    const updateLayoutCallBack = spy()
    const props = {
      params: {
        project: 'testProject',
        applicationId: 'testApp',
      },
      isFetching: false,
      layout: LayoutDumpNetwork[1],
      fetchLayout: fetchLayoutCallBack,
      updateLayout: updateLayoutCallBack,
    }
    const wrapper = shallow(
      <ApplicationLayoutContainer
        {...props}
      />,
    )

    assert.isTrue(fetchLayoutCallBack.calledOnce, 'Fetch layout entities should be called at container mount')
    assert.isTrue(wrapper.find(LoadableContentDisplayDecorator).length === 1, 'There should be a LoadableContentDisplayDecorator displayed')
    assert.isTrue(wrapper.find(I18nProvider).length === 1, 'There should be a I18nProvider')
  })
})
