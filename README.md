# API
Go to cymulate-api folder and add .env file to root folder with:
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/cymulate?schema=public"

Update envs/.env.dev smtp section with your settings.

run:

1. npm i
2. npx prisma db pull
3. npx prisma generate

open 3 terminals windows/tabs for 3 services and run:
1. npm run start:dev cymulate-api
2. npm run start:dev cymulate-messaging
3. npm run start:dev cymulate-tracker


# UI
Go to cymulate-ui folder and run:
1. npm i
2. npm run dev

Im available for any question via 0505955598
