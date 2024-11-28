import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth";

const prismaClientSingleton = () => {
  const prisma = new PrismaClient().$extends({
    query: {
      $allModels: {
        async findMany({ model, operation, args, query }) {
          if (model === "Tenant" || model === "User") return query(args);

          const session = await auth();

          if (!session?.user) return query(args);
          args.where = { ...args.where, tenantId: session.user.tenantId };
          return query(args);
        },
        async count({ model, operation, args, query }) {
          if (model === "Tenant" || model === "User") return query(args);

          const session = await auth();

          if (!session?.user) return query(args);
          args.where = { ...args.where, tenantId: session.user.tenantId };
          return query(args);
        },
        async create({ model, operation, args, query }) {
          if (model === "Tenant" || model === "User") return query(args);

          const session = await auth();

          if (!session?.user) return query(args);

          args.data.tenantId = session.user.tenantId;
          args.data.userId = session.user.id;

          return query(args);
        },
      },
    },
  });

  return prisma;
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
