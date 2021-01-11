# Welcome to dnaMutations API
With this API you may send a DNA chain and verify whether it has a mutation coming from more than one 4 same consecutive letters in a row, column or diagonal in any direction.
- The POST endpoint is located at https://damp-beyond-15434.herokuapp.com/mutation
- You may also check the stats of the remote DB at the endpoint https://damp-beyond-15434.herokuapp.com/stats

You may send a DNA chain to the endpoint with the following format as a JSON object, you will get a response in the form of a JSON verifying whether it has mutations or not:

"dna": ["ATGCGA","CAGTCA","TAGTTA","AGGAGA","GACTCA","TTATTT"]

- Kindly note that only one register by dna is posible

### Environment Vars
- PORT= local connection port
- ENV= development environment
- DB= AWS hosted Mongo DB address with password and name, in case its not provided MongoDB may be required to be locally setup to store the new elements on the local DB 

### Developed by:
- Gabriel Valenzuela

## Setup

If you'd like to view the project in your local environment:

-  `git clone https://github.com/Luizzmy/dnaMutations.git` in your terminal
-  `cd dnaMutations`
-  `npm i`  to install dependencies
-  `npm run dev`

## Testing

It is also possible to test the POST endpoint with the following command:
- `npm test`

#### Note that the LTS node version is required to succesfully run the project 

