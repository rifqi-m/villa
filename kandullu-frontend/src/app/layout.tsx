import Footer from "@/components/Footer";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import Providers from "@/utils/providers";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Poppins } from "next/font/google";
import "rc-slider/assets/index.css";
import SiteHeader from "./(client-components)/(Header)/SiteHeader";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <Providers>
          <AntdRegistry>
            <SiteHeader />
            {children}

            <Footer />
          </AntdRegistry>
        </Providers>
      </body>
    </html>
  );
}
