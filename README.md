## to run docker compose 
docker compose up

it will bootup Postgres, Adminer (DB viewer) and api.

We can access it http://localhost:3000/ [http://{hostname}:3000/]


## DB configuration
I think no need to change because its on same docker network
In case we need to give to any other

path: https://github.com/symbolify/api/blob/master/src/db/db.providers.ts
Line #10
