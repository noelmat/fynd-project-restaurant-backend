const { execSync } = require('child_process');

const DB_NAME = 'restaurantsDB';

try {
    execSync(`mongoimport --db ${DB_NAME} --collection addresses --drop --file "${process.cwd()}/data/seed/addresses.json" --jsonArray`);
    execSync(`mongoimport --db ${DB_NAME} --collection restaurants --drop --file "${process.cwd()}/data/seed/restaurants.json" --jsonArray`);
    execSync(`mongoimport --db ${DB_NAME} --collection restaurantusers --drop --file "${process.cwd()}/data/seed/restaurantusers.json" --jsonArray`);
    console.log(`Imported documents into database ${DB_NAME}`);
}catch(err){
    console.log( `Could not import documents into database ${DB_NAME}`);
    console.log( err );
}
