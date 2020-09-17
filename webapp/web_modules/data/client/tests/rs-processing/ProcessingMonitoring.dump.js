/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
export default {
    metadata: {
      size: 2000,
      totalElements: 2,
      totalPages: 1,
      number: 0,
    },
    content: [{
        content: {
            id: "199eee4a-3586-4de1-91a4-01df5dde3430",
            batchId: "03f31e60-29ef-49fb-92b2-83710144b0e7",
            expectedDuration: {
                seconds: 300,
                nanos: 0
            },
            inputFiles: [
                {
                parameterName: "param1",
                localRelativePath: "file.raw",
                url: "http://0.0.0.0:1000/file.raw",
                bytes: 512,
                checksum: "checksum",
                internal: false
                }
            ],
            steps: [
                {
                status: "REGISTERED",
                time: "2020-08-20T09:07:42.551Z",
                message: ""
                },
                {
                status: "PREPARE",
                time: "2020-08-20T09:12:42.69Z",
                message: ""
                },
                {
                status: "RUNNING",
                time: "2020-08-20T09:13:42.551Z",
                message: ""
                }
            ],
            tenant: "tenant",
            userName: "user@regards.fr",
            processName: "nameOfTheProcess",
            created: "2020-08-20T09:07:42.551Z",
            lastUpdated: "2020-08-20T09:13:42.551Z",
            version: 3,
            persisted: true
        },
      links: [],
    }, {
        content: {
            id: "199eee4a-3586-4de1-91a4-01df5dde3431",
            batchId: "03f31e60-29ef-49fb-92b2-83710144b0e7",
            expectedDuration: {
                seconds: 300,
                nanos: 0
            },
            inputFiles: [
                {
                parameterName: "param1",
                localRelativePath: "file.raw",
                url: "http://0.0.0.0:1000/file.raw",
                bytes: 512,
                checksum: "checksum",
                internal: false
                }
            ],
            steps: [
                {
                status: "REGISTERED",
                time: "2020-08-20T09:07:42.551Z",
                message: ""
                },
                {
                status: "PREPARE",
                time: "2020-08-20T09:12:42.69Z",
                message: ""
                },
                {
                status: "RUNNING",
                time: "2020-08-20T09:13:42.551Z",
                message: ""
                },
                {
                  status: "SUCCESS",
                  time: "2020-08-20T09:13:48.551Z",
                  message: ""
                }
            ],
            tenant: "tenant",
            userName: "user2@regards.fr",
            processName: "nameOfTheProcess2",
            created: "2020-08-20T09:07:42.551Z",
            lastUpdated: "2020-08-20T09:13:42.551Z",
            version: 3,
            persisted: true
        },
      links: [],
    links: [],
  }]}