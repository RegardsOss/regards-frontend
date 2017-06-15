/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { NoContentMessageInfo, IFrameURLContentDisplayer } from '@regardsoss/components'
import { ScrollArea } from '@regardsoss/adapters'
import DescriptionFileComponent from '../../../../src/components/description/file/DescriptionFileComponent'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Entities Common] Testing DescriptionFileComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DescriptionFileComponent)
  })
  it('should render properly a no data', () => {
    const props = {
      contentHeight: 20,
      entityLabel: 'zouzou',
      descriptionFileURL: null,
      descriptionFile: null,
    }
    const enzymeWrapper = shallow(<DescriptionFileComponent {...props} />, { context })
    const noDataWrapper = enzymeWrapper.find(NoContentMessageInfo)
    assert.lengthOf(noDataWrapper, 1, 'There should be a no data displayer')
    assert.isTrue(noDataWrapper.props().noContent, 'It should currently display a no data mode')
  })
  it('should render properly with an URL to display', () => {
    const props = {
      contentHeight: 20,
      entityLabel: 'zouzou',
      descriptionFileURL: 'www.google.fr',
      descriptionFile: null,
    }

    const enzymeWrapper = shallow(<DescriptionFileComponent {...props} />, { context })
    const noDataWrapper = enzymeWrapper.find(NoContentMessageInfo)
    assert.lengthOf(noDataWrapper, 1, 'There should be a no data displayer')
    assert.isFalse(noDataWrapper.props().noContent, 'It should not display a no data mode')

    const urlContentWrapper = enzymeWrapper.find(IFrameURLContentDisplayer)
    assert.lengthOf(urlContentWrapper, 1, 'There should be n URL content displayer')
    assert.equal(urlContentWrapper.props().contentURL, props.descriptionFileURL, 'The URL should be set to the downloadable description')
  })
  it('should render properly with a local description content to display', () => {
    const props = {
      contentHeight: 20,
      entityLabel: 'nuits',
      descriptionFileURL: null,
      descriptionFile: {
        entityId: 1001,
        contentType: 'text/markdown',
        content: '#Hello',
      },
    }

    const enzymeWrapper = shallow(<DescriptionFileComponent {...props} />, { context })
    const noDataWrapper = enzymeWrapper.find(NoContentMessageInfo)
    assert.lengthOf(noDataWrapper, 1, 'There should be a no data displayer')
    assert.isFalse(noDataWrapper.props().noContent, 'It should not display a no data mode')

    const localMarkdownWrapper = enzymeWrapper.find(ScrollArea)
    assert.lengthOf(localMarkdownWrapper, 1, 'There should be markdown displayer (scrollable container here)')
  })
})
