import Image from "next/image";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import SearchBar from "../_components/SearchBar";
import Feed from "../_components/Feed";

export default async function BlankSearchPage() {
  const [results, session, tags] = await Promise.all([
    prisma.product.findMany({
      select: {
        id: true,
        title: true,
        desc: true,
        pricePaidInCents: true,
        discountInPercent: true,
        productImage: true,
        tags: {
          select: {
            id: true,
            title: true,
          },
        },
        owner: {
          select: {
            name: true,
            image: true,
            id: true,
            email: true,
          },
        },
      },
    }),
    getServerSession(authOptions),
    prisma.tag.findMany(),
  ]);
  return (
    <div className="container mt-10">
      <SearchBar tags={tags} />
      <h1 className="text-4xl">Products</h1>
      <Feed results={results} session={session} />
    </div>
  );
}
