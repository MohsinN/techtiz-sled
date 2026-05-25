// Tweaks for Techtiz International homepage
const { useEffect } = React;

const DEFAULTS = /*EDITMODE-BEGIN*/{
  "featuredCapability": "ai",
  "accentHue": "cyan",
  "patternDensity": "medium",
  "engageEmphasis": "tm",
  "industriesTheme": "dark"
}/*EDITMODE-END*/;

const CAP_IDS = ['dev', 'ai', 'auto', 'transform', 'ux', 'data'];

function setFeatured(which) {
  const caps = document.querySelectorAll('.cap-grid .cap');
  caps.forEach((c) => c.classList.remove('feature'));
  const targetIdx = CAP_IDS.indexOf(which);
  if (targetIdx >= 0 && caps[targetIdx]) {
    caps[targetIdx].classList.add('feature');
    // Move it to position 2 (middle of first row) for the layout to look right
    // Actually, just keep the grid order and let it visually emphasize in place
  }
}

function setAccent(hue) {
  const root = document.documentElement;
  const accents = {
    cyan: { primary: '#18B0E6', strong: '#0B8DC4', soft: '#E6F6FC' },
    teal: { primary: '#0FB5A4', strong: '#0A8273', soft: '#E2F4F1' },
    indigo: { primary: '#4F6BF6', strong: '#2944C8', soft: '#E7ECFE' }
  };
  const a = accents[hue] || accents.cyan;
  root.style.setProperty('--cyan', a.primary);
  root.style.setProperty('--cyan-strong', a.strong);
  root.style.setProperty('--cyan-soft', a.soft);
}

function setPatternDensity(d) {
  const bg = document.querySelector('.hero .bg-pattern');
  if (bg) bg.style.opacity = ({ low: 0.25, medium: 0.5, high: 0.9 })[d] || 0.5;
  const floats = document.querySelectorAll('.mockup-shell .float-tsq');
  floats.forEach(f => f.style.display = d === 'low' ? 'none' : 'block');
}

function setEngageEmphasis(which) {
  const cards = document.querySelectorAll('.engage-grid .engage');
  cards.forEach((c, i) => {
    c.classList.remove('feature');
    const badge = c.querySelector('.badge');
    if (badge) badge.remove();
    const overlay = c.querySelector('.tsq-overlay');
    if (overlay) overlay.remove();
  });
  const idx = { fixed: 0, tm: 1, retainer: 2 }[which];
  if (idx !== undefined && cards[idx]) {
    cards[idx].classList.add('feature');
    const badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = 'Most popular';
    cards[idx].prepend(badge);
    const overlay = document.createElement('span');
    overlay.className = 'tsq-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    cards[idx].appendChild(overlay);
  }
}

function setIndustriesTheme(theme) {
  const ind = document.querySelector('.industries');
  if (!ind) return;
  if (theme === 'light') {
    ind.style.background = '#FFFFFF';
    ind.style.color = 'var(--ink)';
    ind.querySelectorAll('h4').forEach(h => h.style.color = 'var(--yale)');
    ind.querySelectorAll('.ind').forEach(c => {
      c.style.background = 'var(--seasalt)';
      c.style.borderColor = 'var(--line)';
    });
    const h2 = ind.querySelector('.block-head h2');
    if (h2) h2.style.color = 'var(--yale)';
  } else {
    ind.style.background = 'var(--yale-dark)';
    ind.style.color = 'var(--white)';
    ind.querySelectorAll('h4').forEach(h => h.style.color = 'var(--white)');
    ind.querySelectorAll('.ind').forEach(c => {
      c.style.background = 'rgba(255,255,255,0.02)';
      c.style.borderColor = 'rgba(255,255,255,0.10)';
    });
    const h2 = ind.querySelector('.block-head h2');
    if (h2) h2.style.color = 'var(--white)';
  }
}

function applyTweaks(t) {
  setFeatured(t.featuredCapability);
  setAccent(t.accentHue);
  setPatternDensity(t.patternDensity);
  setEngageEmphasis(t.engageEmphasis);
  setIndustriesTheme(t.industriesTheme);
}

function App() {
  const { TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakSelect } = window;
  const [t, setT] = useTweaks(DEFAULTS);

  useEffect(() => { applyTweaks(t); }, [t]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Featured emphasis">
        <TweakSelect label="Hero capability card" value={t.featuredCapability} options={[
          {value: 'dev', label: 'Development'},
          {value: 'ai', label: 'AI & Intelligence'},
          {value: 'auto', label: 'Automation & AI'},
          {value: 'transform', label: 'Digital Transformation'},
          {value: 'ux', label: 'UX Design'},
          {value: 'data', label: 'Data & Platform'},
        ]} onChange={(v) => setT('featuredCapability', v)} />
        <TweakSelect label="Most-popular engagement" value={t.engageEmphasis} options={[
          {value: 'fixed', label: 'Fixed Scope'},
          {value: 'tm', label: 'Time & Materials'},
          {value: 'retainer', label: 'Retainer'},
        ]} onChange={(v) => setT('engageEmphasis', v)} />
      </TweakSection>

      <TweakSection title="Visual">
        <TweakRadio label="Accent" value={t.accentHue} options={[
          {value: 'cyan', label: 'Cyan'},
          {value: 'teal', label: 'Teal'},
          {value: 'indigo', label: 'Indigo'},
        ]} onChange={(v) => setT('accentHue', v)} />
        <TweakRadio label="Pattern density" value={t.patternDensity} options={[
          {value: 'low', label: 'Low'},
          {value: 'medium', label: 'Med'},
          {value: 'high', label: 'High'},
        ]} onChange={(v) => setT('patternDensity', v)} />
        <TweakRadio label="Industries theme" value={t.industriesTheme} options={[
          {value: 'dark', label: 'Dark'},
          {value: 'light', label: 'Light'},
        ]} onChange={(v) => setT('industriesTheme', v)} />
      </TweakSection>
    </TweaksPanel>
  );
}

const root = ReactDOM.createRoot(document.getElementById('tweaks'));
root.render(<App />);
