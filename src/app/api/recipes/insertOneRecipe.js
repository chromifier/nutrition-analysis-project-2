const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export default async function insertOneRecipe(recipeData) {
  try {
    const recipe = await prisma.recipes.insertOne({
      create: {
        email: recipeData.email, // Data to use for creating the user if they don't exist
        name: recipeData.name,
        username: recipeData.username,
        profileImg: recipeData.profileImg
      },
    });

    console.log('Recipe inserted:', recipeData);
  } catch (error) {
    console.error('Error inserting recipe:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Example usage
// upsertUser({ email: 'newemail@example.com', name: 'John Doe' })
//   .then(() => console.log('Upsert operation completed.'))
//   .catch(err => console.error(err));
