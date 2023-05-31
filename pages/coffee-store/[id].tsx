import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const CoffeeStoreDetails = () => {
  const router = useRouter();

  const { id } = router.query;
  return (
    <div>
      <h1>Coffee Store Details: {id}</h1>
      <Link href="/" scroll={false}>
        Back to home
      </Link>
    </div>
  );
};

export default CoffeeStoreDetails;
