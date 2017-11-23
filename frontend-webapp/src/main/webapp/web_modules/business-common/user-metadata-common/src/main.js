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
import metadataV1 from './definitions/metadatav1'
import { MetadataList } from './model/Metadata'
import MetadataField from './components/MetadataField'
import messagesFR from './i18n/messages.fr.i18n'
import messagesEN from './i18n/messages.en.i18n'

module.exports = {
  Locales: {
    fr: messagesFR,
    en: messagesEN,
  },
  MetadataList,
  MetadataField,
  ...metadataV1,
}
