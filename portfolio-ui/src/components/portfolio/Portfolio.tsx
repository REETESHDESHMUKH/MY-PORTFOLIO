"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Award, BookOpen, Braces, BriefcaseBusiness,
  BusFront, CalendarDays, ChartNoAxesColumnIncreasing, Check, ChevronDown,
  CircleDot, CodeXml, Copy, Database, Download, ExternalLink, FileText,
  Github, GraduationCap, HeartHandshake, House, Layers, Leaf, Linkedin, Mail,
  MapPin, Menu, Monitor, Network, NotebookPen, Phone, RefreshCw, Send, Server,
  Sparkles, SquareTerminal, Trophy, Users, X, type LucideIcon,
} from "lucide-react";
import { blogPosts, community, experiences, person, projectCategories, projects, skills, type ProjectCategory } from "../../data/portfolio";
import { fallbackProfiles, type CodingProfile } from "../../lib/coding-profiles.mjs";
import TechIcon, { OracleMark } from "./TechIcon";
import WelcomeIntro from "./WelcomeIntro";
import CoderAnimation from "./CoderAnimation";
import ProfilePhoto from "./ProfilePhoto";

const navigation = [
  { id: "hello", label: "Hello", icon: House },
  { id: "experience", label: "Experience", icon: BriefcaseBusiness },
  { id: "projects", label: "Projects", icon: Layers },
  { id: "coding", label: "Coding profiles", icon: SquareTerminal },
  { id: "writing", label: "Blog", icon: NotebookPen },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "contact", label: "Contact", icon: Send },
] as const;

type SectionId = (typeof navigation)[number]["id"];
const projectIcons: Record<string, LucideIcon> = { bus: BusFront, charity: HeartHandshake, blog: NotebookPen, farm: Leaf, leaf: Leaf, network: Network, wheel: CircleDot };
const skillIcons: Record<string, LucideIcon> = { code: Braces, layout: Monitor, server: Server, database: Database };
const profileIcons: Record<string, LucideIcon> = { leetcode: CodeXml, codeforces: ChartNoAxesColumnIncreasing, atcoder: Braces };
const integer = (value: number | null) => value === null ? "—" : value.toLocaleString("en-US");

function OutsideLink({ href, children, className = "", label }: { href: string; children: ReactNode; className?: string; label?: string }) {
  return <a href={href} className={className} target="_blank" rel="noopener noreferrer" aria-label={label}>{children}</a>;
}

function SectionHeading({ label, title, icon: Icon, extra }: { label: string; title: string; icon: LucideIcon; extra?: ReactNode }) {
  return <div className="section-heading"><div><p className="eyebrow"><Icon size={14} aria-hidden="true" />{label}</p><h2>{title}</h2></div>{extra}</div>;
}

function ProjectArt({ kind, title }: { kind: string; title: string }) {
  const Icon = projectIcons[kind];
  if (kind === "bus") return <div className="project-visual" aria-hidden="true"><div className="mini-ticket"><div className="mini-ticket-top"><span>BUS PRIX</span><BusFront size={18} /></div><span className="mini-ticket-title">Your next stop.</span><div className="ticket-seats">{Array.from({ length: 12 }, (_, i) => <i key={i} />)}</div><div className="ticket-route"><span>Find a route</span><ArrowRight size={14} /><span>Take a seat</span></div></div></div>;
  if (kind === "blog") return <div className="project-visual" aria-hidden="true"><div className="mini-journal"><span className="mini-journal-label">BLOGGin / A PLACE FOR WORDS</span><span>Good stories<br />start here.</span><div className="journal-lines" /><NotebookPen size={26} /></div></div>;
  return <div className={`project-visual art-${kind}`} aria-hidden="true"><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="art-icon"><Icon size={42} strokeWidth={1.35} /></div><span className="art-label">{title}</span><span className="art-spark"><Sparkles size={20} strokeWidth={1.25} /></span></div>;
}

function CodingProfiles() {
  const [profiles, setProfiles] = useState<CodingProfile[]>(fallbackProfiles);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/coding-profiles", { signal: controller.signal })
      .then((response) => { if (!response.ok) throw new Error("Profiles unavailable"); return response.json(); })
      .then((data: { profiles: CodingProfile[] }) => { if (!controller.signal.aborted && Array.isArray(data.profiles)) setProfiles(data.profiles); })
      .catch(() => { /* Keep the labeled snapshot if the server cannot be reached. */ })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [refresh]);

  return <>
    <SectionHeading label="03 / Coding profiles" title="Practice meets persistence." icon={SquareTerminal} extra={<button className="quiet-button" type="button" disabled={loading} onClick={() => { setLoading(true); setRefresh((value) => value + 1); }}><RefreshCw size={14} className={loading ? "spinning" : ""} aria-hidden="true" />{loading ? "Checking profiles" : "Refresh stats"}</button>} />
    <div className="coding-grid">
      {profiles.map((profile) => {
        const Icon = profileIcons[profile.id];
        return <article className={`coding-card coding-${profile.id}`} key={profile.id}>
          <OutsideLink className="coding-card-heading" href={profile.url} label={`Open ${profile.name} profile for ${profile.handle}`}><span><Icon size={21} aria-hidden="true" />{profile.name}</span><ArrowUpRight size={17} aria-hidden="true" /></OutsideLink>
          <p className="profile-handle">{profile.handle}</p>
          <div className="profile-number">{integer(profile.solved)}</div><p className="profile-number-label">problems solved</p>
          <div className="profile-metrics"><div><span>{profile.ratingLabel}</span><strong>{integer(profile.rating)}</strong></div>{profile.peakRating !== null && <div><span>Peak rating</span><strong>{integer(profile.peakRating)}</strong></div>}</div>
          <p className="profile-rank"><Award size={13} aria-hidden="true" />{profile.rank}</p>
          <p className="profile-status">{profile.checkedAt ? <><span className="status-dot" />{profile.status === "partial" ? "Partial update" : "Checked"} {new Intl.DateTimeFormat("en", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(profile.checkedAt))}</> : <><FileText size={12} aria-hidden="true" />{profile.status === "snapshot" ? "Résumé snapshot" : loading ? "Checking profile…" : "Stats unavailable"}</>}</p>
        </article>;
      })}
    </div>
    <div className="coding-footnote"><p aria-live="polite">{loading ? "Getting the latest public stats…" : profiles.some((profile) => profile.status !== "live") ? "Some sources are unavailable. Snapshots are labeled; unknown stats appear as —." : "Checked against public profiles. Stats refresh at most every 15 minutes."}</p><OutsideLink href="https://kenkoooo.com/atcoder/#/user/SKYRIX_rd">AtCoder solved count: AtCoder Problems <ArrowUpRight size={13} aria-hidden="true" /></OutsideLink></div>
  </>;
}

export default function Portfolio() {
  const contentRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<SectionId>("hello");
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState<ProjectCategory>("All");
  const [showAll, setShowAll] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const filtered = projects.filter((project) => category === "All" || project.category === category);
  const visibleProjects = showAll ? filtered : filtered.slice(0, 4);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    let frame = 0;
    const update = () => {
      if (content.scrollTop > 0 && content.scrollTop + content.clientHeight >= content.scrollHeight - 3) {
        setActive("contact");
        return;
      }
      const threshold = content.getBoundingClientRect().top + 160;
      let current: SectionId = "hello";
      for (const section of navigation) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= threshold) current = section.id;
      }
      setActive(current);
    };
    const onScroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    content.addEventListener("scroll", onScroll, { passive: true });
    frame = requestAnimationFrame(update);
    return () => { content.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", close);
    return () => { window.removeEventListener("keydown", close); if (copyTimer.current) clearTimeout(copyTimer.current); };
  }, []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2500);
    } catch { window.location.href = `mailto:${person.email}`; }
  }

  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className="portfolio-shell">
      <header className="mobile-header"><a className="wordmark" href="#hello" onClick={() => setMenuOpen(false)}><ProfilePhoto decorative /><span>Reetesh Deshmukh</span></a><button className="menu-button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="portfolio-sidebar" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button></header>
      {menuOpen && <button className="menu-backdrop" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />}
      <aside id="portfolio-sidebar" className={`portfolio-sidebar ${menuOpen ? "is-open" : ""}`}>
        <a className="sidebar-wordmark" href="#hello" onClick={() => setMenuOpen(false)}><span>PORTFOLIO / 26</span></a>
        <div className="sidebar-identity"><ProfilePhoto /><h2>Reetesh<br />Deshmukh<span className="name-period">.</span></h2><p className="sidebar-role">Software Engineer</p><p className="sidebar-company"><OracleMark size={15} />Oracle Cloud Infrastructure</p><p className="sidebar-location"><MapPin size={13} aria-hidden="true" />{person.location}</p></div>
        <div className="sidebar-rule" />
        <nav className="sidebar-nav" aria-label="Main navigation">{navigation.map(({ id, label, icon: Icon }) => <a key={id} className={active === id ? "is-active" : ""} href={`#${id}`} aria-current={active === id ? "location" : undefined} onClick={() => { setActive(id); setMenuOpen(false); }}><Icon size={18} strokeWidth={1.7} aria-hidden="true" /><span>{label}</span>{active === id && <span className="nav-active-dot" />}</a>)}</nav>
        <div className="sidebar-bottom"><a className="resume-link" href={person.resume} download><FileText size={16} aria-hidden="true" />Download résumé<Download size={14} aria-hidden="true" /></a><div className="sidebar-socials"><OutsideLink href={person.github} label="Reetesh on GitHub"><Github size={18} aria-hidden="true" /></OutsideLink><OutsideLink href={person.linkedin} label="Reetesh on LinkedIn"><Linkedin size={18} aria-hidden="true" /></OutsideLink><a href={`mailto:${person.email}`} aria-label="Email Reetesh"><Mail size={18} aria-hidden="true" /></a><span>Let&apos;s connect</span></div><p>From the interface<br />to the infrastructure.</p></div>
      </aside>

      <main id="main-content" className="portfolio-content" ref={contentRef} tabIndex={0} aria-label="Portfolio content">
        <div className="content-inner">
          <section className="hero" id="hello" aria-labelledby="hero-title"><div className="hero-copy"><p className="eyebrow"><span className="status-dot" />Full stack &amp; core infrastructure</p><h1 id="hero-title">Full-stack craft.<br />Infrastructure<br /><em>at scale.</em></h1><p className="hero-intro">I&apos;m Reetesh. I build React tools, backend services, and cloud workflows at Oracle Cloud Infrastructure—making complex systems more reliable and easier to operate.</p><div className="hero-actions"><a href="#projects" className="button button-primary">Explore my work<ArrowUpRight size={17} aria-hidden="true" /></a><a href="#contact" className="hero-contact">Let&apos;s connect<ArrowRight size={16} aria-hidden="true" /></a></div></div><CoderAnimation /><div className="hero-flower" aria-hidden="true"><i /><i /><i /><i /><span /></div><span className="hero-margin-note" aria-hidden="true">CODE. CRAFT. CURIOSITY.</span></section>
          <div className="hero-meta"><span><OracleMark size={15} />Oracle Cloud Infrastructure · Since May 2024</span><span><GraduationCap size={15} aria-hidden="true" />NITK Surathkal &apos;24</span></div>

          <section className="portfolio-section" id="experience"><SectionHeading label="01 / Experience" title="Built for real-world scale." icon={BriefcaseBusiness} extra={<span className="heading-note">A little of the work behind the work</span>} /><div className="experience-card surface">{experiences.map((job) => <article className="experience-entry" key={job.company + job.role}><div className={`company-icon ${job.current ? "company-current" : ""}`}>{job.company === "Oracle Cloud Infrastructure" ? <OracleMark size={28} /> : <GraduationCap size={23} aria-hidden="true" />}</div><div className="experience-body"><div className="experience-header"><div><h3>{job.role}</h3><p className="company-name"><span className="company-mobile-mark">{job.company === "Oracle Cloud Infrastructure" ? <OracleMark size={17} /> : <GraduationCap size={16} aria-hidden="true" />}</span>{job.company}{job.current && <span className="current-label">Current</span>}</p></div><span className="job-date"><CalendarDays size={12} aria-hidden="true" />{job.dates}</span></div><p className="job-description">{job.description}</p>{job.impacts.length > 0 && <div className="impact-grid">{job.impacts.map((impact) => <div key={impact.value}><strong>{impact.value}</strong><span>{impact.label}</span><small>{impact.detail}</small></div>)}</div>}<div className="tags">{job.tags.map((tag) => <span key={tag}><TechIcon name={tag} size={14} />{tag}</span>)}</div><details className="expandable"><summary>More contributions<ChevronDown size={15} aria-hidden="true" /></summary><ul>{job.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></details></div></article>)}</div></section>

          <section className="portfolio-section" id="projects"><SectionHeading label="02 / Selected projects" title="Made with curiosity." icon={Layers} extra={<OutsideLink className="text-link" href={person.github}>More on GitHub<ArrowUpRight size={15} aria-hidden="true" /></OutsideLink>} /><div className="project-filters" role="group" aria-label="Filter projects by category">{projectCategories.map((item) => <button type="button" key={item} aria-pressed={category === item} onClick={() => { setCategory(item); setShowAll(false); }}>{item}{item === "All" && <span>{projects.length}</span>}</button>)}</div><p className="sr-only" aria-live="polite">Showing {visibleProjects.length} of {filtered.length} {category === "All" ? "" : category} projects</p><div className="projects-grid">{visibleProjects.map((project) => <article className={`project-card tone-${project.tone}`} key={project.id}><ProjectArt kind={project.kind} title={project.title} /><div className="project-copy"><p className="project-category">{project.category}</p><h3>{project.title}</h3><p className="project-description">{project.description}</p><div className="tags">{project.tags.map((tag) => <span key={tag}><TechIcon name={tag} size={14} />{tag}</span>)}</div><details className="expandable"><summary>Project details<ChevronDown size={15} aria-hidden="true" /></summary><ul>{project.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></details><div className="project-links"><OutsideLink href={project.github} label={`View ${project.title} source on GitHub`}><Github size={15} aria-hidden="true" />Source code<ArrowUpRight size={13} aria-hidden="true" /></OutsideLink>{project.demo && <OutsideLink href={project.demo}>Demo<ExternalLink size={13} aria-hidden="true" /></OutsideLink>}</div></div></article>)}</div>{filtered.length > 4 && <button className="show-projects" type="button" aria-expanded={showAll} onClick={() => setShowAll((value) => !value)}>{showAll ? "Show featured projects" : `Explore all ${filtered.length} projects`}<ArrowDown size={16} className={showAll ? "rotate-up" : ""} aria-hidden="true" /></button>}</section>

          <section className="portfolio-section" id="coding"><CodingProfiles /></section>
          <section className="portfolio-section" id="skills"><SectionHeading label="The toolkit" title="Across the stack." icon={Braces} /><div className="skills-grid">{skills.map(({ title, items, kind }) => { const Icon = skillIcons[kind]; return <article className="surface skill-card" key={title}><div className="skill-title"><span><Icon size={20} aria-hidden="true" /></span><h3>{title}</h3></div><div className="skill-items">{items.map((item) => <span key={item}><TechIcon name={item} size={18} />{item}</span>)}</div></article>; })}</div></section>

          <section className="portfolio-section" id="writing"><SectionHeading label="04 / Blog" title="Notes from the keyboard." icon={NotebookPen} />{blogPosts.length ? <div className="surface blog-list">{blogPosts.map((post) => <OutsideLink href={post.url} className="blog-post" key={post.url}><BookOpen size={21} aria-hidden="true" /><div><h3>{post.title}</h3><p>{post.description}</p><small>{post.date} · {post.readingMinutes} min read</small></div><ArrowUpRight size={18} aria-hidden="true" /></OutsideLink>)}</div> : <div className="surface writing-empty"><div className="writing-illustration" aria-hidden="true"><NotebookPen size={31} strokeWidth={1.3} /><span /></div><div><p className="eyebrow">A space to think out loud</p><h3>More than code. A few words, too.</h3><p>Notes on engineering, problem-solving, and the things I learn along the way. First posts coming soon.</p></div><span className="coming-soon">Coming soon</span></div>}</section>

          <section className="portfolio-section" id="education"><SectionHeading label="05 / Education" title="The foundation." icon={GraduationCap} /><div className="education-card"><div className="education-symbol"><GraduationCap size={33} strokeWidth={1.4} aria-hidden="true" /></div><div className="education-copy"><p className="eyebrow">2020 — 2024</p><h3>NITK Surathkal</h3><p>National Institute of Technology Karnataka</p><span>B.Tech in Information Technology</span><small>June 2020 — May 2024</small></div><div className="education-grade">8.62<span>CGPA / 10</span></div></div><div className="school-row surface"><BookOpen size={23} aria-hidden="true" /><div><h3>GVN — The Global School</h3><p>Higher Secondary · Physics, Chemistry &amp; Mathematics</p></div><span>2019 — 2020</span></div>
          <div className="subsection-heading"><Trophy size={18} aria-hidden="true" /><h3>A few milestones.</h3></div><div className="achievements-grid"><div className="achievement"><span className="achievement-label">NSTSE 2019</span><strong>347<span>All India Rank</span></strong><p>State Rank 2 · Among 500,000 students</p></div><div className="achievement"><span className="achievement-label">JEE MAIN 2020</span><strong>4,485<span>All India Rank</span></strong><p>Among 1,000,000 students</p></div></div><details className="surface competition-details expandable"><summary><span><Award size={16} aria-hidden="true" />Competitions &amp; contest results</span><ChevronDown size={16} aria-hidden="true" /></summary><ul><li>Finalist among 20,000+ participants in the AICTE Innovative India Coding Championship 2022.</li><li>Rank 1,595 among 28,000+ participants in LeetCode Weekly Contest 481.</li><li>Rank 614 among 30,000+ participants in Codeforces Round 898.</li><li>Qualified for the Regional Mathematics Olympiad.</li></ul></details>
          <div className="subsection-heading"><Users size={18} aria-hidden="true" /><h3>Learning, together.</h3></div><div className="community-grid">{community.map((item) => <article className="surface community-card" key={item.title}><div><Users size={19} aria-hidden="true" /><OutsideLink href={item.link} label={item.title}><ArrowUpRight size={17} aria-hidden="true" /></OutsideLink></div><h3>{item.title}</h3><p className="community-role">{item.role}</p><p>{item.description}</p><span>{item.dates}</span></article>)}</div></section>

          <section className="portfolio-section" id="contact"><div className="contact-card"><p className="eyebrow"><Send size={14} aria-hidden="true" />06 / Contact</p><div className="contact-top"><h2>Good things begin<br />with a <em>hello.</em></h2><a className="button button-cream" href={`mailto:${person.email}`}>Say hello<ArrowUpRight size={18} aria-hidden="true" /></a></div><p className="contact-description">Have an interesting problem, an opportunity, or just a good story? I&apos;d love to hear it.</p><div className="contact-links"><a href={`mailto:${person.email}`}><Mail size={16} aria-hidden="true" /><span>{person.email}</span></a><button type="button" className="copy-email" aria-label={copied ? "Email copied" : "Copy email address"} onClick={copyEmail}>{copied ? <Check size={16} /> : <Copy size={16} />}<span aria-live="polite">{copied ? "Copied" : "Copy"}</span></button><a href={person.phoneHref}><Phone size={15} aria-hidden="true" />{person.phone}</a></div></div></section>
          <footer className="portfolio-footer"><span>© {new Date().getFullYear()} Reetesh Deshmukh</span><span>Built with care. Always learning.<Sparkles size={12} aria-hidden="true" /></span><WelcomeIntro /><a href="#hello" aria-label="Back to top"><ArrowUpRight size={16} aria-hidden="true" /></a></footer>
        </div>
      </main>
    </div>
  </>;
}
