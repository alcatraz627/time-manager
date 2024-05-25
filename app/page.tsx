import { prisma } from "@/db/client";

export default async function Page() {
  const users = await prisma.user.findMany();

  // useEffect(() => {
  //   console.log(users);
  // }, []);

  return <div>Home</div>;
}
