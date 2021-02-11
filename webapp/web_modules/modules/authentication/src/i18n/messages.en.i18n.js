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
import { Locales as MetadataLocales } from '@regardsoss/user-metadata-common'

const messages = {
  'authentication.username': 'Login or E-mail address',
  'authentication.password': 'Password',
  'authentication.button': 'Log in',
  'authentication.cancel': 'Cancel',
  'authentication.message': 'Enter your username and password to log in',
  'authentication.error.ACCOUNT_UNKNOWN': 'Unknown user login and / or password',
  'authentication.error.ACCOUNT_PENDING': 'Your REGARDS account is not ready yet. You will receive a notification by email when it changes',
  'authentication.error.ACCOUNT_INACTIVE': 'Your account is inactive. Contact system administrator',
  'authentication.error.ACCOUNT_INACTIVE_PASSWORD': 'Your password has expired please renew your password',
  'authentication.error.ACCOUNT_LOCKED': 'Your account is locked. To unlock it, click "Account locked?"',
  'authentication.error.USER_UNKNOWN': 'You do not have access to the project. To ask access, click "New user?", with option "I already have a REGARDS user account"',
  'authentication.error.USER_WAITING_ACCESS': 'Your project access has not yet been validated. You will be notified by email on change',
  'authentication.error.USER_WAITING_EMAIL_VERIFICATION': 'You have not yet validated your account. Please click on the validation link in the email you have received',
  'authentication.error.USER_ACCESS_DENIED': 'Your project access  has been denied',
  'authentication.error.USER_ACCESS_INACTIVE': 'Your project access is inactive. Please contact project administrator',
  'authentication.error.INSTANCE_ACCESS_DENIED': 'Your access to the instance administration panel has been refused',
  'authentication.error.UNKNOWN_ERROR': 'Server is currently unavailable. Please retry later',
  'authentication.goto.reset.password': 'Lost password?',
  'authentication.goto.ask.access': 'New user?',
  'authentication.goto.unlock.account': 'Account locked?',

  // common to account requests forms (reset password and unlock account
  'account.request.form.mail': 'E-mail address',
  'account.request.form.back': 'Back',
  'account.request.form.send': 'Send',

  // reset account password request form
  'ask.reset.password.form.message': 'Enter your mail address to receive a reset password link',
  'ask.reset.password.form.title': 'Reset password',
  'ask.reset.password.form.send.failed': '{status, plural, '
    + '=404 { Entered e-mail address is unknown. } '
    + 'other: {An unknown error occurred (#)}}',

  // unlock account request form
  'ask.unlock.account.form.message': 'Enter your mail address to request account unlocking',
  'ask.unlock.account.form.title': 'Unlock user account',
  'ask.unlock.account.form.send.failed': '{status, plural, '
    + '=403 {That related account is not locked}'
    + '=404 {Entered e-mail address is unknown.}'
    + 'other: {An unknown error occurred (#)}}',

  // ask project access form
  'ask.project.access.request.title': 'Request project access',
  'ask.project.access.request.message': 'Enter below your personal data to request access, or provide your REGARDS account email address if you own already one.',
  'ask.project.access.using.existing.account': 'I already have a REGARDS access to another project',
  'ask.project.access.mail': 'E-mail address (*)',
  'ask.project.access.first.name': 'Firstname (*)',
  'ask.project.access.last.name': 'Lastname (*)',
  'ask.project.access.new.password': 'Password (*)',
  'ask.project.access.confirm.password': 'Confirm password (*)',
  'ask.project.access.send': 'Send',
  'ask.project.access.form.back': 'Cancel',
  'ask.create.account.error.409': 'That email address is already in use',
  'ask.create.account.error.unknown': 'An unknown error occurred ({status})',
  'ask.create.user.error.404': 'There is no REGARDS user for this email address',
  'ask.create.user.error.409': 'You have already asked access to this project',
  'ask.create.user.error.unknown': 'An unknown error occurred ({status})',

  // reset password operation
  'ask.reset.password.sent.title': 'Reset password sent',
  'ask.reset.password.sent.message': 'Your request has been sent, please wait for reset email',
  'ask.reset.password.sent.option': 'Back',
  'ask.reset.password.token.expired.title': 'Reset password failed',
  'ask.reset.password.token.expired.message': 'Your request has expired, please request password reset again',
  'ask.reset.password.token.expired.option': 'Back',
  'reset.password.done.title': 'Password reset',
  'reset.password.done.message': 'Your password has been successfully reset, you can proceed to site',
  'reset.password.done.option': 'Login',

  // Ask project access operation
  'ask.project.access.sent.title': 'Project access request sent',
  'ask.project.access.sent.message': 'Your request to access project data has been sent. Its acknowledgment will be noticed to you by email',
  'ask.project.access.sent.option': 'Back',

  // New account operation
  'create.account.sent.title': 'Create account sent',
  'create.account.sent.message': 'Your request has been sent, you will receive an email to activate your account',
  'create.account.sent.option': 'Back',
  'new.account.validated.title': 'User account validated',
  'new.account.validated.message': 'Your user account has been validated',
  'new.account.validated.option': 'Login',
  'new.account.token.expired.title': 'Account creation failed',
  'new.account.token.expired.message': 'Your user account cannot be validated, please retry creating it',
  'new.account.token.expired.option': 'Back',

  // Validating new account
  'new.acount.validating.title': 'Account validation',
  'new.acount.validating.message': 'We are handling the validation request, please wait',

  // unlock account operation
  'ask.unlock.account.sent.title': 'Unlock request sent',
  'ask.unlock.account.sent.message': 'Your request has been sent, please wait for unlock confirmation email',
  'ask.unlock.account.sent.option': 'Back',
  'ask.unlock.account.token.expired.title': 'Unlock account failed',
  'ask.unlock.account.token.expired.message': 'Your request has expired, please request unlock again',
  'ask.unlock.account.token.expired.option': 'Back',
  'unlock.account.done.title': 'Account unlocked',
  'unlock.account.done.message': 'Your account has been successfully reset unlocked, you can proceed to site',
  'unlock.account.done.option': 'Login',

  // password update form (after receiving reset mail)
  'reset.password.update.request.title': 'Reset password',
  'change.password.update.request.title': 'Change your password',
  'reset.password.update.request.message': 'Please provide the new password to complete operation. {passwordRules}',
  'change.password.update.request.message': 'Please provide old and new password. {passwordRules}',
  'change.password.update.old.password': 'Current password',
  'reset.password.update.new.password': 'New password',
  'reset.password.update.confirm.password': 'Confirm password',
  'reset.password.update.send': 'Send',
  'reset.password.update.error': 'Error changing password. Please check password information provided.',
  'reset.password.update.cancel': 'Cancel',

  // finish unlock account loading pane
  'finish.unlock.account.title': 'Unlocking account',
  'finish.unlock.account.message': 'We are unlocking your account, please wait...',

  // session locked pane
  'session.locked.title': 'Session locked',
  'session.locked.subtitle': 'Your session has expired, please enter your password below to unlock it',
  'session.locked.password': 'Password',
  'session.locked.button': 'Unlock',
  'session.locked.error': 'Invalid identifiers',

  ...Locales.en,
  ...MetadataLocales.en,
}

export default messages
