const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function main() {

  // Example Users
  const user1 = await prisma.user.create({
    data: {
      first_name: 'Alex',
      last_name: 'Guitarist',
      email: 'alex@example.com',
      password: 'hashedpassword',
      location: 'MPK',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      first_name: 'Wellington',
      last_name: 'Mapise',
      email: 'wellington@example.com',
      password: 'hashedpassword',
      location: 'Remote',
    },
  });

  // Example Posts
  await prisma.post.create({
    data: {
      title: 'Learn Guitar',
      description: 'Beginner lessons',
      category: 'Music',
      type: 'OFFER',
      location: 'MPK',
      imageUrl: 'https://picsum.photos/200/300',
      userId: user1.id,
    },
  });

  await prisma.post.create({
    data: {
      title: 'Need help with SQL',
      description: 'Looking for basic SQL tutoring',
      category: 'Coding',
      type: 'REQUEST',
      location: 'Remote',
      imageUrl: 'https://picsum.photos/200',
      userId: user2.id,
    },
  });

  await prisma.post.create({
    data: {
      title: 'Need help with SQL',
      description: 'Looking for basic SQL tutoring',
      category: 'Coding',
      type: 'REQUEST',
      location: 'Remote',
      imageUrl: 'https://picsum.photos/200',
      userId: user2.id,
    },
  });

  await prisma.post.create({
    data: {
      title: 'Need help with SQL',
      description: 'Looking for basic SQL tutoring',
      category: 'Coding',
      type: 'REQUEST',
      location: 'Remote',
      imageUrl: 'https://picsum.photos/200',
      userId: user2.id,
    },
  });


  await prisma.post.create({
    data: {
      title: 'Need help with SQL',
      description: 'Looking for basic SQL tutoring',
      category: 'Coding',
      type: 'REQUEST',
      location: 'Remote',
      imageUrl: 'https://picsum.photos/200',
      userId: user2.id,
    },
  });


  await prisma.post.create({
    data: {
      title: 'Need help with SQL',
      description: 'Looking for basic SQL tutoring',
      category: 'Coding',
      type: 'REQUEST',
      location: 'Remote',
      imageUrl: 'https://picsum.photos/200',
      userId: user2.id,
    },
  });

  await prisma.review.create({
    data: {
      comment: 'Great teacher',
      recipientId: user2.id,
      reviewerId: user1.id,
    },
  });
}

main()
  .then(() => {
    console.log('Database seeded');
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
