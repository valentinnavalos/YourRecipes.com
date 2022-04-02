/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Recipe, conn } = require("../../src/db.js");

const agent = session(app);

// describe("/recipes?name=`...`", () => {
//   // it("GET responde con un msj adecuado si se llama sin pasarle query", () =>
//   //   agent
//   //     .get("/recipes?name=")
//   //     .expect(404)
//   //     // .expect("Content-Type", /json/)
//   //     .expect((res) => {
//   //       expect(res.body).to.equal("Please fill the input to search.");
//   //     }));

//   it("GET responde con el listado de recetas que contengan la palabra pasada por query", () =>
//     agent
//       .get("/recipes?name=rice")
//       .expect(200)
//       .expect("Content-Type", /json/)
//       .expect((res) => {
//         expect(res.body).to.equal([
//           {
//             id: 716426,
//             title: "Cauliflower, Brown Rice, and Vegetable Fried Rice",
//             summary:
//               'Cauliflower, Brown Rice, and Vegetable Fried Rice might be a good recipe to expand your side dish recipe box. Watching your figure? This gluten free, dairy free, lacto ovo vegetarian, and vegan recipe has <b>192 calories</b>, <b>7g of protein</b>, and <b>6g of fat</b> per serving. For <b>$1.12 per serving</b>, this recipe <b>covers 19%</b> of your daily requirements of vitamins and minerals. This recipe serves 8. This recipe from fullbellysisters.blogspot.com has 3689 fans. This recipe is typical of Chinese cuisine. From preparation to the plate, this recipe takes about <b>30 minutes</b>. Head to the store and pick up peas, broccoli, salt, and a few other things to make it today. Overall, this recipe earns an <b>awesome spoonacular score of 100%</b>. Users who liked this recipe also liked <a href="https://spoonacular.com/recipes/vegetable-fried-brown-rice-36199">Vegetable Fried Brown Rice</a>, <a href="https://spoonacular.com/recipes/vegetable-fried-cauliflower-rice-933261">Vegetable Fried Cauliflower Rice</a>, and <a href="https://spoonacular.com/recipes/easy-vegetable-fried-brown-rice-with-egg-802042">Easy Vegetable Fried Brown Rice with Egg</a>.',
//             spoonacularScore: 100,
//             healthScore: 76,
//             steps: [
//               {
//                 number: 1,
//                 step: 'Remove the cauliflower\'s tough stem and reserve for another use. Using a food processor, pulse cauliflower florets until they resemble rice or couscous. You should end up with around four cups of "cauliflower rice."',
//                 ingredients: [
//                   {
//                     id: 10011135,
//                     name: "cauliflower florets",
//                     localizedName: "cauliflower florets",
//                     image: "cauliflower.jpg",
//                   },
//                   {
//                     id: 10111135,
//                     name: "cauliflower rice",
//                     localizedName: "cauliflower rice",
//                     image: "cauliflower.jpg",
//                   },
//                   {
//                     id: 11135,
//                     name: "cauliflower",
//                     localizedName: "cauliflower",
//                     image: "cauliflower.jpg",
//                   },
//                   {
//                     id: 20028,
//                     name: "couscous",
//                     localizedName: "couscous",
//                     image: "couscous-cooked.jpg",
//                   },
//                   {
//                     id: 20444,
//                     name: "rice",
//                     localizedName: "rice",
//                     image: "uncooked-white-rice.png",
//                   },
//                 ],
//                 equipment: [
//                   {
//                     id: 404771,
//                     name: "food processor",
//                     localizedName: "food processor",
//                     image: "food-processor.png",
//                   },
//                 ],
//               },
//               {
//                 number: 2,
//                 step: "Heat 1T butter and 1T oil in a large skillet over medium heat.",
//                 ingredients: [
//                   {
//                     id: 1001,
//                     name: "butter",
//                     localizedName: "butter",
//                     image: "butter-sliced.jpg",
//                   },
//                   {
//                     id: 4582,
//                     name: "cooking oil",
//                     localizedName: "cooking oil",
//                     image: "vegetable-oil.jpg",
//                   },
//                 ],
//                 equipment: [
//                   {
//                     id: 404645,
//                     name: "frying pan",
//                     localizedName: "frying pan",
//                     image: "pan.png",
//                   },
//                 ],
//               },
//               {
//                 number: 3,
//                 step: "Add garlic and the white and light green pieces of scallion. Sauté about a minute.",
//                 ingredients: [
//                   {
//                     id: 11291,
//                     name: "green onions",
//                     localizedName: "green onions",
//                     image: "spring-onions.jpg",
//                   },
//                   {
//                     id: 11215,
//                     name: "garlic",
//                     localizedName: "garlic",
//                     image: "garlic.png",
//                   },
//                 ],
//                 equipment: [],
//               },
//               {
//                 number: 4,
//                 step: "Add the cauliflower to the pan. Stir to coat with oil, then spread out in pan and let sit; you want it cook a bit and to caramelize (get a bit brown), which will bring out the sweetness. After a couple of minutes, stir and spread out again.",
//                 ingredients: [
//                   {
//                     id: 11135,
//                     name: "cauliflower",
//                     localizedName: "cauliflower",
//                     image: "cauliflower.jpg",
//                   },
//                   {
//                     id: 0,
//                     name: "spread",
//                     localizedName: "spread",
//                     image: "",
//                   },
//                   {
//                     id: 4582,
//                     name: "cooking oil",
//                     localizedName: "cooking oil",
//                     image: "vegetable-oil.jpg",
//                   },
//                 ],
//                 equipment: [
//                   {
//                     id: 404645,
//                     name: "frying pan",
//                     localizedName: "frying pan",
//                     image: "pan.png",
//                   },
//                 ],
//               },
//               {
//                 number: 5,
//                 step: "Add cold rice (it separates easily, so it won't clump up during cooking), plus the additional grapeseed and coconut oil or butter. Raise heat to medium-high. Toss everything together and, again, spread the mixture out over the whole pan and press a bit into the bottom.",
//                 ingredients: [
//                   {
//                     id: 4047,
//                     name: "coconut oil",
//                     localizedName: "coconut oil",
//                     image: "oil-coconut.jpg",
//                   },
//                   {
//                     id: 1001,
//                     name: "butter",
//                     localizedName: "butter",
//                     image: "butter-sliced.jpg",
//                   },
//                   {
//                     id: 0,
//                     name: "spread",
//                     localizedName: "spread",
//                     image: "",
//                   },
//                   {
//                     id: 20444,
//                     name: "rice",
//                     localizedName: "rice",
//                     image: "uncooked-white-rice.png",
//                   },
//                 ],
//                 equipment: [
//                   {
//                     id: 404645,
//                     name: "frying pan",
//                     localizedName: "frying pan",
//                     image: "pan.png",
//                   },
//                 ],
//               },
//               {
//                 number: 6,
//                 step: "Let it sit for about two minutes—so the rice can get toasted and a little crispy.",
//                 ingredients: [
//                   {
//                     id: 20444,
//                     name: "rice",
//                     localizedName: "rice",
//                     image: "uncooked-white-rice.png",
//                   },
//                 ],
//                 equipment: [],
//                 length: {
//                   number: 2,
//                   unit: "minutes",
//                 },
//               },
//               {
//                 number: 7,
//                 step: "Add the peas and broccoli and stir again.",
//                 ingredients: [
//                   {
//                     id: 11090,
//                     name: "broccoli",
//                     localizedName: "broccoli",
//                     image: "broccoli.jpg",
//                   },
//                   {
//                     id: 11304,
//                     name: "peas",
//                     localizedName: "peas",
//                     image: "peas.jpg",
//                   },
//                 ],
//                 equipment: [],
//               },
//               {
//                 number: 8,
//                 step: "Drizzle soy sauce and toasted sesame oil over rice.Cook for another minute or so and turn off heat.",
//                 ingredients: [
//                   {
//                     id: 4058,
//                     name: "sesame oil",
//                     localizedName: "sesame oil",
//                     image: "sesame-oil.png",
//                   },
//                   {
//                     id: 16124,
//                     name: "soy sauce",
//                     localizedName: "soy sauce",
//                     image: "soy-sauce.jpg",
//                   },
//                   {
//                     id: 20444,
//                     name: "rice",
//                     localizedName: "rice",
//                     image: "uncooked-white-rice.png",
//                   },
//                 ],
//                 equipment: [],
//               },
//               {
//                 number: 9,
//                 step: "Add chopped scallion tops and toss.I like to toast some sesame seeds in a dry pan; I sprinkle these and some more raw, chopped scallion over the top of the rice for added flavor and crunch.Season to taste with salt and, if you'd like, more soy sauce. Keep in mind that if you're serving this with something salty and saucy (ie. teriyaki chicken) you may want to hold off on adding too much salt to the fried rice.",
//                 ingredients: [
//                   {
//                     id: 12023,
//                     name: "sesame seeds",
//                     localizedName: "sesame seeds",
//                     image: "sesame-seeds.png",
//                   },
//                   {
//                     id: 16124,
//                     name: "soy sauce",
//                     localizedName: "soy sauce",
//                     image: "soy-sauce.jpg",
//                   },
//                   {
//                     id: 11291,
//                     name: "green onions",
//                     localizedName: "green onions",
//                     image: "spring-onions.jpg",
//                   },
//                   {
//                     id: 5006,
//                     name: "whole chicken",
//                     localizedName: "whole chicken",
//                     image: "whole-chicken.jpg",
//                   },
//                   {
//                     id: 18070,
//                     name: "toast",
//                     localizedName: "toast",
//                     image: "toast",
//                   },
//                   {
//                     id: 20444,
//                     name: "rice",
//                     localizedName: "rice",
//                     image: "uncooked-white-rice.png",
//                   },
//                   {
//                     id: 2047,
//                     name: "salt",
//                     localizedName: "salt",
//                     image: "salt.jpg",
//                   },
//                 ],
//                 equipment: [
//                   {
//                     id: 404645,
//                     name: "frying pan",
//                     localizedName: "frying pan",
//                     image: "pan.png",
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             id: 794349,
//             title: "Broccoli and Chickpea Rice Salad",
//             summary:
//               'Need a <b>gluten free and vegan main course</b>? Broccoli and Chickpea Rice Salad could be a spectacular recipe to try. One serving contains <b>524 calories</b>, <b>19g of protein</b>, and <b>12g of fat</b>. For <b>$1.38 per serving</b>, this recipe <b>covers 36%</b> of your daily requirements of vitamins and minerals. Head to the store and pick up almonds, olive oil, 2 tablespoons pineapple juice (juice from canned pineapple), and a few other things to make it today. 42 people have made this recipe and would make it again. From preparation to the plate, this recipe takes approximately <b>45 minutes</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 99%</b>. This score is spectacular. Similar recipes include <a href="https://spoonacular.com/recipes/easy-balsamic-chickpea-brown-rice-broccoli-salad-101160">Easy Balsamic Chickpea, Brown Rice & Broccoli Salad</a>, <a href="https://spoonacular.com/recipes/super-easy-chickpea-brown-rice-broccoli-crockpot-casserole-584241">Super Easy Chickpea, Brown Rice & Broccoli Crockpot Casserole</a>, and <a href="https://spoonacular.com/recipes/chickpea-and-broccoli-salad-29686">Chickpean And Broccoli Salad</a>.',
//             spoonacularScore: 99,
//             healthScore: 100,
//             steps: [
//               {
//                 number: 1,
//                 step: "In a large skillet, heat the oil over medium heat.",
//                 ingredients: [
//                   {
//                     id: 4582,
//                     name: "cooking oil",
//                     localizedName: "cooking oil",
//                     image: "vegetable-oil.jpg",
//                   },
//                 ],
//                 equipment: [
//                   {
//                     id: 404645,
//                     name: "frying pan",
//                     localizedName: "frying pan",
//                     image: "pan.png",
//                   },
//                 ],
//               },
//               {
//                 number: 2,
//                 step: "Add the broccoli, stir well, and cover. Cook, stirring often, until the broccoli is tender.",
//                 ingredients: [
//                   {
//                     id: 11090,
//                     name: "broccoli",
//                     localizedName: "broccoli",
//                     image: "broccoli.jpg",
//                   },
//                 ],
//                 equipment: [],
//               },
//               {
//                 number: 3,
//                 step: "Add the broccoli to a large bowl, along with the remaining salad ingredients.To make the dressing, whisk together all of the dressing ingredients in a small bowl.",
//                 ingredients: [
//                   {
//                     id: 11090,
//                     name: "broccoli",
//                     localizedName: "broccoli",
//                     image: "broccoli.jpg",
//                   },
//                 ],
//                 equipment: [
//                   {
//                     id: 404661,
//                     name: "whisk",
//                     localizedName: "whisk",
//                     image: "whisk.png",
//                   },
//                   {
//                     id: 404783,
//                     name: "bowl",
//                     localizedName: "bowl",
//                     image: "bowl.jpg",
//                   },
//                 ],
//               },
//               {
//                 number: 4,
//                 step: "Pour the dressing over the salad and toss well to coat evenly. Taste for seasoning and serve.",
//                 ingredients: [
//                   {
//                     id: 1042027,
//                     name: "seasoning",
//                     localizedName: "seasoning",
//                     image: "seasoning.png",
//                   },
//                 ],
//                 equipment: [],
//               },
//             ],
//           },
//         ]);
//       }));
// });

// const recipe = {
//   title: 'Milanesa a la napolitana',
//   summary: 'Milanesa cubierta con salsa de tomate y queso mozzarella.'
// };

// describe('Recipe routes', () => {
//   before(() => conn.authenticate()
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   }));
//   beforeEach(() => Recipe.sync({ force: true })
//     .then(() => Recipe.create(recipe)));
//   describe('GET /recipes', () => {
//     it('should get 200', () =>
//       agent.get('/recipes').expect(200)
//     );
//   });
// });
