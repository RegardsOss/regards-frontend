import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  'role.list.title': 'Liste des roles',
  'role.list.subtitle': 'Roles utilisateurs pour le project courrant',
  'role.list.table.name': 'Nom',
  'role.list.table.parentRole': 'Role parent',
  'role.list.table.isCorsRequestsAuthorized': 'Autorise les requêtes CORS',
  'role.list.table.actions': 'Actions',
  'role.list.action.add': 'Ajouter',
  'role.list.action.cancel': 'Annuler',
  'role.list.value.false': 'Faux',
  'role.list.value.true': 'Vrai',


  'role.edit.title': 'Editer le rôle {name}',
  'role.create.title': 'Ajouter un rôle',
  'role.form.name': 'Nom du rôle',
  'role.form.description': 'Description',
  'role.form.isCorsRequestsAuthorized': 'Autoriser les requêtes CORS',
  'role.form.authorizedAdresses': 'Définir la liste des adresses IP autorisée (si non spécifié, le filtre est désactivé)',
  'role.form.action.cancel': 'Annuler',
  'role.form.action.submit': 'Sauvegarder',
  'role.form.parentRole': 'Role parent',

  'form-utils.enumform.authorizedAddresses.addvalue': 'Ajouter une valeur',
  'form-utils.enumform.addinput': 'Nouvelle adresse IP',
  'form-utils.enumform.add': 'Ajouter une nouvelle adresse IP autorisée',
  'form-utils.enumform.valueinput': 'IP autorisée',
  'form-utils.enumform.novalue': 'Aucune IP spécifiée',
}, Locales.fr)

export default messages
