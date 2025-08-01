/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { messages as attributesCommonMsg } from '@regardsoss/attributes-common'

/**
 * i18n messages French language
 * @author Sébastien binda
 */
const messages = {
  // form messages
  ...Locales.fr,
  // units messages
  ...storage.messages.fr,
  // attributes common messages (used to format attributes locally and label/version)
  ...attributesCommonMsg.fr,

  // Administration messages
  'search.results.form.dialog.configuration.invalid': 'Configuration invalide',
  'search.results.form.dialog.configuration.invalid.message': 'Vous ne pouvez pas réaliser cette action tant qu\'une erreur subsiste.',
  'search.results.form.dialog.configuration.confirm': 'Confirmer',
  'search.results.form.configuration.tree.section.label.MAIN': 'Général',
  'search.results.form.configuration.tree.section.label.SEARCH': 'Volet de recherche',
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
  'search.results.form.configuration.search.pane.title': 'Configuration des groupes de critères du volet de recherche',
  'search.results.form.configuration.search.pane.empty.message': 'Cliquez sur le bouton ci-dessous pour ajouter le premier groupe de critères du formulaire',
  'search.results.form.configuration.search.pane.empty.first.group.label': 'Ajouter',
  'search.results.form.configuration.search.pane.identifier.column.label': 'Elément',
  'search.results.form.configuration.search.pane.identifier.column.cell.label.group': 'Groupe #{index}',
  'search.results.form.configuration.search.pane.identifier.column.cell.label.plugin.set': '{name}:{version}',
  'search.results.form.configuration.search.pane.identifier.column.cell.title.plugin.set': '{name}:{version}, développé par {author}. {description}',
  'search.results.form.configuration.search.pane.identifier.column.cell.label.plugin.unset': 'Indéfini',
  'search.results.form.configuration.search.pane.identifier.column.cell.title.plugin.unset': 'Plugin indéfini',
  'search.results.form.configuration.search.pane.label.column.label': 'Libellé ({locale})',
  'search.results.form.configuration.search.pane.label.column.cell.unset': 'Indéfini',
  'search.results.form.configuration.search.pane.show.label.column.label': 'Libellé',
  'search.results.form.configuration.search.pane.show.label.column.cell.shown': 'affiché',
  'search.results.form.configuration.search.pane.show.label.column.cell.hidden': 'caché',
  'search.results.form.configuration.search.pane.configuration.column.label': 'Configuration',
  'search.results.form.configuration.search.pane.configuration.column.cell.attributes.separator': ', ',
  'search.results.form.configuration.search.pane.configuration.column.cell.none': 'Aucune configuration',
  'search.results.form.configuration.search.pane.configuration.column.dialog.title': 'Editer la configuration du critère',
  'search.results.form.configuration.search.pane.configuration.column.dialog.attribute.field': '{name}: {description}',
  'search.results.form.configuration.search.pane.configuration.column.dialog.attribute.no.description': '-',
  'search.results.form.configuration.search.pane.configuration.column.dialog.attribute.unknown': 'Attribut indéfini',
  'search.results.form.configuration.search.pane.configuration.column.dialog.attribute.invalid.type': 'Type d\'attribut incompatible',
  'search.results.form.configuration.search.pane.configuration.column.dialog.confirm.label': 'Confirmer',
  'search.results.form.configuration.search.pane.configuration.column.dialog.cancel.label': 'Annuler',
  'search.results.form.configuration.search.pane.options.column.label': 'Options',
  'search.results.form.configuration.search.pane.options.column.insert.tooltip': 'Insérer...',
  'search.results.form.configuration.search.pane.options.column.insert.group.before.label': 'Insérer un groupe avant',
  'search.results.form.configuration.search.pane.options.column.insert.group.after.label': 'Insérer un groupe après',
  'search.results.form.configuration.search.pane.options.column.insert.criterion.before.label': 'Insérer un critère avant',
  'search.results.form.configuration.search.pane.options.column.insert.criterion.after.label': 'Insérer un critère après',
  'search.results.form.configuration.search.pane.options.column.insert.criterion.in.group.menu.label': 'Insérer un critère',
  'search.results.form.configuration.search.pane.options.column.move.tooltip': 'Déplacer...',
  'search.results.form.configuration.search.pane.options.column.move.in.current.group.menu.label': 'Dans ce groupe',
  'search.results.form.configuration.search.pane.options.column.move.in.other.group': 'Dans le groupe {reference}',
  'search.results.form.configuration.search.pane.options.common.position.first.label': 'En premier',
  'search.results.form.configuration.search.pane.options.common.position.after.label': 'Après {elementType} {reference}',
  'search.results.form.configuration.search.pane.options.common.position.after.group.type.label': 'le groupe',
  'search.results.form.configuration.search.pane.options.common.position.after.criterion.type.label': 'le critère',
  'search.results.form.configuration.search.pane.options.common.position.simple.reference': '#{index}',
  'search.results.form.configuration.search.pane.options.common.position.reference.with.label': '#{index} "{label}"',
  'search.results.form.configuration.search.pane.options.column.delete.tooltip': 'Supprimer',
  'search.results.form.restrictions.configuration.data.restrictions.title': 'Restrictions sur les données',
  'search.results.form.restrictions.configuration.data.last.version.only': 'Dernière version uniquement',
  'search.results.form.restrictions.configuration.dataset.restrictions.title': 'Restrictions par les jeux de données',
  'search.results.form.restrictions.configuration.display.type.NONE': 'Aucune restriction',
  'search.results.form.restrictions.configuration.display.type.SELECTED_DATASETS': 'Restreindre aux jeux sélectionnés',
  'search.results.form.restrictions.configuration.display.type.SELECTED_MODELS': 'Restreindre aux modèles de jeux sélectionnés',
  'search.results.form.restrictions.configuration.opensearch.request': 'Requête OpenSearch',
  'search.results.form.restrictions.configuration.opensearch.hint': 'Requete',
  'search.results.form.restrictions.configuration.opensearch.info.button': 'Détails',
  'search.results.form.restrictions.configuration.opensearch.dialog.close': 'Fermer',
  'search.results.form.restrictions.configuration.opensearch.dialog.title': 'Construire une requête OpenSearch',
  'search.results.form.restrictions.configuration.opensearch.dialog.link': 'Lien vers la documentation',
  'search.results.form.restrictions.configuration.opensearch.dialog.message': 'Pour savoir comment construire une requête OpenSearch rendez-vous sur la documentation REGARDS: section Backend, sous-section Catalogue, puis SearchAPI.',
  'search.results.form.restrictions.configuration.no.selection.message': 'Aucune sélection',
  'search.results.form.restrictions.configuration.selection.dataset.count.max': 'Veuillez sélectionner jusqu\'à {max} jeux. Si vous avez besoin d\'un filtre plus complexe veuillez utiliser la requête opensearch de filtre proposée plus haut.',
  'search.results.form.restrictions.configuration.selection.model.count.max': 'Veuillez sélectionner jusqu\'à {max} modèles. Si vous avez besoin d\'un filtre plus complexe veuillez utiliser la requête opensearch de filtre proposée plus haut.',
  'search.results.form.restrictions.configuration.selection.count.message': `{selectionCount}/{max} element{selectionCount, plural, 
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
  'search.results.form.configuration.result.options.enable.refresh': 'Afficher le bouton d\'actualisation',
  'search.results.form.configuration.result.options.enable.download': 'Afficher l\'option téléchargement des fichiers associés',
  'search.results.form.configuration.result.options.enable.services': 'Afficher les services associés',
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
  'search.results.form.configuration.result.LIST.configuration': 'Configuration de la vue liste',
  'search.results.form.configuration.result.LIST.disableLabelDisplay': 'Cacher les labels',
  'search.results.form.configuration.result.MAP.configuration': 'Configuration de la carte',
  'search.results.form.configuration.result.MAP.no.attribute': 'Ajouter ici les champs à afficher pour chaque imagette',
  'search.results.form.configuration.result.MAP.viewMode.title': 'Mode d\'affichage initial',
  'search.results.form.configuration.result.MAP.viewMode.MODE_3D': '3D',
  'search.results.form.configuration.result.MAP.viewMode.MODE_2D': '2D',
  'search.results.form.configuration.result.MAP.layers.viewMode.title': 'Mode d\'affichage',
  'search.results.form.configuration.result.MAP.layers': 'Gestion des Layers',
  'search.results.form.configuration.result.MAP.layers.name': 'Nom',
  'search.results.form.configuration.result.MAP.layers.enable': 'Activer',
  'search.results.form.configuration.result.MAP.layers.background': 'Fond de carte',
  'search.results.form.configuration.result.MAP.layers.not.enabled': 'Désactivé',
  'search.results.form.configuration.result.MAP.layers.url': 'URL',
  'search.results.form.configuration.result.MAP.layers.type': 'Type',
  'search.results.form.configuration.result.MAP.layers.layersName': 'Noms des layers',
  'search.results.form.configuration.result.MAP.layers.conf': 'Configuration (optionelle)',
  'search.results.form.configuration.result.MAP.background.layer.conf.invalid': 'Format JSON invalide',
  'search.results.form.configuration.result.MAP.layers.title': 'Layer',
  'search.results.form.configuration.result.MAP.engine': 'Moteur graphique',

  // User messages
  'search.results.tab.main.results': 'Résultats',
  'search.results.tab.description': 'Description',
  'search.results.tab.tag.results': '{tabLabel}',
  'search.results.configure.actions.option': 'Actions',
  'search.results.configure.columns.option': 'Colonnes',
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
  'search.results.configure.columns.move.tooltip': 'Déplacer cette colonne',
  'search.results.configure.columns.move.column.at.first.position': 'En premier',
  'search.results.configure.columns.move.column.after': 'Après {columnLabel}',
  'search.results.configure.sorting.column.priority': 'Priorité',
  'search.results.configure.sorting.column.order': 'Ordre',
  'search.results.configure.sorting.column.label': 'Label',
  'search.results.configure.sorting.dialog.reset': 'Réinitialiser',
  'search.results.configure.sorting.dialog.reset.tooltip': 'Réinitialiser les tris à leur état initial',
  'search.results.configure.sorting.dialog.cancel': 'Annuler',
  'search.results.configure.sorting.dialog.confirm': 'Confirmer',
  'search.results.configure.sorting.move.column.at.first.position': 'En premier',
  'search.results.configure.sorting.move.column.after': 'Après {columnLabel}',
  'search.results.configure.sorting.move.tooltip': 'Déplacer cette colonne',
  'search.results.configure.sorting.asc.title': 'Modifie l\'ordre de ce tri d\'ascendant à descendant',
  'search.results.configure.sorting.desc.title': 'Modifie l\'ordre de ce tri de descendant à ascendant',
  'search.results.configure.sorting.delete.title': 'Supprimer le tri',
  'search.results.configure.sorting.create.tooltip': 'Créer un nouveau tri',
  'search.results.configure.sorting.create.before.position': 'Ajout un tri avant',
  'search.results.configure.sorting.create.after.position': 'Ajout un tri après',
  'search.results.configure.sorting.create.new.sort': 'Nouveau tri',
  'search.results.configure.sorting.create.new.sort.input': 'Selectionner un attribut',

  'search.results.default.tab.label.for.DATA': 'Données',
  'search.results.default.tab.label.for.DATASET': 'Jeux de données',
  'search.results.default.tab.label.for.COLLECTION': 'Collections',
  'search.results.toggle.filters': 'Filtres',
  'search.results.toggle.sort': 'Tri',
  'view.type.selector.tooltip.for.LIST': 'Afficher les résultats en liste',
  'view.type.selector.tooltip.for.TABLE': 'Afficher les résultats dans un tableau',
  'view.type.selector.tooltip.for.MAP': 'Afficher les résultats sur une carte',
  'view.type.selector.tooltip.for.QUICKLOOK': 'Afficher les résultats en image',
  'search.results.show.search.pane.label': 'Rechercher',
  'search.results.show.search.pane.title': 'Afficher le volet de recherche',
  'search.results.refresh.label': 'Rafraîchir',
  'search.results.refresh.title': 'Rafraîchir les données affichées',
  'search.results.search.pane.title': 'Rechercher dans les résultats',
  'search.results.search.pane.close.tooltip': 'Fermer le volet',
  'search.results.search.pane.history.label': 'Historique',
  'search.results.search.pane.history.title': 'Historique de recherche',
  'search.results.search.pane.plugins.label': 'Retour',
  'search.results.search.pane.plugins.title': 'Retour à la recherche',
  'search.results.search.pane.reset.label': 'Effacer',
  'search.results.search.pane.reset.title': 'Effacer toute saisie dans les critères',
  'search.results.search.pane.search.label': 'Rechercher',
  'search.results.search.pane.search.title': 'Appliquer les critères de recherches définis',
  'search.results.search.pane.save.label': 'Enregistrer',
  'search.results.search.pane.save.title': 'Enregistrer les critères de recherches',
  'download.tooltip': 'Télécharger',
  'no.download.tooltip': 'Aucun fichier téléchargeable',
  'download.quota.consumed.tooltip': 'Fonctionnalité de téléchargement désactivée',
  'show.entity.services.tooltip': 'Services',
  'show.description.tooltip': 'Détail',
  'filter.related.data': 'Afficher les données',
  'add.to.cart.tooltip': 'Ajouter l\'élément à mon panier',
  'add.selection.to.cart.label': 'Ajouter au panier',
  'add.selection.to.cart.tooltip': 'Ajouter les éléments sélectionnés à mon panier',
  'zoom.to.product.tooltip': 'Zoomer sur ce produit sur la carte',
  'open.zoomed.picture.tooltip': 'Visualiser l\'imagette',
  'results.no.content.title': 'Pas de résultat',
  'results.no.content.subtitle': 'Votre recherche n\'a donné aucun résultat. Essayez de modifier vos critères',
  'results.loading.title': 'Recherche',
  'results.loading.subtitle': 'Recherche en cours ...',
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
  'search.filter.geometry.entity.private': 'Donnée privée',
  'search.filter.geometry.label': 'Zone',
  'search.filter.search.toponym.label': '{toponymLabel} {toponymCopyrights}',
  'search.filter.search.toponym.label.not.found': 'Toponyme : Inconnu',
  'search.filter.entities.selection.label': 'Entités ({count})',
  'search.filter.search.criteria.label': 'Recherche',
  'search.filter.static.reactive': 'Réactiver ce critère',

  'results.quicklooks.picture.alt': 'Imagette',
  'results.map.tools.tooltip.for.PICK_ON_CLICK': 'Sélectionner des entités',
  'results.map.tools.tooltip.for.DRAW_RECTANGLE': 'Dessiner une zone de recherche',
  'results.map.tools.tooltip.for.MODE_3D': 'Mode 3D',
  'results.map.tools.tooltip.for.MODE_2D': 'Mode 2D',
  'results.map.tools.tooltip.opacity': 'Changer l\'opacité de la couche',
  'results.map.tools.opaque': 'Opaque',
  'results.map.tools.transparent': 'Transparent',
  'results.map.search.hintText': 'Rechercher un toponyme...',

  'results.map.help.title': 'Guide des fonctionnalités',
  'results.map.help.tooltip.close': 'Fermer l\'aide',
  'results.map.help.action.close': 'Fermer ce message et ne plus me l\'afficher',
  'results.map.help.draw.title': 'Dessiner une zone',
  'results.map.help.draw.first_sentence': 'Vous pouvez dessiner un rectangle pour rechercher les produits dans cette zone.',
  'results.map.help.draw.snd_sentence': 'Cette option est disponible dans la barre d\'outil de la carte.',
  'results.map.help.draw.thr_sentence': 'Très utile pour vérifier qu\'une zone contient des données !',
  'results.map.help.toponym.title': 'Toponymes',
  'results.map.help.toponym.first_sentence': 'Nous apportons des milliers de toponymes pour restreindre votre recherche à une zone.',
  'results.map.help.toponym.snd_sentence': 'Utilisez le moteur de recherche de toponyme pour rechercher un lieu.',
  'results.map.help.upload.title': 'Emprise personnalisée',
  'results.map.help.upload.first_sentence': 'Vous pouvez glisser-déposer sur la carte votre fichier contenant un polygone.',
  'results.map.help.upload.snd_sentence': 'Formats autorisées: shapefile zip, KML, KMZ et GeoJSON - Doit contenir un seul polygone ou un multi polygone.',

  // Search history tab
  'search.history.loading.content.title': 'Chargement...',
  'search.history.no.content.title': 'Rien à afficher',
  'search.history.no.content.message': 'Pas d\'historique de recherche',

  // Save search history tab
  'search.history.save.title': 'Entrer un label pour votre recherche',
  'search.history.update.title': 'Confirmer la mise à jour de l\'élément',
  'search.history.save.cancel': 'Annuler',
  'search.history.save.confirm': 'Confirmer',
}

export default messages
