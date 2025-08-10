"use client";

import { useEffect, useState } from "react";


export default function HelloPage() {
  const [data, setData] = useState<{ message: string } | null>(null);

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      <h1>{data ? data.message : "Loading..."}</h1>
    </div>
  );
}
