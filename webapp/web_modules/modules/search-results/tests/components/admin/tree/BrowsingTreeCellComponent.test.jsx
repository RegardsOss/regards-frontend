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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DamDomain } from '@regardsoss/domain'
import BrowsingTreeCellComponent from '../../../../src/components/admin/tree/BrowsingTreeCellComponent'
import styles from '../../../../src/styles'
import { FORM_SECTIONS_ENUM } from '../../../../src/domain/form/FormSectionsEnum'
import { FORM_PAGES_ENUM } from '../../../../src/domain/form/FormPagesEnum'

const context = buildTestContext(styles)

/**
 * Test BrowsingTreeCellComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing BrowsingTreeCellComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(BrowsingTreeCellComponent)
  })

  // Set some sections and pages to ensure render is ok (nota it is independent of the business)
  const testCases = [{
    section: {
      type: FORM_SECTIONS_ENUM.MAIN,
      pages: [], // unused by the cell
    },
    page: {
      type: FORM_PAGES_ENUM.MAIN,
      selected: true,
    },
    level: 0,
  }, {
    section: {
      type: DamDomain.ENTITY_TYPES_ENUM.DATA,
      pages: [],
    },
    page: {
      type: FORM_PAGES_ENUM.MAP,
      selected: true,
    },
    level: 1,
  }, {
    section: {
      type: DamDomain.ENTITY_TYPES_ENUM.DATASET,
      pages: [],
    },
    page: {
      type: FORM_PAGES_ENUM.MAIN,
      selected: true,
    },
    level: 0,
  }, {
    section: {
      type: DamDomain.ENTITY_TYPES_ENUM.DATA,
      pages: [],
    },
    page: {
      type: FORM_PAGES_ENUM.QUICKLOOKS,
      selected: true,
    },
    level: 1,
  }]

  testCases.forEach(({ section, page, level }) => it(`should render correctly for ${section.type}/${page.type}(${level})`, () => {
    const props = {
      section,
      page,
      level,
    }
    shallow(<BrowsingTreeCellComponent {...props} />, { context })
  }))
})
