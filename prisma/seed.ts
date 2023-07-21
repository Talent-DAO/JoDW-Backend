const { prisma } = require('../db');

async function main() {
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
            networkId: nw?.id,
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