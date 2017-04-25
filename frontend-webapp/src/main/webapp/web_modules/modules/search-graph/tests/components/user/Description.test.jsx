/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DetailViewContainer } from '@regardsoss/entities-common'
import downloadDescriptionClient from '../../../src/model/client/DownloadDescriptionClient'
import { modelAttributesAction, modelAttributesSelector } from '../../../src/model/client/ModelAttributeClient'
import Description from '../../../src/components/user/Description'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Graph] Testing Description', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(Description)
  })
  it('should render correctly, propagating properties to children', () => {
    const props = {
      isDescriptionVisible: true,
      entity: { content: { ipId: 'kikou', type: 'DATASET', label: 'Youpi' } },
      onCloseDescription: () => { },
      downloadDescriptionClient,
      fetchModelAttributesActions: modelAttributesAction,
      fetchModelAttributesSelectors: modelAttributesSelector,
    }
    const enzymeWrapper = shallow(<Description {...props} />, { context })
    const detailView = enzymeWrapper.find(DetailViewContainer)
    assert.lengthOf(detailView, 1, 'It should use a detail view component from common entities package')
    testSuiteHelpers.assertWrapperProperties(detailView, {
      open: props.isDescriptionVisible,
      entity: props.entity,
      onClose: props.onCloseDescription,
    }, 'Detail view should receive valid properties from the description component')
  })
})
