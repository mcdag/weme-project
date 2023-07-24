# weme-project

Weme Credentials was designed to be a system where you can save your credentials, in this case, emails and credit cards.

## Frontend

### Seeing the design

If you want to look at the design, go to this figma link: https://www.figma.com/file/3dFCv1sMlfZ3ZaPXcAwGaw/weme-project?type=design&node-id=0%3A1&mode=design&t=Ks0ryNJI95D0t6xH-1.

### Running the frontend

```
# Just run that single command
npm run start
```

## Backend

### Database visualization

If you want to look at the database, go this link https://dbdiagram.io/d/644c21d2dca9fb07c439f32e.

### Docker installings

Run a docker container of postgres. If you don't have, you can install it (https://docs.docker.com/engine/install/) and continue.

```
# Running a docker container
docker run --name credentials -p 5432:5432 -e POSTGRES_PASSWORD=admin -d postgres
```

### Using a database manager

After that, if you want, you can install a database manager, like dbeaver (https://dbeaver.io/download/).

Once you have installed dbeaver, go and create a postgres database connection. (Click to create, and use the user=postgres and the password=admin as said in the docker section).

After you have make the connection, create a database with name 'credentials'.

### Running the backend

```
# First of all, run the migrations
npm run typeorm migration:run

# Then, just run that comand and the server will start
npm run dev
```
