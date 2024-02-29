const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export default async function upsertUser(userData) {
  try {
    const user = await prisma.users.upsert({
      where: {
        email: userData.email, // Unique identifier for the upsert condition
      },
      update: {
        name: userData.name, // Fields to update if the user exists
      },
      create: {
        email: userData.email, // Data to use for creating the user if they don't exist
        name: userData.name,
        username: userData.username,
        profileImg: userData.profileImg
      },
    });

    console.log('User upserted:', user);
  } catch (error) {
    console.error('Error upserting user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Example usage
// upsertUser({ email: 'newemail@example.com', name: 'John Doe' })
//   .then(() => console.log('Upsert operation completed.'))
//   .catch(err => console.error(err));
