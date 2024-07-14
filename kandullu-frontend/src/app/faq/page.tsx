import BackgroundSection from "@/components/BackgroundSection";
import SectionClientSay from "@/components/SectionClientSay";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import getQueryClient from "@/lib/get-query-client";
import { getFAQ } from "./queries";
import { dehydrate } from "@tanstack/react-query";
import Hydrate from "@/components/hydrate-client";
import FAQ from "./FAQ";

async function PageHome3() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({ queryKey: ["faq-page"], queryFn: getFAQ });
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <FAQ />
    </Hydrate>
  );
}

export default PageHome3;
