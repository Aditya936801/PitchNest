import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import React from "react";

export const experimental_ppr = true;

const StartUpDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });
  console.log({ id });
  if (!post) return notFound();
  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post?._createdAt)}</p>
        <h1 className="heading">{post?.title}</h1>
        <p className="sub-heading !max-w-5xl">{post?.description}</p>
      </section>
      <section className="section_container">
        <img src={post?.image} alt="thumbnail" className="w-full h-auto rounded-xl" />
      </section>
    </>
  );
};

export default StartUpDetail;
