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
import { AccessDomain } from '@regardsoss/domain'
import { HateOASLink } from '../rs-common/HateOASLink'

/**
 * Session Entity definition
 * @author Picart Kévin
 */
export const Session = PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    creationDate: PropTypes.string.isRequired,
    lastUpdateDate: PropTypes.string.isRequired,
    state: PropTypes.oneOf(AccessDomain.SESSION_STATUS).isRequired,
    lifeCycle: PropTypes.shape({
      dataprovider: PropTypes.shape({
        state: PropTypes.string,
        complete: PropTypes.number,
        incomplete: PropTypes.number,
        invalid: PropTypes.number,
        ingested: PropTypes.number,
        generated: PropTypes.number,
        files_acquired: PropTypes.number,
        generation_error: PropTypes.number,
      }),
      oais: PropTypes.shape({
        products: PropTypes.number,
        products_stored: PropTypes.number,
        products_store_pending: PropTypes.number,
        products_store_error: PropTypes.number,
        products_meta_stored: PropTypes.number,
        products_meta_store_pending: PropTypes.number,
        products_gen_pending: PropTypes.number,
        products_gen_error: PropTypes.number,
        products_meta_store_error: PropTypes.number,
      }),
      catalog: PropTypes.shape({
        indexed: PropTypes.number,
        indexedError: PropTypes.number,
      }),
    }),
  }).isRequired,
  links: PropTypes.arrayOf(HateOASLink).isRequired,
})

export const SessionList = PropTypes.objectOf(Session)

export const SessionArray = PropTypes.arrayOf(Session)
