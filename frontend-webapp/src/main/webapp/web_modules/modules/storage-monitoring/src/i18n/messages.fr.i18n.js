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
 * French local messages for module. Note: we also merge the storage unit messages to
 * internationalize 'expicitely' units in charts
 * @author Raphaël Mechali
 */
const messages = {
  // module messages
  'archival.storage.capacity.monitoring.title': 'Capacité des plugins de stockages',
  // chart
  'archival.storage.capacity.monitoring.size.without.percent': '{label}: {capacity}',
  'archival.storage.capacity.monitoring.size.with.percent': '{label}: {capacity} - {percentLabel}%',
  'archival.storage.capacity.monitoring.chart.total.label': 'Total',
  'archival.storage.capacity.monitoring.chart.used.label': 'Utilisé',
  'archival.storage.capacity.monitoring.chart.free.label': 'Libre',
}

export default messages
