/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
const catIngest = 'Ingest - '
const catStorage = 'Storage - '
const messages = {
  // -- INGEST
  'sip.state.CREATED': `${catIngest}SIP accepted`,
  'sip.state.REJECTED': `${catIngest}SIP rejected`,
  'sip.state.QUEUED': `${catIngest}SIP ingest scheduled`,
  'sip.state.VALID': `${catIngest}Valid SIP`,
  'sip.state.INVALID': `${catIngest}Invalid SIP`,
  'sip.state.AIP_GEN_ERROR': `${catIngest}AIP generation error`,
  'sip.state.AIP_CREATED': `${catIngest}AIP generated`,
  'sip.state.AIP_SUBMITTED': `${catIngest}AIP submitted`,
  // -- STORAGE & CATALOG
  'sip.state.STORED': `${catStorage}Stored`,
  'sip.state.STORE_ERROR': `${catStorage}Storage error`,
  'sip.state.INCOMPLETE': `${catStorage}Incomplete`,
  'sip.state.TO_BE_DELETED': `${catStorage}To be deleted`,
  'sip.state.DELETED': `${catStorage}Deleted`,
  'sip.state.INDEXED': 'Indexed',
  'sip.state.INDEX_ERROR': 'Indexing error',
}

export default messages
