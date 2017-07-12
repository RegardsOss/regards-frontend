/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { Locales } from '@regardsoss/form-utils'

/**
 * i18n messages French language
 * @author Sébastien binda
 */
const messages = Object.assign({

  // Administration messages
  'form.configuration.tab.title': 'Configurez les options d\'affichage des résultats de recherche. ',
  'form.configuration.result.type.datasets': 'Afficher la vue "jeux de données" dans les résultats',
  'form.configuration.result.enable.facettes.label': 'Activer les facettes : Critères de filtrage dépendant des résultats de la recherche initiale',
  'form.attributes.regroupement.form.title': 'Ajout d\'un nouveau regroupement',
  'form.attributes.regroupement.description': 'Un regroupement d\'attributs permet de regrouper l\'affichage de plusieurs attributs d\'un même objet résultat d\'une recherche dans une seule colonne du tableau des résultats de recherche.<br/>' +
  ' Veuillez saisir le label de la colonne voulue (ce label doit être unique) puis sélectionner les attributs à regrouper.',
  'form.attributes.regroupement.form.label': 'Label',
  'form.attributes.regroupement.form.save': 'Ajouter',
  'form.attributes.regroupement.form.update': 'Mise à jour',
  'form.attributes.regroupement.form.cancel': 'Annuler',
  'form.attributes.regroupement.form.error.label.already.exists': 'Ce nom est déjà utilisé',
  'form.attributes.regroupement.form.add.regroupement.button': 'Ajouter un regroupement',
  'form.attributes.visibility.label': 'Visibilité de l\'attribut',
  'form.attributes.facetable.label': 'Activer le filtrage sur cet attribut',
  'form.attributes.order': 'Ordre d\'affichage',
  'form.attributes.initialSort.label': 'Trier les résultats sur cet attribut',
  'form.attributes.regroupement.section.title': 'Configurer les regroupements d\'attributs',
  'form.attributes.section.title': 'Configurer les attributs dynamiques',
  'form.attributes.standard.section.title': 'Configuration des attributs communs (attributs créés par défaut sur tous les objets de données)',
  'form.attributes.filter.label': 'Filtrer les attributs ...',
  'form.attributes.regroupement.remove': 'Supprimer',
  'form.attributes.regroupement.edit': 'Editer',
  'form.attributes.delete.confirm.title': 'Supprimer le regroupement {name} ?',
  'form.attributes.regroupement.form.title.update': 'Mise à jour du regroupement : {name}',
  'form.attribute.conf.selection.tab.label': 'Attributs des objets',
  'form.attribute.dataset.conf.selection.tab.label': 'Attributs des jeux',

  // User messages
  'navigation.home.label': 'Catalogue',
  'navigation.dataobjects.label': 'Objets de données',
  'navigation.datasets.label': 'Jeux de données',
  'navigation.filter.by.facets': 'Filtres',
  'list.sort.prefix.label': 'Tri :',
  'list.sort.none.label': 'Aucun',
  'view.type.table.button.label': 'Afficher les résultats dans un tableau',
  'view.type.list.button.label': 'Afficher les résultats en liste',
  'show.description.tooltip': 'Détail de l\'entité',
  'results.no.content.title': 'Pas de résultats',
  'results.no.content.subtitle': 'Votre recherche n\'a donné aucun résultat. Essayez de modifier vos critères',
  'results.options.column.label': 'Options et services',
}, Locales.fr)

export default messages
