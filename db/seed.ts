import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Content, Link } from "./types";

const prisma = new PrismaClient();

const adminUser = { email: "test@gmail.com", password: "123456" };

async function main() {
  console.log("Seeding...");

  let admin = await prisma.user.findFirst({
    where: { email: adminUser.email },
  });

  if (!admin) {
    // Insert a user into the db
    admin = await prisma.user.create({
      data: {
        name: "Admin",
        email: adminUser.email,
        password: bcrypt.hashSync(adminUser.password, 10),
      },
    });

    console.log("Admin user created");
  } else {
    console.log("Admin user found, no new user created");
  }

  const gymTask = await prisma.note.create({
    data: {
      title: "Gym Exercise",
      content: JSON.stringify({
        data: [{ type: "Text", content: "Thrice a week" }] as Content,
      }),
      userId: admin.id,
      type: "Task",
    },
  });

  const readingTask = await prisma.note.create({
    data: {
      title: "Read 1 Chapter",
      content: JSON.stringify({
        data: [
          { type: "Text", content: "Finish the Book\nSo you can buy more" },
        ] as Content,
      }),
      userId: admin.id,
      type: "Task",
    },
  });

  const meditateTask = await prisma.note.create({
    data: {
      title: "Meditate",
      content: JSON.stringify({
        data: [
          { type: "Text", content: "Focus" },
          { type: "Link", target: "Task", target_id: readingTask.id },
        ] as Content,
      }),
      userId: admin.id,
      type: "Task",
    },
  });

  console.log("Three tasks created");

  const taskManagerNote = await prisma.note.create({
    data: {
      title: "Task Manager",
      content: JSON.stringify({
        data: [
          { type: "Text", content: "Manage your tasks" },
          { type: "Link", target: "Task", target_id: gymTask.id },
          { type: "Link", target: "Task", target_id: meditateTask.id },
        ] as Content,
      }),
      userId: admin.id,
      type: "Note",
    },
  });

  const board = await prisma.board.create({
    data: {
      title: "Todo Manager",
      content: {
        links: [
          { type: "Link", target: "Note", target_id: taskManagerNote.id },
          { type: "Link", target: "Task", target_id: readingTask.id },
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
