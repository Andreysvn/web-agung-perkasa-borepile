/**
 * Lightbox - Ultra minimal (< 1KB minified)
 * Klik foto → overlay fullscreen. Tutup: X / ESC / klik area gelap.
 */
(function(){
  'use strict';
  var overlay, img, current;
  
  function open(el){
    if(!overlay){
      overlay=document.createElement('div');
      overlay.className='lightbox-overlay';
      overlay.innerHTML='<button class="lightbox-close" aria-label="Tutup">&times;</button><img class="lightbox-img">';
      document.body.appendChild(overlay);
      img=overlay.querySelector('.lightbox-img');
      overlay.querySelector('.lightbox-close').onclick=close;
      overlay.onclick=function(e){if(e.target===overlay)close()};
      document.onkeydown=function(e){if(e.key==='Escape')close()};
    }
    img.src=el.src;
    overlay.classList.add('active');
    document.body.style.overflow='hidden';
    current=el;
  }
  
  function close(){
    overlay.classList.remove('active');
    document.body.style.overflow='';
  }
  
  document.addEventListener('click',function(e){
    var t=e.target;
    if(t.classList.contains('gallery-card-img')||t.hasAttribute('data-lightbox')){
      e.preventDefault();
      open(t);
    }
  });
})();
