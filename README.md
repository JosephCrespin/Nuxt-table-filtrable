# A continuació afegire una mini guia dels passos que he seguit per integrar les dades a la taula del projecte
## PAS 1: Creació d'Estructures de Dades

Primer, crea les estructures de dades necessàries a la teva base de dades. Utilitza el següent SQL per crear les taules `customers` i `products`:

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
  mbSpeed INT,
  gbData INT,
  productTypeName VARCHAR(50),
  numeracioTerminal BIGINT,
  soldAt TIMESTAMP,
  customerId VARCHAR(50),
  FOREIGN KEY (customerId) REFERENCES customers(customerId)
);
```

## PAS 2: Inserció de Dades

Insereix dades a les taules `customers` i `products` segons sigui necessari. Aquí tens exemples de com fer-ho:

```sql
INSERT INTO customers (_id, docType, docNum, email, customerId, givenName, familyName1, phone)
VALUES
(555555, 'nif', '11223344E', 'it@parlem.com', '11111', 'Enriqueta', 'Parlem', '668668668');

INSERT INTO products (_id, productName, mbSpeed, gbData, productTypeName, numeracioTerminal, soldAt, customerId)
VALUES
(1111111, 'FIBRA 1000MB', 1000, NULL, 'ftth', 933933933, '2019-01-09 14:26:17', '11111'),
(1111112, 'MOBIL 500GB', NULL, 500, '4G', 696696969, '2020-08-01 18:30:27', '11111');
```

Verifica que les dades s'han inserit correctament executant les següents consultes SQL:

```sql
SELECT * FROM customers;
SELECT * FROM products;
```

## PAS 3: Integració de Supabase al teu Projecte

Integra Supabase al teu projecte important i creant un client de Supabase al teu codi. Utilitza les següents línies de codi:

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

export const supabase = createClient(supabaseUrl!, supabaseKey!)
```

## PAS 4: Configuració del Fitxer .env

Assegura't de posar les credencials de Supabase al teu fitxer `.env` de la següent manera:

```
SUPABASE_URL=la_teu_url_de_supabase
SUPABASE_KEY=la_teu_clau_anònima
```

## PAS 5: Aplicació de Polítiques d'Accés

Per garantir la seguretat de les teves dades, afegeix polítiques d'accés a les teves taules. Aquí tens un exemple de com fer-ho per permetre només lectura:

```sql
CREATE POLICY "Enable read access for all users"
ON "public"."products"
FOR SELECT
USING (true);
```

Ara el teu projecte està integrat amb Supabase de forma segura i llesta per ser utilitzada!
