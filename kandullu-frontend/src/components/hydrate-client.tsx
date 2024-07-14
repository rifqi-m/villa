"use client";

import { HydrationBoundary as RQHydrate } from "@tanstack/react-query";
import { DehydratedState } from "@tanstack/react-query";
interface HydrateProps {
  state?: DehydratedState;
  children: React.ReactNode;
}

function Hydrate(props: HydrateProps) {
  return <RQHydrate {...props} />;
}

export default Hydrate;
