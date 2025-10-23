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
  const designGalleryRef = useRef(null);

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

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Subtle waterfall scroll effect for design gallery
  useEffect(() => {
    let animationId;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;
    let isAnimating = false;

    const animateScroll = () => {
      if (designGalleryRef.current && isAnimating) {
        scrollPosition += scrollSpeed;
        const maxScroll = designGalleryRef.current.scrollHeight / 2;

        if (scrollPosition >= maxScroll) {
          scrollPosition = 0;
        }

        designGalleryRef.current.style.transform = `translateY(-${scrollPosition}px)`;
        animationId = requestAnimationFrame(animateScroll);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAnimating) {
            isAnimating = true;
            animationId = requestAnimationFrame(animateScroll);
          } else if (!entry.isIntersecting && isAnimating) {
            isAnimating = false;
            if (animationId) {
              cancelAnimationFrame(animationId);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const galleryElement = designGalleryRef.current?.parentElement;
    if (galleryElement) {
      observer.observe(galleryElement);
    }

    return () => {
      isAnimating = false;
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      observer.disconnect();
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const sections = ['#work', '#projects', '#design', '#about', '#contact'];

    const handleKeyDown = (e) => {
      if ((e.key === ' ' || e.key === 'Enter') &&
          !['INPUT', 'TEXTAREA', 'BUTTON', 'A'].includes(e.target.tagName)) {
        e.preventDefault();

        const sectionElements = sections.map(selector => document.querySelector(selector)).filter(Boolean);
        const scrollPosition = window.scrollY + 100;
        let currentSectionIndex = -1;

        for (let i = 0; i < sectionElements.length; i++) {
          const element = sectionElements[i];
          if (scrollPosition < element.offsetTop) {
            currentSectionIndex = i - 1;
            break;
          }
        }

        if (currentSectionIndex === -1) {
          currentSectionIndex = sectionElements.length - 1;
        }

        const nextIndex = currentSectionIndex + 1;
        if (nextIndex < sectionElements.length) {
          sectionElements[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const BASE_URL = import.meta.env.BASE_URL;

  const technicalProjects = [
    {
      id: 'tuuri',
      title: 'Tuuri',
      subtitle: 'Interactive History Learning Platform',
      description: 'Developed a web application for learning Mongolian history through interactive 3D/2D visualizations built with ThreeJS and PixiJS. Collaborated with history professors to create an engaging educational tool that maintained public access for multiple years. Recognized at Nest Hackathon for its innovative approach to making history education more accessible.',
      tags: ['ThreeJS', 'PixiJS', 'Web Development', 'Education'],
      images: [
        `${BASE_URL}images/tuuri-1.png`,
        `${BASE_URL}images/tuuri-2.png`,
        `${BASE_URL}images/tuuri-3.png`
      ]
    },
    {
      id: 'climatescience',
      title: 'ClimateScience',
      subtitle: 'Climate Education Platform',
      description: 'Designed user-centered educational experiences for climate literacy, creating accessible interfaces that make complex climate science concepts approachable for diverse audiences. Focused on inclusive design principles and clear visual communication.',
      tags: ['UI/UX Design', 'Web Design', 'Education', 'Accessibility'],
      images: [
        `${BASE_URL}images/climatescience-1.png`,
        `${BASE_URL}images/climatescience-2.png`
      ]
    },
    {
      id: 'uuy',
      title: 'UUY',
      subtitle: 'Mobile Pick-Up Application',
      description: 'Designed an intuitive mobile application focused on seamless user experience and efficient logistics. Emphasized clean interface design, thoughtful user flows, and mobile-first interaction patterns.',
      tags: ['Mobile Design', 'UI/UX', 'Product Design'],
      images: [
        `${BASE_URL}images/uuy-1.png`,
        `${BASE_URL}images/uuy-2.png`
      ]
    }
  ];

  const pmProjects = [
    {
      id: 'junior-rangers',
      title: 'Junior Rangers Mongolia',
      subtitle: 'Youth Climate Education Initiative',
      description: 'Led operational execution of an environmental education program in partnership with the Australian Embassy, National Garden Park, and National Botanic Garden. Coordinated logistics, developed curriculum materials, and managed relationships across partner organizations. Recognized with the UNA Rising Star Award for program delivery and stakeholder coordination.',
      images: [
        `${BASE_URL}images/junior-rangers-1.png`,
        `${BASE_URL}images/junior-rangers-2.png`,
        `${BASE_URL}images/junior-rangers-3.png`,
        `${BASE_URL}images/junior-rangers-4.png`,
        `${BASE_URL}images/junior-rangers-5.png`,
        `${BASE_URL}images/junior-rangers-6.png`
      ]
    },
    {
      id: 'nomadvocate',
      title: 'NomAdvocate',
      subtitle: 'Essay Writing Program for Youth Leaders',
      description: 'Developed and managed a community-driven essay writing program designed to strengthen critical thinking and advocacy skills for youth leaders. Secured funding, coordinated partnerships with Amnesty International and American Corner, and facilitated comprehensive program delivery including classroom sessions and graduation ceremony.',
      images: [
        `${BASE_URL}images/nomadvocate-1.png`,
        `${BASE_URL}images/nomadvocate-2.png`,
        `${BASE_URL}images/nomadvocate-3.png`,
        `${BASE_URL}images/nomadvocate-4.png`,
        `${BASE_URL}images/nomadvocate-6.png`,
        `${BASE_URL}images/nomadvocate-7.png`
      ]
    }
  ];

  const designWorks = [
    { id: 'design-1', image: `${BASE_URL}images/design-1.jpg`, title: 'Design Work 1' },
    { id: 'design-2', image: `${BASE_URL}images/design-3.png`, title: 'Design Work 2' },
    { id: 'design-3', image: `${BASE_URL}images/design-2.png`, title: 'Design Work 3' },
    { id: 'design-4', image: `${BASE_URL}images/design-10.jpg`, title: 'Design Work 4' },
    { id: 'design-5', image: `${BASE_URL}images/design-4.png`, title: 'Design Work 5' },
    { id: 'design-6', image: `${BASE_URL}images/design-7.png`, title: 'Design Work 6' },
    { id: 'design-9', image: `${BASE_URL}images/design-5.png`, title: 'Design Work 9' },
    { id: 'design-10', image: `${BASE_URL}images/design-11.jpg`, title: 'Design Work 10' },
    { id: 'design-11', image: `${BASE_URL}images/design-9.png`, title: 'Design Work 11' }
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
    <div ref={containerRef} className="min-h-screen bg-slate-50 text-gray-900 relative overflow-x-hidden md:cursor-none">
      {/* Big fun cursor */}
      <div
        className="hidden md:block pointer-events-none fixed w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-teal-400 transition-all duration-200 ease-out"
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
          className="hidden md:block pointer-events-none fixed rounded-full bg-gradient-to-br from-red-300 to-teal-300 transition-opacity duration-500"
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

      {/* Fixed Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[9998] bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#home" className="text-xl font-bold bg-gradient-to-r from-red-600 to-teal-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            Tamiraa Sanjaajav
          </a>

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

          <button
            className="md:hidden bg-white p-2 text-gray-900 hover:text-red-600 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            {navItems.map(item => (
              <a
                key={item.href}
                href={item.href}
                className="block py-3 px-6 text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Vibrant background gradient with parallax effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full transition-transform duration-500 ease-out"
          style={{
            filter: 'blur(70px)',
            background: 'radial-gradient(circle at center, rgba(239, 68, 68, 0.25) 0%, rgba(239, 68, 68, 0.15) 40%, transparent 70%)',
            transform: `translateY(${scrollY * 0.5}px) translateX(${scrollY * 0.2}px)`
          }}
        />
        <div
          className="absolute bottom-0 -left-48 w-[600px] h-[600px] rounded-full transition-transform duration-500 ease-out"
          style={{
            filter: 'blur(70px)',
            background: 'radial-gradient(circle at center, rgba(20, 184, 166, 0.25) 0%, rgba(20, 184, 166, 0.15) 40%, transparent 70%)',
            transform: `translateY(${scrollY * -0.4}px) translateX(${scrollY * -0.15}px)`
          }}
        />
        <div
          className="absolute top-3/4 left-3/4 w-[450px] h-[450px] rounded-full transition-transform duration-500 ease-out"
          style={{
            filter: 'blur(70px)',
            background: 'radial-gradient(circle at center, rgba(249, 115, 22, 0.2) 0%, rgba(249, 115, 22, 0.1) 40%, transparent 70%)',
            transform: `translate(-50%, -50%) scale(${1 + scrollY * 0.001}) rotate(${scrollY * 0.05}deg)`
          }}
        />
      </div>

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="relative min-h-screen flex flex-col justify-between px-8 md:px-16 py-16 overflow-hidden z-10">
        <div className="h-20 md:h-32"></div>

        <div className="flex-1 flex items-center justify-center relative z-10 pb-12 md:pb-20">
          <div className="max-w-4xl px-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-center mb-8 tracking-tight animate-text-reveal hover:animate-text-wave">
              <span className="text-gray-900" >Aspiring leader in the </span><span className="bg-gradient-to-r from-red-600 via-orange-600 to-teal-500 bg-clip-text text-transparent font-extrabold">tech space</span>
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-center text-gray-900 font-normal max-w-3xl mx-auto leading-relaxed animate-text-reveal" style={{ animationDelay: '0.8s'}}>
              Computer Science and Economics student building meaningful digital experiences that bridge technology, design, and social impact
            </p>
            <p className="text-base md:text-lg text-center font-medium mt-6 text-gray-700 animate-text-reveal" style={{ animationDelay: '1.6s'}}>
              📍 Wesleyan University, USA
            </p>
          </div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center md:items-end gap-8 md:gap-0">
          <div className="space-y-3 text-sm md:text-base animate-pop-in w-full md:w-auto flex flex-col items-center md:items-start" style={{ animationDelay: '2.2s' }}>
            <div className="flex items-center gap-3 group">
              <Mail className="w-4 h-4 text-red-600 flex-shrink-0" />
              <a href="mailto:tsanjaajav@wesleyan.edu" className="text-gray-700 hover:text-red-600 transition-colors break-all">
                tsanjaajav@wesleyan.edu
              </a>
            </div>
            <div className="flex items-center gap-3 group">
              <Linkedin className="w-4 h-4 text-red-600 flex-shrink-0" />
              <a href="https://www.linkedin.com/in/tami-san/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-red-600 transition-colors break-all">
                linkedin.com/in/tami-san
              </a>
            </div>
            <div className="pt-2">
              <a
                href={`${BASE_URL}resume.pdf`}
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-teal-500 text-white font-medium rounded-lg hover:from-red-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl hover:scale-105 text-sm md:text-base"
              >
                Download Resume
              </a>
            </div>
          </div>

          <div className="w-40 h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-2xl overflow-hidden shadow-2xl ring-2 ring-red-500/20 hover:ring-red-500/40 transition-all animate-pop-in" style={{ animationDelay: '2.2s' }}>
            <img
              src={`${BASE_URL}profile.jpg`}
              alt="Tamiraa Sanjaajav"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        <a href="#work" className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer hover:scale-110 transition-transform animate-pop-in" style={{ animationDelay: '2.6s' }}>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center hover:border-red-600 transition-colors">
            <div className="w-1 h-3 bg-gradient-to-b from-red-600 to-teal-500 rounded-full mt-2 animate-bounce" />
          </div>
        </a>
      </section>

      {/* Featured Technical Projects */}
      <section id="work" className="py-24 px-6 relative bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 fade-in-section text-gray-900 tracking-tight">
            Featured <span className="bg-gradient-to-r from-red-600 to-teal-500 bg-clip-text text-transparent">Work</span>
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
                                    ? 'bg-gradient-to-r from-red-600 to-teal-500 w-8'
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
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gradient-to-r hover:from-red-600 hover:to-teal-500 hover:text-white transition-all font-medium border border-gray-200"
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
            Project <span className="bg-gradient-to-r from-red-600 to-teal-500 bg-clip-text text-transparent">Management</span>
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 fade-in-section text-gray-900 tracking-tight">
            Design & <span className="bg-gradient-to-r from-red-600 to-teal-500 bg-clip-text text-transparent">Marketing</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-16 fade-in-section max-w-2xl">
            Visual storytelling and brand work for education and social impact initiatives
          </p>

          <div className="relative overflow-hidden max-h-[800px] fade-in-section">
            <div ref={designGalleryRef} className="columns-2 md:columns-3 gap-4 will-change-transform">
              {[...designWorks, ...designWorks].map((work, i) => (
                <div
                  key={`${work.id}-${i}`}
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
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-slate-50 relative">
        <div className="max-w-4xl mx-auto fade-in-section">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 tracking-tight">
            About <span className="bg-gradient-to-r from-red-600 to-teal-500 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="relative bg-white rounded-2xl p-8 md:p-12 shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-500/5 to-transparent rounded-full blur-3xl -z-0" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-teal-500/5 to-transparent rounded-full blur-3xl -z-0" />

            <div className="relative z-10">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                I'm currently studying Computer Science and Economics with a minor in Global Engagement at Wesleyan University. My work spans product management, software development, and design—with a focus on projects in education, community building, and social impact.
              </p>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                I'm passionate about creating inclusive, efficient, and engaging experiences ✨ whether that's designing user interfaces, coordinating cross-functional teams, or building technical solutions from the ground up. I believe the best work comes from understanding people's needs deeply and making complex ideas accessible.
              </p>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                When I'm not coding or managing projects, I'm exploring how technology can serve communities and create meaningful change. I bring perspectives from growing up in Mongolia and studying in the U.S., which shapes how I think about building for diverse audiences.
              </p>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Originally from Ulaanbaatar, Mongolia 🇲🇳
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 relative bg-white">
        <div className="max-w-4xl mx-auto text-center fade-in-section">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 tracking-tight">
            Let's <span className="bg-gradient-to-r from-red-600 to-teal-500 bg-clip-text text-transparent">Connect</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-12 font-medium">
            Interested in collaborating or just want to chat? I'd love to hear from you!
          </p>

          <div className="flex gap-6 justify-center">
            <a
              href="mailto:tsanjaajav@wesleyan.edu"
              className="p-5 bg-gray-100 rounded-full hover:bg-gradient-to-r hover:from-red-600 hover:to-teal-500 hover:text-white transition-all hover:scale-110 shadow-lg hover:shadow-xl ring-2 ring-gray-200"
            >
              <Mail className="w-7 h-7" />
            </a>
            <a
              href="https://www.linkedin.com/in/tami-san/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 bg-gray-100 rounded-full hover:bg-gradient-to-r hover:from-red-600 hover:to-teal-500 hover:text-white transition-all hover:scale-110 shadow-lg hover:shadow-xl ring-2 ring-gray-200"
            >
              <Linkedin className="w-7 h-7" />
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

        @keyframes text-reveal {
          from {
            opacity: 0;
            clip-path: inset(0 100% 0 0);
            filter: blur(10px);
          }
          to {
            opacity: 1;
            clip-path: inset(0 0 0 0);
            filter: blur(0px);
          }
        }

        @keyframes text-wave {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes pop-in {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }

        .animate-text-reveal {
          opacity: 0;
          animation: text-reveal 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-text-wave {
          animation: text-wave 0.6s ease-in-out;
        }

        .animate-pop-in {
          opacity: 0;
          animation: pop-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
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