/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

const messages = {
  'error.message.module.title': 'Configuration errors detected !',
  'error.message.module.subtitle': 'These corrections must be addressed to ensure the proper functioning of REGARDS.',
  'error.message.module.subtitle.one': 'We list here the non-searchable attributes used in the \'search-result\' and \'search-graph\' modules of the project.',
  'error.message.module.subtitle.two': 'Two solutions allow you to solve this configuration problem(s) : either you make the attribute searchable from the attribute editing form, or you remove this attribute from the configuration of the module.',
  'error.message.module.subtitle.three': 'Any modification of the searchable part of an attribute on REGARDS must be followed by a reinitialization of the index so that these changes are taken into account by ElasticSearch.',
  'error.message.module.subtitle.four': 'We also list all configurations that use inside Filters all INTEGER or LONG attributes. You must not use them.',
  'error.message.module.name': 'Module [{value}] has the following errors :',
  'error.message.module.filters': 'Filters tab : using following attributes even though they are not searchable : [{values}]',
  'error.message.module.criteriaGroup.title': 'Search tab :',
  'error.message.module.criteriaGroup': ' - [{value}] group : using following attributes even though they are not searchable or INTEGER/LONG type : [{values}]',
  'error.message.module.button.refresh': 'Update configuration errors',
  'error.message.module.button.close': 'Ignore',

  ...Locales.en,
}

export default messages
