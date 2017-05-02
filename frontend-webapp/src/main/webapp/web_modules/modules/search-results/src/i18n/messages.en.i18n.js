/**
 * LICENSE_PLACEHOLDER
 **/
import { Locales } from '@regardsoss/form-utils'

/**
 * i18n messages English language
 * @author Sébastien binda
 */
const messages = Object.assign({

  // Administration messages

  // Configuration tab
  'form.configuration.tab.title': 'Configure main parameters for current search form module',
  'form.configuration.result.type.datasets': 'Display results grouped by datasets',
  'form.configuration.result.type.dataobjects': 'Display dataobjects results',
  'form.configuration.result.enable.facettes.label': 'Enable facetes : Results filtering with criterion depending on initial search results',
  'form.attributes.parameters.title': 'Configure attributes displayed and used for filtering from each search results of the current form',
  'form.attributes.regroupement.form.title': 'Add new attributes regrouepement',
  'form.attributes.regroupement.description': 'A regroupement of attributes allow you to display multiples attributes of a search result object into the same column of the results list.<br/>' +
  ' Please enter the new regroupement label (that must be unique) and select attributes to regroup.',
  'form.attributes.regroupement.form.label': 'Label',
  'form.attributes.regroupement.form.save': 'Add',
  'form.attributes.regroupement.form.update': 'Update',
  'form.attributes.regroupement.form.cancel': 'Cancel',
  'form.attributes.regroupement.form.error.label.aleady.exists': 'This regroupement label already exists',
  'form.attributes.regroupement.form.add.regroupement.button': 'Add new regroupement',
  'form.attributes.visibility.label': 'Visibility',
  'form.attributes.facetable.label': 'Enable filter',
  'form.attributes.order': 'Display order',
  'form.attributes.initialSort.label': 'Sort results on this attribute',
  'form.attributes.regroupement.section.title': 'Configure attributes regroupement to display after every search result',
  'form.attributes.section.title': 'Configure attributes from dynamic models retrieved from each search result',
  'form.attributes.standard.section.title': 'Configure common attributes retrieved from each search result',
  'form.attributes.filter.label': 'Search for attribute label ... ',
  'form.attributes.regroupement.remove': 'Remove',
  'form.attributes.regroupement.edit': 'Edit',
  'form.attributes.delete.confirm.title': 'Confirm deletion of attributs regroupement {name}',
  'form.attributes.regroupement.form.title.update': 'Update regroupement : {name}',

  // User messages
  'navigation.home.label': 'Catalog',
  'navigation.dataobjects.label': 'Dataobjects',
  'navigation.datasets.label': 'Datasets',
  'navigation.filter.by.facets': 'Filters',
  'list.sort.prefix.label': 'Sort :',
  'list.sort.none.label': 'None',
  'view.type.table.button.label': 'Display results with table format',
  'view.type.list.button.label': 'Display results with list format',
}, Locales.en)

export default messages
