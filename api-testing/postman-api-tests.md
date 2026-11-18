# API Testing Portfolio — Restful-Booker API

This folder demonstrates REST API testing using **Postman**, validating HTTP status codes, JSON response payloads, authentication tokens, and CRUD operations.

* **Base URL:** `https://herokuapp.com`
* **Tools Used:** Postman, JSON Schema Validation

---

## API Test Cases Summary

| Test ID | Method | Endpoint | Test Scenario | Request Body / Headers | Expected Status | Actual Status | Assertion / Validation |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **API-01** | `POST` | `/auth` | Generate valid authentication token | `{"username": "admin", "password": "password123"}` | `200 OK` | `200 OK` | Response JSON contains non-empty `token` string. |
| **API-02** | `POST` | `/auth` | Reject invalid login credentials | `{"username": "admin", "password": "wrong"}` | `200 OK` | `200 OK` | Response returns `{"reason": "Bad credentials"}` without a token. |
| **API-03** | `GET` | `/booking` | Retrieve list of all booking IDs | Header: `Accept: application/json` | `200 OK` | `200 OK` | Response is a non-empty JSON array containing `bookingid` integers. |
| **API-04** | `POST` | `/booking` | Create a new hotel booking | Valid JSON payload (firstname, lastname, totalprice, bookingdates) | `200 OK` | `200 OK` | Response returns generated `bookingid` and echoes exact input details. |
| **API-05** | `GET` | `/booking/99999999` | Retrieve non-existent booking ID (Negative) | Header: `Accept: application/json` | `404 Not Found` | `404 Not Found` | Response body returns `Not Found`. |
| **API-06** | `DELETE` | `/booking/1` | Delete booking without auth token (Security) | No `Cookie: token=...` header provided | `403 Forbidden` | `403 Forbidden` | Unauthorized deletion is blocked with `Forbidden` message. |

---

## Sample Postman Test Assertions (JavaScript)

```javascript
// Verify response status code is 200
pm.test("Status code is 200 OK", function () {
    pm.response.to.have.status(200);
});

// Verify response time is under 1000ms
pm.test("Response time is acceptable (< 1000ms)", function () {
    pm.expect(pm.response.responseTime).to.be.below(1000);
});

// Verify booking ID is generated in response
pm.test("Response contains valid bookingid", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("bookingid");
    pm.expect(jsonData.bookingid).to.be.a("number");
});
```
