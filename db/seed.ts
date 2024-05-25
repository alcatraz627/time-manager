import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

enum LineTypeEnum {
  Link = "Link",
  Text = "Text",
}
type Link = {
  type: "Link";
  target: "Task" | "Note" | "Goal";
  target_id: string;
};

type Text = {
  type: "Text";
  content: string;
};

type Line = Link | Text;
type Content = Line[];

async function main() {
  console.log("Seeding...");

  // Insert a user into the db
  const admin = await prisma.user.create({
    data: {
      name: "Admin",
      email: "test@gmail.com",
      password: bcrypt.hashSync("123456", 10),
    },
  });

  console.log("Admin user created");

  const taskOne = await prisma.task.create({
    data: {
      title: "First <b>Task</b>",
      content: JSON.stringify({
        data: [{ type: "Text", content: "Test content" }] as Content,
      }),
      userId: admin.id,
    },
  });

  console.log("Task one created");

  const taskTwo = await prisma.task.create({
    data: {
      title: "Yet another <i>Task</i>",
      content: JSON.stringify({
        data: [{ type: "Text", content: "Another body\nnew line" }] as Content,
      }),
      userId: admin.id,
    },
  });

  console.log("Task two created");

  const board = await prisma.board.create({
    data: {
      title: "Todo Manager",
      content: {
        links: [
          { type: "Link", target: "Task", target_id: taskOne.id },
          { type: "Link", target: "Task", target_id: taskTwo.id },
        ] as Link[],
      },
    },
  });

  console.log("Board created");

  await prisma.user.update({
    where: { id: admin.id },
    data: {
      boards: {
        connect: { id: board.id },
      },
    },
  });

  console.log("Admin user connected to board");

  return;
}

main()
  .then(() => {
    console.log("Seed complete");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
