/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { storage } from '@regardsoss/units'

/**
 * i18n messages French language
 * @author Sébastien binda
 */
const messages = {
  // form messages
  ...Locales.fr,
  // units messages
  ...storage.messages.fr,

  // Administration messages

  // Configuration tab
  'form.configuration.visible.tabs.message': 'Vues de résultats à afficher',
  'form.configuration.result.type.data': 'Données',
  'form.configuration.result.type.data_datasets': 'Données et jeux de données',
  'form.configuration.result.type.documents': 'Documents',
  'form.configuration.results.options.message': 'Configuration des vues de résultats',
  'form.configuration.result.enable.facettes.label': 'Activer le filtrage des résultats par facettes',
  'form.configuration.result.select.facettes.initially.label': 'Afficher les facettes initialement',
  'form.configuration.result.enable.download.label': 'Activer le téléchargement des fichiers associés à l\'entité',
  'form.configuration.result.enable.quicklooks.label': 'Activer la vue des Imagettes sur les données',
  'form.configuration.results.quicklooks.message': 'Configuration des imagettes',
  'form.configuration.result.width.quicklooks.label': 'Largeur des imagettes',
  'form.configuration.result.spacing.quicklooks.label': 'Espacement entre les imagettes',
  'form.configuration.result.datasets.title.message': 'Titre de la vue jeux de données',
  'form.configuration.result.datasets.section.label.en': 'Anglais',
  'form.configuration.result.datasets.section.label.fr': 'Français',
  'form.configuration.result.data.titles.message': 'Titre de la vue données',
  'form.configuration.result.data.section.label.en': 'Anglais',
  'form.configuration.result.data.section.label.fr': 'Français',
  'form.configuration.result.initial.view.mode': 'Mode d\'affichage initial',
  'form.configuration.result.show.list.initially': 'Liste',
  'form.configuration.result.show.table.initially': 'Tableau',
  'form.configuration.result.show.quicklook.initially': 'Imagettes',
  'form.attributes.configuration.section.title': 'Colonnes et attibuts du tableau',
  'form.attributes.regroupement.form.title': 'Ajout d\'un nouveau regroupement',
  'form.attributes.regroupement.description': 'Un regroupement d\'attributs permet de regrouper l\'affichage de plusieurs attributs d\'un même objet résultat d\'une recherche dans une seule colonne du tableau des résultats de recherche.<br/>'
    + ' Veuillez saisir le label de la colonne voulue (ce label doit être unique) puis sélectionner les attributs à regrouper.',
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
  'form.attributes.section.clear.filters.tooltip': 'Effacer le filtre courant',
  'form.attributes.filter.label': 'Filtrer les attributs ...',
  'form.attributes.regroupement.remove': 'Supprimer',
  'form.attributes.regroupement.edit': 'Editer',
  'form.attributes.delete.confirm.title': 'Supprimer le regroupement {name} ?',
  'form.attributes.regroupement.form.title.update': 'Mise à jour du regroupement : {name}',
  'form.attribute.conf.selection.tab.label': 'Présentation des données',
  'form.attribute.dataset.conf.selection.tab.label': 'Présentation des jeux',
  'form.attribute.quicklook.conf.selection.tab.label': 'Présentation des imagettes',
  'form.attribute.conf.columns': 'Colonnes de résultats affichées',
  'form.attribute.conf.no.column': 'Ajouter ici les colonnes à afficher dans la vue des résultats',
  'form.attribute.conf.facets': 'Filtres des résultats',
  'form.attribute.conf.no.facet': 'Ajouter ici les filtres de résultats qui seront proposés',
  'form.attribute.conf.sorting': 'Tri initial des résultats',
  'form.attribute.conf.no.sorting': 'Ajouter ici les attributs à utiliser pour ordonner le résultat initial, par ordre d\'importance',

  // User messages
  'search.results.configure.columns.option': 'Colonnes',
  'search.results.configure.columns.summary.text': '{columnsCount} colonnes disponibles pour ce tableau',
  'search.results.configure.columns.toggle.all.visible': 'Tout Afficher',
  'search.results.configure.columns.toggle.all.hidden': 'Tout cacher',
  'search.results.configure.columns.dialog.reset': 'Réinitialiser',
  'search.results.configure.columns.dialog.reset.tooltip': 'Réinitialiser les colonnes à leur état initial',
  'search.results.configure.columns.dialog.confirm': 'Confirmer',
  'search.results.configure.columns.dialog.cancel': 'Annuler',
  'search.results.configure.columns.visible.column': 'Visible',
  'search.results.configure.columns.visible.title': 'Cette colonne est visible',
  'search.results.configure.columns.hidden.title': 'Cette colonne est cachée',
  'search.results.configure.columns.label.column': 'Libellé',
  'search.results.configure.columns.attribute.column': 'Attributs',
  'search.results.configure.columns.attribute.label.separator': ', ',
  'search.results.configure.columns.attribute.not.available': '-',
  'search.results.configure.columns.move.tooltip': 'Déplacer cette colonne',
  'search.results.configure.columns.move.column.at.first.position': 'En premier',
  'search.results.configure.columns.move.column.after': 'Après {columnLabel}',
  'navigation.dataobjects.label': 'Données',
  'navigation.datasets.label': 'Jeux de données',
  'navigation.documents.label': 'Documents',
  'navigation.filter.by.facets': 'Filtres',
  'list.sort.prefix.label': 'Tri :',
  'list.sort.none.label': 'Aucun',
  'view.type.table.button.label': 'Afficher les résultats dans un tableau',
  'view.type.list.button.label': 'Afficher les résultats en liste',
  'view.type.map.button.label': 'Afficher les résultats sur une carte',
  'view.type.quicklook.button.label': 'Afficher les résultats en image',
  'download.tooltip': 'Télécharger',
  'no.download.tooltip': 'Aucun fichier ou droits utilisateur insuffisant',
  'download.no.online.file.tooltip': 'Tous les fichiers sont hors ligne',
  'show.entity.services.tooltip': 'Services',
  'show.description.tooltip': 'Détail',
  'search.related.objects': 'Voir le contenu du jeu',
  'add.to.cart.tooltip': 'Ajouter l\'élément à mon panier',
  'add.selection.to.cart.label': 'Ajouter au panier',
  'add.selection.to.cart.tooltip': 'Ajouter les éléments sélectionnés à mon panier',
  'table.filter.only.quicklook.label': 'Imagettes uniquement',
  'table.filter.select.only.quicklook.tooltip': 'Cliquer pour afficher uniquement les objects disposant d\'une imagette',
  'table.filter.deselect.only.quicklook.label': 'Cliquer pour afficher toutes les entités',
  'results.no.content.title': 'Pas de résultat',
  'results.no.content.subtitle': 'Votre recherche n\'a donné aucun résultat. Essayez de modifier vos critères',
  'results.selection.column.label': 'Colonne de sélection',
  'results.options.column.label': 'Options et services',
  'results.download': 'Télécharger',
  'results.cell.multiple.values.separator': ', ',

  'search.facets.no.facet.found': 'Pas de facette pour le résultat courant',
  'search.facets.filter.menu.others.message': 'Les choix disponibles ne sont pas exhaustifs',
  'search.facets.filter.boolean.value.true': 'vrai',
  'search.facets.filter.boolean.value.false': 'faux',
  'search.facets.filter.menu.boolean.value': '{valueLabel} ({count})',
  'search.facets.filter.chip.boolean.value': '{label}: {valueLabel}',
  'search.facets.filter.menu.date.before': 'Avant le {date} ({count})',
  'search.facets.filter.menu.date.after': 'Après le {date} ({count})',
  'search.facets.filter.menu.date.range': 'Entre le {minDate} et le {maxDate} ({count})',
  'search.facets.filter.menu.date.value': '{date} ({count})',
  'search.facets.filter.chip.date.before': '{label} < {date}',
  'search.facets.filter.chip.date.after': '{date} < {label}',
  'search.facets.filter.chip.date.range': '{minDate} <= {label} < {maxDate}',
  'search.facets.filter.chip.date.value': '{label} = {date}',
  'search.facets.filter.menu.number.lower': 'Inférieur à {value} ({count})',
  'search.facets.filter.menu.number.greater': 'Supérieur à {value} ({count})',
  'search.facets.filter.menu.number.range': 'Entre {minValue} et {maxValue} ({count})',
  'search.facets.filter.menu.number.value': '{value} ({count})',
  'search.facets.filter.chip.number.lower': '{label} < {value}',
  'search.facets.filter.chip.number.greater': '{value} < {label}',
  'search.facets.filter.chip.number.range': '{minValue} <= {label} < {maxValue}',
  'search.facets.filter.chip.number.value': '{label} = {value}',
  'search.facets.filter.menu.word.value': '{word} ({count})',
  'search.facets.filter.chip.word.value': '{label} = {word}',
}

export default messages
