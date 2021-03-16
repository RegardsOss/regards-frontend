/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ContentDisplayComponent from '../../../../src/components/user/content/ContentDisplayComponent'
import ParametersSectionComponent from '../../../../src/components/user/content/parameters/ParametersSectionComponent'
import TagsSectionPageComponent from '../../../../src/components/user/content/list/tag/TagsSectionPageComponent'
import EntitiesSectionPageComponent from '../../../../src/components/user/content/list/entity/EntitiesSectionPageComponent'
import FilesSectionPageComponent from '../../../../src/components/user/content/list/file/FilesSectionPageComponent'
import QuicklookViewComponent from '../../../../src/components/user/content/quicklook/QuicklookViewComponent'
import VersionSectionPageComponent from '../../../../src/components/user/content/list/version/VersionSectionPageComponent'
import styles from '../../../../src/styles'
import { resolvedDataEntity, resolvedDatasetEntity } from '../../../dumps/resolved.dump'

const context = buildTestContext(styles)

/**
 * Test ContentDisplayComponent
 * @author Raphaël Mechali
 * @author Théo Lasserre
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
        entityWithTreeEntry: resolvedDataEntity.entityWithTreeEntry,
        loading: true,
        modelRetrievalFailed: false,
        invalid: false,
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
      scrollAreaHeight: 760,
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
        entityWithTreeEntry: resolvedDataEntity.entityWithTreeEntry,
        loading: false,
        modelRetrievalFailed: false,
        invalid: true,
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
      scrollAreaHeight: 760,
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
        entityWithTreeEntry: resolvedDataEntity.entityWithTreeEntry,
        loading: false,
        modelRetrievalFailed: true,
        invalid: false,
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
      scrollAreaHeight: 760,
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
  const scrollAreaHeight = 760
  const testCases = [{
    label: 'parameters',
    descriptionEntity: {
      ...resolvedDataEntity,
      entityWithTreeEntry: {
        ...resolvedDataEntity.entityWithTreeEntry,
        selectedTreeEntry: {
          section: UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.PARAMETERS,
        },
      },
    },
    ExpectedComponent: ParametersSectionComponent,
    expectedProperties: {
      thumbnail: resolvedDataEntity.displayModel.thumbnail,
      attributesGroups: resolvedDataEntity.displayModel.attributesGroups,
      scrollAreaHeight,
    },
  }, {
    label: 'quicklooks',
    descriptionEntity: {
      ...resolvedDataEntity,
      entityWithTreeEntry: {
        ...resolvedDataEntity.entityWithTreeEntry,
        selectedTreeEntry: {
          section: UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.QUICKLOOKS,
        },
      },
    },
    ExpectedComponent: QuicklookViewComponent,
    expectedProperties: {
      quicklookFiles: resolvedDataEntity.displayModel.quicklookFiles,
      scrollAreaHeight,
    },
  }, {
    label: 'simple tags',
    descriptionEntity: {
      ...resolvedDataEntity,
      entityWithTreeEntry: {
        ...resolvedDataEntity.entityWithTreeEntry,
        selectedTreeEntry: {
          section: UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.SIMPLE_TAGS,
        },
      },
    },
    ExpectedComponent: TagsSectionPageComponent,
    expectedProperties: {
      tags: resolvedDataEntity.displayModel.wordTags,
      allowSearching: true,
      onSearchWord,
      scrollAreaHeight,
    },
  }, {
    label: 'coupling tags',
    descriptionEntity: {
      ...resolvedDataEntity,
      entityWithTreeEntry: {
        ...resolvedDataEntity.entityWithTreeEntry,
        selectedTreeEntry: {
          section: UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.COUPLED_TAGS,
        },
      },
    },
    ExpectedComponent: TagsSectionPageComponent,
    expectedProperties: {
      tags: resolvedDataEntity.displayModel.couplingTags,
      allowSearching: true,
      onSearchWord,
      scrollAreaHeight,
    },
  }, {
    label: 'linked entities',
    descriptionEntity: {
      ...resolvedDatasetEntity,
      entityWithTreeEntry: {
        ...resolvedDatasetEntity.entityWithTreeEntry,
        selectedTreeEntry: {
          section: UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.LINKED_ENTITIES,
        },
      },
    },
    ExpectedComponent: EntitiesSectionPageComponent,
    expectedProperties: {
      entities: resolvedDatasetEntity.displayModel.linkedEntities,
      isDescriptionAllowed,
      allowSearching: true,
      onSearchEntity,
      onSelectEntityLink,
      scrollAreaHeight,
    },
  }, {
    label: 'linked documents',
    descriptionEntity: {
      ...resolvedDatasetEntity,
      entityWithTreeEntry: {
        ...resolvedDatasetEntity.entityWithTreeEntry,
        selectedTreeEntry: {
          section: UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.LINKED_DOCUMENTS,
        },
      },
    },
    ExpectedComponent: EntitiesSectionPageComponent,
    expectedProperties: {
      entities: resolvedDatasetEntity.displayModel.linkedDocuments,
      isDescriptionAllowed,
      allowSearching: true,
      onSearchEntity,
      onSelectEntityLink,
      scrollAreaHeight,
    },
  }, {
    label: 'information files list',
    descriptionEntity: {
      ...resolvedDatasetEntity,
      entityWithTreeEntry: {
        ...resolvedDatasetEntity.entityWithTreeEntry,
        selectedTreeEntry: {
          section: UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.INFORMATION,
        },
      },
    },
    ExpectedComponent: FilesSectionPageComponent,
    expectedProperties: {
      section: UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.INFORMATION,
      files: resolvedDatasetEntity.displayModel.descriptionFiles,
      onSelectInnerLink,
      scrollAreaHeight,
    },
  }, {
    label: 'an information file content',
    descriptionEntity: {
      ...resolvedDatasetEntity,
      entityWithTreeEntry: {
        ...resolvedDatasetEntity.entityWithTreeEntry,
        selectedTreeEntry: {
          section: UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.INFORMATION,
          child: 1,
        },
      },
    },
    ExpectedComponent: URIContentDisplayer,
    expectedProperties: {
      uri: resolvedDatasetEntity.displayModel.descriptionFiles[1].uri,
    },
  }, {
    label: 'other files list',
    descriptionEntity: {
      ...resolvedDataEntity,
      entityWithTreeEntry: {
        ...resolvedDataEntity.entityWithTreeEntry,
        selectedTreeEntry: {
          section: UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.FILES,
        },
      },
    },
    ExpectedComponent: FilesSectionPageComponent,
    expectedProperties: {
      section: UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.FILES,
      files: resolvedDataEntity.displayModel.otherFiles,
      onSelectInnerLink,
      scrollAreaHeight,
    },
  }, {
    label: 'an other file content',
    descriptionEntity: {
      ...resolvedDataEntity,
      entityWithTreeEntry: {
        ...resolvedDataEntity.entityWithTreeEntry,
        selectedTreeEntry: {
          section: UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.FILES,
          child: 0,
        },
      },
    },
    ExpectedComponent: URIContentDisplayer,
    expectedProperties: {
      uri: resolvedDataEntity.displayModel.otherFiles[0].uri,
    },
  }, {
    label: 'ovther versions list',
    descriptionEntity: {
      ...resolvedDataEntity,
      entityWithTreeEntry: {
        ...resolvedDataEntity.entityWithTreeEntry,
        selectedTreeEntry: {
          section: UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.OTHER_VERSIONS,
        },
      },
    },
    ExpectedComponent: VersionSectionPageComponent,
    expectedProperties: {
      entities: resolvedDataEntity.displayModel.otherVersions,
      onSelectEntityLink,
      scrollAreaHeight,
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
      scrollAreaHeight,
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
