/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { SOME_ORDERS } from './Orders.dumb'
import { SOME_PROCESSING } from './Processing.dump'

export const SOME_ORDER_PROCESSINGS = {
  orderLabel: SOME_ORDERS.content[0].content.label,
  orderProcessingList: [{
    datasetId: 0,
    processingBusinessId: SOME_PROCESSING[0].content.pluginConfiguration.businessId,
    datasetLabel: SOME_ORDERS.content[0].content.datasetTasks[0].datasetLabel,
    processingLabel: SOME_PROCESSING[0].content.pluginConfiguration.label,
    processingParameterList: SOME_PROCESSING[0].content.pluginConfiguration.parameters,
  }],
}
