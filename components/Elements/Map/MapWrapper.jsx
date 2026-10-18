"use client";

import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./DynamicMap"), { ssr: false });

export default function MapWrapper() {
  return <DynamicMap />;
}
