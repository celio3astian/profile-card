// Inicializa VanillaTilt em elementos com atributo [data-tilt] ou classe .tilt
(function () {
    const CDN = 'https://cdn.jsdelivr.net/npm/vanilla-tilt@1.7.2/dist/vanilla-tilt.min.js';
    
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            if (document.querySelector(`script[src="${src}"]`)) return resolve();
            const s = document.createElement('script');
            s.src = src;
            s.onload = () => resolve();
            s.onerror = () => reject(new Error('Falha ao carregar script: ' + src));
            document.head.appendChild(s);
        });
    }
    
    function initTilt(selector = '[data-tilt], .tilt', options = {}) {
        const elems = document.querySelectorAll(selector);
        if (!elems.length) return;
        const defaultOpts = {
            max: 20,
            speed: 400,
            glare: true,
            'max-glare': 0.5,
            scale: 1.03,
            perspective: 1000,
            transition: true,
        };
        
        const opts = Object.assign({}, defaultOpts, options);
        if (window.VanillaTilt && typeof window.VanillaTilt.init === 'function') {
            window.VanillaTilt.init(elems, opts);
        }
    }

  // Carrega biblioteca se necessário e inicializa após DOM pronto 

    document.addEventListener('DOMContentLoaded', () => {
        if (window.VanillaTilt) {
            initTilt();
            return;
        }
        loadScript(CDN)
        .then(() => initTilt())
        .catch((err) => console.error(err));
    });
})();