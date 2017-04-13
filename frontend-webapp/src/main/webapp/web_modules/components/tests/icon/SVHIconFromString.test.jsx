/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub } from 'sinon'
import SvgIcon from 'material-ui/SvgIcon'
import SVGIconFromString from '../../src/icon/SVGIconFromString'

describe('[COMPONENTS] Testing SVGIconFromString', () => {
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
  it('should exists', () => {
    assert.isDefined(SVGIconFromString)
  })
  it('should render properly', () => {
    const props = {
      icon: '<g><g id="Layer_1_17_"><g><g><g><path d="M84.762,41.232c-4.92,3.529-11.826,8.222-14.941,8.222c-0.617,0-0.815-0.186-0.959-0.361       c-1.272-1.568-0.928-7.066,1.025-16.335c0.193-0.918-0.291-1.841-1.152-2.204c-0.861-0.365-1.861-0.066-2.383,0.71       c-6.721,10.021-9.799,12.123-11.194,12.123c-1.979,0-3.99-5.692-5.986-16.92c-0.159-0.896-0.915-1.549-1.813-1.601v-0.011       c-0.019,0-0.037,0.004-0.056,0.004c-0.019,0-0.04-0.004-0.058-0.004v0.011c-0.895,0.052-1.649,0.705-1.811,1.601       c-1.998,11.228-4.011,16.92-5.988,16.92c-1.396,0-4.472-2.103-11.192-12.123c-0.521-0.776-1.521-1.075-2.384-0.71       c-0.862,0.363-1.346,1.286-1.152,2.204c1.952,9.269,2.299,14.767,1.024,16.335c-0.141,0.176-0.342,0.361-0.958,0.361       c-3.115,0-10.021-4.692-14.943-8.222c-0.778-0.559-1.845-0.468-2.52,0.209c-0.676,0.674-0.765,1.741-0.207,2.52       c11.253,14.392,9.135,30.91,9.135,30.91c-0.041,0.229-0.063,0.463-0.063,0.709c0,4.058,5.682,5.664,10.631,6.61       c5.453,1.045,12.635,1.627,20.266,1.647v0.002c0.073,0,0.147,0,0.22-0.002c0.073,0.002,0.146,0.002,0.221,0.002v-0.002       c7.629-0.021,14.812-0.603,20.263-1.647c4.95-0.946,10.633-2.555,10.633-6.61c0-0.246-0.022-0.479-0.063-0.709       c0,0-2.117-16.521,9.134-30.91c0.559-0.778,0.471-1.846-0.205-2.52C86.607,40.766,85.542,40.674,84.762,41.232z M47.522,78.238       h-0.015c-0.07,0-0.137,0.003-0.206,0.003c-0.07,0-0.135-0.003-0.205-0.003h-0.015c-12.127-0.035-20.144-1.446-23.682-2.657       c3.538-1.213,11.555-2.624,23.682-2.658h0.029c0.063,0,0.126,0,0.19,0s0.124,0,0.19,0h0.03       c12.126,0.034,20.142,1.445,23.681,2.658C67.664,76.792,59.648,78.203,47.522,78.238z" fill="#FFFFFF"/></g></g><g><g><circle cx="47.302" cy="16.573" r="5.914" fill="#FFFFFF"/></g></g><g><g><circle cx="22.339" cy="23.718" r="4.928" fill="#FFFFFF"/></g></g><g><g><circle cx="71.855" cy="23.718" r="4.928" fill="#FFFFFF"/></g></g><g><g><circle cx="3.322" cy="37.759" r="3.322" fill="#FFFFFF"/></g></g><g><g><circle cx="91.178" cy="37.759" r="3.322" fill="#FFFFFF"/></g></g></g></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>',
      iconViewBox: '0 0 94.5 94.5',
    }

    const enzymeWrapper = shallow(<SVGIconFromString {...props} />)
    expect(enzymeWrapper.find(SvgIcon)).to.have.length(1)
  })
})
