# Build Circle Superheroes tech test

Superheroes and supervillains are always battling it out, but how do we know who wins? This repo contains an API that gives us that answer. The API contains a /battle endpoint which takes a hero and a villain and returns the character that wins.

The characters and their stats are stored in a json file stored in AWS S3 - https://s3.eu-west-2.amazonaws.com/build-circle/characters.json

## Task

Build an API endpoint that takes a hero and a villain as input and returns the winner.

The winner is the character that has the highest score.