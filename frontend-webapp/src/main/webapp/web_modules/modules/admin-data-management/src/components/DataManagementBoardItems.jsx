/**
 * LICENSE_PLACEHOLDER
 **/
import ViewLinesIcon from 'material-ui/svg-icons/action/view-headline'
import AddIcon from 'material-ui/svg-icons/content/add-circle'
import { modelDependencies } from '@regardsoss/admin-data-model-management'
import { attributeModelDependencies } from '@regardsoss/admin-data-attributemodel-management'
import { collectionDependencies } from '@regardsoss/admin-data-collection-management'
import { fragmentDependencies } from '@regardsoss/admin-data-fragment-management'
import { connectionDependencies } from '@regardsoss/admin-data-connection-management'
import { EditDependencies as DatasetEditDep, AddDependencies as DatasetAddDep } from '@regardsoss/admin-data-dataset-management/src/dependencies'
import { EditDependencies as DatasourceEditDep, AddDependencies as DatasourceAddDep } from '@regardsoss/admin-data-datasource-management/src/dependencies'


/**
 * BoardItems configuration for Datamanagement module
 * @param projectName
 * @param intl
 */
const items = (projectName, intl) => [
  {
    title: intl.formatMessage({ id: 'data.board.model.title' }),
    description: intl.formatMessage({ id: 'data.board.model.description' }),
    advanced: false,
    actions: [
      {
        path: `/admin/${projectName}/data/model/list`,
        icon: <ViewLinesIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.list.tooltip' }),
        hateoasDependencies: modelDependencies.listDependencies,
      },
      {
        path: `/admin/${projectName}/data/model/create`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.add.tooltip' }),
        hateoasDependencies: modelDependencies.addDependencies,
      },
    ],
  },
  {
    title: intl.formatMessage({ id: 'data.board.attributemodel.title' }),
    description: intl.formatMessage({ id: 'data.board.attributemodel.description' }),
    advanced: false,
    actions: [
      {
        path: `/admin/${projectName}/data/attribute/model/list`,
        icon: <ViewLinesIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.list.tooltip' }),
        hateoasDependencies: attributeModelDependencies.listDependencies,
      },
      {
        path: `/admin/${projectName}/data/attribute/model/create`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.add.tooltip' }),
        hateoasDependencies: attributeModelDependencies.addDependencies,
      },
    ],
  },
  {
    title: intl.formatMessage({ id: 'data.board.collection.title' }),
    description: intl.formatMessage({ id: 'data.board.collection.description' }),
    advanced: false,
    actions: [
      {
        path: `/admin/${projectName}/data/collection/list`,
        icon: <ViewLinesIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.list.tooltip' }),
        hateoasDependencies: collectionDependencies.listDependencies,
      },
      {
        path: `/admin/${projectName}/data/collection/create`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.add.tooltip' }),
        hateoasDependencies: collectionDependencies.addDependencies,
      },
    ],
  },
  {
    title: intl.formatMessage({ id: 'data.board.fragment.title' }),
    description: intl.formatMessage({ id: 'data.board.fragment.description' }),
    advanced: false,
    actions: [
      {
        path: `/admin/${projectName}/data/fragment/list`,
        icon: <ViewLinesIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.list.tooltip' }),
        hateoasDependencies: fragmentDependencies.listDependencies,
      },
      {
        path: `/admin/${projectName}/data/fragment/create`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.add.tooltip' }),
        hateoasDependencies: fragmentDependencies.addDependencies,
      },
    ],
  },
  {
    title: intl.formatMessage({ id: 'data.board.dataset.title' }),
    description: intl.formatMessage({ id: 'data.board.dataset.description' }),
    advanced: false,
    actions: [
      {
        path: `/admin/${projectName}/data/dataset/list`,
        icon: <ViewLinesIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.list.tooltip' }),
        hateoasDependencies: DatasetEditDep,
      },
      {
        path: `/admin/${projectName}/data/dataset/create/datasource`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.add.tooltip' }),
        hateoasDependencies: DatasetAddDep,
      },
    ],
  },
  {
    title: intl.formatMessage({ id: 'data.board.datasource.title' }),
    description: intl.formatMessage({ id: 'data.board.datasource.description' }),
    advanced: true,
    actions: [
      {
        path: `/admin/${projectName}/data/datasource/list`,
        icon: <ViewLinesIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.list.tooltip' }),
        hateoasDependencies: DatasourceEditDep,
      },
      {
        path: `/admin/${projectName}/data/datasource/create/connection`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.add.tooltip' }),
        hateoasDependencies: DatasourceAddDep,
      },
    ],
  },
  {
    title: intl.formatMessage({ id: 'data.board.connection.title' }),
    description: intl.formatMessage({ id: 'data.board.connection.description' }),
    advanced: true,
    actions: [
      {
        path: `/admin/${projectName}/data/connection/list`,
        icon: <ViewLinesIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.list.tooltip' }),
        hateoasDependencies: connectionDependencies.listDependencies,
      },
      {
        path: `/admin/${projectName}/data/connection/create`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.add.tooltip' }),
        hateoasDependencies: connectionDependencies.addDependencies,
      },
    ],
  },
]

export default items
