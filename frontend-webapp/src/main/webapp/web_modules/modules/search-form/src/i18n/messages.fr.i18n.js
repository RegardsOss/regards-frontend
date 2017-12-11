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
const messages = {
  ...Locales.fr,

  // Administration messages

  // Tabulation labels
  'form.configuration.tab.label': 'Résultats',
  'form.dataset.selection.tab.label': 'Jeux',
  'form.layout.tab.label': 'Agencement',
  'form.criterions.tab.label': 'Critères',
  'form.criterion.tab.title': 'Configurez les critères de recherche de votre formulaire. Chaque critère peut être placé dans une section spécifique de votre agencement.',
  'form.preview.tab.label': 'Prévisualisation',
  'form.preview.tab.title': 'Visualisez votre formulaire de recherche tel qu\'il sera visisible dans l\'interface utilisateur.',
  // Configuration tab
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
  'form.attributes.regroupement.form.error.label.already.exists': 'Ce nom de regroupement est déjà utilisé',
  'form.attributes.regroupement.form.add.regroupement.button': 'Ajouter un regroupement',
  'form.attributes.visibility.label': 'Visibilité de l\'attribut',
  'form.attributes.facetable.label': 'Activer le filtrage sur cet attribut',
  'form.attributes.initialSort.label': 'Trier les résultats sur cet attribut',
  'form.attributes.regroupement.section.title': 'Configurer les regroupements d\'attributs',
  'form.attributes.section.title': 'Configurer les attributs',
  'form.attributes.regroupement.remove': 'Supprimer',
  'form.attributes.regroupement.edit': 'Editer',
  'form.attributes.delete.confirm.title': 'Supprimer le regroupement {name} ?',
  'form.attributes.regroupement.form.title.update': 'Mise à jour du regroupement : {name}',
  // Datasets tab
  'form.datasets.tab.title': 'Associer le formulaire de recherche aux jeux de données du catalogue',
  'form.datasets.all.label': 'Associer à tous les jeux de données du catalogue',
  'form.datasets.reset.all': 'Enlever toute association à ce formulaire',
  'form.datasets.selected.label': 'Associer aux jeux de données sélectionnés',
  'form.datasets.model.selected.label': 'Associer aux jeux de données des models selectionnés',
  'form.datasets.select.dataset.list.title': 'Jeux de données associés',
  'form.datasets.select.dataset.models.list.title': 'Modèles de jeu de données associés',
  // Layout tab
  'form.layout.tab.title': 'Configuration de l\'agencement des critères de recherche du formulaire',
  'form.layout.tab.reset': 'Réinitialiser',
  'layout.invalid.error': 'Agencement invalide',
  // Criterion tab
  'form.criterion.list.name': 'Nom du critère',
  'form.criterion.list.attributes': 'Attributs',
  'form.criterion.list.container': 'Conteneur',
  'form.criterion.list.actions': 'Actions',
  'form.criterion.new.button.label': 'Ajouter un critère',
  'form.criterion.reset.button.label': 'Réinitialiser',
  'form.criterion.criteria.new.title': 'Ajouter un critère',
  'form.criterion.criteria.select.criteria.label': 'Sélectionner un critère ...',
  'form.criterion.criteria.select.container.label': 'Sélectionner un conteneur',
  'form.criterion.criteria.submit.button.label': 'Ajouter',
  'form.criterion.criteria.cancel.button.label': 'Annuler',
  'form.criterion.criteria.select.attribute.label': 'Sélectionner un attribut ...',

  // User display component
  'form.search.button.label': 'Rechercher',
  'results.module.title': 'Resultats',
}

export default messages
