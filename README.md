![travis build badge](https://travis-ci.org/FrutosGaston/simple-medical-institution.svg?branch=master)

# Simple Medical Institution	

## Structure

I chose to use an onion architecture like the one in the graphic below because of its simplicity and my need for quick results. 
For those same reasons and since there is no logic in between, I had no need to use the 'Services' layer to communicate the 'Controllers' with 'Models'. 
The database is MongoDB and there are no external API's at the moment.

![](https://i2.wp.com/www.coreycleary.me/wp-content/uploads/2018/11/Express-REST-API-Struc.png?w=741&ssl=1)

Also, I had to make business assumptions on schema building like the relationship between entities. 
Some collections were absorbed by others (e.g Guardian or Inmunizations as subcollections of Client). Some are independent (e.g Medications, Plans Of Care) because of their complexity.

## Code Sanity	
I tested part of the code with Mocha and everything is covered with ESLint, which is configured with several rules.
TravisCI runs these specs to validate the master branch.  

## Security
- Helmet is configured and covering some insecurities as described [here](https://www.npmjs.com/package/helmet).
- HPP setted up for parameter pollution.
- Enforces SSL configurable via env to accept only HTTPS requests.
- Limiter also configurable via env to limit users requests.
- CORS requests: currently all requests are enabled, but it could be configured for some specific origins very easily. 
- Fields are validated at the request and db level.

## Cache
GET requests are being cached in Redis with configurable TTL. When the same resource is called with a data modifying method, the key is flushed.

## Filters
Every find request is able to filter elements with the following query params:
- `limit` (default 10): limits the amount of elements returned per page.
- `page` (default 1): brings the elements from the specified page by the limit.
- `sort` (default -createdAt): `+|-fieldName` sorts the elements by the specified field in order - (desc) or + (asc).
- `fieldName`: select the elements where the specified field has this value. 
- `fieldName[gt|gte|lt|lte|eq|ne]`: same as above but with greater than, less than and its family.

## Local Setup
The project needs an instance of Redis and Mongo running, then you can run
`npm install && npm start`.
Otherwise, you could just run `docker-compose up` and everything is set up for you automatically.

## Try it Out
The app is running on heroku [here](https://simple-medical-institution.herokuapp.com/) (the first time could take a while, the dyno might be sleeping)
<br>
<img src="https://rlv.zcache.com/dinosnore_cute_sleeping_dinosaur_pun_poster-rda559156c4164de8875c8a2daca1c8b0_w2q_8byvr_704.jpg" width="150">
<br>
This [postman collection](https://www.getpostman.com/collections/83f1f41e6e303f9c8b28) may help you to test the API.
<br>
