-- ============================================================================
-- SQL Database Testing Queries — E-Commerce Backend Validation
-- Purpose: Verify data integrity between UI actions and backend database tables
-- ============================================================================

-- 1. Verify newly registered user exists with active status (TC-01 Validation)
SELECT user_id, username, email, account_status, created_at
FROM users
WHERE email = 'ahmad.zaki@example.com';

-- 2. Verify order record and total amount after UI checkout (TC-07 Validation)
SELECT o.order_id, o.user_id, o.total_amount, o.order_status, p.payment_method
FROM orders o
INNER JOIN payments p ON o.order_id = p.order_id
WHERE o.user_id = 1045
ORDER BY o.created_at DESC
LIMIT 1;

-- 3. Check for duplicate user email records (Data Integrity Check)
SELECT email, COUNT(*) AS duplicate_count
FROM users
GROUP BY email
HAVING COUNT(*) > 1;

-- 4. Verify product inventory stock decreased by 1 after successful purchase
SELECT product_id, product_name, stock_quantity, updated_at
FROM products
WHERE product_id = 'BACKPACK-001';

-- 5. Identify orphan order items with no matching parent order (Negative / Boundary Check)
SELECT oi.order_item_id, oi.order_id, oi.product_id
FROM order_items oi
LEFT JOIN orders o ON oi.order_id = o.order_id
WHERE o.order_id IS NULL;
