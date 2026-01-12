// Smooth scrolling with header offset
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      const headerOffset = 80;
      const elementPosition =
        targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Toggle experience details
document.querySelectorAll(".toggle-details").forEach((button) => {
  button.addEventListener("click", function () {
    const details = this.nextElementSibling;
    details.classList.toggle("show");
    this.textContent = details.classList.contains("show")
      ? "Hide Details"
      : "Show Details";
  });
});

// Make entire timeline item clickable to toggle details
document.querySelectorAll(".timeline-item").forEach((item) => {
  item.addEventListener("click", function (e) {
    if (!e.target.closest(".toggle-details")) {
      const details = this.querySelector(".timeline-details");
      const toggleBtn = this.querySelector(".toggle-details");
      if (details && toggleBtn) {
        details.classList.toggle("show");
        toggleBtn.textContent = details.classList.contains("show")
          ? "Hide Details"
          : "Show Details";
      }
    }
  });
});

// Active navigation link on scroll
window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");
  let currentSection = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + currentSection) {
      link.classList.add("active");
    }
  });
});

// Global IntersectionObserver with staggered animations
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".fade-in");
  const groups = {};
  animatedElements.forEach((el) => {
    const group = el.dataset.staggerGroup || "default";
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(el);
  });
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const group = target.dataset.staggerGroup || "default";
          if (groups[group]) {
            groups[group].forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("visible");
              }, index * 120);
            });
            groups[group] = null;
          } else {
            target.classList.add("visible");
          }
          obs.unobserve(target);
        }
      });
    },
    { threshold: 0.2 }
  );
  animatedElements.forEach((el) => observer.observe(el));
});

// Animated counters
const statNumbers = document.querySelectorAll(".stat-number");
const counterObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const targetNumber = parseInt(
          entry.target.getAttribute("data-target"),
          10
        );
        let count = 0;
        const increment = Math.max(1, Math.ceil(targetNumber / 100));
        const updateCount = () => {
          count += increment;
          if (count >= targetNumber) {
            entry.target.textContent = targetNumber;
            obs.unobserve(entry.target);
          } else {
            entry.target.textContent = count;
            requestAnimationFrame(updateCount);
          }
        };
        updateCount();
      }
    });
  },
  { threshold: 0.5 }
);
statNumbers.forEach((num) => {
  counterObserver.observe(num);
});

// Parallax effect for hero background
window.addEventListener("scroll", function () {
  const hero = document.getElementById("hero");
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.3;
  hero.style.backgroundPosition = `center ${rate}px`;
});

// Back to Top Button
const backToTopButton = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add("visible");
  } else {
    backToTopButton.classList.remove("visible");
  }
});
backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Skill tag interaction (placeholder)
//document.querySelectorAll(".skill-tag").forEach((tag) => {
//  tag.addEventListener("click", () => {
//    alert(`You clicked: "${tag.textContent}"`);
//  });
//});

// Modal content mapping
const modalContent = {
  people: {
    title: "People Development",
    body: `<p><strong>Identifying unique growth paths:</strong> I actively work with each engineer to understand their aspirations and strengths, crafting personalized development plans.</p>
<p><strong>Mentoring & Coaching:</strong> I foster a culture of continuous learning by pairing experienced engineers with junior ones, facilitating knowledge transfer and skill building.</p>
<p><strong>1:1 Meetings:</strong> Regular one-on-ones ensure open communication, address concerns, and provide ongoing feedback and support.</p>`,
  },
  process: {
    title: "Process Optimization",
    body: `<p><strong>Evaluating Practices:</strong> I continuously assess current engineering processes (development, testing, deployment) to identify bottlenecks and inefficiencies.</p>
<p><strong>Driving Innovation:</strong> I introduce and champion new methodologies or tools that enhance team productivity and software quality.</p>
<p><strong>Collaboration:</strong> Working closely with Tech Leads and Product Owners ensures processes align with project goals and timelines.</p>`,
  },
  architecture: {
    title: "Architecture & Setup",
    body: `<p><strong>Expert Guidance:</strong> I provide technical oversight and strategic input for setting up robust, scalable, and maintainable system architectures.</p>
<p><strong>Planning & Decision Making:</strong> I participate in architecture decisions, ensuring they meet current needs while remaining flexible for future growth.</p>
<p><strong>Technology Selection:</strong> I help teams choose the right technologies and frameworks based on project requirements and long-term strategy.</p>`,
  },
  ai: {
    title: "AI Integration",
    body: `<p><strong>Identifying Opportunities:</strong> I actively explore how AI tools can be integrated into daily engineering workflows.</p>
<p><strong>Efficiency Gains:</strong> Examples include using AI for code generation, automated testing, documentation assistance, and data analysis.</p>
<p><strong>Empowering Teams:</strong> The goal is to automate routine tasks, allowing engineers to focus on complex problem-solving and innovation.</p>`,
  },
  alignment: {
    title: "Engineering & Product Alignment",
    body: `<p><strong>Early Involvement:</strong> I ensure engineering teams are involved from the very beginning of product discussions and requirement gathering.</p>
<p><strong>Feasibility & Impact:</strong> Engineers provide crucial input on technical feasibility, effort estimation, and potential technical debt.</p>
<p><strong>Shared Vision:</strong> This collaboration ensures that product roadmaps are realistic, technically sound, and leverage our engineering capabilities effectively.</p>`,
  },
  strategy: {
    title: "Technical Strategy & Roadmapping",
    body: `<p><strong>Long-Term Vision:</strong> I define multi-year technical strategies that align with business objectives and market trends.</p>
<p><strong>Roadmap Ownership:</strong> I partner with product and business leaders to co-create executable roadmaps grounded in engineering reality.</p>
<p><strong>Future-Proofing:</strong> I ensure systems are designed to evolve without constant rewrites—balancing speed and sustainability.</p>`,
  },
  years: {
    title: "30+ Years of Experience",
    body: `<p>A journey starting from the early days of web development in the 90s to leading modern global engineering organizations.</p>
		   <p>I have seen technologies evolve from basic HTML to complex cloud architectures and AI-driven systems.</p>`,
  },
  team: {
    title: "Leadership at Scale",
    body: `<p>I have experience managing organizations of up to 100 engineers across multiple departments.</p>
		   <p>This includes leading through managers, defining organizational structure, and maintaining culture at scale.</p>`,
  },
  ventures: {
    title: "Diverse Business Impact",
    body: `<p>From developer perspective to acting as VPE in venture builders and leading departments in global enterprises like Schneider Electric.</p>
		   <p>I understand the unique challenges of every stage: from finding product-market fit to maintaining enterprise stability.</p>`,
  },
  continents: {
    title: "Global Collaboration",
    body: `<p>Leading teams across Europe, Asia, North America, and Australia has given me a deep appreciation for diverse working cultures.</p>
		   <p>I specialize in building high-performing, distributed teams that overcome geographical and cultural boundaries.</p>`,
  },
};

// Function to handle scrollbar jump
function toggleModal(isVisible, content = null) {
  const header = document.querySelector("header");
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  if (isVisible && content) {
    document.getElementById("modalTitle").textContent = content.title;
    document.getElementById("modalBodyText").innerHTML = content.body;
    document.getElementById("modalOverlay").classList.add("visible");

    // Prevent shifting
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    header.style.paddingRight = `calc(2rem + ${scrollbarWidth}px)`; // Maintains your 2rem layout
  } else {
    document.getElementById("modalOverlay").classList.remove("visible");

    // Restore layout
    setTimeout(() => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "0";
      header.style.paddingRight = "2rem"; // Returns to original header padding
    }, 300); // Wait for animation to finish
  }
}

// Updated Focus card triggers
document.querySelectorAll(".focus-card, .stat-card").forEach((card) => {
  card.addEventListener("click", () => {
    const key = card.getAttribute("data-modal");
    const content = modalContent[key];
    if (content) {
      document.getElementById("modalTitle").textContent = content.title;
      document.getElementById("modalBodyText").innerHTML = content.body;
      document.getElementById("modalOverlay").classList.add("visible");
      document.body.style.overflow = "hidden";
    }
  });
});

// Updated Close modal triggers
document
  .getElementById("closeModal")
  .addEventListener("click", () => toggleModal(false));
document.getElementById("modalOverlay").addEventListener("click", (e) => {
  if (e.target === document.getElementById("modalOverlay")) toggleModal(false);
});
