import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  'fragment.list.title': 'Liste des fragments de modèles de données',
  'fragment.list.subtitle': 'Un fragment est un ensemble cohérent d\'attributs',
  'fragment.list.table.name': 'Nom',
  'fragment.list.table.description': 'Description',
  'fragment.list.table.actions': 'Actions',
  'fragment.list.action.add': 'Ajouter',
  'fragment.list.action.cancel': 'Annuler',
  'fragment.list.action.edit': 'Editer',
  'fragment.list.action.delete': 'Supprimer',
  'fragment.list.action.export': 'Télécharger',
  'fragment.list.delete.title': 'Supprimer le regroupement d\'attribut {name} ?',
  'fragment.list.delete.conditions': 'Pour supprimer un fragment, assurez-vous qu\'il n\'est associé à aucun attribut en les supprimant depuis l\'écran de configuration des attributs',

  'fragment.edit.title': 'Editer le fragment {name}',
  'fragment.create.title': 'Créer un fragment',
  'fragment.form.name': 'Nom du fragment',
  'fragment.form.fragment': 'Fragment',
  'fragment.form.description': 'Description',
  'fragment.form.file': 'Ou envoyez un fichier XML contenant le fragment et ses attributs:',
  'fragment.form.action.cancel': 'Annuler',
  'fragment.form.action.submit': 'Sauvegarder',
}, Locales.fr)

export default messages
