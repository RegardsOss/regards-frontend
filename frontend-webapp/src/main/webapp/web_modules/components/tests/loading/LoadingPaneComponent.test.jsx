/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import sinon from 'sinon'
import LoadingPaneComponent from '../../src/loading/LoadingPaneComponent'

describe('[COMPONENTS] Testing LoadingPaneComponent', () => {
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
    assert.isDefined(LoadingPaneComponent)
  })

  it('should render properly', () => {
    // use a simple component for validation
    const SimpleText = ({ text }) => <span>{text}</span>
    SimpleText.propTypes = { text: React.PropTypes.string.isRequired }

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
