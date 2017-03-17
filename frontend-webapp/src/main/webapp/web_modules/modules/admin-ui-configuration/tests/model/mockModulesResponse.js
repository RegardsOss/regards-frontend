/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Mock server response for Modules entities
 * @author Sébastien binda
 */
export default {
  content: [
    {
      content: {
        "id": 1,
        "name": "menu",
        "description": "Header menu module",
        "applicationId": "user",
        "container": "header",
        "active": true,
        "isDefault": false,
        "conf":"{\"title\":\"Regards user interface\",\"displayAuthentication\":true,\"displayLocaleSelector\":true,\"displayThemeSelector\":true}"
      },
      links: [],
    },
    {
      content: {
        "active": false,
        "isDefault": false,
        "name": "news",
        "description": "Flux atom",
        "container": "content",
        "applicationId": "user",
        "id": 6
      },
      links: [],
    }
  ],
  metadata: {
    number: 5,
    size: 5,
    totalElements: 5,
  },
  links: [],
}
