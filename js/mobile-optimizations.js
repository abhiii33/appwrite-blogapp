/**
 * Mobile-First JavaScript Optimizations for NeuroNudge Landing Page
 * Handles responsive interactions, touch events, and mobile-specific features
 */

(function() {
    'use strict';

    // Device detection and viewport utilities
    const deviceUtils = {
        isMobile: function() {
            return window.innerWidth <= 768;
        },
        isTablet: function() {
            return window.innerWidth > 768 && window.innerWidth <= 1024;
        },
        isDesktop: function() {
            return window.innerWidth > 1024;
        },
        isTouchDevice: function() {
            return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        },
        getViewportHeight: function() {
            return Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        }
    };

    // Responsive video management
    const videoManager = {
        init: function() {
            this.setupVideoResponsiveness();
            this.setupTouchControls();
            this.setupAutoplay();
        },

        setupVideoResponsiveness: function() {
            const videos = document.querySelectorAll('video');
            
            videos.forEach(video => {
                // Optimize video loading for mobile
                if (deviceUtils.isMobile()) {
                    video.preload = 'metadata';
                    video.muted = true;
                } else {
                    video.preload = 'auto';
                }

                // Handle video resize
                this.resizeVideo(video);
                window.addEventListener('resize', () => this.resizeVideo(video));
            });
        },

        resizeVideo: function(video) {
            const container = video.closest('.video-preview-card');
            if (!container) return;

            if (deviceUtils.isMobile()) {
                video.style.height = '200px';
                video.style.objectFit = 'cover';
            } else if (deviceUtils.isTablet()) {
                video.style.height = '300px';
                video.style.objectFit = 'cover';
            } else {
                video.style.height = 'auto';
                video.style.objectFit = 'cover';
            }
        },

        setupTouchControls: function() {
            if (!deviceUtils.isTouchDevice()) return;

            const videos = document.querySelectorAll('video');
            videos.forEach(video => {
                let tapTimeout;
                
                video.addEventListener('touchstart', function(e) {
                    clearTimeout(tapTimeout);
                    tapTimeout = setTimeout(() => {
                        if (this.paused) {
                            this.play();
                        } else {
                            this.pause();
                        }
                    }, 200);
                });

                // Prevent double-tap zoom on videos
                video.addEventListener('touchend', function(e) {
                    e.preventDefault();
                });
            });
        },

        setupAutoplay: function() {
            const mainVideo = document.getElementById('main-video');
            if (!mainVideo) return;

            // Handle autoplay restrictions on mobile
            if (deviceUtils.isMobile()) {
                mainVideo.muted = true;
                mainVideo.autoplay = true;
                
                // Try to play video on first user interaction
                const playOnInteraction = () => {
                    mainVideo.play().catch(e => {
                        console.log('Autoplay prevented:', e);
                    });
                    document.removeEventListener('touchstart', playOnInteraction);
                    document.removeEventListener('click', playOnInteraction);
                };

                document.addEventListener('touchstart', playOnInteraction, { once: true });
                document.addEventListener('click', playOnInteraction, { once: true });
            }
        }
    };

    // Responsive navigation management
    const navigationManager = {
        init: function() {
            this.setupMobileMenu();
            this.setupTouchInteractions();
            this.setupScrollBehavior();
        },

        setupMobileMenu: function() {
            const menuToggle = document.getElementById('mainMenu-toggle');
            const mainMenu = document.getElementById('mainMenu');
            
            if (!menuToggle || !mainMenu) return;

            menuToggle.addEventListener('click', this.toggleMenu.bind(this));
            
            // Close menu on outside click (mobile)
            if (deviceUtils.isMobile()) {
                document.addEventListener('click', (e) => {
                    if (!mainMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                        this.closeMenu();
                    }
                });
            }

            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeMenu();
                }
            });
        },

        toggleMenu: function() {
            const mainMenu = document.getElementById('mainMenu');
            const menuToggle = document.getElementById('mainMenu-toggle');
            const menuIcon = menuToggle.querySelector('.menu-icon');
            
            mainMenu.classList.toggle('toggled');
            menuIcon.classList.toggle('active');
            
            // Prevent body scroll when menu is open on mobile
            if (deviceUtils.isMobile()) {
                document.body.style.overflow = mainMenu.classList.contains('toggled') ? 'hidden' : '';
            }
        },

        closeMenu: function() {
            const mainMenu = document.getElementById('mainMenu');
            const menuToggle = document.getElementById('mainMenu-toggle');
            const menuIcon = menuToggle.querySelector('.menu-icon');
            
            mainMenu.classList.remove('toggled');
            menuIcon.classList.remove('active');
            
            if (deviceUtils.isMobile()) {
                document.body.style.overflow = '';
            }
        },

        setupTouchInteractions: function() {
            if (!deviceUtils.isTouchDevice()) return;

            const menuItems = document.querySelectorAll('.menu-full-option');
            
            menuItems.forEach(item => {
                item.addEventListener('touchstart', function() {
                    this.style.transform = 'scale(0.95)';
                });

                item.addEventListener('touchend', function() {
                    this.style.transform = '';
                });
            });
        },

        setupScrollBehavior: function() {
            let lastScrollY = window.scrollY;
            const navbar = document.querySelector('.cus-nav');
            
            if (!navbar) return;

            window.addEventListener('scroll', () => {
                const currentScrollY = window.scrollY;
                
                if (deviceUtils.isMobile()) {
                    // Hide navbar on scroll down, show on scroll up
                    if (currentScrollY > lastScrollY && currentScrollY > 100) {
                        navbar.style.transform = 'translateY(-100%)';
                    } else {
                        navbar.style.transform = 'translateY(0)';
                    }
                }
                
                lastScrollY = currentScrollY;
            });
        }
    };

    // Cards interaction manager
    const cardsManager = {
        init: function() {
            this.setupCardInteractions();
            this.setupMobileCarousel();
        },

        setupCardInteractions: function() {
            const cards = document.querySelectorAll('.cards');
            
            cards.forEach(card => {
                const flipBtn = card.querySelector('.flip-btn');
                
                if (flipBtn) {
                    flipBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.flipCard(card);
                    });
                }

                // Touch interactions for mobile
                if (deviceUtils.isTouchDevice()) {
                    let touchStartTime;
                    
                    card.addEventListener('touchstart', () => {
                        touchStartTime = Date.now();
                        card.classList.add('touch-active');
                    });

                    card.addEventListener('touchend', () => {
                        card.classList.remove('touch-active');
                        const touchDuration = Date.now() - touchStartTime;
                        
                        // Double tap to flip on mobile
                        if (touchDuration < 300) {
                            clearTimeout(card.tapTimeout);
                            card.tapTimeout = setTimeout(() => {
                                card.tapCount = 0;
                            }, 300);
                            
                            card.tapCount = (card.tapCount || 0) + 1;
                            
                            if (card.tapCount === 2) {
                                this.flipCard(card);
                                card.tapCount = 0;
                            }
                        }
                    });
                }
            });
        },

        flipCard: function(card) {
            card.classList.toggle('flipped');
            
            // Add animation class
            card.classList.add('flip-animation');
            setTimeout(() => {
                card.classList.remove('flip-animation');
            }, 1200);

            // Haptic feedback on mobile
            if (deviceUtils.isTouchDevice() && navigator.vibrate) {
                navigator.vibrate(50);
            }
        },

        setupMobileCarousel: function() {
            if (!deviceUtils.isMobile()) return;

            const cardCarousel = document.querySelector('.card-carousel');
            if (!cardCarousel) return;

            // Initialize Owl Carousel for mobile cards if not already initialized
            if (typeof $ !== 'undefined' && $.fn.owlCarousel) {
                $(cardCarousel).owlCarousel({
                    items: 1,
                    margin: 20,
                    loop: true,
                    dots: true,
                    nav: false,
                    autoplay: false,
                    responsive: {
                        0: { items: 1 },
                        480: { items: 1 }
                    }
                });
            }
        }
    };

    // Performance optimizations
    const performanceManager = {
        init: function() {
            this.setupIntersectionObserver();
            this.setupImageLazyLoading();
            this.optimizeAnimations();
        },

        setupIntersectionObserver: function() {
            if (!('IntersectionObserver' in window)) return;

            const sections = document.querySelectorAll('section');
            const options = {
                threshold: 0.1,
                rootMargin: '50px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                        
                        // Trigger animations for elements in view
                        const animatedElements = entry.target.querySelectorAll('.cards, .video-preview-card');
                        animatedElements.forEach((el, index) => {
                            setTimeout(() => {
                                el.style.opacity = '1';
                                el.style.transform = 'translateY(0)';
                            }, index * 100);
                        });
                    }
                });
            }, options);

            sections.forEach(section => {
                observer.observe(section);
            });
        },

        setupImageLazyLoading: function() {
            const images = document.querySelectorAll('img[loading="lazy"]');
            
            if ('loading' in HTMLImageElement.prototype) {
                // Native lazy loading is supported
                return;
            }

            // Polyfill for older browsers
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src || img.src;
                            img.classList.remove('lazy');
                            imageObserver.unobserve(img);
                        }
                    });
                });

                images.forEach(img => {
                    imageObserver.observe(img);
                });
            }
        },

        optimizeAnimations: function() {
            // Reduce animations on low-power devices
            if (deviceUtils.isMobile() && navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
                document.documentElement.style.setProperty('--animation-duration', '0.2s');
            }

            // Respect user's motion preferences
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                document.documentElement.style.setProperty('--animation-duration', '0.01ms');
            }
        }
    };

    // Touch and gesture manager
    const gestureManager = {
        init: function() {
            if (!deviceUtils.isTouchDevice()) return;
            
            this.setupSwipeGestures();
            this.setupPinchZoom();
        },

        setupSwipeGestures: function() {
            let startX, startY, distX, distY;
            const threshold = 50;

            document.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            });

            document.addEventListener('touchmove', (e) => {
                if (!startX || !startY) return;
                
                distX = e.touches[0].clientX - startX;
                distY = e.touches[0].clientY - startY;
            });

            document.addEventListener('touchend', () => {
                if (!startX || !startY) return;

                // Horizontal swipe
                if (Math.abs(distX) > Math.abs(distY) && Math.abs(distX) > threshold) {
                    if (distX > 0) {
                        this.onSwipeRight();
                    } else {
                        this.onSwipeLeft();
                    }
                }
                
                // Vertical swipe
                if (Math.abs(distY) > Math.abs(distX) && Math.abs(distY) > threshold) {
                    if (distY > 0) {
                        this.onSwipeDown();
                    } else {
                        this.onSwipeUp();
                    }
                }

                startX = startY = distX = distY = null;
            });
        },

        setupPinchZoom: function() {
            // Prevent pinch zoom on the entire page
            document.addEventListener('touchstart', (e) => {
                if (e.touches.length > 1) {
                    e.preventDefault();
                }
            });

            let lastTouchEnd = 0;
            document.addEventListener('touchend', (e) => {
                const now = (new Date()).getTime();
                if (now - lastTouchEnd <= 300) {
                    e.preventDefault();
                }
                lastTouchEnd = now;
            }, false);
        },

        onSwipeLeft: function() {
            // Navigate to next section or trigger carousel
            const carousel = document.querySelector('.owl-carousel');
            if (carousel && typeof $ !== 'undefined') {
                $(carousel).trigger('next.owl.carousel');
            }
        },

        onSwipeRight: function() {
            // Navigate to previous section or trigger carousel
            const carousel = document.querySelector('.owl-carousel');
            if (carousel && typeof $ !== 'undefined') {
                $(carousel).trigger('prev.owl.carousel');
            }
        },

        onSwipeUp: function() {
            // Scroll to next section
            const currentSection = this.getCurrentSection();
            const nextSection = currentSection ? currentSection.nextElementSibling : null;
            
            if (nextSection && nextSection.tagName === 'SECTION') {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        },

        onSwipeDown: function() {
            // Scroll to previous section
            const currentSection = this.getCurrentSection();
            const prevSection = currentSection ? currentSection.previousElementSibling : null;
            
            if (prevSection && prevSection.tagName === 'SECTION') {
                prevSection.scrollIntoView({ behavior: 'smooth' });
            }
        },

        getCurrentSection: function() {
            const sections = document.querySelectorAll('section');
            const scrollPosition = window.scrollY + window.innerHeight / 2;
            
            for (let section of sections) {
                const rect = section.getBoundingClientRect();
                const sectionTop = rect.top + window.scrollY;
                const sectionBottom = sectionTop + rect.height;
                
                if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
                    return section;
                }
            }
            return null;
        }
    };

    // Responsive utilities
    const responsiveUtils = {
        init: function() {
            this.setupViewportHeightFix();
            this.setupOrientationChange();
            this.setupResizeHandler();
        },

        setupViewportHeightFix: function() {
            // Fix for mobile viewport height issues
            const setVH = () => {
                const vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
            };

            setVH();
            window.addEventListener('resize', setVH);
            window.addEventListener('orientationchange', () => {
                setTimeout(setVH, 100);
            });
        },

        setupOrientationChange: function() {
            window.addEventListener('orientationchange', () => {
                // Reload carousels and recalculate layouts after orientation change
                setTimeout(() => {
                    const carousels = document.querySelectorAll('.owl-carousel');
                    if (typeof $ !== 'undefined') {
                        carousels.forEach(carousel => {
                            $(carousel).trigger('refresh.owl.carousel');
                        });
                    }
                }, 200);
            });
        },

        setupResizeHandler: function() {
            let resizeTimeout;
            
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    // Update device-dependent styles
                    document.body.className = document.body.className.replace(
                        /device-\w+/g, 
                        `device-${deviceUtils.isMobile() ? 'mobile' : deviceUtils.isTablet() ? 'tablet' : 'desktop'}`
                    );
                    
                    // Trigger custom resize event
                    window.dispatchEvent(new CustomEvent('responsiveResize', {
                        detail: {
                            isMobile: deviceUtils.isMobile(),
                            isTablet: deviceUtils.isTablet(),
                            isDesktop: deviceUtils.isDesktop()
                        }
                    }));
                }, 250);
            });
        }
    };

    // Initialize all managers when DOM is ready
    function init() {
        // Add device class to body
        document.body.classList.add(
            `device-${deviceUtils.isMobile() ? 'mobile' : deviceUtils.isTablet() ? 'tablet' : 'desktop'}`
        );

        if (deviceUtils.isTouchDevice()) {
            document.body.classList.add('touch-device');
        }

        // Initialize all managers
        videoManager.init();
        navigationManager.init();
        cardsManager.init();
        performanceManager.init();
        gestureManager.init();
        responsiveUtils.init();

        console.log('Mobile optimizations initialized');
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export utilities for global access
    window.NeuroNudgeMobile = {
        deviceUtils,
        videoManager,
        navigationManager,
        cardsManager,
        performanceManager,
        gestureManager,
        responsiveUtils
    };

})();