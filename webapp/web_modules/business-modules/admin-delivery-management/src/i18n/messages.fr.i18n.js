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

/**
 * @author Théo Lasserre
 */
const messages = {
  ...Locales.fr,
  // Settings
  'delivery.settings.card.title': 'Paramètres des livraisons',
  'delivery.settings.card.subtitle': 'Gérer les paramètres de configuration des livraisons',
  'delivery.settings.field.request_ttl': 'Durée en secondes avant expiration d\'une demande de livraison',
  'delivery.settings.field.build_bucket': 'Bucket sur lequel seront déposés les fichiers pendant la construction de la commande',
  'delivery.settings.field.delivery_bucket': 'Bucket sur lequel seront déposés les archives ZIP de livraison une fois les commandes terminées',
  'delivery.settings.field.order_size_limit': 'Taille maximale en octets autorisée pour une commande. Cette valeur ne doit pas être supérieure à la taille d\'une sous-commande définie dans le microservice order. Le microservice delivery ne permet pas d\'effectuer plusieurs sous-commandes',
  'delivery.settings.field.s3_server': 'Serveur S3',
  'delivery.settings.field.s3_server.host': 'Adresse d\'accès au serveur S3',
  'delivery.settings.field.s3_server.port': 'Port d\'accès au serveur S3',
  'delivery.settings.field.s3_server.key': 'Clef de connexion au serveur S3',
  'delivery.settings.field.s3_server.secret': 'Mot de passe de connexion au serveur S3',
  'delivery.settings.field.s3_server.region': 'Région',
  'delivery.settings.field.s3_server.scheme': 'Schéma d\'URI',
  'delivery.settings.action.confirm': 'Confirmer',
  'delivery.settings.action.cancel': 'Annuler',
}

export default messages
