/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import Refresh from 'material-ui/svg-icons/navigation/refresh'
import PictureLinkComponent from '../../src/links/PictureLinkComponent'

describe('[COMPONENTS] Testing PictureLinkComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

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
