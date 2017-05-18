import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  'group.list.title': 'Gestion des groupes d\'accès',
  'group.list.subtitle': 'Un groupe d\'accès permet d\'autoriser un groupe d\'utilisateur à accéder à des jeux de données, partiellement ou dans leur totalité',
  'group.list.table.name': 'Nom',
  'group.list.table.nbUser': 'Nombre d\'utilisateur(s)',
  'group.list.table.actions': 'Actions',
  'group.list.action.cancel': 'Annuler',
  'group.list.action.add': 'Créer',
  'group.list.delete.message': 'Etes vous sûr de vouloir supprimer le groupe d\'accès {name}',

  'group.create.title': 'Creation d\'un groupe d\'accès',
  'group.edit.title': 'Edition du groupe d\'accès {name}',
  'group.duplicate.title': 'Duplication du groupe d\'accès {name}',
  'group.form.name': 'Nom',
  'group.form.action.cancel': 'Annuler',
  'group.form.action.save': 'Sauvegarder',
  'group.form.private': 'Accès restreint',
  'invalid.max_32_carac': 'Le nom d\'un groupe d\'accès ne peut dépasser 32 caractères',
}, Locales.fr)

export default messages

