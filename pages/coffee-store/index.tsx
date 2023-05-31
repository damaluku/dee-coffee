import Link from "next/link";
import React from "react";

const CoffeeStore = () => {
  return (
    <div>
      <h1>All Coffee Stores</h1>
      <Link href="/" prefetch>
        Back to home
      </Link>
    </div>
  );
};

export default CoffeeStore;
