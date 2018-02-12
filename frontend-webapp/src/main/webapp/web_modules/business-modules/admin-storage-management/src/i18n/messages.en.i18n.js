/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { Locales } from '@regardsoss/form-utils'
/**
 * @author Sébastien Binda
 */
const messages = Object.assign({
  'storage.locations.configuration.title': 'Configure data storage locations',
  'storage.locations.configuration.subtitle': 'This section allows you to configure storage locations',
  'storage.allocations.configuration.title': 'Configure data storage allocation stategy',
  'storage.allocations.configuration.subtitle': 'This section allows you to configure the system strategies to define which configured storage location use.',
  'storage.security.configuration.title': 'Configure data security',
  'storage.security.configuration.subtitle': 'This section allows you to configure the system security',
  'storage.security.no.plugin.title': 'Aucun plugin de sécurité n\'est défini',
  'storage.security.no.plugin.subtitle': 'L\'ingestion ne peut pas fonctionner tant qu\'aucun plugin de sécurité n\'aura été défini',
  'storage.security.plugin.defined.title': 'Le plugin de sécurité est bien configuré',
  'storage.security.plugin.defined.subtitle': 'L\'ingestion peut fonctionner',
  'storage.security.too.many.plugin.title': 'Plusieurs plugin de sécurité sont configurés',
  'storage.security.too.many.plugin.subtitle': 'Le système ne va pas indexer de données tant qu\'il y aura plusieurs plugins actifs',
  'storage.plugin.list.configurations': 'List configurations',
  'storage.plugin.configuration.list.add': 'Add new configuration',
  'storage.back.button': 'Back',
}, Locales.en)

export default messages
