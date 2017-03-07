/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import sinon from 'sinon'
import Notifications from 'material-ui/svg-icons/social/notifications'
import ActionIconWithNotifications from '../../src/board/ActionIconWithNotifications'
import ShowableAtRender from '../../src/cards/ShowableAtRender'

describe('[COMPONENTS] Testing ActionIconWithNotifications', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    sinon.stub(console, 'error', (warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })
  it('should exists', () => {
    assert.isDefined(ActionIconWithNotifications)
  })

  it('should render properly with notifications', () => {
    const props = {
      notificationsCount: 1,
      icon: <Notifications />,
    }
    const render = shallow(<ActionIconWithNotifications {...props} />, context)
    assert.isTrue(render.find(ShowableAtRender).props().show, 'The badge should be shown when notificationsCount is greater than zero')
    assert.equal(Notifications, 1, 'There should be the icon')
  })

  it('should render properly and hide badge without notifications', () => {
    const props = {
      notificationsCount: 0,
      icon: <Notifications />,
    }
    const render = shallow(<ActionIconWithNotifications {...props} />, context)
    assert.isFalse(render.find(ShowableAtRender).props().show, 'The badge should be hidden when notificationsCount is equal to zero')
    assert.equal(Notifications, 1, 'There should be the icon')
  })
})
