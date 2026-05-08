import { PortfolioApp } from "@/components/PortfolioApp";
import { PageContent } from "@/components/PageContent";

export default function ContactPage() {
  return (
    <PortfolioApp initialCommand="contact" scrollTo="#contact">
      <PageContent />
    </PortfolioApp>
  );
}
