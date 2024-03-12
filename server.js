const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();
    server.use(bodyParser.json());
    server.use(cors());

    // Define custom routes here, e.g.,
    // server.get('/my-route', (req, res) => handleRequest(req, res));
    server.post('/api/insertRecipe', async (req, res) => {
        const {ingredients, email, nutritionFacts, recipeName, dateCreated} = req.body;
        console.log("insertRecipe received: ", ingredients, " and ", email, " and ", nutritionFacts);
        try { 
          const recipe = await prisma.recipes.create({
            data: {
              ingredients,
              email,
              nutritionFacts,
              recipeName,
              dateCreated
            }
          });
          
          res.status(200).json({response: "recipe inserted successfully"})
          console.log('Recipe inserted:', ingredients);
        } catch (error) {
            console.error(error.message); // Log the error message
            res.status(500).json({ error: error.message }); // Send the error message
        }
    
        // res.status(200).json({response: `Server received your ingredients: ${ingredients}. And email: ${email}`});
    });

    server.post('/api/deleteRecipe', async (req, res) => {
      const {recipeID} = req.body;
      console.log("deleteRecipe received: ", recipeID);

      try {
        const deleteRecipe = await prisma.recipes.deleteOne({
          _id: recipeID
        })

        res.status(200).json({response: `recipe id, ${recipeID}, deleted successfully`})
        console.log('Recipe id deleted:', recipeID);
      } catch(error) {
        console.error(error.message);
        res.status(500).json({error: error.message})
      }
    });

    server.post('/api/userRecipes', async (req, res) => {
        const {email} = req.body;
        console.log("userRecipes received.")
        console.log(`fetch ${email}'s recipes...`)

        try { 
            const recipes = await prisma.recipes.findMany({
              where: {
                email: {
                    equals: email
                }
              }
            });
            
            res.status(200).json({response: "recipes found successfully", recipes: recipes})
            console.log('Recipes found for:', email);
          } catch (error) {
              console.error(error.message); // Log the error message
              res.status(500).json({ error: error.message }); // Send the error message
          }
    });

    // Handle all other Next.js requests
    server.all('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
