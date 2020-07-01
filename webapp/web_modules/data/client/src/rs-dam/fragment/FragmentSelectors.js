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
import { BasicListSelectors } from '@regardsoss/store-utils'
import pickBy from 'lodash/pickBy'
import { DamDomain } from '@regardsoss/domain'
/**
 * Store selector to access fragment entities.
 *
 * To use this selector, you need to pass a parameter : <storePath>.
 *
 * storePath : Array<String>, exemple :  ['common','enitites'].
 * With this exemple, all projects will be stored in the subpart 'common.entities' of the global
 * application store.
 *
 * @author Léo Mieulet
 */

class FragmentSelectors extends BasicListSelectors {
  getListWithoutNoneFragment(state) {
    return pickBy(this.getList(state), (fragment) => (
      fragment.content.name !== DamDomain.DEFAULT_FRAGMENT
    ))
  }
}
export default (storePath) => new FragmentSelectors(storePath)
