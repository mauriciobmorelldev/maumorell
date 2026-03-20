import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CaseStudyLayout from "@/components/work/CaseStudyLayout";
import { getNextProject, getWorkBySlug, workProjects } from "@/lib/work-data";

export async function generateStaticParams() {
  return workProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const project = getWorkBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} | Mauricio Morell`,
    description: project.summary,
  };
}

export default function WorkPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const project = getWorkBySlug(slug);
  if (!project) notFound();

  const nextProject = getNextProject(slug);

  return (
    <CaseStudyLayout
      title={project.title}
      category={project.category}
      summary={project.summary}
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Work", href: "/#casos" },
        { label: project.title, href: `/work/${project.slug}` },
      ]}
      metaBlocks={project.metaBlocks}
      gallery={project.gallery}
      cta={project.cta}
      nextProject={nextProject ?? undefined}
    />
  );
}
