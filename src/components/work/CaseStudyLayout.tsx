import Image from "next/image";
import Link from "next/link";
import BackButton from "@/components/work/BackButton";

export type BreadcrumbItem = {
  label: string;
  href: string;
};

export type CaseStudyLayoutProps = {
  title: string;
  category?: string;
  breadcrumb: BreadcrumbItem[];
  summary?: string;
  metaBlocks?: Array<{ label: string; value: string }>;
  gallery: Array<{ src: string; alt: string; priority?: boolean }>;
  cta?: { label: string; href: string };
  nextProject?: { title: string; href: string };
  showBackButton?: boolean;
};

export default function CaseStudyLayout({
  title,
  category,
  breadcrumb,
  summary,
  metaBlocks,
  gallery,
  cta,
  nextProject,
  showBackButton = true,
}: CaseStudyLayoutProps) {
  return (
    <article className="mx-auto w-full max-w-5xl px-6 pb-24 pt-12">
      <nav className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
        {breadcrumb.map((item, index) => (
          <span key={item.href} className="flex items-center gap-3">
            <Link href={item.href}>{item.label}</Link>
            {index < breadcrumb.length - 1 ? <span>/</span> : null}
          </span>
        ))}
        {showBackButton ? <BackButton className="btn-secondary ml-auto" /> : null}
      </nav>

      <header className="mt-10 space-y-4">
        {category ? <p className="kicker">{category}</p> : null}
        <h1 className="section-title">{title}</h1>
        {summary ? <p className="section-subtitle">{summary}</p> : null}
        {cta ? (
          <a className="btn-primary w-fit" href={cta.href}>
            {cta.label}
          </a>
        ) : null}
      </header>

      {metaBlocks && metaBlocks.length > 0 ? (
        <section className="mt-10 grid gap-4 md:grid-cols-3">
          {metaBlocks.map((block) => (
            <div
              key={block.label}
              className="glass rounded-3xl p-5 text-sm"
            >
              <p className="kicker">{block.label}</p>
              <p className="mt-3 text-lg font-semibold">{block.value}</p>
            </div>
          ))}
        </section>
      ) : null}

      <section className="mt-12 grid gap-6">
        {gallery.map((image) => (
          <div
            key={image.src}
            className="overflow-hidden rounded-3xl border border-[var(--ring)] bg-[var(--surface-strong)]"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={1200}
              height={720}
              priority={image.priority}
              className="h-auto w-full object-cover"
            />
          </div>
        ))}
      </section>

      {nextProject ? (
        <section className="mt-14 flex items-center justify-between rounded-3xl border border-[var(--ring)] bg-[var(--surface)] p-6">
          <div>
            <p className="kicker">Siguiente proyecto</p>
            <p className="mt-2 text-lg font-semibold">{nextProject.title}</p>
          </div>
          <Link className="btn-secondary" href={nextProject.href}>
            Ver proyecto
          </Link>
        </section>
      ) : null}
    </article>
  );
}
