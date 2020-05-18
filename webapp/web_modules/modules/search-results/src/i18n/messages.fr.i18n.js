/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  'search.results.form.configuration.tree.section.label.MAIN': 'Général',
  'search.results.form.configuration.tree.section.label.FILTERS': 'Filtres',
  'search.results.form.configuration.tree.section.label.RESTRICTIONS': 'Restriction des résultats',
  'search.results.form.configuration.tree.section.label.DATA': 'Données',
  'search.results.form.configuration.tree.section.label.DATASET': 'Jeux de données',
  'search.results.form.configuration.tree.page.label.MAIN': 'Vue',
  'search.results.form.configuration.tree.page.label.SORTING': 'Tri',
  'search.results.form.configuration.tree.page.label.LIST_AND_TABLE': 'Liste et tableau',
  'search.results.form.configuration.tree.page.label.QUICKLOOKS': 'Imagettes',
  'search.results.form.configuration.tree.page.label.MAP': 'Carte',
  'search.results.form.main.configuration.display.types.message': 'Types de résultats à afficher',
  'search.results.form.main.configuration.display.types.data': 'Données',
  'search.results.form.configuration.result.type.data.and.datasets': 'Données et jeux de données',
  'search.results.form.restrictions.configuration.display.types.message': 'Restrictions des résultats par les jeux de données',
  'search.results.form.restrictions.configuration.display.type.NONE': 'Aucune restriction',
  'search.results.form.restrictions.configuration.display.type.SELECTED_DATASETS': 'Restreindre aux jeux sélectionnés',
  'search.results.form.restrictions.configuration.display.type.SELECTED_MODELS': 'Restreindre aux modèles de jeux sélectionnés',
  'search.results.form.restrictions.configuration.no.selection.messsage': 'Aucune sélection',
  'search.results.form.restrictions.configuration.selection.count.message': `{selectionCount} element{selectionCount, plural, 
    =0 {} 
    one {} 
    other {s}
  } sélectionné{selectionCount, plural, 
    =0 {} 
    one {} 
    other {s}
  }`,
  'search.results.form.restrictions.configuration.filter.by.name.message': 'Filtre',
  'search.results.form.restrictions.configuration.no.data.title': 'Aucun élément',
  'search.results.form.restrictions.configuration.no.dataset.existing.message': 'Il n\'y a aucun jeu de données, veuillez sélectionner un autre mode de restriction des résultats.',
  'search.results.form.restrictions.configuration.no.dataset.matching.message': 'Il n\'y a aucun jeu de données correspondant au filtre saisi.',
  'search.results.form.restrictions.configuration.no.dataset.model.existing.message': 'Il n\'y a aucun modèle de jeux de données, veuillez sélectionner un autre mode de restriction des résultats.',
  'search.results.form.restrictions.configuration.no.dataset.model.matching.message': 'Il n\'y a aucun modèle de jeux de données correspondant au filtre saisi.',
  'search.results.form.configuration.result.type.tab.title.message': 'Titre de la vue',
  'search.results.form.configuration.result.type.tab.hint': 'Titre de l\'onglet pour ce type, laisser vide pour la valeur par défaut',
  'search.results.form.configuration.result.type.tab.label.en': 'Anglais',
  'search.results.form.configuration.result.type.tab.label.fr': 'Français',
  'search.results.form.configuration.result.initial.view.mode': 'Mode d\'affichage initial',
  'search.results.form.configuration.result.show.list.initially': 'Liste',
  'search.results.form.configuration.result.show.table.initially': 'Tableau',
  'search.results.form.configuration.result.show.quicklook.initially': 'Imagettes',
  'search.results.form.configuration.result.show.map.initially': 'Map',
  'search.results.form.configuration.result.options.title': 'Options',
  'search.results.form.configuration.result.options.enable.download': 'Activer le téléchargement des fichiers associés à l\'entité',
  'search.results.form.configuration.result.filters': 'Filtres',
  'search.results.form.configuration.result.enable.filters.data': 'Proposer les filtres dans la vue des données',
  'search.results.form.configuration.result.enable.filters.dataset': 'Proposer les filtres dans la vue des jeux de données',
  'search.results.form.configuration.result.enable.filters.initially': 'Proposer les filtres initialement',
  'search.results.form.configuration.result.no.filter': 'Ajouter ici les attributs permettant à l\'utilisateur de filtrer les résultats',
  'search.results.form.configuration.result.sorting': 'Tri initial des résultats',
  'search.results.form.configuration.result.no.sorting': 'Ajouter ici les attributs à utiliser pour le tri initial des résultats',
  'search.results.form.configuration.result.enable.view': 'Activer la vue',
  'search.results.form.configuration.result.TABLE.configuration': 'Configuration du tableau et de la liste',
  'search.results.form.configuration.result.TABLE.no.attribute': 'Ajouter ici les colonnes à afficher dans le tableau / champs à afficher dans la liste',
  'search.results.form.configuration.result.QUICKLOOK.configuration': 'Configuration des imagettes',
  'search.results.form.configuration.result.QUICKLOOK.no.attribute': 'Ajouter ici les champs à afficher pour chaque imagette',
  'search.results.form.configuration.result.MAP.configuration': 'Configuration de la carte',
  'search.results.form.configuration.result.MAP.no.attribute': 'Ajouter ici les champs à afficher pour chaque imagette',
  'search.results.form.configuration.result.MAP.background.title': 'Fond de carte',
  'search.results.form.configuration.result.MAP.background.layer.url': 'URL',
  'search.results.form.configuration.result.MAP.background.layer.type': 'Type',
  'search.results.form.configuration.result.MAP.background.layer.conf': 'Configuration (optionelle)',
  'search.results.form.configuration.result.MAP.background.layer.conf.invalid': 'Format JSON invalide',

  // User messages
  'search.results.tab.main.results': 'Résultats',
  'search.results.tab.description': 'Description',
  'search.results.tab.tag.results': '{tabLabel}',
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
  'search.results.default.tab.label.for.DATA': 'Données',
  'search.results.default.tab.label.for.DATASET': 'Jeux de données',
  'search.results.default.tab.label.for.COLLECTION': 'Collections',
  'search.results.toggle.filters': 'Filtres',
  'search.results.list.sort.label': 'Tri: {sortElement}',
  'search.results.list.sort.default.label': 'Initial',
  'search.results.list.sort.custom.label': 'Spécifique',
  'view.type.selector.tooltip.for.LIST': 'Afficher les résultats en liste',
  'view.type.selector.tooltip.for.TABLE': 'Afficher les résultats dans un tableau',
  'view.type.selector.tooltip.for.MAP': 'Afficher les résultats sur une carte',
  'view.type.selector.tooltip.for.QUICKLOOK': 'Afficher les résultats en image',
  'download.tooltip': 'Télécharger',
  'no.download.tooltip': 'Aucun fichier ou droits utilisateurs insuffisant',
  'download.no.online.file.tooltip': 'Tous les fichiers sont hors ligne',
  'show.entity.services.tooltip': 'Services',
  'show.description.tooltip': 'Détail',
  'filter.related.data': 'Afficher les données',
  'add.to.cart.tooltip': 'Ajouter l\'élément à mon panier',
  'add.selection.to.cart.label': 'Ajouter au panier',
  'add.selection.to.cart.tooltip': 'Ajouter les éléments sélectionnés à mon panier',
  'table.filter.only.quicklook.label': 'Imagettes uniquement',
  'table.filter.select.only.quicklook.tooltip': 'Sélectionner pour n\'afficher que les éléments disposant d\'une imagette',
  'table.filter.deselect.only.quicklook.label': 'Désélectionner pour afficher tous les éléments',
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
  'search.facets.filter.chip.boolean.value': '{facetLabel}: {valueLabel}',
  'search.facets.filter.menu.date.before': 'Avant le {date} ({count})',
  'search.facets.filter.menu.date.after': 'Après le {date} ({count})',
  'search.facets.filter.menu.date.range': 'Entre le {minDate} et le {maxDate} ({count})',
  'search.facets.filter.menu.date.value': '{date} ({count})',
  'search.facets.filter.chip.date.before': '{facetLabel} < {date}',
  'search.facets.filter.chip.date.after': '{date} < {facetLabel}',
  'search.facets.filter.chip.date.range': '{minDate} <= {facetLabel} < {maxDate}',
  'search.facets.filter.chip.date.value': '{facetLabel} = {date}',
  'search.facets.filter.menu.number.lower': 'Inférieur à {value} ({count})',
  'search.facets.filter.menu.number.greater': 'Supérieur à {value} ({count})',
  'search.facets.filter.menu.number.range': 'Entre {minValue} et {maxValue} ({count})',
  'search.facets.filter.menu.number.value': '{value} ({count})',
  'search.facets.filter.chip.number.lower': '{facetLabel} < {value}',
  'search.facets.filter.chip.number.greater': '{value} < {facetLabel}',
  'search.facets.filter.chip.number.range': '{minValue} <= {facetLabel} < {maxValue}',
  'search.facets.filter.chip.number.value': '{facetLabel} = {value}',
  'search.facets.filter.menu.word.value': '{word} ({count})',
  'search.facets.filter.chip.word.value': '{facetLabel} = {word}',
  'search.filter.geometry.label': 'Zone',
  'search.filter.entities.selection.label': 'Entités ({count})',

  'results.map.tools.tooltip.for.PICK_ON_CLICK': 'Sélectionner des entités',
  'results.map.tools.tooltip.for.DRAW_RECTANGLE': 'Dessiner une zone de recherche',
  'results.map.tools.tooltip.opacity': 'Changer l\'opacité de la couche',
  'results.map.tools.opaque': 'Opaque',
  'results.map.tools.transparent': 'Transparent',
}

export default messages
