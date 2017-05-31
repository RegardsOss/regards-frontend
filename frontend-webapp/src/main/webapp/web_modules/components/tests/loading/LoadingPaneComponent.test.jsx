/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import LoadingPaneComponent from '../../src/loading/LoadingPaneComponent'

describe('[COMPONENTS] Testing LoadingPaneComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(LoadingPaneComponent)
  })

  it('should render properly', () => {
    // use a simple component for validation
    const SimpleText = ({ text }) => <span>{text}</span>
    SimpleText.propTypes = { text: PropTypes.string.isRequired }

    const titleText = 'Hello title'
    const subtitleText = 'Hello subtitle'
    const props = {
      title: <SimpleText text={titleText} />,
      subTitle: <SimpleText text={subtitleText} />,
    }
    // let it render and check there is no shallow nor prop types errors
    // (no interesting assertion for that component, as most elements are embedded in Card)
    shallow(<LoadingPaneComponent {...props} />)
  })
})
