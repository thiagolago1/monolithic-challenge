# Monolithic Challenge

### Follow step by step to execute the project

### install backend dependencys
```
cd path/to/project/backend
npm install
```

#### Create .env file on backend based on .env.example

#### Make sure you have docker and docker-compose installed on your machine

#### make sure you have docker running

### Run docker-compose on terminal
```
cd path/to/project/backend
docker-compose up -d
```

### Run prisma migrations, make sure you have prisma installed
```
cd path/to/project/backend
npx prisma migrate deploy
```

### If you want to see the database on prisma studio
```
npx prisma studio
```

#### If you want to view another client's database, just ensure the database settings based on docker-compose.yml file

### run backend
```
cd path/to/project/backend
npm run start:dev
```

### install frontend dependencys
```
cd path/to/project/frontend
npm install
```

### run frontend
```
cd path/to/project/frontend
npm run dev
```

