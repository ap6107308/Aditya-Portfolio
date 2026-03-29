document.addEventListener('DOMContentLoaded', () => {
    // Typewriter Effect
    const typewriterElement = document.getElementById('typewriter');
    const roles = ['AIML Engineer', 'Python Developer', 'Graphic Designer', 'UI/UX Designer'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '80px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = 'var(--bg-nav)';
                navLinks.style.padding = '2rem';
                navLinks.style.borderBottom = '1px solid var(--border-color)';
            }
        });
    }

    // Skill Bars Animation
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkills = () => {
        skillBars.forEach(bar => {
            const target = bar.getAttribute('data-progress');
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                bar.style.width = `${target}%`;
            }
        });
    };

    // Counter Animation
    const stats = document.querySelectorAll('.stat-number');
    
    const animateCounters = () => {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const count = parseInt(stat.textContent);
            const increment = target / 50;
            
            const rect = stat.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0 && count < target) {
                stat.textContent = Math.ceil(count + increment);
                setTimeout(animateCounters, 20);
            }
        });
    };

    window.addEventListener('scroll', () => {
        animateSkills();
        animateCounters();
    });

    // Initial check
    animateSkills();
    animateCounters();

    // GitHub Projects fetch + cards
    const projectsGrid = document.getElementById('projectsGrid');

    async function loadGitHubProjects() {
        const githubUser = 'ap6107308';
        const apiUrl = `https://api.github.com/users/${githubUser}/repos?sort=updated&per_page=100`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`GitHub API error ${response.status}`);
            }

            const repos = await response.json();
            if (!repos.length) {
                projectsGrid.innerHTML = '<div class="project-card"><div class="project-icon"><i class="fas fa-folder-open"></i></div><h3 class="project-title">No projects found</h3><p class="project-description">Your GitHub account has no public repositories yet.</p></div>';
                return;
            }

            projectsGrid.innerHTML = '';

            repos.forEach(repo => {
                const repoName = repo.name;
                const repoUrl = repo.html_url;
                const repoDesc = repo.description || 'No description provided.';
                const repoLang = repo.language || 'Unknown';
                const starCount = repo.stargazers_count;
                const forkCount = repo.forks_count;

                const card = document.createElement('div');
                card.className = 'project-card';

                card.innerHTML = `
                    <div class="project-icon"><i class="fab fa-github"></i></div>
                    <h3 class="project-title"><a href="${repoUrl}" target="_blank" rel="noopener noreferrer">${repoName}</a></h3>
                    <p class="project-description">${repoDesc}</p>
                    <div class="project-features">
                        <span><i class="fas fa-star"></i> ${starCount}</span>
                        <span><i class="fas fa-code-branch"></i> ${forkCount}</span>
                    </div>
                    <div class="project-tech">
                        <span class="tech-tag">${repoLang}</span>
                        ${repo.homepage ? `<span class="tech-tag">Live</span>` : ''}
                    </div>
                `;

                projectsGrid.appendChild(card);
            });
        } catch (error) {
            console.error('Failed to load GitHub projects:', error);
            projectsGrid.innerHTML = `<div class="project-card"><div class="project-icon"><i class="fas fa-exclamation-triangle"></i></div><h3 class="project-title">Unable to load projects</h3><p class="project-description">${error.message}. Please check your network or API rate limit.</p></div>`;
        }
    }

    loadGitHubProjects();

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.height = '70px';
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
        } else {
            navbar.style.height = '80px';
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.8)';
        }
    });
});
