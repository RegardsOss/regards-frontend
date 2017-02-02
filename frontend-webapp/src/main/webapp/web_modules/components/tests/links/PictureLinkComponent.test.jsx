/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import sinon from 'sinon'
import Refresh from 'material-ui/svg-icons/navigation/refresh'
import PictureLinkComponent from '../../src/links/PictureLinkComponent'

describe('[COMPONENTS] Testing PictureLinkComponent', () => {
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
    assert.isDefined(PictureLinkComponent)
  })
  const context = {
    muiTheme: {
      palette: {},
    },
  }
  it('should render properly', () => {
    const props = {
      text: 'Refresh',
      IconComponent: Refresh,
      onAction: () => {},
    }

    const enzymeWrapper = shallow(<PictureLinkComponent {...props} />, { context })
    expect(enzymeWrapper.find(Refresh)).to.have.length(1)
  })
})
