import { PortfolioApp } from "@/components/PortfolioApp";
import { PageContent } from "@/components/PageContent";

export default function WorkPage() {
  return (
    <PortfolioApp initialCommand="ls projects" scrollTo="#projects">
      <PageContent />
    </PortfolioApp>
  );
}
