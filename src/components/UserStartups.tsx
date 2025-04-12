import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import React from "react";
import StartupCard, { StartupCardType } from "./StartupCard";

const UserStartups = async ({ id }: { id: string }) => {
  console.log("first");
  console.log({ id });

  const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id });
  console.log({ startups });
  return (
    <>
      {startups?.length > 0 ? (
        startups.map((post: StartupCardType) => <StartupCard key={post?._id} post={post} />)
      ) : (
        <p className="no-result">No posts yet</p>
      )}
    </>
  );
};

export default UserStartups;
