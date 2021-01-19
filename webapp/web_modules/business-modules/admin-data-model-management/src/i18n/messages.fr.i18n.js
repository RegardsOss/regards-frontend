/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

const messages = {
  'model.list.title': 'Modèles',
  'model.list.subtitle': 'Tous les modèles de données du projet',
  'model.list.table.filter.name': 'Filtrer sur le nom des modèles',
  'model.list.table.name': 'Nom',
  'model.list.table.description': 'Description',
  'model.list.table.type': 'Type',
  'model.list.table.actions': 'Actions',
  'model.list.action.add': 'Ajouter',
  'model.list.action.cancel': 'Annuler',
  'model.list.action.export': 'Télécharger',
  'model.list.action.bind': 'Associer des attributs',
  'model.list.action.edit': 'Éditer',
  'model.list.action.duplicate': 'Dupliquer',
  'model.list.action.delete': 'Supprimer',
  'model.list.delete.title': 'Supprimer le modèle {name} ?',
  'model.list.table.no.content.title': 'Rien à afficher',
  'model.list.no.content.message': "Aucun modèle de données n'a été créé pour ce projet",

  'model.type.dataset': 'Jeu de données',
  'model.type.data': 'Données',
  'model.type.collection': 'Collection',

  'model.edit.title': 'Éditer le modèle {name}',
  'model.create.title': 'Ajouter un modèle',
  'model.duplicate.title': 'Dupliquer le modèle {name}',
  'model.duplicate.warning': 'Attention, les plugins de calcul associés aux attributs du modèle d\'origine ne seront pas reportés',
  'model.form.name': 'Nom',
  'model.form.description': 'Description',
  'model.form.type': 'Type',
  'model.form.file': 'Ou envoyer un fichier XML contenant le modèle, ses fragments et ses attributs',
  'model.form.action.cancel': 'Annuler',
  'model.form.action.submit': 'Sauvegarder',
  ...Locales.fr,
}

export default messages
