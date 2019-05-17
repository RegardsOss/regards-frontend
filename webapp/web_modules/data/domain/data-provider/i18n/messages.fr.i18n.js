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
const catDataProvider = ' Acquisition - '
const messages = {
  'sip.state.NOT_SCHEDULED': `${catDataProvider}Produit en cours`,
  'sip.state.SCHEDULED': `${catDataProvider}Génération SIP planifiée`,
  'sip.state.NOT_SCHEDULED_INVALID': `${catDataProvider}Produit invalide`,
  'sip.state.GENERATION_ERROR': `${catDataProvider}Erreur de génération du SIP`,
  'sip.state.SCHEDULED_INTERRUPTED': `${catDataProvider}Génération SIP interrompue`,
  'sip.state.SUBMITTED': `${catDataProvider}SIP soumis`,
}

export default messages