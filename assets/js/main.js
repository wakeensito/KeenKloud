/**
* Template Name: DevFolio
* Template URL: https://bootstrapmade.com/devfolio-bootstrap-portfolio-html-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  let mobileNavToggleBtn;

  function closeMobileNav() {
    const body = document.querySelector('body');
    if (body.classList.contains('mobile-nav-active')) {
      body.classList.remove('mobile-nav-active');
      if (mobileNavToggleBtn) {
        const icon = mobileNavToggleBtn.querySelector('i') || mobileNavToggleBtn;
        icon.classList.remove('bi-x');
        icon.classList.add('bi-list');
      }
    }
  }

  function openMobileNav() {
    const body = document.querySelector('body');
    if (!body.classList.contains('mobile-nav-active')) {
      body.classList.add('mobile-nav-active');
      if (mobileNavToggleBtn) {
        const icon = mobileNavToggleBtn.querySelector('i') || mobileNavToggleBtn;
        icon.classList.remove('bi-list');
        icon.classList.add('bi-x');
      }
    }
  }

  function toggleMobileNav(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const body = document.querySelector('body');
    if (body.classList.contains('mobile-nav-active')) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  }

  function initMobileNav() {
    mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileNav(e);
      });
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileNav);
  } else {
    initMobileNav();
  }

  /**
   * Close mobile nav when clicking nav links
   */
  function setupNavLinks() {
    document.querySelectorAll('#navmenu a').forEach(link => {
      link.addEventListener('click', function (e) {
        // Close menu after a short delay to allow navigation
        setTimeout(() => {
          closeMobileNav();
        }, 100);
      });
    });
  }

  // Setup nav links
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupNavLinks);
  } else {
    setupNavLinks();
  }

  /**
   * Close mobile nav when clicking backdrop (outside menu)
   */
  document.addEventListener('click', function (e) {
    if (!document.body.classList.contains('mobile-nav-active')) return;

    const navmenu = document.querySelector('.navmenu');
    const toggle = document.querySelector('.mobile-nav-toggle');

    // Don't close if clicking the toggle button (it handles its own toggle)
    if (toggle && (toggle === e.target || toggle.contains(e.target))) {
      return;
    }

    // Close if clicking outside the menu (backdrop click)
    if (navmenu && !navmenu.contains(e.target)) {
      closeMobileNav();
    }
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function (direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    const isotopeContainer = isotopeItem.querySelector('.isotope-container');

    // Remove AOS from all portfolio items to prevent double animation
    const portfolioItems = isotopeContainer.querySelectorAll('.isotope-item');
    portfolioItems.forEach(function (item) {
      item.removeAttribute('data-aos');
      item.removeAttribute('data-aos-delay');
      item.removeAttribute('data-aos-duration');
      item.removeAttribute('data-aos-easing');
    });

    imagesLoaded(isotopeContainer, function () {
      initIsotope = new Isotope(isotopeContainer, {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort,
        transitionDuration: '0'
      });

      // Disable AOS refresh on this container to prevent mutation observer from triggering
      if (typeof AOS !== 'undefined' && AOS.refreshHard) {
        // Remove AOS from items again after Isotope initializes
        portfolioItems.forEach(function (item) {
          item.removeAttribute('data-aos');
          item.removeAttribute('data-aos-delay');
          item.removeAttribute('data-aos-duration');
          item.removeAttribute('data-aos-easing');
        });
      }
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filterBtn) {
      filterBtn.addEventListener('click', function (e) {
        e.preventDefault();
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');

        const filterValue = this.getAttribute('data-filter');

        // Remove AOS classes and attributes BEFORE filtering to prevent re-animation conflicts
        const allPortfolioItems = isotopeContainer.querySelectorAll('.isotope-item');
        allPortfolioItems.forEach(function (item) {
          item.removeAttribute('data-aos');
          item.removeAttribute('data-aos-delay');
          item.removeAttribute('data-aos-duration');
          item.removeAttribute('data-aos-easing');
          item.classList.remove('aos-animate', 'aos-init');
        });

        // Use requestAnimationFrame for smoother animation
        // requestAnimationFrame(function() {
        initIsotope.arrange({
          filter: filterValue,
          transitionDuration: '0'
        });
        // });
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Portfolio Modal Functionality
   */
  function initPortfolioModal() {
    const projects = {
      "keenkloud": {
        title: "KeenKloud",
        category: "Cloud Security",
        date: "August 2025",
        url: "https://keenkloud.net/",
        images: ["assets/img/portfolio/app-1.jpg"],
        description: `
          <h3>KeenKloud Portfolio Site</h3>
          <p>
            This project is the very site you are looking at! It serves as a central hub to showcase my cloud engineering and security projects.
            Built with a focus on performance and security, it leverages AWS services to deliver a fast and secure user experience.
          </p>
          <h4>Key Features</h4>
          <ul>
            <li><strong>Static Site Hosting:</strong> Hosted on AWS S3 for high durability and availability.</li>
            <li><strong>Content Delivery:</strong> Distributed globally via Amazon CloudFront for low latency.</li>
            <li><strong>Security:</strong> Protected by AWS WAF (Web Application Firewall) and Shield Standard.</li>
            <li><strong>CI/CD:</strong> Automated deployment pipeline using GitHub Actions.</li>
          </ul>
          <p>
            The goal was to create a professional, responsive, and secure portfolio that demonstrates my ability to architect and deploy
            modern web applications on the cloud.
          </p>
        `
      },
      "market-updater": {
        title: "Serverless Stock Market Updater",
        category: "Automation",
        date: "August 2025",
        url: "https://keenkloud.net/",
        images: ["assets/img/portfolio/product-1.jpg"],
        description: `
          <h3>Real-time Market Data Engine</h3>
          <p>
            A fully serverless application that fetches and updates stock market data in real-time. This project demonstrates the power of
            event-driven architecture on AWS.
          </p>
          <h4>Architecture</h4>
          <ul>
            <li><strong>AWS Lambda:</strong> Executes the data fetching logic (Python/Boto3).</li>
            <li><strong>Amazon EventBridge:</strong> Schedules the Lambda function to run every 15 minutes during market hours.</li>
            <li><strong>S3 & CloudFront:</strong> Stores and serves the JSON data to the frontend.</li>
          </ul>
          <p>
            This system eliminates the need for always-on servers, significantly reducing costs while maintaining high availability and scalability.
          </p>
        `
      },
      "next-wave": {
        title: "Next Wave 🌊",
        category: "AI & Education",
        date: "November 2025",
        url: "https://nextmajorwave.com/",
        images: ["assets/img/portfolio/next-wave-1.jpeg", "assets/img/portfolio/next-wave-2.jpeg"],
        description: `
          <h3>AI-Powered Career Pathway Advisor</h3>
          <p>
            Won 1st Place in the first ever SharkByte hackathon. Built in 36 hours, Next Wave helps aspiring Miami Dade College students navigate their educational journey. It uses multi-agent AI to
            generate personalized roadmaps from Associate's degrees to professional careers.
          </p>
          <h4>Key Features</h4>
          <ul>
            <li><strong>AI Career Wizard:</strong> Personalized educational roadmaps generated by Google Gemini.</li>
            <li><strong>Financial Planning:</strong> Cost estimates for tuition and housing.</li>
            <li><strong>Career Outcomes:</strong> Salary projections and job market data.</li>
            <li><strong>PDF Export:</strong> Downloadable roadmaps for offline use.</li>
          </ul>
          <h4>Tech Stack</h4>
          <ul>
            <li><strong>Frontend:</strong> React, TypeScript, Tailwind CSS, Framer Motion.</li>
            <li><strong>Backend:</strong> AWS Lambda (Python), API Gateway, DynamoDB.</li>
            <li><strong>AI:</strong> Google Gemini (Multi-agent architecture), Digital Ocean as a chat assistant.</li>
            <li><strong>Infrastructure:</strong> AWS S3, CloudFront, Systems Manager Parameter Store.</li>
          </ul>
        `
      },
      "ocean-water-quality": {
        title: "Ocean Water Quality Monitoring",
        category: "Data & Analytics",
        date: "October 2025",
        url: "https://github.com/wakeensito/DataAnalysis-OceanWaterQuality",
        images: ["assets/img/portfolio/Data-1.jpeg"],
        description: `
          <h3>Full-Stack Ocean Monitoring Dashboard</h3>
          <p>
            A comprehensive web application for monitoring ocean water quality data with interactive visualizations and real-time filtering.
            This project demonstrates full-stack development skills with data processing, API design, and interactive dashboards.
          </p>
          <h4>Architecture</h4>
          <ul>
            <li><strong>Backend:</strong> Flask API (Python) - serves water quality data from MongoDB</li>
            <li><strong>Frontend:</strong> Streamlit Dashboard (Python) - interactive web interface</li>
            <li><strong>Database:</strong> MongoDB - stores water quality measurements</li>
            <li><strong>Data Processing:</strong> Python scripts for data cleaning and outlier detection</li>
          </ul>
          <h4>Key Features</h4>
          <ul>
            <li><strong>Interactive Data Table:</strong> Browse water quality measurements with pagination</li>
            <li><strong>Filter Controls:</strong> Filter by temperature, salinity, and ODO ranges</li>
            <li><strong>Charts & Visualizations:</strong> Temperature over time, salinity distribution, scatter plots, and geographic maps</li>
            <li><strong>Statistics Panel:</strong> Summary statistics for all measurements</li>
            <li><strong>Data Cleaning:</strong> Z-score outlier detection (|z| > 3.0) with ~97% data retention</li>
          </ul>
          <h4>Tech Stack</h4>
          <ul>
            <li><strong>Backend:</strong> Flask, Python, MongoDB</li>
            <li><strong>Frontend:</strong> Streamlit, Pandas</li>
            <li><strong>Data Processing:</strong> Python, NumPy, Statistical Analysis</li>
          </ul>
        `
      },
      "iam-dashboard": {
        title: "IAM Dashboard",
        category: "Cloud Security",
        date: "September 2025-December 2025",
        url: "https://github.com/wakeensito/IAM-Dashboard",
        images: ["assets/img/portfolio/IAM Dash.jpeg", "assets/img/portfolio/IAM Dash 2.jpeg"],
        description: `
          <h3>Cloud Security Dashboard with DevSecOps Automation</h3>
          <p>
            A comprehensive full-stack cloud security dashboard that automates Identity and Access Management (IAM) misconfiguration detection
            and visualization. This project demonstrates enterprise-level DevSecOps practices, from local sandbox development to cloud deployment
            with automated security scanning and CI/CD pipelines.
          </p>
          <h4>Architecture</h4>
          <ul>
            <li><strong>Local Development:</strong> Docker-based sandbox environment for isolated testing</li>
            <li><strong>Backend:</strong> Python Flask API - AWS IAM security analysis and compliance tracking</li>
            <li><strong>Frontend:</strong> React/TypeScript with Vite - modern, responsive dashboard interface</li>
            <li><strong>Cloud Deployment:</strong> AWS S3, Lambda, DynamoDB, API Gateway - fully serverless architecture</li>
          </ul>
          <h4>Key Features</h4>
          <ul>
            <li><strong>IAM Security Analysis:</strong> Automated detection of misconfigurations and security vulnerabilities</li>
            <li><strong>DevSecOps Integration:</strong> OPA (Open Policy Agent), Checkov, and Gitleaks security scanners</li>
            <li><strong>GitHub Workflows:</strong> Two automated pipelines - security scanning and CI/CD deployment</li>
            <li><strong>Compliance Tracking:</strong> SOC2, PCI-DSS, HIPAA compliance monitoring and reporting</li>
            <li><strong>Real-time Monitoring:</strong> Grafana dashboards with Prometheus metrics collection</li>
            <li><strong>Identity & Access Management:</strong> Best practices enforcement and audit trail management</li>
          </ul>
          <h4>Tech Stack</h4>
          <ul>
            <li><strong>Backend:</strong> Python, Flask, AWS SDK (Boto3)</li>
            <li><strong>Frontend:</strong> React, TypeScript, Vite</li>
            <li><strong>Infrastructure:</strong> Docker, AWS (S3, Lambda, DynamoDB, API Gateway, CloudFront)</li>
            <li><strong>Security:</strong> OPA, Checkov, Gitleaks, AWS Security Hub</li>
            <li><strong>Monitoring:</strong> Grafana, Prometheus, PostgreSQL, Redis</li>
            <li><strong>CI/CD:</strong> GitHub Actions, automated testing and deployment</li>
          </ul>
        `
      },
      "trading-journal": {
        title: "Trading Journal",
        category: "Data & Analytics",
        date: "October 2025 - Now",
        url: "https://trading-journal-9209f.web.app",
        images: ["assets/img/portfolio/Journal 1.jpeg", "assets/img/portfolio/Journal 2.jpeg"],
        description: `
          <h3>Cloud-Synced Trading Journal Application</h3>
          <p>
            A modern, full-stack trading journal application for tracking trades, analyzing performance, and visualizing trading activity.
            Built with React, TypeScript, and Firebase, featuring real-time cloud synchronization and offline support.
          </p>
          <h4>Architecture</h4>
          <ul>
            <li><strong>Frontend:</strong> React 18, TypeScript, Vite - modern, type-safe UI</li>
            <li><strong>Backend:</strong> Firebase Authentication + Firestore - serverless cloud infrastructure</li>
            <li><strong>Styling:</strong> Tailwind CSS - responsive, modern design with dark mode support</li>
            <li><strong>Data Sync:</strong> Real-time Firestore synchronization with LocalStorage fallback</li>
          </ul>
          <h4>Key Features</h4>
          <ul>
            <li><strong>User Authentication:</strong> Secure OAuth sign-in/sign-up with Firebase Auth</li>
            <li><strong>Trade Management:</strong> Add, edit, and delete trades manually or via CSV/Excel import</li>
            <li><strong>Excel Parsing:</strong> Automatic contract type detection, multiplier calculation, and PnL parsing</li>
            <li><strong>Calendar View:</strong> Visualize trading activity with color-coded profit/loss days</li>
            <li><strong>Analytics Dashboard:</strong> Track profit factor, win rate, and comprehensive trading statistics</li>
            <li><strong>Cloud Sync:</strong> Automatic synchronization across devices via Firebase Firestore</li>
            <li><strong>Offline Support:</strong> LocalStorage fallback ensures data persistence when offline</li>
            <li><strong>Dark Mode:</strong> Beautiful UI with light/dark theme support</li>
          </ul>
          <h4>Tech Stack</h4>
          <ul>
            <li><strong>Frontend:</strong> React 18, TypeScript, Vite, Tailwind CSS</li>
            <li><strong>Backend:</strong> Firebase (Authentication, Firestore)</li>
            <li><strong>Data Processing:</strong> CSV/Excel parsing, contract type detection, PnL calculations</li>
            <li><strong>Deployment:</strong> Firebase Hosting</li>
          </ul>
          <p>
            <em>Note: This project is actively being developed with ongoing feature enhancements.</em>
          </p>
        `
      }
    };

    const modal = document.getElementById('portfolioModal');
    const modalOverlay = modal?.querySelector('.portfolio-modal-overlay');
    const modalClose = modal?.querySelector('.portfolio-modal-close');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalMeta = document.getElementById('modalMeta');
    const modalImages = document.getElementById('modalImages');

    if (!modal) {
      console.error('Portfolio modal not found in DOM');
      return;
    }

    function openModal(projectId) {
      const project = projects[projectId];
      if (!project) {
        console.error('Project not found:', projectId);
        return;
      }

      if (!modalTitle || !modalDescription || !modalMeta || !modalImages) {
        console.error('Modal elements not found');
        return;
      }

      // Populate modal content
      modalTitle.textContent = project.title;
      modalDescription.innerHTML = project.description;

      // Populate images
      modalImages.innerHTML = '';
      project.images.forEach(imgSrc => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = project.title;
        img.className = 'img-fluid';
        modalImages.appendChild(img);
      });

      // Populate meta info
      // Determine link text - show "GitHub" for GitHub URLs, "Trading Journal" for Firebase URLs, otherwise show the URL
      let linkText = project.url;
      if (project.url.includes('github.com')) {
        linkText = 'GitHub';
      } else if (project.url.includes('web.app') || project.url.includes('firebaseapp.com')) {
        linkText = project.title;
      }

      modalMeta.innerHTML = `
        <div class="portfolio-meta-item">
          <strong>Category:</strong> ${project.category}
        </div>
        <div class="portfolio-meta-item">
          <strong>Date:</strong> ${project.date}
        </div>
        <div class="portfolio-meta-item">
          <strong>URL:</strong> <a href="${project.url}" target="_blank" rel="noopener">${linkText}</a>
        </div>
      `;

      // Show modal
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      if (!modal) return;
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    // Event listeners
    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
      modalOverlay.addEventListener('click', closeModal);
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal?.classList.contains('active')) {
        closeModal();
      }
    });

    // Make portfolio items clickable
    const portfolioItems = document.querySelectorAll('.portfolio-item[data-project-id]');
    if (portfolioItems.length === 0) {
      console.warn('No portfolio items with data-project-id found');
    }

    portfolioItems.forEach(item => {
      item.style.cursor = 'pointer';
      item.addEventListener('click', (e) => {
        // Don't open if clicking on a link inside
        if (e.target.closest('a')) return;
        const projectId = item.getAttribute('data-project-id');
        if (projectId) {
          console.log('Opening modal for project:', projectId);
          openModal(projectId);
        }
      });
    });
  }

  // Initialize portfolio modal when DOM is ready
  // Use setTimeout to ensure modal HTML is parsed even if script loads before it
  function initModalWhenReady() {
    const modal = document.getElementById('portfolioModal');
    if (modal) {
      initPortfolioModal();
    } else {
      // Modal not found yet, try again after a short delay
      setTimeout(initModalWhenReady, 100);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initModalWhenReady);
  } else {
    // DOM is already ready, but modal might not be parsed yet
    initModalWhenReady();
  }

})();