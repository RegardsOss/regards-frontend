import { assert } from 'chai'
import { UIDomain } from '@regardsoss/domain'
import { CriterionBuilder } from '../../src/definitions/CriterionBuilder'

const staticParamQ = {
  label: 'External data',
  active: true,
  parameters: {
    q: 'model:DATA_MODEL_REGARDS_2044',
  },
  requestParameters: {
    q: 'model:DATA_MODEL_REGARDS_2044',
  },
}
const staticParamQString = 'External data;q=model:DATA_MODEL_REGARDS_2044'

const staticParamImg = {
  label: 'Only pictures',
  active: true,
  parameters: {
    hasImage: 'true',
  },
  requestParameters: {
    hasImage: 'true',
  },
}
const staticParamImgString = 'Only pictures;hasImage=true'

/**
 * Test CriterionBuilder
 * @author Léo Mieulet
 */

describe('[SEARCH RESULTS] Testing CriterionBuilder', () => {
  it('should exists', () => {
    assert.isDefined(CriterionBuilder)
  })

  it('should parse static criterion', () => {
    assert.deepEqual(CriterionBuilder.buildStaticCriterion(''), [], 'empty value means no static param')
    assert.deepEqual(CriterionBuilder.buildStaticCriterion(staticParamQString), [staticParamQ], 'Static param with q')
    assert.deepEqual(CriterionBuilder.buildStaticCriterion(staticParamImgString), [staticParamImg], 'Another static param hasImage')
    assert.deepEqual(CriterionBuilder.buildStaticCriterion(`${staticParamQString},${staticParamImgString}`),
      [staticParamQ, staticParamImg], 'both static params provided together')
  })

  it('should stringify static criterion', () => {
    assert.deepEqual(CriterionBuilder.buildStaticCriterionString([]), '', 'empty object is empty string')
    assert.deepEqual(CriterionBuilder.buildStaticCriterionString([staticParamQ]), staticParamQString, 'Static param with q')
    assert.deepEqual(CriterionBuilder.buildStaticCriterionString([staticParamImg]), staticParamImgString, 'Another static param hasImage')
    assert.deepEqual(CriterionBuilder.buildStaticCriterionString([staticParamQ, staticParamImg]),
      `${staticParamQString},${staticParamImgString}`, 'both static params provided together')
    // active and requestParameters are not important for serialisation
    const validStaticParam = {
      label: 'Only required fields',
      parameters: {
        hasAttribute: 'true',
      },
    }
    const validStaticParamString = 'Only required fields;hasAttribute=true'
    assert.deepEqual(CriterionBuilder.buildStaticCriterionString([validStaticParam]), validStaticParamString, 'Valid static field')
  })

  it('should stringify unactive static properties', () => {
    const resultsContextEmpty = {
      tabs: {
        [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
          criteria: {
            staticParameters: [],
          },
        },
      },
    }
    assert.isNull(CriterionBuilder.buildUnactiveStaticCriterionString(resultsContextEmpty), 'empty static parameters should return empty string')

    const resultsContextOnlyActive = {
      tabs: {
        [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
          criteria: {
            staticParameters: [staticParamImg, staticParamQ],
          },
        },
      },
    }
    assert.isNull(CriterionBuilder.buildUnactiveStaticCriterionString(resultsContextOnlyActive), 'only active static parameters should return empty string')

    const resultsContextOnlyInactive = {
      tabs: {
        [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
          criteria: {
            staticParameters: [{
              ...staticParamImg,
              active: false,
            }, {
              ...staticParamQ,
              active: false,
            }],
          },
        },
      },
    }
    assert.equal(CriterionBuilder.buildUnactiveStaticCriterionString(resultsContextOnlyInactive), '[true,true]', 'should return valid array of booleans')

    const resultsContextMix = {
      tabs: {
        [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
          criteria: {
            staticParameters: [staticParamImg, {
              ...staticParamQ,
              active: false,
            }],
          },
        },
      },
    }
    assert.equal(CriterionBuilder.buildUnactiveStaticCriterionString(resultsContextMix), '[false,true]', 'should return valid array of booleans')
  })
  it('should update staticProperties using URL', () => {
    const resultsContextEmpty = {
      tabs: {
        [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
          criteria: {
            staticParameters: [],
          },
        },
      },
    }
    assert.deepEqual(CriterionBuilder.buildUnactiveStaticCriterion(resultsContextEmpty, '[true,false]'), resultsContextEmpty, 'no change if there is no static properties')

    const resultsContextTest = {
      tabs: {
        [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
          criteria: {
            staticParameters: [staticParamImg, staticParamQ],
          },
        },
      },
    }
    assert.deepEqual(CriterionBuilder.buildUnactiveStaticCriterion(resultsContextTest, '[false,false]'), resultsContextTest, 'all static properties actives')

    const resultsContextAllInactive = {
      tabs: {
        [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
          criteria: {
            staticParameters: [{
              ...staticParamImg,
              requestParameters: {},
              active: false,
            }, {
              ...staticParamQ,
              requestParameters: {},
              active: false,
            }],
          },
        },
      },
    }
    assert.deepEqual(CriterionBuilder.buildUnactiveStaticCriterion(resultsContextTest, '[true,true]'), resultsContextAllInactive, 'all static properties unactives')


    const resultsContextHalfActive = {
      tabs: {
        [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
          criteria: {
            staticParameters: [{
              ...staticParamImg,
              requestParameters: {},
              active: false,
            }, staticParamQ],
          },
        },
      },
    }
    assert.deepEqual(CriterionBuilder.buildUnactiveStaticCriterion(resultsContextTest, '[true,false]'), resultsContextHalfActive, 'no change if there is no static properties')
  })
})
