# Security Specification: Unite Powertek Firestore Database

## 1. Data Invariants
- **Stations (`/stations/{stationId}`)**: Read access is public so all drivers and site partners can locate chargers. Creation, updates, and maintenance status can only be modified by authenticated Administrators.
- **Applications (`/applications/{applicationId}`)**: Turnkey station applications can be submitted by prospective partners. Sensitive PII (contact details, phone, email, land registry) is restricted to the applicant and platform admins.
- **Charging Sessions (`/chargingSessions/{sessionId}`)**: Active EV charging telemetry and billing counters are bound to the session owner.
- **Invoices (`/invoices/{invoiceId}`)**: Tax invoices are immutable once marked paid and accessible only to the billing recipient or admin.
- **Wallets (`/userWallets/{walletId}`)**: Balances cannot be negative and are accessible only to the authenticated wallet owner or admin.

## 2. The Dirty Dozen Attack Payloads Checked
1. **ID Poisoning**: Injecting oversized or invalid characters into `{applicationId}`.
2. **Shadow Field Injection**: Attempting to inject `isAdmin: true` into an application document.
3. **Ghost Stage Skipping**: An unauthorized user jumping from `application_received` directly to `revenue`.
4. **Negative Wallet Balance**: Injecting negative amounts into wallet balances.
5. **PII Scraping**: Blanket listing of all partner land documents without admin authorization.
6. **Station Price Tampering**: An unauthenticated driver reducing the `tariffPerKwh` to ₹0.00.
7. **Session Hijacking**: Modifying another driver's active charging session status.
8. **Invoice Alteration**: Changing the `gstAmount` on an existing paid tax invoice.
9. **Volumetric Flood**: Injecting a 2MB string into `applicantName`.
10. **Null Pointer Trigger**: Using `request.resource` in `allow delete` blocks.
11. **Client Delegation**: Allowing open list queries without server-side rule filters.
12. **Unverified Email Spoof**: Attempting admin escalation without verified credentials.
