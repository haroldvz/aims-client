import { AlChangeStamp, AIMSAuthentication, AIMSUser, AIMSAccount } from '@al/client';

/**
 * Reexport AIMS constructs that are defined in @al/session for convenience.
 */
export { AlChangeStamp, AIMSAuthentication, AIMSUser, AIMSAccount } from '@al/client';

/*
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
    created?: AlChangeStamp;
    modified?: AlChangeStamp;
  };
  created?: AlChangeStamp;
  modified?: AlChangeStamp;
}
 */

export interface AIMSAuthenticationTokenInfo extends AIMSAuthentication {
  entity_id?: string;
  entity_type?: string;
  requester_id?: string;
  roles?: AIMSRole[];
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
  created?: AlChangeStamp;
  modified?: AlChangeStamp;
}

export interface AIMSAccessKey {
  access_key_id: string;
  user_id: string;
  account_id: string;
  label: string;
  created?: AlChangeStamp;
  modified?: AlChangeStamp;
  secret_key?: string;
}

