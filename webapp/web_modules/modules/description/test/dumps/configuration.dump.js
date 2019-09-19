/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { DamDomain, UIDomain } from '@regardsoss/domain'

/**
 * Some configuration dumps
 * @author Raphaël Mechali
 */

export const someGroups = [{ // Group 1
  showTitle: true,
  title: {
    en: 'EN',
    fr: 'FR',
  },
  elements: [{
    label: { en: 'attr1.en', fr: 'attr1.fr' }, attributes: [{ name: 'test.attr1' }],
  }],
}, {
  showTitle: false,
  title: {
    en: '',
    fr: '',
  },
  elements: [{ // Group 2
    label: { en: 'attr2And3.en', fr: 'attr2And3.fr' }, attributes: [{ name: 'test.attr2' }, { name: 'test.attr3' }],
  }, { // standard attribute label
    label: { en: 'Standard label', fr: 'Libellé standard' }, attributes: [{ name: 'label' }],
  }],
}]

/** A full module configuration */
export const fullModuleConf = {
  allowSearching: true,
  [DamDomain.ENTITY_TYPES_ENUM.COLLECTION]: {
    showDescription: false,
    showTags: false,
    showCoupling: false,
    showLinkedDocuments: false,
    showLinkedEntities: false,
    showThumbnail: false,
    groups: [],
  },
  [DamDomain.ENTITY_TYPES_ENUM.DATASET]: {
    showDescription: false,
    showTags: false,
    showCoupling: false,
    showLinkedDocuments: false,
    showLinkedEntities: false,
    showThumbnail: false,
    groups: [],
  },
  [UIDomain.PSEUDO_TYPES_ENUM.DOCUMENT]: {
    showDescription: false,
    showTags: false,
    showCoupling: false,
    showLinkedDocuments: false,
    showLinkedEntities: false,
    showThumbnail: false,
    groups: [],
  },
  [DamDomain.ENTITY_TYPES_ENUM.DATA]: {
    showDescription: true,
    showTags: false,
    showCoupling: false,
    showLinkedDocuments: false,
    showLinkedEntities: false,
    showThumbnail: true,
    groups: someGroups,
  },
}
