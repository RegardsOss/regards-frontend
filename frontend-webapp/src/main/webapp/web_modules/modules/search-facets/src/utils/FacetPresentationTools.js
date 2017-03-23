/**
* LICENSE_PLACEHOLDER
**/

const presentationReplacements = [{
  test: /properties\.|default\./i,
  replacement: '',
}]

const formatFacetName = facetName => presentationReplacements.reduce((acc, r) => acc.replace(r.test, r.replacement), facetName)

export default {
  formatFacetName,
}
