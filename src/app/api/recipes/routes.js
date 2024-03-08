import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

console.log("insertOneRecipe");

export async function POST(req, res) {
  if (req.method === 'POST') {
    const { ingredients, userId } = req.body;
    try { 
      const recipe = await prisma.recipes.create({
        data: {
          ingredients,
          userId
        }
      });
      
      res.status(200).json(post)
      console.log('Recipe inserted:', recipeData);
    } catch (error) {
      console.error('Error inserting recipe:', error);
      res.status(400).json({ error: "Something went wrong" })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
  
}