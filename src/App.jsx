import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Mail, Linkedin, Github, Menu, X } from 'lucide-react';
import './index.css'

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
      description: "In 2022, I noticed students dreaded learning about Mongolian history. The textbook was thin, the teachers were underpaid, and the history books were expensive. Information in Mongolian was scant and archaic on the internet. To solve this, I gathered the best coders in my year to develop a website called Tuuri. For half a year, we met up and brainstormed ways to make history more interesting to learn. We reached out to a history professor at the University of National Academy and Sciences and set to work rewriting classroom materials into narrative articles that students that students could engage with. I created illustrations on Adobe Illustrator and Photoshop, designed a user friendly interface with a beautiful spiraling timeline, and hover interactions. The spiral was made using a blend of 3D and 2D modeling frameworks such as PixiJS and ThreeJS. Although initially started as a submission to a hackathon project, Tuuri turned into a collaborative reflection on why history and how it's told matters to people in the age of digital media. The project was live for two years before being put on hiatus. ",
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
      description: 'During the COVID pandemic lockdown, I joined Climate Science ss one of its founding members in Mongolia. I created a professional website for Climate Science that also included a learning portal for students to engage with translated climate science materials. Besides website design, I worked as an outreach coordinator, contacting schools and educational organizations in Central and Southeast Asia. As a team, we worked to deliver high quality educational materials online through school partnerships and social media.',
      images: [
        `${BASE_URL}images/climatescience-1.png`,
        `${BASE_URL}images/climatescience-2.png`
      ]
    }
    // ,
    // {
    //   id: 'uuy',
    //   title: 'UUY',
    //   subtitle: 'Mobile Pick-Up Application',
    //   description: 'Designed an intuitive mobile application focused on seamless user experience and efficient logistics. Emphasized clean interface design, thoughtful user flows, and mobile-first interaction patterns.',
    //   tags: ['Mobile Design', 'UI/UX', 'Product Design'],
    //   images: [
    //     `${BASE_URL}images/uuy-1.png`,
    //     `${BASE_URL}images/uuy-2.png`
    //   ]
    // }
  ];

  const pmProjects = [

    {
      id: 'nomadvocate', 
      title: 'Nomadvocate',
      subtitle: 'Essay Writing Program for Young Leaders',
      description: "After taking a formative writing class in university, I was inspired to create an essay writing program for students in Mongolia. Since 2025, we have had over 300 students from 10 different provinces in Mongolia graduate from the program. I aim to expand the Nomadvocate Project to all 21 provinces and provide a premium pre-collegiate writing experience that bridges students' socioeconomic divide.",
      images: [
        // `${BASE_URL}images/nomadvocate-1.png`,
        `${BASE_URL}images/nomadvocate-2.png`,
        // `${BASE_URL}images/nomadvocate-3.png`,
        `${BASE_URL}images/nomadvocate-4.png`,
        `${BASE_URL}images/nomadvocate-6.png`
        // ,
        // `${BASE_URL}images/nomadvocate-7.png`
      ]
    }
    ,
    {
      id: 'junior-rangers',
      title: 'Junior Rangers Mongolia',
      subtitle: 'Youth Climate Education Initiative',
      description: 'After stepping down from the Climate Science board, I worked as the program coordinator for the Junior Rangers program founded by UNA Mongolia. Based off of youth programs ran at US national parks, the program was aimed at preparing high school students for a career in environmental science and nature preservation. We partnered with the two largest National Parks in Ulaanbaatar as well as the Australian Embassy to execute the project. Alongside Junior Rangers, I worked on other programs organized by the UN Association of Mongolia such as the founding of the Civil Society Coalition, the National Youth Environmental Council, the formulation of the National Action Plan for WPS and more.',
      images: [
        `${BASE_URL}images/junior-rangers-1.png`,
        // `${BASE_URL}images/junior-rangers-2.png`,
        // `${BASE_URL}images/junior-rangers-3.png`,
        // `${BASE_URL}images/junior-rangers-4.png`,
        `${BASE_URL}images/junior-rangers-5.png`,
        `${BASE_URL}images/junior-rangers-6.png`
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
    { id: 'design-11', image: `${BASE_URL}images/design-9.png`, title: 'Design Work 11' },
    { id: 'design-12', image: `${BASE_URL}images/design-12.png`, title: 'Design Work 12' },
    { id: 'design-13', image: `${BASE_URL}images/design-13.jpg`, title: 'Design Work 13' },
    { id: 'design-14', image: `${BASE_URL}images/design-14.jpg`, title: 'Design Work 14' },
    { id: 'design-15', image: `${BASE_URL}images/design-15.png`, title: 'Design Work 15' },
    { id: 'design-16', image: `${BASE_URL}images/design-16.jpg`, title: 'Design Work 16' }
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
    { label: 'Home', href: '#home' },
    { label: 'Projects', href: '#projects' },
    { label: 'Design', href: '#work' },
    { label: 'Marketing', href: '#design' },
    // { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50 text-gray-900 relative overflow-x-hidden md:cursor-none">
      {/* Big fun cursor */}
      <div
        className="hidden md:block pointer-events-none fixed w-12 h-12 rounded-full bg-gradient-to-br from-brand-400 to-accent-400 transition-all duration-200 ease-out"
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          transform: 'translate(-50%, -50%)',
          zIndex: 10000,
          opacity: 0.8,
          boxShadow: '0 0 30px color-mix(in srgb, var(--color-brand-400) 60%, transparent)'
        }}
      >
        <div className="absolute inset-0 rounded-full bg-white/40 animate-ping" style={{ animationDuration: '1.5s' }} />
      </div>

      {/* Vibrant cursor trail */}
      {trails.map((trail, i) => (
        <div
          key={trail.id}
          className="hidden md:block pointer-events-none fixed rounded-full bg-gradient-to-br from-brand-300 to-accent-300 transition-opacity duration-500"
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
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-center items-center">
          <a href="#home" className="text-xl font-bold text-brand-600 hover:opacity-80 transition-opacity">
            
          </a>

          <div className="hidden md:flex gap-8">
            {navItems.map(item => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-brand-600 transition-colors text-sm font-medium tracking-wide uppercase"
              >
                {item.label}
              </a>
            ))}
          </div>

          <button
            className="md:hidden p-2 text-gray-900 hover:text-brand-600 transition-colors"
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
                className="block py-3 px-6 text-gray-700 hover:text-brand-600 hover:bg-gray-50 transition-colors font-medium"
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
            background: 'radial-gradient(circle at center, color-mix(in srgb, var(--color-brand-500) 25%, transparent) 0%, color-mix(in srgb, var(--color-brand-500) 15%, transparent) 40%, transparent 70%)',
            transform: `translateY(${scrollY * 0.5}px) translateX(${scrollY * 0.2}px)`
          }}
        />
        <div
          className="absolute bottom-0 -left-48 w-[600px] h-[600px] rounded-full transition-transform duration-500 ease-out"
          style={{
            filter: 'blur(70px)',
            background: 'radial-gradient(circle at center, color-mix(in srgb, var(--color-accent-500) 25%, transparent) 0%, color-mix(in srgb, var(--color-accent-500) 15%, transparent) 40%, transparent 70%)',
            transform: `translateY(${scrollY * -0.4}px) translateX(${scrollY * -0.15}px)`
          }}
        />
        <div
          className="absolute top-3/4 left-3/4 w-[450px] h-[450px] rounded-full transition-transform duration-500 ease-out"
          style={{
            filter: 'blur(70px)',
            background: 'radial-gradient(circle at center, color-mix(in srgb, var(--color-warm-500) 20%, transparent) 0%, color-mix(in srgb, var(--color-warm-500) 10%, transparent) 40%, transparent 70%)',
            transform: `translate(-50%, -50%) scale(${1 + scrollY * 0.001}) rotate(${scrollY * 0.05}deg)`
          }}
        />
      </div>

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="relative min-h-screen flex items-center px-8 md:px-16 pt-28 pb-24 overflow-hidden z-10">
        <div className="max-w-6xl mx-auto w-full flex flex-col-reverse md:flex-row items-center md:justify-between gap-10 md:gap-16">

          {/* Text */}
          <div className="w-full md:w-3/5 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight animate-text-reveal">
              Tamiraa <span className="bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">Sanjaajav</span>
            </h1>

            <div className="mt-6 animate-text-reveal" style={{ animationDelay: '0.8s' }}>
              <p className="text-xl md:text-2xl font-semibold text-gray-900">
                Economics and Computer Science Major
              </p>
              <p className="text-xl md:text-2xl font-semibold text-gray-900">
                at Wesleyan University
              </p>
              <p className="text-base md:text-lg text-gray-600 mt-2 max-w-xl">
                Hello! This is a website detailing my professional and academic experience.
              </p>
            </div>

            <div className="mt-8 flex flex-col items-center md:items-start gap-3 text-sm md:text-base animate-pop-in" style={{ animationDelay: '1.4s' }}>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-600 flex-shrink-0" />
                <a href="mailto:tsanjaajav@wesleyan.edu" className="text-gray-700 hover:text-brand-600 transition-colors break-all">
                  tsanjaajav@wesleyan.edu
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Linkedin className="w-4 h-4 text-brand-600 flex-shrink-0" />
                <a href="https://www.linkedin.com/in/tami-san/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-brand-600 transition-colors break-all">
                  linkedin.com/in/tami-san
                </a>
              </div>
              <a
                href={`${BASE_URL}resume.pdf`}
                download
                className="mt-2 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-600 to-accent-500 text-white font-medium rounded-lg hover:from-brand-700 hover:to-accent-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Download Resume
              </a>
            </div>
          </div>

          {/* Photo */}
          <div className="w-44 h-44 md:w-64 md:h-64 lg:w-80 lg:h-80 flex-shrink-0 rounded-xl overflow-hidden shadow-2xl ring-2 ring-brand-500/20 animate-pop-in" style={{ animationDelay: '0.4s' }}>
            <img
              src={`${BASE_URL}profile-pic.jpeg`}
              alt="Tamiraa Sanjaajav"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <a href="#work" className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer hover:scale-110 transition-transform animate-pop-in" style={{ animationDelay: '2s' }}>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center hover:border-brand-600 transition-colors">
            <div className="w-1 h-3 bg-gradient-to-b from-brand-600 to-accent-500 rounded-full mt-2 animate-bounce" />
          </div>
        </a>
      </section>


      {/* Project Management Section */}
      <section id="projects" className="py-24 px-6 bg-slate-50 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 fade-in-section text-gray-900 tracking-tight">
            Project <span className="bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">Management</span>
          </h2>

          <div className="space-y-24">
            {pmProjects.map(project => (
              <div key={project.id} className="fade-in-section">
                <h3 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
                  {project.title}
                </h3>
                <p className="text-lg md:text-xl text-gray-600 mb-4 font-medium">{project.subtitle}</p>
                <p className="text-gray-700 mb-8 max-w-5xl">{project.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.images.map((img, i) => (
                    <div
                      key={i}
                      className="relative overflow-hidden rounded-xl aspect-[4/3] group  transition-all duration-300 shadow-lg hover:shadow-2xl ring-2 ring-gray-200 hover:ring-brand-500/40"
                      onClick={() => setActiveProject(activeProject === `${project.id}-${i}` ? null : `${project.id}-${i}`)}
                    >
                      <img
                        src={img}
                        alt={`${project.title} ${i + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-600/10 to-transparent group-hover:from-brand-600/20 transition-all" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* UI/UX Design */}
      <section id="work" className="py-24 px-6 relative bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 fade-in-section text-gray-900 tracking-tight">
            UI/UX <span className="text-brand-600">Design</span>
          </h2>

          <div className="space-y-24">
            {technicalProjects.map(project => (
              <div key={project.id} className="fade-in-section">
                {/* Pictures */}
                <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-brand-100/40 aspect-[16/9] p-4">
                  <img
                    src={project.images[activeSlide[project.id] || 0]}
                    alt={project.title}
                    className="w-full h-full object-contain"
                  />
                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={() => prevSlide(project.id, project.images.length)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-brand-600 hover:text-white transition-all border border-gray-200"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => nextSlide(project.id, project.images.length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-brand-600 hover:text-white transition-all border border-gray-200"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {project.images.map((_, i) => (
                          <div
                            key={i}
                            className={`h-2 rounded-full transition-all ${
                              i === (activeSlide[project.id] || 0)
                                ? 'bg-accent-500 w-8'
                                : 'bg-white/70 w-2'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Text */}
                <div className="mt-8 max-w-5xl">
                  <h3 className="text-xl md:text-4xl font-bold mb-2 text-gray-900">
                    {project.title}
                  </h3>
                  <p className="text-lg md:text-xl text-gray-600 mb-4 font-medium">{project.subtitle}</p>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                    {project.description}
                  </p>
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
            Design & <span className="bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">Marketing</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-16 fade-in-section max-w-5xl">
            I designed over a 100 pieces of merchandise, brand guidelines, marketing materials, and social media graphics for public libraries, non-profits, and local businesses.
          </p>

          <div className="relative overflow-hidden max-h-[800px] fade-in-section">
            <div ref={designGalleryRef} className="columns-2 md:columns-3 gap-4 will-change-transform">
              {designWorks.map((work, i) => (
                <div
                  key={`${work.id}-${i}`}
                  className="mb-4 break-inside-avoid"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="relative overflow-hidden rounded-xl shadow-lg ring-2 ring-gray-200">
                    <img
                      src={work.image}
                      alt={work.title}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 relative bg-white">
        <div className="max-w-4xl mx-auto text-center fade-in-section">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 tracking-tight">
            Contact <span className="bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">Information</span>
          </h2>

          <div className="flex gap-6 justify-center">
            <a
              href="mailto:tsanjaajav@wesleyan.edu"
              className="p-5 bg-gray-100 rounded-full hover:bg-gradient-to-r hover:from-brand-600 hover:to-accent-500 hover:text-white transition-all hover:scale-110 shadow-lg hover:shadow-xl ring-2 ring-gray-200"
            >
              <Mail className="w-7 h-7" />
            </a>
            <a
              href="https://www.linkedin.com/in/tami-san/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 bg-gray-100 rounded-full hover:bg-gradient-to-r hover:from-brand-600 hover:to-accent-500 hover:text-white transition-all hover:scale-110 shadow-lg hover:shadow-xl ring-2 ring-gray-200"
            >
              <Linkedin className="w-7 h-7" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-200 bg-slate-50">
        <div className="max-w-6xl mx-auto text-center text-gray-600">
          <p>© Tamiraa Sanjaajav </p>
          <p>Last Updated: September 28, 2026</p>
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

        
      `}</style>
    </div>
  );
};

export default Portfolio;