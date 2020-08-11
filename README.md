# Build Circle Superheroes tech test

Superheroes and Supervillains are always battling it out, but how do we know who wins? This repo contains a function that gives us that answer. 

The `battle` function in `src/main.ts` takes a hero name, and a villain name, and returns us the hero or villain that would win in a battle.

The characters and their stats are stored in a json file stored in AWS S3 - https://s3.eu-west-2.amazonaws.com/build-circle/characters.json

## Task

Note: This tech test is deliberately loose. We're looking for your opinions and coding style.

Above all, Build Circle value clear, well tested code.

1. Familiarise yourself with the code. Feel free to point out any issues or opinions you have about it. No right answers here but hopefully will drive good discussion.

2. Currently the `getCharacters` function is mocked in our tests. The real implementation throws an error. Make this function work by loading and parsing the characters from a JSON document in S3 here https://s3.eu-west-2.amazonaws.com/build-circle/characters.json (bonus points for a decent test for this).

3. Edge cases. Only the happy path is covered. Lets think about what could go wrong and write some code to handle it.

4. Each hero usually has a nemesis. This is captured in the `weakness` field in the JSON. If a hero is fighting a villain that matches the villain in their `weakness` field their score is weakened by 1 point. Lets write some code to handle this.