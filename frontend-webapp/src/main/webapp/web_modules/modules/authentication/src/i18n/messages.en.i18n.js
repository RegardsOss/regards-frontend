/**
 * LICENSE_PLACEHOLDER
 **/
import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  'login.username': 'E-mail address',
  'login.password': 'Password',
  'login.button': 'Log in',
  'login.cancel': 'Cancel',
  'login.title': 'Connect to the admin panel',
  'authentication.error': 'Invalid Username/Password',
  'authentication.error.500': 'Server unavailable',

  // common to account requests forms (reset password and unlock account
  'account.request.form.mail': 'E-mail address',
  'account.request.form.back': 'BACK',
  'account.request.form.send': 'SEND',
  'account.request.form.send.failed': 'Unknown e-mail address, please check spelling. Does this account exist?',
  // request account password request form
  'reset.password.request.message': 'Please enter your mail address to receive a reset password link',
  'reset.password.request.title': 'Reset password',
  // unlock account request form
  'unlock.account.request.message': 'Please enter your mail address to request account unlocking',
  'unlock.account.request.title': 'Unlock user account',

  // account operations results
  'unlock.request.sent.title': 'Unlock request sent',
  'unlock.request.sent.message': 'Your request has been sent, please wait for unlock confirmation email',
  'unlock.request.sent.option': 'Back',

  'unlock.request.done.title': 'Account unlocked',
  'unlock.request.done.message': 'Your account has been successfully unlocked, you can proceed to site',
  'unlock.request.done.option': 'Proceed',

  'unlock.request.token.expired.title': 'Unlock account failed',
  'unlock.request.token.expired.message': 'Your request has expired, please request unlock again',
  'unlock.request.token.expired.option': 'Request again',

  'reset.password.sent.title': 'Reset password sent',
  'reset.password.sent.message': 'Your request has been sent, please wait for reset email',
  'reset.password.sent.option': 'Back',

  'reset.password.token.expired.title': 'Reset password failed',
  'reset.password.token.expired.message': 'Your request has expired, please request password reset again',
  'reset.password.token.expired.option': 'Request again',

  'reset.password.done.title': 'Password reset',
  'reset.password.done.message': 'Your password has been successfully reset, you can proceed to site',
  'reset.password.done.option': 'Proceed',

  // reset password update (after receiving mail)
  'reset.password.update.request.title': 'Reset password',
  'reset.password.update.request.message': 'Please provide your new password to complete your account update',
  'reset.password.update.new.password': 'New password',
  'reset.password.update.confirm.password': 'Confirm password',
  'reset.password.update.new.reset.request': 'New request',
  'reset.password.update.token.invalid': 'Your previous request is expired, please send a new change request password',
}, Locales.en)

export default messages
