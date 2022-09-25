# Northcoders House of Games API

## How to run the project

## add files
 
Please add the following files

 .env.test -> add this line inside the file --> <PGDATABASE=nc_games_test;>
 .env.development -> add this line inside the file --> <PGDATABASE=nc_games;>

to connect to the 2 databases locally:
run `node db/seeds/run-seed.js`

In the terminal to connect to db: `\c nc_games`
To view the tables: `\dt`
To view an indiviual table `SELECT * FROM categories`

Don't forget to add them to your .gitignore.