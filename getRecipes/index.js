module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');


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
};