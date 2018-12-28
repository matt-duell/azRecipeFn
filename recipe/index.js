const mongodb = require('mongodb');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
		context.log(`Request method type: [${context.req.method}]`);
		
		switch (context.req.method){
			case 'GET':
				doGetRecipes(context);
				break;
				case 'PUT':
				doAddNewRecipe(context);
				break;
			}
			
		};
		
		function getEnvVariable(name){
			return process.env[name];
}

function doGetRecipes(context){
	context.log('Retrieving list of recipes');
	
	const DB_CONN_STR_KEY="DB_CONN_STR";
	context.log(`DB_CONN_STR=[${getEnvVariable(DB_CONN_STR_KEY)}]`);
	const db_conn_uri = getEnvVariable(DB_CONN_STR_KEY);

	mongodb.MongoClient.connect(db_conn_uri,function(error,client){
		if(error){
			context.log('Failed to connect');
			context.res = { status:500, body: error.stack};
		}
		context.log('Connected!');

		client.db('recipes').collection('recipes').find().toArray(function(error,docs){
			if(error){
				context.log('Error running query');
				context.res = { status:500, body: error.stack};
			}
			context.log('Success!');
			context.res = {
				headers: { 'Content-Type': 'application/json'},
				body: JSON.stringify({res: docs})
			};
		});
	});


	// const recipes = [
	// 	{
	// 			"id": 1,
	// 			"name": "Shreddies",
	// 			"description": "test1",
	// 			"categories": [{"id": 1,"name": "Breakfast"}]
	// 	},
	// 	{
	// 			"id": 17,
	// 			"name": "Recipe 999",
	// 			"description": "",
	// 			"categories": [
	// 				{"id": 1,"name": "Breakfast"},
	// 				{"id": 2,"name": "dinnerYo"}
	// 			]
	// 	},
	// 	{
	// 			"id": 18,
	// 			"name": "Recipe 999",
	// 			"description": "Recipe 999 description",
	// 			"categories": [
	// 					{"id": 1,"name": "Breakfast"},
	// 					{"id": 2,"name": "dinnerYo"}
	// 			]
	// 	}
	// ];
	// context.res = {
	// 	status: 200,
	// 	body: recipes
	// };
}

function doAddNewRecipe(context){
	context.log('Adding new recipe');

	context.res = {
		status: 201
	};
}