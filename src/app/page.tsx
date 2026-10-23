import { DemoBanner } from "@/components/DemoBanner";
import { Follow } from "@/components/Follow";
import { Hero } from "@/components/Hero";
import { MobileActionBar } from "@/components/MobileActionBar";
import { OrderDialogProvider } from "@/components/OrderDialog";
import { Regulars } from "@/components/Regulars";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TonightsMenu } from "@/components/TonightsMenu";
import { Visit } from "@/components/Visit";

export default function Home() {
  return (
    <OrderDialogProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-cobalt focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <DemoBanner />
      <SiteHeader />
      <main id="main">
        <Hero />
        <TonightsMenu />
        <Regulars />
        <Visit />
        <Follow />
      </main>
      <SiteFooter />
      <MobileActionBar />
    </OrderDialogProvider>
  );
}
