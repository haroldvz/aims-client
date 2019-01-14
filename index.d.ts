// Type definitions for @alertlogic/aims 0.1.0
// Project: https://github.com/alertlogic/aims-client
// Definitions by: Rob Parker <https://github.com/parky128>

import { AIMSAccount, AIMSSession, UserTimeStamp } from '@alertlogic/session';
import { ClientRequestParams } from '@alertlogic/client'

declare module '@alertlogic/aims';

interface SimpleKeyValuePair {
  [key: string]: string;
}

interface AIMSRoleDetails {
  id: string;
  account_id: string;
  permissions: SimpleKeyValuePair;
  legacy_permissions: Array<any>;
  version: number;
  global: boolean;
  created: UserTimeStamp;
  modified: UserTimeStamp;
}

/**
 * Get Account Details
 */
export function getAccountDetails(accountId: string): Promise<AIMSAccount>;
/**
 * List managed accounts
 */
export function getManagedAccounts(accountId: string, queryParams: any): Promise<any>;
/**
 * List managed account Ids
 */
export function getManagedAccountIds(accountId: string, queryParams: any): Promise<any>;
/**
 * Update account details
 */
export function requireMFA(accountId: string, mfaRequired: boolean): Promise<any>;
/**
 * Authenticate a user's identity
 */
export function authenticate(params: ClientRequestParams, username: string, password: string, mfa?: boolean): Promise<AIMSSession>;
/**
 * Change a user's password
 */
export function changePassword(email: string, password: string, newPassword: string): Promise<any>;
/**
 * Obtain Authentication Token Information (Account, User, Roles, etc.)
 */
export function tokenInfo(): Promise<string>;
/**
 * Initiate the password reset process for a user
 */
export function initiateReset(email: string, returnTo: string): Promise<any>;
/**
 * Reset a user's password using a token
 */
export function resetWithToken(token: string, password: string): Promise<any>;
/**
 * Create a role
 */
export function createRole(accountId: string, name: string, permissions: any): Promise<any>;
/**
 * Delete a role
 */
export function deleteRole(accountId: string, roleId: string): Promise<any>;
/**
 * Get global role, a role that is shared among accounts.
 */
export function getGlobalRole(roleId: string): Promise<AIMSRoleDetails>;
/**
 * Get role
 */
export function getAccountRole(accountId: string, roleId: string): Promise<AIMSRoleDetails>;
/**
 * List global roles, roles that are shared among all accounts.
 */
export function getGlobalRoles(accountId: string, roleId: string): Promise<[AIMSRoleDetails]>;
/**
 * List roles for an account. Global roles are included in the list.
 */
export function getAccountRoles(accountId: string): Promise<[AIMSRoleDetails]>;
/**
 * Update Role Name and Permissions
 */
export function updateRole(accountId: string, name: string, permissions: SimpleKeyValuePair): Promise<any>;
/**
 * Update Role Name
 */
export function updateRoleName(accountId: string, name: string): Promise<any>;
/**
 * Update Role Permissions
 */
export function updateRolePermissions(accountId: string, permissions: SimpleKeyValuePair): Promise<any>;
/**
   * Enroll an MFA device for a user
   */
export function enrollMFA(uri: string, codes: Array<string>): Promise<any>;
/**
   * Remove a user's MFA device
   */
export function deleteMFA(email: string): Promise<any>;
