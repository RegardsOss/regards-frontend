/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Mock service entry point: uses its entry points here or delegates onto json mock server
 */
const _ = require('lodash')
const fs = require('fs')
const FacadeCore = require('./mock-facade-core')
const MockAuthentication = require('./mock-authentication')

const JSON_CONTENT_TYPE = 'application/json; charset=utf-8'

/**
 * Mock server entry point: provide here the delegate for a given URL and method
 * Note1 : delegate signature is:
 * (request, query, pathParameters, bodyParameters) => {content:string (optional), code:int (optional), contentType: string (optional)}
 * Note2 : you can get the parameters in request using query[paramName]. works the same way for body and path parameters
 * Note3 : see 2 examples in GET and POST
 */
const entryDelegates = {
  GET: {
    // EXAMPLE : GET http://localhost:3000/api/v1/test-url ==> 200 and [...]test-url?nok=whatiwant ==> 500
    '/test-url': (request, query) =>
      (query.nok ? { content: 'Everything is NOT OK ', code: 500 } : { content: 'Everything is OK ', code: 200, contentType: 'text/plain' }),
    // project license
    '/rs-admin/projects/{projectName}/license': () =>
      ({
        code: 200,
        contentType: 'text/markdown',
        content: {
          content: fs.readFileSync('./mocks/facade/resources/mock-license.md').toString(),
        },
      }),
    '/rs-dam/connections/{connection_id}/tables/{tableName}/columns': () =>
      ({
        code: 200,
        contentType: JSON_CONTENT_TYPE,
        content: {"date":{"name":"date","javaSqlType":"timestamp","isPrimaryKey":false},"altitude":{"name":"altitude","javaSqlType":"int4","isPrimaryKey":false},"latitude":{"name":"latitude","javaSqlType":"float8","isPrimaryKey":false},"update":{"name":"update","javaSqlType":"bool","isPrimaryKey":false},"id":{"name":"id","javaSqlType":"int8","isPrimaryKey":true},"label":{"name":"label","javaSqlType":"varchar","isPrimaryKey":false},"longitude":{"name":"longitude","javaSqlType":"float8","isPrimaryKey":false}}      }),
    '/rs-dam/connections/{connection_id}/tables': () =>
      ({
        code: 200,
        contentType: JSON_CONTENT_TYPE,
        content: {"t_test_plugin_data_source":{"name":"t_test_plugin_data_source","schema":"public","pKey":"id"},"t_fragment":{"name":"t_fragment","schema":"public","pKey":"id"},"ta_plugin_param_plugin_dyn_value":{"name":"ta_plugin_param_plugin_dyn_value","schema":"public","pKey":""},"t_attribute_property":{"name":"t_attribute_property","schema":"public","pKey":"id"},"t_plugin_configuration":{"name":"t_plugin_configuration","schema":"public","pKey":"id"},"ta_enum_restr_accept_values":{"name":"ta_enum_restr_accept_values","schema":"public","pKey":""},"t_plugin_parameter_value":{"name":"t_plugin_parameter_value","schema":"public","pKey":"id"},"ta_plugin_conf_plugin_param":{"name":"ta_plugin_conf_plugin_param","schema":"public","pKey":""},"t_attribute_model":{"name":"t_attribute_model","schema":"public","pKey":"id"},"t_model":{"name":"t_model","schema":"public","pKey":"id"},"t_restriction":{"name":"t_restriction","schema":"public","pKey":"id"},"ta_model_att_att":{"name":"ta_model_att_att","schema":"public","pKey":"id"}},
      }),
  },
  DELETE: {
  },
  POST: {
    // EXAMPLE : using a dynamic parameter and body content, with implicit answer 200
    // exemple URL: POST http://localhost:3000/api/v1/test-url/myTest1/hop/444 (think about adding some encoded form data)
    '/test-url/{myParam1}/hop/{myParam2}': (request, query, pathParameters, bodyParameters) =>
      ({
        content:
        `Et hop!
          \tPath parameter: ${_.keys(pathParameters).reduce((acc, key) => `${acc}\n\t\t-${key}:${pathParameters[key]}`, '')}
          \tBody parameters: ${_.keys(bodyParameters).reduce((acc, key) => `${acc}\n\t\t-${key}:${bodyParameters[key]}`, '')}
`     }),
    '/connections/{connectionId}': (request, query, pathParameters, bodyParameters) =>
      ({
        code: pathParameters.connectionId === "1352" ? 200 : 403,
        content: {status: pathParameters.connectionId === "1352" ? 'ok' : 'nok'}
      }),
    [MockAuthentication.POST.login.url]: MockAuthentication.POST.login.handler,
    [MockAuthentication.POST.unlock.url]: MockAuthentication.POST.unlock.handler,
    [MockAuthentication.POST.reset.url]: MockAuthentication.POST.reset.handler,
  },
  PUT: {
    [MockAuthentication.PUT.unlock.url]: MockAuthentication.PUT.unlock.handler,
    [MockAuthentication.PUT.reset.url]: MockAuthentication.PUT.reset.handler,
  },
}

// Definitions
const serverPort = 3000
const uiPort = 3333
const jsonMockURL = 'http://localhost:3001'
const urlStart = '/api/v1'

FacadeCore.startServer(urlStart, serverPort, uiPort, jsonMockURL, entryDelegates)

