/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { NoContentMessageInfo, IFrameURLContentDisplayer } from '@regardsoss/components'
import { ScrollArea } from '@regardsoss/adapters'
import DescriptionFileComponent from '../../../../src/components/description/file/DescriptionFileComponent'
import LoadingDisplayerComponent from '../../../../src/components/description/LoadingDisplayerComponent'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Entities Common] Testing DescriptionFileComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DescriptionFileComponent)
  })
  it('should render correctly a no data', () => {
    const props = {
      loading: false,
      descriptionFileURL: null,
      descriptionFile: null,
    }
    const enzymeWrapper = shallow(<DescriptionFileComponent {...props} />, { context })
    const noDataWrapper = enzymeWrapper.find(NoContentMessageInfo)
    assert.lengthOf(noDataWrapper, 1, 'There should be a no data displayer')
    assert.isTrue(noDataWrapper.props().noContent, 'It should currently display a no data mode')
  })
  it('should render correctly loading', () => {
    const props = {
      loading: true,
      descriptionFileURL: null,
      descriptionFile: null,
    }
    const enzymeWrapper = shallow(<DescriptionFileComponent {...props} />, { context })
    const loadingWrapper = enzymeWrapper.find(LoadingDisplayerComponent)
    assert.lengthOf(loadingWrapper, 1, 'There should be a loading displayer')
  })
  it('should render correctly with an URL to display', () => {
    const props = {
      loading: false,
      descriptionFileURL: 'www.google.fr',
      descriptionFile: null,
    }

    const enzymeWrapper = shallow(<DescriptionFileComponent {...props} />, { context })
    const urlContentWrapper = enzymeWrapper.find(IFrameURLContentDisplayer)
    assert.lengthOf(urlContentWrapper, 1, 'There should be an URL content displayer')
    assert.equal(urlContentWrapper.props().contentURL, props.descriptionFileURL, 'The URL should be set to the downloadable description')
  })
  it('should render correctly with a local description content to display', () => {
    const props = {
      loading: false,
      descriptionFileURL: null,
      descriptionFile: {
        entityId: 'URN:1001-dalmatiens',
        contentType: 'text/markdown',
        content: '#Hello',
      },
    }

    const enzymeWrapper = shallow(<DescriptionFileComponent {...props} />, { context })
    const localMarkdownWrapper = enzymeWrapper.find(ScrollArea)
    assert.lengthOf(localMarkdownWrapper, 1, 'There should be markdown displayer (scrollable container here)')
  })
})
