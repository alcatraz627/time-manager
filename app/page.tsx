import { prisma } from "@/db/client";

export default async function Home() {
  const users = await prisma.user.findMany();

  // useEffect(() => {
  //   console.log(users);
  // }, []);

  return (
    <div className="text-center">
      <div className="m-3 text-3xl">Test page</div>
      <div>{JSON.stringify(users, null, 2)}</div>
    </div>
  );
}
