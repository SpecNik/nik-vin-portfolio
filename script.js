// Standalone, dependency-free site interactions.
const menuButton=document.getElementById('menu-button');
const mobileMenu=document.getElementById('mobile-menu');
function closeMenu(){if(!mobileMenu||!menuButton)return;mobileMenu.hidden=true;menuButton.setAttribute('aria-expanded','false');}
menuButton?.addEventListener('click',()=>{const opened=menuButton.getAttribute('aria-expanded')==='true';mobileMenu.hidden=opened;menuButton.setAttribute('aria-expanded',String(!opened));});
mobileMenu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
window.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
window.addEventListener('resize',()=>{if(window.innerWidth>900)closeMenu()});
const filterButtons=document.querySelectorAll('[data-filter]');
const projectCards=document.querySelectorAll('.project-card');
const visibleCount=document.getElementById('visible-count');
filterButtons.forEach(button=>button.addEventListener('click',()=>{const filter=button.dataset.filter;filterButtons.forEach(b=>{const active=b===button;b.classList.toggle('is-active',active);b.setAttribute('aria-pressed',String(active));});let n=0;projectCards.forEach(card=>{const visible=filter==='all'||card.dataset.category===filter;card.hidden=!visible;if(visible)n++;});if(visibleCount)visibleCount.textContent=String(n); }));
const photoCache=new Map();
function loadPhoto(url){if(!photoCache.has(url)){photoCache.set(url,new Promise(resolve=>{const img=new Image();img.onload=()=>resolve(url);img.onerror=()=>resolve(null);img.src=url;}));}return photoCache.get(url);}
for(const cover of document.querySelectorAll('[data-photo]')){loadPhoto(cover.dataset.photo).then(found=>{if(found){cover.src=found;cover.hidden=false;}});}
const gallery=document.getElementById('gallery-dialog');
const galleryTitle=document.getElementById('gallery-title');
const galleryGrid=document.getElementById('gallery-grid');
let gallerySequence=0;
for(const button of document.querySelectorAll('[data-open-gallery]')){button.addEventListener('click',async()=>{const slug=button.dataset.openGallery;const card=document.querySelector(`.project-card[data-slug="${slug}"]`);galleryTitle.textContent=card?.querySelector('h3')?.textContent||'Project photographs';galleryGrid.replaceChildren();const seq=++gallerySequence;gallery.showModal();const paths=Array.from({length:6},(_,i)=>`photos/${slug}-${String(i+1).padStart(2,'0')}.jpg`);const available=(await Promise.all(paths.map(loadPhoto))).filter(Boolean);if(seq!==gallerySequence||!gallery.open)return;if(available.length){for(let i=0;i<available.length;i++){
const path=available[i];const figure=document.createElement('figure');figure.className='gallery-figure';
const image=document.createElement('img');image.loading='lazy';image.src=path;
image.alt=`Media ${i+1}: ${galleryTitle.textContent}`;
const caption=document.createElement('figcaption');
const telecom=['mts','beeline','mgts','mc-ntt','nauka'].includes(slug);
caption.textContent=slug==='donatos'?(i===0?'Conference room · projection and AV installation':'On-site projector setup and alignment'):telecom?(slug==='nauka'?(i===0?'Nauka-Svyaz · supplied company branding':i===1?'Optical cable · illustrative image':i===2?'Optical distribution work · shared reference photo':i===3?'Control cabinets · supplied reference photo (project provenance not verified)':'Cable reels · representative infrastructure image'):(i===0?'Company branding · supplied image':i===1?'Cable infrastructure · representative image':'Optical distribution work · shared reference image')):`Project gallery image ${i+1}`;
figure.append(image,caption);galleryGrid.append(figure);}}else{const item=document.createElement('div');item.className='no-photos';item.innerHTML='<strong>Real project photos coming soon.</strong><p>This gallery is ready for your own photography. Place up to six JPG images for this project in the <code>photos</code> folder.</p>';galleryGrid.append(item);}});}
document.getElementById('gallery-close')?.addEventListener('click',()=>gallery.close());
gallery?.addEventListener('click',e=>{if(e.target===gallery)gallery.close()});
document.getElementById('year').textContent=String(new Date().getFullYear());


// UX enhancement: clickable whole photo area and highlighted navigation
(function(){
  document.querySelectorAll('.project-card').forEach(card=>{
    const trigger=card.querySelector('[data-open-gallery]');
    const media=card.querySelector('.project-media');
    if(!trigger || !media) return;
    media.classList.add('is-clickable');
    media.setAttribute('tabindex','0');
    media.setAttribute('role','button');
    media.setAttribute('aria-label',`Open photo gallery for ${card.querySelector('h3')?.textContent || 'project'}`);
    media.addEventListener('click',e=>{
      if(e.target.closest('a, button')) return;
      trigger.click();
    });
    media.addEventListener('keydown',e=>{
      if(e.key==='Enter' || e.key===' '){
        e.preventDefault();
        trigger.click();
      }
    });
  });
  const sectionIds=['expertise','projects','about','contact'];
  const links=[...document.querySelectorAll('.nav-links a, .mobile-menu a')];
  const sections=sectionIds.map(id=>document.getElementById(id)).filter(Boolean);
  const highlight=(id)=>{
    links.forEach(link=>{
      const active=link.getAttribute('href')===`#${id}`;
      link.classList.toggle('is-current',active);
      if(active) link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
  };
  const initial=(location.hash||'#expertise').substring(1);
  if(sectionIds.includes(initial))highlight(initial);
  window.addEventListener('hashchange',()=>{
    const id=location.hash.substring(1);
    if(sectionIds.includes(id))highlight(id);
  });
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{
      const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);
      if(visible.length)highlight(visible[0].target.id);
    },{rootMargin:'-15% 0px -50% 0px',threshold:[0,0.1,0.25,0.5,0.75]});
    sections.forEach(section=>observer.observe(section));
  }
})();
