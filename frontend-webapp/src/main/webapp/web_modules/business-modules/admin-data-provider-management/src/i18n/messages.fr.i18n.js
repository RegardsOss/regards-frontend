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

const messages = Object.assign({
  'generation-chain.empty.title': 'Aucune chaîne définie',
  'generation-chain.list.title': 'Configuration des chaînes de génération',
  'generation-chain.list.subtitle': 'Les chaînes de générations correspondent à l\'enchaînement de traitements réalisés sur les nouvelles données détectée avant leur ajout dans le catalogue de données.',
  'generation-chain.addnew.button': 'Ajouter',
  'generation-chain.back.button': 'Retour',
  'generation-chain.edit.tooltip': 'Editer',

  'generation-chain.delete.confirm.title': 'Etes-vous sûr de vouloir suppriler la chaîne de traitement : {label}',

  'generation-chain.info.message': 'Vous pouvez définir pour chaque étape de la chaîne un traitement spécifique grâce aux plugins suivants.',
  'generation-chain.info.message.step1': '1 - Scan plugin: Comment chercher les nouvelles données à acquérir.',
  'generation-chain.info.message.step2': '2 - Check plugin: Comment vérifier la validité des nouvelles données à acquérir.',
  'generation-chain.info.message.step3': '3 - Generate SIP plugin: Comment générer les métadonnées associées aux nouvelles données à acquérir.',
  'generation-chain.info.message.step4': '4 - Post processing plugin: Traitement à réaliser après la génération des données à acquérir.',
}, Locales.fr)

export default messages
