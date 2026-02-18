type PageShellProps = {
  kicker?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function PageShell({ kicker, title, subtitle, children }: PageShellProps) {
  return (
    <main className="page">
      <section className="page-hero">
        <div className="page-inner">
          {kicker ? <div className="page-kicker">{kicker}</div> : null}
          <h1 className="page-title">{title}</h1>
          {subtitle ? <p className="page-subtitle">{subtitle}</p> : null}
        </div>
      </section>

      <section className="page-body">
        <div className="page-inner">{children}</div>
      </section>
    </main>
  );
}
