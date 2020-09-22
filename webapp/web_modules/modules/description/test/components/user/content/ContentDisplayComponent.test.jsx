/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { NoContentComponent, ContentLoadingComponent, URIContentDisplayer } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ContentDisplayComponent from '../../../../src/components/user/content/ContentDisplayComponent'
import ParametersSectionComponent from '../../../../src/components/user/content/parameters/ParametersSectionComponent'
import TagsSectionPageComponent from '../../../../src/components/user/content/list/tag/TagsSectionPageComponent'
import EntitiesSectionPageComponent from '../../../../src/components/user/content/list/entity/EntitiesSectionPageComponent'
import FilesSectionPageComponent from '../../../../src/components/user/content/list/file/FilesSectionPageComponent'
import QuicklookViewComponent from '../../../../src/components/user/content/quicklook/QuicklookViewComponent'
import VersionSectionPageComponent from '../../../../src/components/user/content/list/version/VersionSectionPageComponent'
import VersionLinkComponent from '../../../../src/components/user/content/list/version/VersionLinkComponent'
import styles from '../../../../src/styles'
import { resolvedDataEntity, resolvedDatasetEntity } from '../../../dumps/resolved.dump'
import { BROWSING_SECTIONS_ENUM } from '../../../../src/domain/BrowsingSections'

const context = buildTestContext(styles)

/**
 * Test ContentDisplayComponent
 * @author Raphaël Mechali
 */
describe('[Description] Testing ContentDisplayComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ContentDisplayComponent)
  })
  it('should render correctly loading', () => {
    const props = {
      allowSearching: true,
      descriptionEntity: {
        entity: resolvedDataEntity.entity,
        loading: true,
        modelRetrievalFailed: false,
        invalid: false,
        selectedTreeEntry: {
          section: BROWSING_SECTIONS_ENUM.PARAMETERS,
        },
        displayModel: {
          thumbnail: null,
          attributesGroups: [],
          descriptionFiles: [],
          quicklookFiles: [],
          otherFiles: [],
          wordTags: [],
          couplingTags: [],
          linkedEntities: [],
          linkedDocuments: [],
          otherVersions: [],
        },
      },
      isDescriptionAllowed: () => true,
      onSelectInnerLink: () => {},
      onSelectEntityLink: () => {},
      onSearchWord: () => {},
      onSearchEntity: () => {},
    }
    const enzymeWrapper = shallow(<ContentDisplayComponent {...props} />, { context })
    const loadingComponent = enzymeWrapper.find(ContentLoadingComponent)
    assert.lengthOf(loadingComponent, 1, 'There should be the loading component')
  })
  it('should render correctly invalid', () => {
    const props = {
      allowSearching: true,
      descriptionEntity: {
        entity: resolvedDataEntity.entity,
        loading: false,
        modelRetrievalFailed: false,
        invalid: true,
        selectedTreeEntry: {
          section: BROWSING_SECTIONS_ENUM.PARAMETERS,
        },
        displayModel: {
          thumbnail: null,
          attributesGroups: [],
          descriptionFiles: [],
          quicklookFiles: [],
          otherFiles: [],
          wordTags: [],
          couplingTags: [],
          linkedEntities: [],
          linkedDocuments: [],
          otherVersions: [],
        },
      },
      isDescriptionAllowed: () => true,
      onSelectInnerLink: () => {},
      onSelectEntityLink: () => {},
      onSearchWord: () => {},
      onSearchEntity: () => {},
    }
    const enzymeWrapper = shallow(<ContentDisplayComponent {...props} />, { context })
    const noContentWrapper = enzymeWrapper.find(NoContentComponent)
    assert.lengthOf(noContentWrapper, 1, 'There should')
    testSuiteHelpers.assertWrapperProperties(noContentWrapper, {
      titleKey: 'module.description.invalid.entity.title',
      messageKey: 'module.description.invalid.entity.message',
    }, 'No content properties should be correctly set to show an invalid state')
  })
  it('should render correctly when model retrieval failed', () => {
    const props = {
      allowSearching: true,
      descriptionEntity: {
        entity: resolvedDataEntity.entity,
        loading: false,
        modelRetrievalFailed: true,
        invalid: false,
        selectedTreeEntry: {
          section: BROWSING_SECTIONS_ENUM.PARAMETERS,
        },
        displayModel: {
          thumbnail: null,
          attributesGroups: [],
          descriptionFiles: [],
          quicklookFiles: [],
          otherFiles: [],
          wordTags: [],
          couplingTags: [],
          linkedEntities: [],
          linkedDocuments: [],
          otherVersions: [],
        },
      },
      isDescriptionAllowed: () => true,
      onSelectInnerLink: () => {},
      onSelectEntityLink: () => {},
      onSearchWord: () => {},
      onSearchEntity: () => {},
    }
    const enzymeWrapper = shallow(<ContentDisplayComponent {...props} />, { context })
    const noContentWrapper = enzymeWrapper.find(NoContentComponent)
    assert.lengthOf(noContentWrapper, 1, 'There should')
    testSuiteHelpers.assertWrapperProperties(noContentWrapper, {
      titleKey: 'module.description.model.retrieval.failed.title',
      messageKey: 'module.description.model.retrieval.failed.message',
    }, 'No content properties should be correctly set to show a model retrieval failure state')
  })
  // render each view once and check properties
  const onSearchWord = () => {}
  const isDescriptionAllowed = () => true
  const onSearchEntity = () => {}
  const onSelectEntityLink = () => {}
  const onSelectInnerLink = () => {}
  const testCases = [{
    label: 'parameters',
    selectedTreeEntry: {
      section: BROWSING_SECTIONS_ENUM.PARAMETERS,
    },
    descriptionEntity: resolvedDataEntity,
    ExpectedComponent: ParametersSectionComponent,
    expectedProperties: {
      thumbnail: resolvedDataEntity.displayModel.thumbnail,
      attributesGroups: resolvedDataEntity.displayModel.attributesGroups,
    },
  }, {
    label: 'quicklooks',
    selectedTreeEntry: {
      section: BROWSING_SECTIONS_ENUM.QUICKLOOKS,
    },
    descriptionEntity: resolvedDataEntity,
    ExpectedComponent: QuicklookViewComponent,
    expectedProperties: {
      quicklookFiles: resolvedDataEntity.displayModel.quicklookFiles,
    },
  }, {
    label: 'simple tags',
    selectedTreeEntry: {
      section: BROWSING_SECTIONS_ENUM.SIMPLE_TAGS,
    },
    descriptionEntity: resolvedDataEntity,
    ExpectedComponent: TagsSectionPageComponent,
    expectedProperties: {
      tags: resolvedDataEntity.displayModel.wordTags,
      allowSearching: true,
      onSearchWord,
    },
  }, {
    label: 'coupling tags',
    selectedTreeEntry: {
      section: BROWSING_SECTIONS_ENUM.COUPLED_TAGS,
    },
    descriptionEntity: resolvedDataEntity,
    ExpectedComponent: TagsSectionPageComponent,
    expectedProperties: {
      tags: resolvedDataEntity.displayModel.couplingTags,
      allowSearching: true,
      onSearchWord,
    },
  }, {
    label: 'linked entities',
    selectedTreeEntry: {
      section: BROWSING_SECTIONS_ENUM.LINKED_ENTITIES,
    },
    descriptionEntity: resolvedDatasetEntity,
    ExpectedComponent: EntitiesSectionPageComponent,
    expectedProperties: {
      entities: resolvedDatasetEntity.displayModel.linkedEntities,
      isDescriptionAllowed,
      allowSearching: true,
      onSearchEntity,
      onSelectEntityLink,
    },
  }, {
    label: 'linked documents',
    selectedTreeEntry: {
      section: BROWSING_SECTIONS_ENUM.LINKED_DOCUMENTS,
    },
    descriptionEntity: resolvedDatasetEntity,
    ExpectedComponent: EntitiesSectionPageComponent,
    expectedProperties: {
      entities: resolvedDatasetEntity.displayModel.linkedDocuments,
      isDescriptionAllowed,
      allowSearching: true,
      onSearchEntity,
      onSelectEntityLink,
    },
  }, {
    label: 'information files list',
    selectedTreeEntry: {
      section: BROWSING_SECTIONS_ENUM.INFORMATION,
    },
    descriptionEntity: resolvedDatasetEntity,
    ExpectedComponent: FilesSectionPageComponent,
    expectedProperties: {
      section: BROWSING_SECTIONS_ENUM.INFORMATION,
      files: resolvedDatasetEntity.displayModel.descriptionFiles,
      onSelectInnerLink,
    },
  }, {
    label: 'an information file content',
    selectedTreeEntry: {
      section: BROWSING_SECTIONS_ENUM.INFORMATION,
      child: 1,
    },
    descriptionEntity: resolvedDatasetEntity,
    ExpectedComponent: URIContentDisplayer,
    expectedProperties: {
      uri: resolvedDatasetEntity.displayModel.descriptionFiles[1].uri,
    },
  }, {
    label: 'other files list',
    selectedTreeEntry: {
      section: BROWSING_SECTIONS_ENUM.FILES,
    },
    descriptionEntity: resolvedDataEntity,
    ExpectedComponent: FilesSectionPageComponent,
    expectedProperties: {
      section: BROWSING_SECTIONS_ENUM.FILES,
      files: resolvedDataEntity.displayModel.otherFiles,
      onSelectInnerLink,
    },
  }, {
    label: 'an other file content',
    selectedTreeEntry: {
      section: BROWSING_SECTIONS_ENUM.FILES,
      child: 0,
    },
    descriptionEntity: resolvedDataEntity,
    ExpectedComponent: URIContentDisplayer,
    expectedProperties: {
      uri: resolvedDataEntity.displayModel.otherFiles[0].uri,
    },
  }, {
    label: 'ovther versions list',
    selectedTreeEntry: {
      section: BROWSING_SECTIONS_ENUM.OTHER_VERSIONS,
    },
    descriptionEntity: resolvedDataEntity,
    ExpectedComponent: VersionSectionPageComponent,
    expectedProperties: {
      entities: resolvedDataEntity.displayModel.otherVersions,
      onSelectEntityLink,
    },
  }]
  testCases.forEach(({
    label, selectedTreeEntry, descriptionEntity, ExpectedComponent, expectedProperties,
  }) => it(`should render correctly ${label}`, () => {
    const props = {
      allowSearching: true,
      descriptionEntity: {
        ...descriptionEntity,
        selectedTreeEntry, // override current path in tree
      },
      isDescriptionAllowed,
      onSelectInnerLink,
      onSelectEntityLink,
      onSearchWord,
      onSearchEntity,
    }
    const enzymeWrapper = shallow(<ContentDisplayComponent {...props} />, { context })
    const pageComponentWrapper = enzymeWrapper.find(ExpectedComponent)
    assert.lengthOf(pageComponentWrapper, 1, 'There should be the page render component for section')
    testSuiteHelpers.assertWrapperProperties(pageComponentWrapper, expectedProperties, 'Page component should define the expected properties')
  },
  ))
})
