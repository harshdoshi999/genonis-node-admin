1. Clone this repo -- git clone https://github.com/harshdoshi999/genonis-node-admin.git
2. Install dependencies -- npm install
3. Import user table -- node ace migration:run
4. Start project -- npm run serve:dev

Demo: http://genonis.mydemos.in


Some migration commands related to AdonisJS:
-----------------------------------------
1. Create new table: node ace make:migration <tableName> --create=<tableName>
2. Run migration: node ace migration:run