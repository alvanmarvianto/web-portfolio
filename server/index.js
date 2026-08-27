const express = require('express');
const path = require('path');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const byParent = (rows, key) => rows.reduce((out, row) => ((out[row[key]] ??= []).push(row), out), {});

app.get('/api/portfolio', async (_req, res, next) => {
  try {
    const queries = [
      'SELECT * FROM profile WHERE id = 1', 'SELECT label, href FROM navigation ORDER BY position', 'SELECT label, value, href, image_url FROM social_link ORDER BY position',
      'SELECT period, institution, degree, location FROM education ORDER BY id LIMIT 1', 'SELECT * FROM experience ORDER BY position',
      'SELECT experience_id, body FROM experience_item ORDER BY experience_id, position', 'SELECT * FROM project ORDER BY position',
      'SELECT project_id, value FROM project_tag ORDER BY project_id, position', 'SELECT * FROM skill_group ORDER BY position', 'SELECT group_id, name FROM skill ORDER BY group_id, position'
    ];
    const [profile, nav, socials, education, experience, experienceItems, projects, tags, skillGroups, skills] = (await Promise.all(queries.map(text => pool.query(text)))).map(x => x.rows);
    if (!profile[0]) return res.status(503).json({ error: 'Portfolio content is not initialized.' });
    const p = profile[0], experienceById = byParent(experienceItems, 'experience_id'), tagsByProject = byParent(tags, 'project_id'), skillsByGroup = byParent(skills, 'group_id');
    res.json({ identity: { name: p.full_name, role: p.role, summary: p.summary, availability: p.availability, location: p.location }, ui: { brand: p.brand, nav, eyebrow: p.eyebrow, aboutTitle: p.about_title, experienceTitle: p.experience_title, projectsTitle: p.projects_title, educationTitle: p.education_title, contactTitle: p.contact_title, contactCta: p.contact_cta, statusLabel: p.status_label, online: p.online_text }, socials, education: education[0], experiences: experience.map(x => ({ ...x, items: (experienceById[x.id] || []).map(i => i.body) })), projects: projects.map(x => ({ ...x, tags: (tagsByProject[x.id] || []).map(t => t.value) })), skills: skillGroups.map(x => ({ group: x.name, items: (skillsByGroup[x.id] || []).map(s => s.name) })) });
  } catch (error) { next(error); }
});
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('/{*splat}', (_req, res) => res.sendFile(path.join(__dirname, '../client/dist/index.html')));
app.use((error, _req, res, _next) => { console.error(error); res.status(500).json({ error: 'Database unavailable.' }); });
app.listen(Number(process.env.PORT || 8080), () => console.log(`neon-portfolio listening on :${process.env.PORT || 8080}`));
