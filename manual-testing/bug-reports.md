# Defect / Bug Reports — SauceDemo

These defects were identified during exploratory and functional testing using the `problem_user` test account on [SauceDemo](https://saucedemo.com).

---

## BUG-01: Broken Product Images Displayed on Inventory Page
* **Severity:** Major
* **Priority:** High
* **Environment:** Windows 11 / Chrome 130 / Desktop Web
* **Pre-condition:** User logs in with `problem_user` / `secret_sauce`

### Steps to Reproduce
1. Navigate to `https://saucedemo.com`.
2. Enter username `problem_user` and password `secret_sauce`.
3. Click the **Login** button.
4. Observe the product thumbnails on the `/inventory.html` catalog page.

### Expected Result
Each product should display its corresponding unique product image (e.g., Backpack, Bike Light, Bolt T-Shirt).

### Actual Result
All six products display the exact same placeholder image (a dog photo `sl-404.168b1cce.jpg`) instead of the actual product photos.

---

## BUG-02: Unable to Remove Items from Cart on Inventory Page
* **Severity:** Major
* **Priority:** High
* **Environment:** Windows 11 / Chrome 130 / Desktop Web
* **Pre-condition:** Logged in as `problem_user` with at least one item added to the cart

### Steps to Reproduce
1. On the `/inventory.html` page, click **Add to cart** on **Sauce Labs Backpack**.
2. Verify the button label changes to **Remove** and the cart badge updates to `1`.
3. Click the **Remove** button directly on the inventory card.

### Expected Result
The item is removed from the shopping cart, the cart badge resets, and the button reverts to **Add to cart**.

### Actual Result
Clicking **Remove** has no effect. The item remains stuck in the cart and the button stays locked on **Remove**.

---

## BUG-03: Last Name Input Overwrites First Name During Checkout
* **Severity:** Critical
* **Priority:** High
* **Environment:** Windows 11 / Chrome 130 / Desktop Web
* **Pre-condition:** Logged in as `problem_user`, 1 item in cart, navigated to `/checkout-step-one.html`

### Steps to Reproduce
1. Click the shopping cart icon and click **Checkout**.
2. Type `Ahmad` into the **First Name** field.
3. Type `Zaki` into the **Last Name** field.
4. Enter `50000` into the **Zip/Postal Code** field and click **Continue**.

### Expected Result
Both First Name (`Ahmad`) and Last Name (`Zaki`) are saved properly, and the user proceeds to `/checkout-step-two.html`.

### Actual Result
Typing into the **Last Name** field overwrites the **First Name** field, leaving **Last Name** empty and triggering the validation error: *"Error: Last Name is required"*.
