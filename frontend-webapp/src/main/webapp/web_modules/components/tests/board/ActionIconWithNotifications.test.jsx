/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { stub } from 'sinon'
import Notifications from 'material-ui/svg-icons/social/notifications'
import { testSuiteHelpers,  buildTestContext} from '@regardsoss/tests-helpers'
import ActionIconWithNotifications from '../../src/board/ActionIconWithNotifications'
import ShowableAtRender from '../../src/cards/ShowableAtRender'

const context = buildTestContext()
describe('[COMPONENTS] Testing ActionIconWithNotifications', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ActionIconWithNotifications)
  })

  it('should render properly with notifications', () => {
    const props = {
      notificationsCount: 1,
      icon: <Notifications />,
    }

    const render = shallow(<ActionIconWithNotifications {...props} />, { context })
    assert.isTrue(render.find(ShowableAtRender).props().show, 'The badge should be shown when notificationsCount is greater than zero')
    assert.equal(render.find(Notifications).length, 1, 'There should be the icon')
  })

  it('should render properly and hide badge without notifications', () => {
    const props = {
      notificationsCount: 0,
      icon: <Notifications />,
    }

    const render = shallow(<ActionIconWithNotifications {...props} />, { context })
    assert.isFalse(render.find(ShowableAtRender).props().show, 'The badge should be hidden when notificationsCount is equal to zero')
    assert.equal(render.find(Notifications).length, 1, 'There should be the icon')
  })
})
