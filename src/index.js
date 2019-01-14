/**
 * Module to deal with available AIMS Public API endpoints
 */
const ALClient = require('@alertlogic/client');

const AIMSClient = function AIMSClient() {
  /**
   * Expose ALSession to AIMS client
   */
  this.ALClient = ALClient;

  /**
   * Get Account Details
   * GET
   * /aims/v1/:account_id/account
   * "https://api.cloudinsight.alertlogic.com/aims/v1/12345678/account"
   */
  this.getAccountDetails = async function getAccountDetails(accountId) {
    const accountDetails = await this.ALClient.Fetch({
      service_name: 'aims', account_id: accountId, path: '/account',
    });
    return accountDetails;
  };

  /**
   * List managed accounts
   * GET
   * /aims/v1/:account_id/accounts/:relationship
   * "https://api.cloudinsight.alertlogic.com/aims/v1/12345678/accounts/managed"
   */
  this.getManagedAccounts = async function getManagedAccounts(accountId, queryParams) {
    const managedAccounts = await this.ALClient.Fetch({
      service_name: 'aims', account_id: accountId, path: '/accounts/managed', params: queryParams,
    });
    return managedAccounts;
  };

  /**
   * List managed account IDs
   * GET
   * /aims/v1/:account_id/account_ids/:relationship
   * "https://api.cloudinsight.alertlogic.com/aims/v1/12345678/account_ids/managed"
   */
  this.getManagedAccountIds = async function getManagedAccounts(accountId, queryParams) {
    const managedAccountIds = await this.ALClient.Fetch({
      service_name: 'aims', account_id: accountId, path: '/account_ids/managed', params: queryParams,
    });
    return managedAccountIds;
  };

  /**
   * Update account MFA requirements
   * POST
   * /aims/v1/:account_id/account
   * -d '{"mfa_required": true}' "https://api.cloudinsight.alertlogic.com/aims/v1/12345678/account"
   */
  this.requireMFA = async function requireMFA(accountId, mfaRequired) {
    const mfa = await this.ALClient.Post({
      service_name: 'aims', account_id: accountId, path: '/account', data: `{mfa_required: ${mfaRequired}}`,
    });
    return mfa;
  };

  /**
   * Authenticate a user's identity
   * POST
   * /aims/v1/authenticate
   * -u username:password "https://api.cloudinsight.alertlogic.com/aims/v1/authenticate"
   */
  this.authenticate = async function authenticate(params, user, pass, mfa) {
    const access = await this.ALClient.Authenticate(params, user, pass, mfa);
    return access;
  };

  /**
   * Change a user's password
   * POST
   * /aims/v1/change_password
   * -d '{"email": "admin@company.com", "current_password": "hunter2", "new_password": "Fraudulent$Foes"}' "https://api.cloudinsight.alertlogic.com/aims/v1/change_password"
   */
  this.changePassword = async function changePassword(email, password, newPassword) {
    const changePass = await this.ALClient.Post({
      service_name: 'aims', path: '/change_password', data: `{email: ${email}, current_password: ${password}, new_password: ${newPassword}}`,
    });
    return changePass;
  };

  /**
   * Obtain Authentication Token Information (Account, User, Roles, etc.)
   * GET
   * /aims/v1/token_info
   * "https://api.cloudinsight.alertlogic.com/aims/v1/token_info"
   */
  this.tokenInfo = async function tokenInfo() {
    const tokenData = await this.ALClient.Fetch({
      service_name: 'aims', path: '/token_info',
    });
    return tokenData;
  };

  /**
   * Initiate the password reset process for a user
   * POST
   * /aims/v1/reset_password
   * -d '{"email": "admin@company.com", "return_to": "https://console.alertlogic.net"}' "https://api.cloudinsight.alertlogic.com/aims/v1/reset_password"
   */
  this.initiateReset = async function initiateReset(email, returnTo) {
    const reset = await this.ALClient.Post({
      service_name: 'aims', path: '/reset_password', data: `{email: ${email}, return_to: ${returnTo}}`,
    });
    return reset;
  };

  /**
   * Reset a user's password using a token
   * PUT
   * /aims/v1/reset_password/:token
   * -d '{"password": "hunter2"}' "https://api.cloudinsight.alertlogic.com/aims/v1/reset_password/69EtspCz3c4"
   */
  this.resetWithToken = async function resetWithToken(token, password) {
    const reset = await this.ALClient.Set({
      service_name: 'aims', path: `/reset_password/${token}`, data: `{password: ${password}}`,
    });
    return reset;
  };

  /**
   * Create a role
   * POST
   * /aims/v1/:account_id/roles
   * -d '{"name": "Super Mega Power User", "permissions": {"*:own:*:*": "allowed", "aims:own:grant:*":"allowed"}}' "https://api.cloudinsight.alertlogic.com/aims/v1/12345678/roles"
   */
  this.createRole = async function createRole(accountId, name, permissions) {
    const roleCreate = await this.ALClient.Post({
      service_name: 'aims', account_id: accountId, path: '/roles', data: `{name: ${name}, permissions: ${permissions}}`,
    });
    return roleCreate;
  };

  /**
   * Delete a role
   * DELETE
   * /aims/v1/:account_id/roles/:role_id
   * "https://api.cloudinsight.alertlogic.com/aims/v1/12345678/roles/C7C5BE57-F199-4F14-BCB5-43E31CA02842"
   */
  this.deleteRole = async function deleteRole(accountId, roleId) {
    const roleDelete = await this.ALClient.Delete({
      service_name: 'aims', account_id: accountId, path: `/roles/${roleId}`,
    });
    return roleDelete;
  };

  /**
   * Get global role, a role that is shared among accounts.
   * GET
   * /aims/v1/roles/:role_id
   * "https://api.cloudinsight.alertlogic.com/aims/v1/roles/2A33175D-86EF-44B5-AA39-C9549F6306DF"
   */
  this.getGlobalRole = async function getGlobalRole(roleId) {
    const role = await this.ALClient.Fetch({
      service_name: 'aims', path: `/roles/${roleId}`,
    });
    return role;
  };

  /**
   * Get role
   * GET
   * /aims/v1/:account_id/roles/:role_id
   * "https://api.cloudinsight.alertlogic.com/aims/v1/12345678/roles/2A33175D-86EF-44B5-AA39-C9549F6306DF"
   */
  this.getAccountRole = async function getAccountRole(accountId, roleId) {
    const role = await this.ALClient.Fetch({
      service_name: 'aims', account_id: accountId, path: `/roles/${roleId}`,
    });
    return role;
  };

  /**
   * List global roles, roles that are shared among all accounts.
   * GET
   * /aims/v1/roles
   * "https://api.cloudinsight.alertlogic.com/aims/v1/roles"
   */
  this.getGlobalRoles = async function getGlobalRoles() {
    const roles = await this.ALClient.Fetch({
      service_name: 'aims', path: '/roles',
    });
    return roles;
  };

  /**
   * List roles for an account. Global roles are included in the list.
   * GET
   * /aims/v1/:account_id/roles
   * "https://api.cloudinsight.alertlogic.com/aims/v1/12345678/roles"
   */
  this.getAccountRoles = async function getAccountRoles(accountId) {
    const roles = await this.ALClient.Fetch({
      service_name: 'aims', account_id: accountId, path: '/roles',
    });
    return roles;
  };

  /**
   * Update Role Name and Permissions
   * POST
   * /aims/v1/:account_id/roles/:role_id
   * -d '{"name": "Mega Power User", "permissions": {"*:own:*:*": "allowed", "aims:own:grant:*":"allowed"}}' "https://api.cloudinsight.alertlogic.com/aims/v1/12345678/roles/2A33175D-86EF-44B5-AA39-C9549F6306DF"
   */
  this.updateRole = async function updateRole(accountId, name, permissions) {
    const roleUpdate = await this.ALClient.Post({
      service_name: 'aims', account_id: accountId, path: '/roles', data: `{name: ${name}, permissions: ${permissions}}`,
    });
    return roleUpdate;
  };
  /**
   * Update Role Name
   * POST
   * /aims/v1/:account_id/roles/:role_id
   * -d '{"name": "Mega Power User"}' "https://api.cloudinsight.alertlogic.com/aims/v1/12345678/roles/2A33175D-86EF-44B5-AA39-C9549F6306DF"
   */
  this.updateRoleName = async function updateRoleName(accountId, name) {
    const updateRole = await this.ALClient.Post({
      service_name: 'aims', account_id: accountId, path: '/roles', data: `{name: ${name}}`,
    });
    return updateRole;
  };
  /**
   * Update Role Permissions
   * POST
   * /aims/v1/:account_id/roles/:role_id
   * -d '{"permissions": {"*:own:*:*": "allowed", "aims:own:grant:*":"allowed"}}' "https://api.cloudinsight.alertlogic.com/aims/v1/12345678/roles/2A33175D-86EF-44B5-AA39-C9549F6306DF"
   */
  this.updateRolePermissions = async function updateRolePermissions(accountId, permissions) {
    const updateRole = await this.ALClient.Post({
      service_name: 'aims', account_id: accountId, path: '/roles', data: `{permissions: ${permissions}}`,
    });
    return updateRole;
  };

  /**
   * Enroll an MFA device for a user
   * POST
   * /aims/v1/user/mfa/enroll
   *  "https://api.cloudinsight.alertlogic.com/aims/v1/user/mfa/enroll" \
   * -H "Content-Type: application/json" \
   * -H "X-Aims-Session-Token: a3e12fwafge1g9" \
   * -d @- << EOF
   * {
   *    "mfa_uri": "otpauth://totp/Alert%20Logic:admin@company.com?secret=GFZSA5CINFJSA4ZTNNZDG5BAKM2EMMZ7&issuer=Alert%20Logic&algorithm=SHA1"
   *    "mfa_codes": ["123456", "456789"]
   * }
   * EOF
   */
  this.enrollMFA = async function enrollMFA(uri, codes) {
    const mfa = await this.ALClient.Post({
      service_name: 'aims', path: '/user/mfa/enroll', data: `{mfa_uri: ${uri}, mfa_codes: ${codes}}`,
    });
    return mfa;
  };

  /**
   * Remove a user's MFA device
   * DELETE
   * /aims/v1/user/mfa/:email
   * "https://api.cloudinsight.alertlogic.com/aims/v1/user/mfa/admin@company.com"
   */
  this.deleteMFA = async function deleteMFA(email) {
    const mfa = await this.ALClient.Delete({
      service_name: 'aims', path: `/user/mfa/${email}`,
    });
    return mfa;
  };
};

module.exports = AIMSClient;
