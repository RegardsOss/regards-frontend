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
 * Module messages for french language (reports common form messages too)
 * @author Raphaël Mechali
 */
const messages = {
  ...Locales.fr,
  'order.cart.configuration.show.datasets': 'Afficher les jeux de données',
  'order-cart.module.title': 'Mon panier',
  'order-cart.module.not.logged.title': 'Utilisateur non authentifié',
  'order-cart.module.not.logged.messsage': 'Le panier n\'est accessible qu\'aux utilisateurs authentifiés. Vous pouvez vous connecter en utilisant le bouton "Connexion"',
  'order-cart.module.empty.basket.title': 'Panier vide',
  'order-cart.module.empty.basket.messsage': 'Votre panier ne contient aucun objet à commander. Vous pouvez en ajouter via les pages de recherche, de graphe et de résultats disponibles dans le menu de navigation',
  'order-cart.module.order.label': 'Commander',
  'order-cart.module.order.tooltip': 'Finaliser la commande du contenu du panier',
  'order-cart.module.order.confirmation.title': 'Commander',
  'order-cart.module.order.confirmation.message': 'Cette action démarrera la commande et videra le panier. Vos commandes seront ensuite affichées. Voulez vous continuer?',
  'order-cart.module.clear.label': 'Effacer',
  'order-cart.module.clear.tooltip': 'Effacer le contenu du panier',
  'order-cart.module.clear.confirmation.title': 'Vider le panier',
  'order-cart.module.clear.confirmation.message': 'Cette action effacera l\'intégralité des éléments du panier',
  'order-cart.module.basket.table.column.identifier': 'Nom du dataset / date de l\'ajout',
  'order-cart.module.basket.table.column.objects.count': 'Nombre d\'objets',
  'order-cart.module.basket.table.column.files.count': 'Nombre de fichiers',
  'order-cart.module.basket.table.column.files.size': 'Taille totale des fichiers',
  'order-cart.module.basket.table.column.options': 'Options',
  'order-cart.module.basket.table.delete.dataset.tooltip': 'Supprimer les selections d\'objets de ce jeu de données',
  'order-cart.module.basket.table.delete.dataset.confirm.message': 'Cette opération supprimera du panier tous les objets de toutes les sélections de ce jeu de données. Elle ne peut pas être annulée',
  'order-cart.module.basket.table.delete.dataset.confirm.title': 'Supprimer les sélections',
  'order-cart.module.basket.table.delete.selection.tooltip': 'Supprimer la sélection',
  'order-cart.module.basket.table.delete.selection.confirm.message': 'Cette opération supprimera du panier tous les objets de cette sélection. Elle ne peut pas être annulée',
  'order-cart.module.basket.table.delete.selection.confirm.title': 'Supprimer la sélection',
  'order-cart.module.basket.table.show.selection.detail.tooltip': 'Afficher la liste des objets',
  'order-cart.module.basket.items.group.selection.detail.title': '{dataset}: Objets sélectionnés le {date}',
  'order-cart.module.basket.items.group.selection.detail.no.data.title': 'Aucun élément',
  'order-cart.module.basket.items.group.selection.detail.no.data.message': 'Il n\'y a plus d\'élément dans ce groupe de sélection. Ceux-ci ont pu être supprimés ou leurs droits d\'accès ont pus être modifiés.',
}

export default messages
