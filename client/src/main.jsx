import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const Icon = ({ name }) => <span className={`icon ${name}`} aria-hidden="true" />;
const chips = items => items.map(item => <span className="chip" key={item}>{item}</span>);

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => { fetch('/api/portfolio').then(r => r.ok ? r.json() : Promise.reject()).then(setData).catch(() => setError('Unable to load portfolio data.')); }, []);
  if (error) return <main className="state">{error}</main>;
  if (!data) return <main className="state">Loading system profile…</main>;
  const { identity, ui, socials, experiences, projects, skills, education } = data;
  return <>
    <div className="scanlines" />
    <header className="nav"><div className="wrap nav-inner"><a className="brand" href="#top">{ui.brand}</a><nav>{ui.nav.map(x => <a key={x.label} href={x.href}>{x.label}</a>)}</nav><div className="live"><i /> {ui.online}</div></div></header>
    <main id="top" className="wrap">
      <section className="hero">
        <article className="hero-card panel"><div className="kicker"><span>{ui.eyebrow}</span><span className="pulse">{ui.statusLabel}: {ui.online}</span></div><h1>{identity.name}<em>.</em></h1><p className="role">{identity.role}</p><p className="summary">{identity.summary}</p><div className="hero-actions"><a href={socials[0].href} className="button">{ui.contactCta} <Icon name="arrow" /></a><span className="coordinates">{identity.location}</span></div></article>
        <aside className="terminal panel"><div className="terminal-bar"><span>root@alvan:~</span><span>● ● ●</span></div><pre><b>$ whoami</b>{'\n'}{identity.name}{'\n\n'}<b>$ status --current</b>{'\n'}{identity.availability}{'\n\n'}<b>$ stack --focus</b>{'\n'}Backend / Event-driven / Infra<span className="cursor">_</span></pre></aside>
        <aside className="side-stack"><div className="social">{socials.map(s => <a className="social-link" key={s.label} href={s.href} target="_blank" rel="noreferrer"><img src={s.image_url} alt="" /><span>{s.label}</span></a>)}</div><section id="stack" className="toolchain panel"><div className="skill-grid">{skills.map(s => <article className="skill" key={s.group}><p>{s.group}</p><div className="chips">{chips(s.items)}</div></article>)}</div></section></aside>
      </section>
      <section id="about" className="about"><p className="section-tag">// 01 / ABOUT</p><h2>{ui.aboutTitle}</h2></section>
      <section className="education panel"><div><p className="section-tag">// 02 / {ui.educationTitle}</p><h2>{education.institution}</h2><p>{education.degree}</p></div><div className="edu-meta"><b>{education.period}</b><span>{education.location}</span></div></section>
      <section id="experience" className="section"><div className="section-head"><p className="section-tag">// 03 / CAREER</p><h2>{ui.experienceTitle}</h2></div><div className="timeline">{experiences.map((x, i) => <article className="experience panel" key={x.role}><div className="date">{x.period}<span>0{i + 1}</span></div><div><h3>{x.role}</h3><p className="company">{x.company}</p><ul>{x.items.map(item => <li key={item}>{item}</li>)}</ul></div></article>)}</div></section>
      <section id="projects" className="section"><div className="section-head"><p className="section-tag">// 04 / PROTOCOLS</p><h2>{ui.projectsTitle}</h2></div><div className="projects">{projects.map(p => <a className="project panel" key={p.id} href={p.url} target="_blank" rel="noreferrer" aria-label={`${p.name}: ${p.description}`}><img className="project-thumb" src={p.thumbnail_url} alt={`${p.name} thumbnail`} /><div className="project-content"><h3>{p.name}</h3><p>{p.project_type}</p><span className="project-arrow"><Icon name="arrow" /></span></div></a>)}</div></section>
      <section className="contact panel"><p className="section-tag">// SECURE CHANNEL OPEN</p><h2>{ui.contactTitle}</h2><a className="button" href={socials[0].href}>{socials[0].value} <Icon name="arrow" /></a></section>
    </main><footer className="wrap"><span>© {new Date().getFullYear()} {identity.name}</span><span>DESIGNED AS A LIVE SYSTEM</span></footer>
  </>;
}
createRoot(document.getElementById('root')).render(<App />);
