// Shared header behavior for SLED pages: mega-menu + subnav smooth scroll/spy.

(function(){
  // -------- Mega-menu hover / click --------
  const items = document.querySelectorAll('.nav-item');
  let openTimer = null, closeTimer = null;
  function openItem(el){
    items.forEach(i => { if(i !== el) i.classList.remove('open'); });
    el.classList.add('open');
    const btn = el.querySelector('.nav-link');
    if(btn) btn.setAttribute('aria-expanded','true');
  }
  function closeAll(){
    items.forEach(i => {
      i.classList.remove('open');
      const btn = i.querySelector('.nav-link');
      if(btn) btn.setAttribute('aria-expanded','false');
    });
  }
  items.forEach(item => {
    item.addEventListener('mouseenter', () => { clearTimeout(closeTimer); openTimer = setTimeout(() => openItem(item), 80); });
    item.addEventListener('mouseleave', () => { clearTimeout(openTimer); closeTimer = setTimeout(closeAll, 180); });
    const btn = item.querySelector('.nav-link');
    if(btn){
      btn.addEventListener('click', e => {
        e.preventDefault();
        if(item.classList.contains('open')) closeAll(); else openItem(item);
      });
    }
  });
  document.addEventListener('click', e => { if(!e.target.closest('.nav-item')) closeAll(); });
  document.addEventListener('keydown', e => { if(e.key === 'Escape') closeAll(); });

  // -------- Mega-menu hovered item swap --------
  const data = {
    services: {
      development: { title: 'Development', desc: 'Build robust, scalable digital products designed to grow with your business.', subs: ['Custom Software','Mobile Apps','Low code / No-code Dev','Vibe code Dev'] },
      ai: { title: 'AI & Intelligence', desc: 'LLM systems, RAG, agents, and ML pipelines that ship and stay in production.', subs: ['Agent platforms','RAG pipelines','Fine-tuning','Evals & observability'] },
      automation: { title: 'Automation & AI Solutions', desc: 'Internal tools and workflows that pay for themselves.', subs: ['RPA','Workflow engines','Integrations','Ops automation'] },
      transformation: { title: 'Digital Transformation', desc: 'Modernize legacy stacks without halting the business.', subs: ['Strategy','Migrations','Data platforms','Change management'] },
      ux: { title: 'UX Design / Enablement', desc: 'Research-backed interfaces that feel inevitable.', subs: ['User research','Design systems','Prototyping','Brand'] },
    },
    industries: {
      healthcare: { title: 'Healthcare', desc: 'Techtiz streamlines admin tasks for healthcare teams, enhancing efficiency and safety.', subs: ['AI Appointment Management','AI-Powered Communication','Reporting Optimization','Patient Records'] },
      marketing: { title: 'Digital Marketing', desc: 'Growth platforms, attribution, and content systems for performance teams.', subs: ['Attribution','Campaign analytics','Content systems','Lifecycle ops'] },
      realestate: { title: 'Real Estate', desc: 'Listings, CRM, and transaction platforms for brokerages and proptech.', subs: ['Listings platforms','CRM','Deal rooms','Tenant portals'] },
      ecommerce: { title: 'E-commerce', desc: 'Shopify, headless storefronts, OMS integrations, and conversion ops.', subs: ['Shopify Plus','Headless','OMS integrations','Conversion'] },
      logistics: { title: 'Logistics & Supply Chain', desc: 'Routing, WMS, and visibility platforms for operators and 3PLs.', subs: ['Routing','WMS','Visibility','Carrier integrations'] },
      education: { title: 'Education', desc: 'LMS, LXP, and assessment tools for institutions and edtech.', subs: ['LMS','LXP','Assessment','Student platforms'] },
    }
  };
  document.querySelectorAll('[data-list]').forEach(list => {
    const key = list.dataset.list;
    const featBlock = document.querySelector('[data-feature="'+key+'"]');
    const subBlock = document.querySelector('[data-sublinks="'+key+'"]');
    list.querySelectorAll('.mega-item').forEach(item => {
      item.addEventListener('mouseenter', () => {
        list.querySelectorAll('.mega-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        const k = item.dataset.key;
        const d = data[key][k];
        if(!d || !featBlock || !subBlock) return;
        featBlock.querySelector('[data-feat-title]').textContent = d.title;
        featBlock.querySelector('[data-feat-desc]').textContent = d.desc;
        subBlock.innerHTML = d.subs.map(s => '<a href="#">'+s+'</a>').join('');
      });
    });
  });

  // -------- Subnav smooth-scroll + optional scroll-spy --------
  const spyLinks = document.querySelectorAll('.sub-links [data-spy-id]');
  const spyMap = new Map();
  spyLinks.forEach(a => {
    const id = a.dataset.spyId;
    const el = document.getElementById(id);
    if(el) spyMap.set(el, a);
    a.addEventListener('click', e => {
      if(a.getAttribute('href').startsWith('#')){
        e.preventDefault();
        const target = document.getElementById(a.getAttribute('href').slice(1));
        if(target){
          const y = target.getBoundingClientRect().top + window.scrollY - 130;
          window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
        }
      }
    });
  });
  if('IntersectionObserver' in window && spyMap.size){
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          spyLinks.forEach(l => l.classList.remove('on'));
          const link = spyMap.get(entry.target);
          if(link) link.classList.add('on');
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });
    spyMap.forEach((_, el) => io.observe(el));
  }
})();
