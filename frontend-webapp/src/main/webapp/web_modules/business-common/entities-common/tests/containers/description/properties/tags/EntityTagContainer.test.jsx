/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ENTITY_TYPES_ENUM } from '@regardsoss/domain/dam'
import { EntityTagContainer } from '../../../../../src/containers/description/properties/tags/EntityTagContainer'
import TagComponent from '../../../../../src/components/description/properties/tags/TagComponent'
import DescriptionLevelActions from '../../../../../src/model/description/DescriptionLevelActions'
import getDescriptionLevelSelectors from '../../../../../src/model/description/DescriptionLevelSelectors'
import styles from '../../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Entities Common] Testing EntityTagContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(EntityTagContainer)
  })
  it('should render correctly with data', () => {
    const onSearchTag = () => { }
    const dispatchShowDetail = () => { }
    const props = {
      entity: {
        content: {
          ipId: 'urn:test',
          label: 'test',
          entityType: ENTITY_TYPES_ENUM.DATASET,
          tags: [],
        },
      },
      onSearchTag,
      levelActions: new DescriptionLevelActions('test'),
      levelSelectors: getDescriptionLevelSelectors(['test']),
      descriptionPath: [],
      dispatchShowDetail,
    }
    const enzymeWrapper = shallow(<EntityTagContainer {...props} />, { context })
    const compWrapper = enzymeWrapper.find(TagComponent)
    assert.lengthOf(compWrapper, 1, 'there should a tag component')

    testSuiteHelpers.assertWrapperProperties(compWrapper, {
      tagLabel: props.entity.content.label,
      onSearchTag: enzymeWrapper.instance().onSearchTag,
      onShowDescription: dispatchShowDetail,
      isEntity: true,
    }, 'It should report required properties for subcontainer to work')
  })
  it('should avoid cyclic path of entities', () => {
    const onSearchTag = () => { }
    const dispatchShowDetail = () => { }
    const entity = {
      content: {
        ipId: 'urn:test',
        label: 'test',
        entityType: ENTITY_TYPES_ENUM.DATASET,
        tags: [],
      },
    }
    const props = {
      entity,
      onSearchTag,
      levelActions: new DescriptionLevelActions('test'),
      levelSelectors: getDescriptionLevelSelectors(['test']),
      descriptionPath: [entity],
      dispatchShowDetail,
    }
    const enzymeWrapper = shallow(<EntityTagContainer {...props} />, { context })
    assert.isTrue(enzymeWrapper.instance().state.alreadyInPath, 'The "alreadyInPath" state should be true')
    const compWrapper = enzymeWrapper.find(TagComponent)
    assert.lengthOf(compWrapper, 1, 'there should be tag compoent')
    testSuiteHelpers.assertWrapperProperties(compWrapper, {
      tagLabel: props.entity.content.label,
      onSearchTag: enzymeWrapper.instance().onSearchTag,
      onShowDescription: null, // the callback should not be provided when already shown in path
      isEntity: true,
    }, 'It should report required properties for subcontainer to work')
  })
})
