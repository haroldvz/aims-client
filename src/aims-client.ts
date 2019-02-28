/**
 * Module to deal with available AIMS Public API endpoints
 */
import { ALClient, APIRequestParams } from '@al/client';

interface UserTimeStamp {
  at?: number;
  by?: string;
}

export interface AIMSAuthentication {
  user?: AIMSUser;
  account?: AIMSAccount;
  token?: string;
  token_expiration?: number;
}

interface AIMSUser {
  id?: string;
  name?: string;
  email?: string;
  active?: boolean;
  locked?: boolean;
  version?: number;
  linked_users?: {
    location: string;
    user_id: number;
  }[];
  user_credential?: {
    id?: string;
    user_id?: string;
    account_id?: string;
    key?: string;
    type?: string;
    version?: number;
    one_time_password?: boolean;
    last_login?: number;
    created?: UserTimeStamp;
    modified?: UserTimeStamp;
  };
  created?: UserTimeStamp;
  modified?: UserTimeStamp;
}

interface AIMSUsersResponse {
  users: AIMSUser[];
}

export interface AIMSAccount {
  id?: string;
  name?: string;
  active?: boolean;
  version?: number;
  accessible_locations?: string[];
  default_location?: string;
  mfa_required?: boolean;
  created?: UserTimeStamp;
  modified?: UserTimeStamp;
}

export interface AIMSAuthenticationTokenInfo extends AIMSAuthentication {
  entity_id?: string;
  entity_type?: string;
  requester_id?: string;
  roles?: AIMSRole[];
}

interface AIMSAccountsResponse {
  accounts: AIMSAccount[];
}

interface AIMSAccountIdsResponse {
  account_ids: string[];
}

interface AIMSRolesListResponse {
  roles: AIMSRole[];
}

export interface AIMSRole {
  id: string;
  account_id: string;
  name: string;
  permissions: {
    [key: string]: string;
  };
  legacy_permissions: any[];
  version: number;
  global?: boolean;
  created?: UserTimeStamp;
  modified?: UserTimeStamp;
}

class AIMSClient {

  private alClient = ALClient;
  private serviceName = 'aims';

  /**
   * Get Account Details
   * GET
   * /aims/v1/:account_id/account
   * "https://api.cloudinsight.alertlogic.com/aims/v1/12345678/account"
   */
  async getAccountDetails(accountId: string) {
    const accountDetails = await this.alClient.fetch({
      service_name: this.serviceName,
      account_id: accountId,
      path: '/account',
    });
    return accountDetails as AIMSAccount;
  }

  /**
   * List managed accounts
   * GET
   * /aims/v1/:account_id/accounts/:relationship
   * "https://api.cloudinsight.alertlogic.com/aims/v1/12345678/accounts/managed"
   */
  async getManagedAccounts(accountId: string, queryParams) {
    const managedAccounts = await this.alClient.fetch({
      service_name: this.serviceName,
      account_id: accountId,
      path: '/accounts/managed',
      params: queryParams,
    });
    return managedAccounts as AIMSAccountsResponse;
  }

  /**
   * List managed account IDs
   * GET
   * /aims/v1/:account_id/account_ids/:relationship
   * "https://api.cloudinsight.alertlogic.com/aims/v1/12345678/account_ids/managed"
   */
  async getManagedAccountIds(accountId: string, queryParams) {
    const managedAccountIds = await this.alClient.fetch({
      service_name: this.serviceName,
      account_id: accountId,
      path: '/account_ids/managed',
      params: queryParams,
    });
    return managedAccountIds as AIMSAccountIdsResponse;
  }

  /**
   * Update account MFA requirements
   * POST
   * /aims/v1/:account_id/account
   * -d '{"mfa_required": true}' "https://api.cloudinsight.alertlogic.com/aims/v1/12345678/account"
   */
  async requireMFA(accountId: string, mfaRequired: boolean) {
    const account = await this.alClient.post({
      service_name: this.serviceName,
      account_id: accountId,
      path: '/account',
      data: `{mfa_required: ${mfaRequired}}`,
    });
    return account as AIMSAccount;
  }

  /**
   * Authenticate a user's identity
   * POST
   * /aims/v1/authenticate
   * -u username:password "https://api.cloudinsight.alertlogic.com/aims/v1/authenticate"
   */
  async authenticate(params: APIRequestParams, user: string, pass: string, mfa?) {
    const authenticate = await this.alClient.authenticate(params, user, pass, mfa);
    return authenticate as AIMSAuthentication;
  }

  /**
   * Authenticate a user's identity with an mfa code and session token
   */
  async authenticateWithMFASessionToken(params: APIRequestParams, token: string, mfa: string): Promise<any> {
    const authenticate = await this.alClient.authenticateWithMFASessionToken(params, token, mfa);
    return authenticate as AIMSAuthentication;
  }

  /**
   * Change a user's password
   * POST
   * /aims/v1/change_password
   * -d '{"email": "admin@company.com", "current_password": "hunter2", "new_password": "Fraudulent$Foes"}' "https://api.cloudinsight.alertlogic.com/aims/v1/change_password"
   */
  async changePassword(email: string, password: string, newPassword: string) {
    const changePass = await this.alClient.post({
      service_name: this.serviceName,
      path: '/change_password',
      data: `{email: ${email}, current_password: ${password}, new_password: ${newPassword}}`,
    });
    return changePass;
  }

  /**
   * Obtain Authentication Token Information (Account, User, Roles, etc.)
   * GET
   * /aims/v1/token_info
   * "https://api.cloudinsight.alertlogic.com/aims/v1/token_info"
   */
  async tokenInfo() {
    const tokenData = await this.alClient.fetch({
      service_name: this.serviceName,
      path: '/token_info',
    });
    return tokenData as AIMSAuthenticationTokenInfo;
  }

  /**
   * Initiate the password reset process for a user
   * POST
   * /aims/v1/reset_password
   * -d '{"email": "admin@company.com", "return_to": "https://console.alertlogic.net"}' "https://api.cloudinsight.alertlogic.com/aims/v1/reset_password"
   */
  async initiateReset(email: string, returnTo: string) {
    const reset = await this.alClient.post({
      service_name: this.serviceName,
      path: '/reset_password',
      data: `{email: ${email}, return_to: ${returnTo}}`,
    });
    return reset;
  }

  /**
   * Reset a user's password using a token
   * PUT
   * /aims/v1/reset_password/:token
   * -d '{"password": "hunter2"}' "https://api.cloudinsight.alertlogic.com/aims/v1/reset_password/69EtspCz3c4"
   */
  async resetWithToken(token: string, password: string) {
    const reset = await this.alClient.set({
      service_name: this.serviceName,
      path: `/reset_password/${token}`,
      data: `{password: ${password}}`,
    });
    return reset;
  }

  /**
   * Create a role
   * POST
   * /aims/v1/:account_id/roles
   * -d '{"name": "Super Mega Power User", "permissions": {"*:own:*:*": "allowed", "aims:own:grant:*":"allowed"}}' "https://api.cloudinsight.alertlogic.com/aims/v1/12345678/roles"
   */
  async createRole(accountId: string, name: string, permissions) {
    const createRole = await this.alClient.post({
      service_name: this.serviceName,
      account_id: accountId,
      path: '/roles', data: `{name: ${name}, permissions: ${permissions}}`,
    });
    return createRole as AIMSRole;
  }

  /**
   * Delete a role
   * DELETE
   * /aims/v1/:account_id/roles/:role_id
   * "https://api.cloudinsight.alertlogic.com/aims/v1/12345678/roles/C7C5BE57-F199-4F14-BCB5-43E31CA02842"
   */
  async deleteRole(accountId: string, roleId: string) {
    const roleDelete = await this.alClient.delete({
      service_name: this.serviceName,
      account_id: accountId,
      path: `/roles/${roleId}`,
    });
    return roleDelete;
  }

  /**
   * Get global role, a role that is shared among accounts.
   * GET
   * /aims/v1/roles/:role_id
   * "https://api.cloudinsight.alertlogic.com/aims/v1/roles/2A33175D-86EF-44B5-AA39-C9549F6306DF"
   */
  async getGlobalRole(roleId: string) {
    const role = await this.alClient.fetch({
      service_name: this.serviceName,
      path: `/roles/${roleId}`,
    });
    return role as AIMSRole;
  }

  /**
   * Get role
   * GET
   * /aims/v1/:account_id/roles/:role_id
   * "https://api.cloudinsight.alertlogic.com/aims/v1/12345678/roles/2A33175D-86EF-44B5-AA39-C9549F6306DF"
   */
  async getAccountRole(accountId: string, roleId: string) {
    const role = await this.alClient.fetch({
      service_name: this.serviceName,
      account_id: accountId,
      path: `/roles/${roleId}`,
    });
    return role as AIMSRole;
  }

  /**
   * List global roles, roles that are shared among all accounts.
   * GET
   * /aims/v1/roles
   * "https://api.cloudinsight.alertlogic.com/aims/v1/roles"
   */
  async getGlobalRoles() {
    const roles = await this.alClient.fetch({
      service_name: this.serviceName,
      path: '/roles',
    });
    return roles as AIMSRolesListResponse;
  }

  /**
   * List roles for an account. Global roles are included in the list.
   * GET
   * /aims/v1/:account_id/roles
   * "https://api.cloudinsight.alertlogic.com/aims/v1/12345678/roles"
   */
  async getAccountRoles(accountId: string) {
    const roles = await this.alClient.fetch({
      service_name: this.serviceName,
      account_id: accountId,
      path: '/roles',
    });
    return roles as AIMSRolesListResponse;
  }

  /**
   * Update Role Name and Permissions
   * POST
   * /aims/v1/:account_id/roles/:role_id
   * -d '{"name": "Mega Power User", "permissions": {"*:own:*:*": "allowed", "aims:own:grant:*":"allowed"}}' "https://api.cloudinsight.alertlogic.com/aims/v1/12345678/roles/2A33175D-86EF-44B5-AA39-C9549F6306DF"
   */
  async updateRole(accountId: string, name: string, permissions) {
    const roleUpdate = await this.alClient.post({
      service_name: this.serviceName,
      account_id: accountId,
      path: '/roles', data: `{name: ${name}, permissions: ${permissions}}`,
    });
    return roleUpdate;
  }
  /**
   * Update Role Name
   * POST
   * /aims/v1/:account_id/roles/:role_id
   * -d '{"name": "Mega Power User"}' "https://api.cloudinsight.alertlogic.com/aims/v1/12345678/roles/2A33175D-86EF-44B5-AA39-C9549F6306DF"
   */
  async updateRoleName(accountId: string, name: string) {
    const updateRole = await this.alClient.post({
      service_name: this.serviceName,
      account_id: accountId,
      path: '/roles',
      data: `{name: ${name}}`,
    });
    return updateRole as AIMSRole;
  }
  /**
   * Update Role Permissions
   * POST
   * /aims/v1/:account_id/roles/:role_id
   * -d '{"permissions": {"*:own:*:*": "allowed", "aims:own:grant:*":"allowed"}}' "https://api.cloudinsight.alertlogic.com/aims/v1/12345678/roles/2A33175D-86EF-44B5-AA39-C9549F6306DF"
   */
  async updateRolePermissions(accountId: string, permissions) {
    const updateRole = await this.alClient.post({
      service_name: this.serviceName,
      account_id: accountId,
      path: '/roles',
      data: `{permissions: ${permissions}}`,
    });
    return updateRole as AIMSRole as AIMSRole;
  }

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
  async enrollMFA(uri: string, codes) {
    const mfa = await this.alClient.post({
      service_name: this.serviceName,
      path: '/user/mfa/enroll',
      data: `{mfa_uri: ${uri}, mfa_codes: ${codes}}`,
    });
    return mfa;
  }

  /**
   * Remove a user's MFA device
   * DELETE
   * /aims/v1/user/mfa/:email
   * "https://api.cloudinsight.alertlogic.com/aims/v1/user/mfa/admin@company.com"
   */
  async deleteMFA(email: string) {
    const mfa = await this.alClient.delete({
      service_name: this.serviceName,
      path: `/user/mfa/${email}`,
    });
    return mfa;
  }

  async getUserDetails(accountId: string, userId: string, queryParams?: {include_role_ids?: boolean, include_user_credential?: boolean}) {
    const user = await this.alClient.fetch({
      service_name: this.serviceName,
      account_id: accountId,
      path: `/users/${userId}`,
      params: queryParams,
    });
    return user as AIMSUser;
  }

  /**
   * List Users
   * GET
   * /aims/v1/:account_id/users
   * "https://api.cloudinsight.alertlogic.com/aims/v1/12345678/users"
   */
  async getUsers(accountId: string, queryParams?: {include_role_ids?: boolean, include_user_credential?: boolean}) {
    const users = await this.alClient.fetch({
      service_name: this.serviceName,
      account_id: accountId,
      path: '/users',
      params: queryParams,
    });
    return users as AIMSUsersResponse;
  }
}

export const aimsClient =  new AIMSClient();
