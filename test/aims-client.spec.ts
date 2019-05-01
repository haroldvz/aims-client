import { ALClient } from '@al/client';
import { AIMSClient } from '../src/index';
import { expect, assert } from 'chai';
import { describe, before } from 'mocha';
import * as sinon from 'sinon';

const serviceName = 'aims';
const accountId = '12345';
const userId = '4567';
const queryParams = { foo: 'bar' };

afterEach(() => {
  sinon.restore();
});
xdescribe('AIMS Client Test Suite:', () => {
  describe('when performing a create user operation', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(ALClient, 'post');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call post() on the ALClient instance with a correctly constructed payload', async() => {
      const name = 'someone.somewhere';
      const email = 'someone@somwehere.com';
      const mobilePhone = '123-456-789-000';
      await AIMSClient.createUser(accountId, name, email, mobilePhone);
      expect(stub.callCount).to.equal(1);
      const payload = {
        service_name: serviceName,
        account_id: accountId,
        path: '/users',
        data: `{"name": "${name}", "email": "${email}", "mobile_phone": "${mobilePhone}"}`,
      };
      assert.deepEqual(payload, stub.args[0][0]);
    });
  });
  describe('when performing a delete user operation', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(ALClient, 'delete');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call delete() on the ALClient instance with a correctly constructed payload', async() => {
      await AIMSClient.deleteUser(accountId, userId);
      expect(stub.callCount).to.equal(1);
      const payload = {
        service_name: serviceName,
        account_id: accountId,
        path: `/users/${userId}`,
      };
      assert.deepEqual(payload, stub.args[0][0]);
    });
  });
  describe('when retrieving a user record', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(ALClient, 'fetch');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call fetch() on the ALClient instance with a correctly constructed payload', async() => {
      await AIMSClient.getUserDetailsById(accountId, userId);
      expect(stub.callCount).to.equal(1);
      const payload = {
        service_name: serviceName,
        account_id: accountId,
        path: `/users/${userId}`,
      };
      assert.deepEqual(payload, stub.args[0][0]);
    });
  });
  describe('when retrieving permissions for a user', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(ALClient, 'fetch');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call fetch() on the ALClient instance with a correctly constructed payload', async() => {
      await AIMSClient.getUserPermissions(accountId, userId);
      expect(stub.callCount).to.equal(1);
      const payload = {
        service_name: serviceName,
        account_id: accountId,
        path: `/users/${userId}/permissions`,
      };
      assert.deepEqual(payload, stub.args[0][0]);
    });
  });
  describe('when retrieving account details', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(ALClient, 'fetch');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call fetch() on the ALClient instance with a correctly constructed payload', async() => {
      await AIMSClient.getAccountDetails(accountId);
      expect(stub.callCount).to.equal(1);
      const payload = {
        service_name: serviceName,
        account_id: accountId,
        path: '/account',
      };
      assert.deepEqual(payload, stub.args[0][0]);
    });
  });
  describe('when retrieving managed account details', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(ALClient, 'fetch');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call fetch() on the ALClient instance with a correctly constructed payload', async() => {
      await AIMSClient.getManagedAccounts(accountId, queryParams);
      expect(stub.callCount).to.equal(1);
      const payload = {
        service_name: serviceName,
        account_id: accountId,
        path: '/accounts/managed',
        params: queryParams,
      };
      assert.deepEqual(payload, stub.args[0][0]);
    });
  });
  describe('when retrieving managed account Ids', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(ALClient, 'fetch');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call fetch() on the ALClient instance with a correctly constructed payload', async() => {
      await AIMSClient.getManagedAccountIds(accountId, queryParams);
      expect(stub.callCount).to.equal(1);
      const payload = {
        service_name: serviceName,
        account_id: accountId,
        path: '/account_ids/managed',
        params: queryParams,
      };
      assert.deepEqual(payload, stub.args[0][0]);
    });
  });
  describe('when enabling MFA for a user account', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(ALClient, 'post');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call post() on the ALClient instance with a correctly constructed payload', async() => {
      await AIMSClient.requireMFA(accountId, true);
      expect(stub.callCount).to.equal(1);
      const payload = {
        service_name: serviceName,
        account_id: accountId,
        path: '/account',
        data: '{mfa_required: true}',
      };
      assert.deepEqual(payload, stub.args[0][0]);
    });
  });
  describe('when authenticating a user', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(ALClient, 'authenticate');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call authenticate() on the ALClient instance with the supplied params, username and password', async() => {
      const username = 'someone.somewhere';
      const password = 'LetMeIn!';
      await AIMSClient.authenticate(username, password);
      expect(stub.callCount).to.equal(1);
      assert(stub.withArgs(username, password).calledOnce);
    });
  });
  describe('when authenticating with an MFA session token', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(ALClient, 'authenticateWithMFASessionToken');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call authenticateWithMFASessionToken() on the ALClient instance with the supplied param, token and mfa values', async() => {
      const token = 'abc-123-xYz=-';
      const mfa = '123001';
      await AIMSClient.authenticateWithMFASessionToken(token, mfa);
      expect(stub.callCount).to.equal(1);
      assert(stub.withArgs(token, mfa).calledOnce);
    });
  });
  describe('when changing a user password', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(ALClient, 'post');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call post() on the ALClient instance with a correctly constructed payload', async() => {
      const email = 'someone@somewhere.com';
      const password = 'xyz123';
      const newPassword = 'ABC007';
      await AIMSClient.changePassword(email, password, newPassword);
      expect(stub.callCount).to.equal(1);
      const payload = {
        service_name: serviceName,
        path: '/change_password',
        data: `{email: ${email}, current_password: ${password}, new_password: ${newPassword}}`,
      };
      assert.deepEqual(payload, stub.args[0][0]);
    });
  });
  describe('when retrieving tokenInfo', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(ALClient, 'fetch');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call fetch() on the ALClient instance with a correctly constructed payload', async() => {
      await AIMSClient.tokenInfo();
      expect(stub.callCount).to.equal(1);
      const payload = {
        service_name: serviceName,
        path: '/token_info',
      };
      assert.deepEqual(payload, stub.args[0][0]);
    });
  });
  describe('when initiating a password reset', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(ALClient, 'post');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call post() on the ALClient instance with a correctly constructed payload', async() => {
      const returnTo = 'https://console.alertlogic.net';
      const email = 'someone@somewhere.com';
      await AIMSClient.initiateReset(email, returnTo);
      expect(stub.callCount).to.equal(1);
      const payload = {
        service_name: serviceName,
        path: '/reset_password',
        data: `{email: ${email}, return_to: ${returnTo}}`,
      };
      assert.deepEqual(payload, stub.args[0][0]);
    });
  });
  describe('when initiating a password reset with a token', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(ALClient, 'set');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call set() on the ALClient instance with a correctly constructed payload', async() => {
      const token = 'xyz-123';
      const password = 'P@ssw0rd';
      await AIMSClient.resetWithToken(token, password);
      expect(stub.callCount).to.equal(1);
      const payload = {
        service_name: serviceName,
        path: `/reset_password/${token}`,
        data: `{password: ${password}}`,
      };
      assert.deepEqual(payload, stub.args[0][0]);
    });
  });
  describe('when creating a new role', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(ALClient, 'post');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call post() on the ALClient instance with a correctly constructed payload', async() => {
      const name = 'RoleA';
      const permissions = { foo: 'bar' };
      await AIMSClient.createRole(accountId, name, permissions);
      expect(stub.callCount).to.equal(1);
      const payload = {
        service_name: serviceName,
        account_id: accountId,
        path: '/roles',
        data: `{name: ${name}, permissions: ${permissions}}`,
      };
      assert.deepEqual(payload, stub.args[0][0]);
    });
  });
  describe('when deleting a new role', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(ALClient, 'delete');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call delete() on the ALClient instance with a correctly constructed payload', async() => {
      const roleId = '00-22-xx-zz';
      await AIMSClient.deleteRole(accountId, roleId);
      expect(stub.callCount).to.equal(1);
      const payload = {
        service_name: serviceName,
        account_id: accountId,
        path: `/roles/${roleId}`,
      };
      assert.deepEqual(payload, stub.args[0][0]);
    });
  });
  describe('when retrieving a global role', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(ALClient, 'fetch');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call fetch() on the ALClient instance with a correctly constructed payload', async() => {
      const roleId = '00-22-xx-zz';
      await AIMSClient.getGlobalRole(roleId);
      expect(stub.callCount).to.equal(1);
      const payload = {
        service_name: serviceName,
        path: `/roles/${roleId}`,
      };
      assert.deepEqual(payload, stub.args[0][0]);
    });
  });
  describe('when retrieving an account role', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(ALClient, 'fetch');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call fetch() on the ALClient instance with a correctly constructed payload', async() => {
      const roleId = '00-22-xx-zz';
      await AIMSClient.getAccountRole(accountId, roleId);
      expect(stub.callCount).to.equal(1);
      const payload = {
        service_name: serviceName,
        account_id: accountId,
        path: `/roles/${roleId}`,
      };
      assert.deepEqual(payload, stub.args[0][0]);
    });
  });
  describe('when retrieving all global roles', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(ALClient, 'fetch');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call fetch() on the ALClient instance to the roles endpoint', async() => {
      await AIMSClient.getGlobalRoles();
      expect(stub.callCount).to.equal(1);
      const payload = {
        service_name: serviceName,
        path: '/roles',
      };
      assert.deepEqual(payload, stub.args[0][0]);
    });
  });
  describe('when retrieving all account roles', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(ALClient, 'fetch');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call fetch() on the ALClient instance to the roles endpoint', async() => {
      await AIMSClient.getAccountRoles(accountId);
      expect(stub.callCount).to.equal(1);
      const payload = {
        service_name: serviceName,
        account_id: accountId,
        path: '/roles',
      };
      assert.deepEqual(payload, stub.args[0][0]);
    });
  });
  describe('when updating the name and permissions of a role', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(ALClient, 'post');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call post() on the ALClient instance to the roles endpoint with a payload containing the name and permissions', async() => {
      const name = 'Mega Power User';
      const permissions = { '*:own:*:*': 'allowed', 'aims:own:grant:*':'allowed' };
      await AIMSClient.updateRole(accountId, name, permissions);
      expect(stub.callCount).to.equal(1);
      const payload = {
        service_name: serviceName,
        account_id: accountId,
        path: '/roles',
        data: `{name: ${name}, permissions: ${permissions}}`,
      };
      assert.deepEqual(payload, stub.args[0][0]);
    });
  });
  describe('when updating the name of a role', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(ALClient, 'post');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call post() on the ALClient instance to the roles endpoint with a payload containing the name', async() => {
      const name = 'Mega Power User';
      await AIMSClient.updateRoleName(accountId, name);
      expect(stub.callCount).to.equal(1);
      const payload = {
        service_name: serviceName,
        account_id: accountId,
        path: '/roles',
        data: `{name: ${name}}`,
      };
      assert.deepEqual(payload, stub.args[0][0]);
    });
  });
  describe('when updating the permissions of a role', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(ALClient, 'post');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call post() on the ALClient instance to the roles endpoint with a payload containing the name', async() => {
      const permissions = { '*:own:*:*': 'allowed', 'aims:own:grant:*':'allowed' };
      await AIMSClient.updateRolePermissions(accountId, permissions);
      expect(stub.callCount).to.equal(1);
      const payload = {
        service_name: serviceName,
        account_id: accountId,
        path: '/roles',
        data: `{permissions: ${permissions}}`,
      };
      assert.deepEqual(payload, stub.args[0][0]);
    });
  });
  describe('when enrolling a users MFA device', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(ALClient, 'post');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call post() on the ALClient instance to the mfa endpoint with the supplied uri and codes', async() => {
      const uri = 'otpauth://totp/Alert%20Logic:admin@company.com?secret=GFZSA5CINFJSA4ZTNNZDG5BAKM2EMMZ7&issuer=Alert%20Logic&algorithm=SHA1';
      const codes = ['123456', '456789'];
      await AIMSClient.enrollMFA(uri, codes);
      expect(stub.callCount).to.equal(1);
      const payload = {
        service_name: serviceName,
        path: '/user/mfa/enroll',
        data: `{mfa_uri: ${uri}, mfa_codes: ${codes}}`,
      };
      assert.deepEqual(payload, stub.args[0][0]);
    });
  });
  describe('when removing a users MFA device', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(ALClient, 'delete');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call delete() on the ALClient instance to the mfa endpoint with the supplied email', async() => {
      const email = 'admin@company.com';
      await AIMSClient.deleteMFA(email);
      expect(stub.callCount).to.equal(1);
      const payload = {
        service_name: serviceName,
        path: `/user/mfa/${email}`,
      };
      assert.deepEqual(payload, stub.args[0][0]);
    });
  });
  describe('when retrieving user details', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(ALClient, 'fetch');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call fetch() on the ALClient instance to the users endpoint with any extra params supplied', async() => {
      const reqParams = { include_role_ids: true, include_user_credential: true };
      await AIMSClient.getUserDetails(accountId, userId, reqParams);
      expect(stub.callCount).to.equal(1);
      const payload = {
        service_name: serviceName,
        account_id: accountId,
        path: `/users/${userId}`,
        params: reqParams,
      };
      assert.deepEqual(payload, stub.args[0][0]);
    });
  });
  describe('when retrieving users', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(ALClient, 'fetch');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call fetch() on the ALClient instance to the users endpoint with any extra params supplied', async() => {
      const reqParams = { include_role_ids: true, include_user_credential: true };
      await AIMSClient.getUsers(accountId, reqParams);
      expect(stub.callCount).to.equal(1);
      const payload = {
        service_name: serviceName,
        account_id: accountId,
        path: '/users',
        params: reqParams,
      };
      assert.deepEqual(payload, stub.args[0][0]);
    });
  });
  describe('when creating an access key', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(ALClient, 'post');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call post() on the ALClient instance to the access_keys endpoint with the label value supplied', async() => {
      const label = 'my-key';
      await AIMSClient.createAccessKey(accountId, userId, label);
      expect(stub.callCount).to.equal(1);
      const payload = {
        service_name: serviceName,
        account_id: accountId,
        path: `/users/${userId}/access_keys`,
        data: `{"label": "${label}"}`,
      };
      assert.deepEqual(payload, stub.args[0][0]);
    });
  });
  describe('when retrieving an access key', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(ALClient, 'fetch');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call fetch() on the ALClient instance to the access_keys endpoint for the supplied access key id value', async() => {
      const accessKeyId = '002211-22dddc';
      await AIMSClient.getAccessKey(accessKeyId);
      expect(stub.callCount).to.equal(1);
      const payload = {
        service_name: serviceName,
        path: `/access_keys/${accessKeyId}`,
      };
      assert.deepEqual(payload, stub.args[0][0]);
    });
  });
  describe('when retrieving all access keys for a user', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(ALClient, 'fetch');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call fetch() on the ALClient instance to the access_keys endpoint for the supplied user id value', async() => {
      await AIMSClient.getAccessKeys(accountId, userId);
      expect(stub.callCount).to.equal(1);
      const payload = {
        service_name: serviceName,
        account_id: accountId,
        ttl: 60000,
        path: `/users/${userId}/access_keys?out=full`,
      };
      assert.deepEqual(payload, stub.args[0][0]);
    });
  });
  describe('when deleting an access key for a user', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(ALClient, 'delete');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call delete() on the ALClient instance to the access_keys endpoint for the supplied user and access key id values', async() => {
      const accessKeyId = '002211-22dddc';
      await AIMSClient.deleteAccessKey(accountId, userId, accessKeyId);
      expect(stub.callCount).to.equal(1);
      const payload = {
        service_name: serviceName,
        account_id: accountId,
        path: `/users/${userId}/access_keys/${accessKeyId}`,
      };
      assert.deepEqual(payload, stub.args[0][0]);
    });
  });
});
