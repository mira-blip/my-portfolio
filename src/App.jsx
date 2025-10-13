import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Mail, Linkedin, Github, Menu, X } from 'lucide-react';

const Portfolio = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [trails, setTrails] = useState([]);
  const [activeProject, setActiveProject] = useState(null);
  const [activeSlide, setActiveSlide] = useState({});
  const [scrollY, setScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const containerRef = useRef(null);
  const heroRef = useRef(null);

  // Cursor trail effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      
      setTrails(prev => {
        const newTrail = {
          x: e.clientX,
          y: e.clientY,
          id: Date.now()
        };
        return [...prev.slice(-8), newTrail];
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll position tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsNavVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.fade-in-section');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Keyboard navigation - Space/Enter to go to next section
  useEffect(() => {
    const sections = ['#work', '#projects', '#design', '#about', '#contact'];

    const handleKeyDown = (e) => {
      // Only trigger if Space or Enter is pressed and not in an input/textarea
      if ((e.key === ' ' || e.key === 'Enter') &&
          !['INPUT', 'TEXTAREA', 'BUTTON', 'A'].includes(e.target.tagName)) {
        e.preventDefault();

        // Get all section elements
        const sectionElements = sections.map(selector => document.querySelector(selector)).filter(Boolean);

        // Find current section based on scroll position
        const scrollPosition = window.scrollY + 100; // Small offset from top
        let currentSectionIndex = -1;

        for (let i = 0; i < sectionElements.length; i++) {
          const element = sectionElements[i];
          if (scrollPosition < element.offsetTop) {
            currentSectionIndex = i - 1;
            break;
          }
        }

        // If we're past all sections, we're at the last one
        if (currentSectionIndex === -1) {
          currentSectionIndex = sectionElements.length - 1;
        }

        // Move to next section
        const nextIndex = currentSectionIndex + 1;
        if (nextIndex < sectionElements.length) {
          sectionElements[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          // If at the last section, scroll to top
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const technicalProjects = [
    {
      id: 'tuuri',
      title: 'Tuuri',
      subtitle: 'Interactive History Website',
      description: 'Your description here about making Mongolian history accessible through interactive visualization.',
      tags: ['Web Design', 'UI/UX', 'Interactive'],
      images: [
        '/images/tuuri-1.png',
        '/images/tuuri-2.png',
        '/images/tuuri-3.png'
      ]
    },
    {
      id: 'climatescience',
      title: 'ClimateScience',
      subtitle: 'Climate Education Website Designs',
      description: 'Your description here about designing accessible climate education experiences.',
      tags: ['Web Design', 'Education', 'Accessibility'],
      images: [
        '/images/climatescience-1.png',
        '/images/climatescience-2.png'
      ]
    },
    {
      id: 'uuy',
      title: 'UUY',
      subtitle: 'Mobile Pick Up App',
      description: 'Your description here about the mobile experience and user flow.',
      tags: ['Mobile Design', 'UI/UX', 'App'],
      images: [
        '/images/uuy-1.png',
        '/images/uuy-2.png'
      ]
    }
  ];

  const pmProjects = [
    {
      id: 'junior-rangers',
      title: 'Junior Rangers Mongolia',
      subtitle: 'Climate Education Program',
      description: 'Your description about empowering youth climate educators.',
      images: [
        '/images/junior-rangers-1.png',
        '/images/junior-rangers-2.png',
        '/images/junior-rangers-3.png',
        '/images/junior-rangers-4.png',
        '/images/junior-rangers-5.png',
        '/images/junior-rangers-6.png'
      ]
    },
    {
      id: 'nomadvocate',
      title: 'NomAdvocate',
      subtitle: 'Essay Writing Program',
      description: 'Your description about making essay writing mentorship accessible.',
      images: [
        '/images/nomadvocate-1.png',
        '/images/nomadvocate-2.png',
        '/images/nomadvocate-3.png',
        '/images/nomadvocate-4.png',
        '/images/nomadvocate-6.png',
        '/images/nomadvocate-7.png'
      ]
    }
  ];

  const designWorks = [
    { id: 'design-1', image: '/images/design-1.jpg', title: 'Design Work 1' },
    { id: 'design-2', image: '/images/design-3.png', title: 'Design Work 2' },
    { id: 'design-3', image: '/images/design-2.png', title: 'Design Work 3' },
    { id: 'design-4', image: '/images/design-10.jpg', title: 'Design Work 4' },
    { id: 'design-5', image: '/images/design-4.png', title: 'Design Work 5' },
    { id: 'design-6', image: '/images/design-7.png', title: 'Design Work 6' },
    { id: 'design-7', image: '/images/design-8.png', title: 'Design Work 7' },
    { id: 'design-8', image: '/images/design-12.png', title: 'Design Work 8' },
    { id: 'design-9', image: '/images/design-5.png', title: 'Design Work 9' },
    { id: 'design-10', image: '/images/design-11.jpg', title: 'Design Work 10' },
    { id: 'design-11', image: '/images/design-9.png', title: 'Design Work 11' }
  ];

  const nextSlide = (projectId, maxSlides) => {
    setActiveSlide(prev => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) + 1) % maxSlides
    }));
  };

  const prevSlide = (projectId, maxSlides) => {
    setActiveSlide(prev => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) - 1 + maxSlides) % maxSlides
    }));
  };

  const navItems = [
    { label: 'Work', href: '#work' },
    { label: 'Projects', href: '#projects' },
    { label: 'Design', href: '#design' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50 text-gray-900 relative overflow-x-hidden cursor-none">
      {/* Big fun cursor */}
      <div
        className="pointer-events-none fixed w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-teal-400 transition-all duration-200 ease-out"
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          transform: 'translate(-50%, -50%)',
          zIndex: 10000,
          opacity: 0.8,
          boxShadow: '0 0 30px rgba(248, 113, 113, 0.6), 0 0 50px rgba(94, 234, 212, 0.4)'
        }}
      >
        <div className="absolute inset-0 rounded-full bg-white/40 animate-ping" style={{ animationDuration: '1.5s' }} />
      </div>

      {/* Vibrant cursor trail */}
      {trails.map((trail, i) => (
        <div
          key={trail.id}
          className="pointer-events-none fixed rounded-full bg-gradient-to-br from-red-300 to-teal-300 transition-opacity duration-500"
          style={{
            left: trail.x,
            top: trail.y,
            opacity: (i + 1) / trails.length * 0.4,
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
            width: `${(i + 1) * 4}px`,
            height: `${(i + 1) * 4}px`
          }}
        />
      ))}

      {/* Top Navigation - Modern */}
      <nav className="fixed top-8 right-8 z-50">
        <div className="hidden md:flex gap-8">
          {navItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              className="text-gray-700 hover:text-red-600 transition-colors text-sm font-medium tracking-wide uppercase"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden bg-white p-3 shadow-lg border border-gray-200 text-gray-900 hover:border-red-500 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full right-0 mt-2 bg-white shadow-xl border border-gray-200 p-4 min-w-[200px]">
            {navItems.map(item => (
              <a
                key={item.href}
                href={item.href}
                className="block py-3 text-gray-700 hover:text-red-600 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Vibrant background gradient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-red-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-teal-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-orange-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Hero Section - Modern Layout */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col px-8 md:px-16 py-8 overflow-hidden">
        {/* Top Left - Name with gradient accent */}
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-teal-600 bg-clip-text text-transparent mb-1 tracking-tight">
            Tamiraa Sanjaajav
          </h1>
        </div>

        {/* Center - Main Statement */}
        <div className="flex-1 flex items-center justify-center relative z-10">
          <div className="max-w-4xl px-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-center mb-8 text-gray-900 tracking-tight">
              An aspiring leader in the <span className="bg-gradient-to-r from-red-600 to-teal-600 bg-clip-text text-transparent">tech space</span>
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-center text-gray-700 font-normal max-w-3xl mx-auto leading-relaxed">
              Passionate about creating meaningful digital experiences that drive education, sustainability, and social impact
            </p>
            <p className="text-base md:text-lg text-center font-medium mt-6 bg-gradient-to-r from-red-600 to-teal-600 bg-clip-text text-transparent">
              Currently at Wesleyan University
            </p>
          </div>
        </div>

        {/* Bottom - Contact & Image */}
        <div className="relative z-10 flex justify-between items-end">
          {/* Bottom Left - Contact Info & Resume */}
          <div className="space-y-3 text-sm md:text-base">
            <div className="flex items-center gap-3 group">
              <Mail className="w-4 h-4 text-red-600" />
              <a href="mailto:your.email@example.com" className="text-gray-700 hover:text-red-600 transition-colors">
                your.email@example.com
              </a>
            </div>
            <div className="flex items-center gap-3 group">
              <Linkedin className="w-4 h-4 text-red-600" />
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-red-600 transition-colors">
                linkedin.com/in/tamiraa
              </a>
            </div>
            <div className="flex items-center gap-3 group">
              <Github className="w-4 h-4 text-red-600" />
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-red-600 transition-colors">
                @tamiraa
              </a>
            </div>
            <div className="pt-2">
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-teal-600 text-white font-medium rounded-lg hover:from-red-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Download Resume
              </a>
            </div>
          </div>

          {/* Bottom Right - Profile Image */}
          <div className="hidden md:block w-48 h-48 lg:w-64 lg:h-64 rounded-2xl overflow-hidden shadow-2xl ring-2 ring-red-500/20 hover:ring-red-500/40 transition-all">
            <img
              src="/profile.jpg"
              alt="Tamiraa Sanjaajav"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gradient-to-b from-red-600 to-teal-600 rounded-full mt-2" />
          </div>
        </div>
      </section>

      {/* Featured Technical Projects */}
      <section id="work" className="py-24 px-6 relative bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 fade-in-section text-gray-900 tracking-tight">
            Featured <span className="bg-gradient-to-r from-red-600 to-teal-600 bg-clip-text text-transparent">Work</span>
          </h2>
          
          <div className="space-y-24">
            {technicalProjects.map((project, index) => (
              <div
                key={project.id}
                className={`fade-in-section ${index % 2 === 1 ? 'md:flex-row-reverse' : ''} md:flex gap-12 items-center`}
              >
                <div className="md:w-1/2 mb-8 md:mb-0">
                  <div className="relative group">
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-red-100/50 via-orange-50 to-teal-100/50 transition-all aspect-[16/9] p-4">
                      <img
                        src={project.images[activeSlide[project.id] || 0]}
                        alt={project.title}
                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                      />
                      {project.images.length > 1 && (
                        <>
                          <button
                            onClick={() => prevSlide(project.id, project.images.length)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-red-600 hover:text-white transition-all border border-gray-200"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => nextSlide(project.id, project.images.length)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-red-600 hover:text-white transition-all border border-gray-200"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {project.images.map((_, i) => (
                              <div
                                key={i}
                                className={`h-2 rounded-full transition-all ${
                                  i === (activeSlide[project.id] || 0)
                                    ? 'bg-gradient-to-r from-red-600 to-teal-600 w-8'
                                    : 'bg-white/70 w-2'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="md:w-1/2">
                  <h3 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
                    {project.title}
                  </h3>
                  <p className="text-lg md:text-xl text-gray-600 mb-4 font-medium">{project.subtitle}</p>
                  <div className="flex gap-2 mb-6 flex-wrap">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gradient-to-r hover:from-red-600 hover:to-teal-600 hover:text-white transition-all font-medium border border-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Management Section */}
      <section id="projects" className="py-24 px-6 bg-slate-50 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 fade-in-section text-gray-900 tracking-tight">
            Project <span className="bg-gradient-to-r from-red-600 to-teal-600 bg-clip-text text-transparent">Management</span>
          </h2>

          <div className="space-y-24">
            {pmProjects.map(project => (
              <div key={project.id} className="fade-in-section">
                <h3 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
                  {project.title}
                </h3>
                <p className="text-lg md:text-xl text-gray-600 mb-4 font-medium">{project.subtitle}</p>
                <p className="text-gray-700 mb-8 max-w-3xl">{project.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.images.map((img, i) => (
                    <div
                      key={i}
                      className="relative overflow-hidden rounded-xl aspect-[4/3] group cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl ring-2 ring-gray-200 hover:ring-red-500/40"
                      onClick={() => setActiveProject(activeProject === `${project.id}-${i}` ? null : `${project.id}-${i}`)}
                    >
                      <img
                        src={img}
                        alt={`${project.title} ${i + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-red-600/10 to-transparent group-hover:from-red-600/20 transition-all" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design & Marketing Grid */}
      <section id="design" className="py-24 px-6 relative bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 fade-in-section text-gray-900 tracking-tight">
            Design & <span className="bg-gradient-to-r from-red-600 to-teal-600 bg-clip-text text-transparent">Marketing</span>
          </h2>

          <div className="columns-2 md:columns-3 gap-4 fade-in-section">
            {designWorks.map((work, i) => (
              <div
                key={work.id}
                className="mb-4 break-inside-avoid group cursor-pointer transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all ring-2 ring-gray-200 hover:ring-red-500/40">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-slate-50 relative">
        <div className="max-w-4xl mx-auto fade-in-section">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 tracking-tight">
            About <span className="bg-gradient-to-r from-red-600 to-teal-600 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="prose prose-lg max-w-none bg-white rounded-2xl p-8 md:p-12 ring-2 ring-gray-200 shadow-xl">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              Your story here about connecting the dots between your technical work, project management, and design.
              Talk about your passion for education and accessibility.
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              More about your approach, values, and what drives your work.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 relative bg-white">
        <div className="max-w-4xl mx-auto text-center fade-in-section">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 tracking-tight">
            Let's <span className="bg-gradient-to-r from-red-600 to-teal-600 bg-clip-text text-transparent">Connect</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-12 font-medium">
            Interested in working together? Reach out!
          </p>

          <div className="flex gap-6 justify-center">
            <a
              href="mailto:your.email@example.com"
              className="p-5 bg-gray-100 rounded-full hover:bg-gradient-to-r hover:from-red-600 hover:to-teal-600 hover:text-white transition-all hover:scale-110 shadow-lg hover:shadow-xl ring-2 ring-gray-200"
            >
              <Mail className="w-7 h-7" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 bg-gray-100 rounded-full hover:bg-gradient-to-r hover:from-red-600 hover:to-teal-600 hover:text-white transition-all hover:scale-110 shadow-lg hover:shadow-xl ring-2 ring-gray-200"
            >
              <Linkedin className="w-7 h-7" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 bg-gray-100 rounded-full hover:bg-gradient-to-r hover:from-red-600 hover:to-teal-600 hover:text-white transition-all hover:scale-110 shadow-lg hover:shadow-xl ring-2 ring-gray-200"
            >
              <Github className="w-7 h-7" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-200 bg-slate-50">
        <div className="max-w-6xl mx-auto text-center text-gray-600 font-medium">
          <p>© 2025 Tamiraa Sanjaajav. Designed & built with care</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-25px) rotate(5deg);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }

        .morphing-word {
          animation: morph 6s ease-in-out infinite;
        }

        @keyframes morph {
          0%, 100% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.15) rotate(-3deg);
          }
          50% {
            transform: scale(1);
          }
          75% {
            transform: scale(1.15) rotate(3deg);
          }
        }

        .fade-in-section {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1),
                      transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .fade-in-section.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        html {
          scroll-behavior: smooth;
        }

        .kinetic-text span {
          transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;