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
 * Module messages for french language (reports common form messages too)
 * @author Raphaël Mechali
 */
const messages = {
  ...Locales.fr,
  'order.cart.configuration.show.datasets': 'Afficher les jeux de données',
  'order-cart.module.title': 'Mon panier',
  'order-cart.module.not.logged.title': 'Utilisateur non authentifié',
  'order-cart.module.not.logged.message': 'Le panier n\'est accessible qu\'aux utilisateurs authentifiés. Vous pouvez vous connecter en utilisant le bouton "Connexion"',
  'order-cart.module.empty.basket.title': 'Panier vide',
  'order-cart.module.empty.basket.message': 'Votre panier ne contient aucun objet à commander. Vous pouvez en ajouter via les pages de recherche, de graphe et de résultats disponibles dans le menu de navigation',
  'order-cart.module.order.label': 'Commander',
  'order-cart.module.order.tooltip': 'Finaliser la commande du contenu du panier',
  'order-cart.module.order.confirmation.title': 'Commander',
  'order-cart.module.order.confirmation.message': 'Voulez-vous démarrer la commande des données au panier?',
  'order-cart.module.order.confirmation.label.field': 'Libellé',
  'order-cart.module.order.confirmation.label.hint': 'libellé optionnel désignant la commande à lancer',
  'order-cart.module.order.confirmation.server.error.TOO_MANY_CHARACTERS_IN_LABEL': 'Le libellé est trop long (50 caractères autorisés)',
  'order-cart.module.order.confirmation.server.error.LABEL_NOT_UNIQUE_FOR_OWNER': 'Vous avez déjà une commande portant ce libellé',
  'order-cart.module.order.confirmation.server.error.UNKNOWN_SERVER_ERROR': 'Une erreur inconnue est survenue en démarrant la commande',
  'order-cart.module.order.confirmation.cancel': 'Annuler',
  'order-cart.module.order.confirmation.confirm': 'Commander',
  'order-cart.module.clear.label': 'Effacer',
  'order-cart.module.clear.tooltip': 'Effacer le contenu du panier',
  'order-cart.module.clear.confirmation.title': 'Vider le panier',
  'order-cart.module.clear.confirmation.message': 'Cette action effacera l\'intégralité des éléments du panier',
  'order-cart.module.objects.count.header.message': `Le panier contient actuellement {effectiveObjectsCount, plural, 
    one {une donnée}
    other {{effectiveObjectsCount} données}
  } à commander`,
  'order-cart.module.objects.count.size.message': 'La taille totale des fichiers de la commande est {totalSize}',
  'order-cart.module.duplicate.objects.message.title': 'Données ajoutées plusieurs fois',
  'order-cart.module.duplicate.objects.message': 'Lors de vos sélections successives, plusieurs données identiques ({duplicatedObjectsCount}) ont été ajoutées. Seules les données uniques ({effectiveObjectsCount}) seront commandées.',
  'order-cart.module.duplicate.objects.message.close': 'Fermer',
  'order-cart.module.basket.table.column.selection': 'Sélection',
  'order-cart.module.basket.table.column.objects.count': 'Nombre d\'objets',
  'order-cart.module.basket.table.column.files.size': 'Taille totale des fichiers',
  'order-cart.module.basket.table.column.quota.summary': 'Téléchargements consommés',
  'order-cart.module.basket.table.row.total.label': 'Total',
  'order-cart.module.basket.table.cell.total.quota.label': `{totalQuota} ({allowedQuota} autorisé{allowedQuota, plural, 
    =0 {} 
    one {}
    other {s}
  })`,
  'order-cart.module.basket.table.cell.total.quota.tooltip': `{totalQuota} téléchargement{totalQuota, plural, 
    =0 {} 
    one {}
    other {s}
  } / {allowedQuota} autorisé{allowedQuota, plural, 
    =0 {} 
    one {}
    other {s}
  } ({afterOrderQuota} restant).{warningMessage}`,
  'order-cart.module.basket.table.cell.total.quota.warning.message': ' Votre nombre de téléchargement restant après commande sera faible.',
  'order-cart.module.basket.table.cell.total.quota.consumed.message': ' Vous ne pourrez probablement pas télécharger intégralement la commande.',
  'order-cart.module.basket.table.delete.dataset.tooltip': 'Supprimer les sélections d\'objets de ce jeu de données',
  'order-cart.module.basket.table.delete.dataset.confirm.message': 'Cette opération supprimera du panier tous les objets de toutes les sélections de ce jeu de données. Elle ne peut pas être annulée',
  'order-cart.module.basket.table.delete.dataset.confirm.title': 'Supprimer les sélections',
  'order-cart.module.basket.table.delete.selection.tooltip': 'Supprimer la sélection',
  'order-cart.module.basket.table.delete.selection.confirm.message': 'Cette opération supprimera du panier tous les objets de cette sélection. Elle ne peut pas être annulée',
  'order-cart.module.basket.table.delete.selection.confirm.title': 'Supprimer la sélection',
  'order-cart.module.basket.table.show.selection.detail.tooltip': 'Afficher la liste des objets',
  'order-cart.module.basket.items.group.selection.detail.title.with.dataset': '{dataset}: Objets sélectionnés le {date}',
  'order-cart.module.basket.items.group.selection.detail.title.without.dataset': 'Objets sélectionnés le {date}',
  'order-cart.module.basket.items.group.selection.detail.close': 'Fermer',
  'order-cart.module.basket.items.group.selection.detail.no.data.title': 'Aucun élément',
  'order-cart.module.basket.items.group.selection.detail.no.data.message': 'Il n\'y a plus d\'élément dans ce groupe de sélection. Ceux-ci ont pu être supprimés ou leurs droits d\'accès ont pu être modifiés.',
  // adds capicity formatting messages
  ...storage.messages.fr,
}

export default messages
