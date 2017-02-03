/**
 * LICENSE_PLACEHOLDER
 **/
import { Locales } from '@regardsoss/form-utils'

/**
 * i18n messages French language
 * @author Sébastien binda
 */
const messages = Object.assign({

  // Administration messages

  // Tabulation labels
  'form.configuration.tab.label': 'Paramètres',
  'form.dataset.selection.tab.label': 'Jeux',
  'form.layout.tab.label': 'Agencement',
  'form.criterions.tab.label': 'Critères',
  'form.preview.tab.label': 'Prévisualisation',
  // Configuration tab
  'form.configuration.tab.title': 'Configurer les paramètres principaux du formulaire de recherche',
  'form.configuration.result.type.datasets': 'Afficher les jeux de données résultats de la recherche',
  'form.configuration.result.type.dataobjects': 'Afficher les objets de données résultats de recherche',
  // Datasets tab
  'form.datasets.tab.title': 'Associer le formulaire de recherche aux jeux de données du catalogue',
  'form.datasets.all.label': 'Associer à tous les jeux de données du catalogue',
  'form.datasets.selected.label': 'Associer au jeux de données sélectionnés',
  'form.datasets.model.selected.label': 'Associer aux jeux de données des models selectionnés',
  'form.datasets.select.dataset.list.title': 'Jeux de données associés',
  'form.datasets.select.dataset.models.list.title': 'Modèles de jeu de données associés',
  // Layout tab
  'form.layout.tab.title': 'Configuration de l\'agencement des critères de recherche du formulaire',
  'form.layout.tab.reset': 'Réinitialiser',
  // Criterion tab
  'form.criterion.list.name': 'Nom du critère',
  'form.criterion.list.container': 'Conteneur',
  'form.criterion.list.actions': 'Actions',
  'form.criterion.new.button.label': 'Créer un nouveau critère',
  'form.criterion.reset.button.label': 'Réinitialiser',
  'form.criterion.criteria.new.title': 'Ajouter un nouveau critère',
  'form.criterion.criteria.select.criteria.label': 'Sélectionner un critère ...',
  'form.criterion.criteria.select.container.label': 'Sélectionner un conteneur',
  'form.criterion.criteria.submit.button.label': 'Ajouter',
  'form.criterion.criteria.cancel.button.label': 'Annuler',
  'form.criterion.criteria.select.attribute.label': 'Sélectionner un attribut ...',

  // User display component

  'form.search.button.label': 'Rechercher',

}, Locales.fr)

export default messages
