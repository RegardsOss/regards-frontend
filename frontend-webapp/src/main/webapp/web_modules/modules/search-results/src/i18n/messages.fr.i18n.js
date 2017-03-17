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
  'form.configuration.tab.title': 'Configurer les paramètres principaux du formulaire de recherche',
  'form.configuration.result.type.datasets': 'Afficher les jeux de données résultats de la recherche',
  'form.configuration.result.type.dataobjects': 'Afficher les objets de données résultats de recherche',
  'form.configuration.result.enable.facettes.label': 'Activer les facettes : Critères de filtrage dépendant des résultats de la recherche initiale',
  'form.attributes.parameters.title': 'Configurer les attributs affichés et/ou utilisés comme filtre depuis chaque résultat de recherche',
  'form.attributes.regroupement.form.title': 'Ajout d\'un nouveau regroupement',
  'form.attributes.regroupement.description': 'Un regroupement d\'attributs permet de regrouper l\'affichage de plusieurs attributs d\'un même objet résultat d\'une recherche dans une seule colonne du tableau des résultats de recherche.<br/>' +
  ' Veuillez saisir le label de la colonne voulue (ce label doit être unique) puis sélectionner les attributs à regrouper.',
  'form.attributes.regroupement.form.label': 'Label',
  'form.attributes.regroupement.form.save': 'Ajouter',
  'form.attributes.regroupement.form.update': 'Mise à jour',
  'form.attributes.regroupement.form.cancel': 'Annuler',
  'form.attributes.regroupement.form.error.label.aleady.exists': 'Ce nom de regroupement est déjà utilisé',
  'form.attributes.regroupement.form.add.regroupement.button': 'Ajouter un regroupement',
  'form.attributes.visibility.label': 'Visibilité de l\'attribut',
  'form.attributes.facetable.label': 'Activer le filtrage sur cet attribut',
  'form.attributes.regroupement.section.title': 'Configurer les regroupements d\'attributs',
  'form.attributes.section.title': 'Configurer les attributs',
  'form.attributes.regroupement.remove': 'Supprimer',
  'form.attributes.regroupement.edit': 'Editer',
  'form.attributes.delete.confirm.title': 'Confirmer la suppression du regroupement {name}',
  'form.attributes.regroupement.form.title.update': 'Mise à jour du regroupement : {name}',

  // User messages
  'navigation.dataobjects.label': 'Catalogue',
  'navigation.datasets.label': 'Jeux de données',
  'navigation.filter.by.facets': 'Filtres de résultats',
}, Locales.fr)

export default messages
