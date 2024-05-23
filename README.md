# Below is a mini guide of the steps I followed to integrate the data into the project schedule
## STEP 1: Creation of Data Structures

First, create the data structures necessary to the new data base. Use the following SQL to create the `customers` and `products` tables:

```sql
CREATE TABLE customers (
 _id BIGINT PRIMARY KEY,
 docType VARCHAR(50),
 docNum VARCHAR(50),
 email VARCHAR(255),
 customerId VARCHAR(50) UNIQUE,
 givenName VARCHAR(100),
 familyName1 VARCHAR(100),
 phone VARCHAR(50)
);

CREATE TABLE products (
 _id BIGINT PRIMARY KEY,
 productName VARCHAR(255),
 mbSpeed ​​INT,
 gbData INT,
 productTypeName VARCHAR(50),
 numberTerminal BIGINT,
 soldAt TIMESTAMP,
 customerId VARCHAR(50),
 FOREIGN KEY (customerId) REFERENCES customers(customerId)
);
```

## STEP 2: Data Insertion

Insert data into the numbers `customers` and `products` as necessary. Here are examples of com fer-ho:

```sql
INSERT INTO customers (_id, docType, docNum, email, customerId, givenName, familyName1, phone)
VALUES
(555555, 'nif', '11223344E', 'it@parlem.com', '11111', 'Enriqueta', 'Parlem', '668668668');

INSERT INTO products (_id, productName, mbSpeed, gbData, productTypeName, terminalnumber, soldAt, customerId)
VALUES
(1111111, 'FIBER 1000MB', 1000, NULL, 'ftth', 933933933, '2019-01-09 14:26:17', '11111'),
(1111112, 'MOBIL 500GB', NULL, 500, '4G', 696696969, '2020-08-01 18:30:27', '11111');
```

Verify that the data has been inserted correctly and executed the following SQL queries:

```sql
SELECT * FROM customers;
SELECT * FROM products;
```

## PAS 3: Integration of Supabase to the project

Integrate Supabase into your project and create a Supabase client into your code. Use the following code lines:

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

export const supabase = createClient(supabaseUrl!, supabaseKey!)
```

## STEP 4: Fitxer .env configuration

Make sure you upload your Supabase credentials to the `.env` file as follows:

```
SUPABASE_URL=la_teu_url_de_supabase
SUPABASE_KEY=la_teu_clau_anònima
```

## STEP 5: Application of Access Policies

To guarantee the security of these data, apply policies for access to these data. Here is an example of com fer-ho permetre just reading:

```sql
CREATE POLICY "Enable read access for all users"
ON "public"."products"
FOR SELECT
USING (true);
```

Now your project is integrated with the Supabase securely and is ready to be used!
