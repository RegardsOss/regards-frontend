/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import FlatButton from 'material-ui/FlatButton'
import Toggle from 'material-ui/Toggle'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ItemLink from '../../../src/components/user/ItemLink'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Graph] Testing ItemLink', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ItemLink)
  })
  it('should render properly with icon additive line component', () => {
    const props = {
      locked: true,
      selected: true,
      onSelect: () => { },
      text: 'any',
      Icon: Toggle,
      additiveLineComponent: <FlatButton label="hello again" />,
      onStateChange: () => { },
    }
    const enzymeWrapper = shallow(<ItemLink {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(FlatButton), 1, 'The additive line component (a flat button here) should be rendered')
    assert.lengthOf(enzymeWrapper.find(Toggle), 1, 'The icon (a toggle here) should be rendered')
  })
})
