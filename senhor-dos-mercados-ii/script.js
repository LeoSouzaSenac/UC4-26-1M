(() => {
  'use strict';
  const STORAGE_KEY = 'senhor-dos-mercados-ii-missoes-v1';
  const names = ['A Sociedade se reúne','Os pontos de vida são sagrados','Nem todo herói usa o mesmo cupom','O ataque à Ponte do Fiado','O Conselho do Código','O caminho se divide','O Cerco dos Mercadinhos','O destino do Cupom Único'];
  const checks = [...document.querySelectorAll('[data-check]')];
  const chapterNav = document.getElementById('chapter-nav');
  const menuBtn = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const toast = document.getElementById('toast');
  let toastTimeout;
  let stored = [];
  try { const val = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); if (Array.isArray(val)) stored = val; } catch (_) { stored = []; }
  chapterNav.innerHTML = names.map((name,i) => `<a class="chapter-link" data-nav="${i+1}" href="#missao-${i+1}"><span class="nav-num">${String(i+1).padStart(2,'0')}</span><span class="nav-label">${name}</span></a>`).join('');
  checks.forEach(input => { input.checked = stored.includes(Number(input.dataset.check)); input.addEventListener('change', () => { const completed = checks.filter(el => el.checked).map(el => Number(el.dataset.check)); try { localStorage.setItem(STORAGE_KEY, JSON.stringify(completed)); } catch (_) {} updateProgress(); }); });
  function updateProgress() {
    const total = checks.filter(el => el.checked).length;
    const percent = Math.round(total / checks.length * 100);
    document.getElementById('progress-label').textContent = `${total}/8 missões`;
    document.getElementById('completed-count').textContent = total;
    document.getElementById('side-progress-value').textContent = `${percent}%`;
    document.getElementById('side-progress-bar').style.width = `${percent}%`;
    checks.forEach(el => { const id = el.dataset.check; document.getElementById('missao-'+id).classList.toggle('is-complete', el.checked); document.querySelector(`[data-nav="${id}"]`).classList.toggle('done',el.checked); });
  }
  updateProgress();
  function notify(message) { clearTimeout(toastTimeout); toast.textContent = message; toast.classList.add('show'); toastTimeout = setTimeout(() => toast.classList.remove('show'), 2200); }
  document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', async () => { const value = button.dataset.copy; try { await navigator.clipboard.writeText(value); notify('Comando copiado!'); } catch (_) { const area = document.createElement('textarea'); area.value = value; area.style.position='fixed'; area.style.opacity='0'; document.body.appendChild(area); area.select(); const success = document.execCommand('copy'); area.remove(); notify(success ? 'Comando copiado!' : 'Selecione e copie o comando manualmente.'); } }));
  menuBtn.addEventListener('click', () => { const open = mobileMenu.hasAttribute('hidden'); mobileMenu.toggleAttribute('hidden', !open); menuBtn.setAttribute('aria-expanded', String(open)); menuBtn.textContent = open ? '×' : '☰'; });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {mobileMenu.hidden=true;menuBtn.setAttribute('aria-expanded','false');menuBtn.textContent='☰';}));
  window.addEventListener('scroll', () => { const max = document.documentElement.scrollHeight - innerHeight; document.getElementById('reading-progress').style.width = (max > 0 ? scrollY / max * 100 : 0) + '%'; }, {passive:true});
  if ('IntersectionObserver' in window) { const navs = [...document.querySelectorAll('[data-nav]')]; const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if(entry.isIntersecting){navs.forEach(n=>n.classList.toggle('active',n.dataset.nav===entry.target.dataset.mission));} }); }, {rootMargin:'-15% 0px -68% 0px'}); document.querySelectorAll('.mission').forEach(m=>observer.observe(m)); }
})();
