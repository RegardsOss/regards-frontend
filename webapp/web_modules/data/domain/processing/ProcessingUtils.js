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
import cloneDeep from 'lodash/cloneDeep'
import find from 'lodash/find'
import map from 'lodash/map'
import reduce from 'lodash/reduce'
import get from 'lodash/get'

function getProcessingName(processing) {
  return get(processing, 'content.pluginConfiguration.label', 'unknown')
}

function isDatasetProcessingExist(dataset) {
  return !!get(dataset, 'processDatasetDescription', null)
}

function isOrderProcessingExist(order) {
  return find(order.content.datasetTasks, (datasetTask) => isDatasetProcessingExist(datasetTask))
}

function getProcessingParametersFullName(processing, metaData, dataset) {
  const parameters = get(processing, 'content.pluginConfiguration.parameters', null)
  if (parameters) {
    return map(parameters, (parameter) => {
      const currentParameter = cloneDeep(parameter)
      let { name } = currentParameter
      if (parameter.dynamic) { // parameter is set by user
        const dynamicParameterFound = find(dataset.processDatasetDescription.parameters, (dynamicParameter, dynamicParameterKey) => dynamicParameterKey === parameter.name)
        if (dynamicParameterFound) {
          currentParameter.value = dynamicParameterFound
        }
      } else if (metaData) { // parameter is set by metadata
        const metaDataParameterFound = find(metaData.content.parameters, (metaDataParameter) => metaDataParameter.name === parameter.name)
        if (metaDataParameterFound) {
          name = metaDataParameterFound.label
        }
      }
      return {
        ...currentParameter,
        name,
      }
    })
  }
  return null
}

function getDatasetProcessing(dataset, processingList, pluginMetaDataList) {
  if (isDatasetProcessingExist(dataset)) {
    const datasetProcessingId = get(dataset, 'processDatasetDescription.processBusinessId', null)
    if (datasetProcessingId) {
      const processingFound = find(processingList, (processing) => processing.content.pluginConfiguration.businessId === datasetProcessingId)
      if (processingFound) {
        const pluginMetaDataFound = find(pluginMetaDataList, (pluginMetaData) => pluginMetaData.content.pluginId === processingFound.content.pluginConfiguration.pluginId)
        return {
          datasetId: dataset.id,
          processingBusinessId: get(processingFound, 'content.pluginConfiguration.businessId', 'unknown'),
          datasetLabel: dataset.datasetLabel,
          processingLabel: getProcessingName(processingFound),
          processingParameterList: getProcessingParametersFullName(processingFound, pluginMetaDataFound, dataset),
        }
      }
    }
  }
  return null
}

function getOrderProcessings(order, processingList, pluginMetaDataList) {
  return {
    orderLabel: order.content.label,
    orderProcessingList: reduce(order.content.datasetTasks, (acc, dataset) => {
      if (isDatasetProcessingExist(dataset)) {
        const datasetProcessingInfos = getDatasetProcessing(dataset, processingList, pluginMetaDataList)
        if (datasetProcessingInfos) {
          acc.push(datasetProcessingInfos)
        }
      }
      return acc
    }, []),
  }
}

export default {
  getProcessingName,
  isOrderProcessingExist,
  isDatasetProcessingExist,
  getOrderProcessings,
  getDatasetProcessing,
}
