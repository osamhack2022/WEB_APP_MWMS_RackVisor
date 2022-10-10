import { Prisma, PrismaClient, User } from '@prisma/client';
import { INSPECT_MAX_BYTES } from 'buffer';
import fastify from 'fastify';

const prisma = new PrismaClient();
const app = fastify();

app.register(require('@fastify/swagger'), {
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'MWMS',
      description: "MWMS' rest api swagger",
      version: '1.0.0',
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here',
    },
    host: 'localhost',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    // tags: [
    //   { name: 'user', description: 'User related end-points' },
    //   { name: 'code', description: 'Code related end-points' },
    // ],
    // definitions: {
    //   User: {
    //     type: 'object',
    //     required: ['id', 'email'],
    //     properties: {
    //       id: { type: 'string', format: 'uuid' },
    //       email: { type: 'string', format: 'email' },
    //     },
    //   },
    // },
    // securityDefinitions: {
    //   apiKey: {
    //     type: 'apiKey',
    //     name: 'apiKey',
    //     in: 'header',
    //   },
    // },
  },
  uiConfig: {
    docExpansion: 'full',
    deepLinking: true,
  },
  exposeRoute: true,
});

//test api

//routing

app.listen({ port: 3003 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`
  🚀 Server ready at: http://localhost:3003
  ⭐️ See sample requests: http://pris.ly/e/ts/rest-fastify#3-using-the-rest-api`);
});

// app.post<{
//   Body: ISignupBody;
// }>(`/signup`, async (req, res) => {
//   const { name, email, posts } = req.body;

//   const postData = posts?.map((post: Prisma.PostCreateInput) => {
//     return { title: post?.title, content: post?.content };
//   });

//   const result = await prisma.user.create({
//     data: {
//       name,
//       email,
//       posts: {
//         create: postData,
//       },
//     },
//   });
//   res.send(result);
// });

// app.post<{
//   Body: ICreatePostBody;
// }>(`/post`, async (req, res) => {
//   const { title, content, authorEmail } = req.body;
//   const result = await prisma.post.create({
//     data: {
//       title,
//       content,
//       author: { connect: { email: authorEmail } },
//     },
//   });
//   res.send(result);
// });

// app.put<{
//   Params: IPostByIdParam;
// }>("/post/:id/views", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const post = await prisma.post.update({
//       where: { id: Number(id) },
//       data: {
//         viewCount: {
//           increment: 1,
//         },
//       },
//     });

//     res.send(post);
//   } catch (error) {
//     res.send({ error: `Post with ID ${id} does not exist in the database` });
//   }
// });

// app.put<{
//   Params: IPostByIdParam;
// }>("/publish/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const postData = await prisma.post.findUnique({
//       where: { id: Number(id) },
//       select: {
//         published: true,
//       },
//     });

//     const updatedPost = await prisma.post.update({
//       where: { id: Number(id) || undefined },
//       data: { published: !postData?.published },
//     });
//     res.send(updatedPost);
//   } catch (error) {
//     res.send({ error: `Post with ID ${id} does not exist in the database` });
//   }
// });

// app.delete<{
//   Params: IPostByIdParam;
// }>(`/post/:id`, async (req, res) => {
//   const { id } = req.params;
//   const post = await prisma.post.delete({
//     where: {
//       id: Number(id),
//     },
//   });
//   res.send(post);
// });

// app.get("/users", async (req, res) => {
//   const users = await prisma.user.findMany();
//   res.send(users);
// });

// app.get<{
//   Params: IPostByIdParam;
// }>("/user/:id/drafts", async (req, res) => {
//   const { id } = req.params;

//   const drafts = await prisma.user
//     .findUnique({
//       where: { id: Number(id) },
//     })
//     .posts({
//       where: { published: false },
//     });

//   res.send(drafts);
// });

// app.get<{
//   Params: IPostByIdParam;
// }>(`/post/:id`, async (req, res) => {
//   const { id } = req.params;

//   const post = await prisma.post.findUnique({
//     where: { id: Number(id) },
//   });
//   res.send(post);
// });

// app.get<{
//   Querystring: IFeedQueryString;
// }>("/feed", async (req, res) => {
//   const { searchString, skip, take, orderBy } = req?.query;

//   const or: Prisma.PostWhereInput = searchString
//     ? {
//         OR: [
//           { title: { contains: searchString as string } },
//           { content: { contains: searchString as string } },
//         ],
//       }
//     : {};

//   const posts = await prisma.post.findMany({
//     where: {
//       published: true,
//       ...or,
//     },
//     include: { author: true },
//     take: Number(take) || undefined,
//     skip: Number(skip) || undefined,
//     orderBy: {
//       updatedAt: orderBy as Prisma.SortOrder,
//     },
//   });

//   res.send(posts);
// });
// interface IFeedQueryString {
//   searchString: string | null;
//   skip: number | null;
//   take: number | null;
//   orderBy: Prisma.SortOrder | null;
// }

// interface IPostByIdParam {
//   id: number;
// }

// interface ICreatePostBody {
//   title: string;
//   content: string | null;
//   authorEmail: string;
// }

// interface ISignupBody {
//   name: string | null;
//   email: string;
//   posts: Prisma.PostCreateInput[];
// }
