/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { CatalogEntityTypes } from '@regardsoss/model'
import TagsComponent from '../../../../../src/components/description/properties/tags/TagsComponent'
import { TagsContainer } from '../../../../../src/containers/description/properties/tags/TagsContainer'
import DescriptionLevelActions from '../../../../../src/model/description/DescriptionLevelActions'
import getDescriptionLevelSelectors from '../../../../../src/model/description/DescriptionLevelSelectors'

const context = buildTestContext()

describe('[ Module name] Testing TagsContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(TagsContainer)
  })
  it('should render correctly no data, not fetching tags', () => {
    const fetchedCount = {
      tags: 0,
    }
    const props = {
      entity: null,
      onSearchTag: null,
      levelActions: new DescriptionLevelActions('test'),
      levelSelectors: getDescriptionLevelSelectors('test'),
      dispatchGetEntity: () => { fetchedCount.tags += 1 },
    }
    const enzymeWrapper = shallow(<TagsContainer {...props} />, { context })
    assert.equal(fetchedCount.tags, 0, 'There should be no fetch for null entity')
    const componentWrapper = enzymeWrapper.find(TagsComponent)
    assert.lengthOf(componentWrapper, 1, 'The corresponding component should be rendered')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      loading: false,
      simpleTags: [],
      entityTags: [],
      onSearchTag: null,
      levelActions: props.levelActions,
      levelSelectors: props.levelSelectors,
    }, '')
  })
  it('should render correctly with data, fetching entity tags', () => {
    const fetchedCount = {
      tags: 0,
    }
    const props = {
      entity: {
        content: {
          ipId: 'urn:test',
          label: 'kikou',
          entityType: CatalogEntityTypes.COLLECTION,
          tags: ['simpleTag1', 'simpleTag2', 'URN:entityTag1', 'URN:entityTag2'],
        },
      },
      onSearchTag: null,
      levelActions: new DescriptionLevelActions('test'),
      levelSelectors: getDescriptionLevelSelectors('test'),
      dispatchGetEntity: () => { fetchedCount.tags += 1 },
    }
    shallow(<TagsContainer {...props} />, { context })
    assert.isAbove(fetchedCount.tags, 0, 'Entity tags fetching should have started')
  })
})
