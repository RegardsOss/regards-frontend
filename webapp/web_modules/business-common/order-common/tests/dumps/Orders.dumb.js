/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

/** Some orders dumps (as saved in store)  */
export const SOME_ORDERS = {
  content: {
    0: {
      content: {
        id: 0,
        label: 'hello command 1',
        owner: 'hello@hello.com',
        creationDate: '2017-10-08T15:59:57.664Z',
        expirationDate: '2018-02-08T18:00:00.664Z',
        percentCompleted: 100,
        filesInErrorCount: 0,
        waitingForUser: false,
        status: 'DONE',
        statusDate: '2017-09-08T12:02:33.664Z',
        availableFilesCount: 655,
        datasetTasks: [
          {
            id: 0,
            datasetLabel: 'd1',
            objectsCount: 25,
            filesCount: 33,
            filesSize: 5556123,
            processDatasetDescription: {
              processBusinessId: 'testProcess1',
              parameters: {
                0: {
                  name: 'paramTest1',
                  value: 'paramValue1',
                },
                1: {
                  name: 'paramTest2',
                  value: 'paramValue2',
                },
              },
            },
          },
          {
            id: 1,
            datasetLabel: 'd2',
            objectsCount: 12,
            filesCount: 250,
            filesSize: 321,
          },
        ],
      },
      links: [
        {
          rel: 'delete',
          url: 'http://delete',
        }, {
          rel: 'remove',
        },
      ],
    },
    1: {
      content: {
        id: 1,
        label: 'hello command 2',
        owner: 'hello@hello.com',
        creationDate: '2017-10-10T15:59:57.664Z',
        expirationDate: '2018-02-10T18:00:00.664Z',
        percentCompleted: 56,
        filesInErrorCount: 2,
        waitingForUser: false,
        status: 'RUNNING',
        statusDate: '2017-09-08T12:02:33.664Z',
        availableFilesCount: 12,
        datasetTasks: [
          {
            id: 2,
            datasetLabel: 'd3',
            objectsCount: 25,
            filesCount: 33,
            filesSize: 4550,
            processDatasetDescription: {
              processBusinessId: 'testProcess3',
              parameters: {},
            },
          },
        ],
      },
      links: [],
    },
    2: {
      content: {
        id: 1,
        label: 'hello command 3',
        owner: 'hello@hello.com',
        creationDate: '2017-10-10T15:59:57.664Z',
        expirationDate: '2018-02-10T18:00:00.664Z',
        percentCompleted: 56,
        filesInErrorCount: 3,
        waitingForUser: false,
        status: 'RUNNING',
        statusDate: '2017-09-08T12:02:33.664Z',
        availableFilesCount: 12,
        datasetTasks: [
          {
            id: 2,
            datasetLabel: 'd3',
            objectsCount: 25,
            filesCount: 33,
            filesSize: 4550,
            fileSelectionDescription: {
              fileNamePattern: '.*Ain*',
            },
          },
        ],
      },
      links: [],
    },
  },
}
