import { notFound } from "next/navigation";
import { PortfolioApp } from "@/components/PortfolioApp";
import { PageContent } from "@/components/PageContent";
import { profile } from "@/lib/profile";

export async function generateStaticParams() {
  return profile.projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = profile.projects.find((p) => p.slug === slug);
  if (!project) notFound();
  return (
    <PortfolioApp
      initialCommand={`cat ${project.id}`}
      scrollTo={`#project-${slug}`}
    >
      <PageContent />
    </PortfolioApp>
  );
}
