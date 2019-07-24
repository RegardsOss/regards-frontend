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
const catIngest = 'Ingestion - '
const catStorage = 'Stockage - '
const messages = {
  // -- INGEST
  'sip.state.CREATED': `${catIngest}SIP accepté`,
  'sip.state.REJECTED': `${catIngest}SIP refusé`,
  'sip.state.QUEUED': `${catIngest}Ingestion du SIP planifiée`,
  'sip.state.VALID': `${catIngest}SIP valide`,
  'sip.state.INVALID': `${catIngest}SIP invalide`,
  'sip.state.AIP_GEN_ERROR': `${catIngest}Erreur génération AIP`,
  'sip.state.AIP_CREATED': `${catIngest}AIP généré`,
  'sip.state.AIP_SUBMITTED': `${catIngest}AIP soumis`,
  // -- STORAGE & CATALOG
  'sip.state.STORED': `${catStorage}Stocké`,
  'sip.state.STORE_ERROR': `${catStorage}Erreur de stockage`,
  'sip.state.INCOMPLETE': `${catStorage}Incomplet`,
  'sip.state.TO_BE_DELETED': `${catStorage}À supprimer`,
  'sip.state.DELETED': `${catStorage}Supprimé`,
  'sip.state.INDEXED': 'Indexé',
  'sip.state.INDEX_ERROR': 'Erreur indexation',
}

export default messages
