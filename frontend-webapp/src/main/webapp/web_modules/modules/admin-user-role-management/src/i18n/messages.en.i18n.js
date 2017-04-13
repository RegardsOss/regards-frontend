import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  'role.list.title': 'Role list',
  'role.list.subtitle': 'User role list for the current project',
  'role.list.table.name': 'Name',
  'role.list.table.parentRole': 'Parent role',
  'role.list.table.actions': 'Actions',
  'role.list.action.add': 'Add',
  'role.list.action.cancel': 'Cancel',
  'role.list.value.false': 'False',
  'role.list.value.true': 'True',
  'role.list.delete.message' : 'Confirm deletion of role {name}',


  'role.edit.title': 'Edit the role {name}',
  'role.create.title': 'Add a new role',
  'role.form.name': 'Role name',
  'role.form.description': 'Description',
  'role.form.authorizedAdresses': 'Define the IP adresses list autorized',
  'role.form.action.cancel': 'Cancel',
  'role.form.action.submit': 'Save',
  'role.form.parentRole': 'Parent role',

  'form-utils.enumform.authorizedAddresses.addvalue': 'Add a new value',
  'form-utils.enumform.addinput': 'New IP address',
  'form-utils.enumform.add': 'Add a new IP address autorized',
  'form-utils.enumform.valueinput': 'IP autorized',
  'form-utils.enumform.novalue': 'No IP specified',
}, Locales.en)

export default messages
