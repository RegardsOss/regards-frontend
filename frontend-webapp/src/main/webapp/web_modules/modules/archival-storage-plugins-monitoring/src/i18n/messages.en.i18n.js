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
 */
import { storage } from '@regardsoss/units'

/**
 * English local messages for module. Note: we also merge the storage unit messages to
 * internationalize 'expicitely' units in charts
 * @author Raphaël Mechali
 */
const messages = {
  ...storage.messages.en,
  // module messages
  'archival.storage.capacity.monitoring.title': 'Storage capacity',
  'archival.storage.capacity.monitoring.units.scale.bits': 'Bits',
  'archival.storage.capacity.monitoring.units.scale.bits.si.prefix': 'Bits with binary prefix',
  'archival.storage.capacity.monitoring.units.scale.bytes': 'Bytes',
  'archival.storage.capacity.monitoring.units.scale.bytes.si.prefix': 'Bytes with binary prefix',
  // table
  'archival.storage.capacity.monitoring.table.total.size': 'Total space',
  'archival.storage.capacity.monitoring.table.used.size': 'Used space',
  'archival.storage.capacity.monitoring.table.unused.size': 'Free space',
  // chart
  'archival.storage.capacity.monitoring.chart.total.size': 'Total space in {unitLabel}',
  'archival.storage.capacity.monitoring.chart.used.size': 'Used space (%)',
  'archival.storage.capacity.monitoring.chart.unused.size': 'Unused space (%)',
  'archival.storage.capacity.monitoring.chart.unknown.size': 'No size information',
}

export default messages
