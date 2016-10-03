import { assert } from "chai"
import Schemas from "../../src/schemas/index"
import { normalize } from "normalizr"

describe('[COMMON] Testing schemas', () => {


  it('should handle project users', () => {
    const response: any = [{
      "projectAccountId": 0,
      "status": 0,
      "lastConnection": 1471865343965,
      "lastUpdate": 1471865343965,
      "role": {
        "name": "Guest",
        "parentRole": null,
        "permissions": [],
        "links": [{"rel": "self", "href": "http://localhost:8080/api/project-admin?name=john.constantine.role"}]
      },
      "project": null,
      "account": {
        "accountId": 1,
        "email": "john.constantine@...",
        "firstName": "John",
        "lastName": "Constantine",
        "login": "jconstantine",
        "password": "passw0rd",
        "status": 0,
        "projectAccounts": [],
        "links": []
      },
      "links": [{"rel": "delete", "href": "http://localhost:8080/api/projectAccounts/0"}, {
        "rel": "self",
        "href": "http://localhost:8080/api/projectAccounts/0"
      }]
    }, {
      "projectAccountId": 1,
      "status": 0,
      "lastConnection": 1471865344014,
      "lastUpdate": 1471865344014,
      "role": {"name": "Guest", "parentRole": null, "permissions": [], "links": []},
      "project": null,
      "account": {
        "accountId": 2,
        "email": "fbar@...",
        "firstName": "Foo",
        "lastName": "Bar",
        "login": "fbar",
        "password": "passw0rd",
        "status": 0,
        "projectAccounts": [],
        "links": []
      },
      "links": [{"rel": "self", "href": "http://localhost:8080/api/projectAccounts/1"}, {
        "rel": "delete",
        "href": "http://localhost:8080/api/projectAccounts/1"
      }]
    }, {
      "projectAccountId": 2,
      "status": 0,
      "lastConnection": 1471865344016,
      "lastUpdate": 1471865344016,
      "role": {"name": "Guest", "parentRole": null, "permissions": [], "links": []},
      "project": null,
      "account": {
        "accountId": 3,
        "email": "admin@...",
        "firstName": "Instance",
        "lastName": "admin",
        "login": "admin",
        "password": "passw0rd",
        "status": 0,
        "projectAccounts": [],
        "links": []
      },
      "links": [{"rel": "self", "href": "http://localhost:8080/api/projectAccounts/2"}]
    }]
    const expectedResult: any = {
      "entities": {
        "projectAccounts": {
          "0": {
            "projectAccountId": 0,
            "status": 0,
            "lastConnection": 1471865343965,
            "lastUpdate": 1471865343965,
            "role": "Guest",
            "project": null,
            "account": 1,
            "links": [{"rel": "delete", "href": "http://localhost:8080/api/projectAccounts/0"}, {
              "rel": "self",
              "href": "http://localhost:8080/api/projectAccounts/0"
            }]
          },
          "1": {
            "projectAccountId": 1,
            "status": 0,
            "lastConnection": 1471865344014,
            "lastUpdate": 1471865344014,
            "role": "Guest",
            "project": null,
            "account": 2,
            "links": [{"rel": "self", "href": "http://localhost:8080/api/projectAccounts/1"}, {
              "rel": "delete",
              "href": "http://localhost:8080/api/projectAccounts/1"
            }]
          },
          "2": {
            "projectAccountId": 2,
            "status": 0,
            "lastConnection": 1471865344016,
            "lastUpdate": 1471865344016,
            "role": "Guest",
            "project": null,
            "account": 3,
            "links": [{"rel": "self", "href": "http://localhost:8080/api/projectAccounts/2"}]
          }
        },
        "roles": {
          "Guest": {
            "name": "Guest",
            "parentRole": null,
            "permissions": [],
            "links": [{"rel": "self", "href": "http://localhost:8080/api/project-admin?name=john.constantine.role"}]
          }
        },
        "accounts": {
          "1": {
            "accountId": 1,
            "email": "john.constantine@...",
            "firstName": "John",
            "lastName": "Constantine",
            "login": "jconstantine",
            "password": "passw0rd",
            "status": 0,
            "projectAccounts": [],
            "links": []
          },
          "2": {
            "accountId": 2,
            "email": "fbar@...",
            "firstName": "Foo",
            "lastName": "Bar",
            "login": "fbar",
            "password": "passw0rd",
            "status": 0,
            "projectAccounts": [],
            "links": []
          },
          "3": {
            "accountId": 3,
            "email": "admin@...",
            "firstName": "Instance",
            "lastName": "admin",
            "login": "admin",
            "password": "passw0rd",
            "status": 0,
            "projectAccounts": [],
            "links": []
          }
        }
      }, "result": [0, 1, 2]
    }

    const result = normalize(response, Schemas.PROJECT_ACCOUNT_ARRAY)

    assert.deepEqual(result, expectedResult)
  })
})



