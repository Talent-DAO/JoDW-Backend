const { prisma } = require('../db');

async function main() {
  // Seed Networks
  const supportedNetworks = [
    {
      data: {
        name: "Ethereum",
        status: 'active',
        metadata: {}
      },
      chains: [
        {
          name: 'Hardhat',
          status: 'active',
          metadata: {
            "endpoint": "http://localhost:8545"
          }
        }
      ]
    },
  ]

  supportedNetworks.forEach(async item => {
    const nw = await prisma.network.upsert({
      where: {
        name: item.data.name,
      },
      update: {},
      create: item.data
    });
    if (nw?.id) {
      item.chains.forEach(async chain => {
        const ch = await prisma.chain.upsert({
          where: {
            name: chain?.name,
          },
          update: {},
          create: chain
        })

        if (!ch?.id) {
          throw new Error(`Chain ${chain.name} in network ${item.data.name} did not get seeded!`);
        }
      })
    } else {
      throw new Error(`Network ${item.data.name} did not get seeded!`);
    }
  })

  // Seed category, subject, topic
  const initialCategories = [
    {
      data: {
        name: "Technology",
        description: "Technology covers everything that is a practical application of knowledge.",
      },
      subjects: [
        {
          data: {
            name: "Information Technology",
            description: "Covers everything under the sphere of IT!",
          },
          topics: [
            {
              data: {
                name: "Web3",
                description: "Decentralized web topics",
              }
            }
          ]
        }
      ]
    }
  ]

  initialCategories.forEach(async item => {
    const cat = await prisma.category.upsert({
      where: {
        name: item.data.name,
      },
      update: {},
      create: item.data,
    });
    if (cat?.id) {
      item.subjects.forEach(async subject => {
        const sub = await prisma.subject.upsert({
          where: {
            categoryId: cat?.id,
            name: subject?.data.name,
          },
          update: {},
          create: {...subject.data, categoryId: cat?.id,},
        })

        if (!sub?.id) {
          throw new Error(`Subject ${subject.data.name} in category ${item.data.name} did not get seeded!`);
        } else {
          subject.topics.forEach(async topic => {
            const tpc = await prisma.topic.upsert({
              where: {
                subjectId: sub?.id,
                name: topic?.data.name,
              },
              update: {},
              create: {...topic.data, subjectId: sub?.id,},
            })
    
            if (!tpc?.id) {
              throw new Error(`Topic ${topic.data.name} under subject ${subject.data.name} in category ${item.data.name} did not get seeded!`);
            }
          });
        }
      })
    } else {
      throw new Error(`Category ${item.data.name} did not get seeded!`);
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });