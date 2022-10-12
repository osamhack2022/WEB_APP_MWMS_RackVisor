import buildServer from './server';

const server = buildServer();

async function main() {
  try {
    await server.listen({ port: 3003 }, (err, address) => {
      console.log(`
      🚀 Server ready at: http://localhost:3003
      ⭐️ See sample requests: http://pris.ly/e/ts/rest-fastify#3-using-the-rest-api`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
