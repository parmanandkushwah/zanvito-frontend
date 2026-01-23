import React from "react";
import { useParams } from "react-router-dom";

function Blog() {
  const { id } = useParams();

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">
        Blog Detail Page
      </h1>
      <p className="mt-4 text-gray-600">
        Blog ID: {id}
      </p>
    </div>
  );
}

export default Blog;
