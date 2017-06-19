/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import DescriptionLevelActions from '../../../../../src/model/description/DescriptionLevelActions'
import getDescriptionLevelSelectors from '../../../../../src/model/description/DescriptionLevelSelectors'
import TagsComponent from '../../../../../src/components/description/properties/tags/TagsComponent'
import SimpleTagContainer from '../../../../../src/containers/description/properties/tags/SimpleTagContainer'
import EntityTagContainer from '../../../../../src/containers/description/properties/tags/EntityTagContainer'
import LoadingDisplayerComponent from '../../../../../src/components/description/LoadingDisplayerComponent'
import styles from '../../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Entities Common] Testing TagsComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(TagsComponent)
  })
  it('should render correctly tags no data', () => {
    const props = {
      loading: false,
      simpleTags: [],
      entityTags: [],
      levelActions: new DescriptionLevelActions('test'),
      levelSelectors: getDescriptionLevelSelectors([]),
    }
    const enzymeWrapper = shallow(<TagsComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.findWhere(n => n.props().id === 'entities.common.properties.no.tag'), 1, 'There should be a tag no data message')
  })
  it('should render correctly loading', () => {
    const props = {
      loading: true,
      simpleTags: [],
      entityTags: [],
      levelActions: new DescriptionLevelActions('test'),
      levelSelectors: getDescriptionLevelSelectors([]),
    }
    const enzymeWrapper = shallow(<TagsComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(LoadingDisplayerComponent), 1, 'There should be a loading displayer')
  })
  it('should render correctly tags list', () => {
    const props = {
      loading: false,
      simpleTags: ['sTag1', 'sTag2'],
      entityTags: [{
        content: {
          ipId: 'URN:helloooooooooooooo Nanny!',
          model: {
            id: 1,
          },
          label: 'Hello, dear nanny',
          tags: [],
          entityType: 'COLLECTION',
        },
      }],
      levelActions: new DescriptionLevelActions('test'),
      levelSelectors: getDescriptionLevelSelectors([]),
    }
    const enzymeWrapper = shallow(<TagsComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(SimpleTagContainer), 2, 'There should be two tag container to render simple tags')
    assert.lengthOf(enzymeWrapper.find(EntityTagContainer), 1, 'There should be an entity tag container to render entity tag')
  })
})
