/* =========================================
   SEARCH.JS - Documentation Search
   ========================================= */

const SEARCH_DATA = [
  { title: 'Home', url: 'index.html', desc: 'Technical Writer Portfolio – API, DITA, MadCap Flare specialist', tags: ['home','portfolio'] },
  { title: 'About', url: 'about.html', desc: 'Professional biography, career timeline, education, certifications', tags: ['about','bio','career'] },
  { title: 'Portfolio', url: 'portfolio.html', desc: 'Project showcase – API docs, user guides, DITA, MadCap Flare', tags: ['portfolio','projects'] },
  { title: 'Skills', url: 'skills.html', desc: 'Technical writing tools, authoring platforms, programming languages', tags: ['skills','tools'] },
  { title: 'Resume', url: 'resume.html', desc: 'Professional resume with experience, education, certifications', tags: ['resume','cv'] },
  { title: 'Blog', url: 'blog.html', desc: 'Articles on API documentation, DITA XML, MadCap Flare, best practices', tags: ['blog','articles'] },
  { title: 'Contact', url: 'contact.html', desc: 'Get in touch – email, LinkedIn, GitHub', tags: ['contact','hire'] },

  // API docs
  { title: 'Authentication', url: 'api/authentication.html', desc: 'Bearer tokens, OAuth 2.0, API Keys – securing your API calls', tags: ['api','auth','oauth','security'] },
  { title: 'API Endpoints', url: 'api/endpoints.html', desc: 'Complete REST API endpoint reference with examples', tags: ['api','endpoints','rest'] },
  { title: 'Making Requests', url: 'api/requests.html', desc: 'HTTP request structure, headers, parameters, request body', tags: ['api','requests','http'] },
  { title: 'API Responses', url: 'api/responses.html', desc: 'Response format, JSON structure, pagination', tags: ['api','responses','json'] },
  { title: 'Error Codes', url: 'api/error-codes.html', desc: 'HTTP error codes, error objects, troubleshooting', tags: ['api','errors','status codes'] },
  { title: 'Rate Limiting', url: 'api/rate-limits.html', desc: 'API rate limits, quotas, throttling strategies', tags: ['api','rate limits'] },
  { title: 'Versioning', url: 'api/versioning.html', desc: 'API versioning strategy, migration guides', tags: ['api','versioning'] },
  { title: 'Pagination', url: 'api/pagination.html', desc: 'Cursor-based and offset pagination', tags: ['api','pagination'] },
  { title: 'Swagger / OpenAPI Demo', url: 'api/swagger-demo.html', desc: 'Interactive OpenAPI 3.0 specification viewer', tags: ['api','swagger','openapi'] },
  { title: 'Authorization', url: 'api/authorization.html', desc: 'Role-based access, scopes, permissions', tags: ['api','authorization','rbac'] },

  // User Guides
  { title: 'Getting Started', url: 'user-guides/getting-started.html', desc: 'Quick start guide for new users', tags: ['getting started','onboarding'] },
  { title: 'Installation Guide', url: 'user-guides/installation.html', desc: 'System requirements and installation steps', tags: ['installation','setup'] },
  { title: 'Configuration', url: 'user-guides/configuration.html', desc: 'Configuration settings, environment variables', tags: ['configuration','settings'] },
  { title: 'Quick Start', url: 'user-guides/quick-start.html', desc: '5-minute quick start to get up and running', tags: ['quick start','tutorial'] },
  { title: 'Administrator Guide', url: 'user-guides/administrator-guide.html', desc: 'System administration, user management, security', tags: ['admin','administration'] },
  { title: 'End-User Guide', url: 'user-guides/end-user-guide.html', desc: 'Complete guide for end users – dashboard, reports', tags: ['user guide','end user'] },
  { title: 'Troubleshooting', url: 'user-guides/troubleshooting.html', desc: 'Common issues and solutions', tags: ['troubleshooting','errors','faq'] },
  { title: 'FAQ', url: 'user-guides/faq.html', desc: 'Frequently asked questions', tags: ['faq','questions'] },
  { title: 'Release Notes', url: 'user-guides/release-notes.html', desc: 'Version history, new features, bug fixes', tags: ['release notes','changelog','version'] },
  { title: 'Knowledge Base', url: 'user-guides/knowledge-base.html', desc: 'Articles, how-tos, best practices', tags: ['knowledge base','help'] },

  // DITA
  { title: 'DITA Overview', url: 'dita/concept.html', desc: 'Introduction to DITA XML structured authoring', tags: ['dita','xml','structured authoring'] },
  { title: 'DITA Concept Topics', url: 'dita/concept.html', desc: 'Writing DITA concept topics', tags: ['dita','concept','xml'] },
  { title: 'DITA Task Topics', url: 'dita/task.html', desc: 'Procedural content with DITA task topics', tags: ['dita','task','xml','procedure'] },
  { title: 'DITA Reference Topics', url: 'dita/reference.html', desc: 'Reference documentation with DITA', tags: ['dita','reference','xml'] },
  { title: 'DITA Maps', url: 'dita/ditamap.html', desc: 'Organizing topics with DITA maps', tags: ['dita','ditamap','xml'] },
  { title: 'Content Reuse (Conref)', url: 'dita/conref.html', desc: 'Content referencing in DITA', tags: ['dita','conref','reuse'] },

  // Oxygen
  { title: 'Oxygen XML Overview', url: 'oxygen/oxygen-overview.html', desc: 'Introduction to Oxygen XML Editor', tags: ['oxygen','xml editor','authoring'] },
  { title: 'Oxygen Author Mode', url: 'oxygen/author-mode.html', desc: 'Visual authoring in Oxygen XML', tags: ['oxygen','author mode'] },
  { title: 'Publishing with Oxygen', url: 'oxygen/publishing.html', desc: 'DITA publishing and transformation in Oxygen', tags: ['oxygen','publishing','dita'] },

  // MadCap
  { title: 'MadCap Flare Overview', url: 'madcap/flare-overview.html', desc: 'Getting started with MadCap Flare', tags: ['madcap','flare','help authoring'] },
  { title: 'Flare Variables', url: 'madcap/variables.html', desc: 'Using variables in MadCap Flare', tags: ['madcap','flare','variables'] },
  { title: 'Flare Snippets', url: 'madcap/snippets.html', desc: 'Content reuse with Flare snippets', tags: ['madcap','flare','snippets','reuse'] },
  { title: 'Flare Conditions', url: 'madcap/conditions.html', desc: 'Conditional text and publishing', tags: ['madcap','flare','conditions','filtering'] },
  { title: 'Flare Targets', url: 'madcap/targets.html', desc: 'Publishing targets – HTML5, PDF, EPUB', tags: ['madcap','flare','targets','publishing'] },

  // FrameMaker
  { title: 'Adobe FrameMaker Overview', url: 'framemaker/framemaker-overview.html', desc: 'Introduction to Adobe FrameMaker', tags: ['framemaker','adobe','structured authoring'] },
  { title: 'FrameMaker Templates', url: 'framemaker/templates.html', desc: 'Creating and using FrameMaker templates', tags: ['framemaker','templates'] },
  { title: 'FrameMaker PDF Output', url: 'framemaker/pdf-output.html', desc: 'Generating PDF from FrameMaker', tags: ['framemaker','pdf','publishing'] },

  // RoboHelp
  { title: 'Adobe RoboHelp Overview', url: 'robohelp/robohelp-overview.html', desc: 'Introduction to Adobe RoboHelp', tags: ['robohelp','adobe','help authoring'] },
  { title: 'RoboHelp Responsive Help', url: 'robohelp/responsive-help.html', desc: 'Creating responsive HTML5 help', tags: ['robohelp','responsive','html5'] },
  { title: 'Context-Sensitive Help', url: 'robohelp/context-help.html', desc: 'Implementing context-sensitive help', tags: ['robohelp','context help','csh'] },
];

document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('search-overlay');
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  const triggers = document.querySelectorAll('.btn-search-trigger');
  const closeBtn = document.getElementById('search-close');

  if (!overlay) return;

  function openSearch() {
    overlay.classList.add('open');
    setTimeout(() => input?.focus(), 100);
  }
  function closeSearch() {
    overlay.classList.remove('open');
    if (input) input.value = '';
    renderResults('');
  }

  triggers.forEach(t => t.addEventListener('click', openSearch));
  closeBtn?.addEventListener('click', closeSearch);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeSearch(); });
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
    if (e.key === 'Escape') closeSearch();
  });

  function renderResults(query) {
    if (!results) return;
    if (!query.trim()) {
      results.innerHTML = `<div class="search-empty"><i class="fas fa-search" style="font-size:2rem;margin-bottom:12px;display:block"></i><div>Start typing to search documentation…</div></div>`;
      return;
    }
    const q = query.toLowerCase();
    const matched = SEARCH_DATA.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q) ||
      item.tags.some(t => t.includes(q))
    ).slice(0, 10);

    if (!matched.length) {
      results.innerHTML = `<div class="search-empty"><i class="fas fa-search" style="font-size:2rem;margin-bottom:12px;display:block;color:var(--gray-200)"></i><div>No results for "<strong>${escHtml(query)}</strong>"</div></div>`;
      return;
    }

    results.innerHTML = matched.map(item => `
      <a class="search-result-item" href="${item.url}">
        <i class="fas fa-file-alt search-result-icon"></i>
        <div style="flex:1">
          <div class="search-result-title">${highlight(item.title, query)}</div>
          <div class="search-result-desc">${highlight(item.desc, query)}</div>
        </div>
        <span class="search-result-tag">${item.tags[0]}</span>
      </a>
    `).join('');
  }

  function highlight(text, query) {
    const re = new RegExp(`(${escRegex(query)})`, 'gi');
    return escHtml(text).replace(re, '<mark style="background:rgba(244,169,36,.3);border-radius:2px;padding:0 1px">$1</mark>');
  }
  function escHtml(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function escRegex(s) { return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); }

  input?.addEventListener('input', e => renderResults(e.target.value));
  renderResults('');
});
