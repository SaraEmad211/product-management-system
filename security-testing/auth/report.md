# Client-Side Authentication Bypass Vulnerability Report

## Summary

The application relies entirely on client-side logic for authentication using `localStorage`.

An attacker can bypass the login mechanism by manually setting a value in the browser, gaining unauthorized access to protected pages without valid credentials.

---

## Vulnerability Details

| Field | Details |
|---|---|
| **Type** | Authentication Bypass |
| **Severity** | 🔴 High |
| **CVSS 3.1 Score** | 7.4 — `AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:L` |
| **Affected Components** | Authentication Logic, Protected Pages |
| **Status** | Unpatched |

---

## Root Cause

Authentication is enforced on the client side only using `localStorage`:

```javascript
if(!localStorage.getItem('isLoggedIn')){
    window.location.href = 'auth.html';  
}
```

There is no server-side validation of user sessions.

This allows attackers to manipulate the authentication state directly from the browser.

---

## Steps to Reproduce

1. Open the application login page
2. Open browser Developer Tools (Console)
3. Execute the following command:

```javascript
localStorage.setItem('isLoggedIn', 'true');
```

4. Navigate to the main application page (e.g., `/index.html`)
5. Access is granted without entering valid credentials

---

## Evidence

### Bypass via Console

![Auth Bypass Console](https://raw.githubusercontent.com/SaraEmad211/product-management-system/main/security-testing/auth/screenshots/auth-bypass-console.png)

### Unauthorized Access

![Unauthorized Access](https://raw.githubusercontent.com/SaraEmad211/product-management-system/main/security-testing/auth/screenshots/auth-bypass-success.png)

---

## Observed Behavior

- User can access protected pages without authentication
- No server-side validation is performed
- Authentication state is fully controlled by the client

---

## Impact

An attacker can:

- Access restricted areas of the application
- Bypass login completely
- Perform actions as an authenticated user
- Manipulate or view sensitive data
- Chain with other vulnerabilities (e.g., XSS) for full account takeover

---

## CVSS v3.1 Breakdown

| Metric | Value | Reason |
|---|---|---|
| Attack Vector | Network (AV:N) | Exploitable via browser |
| Attack Complexity | Low (AC:L) | No special conditions required |
| Privileges Required | None (PR:N) | No authentication needed |
| User Interaction | None (UI:N) | No user interaction required |
| Scope | Unchanged (S:U) | No scope change |
| Confidentiality | High (C:H) | Unauthorized data access |
| Integrity | High (I:H) | Ability to modify data |
| Availability | Low (A:L) | Limited impact |

---

## Mitigation

### 1. Implement Server-Side Authentication

Authentication must be validated on the server.

---

### 2. Use Secure Sessions

- Use HTTP-only cookies
- Use session tokens (JWT or server sessions)
- Validate tokens on every request

---

### 3. Remove Client-Side Trust

Do not rely on `localStorage` for authentication decisions.

---

### 4. Protect Routes on Server

Ensure protected routes require valid authentication before returning data.

---

## Conclusion

The application is vulnerable to authentication bypass due to improper reliance on client-side storage.

This allows any user to gain unauthorized access without valid credentials.

Immediate remediation is required by implementing secure server-side authentication and session validation.
