module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
		// DB_CONN_STR
		context.log(`DB_CONN_STR=[${getEnvVariable(DB_CONN_STR)}]`);
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
	const recipes = [
		{
				"id": 1,
				"name": "Shreddies",
				"description": "test1",
				"categories": [{"id": 1,"name": "Breakfast"}]
		},
		{
				"id": 17,
				"name": "Recipe 999",
				"description": "",
				"categories": [
					{"id": 1,"name": "Breakfast"},
					{"id": 2,"name": "dinnerYo"}
				]
		},
		{
				"id": 18,
				"name": "Recipe 999",
				"description": "Recipe 999 description",
				"categories": [
						{"id": 1,"name": "Breakfast"},
						{"id": 2,"name": "dinnerYo"}
				]
		}
	];
	context.res = {
		status: 200,
		body: recipes
	};
}

function doAddNewRecipe(context){
	context.log('Adding new recipe');

	context.res = {
		status: 201
	};
}