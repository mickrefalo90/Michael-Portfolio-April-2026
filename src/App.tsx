import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "motion/react";
import { 
  ExternalLink, 
  Mail, 
  Linkedin, 
  Phone, 
  ArrowUpRight, 
  Zap, 
  Layers, 
  Target, 
  Users, 
  X,
  ArrowRight,
  Loader2,
  FileText
} from "lucide-react";
import { useState, useRef, useEffect, ReactNode } from "react";

// --- Helper Components ---

const PROJECTS = [
  {
    id: 1,
    title: "The Wiggles",
    subtitle: "Wiggle Up, Giddy Up!",
    category: "Album Cover & Promotion",
    description: "Country album cover design for The Wiggles' 2025 release. Bridging iconic childhood branding with a fresh country aesthetic.",
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/max_632_webp/3182da222687219.67eb3e41ca4de.jpg",
    link: "https://www.behance.net/gallery/222687219/The-Wiggles-Wiggle-Up-Giddy-Up-Album-Cover",
    tools: ["Adobe Creative Cloud", "Retouching & Manipulation", "Photography", "Art Direction"]
  },
  {
    id: 2,
    title: "Toys'R'Us (Babies'R'Us)",
    subtitle: "Big Sale for Little Ones",
    category: "Retail Campaign",
    description: "Comprehensive retail campaign for Babies'R'Us. A high-impact visual strategy for one of the world's most iconic baby retailers.",
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/max_632_webp/4ff86366899147.5b270a49bb1e9.jpg",
    link: "https://www.behance.net/gallery/66899147/Big-Sale-for-Little-Ones-2018",
    tools: ["Adobe Creative Suite", "Visual Strategic Planning", "Print & Displays", "Retail Marketing"]
  },
  {
    id: 3,
    title: "iiNet Business",
    subtitle: "Help Hub Digital Platform",
    category: "Digital Campaign",
    description: "Digital help platform for iiNet Business customers. Streamlining complex technical support into an intuitive user experience.",
    image: "https://www.iinet.net.au/sites/iinet/files/2022-03/ii_fb_1200x630px_0.jpg",
    link: "https://www.behance.net/gallery/141959907/iiNet-Business-Help-Hub",
    tools: ["Campaign Management", "Photoshop", "Google Web Designer", "Information Architecture"]
  },
  {
    id: 4,
    title: "Goodman Fielder",
    subtitle: "Best Bacon Buttys NZ",
    category: "FMCG and UGC Campaign",
    description: "FMCG campaign for Goodman Fielder NZ. Creative strategy for a nationwide culinary competition.",
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/08216f116625205.69d3156d3c84c.png",
    link: "https://www.behance.net/gallery/116625205/Best-Bacon-Buttys-NZ-Goodman-Fielder-NZ-Proposal",
    tools: ["Adobe Creative Cloud", "Photography Direction", "Strategic Planning", "FMCG Marketing"]
  },
  {
    id: 5,
    title: "TN'B Records",
    subtitle: "Brand Identity System",
    category: "Logo & Branding",
    description: "Complete brand identity for an independent music label. Bold, rhythmic, and timeless visual language.",
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/max_632_webp/22eee4114320409.6038d496f083a.jpg",
    link: "https://www.behance.net/gallery/114320409/TNB-Records-Logo-and-Branding",
    tools: ["Adobe Illustrator", "Brand Identity", "Typography", "Logo Design"]
  },
  {
    id: 6,
    title: "Unilever",
    subtitle: "Sustainability Initiative",
    category: "FMCG Cmapiagn",
    description: "Sustainable FMCG product display and promotion for Unilever brands' Sustainability Initiatives. Merging environmental responsibility with premium retail appeal.",
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/disp_webp/3b382e116623733.60658d204f37c.png",
    link: "https://www.behance.net/gallery/116623733/Sustainability-HBPC-Unilever-Coles-2021",
    tools: ["Adobe Illustrator", "Packaging Design", "Sustainability Strategy", "FMCG"]
  }
];

const DynamicHelpText = () => {
  const phrases = [
    "Create a key visual for my NPD.",
    "Create an animated brand slate.",
    "Develop a brand playbook.",
    "Create a sample box.",
    "Enhance the quality of my branding.",
    "Enhance my brand with quality assets.",
    "Design and curate an experiential pop-up display.",
    "Create an engaging window display.",
    "Develop a creative strategy.",
    "Develop a global launch strategy.",
    "Craft a unique brand identity.",
    "Direct a creative project.",
    "Produce high-impact content.",
    "Develop a cohesive social media brand playbook.",
    "Elevate brand presence.",
    "Revise and refresh visual language."
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 4500); // Slower cycle
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-24 md:h-40 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} 
          className="text-3xl md:text-6xl font-handwritten text-brand-accent text-center px-4"
        >
          {phrases[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

const TypewriterHeading = () => {
  const sentence = "So, how can I help?";
  
  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.5,
      },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      transition: {
        duration: 0.01,
      },
    },
    hidden: {
      opacity: 0,
    },
  };

  return (
    <motion.h2 
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="text-5xl md:text-8xl font-display tracking-wider uppercase leading-none"
    >
      {sentence.split("").map((char, index) => (
        <motion.span 
          key={index} 
          variants={child}
          className={index >= 12 ? "text-brand-accent" : ""}
        >
          {char}
        </motion.span>
      ))}
    </motion.h2>
  );
};

export default function App() {
  const [activeProject, setActiveProject] = useState<any>(null);
  const [isRatesOpen, setIsRatesOpen] = useState(false);
  const [projectContent, setProjectContent] = useState<string | null>(null);
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [isActuallyFetching, setIsActuallyFetching] = useState(false);
  const containerRef = useRef(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const openProject = async (project: any) => {
    setActiveProject(project);
    setIsLoadingContent(true);
    setIsActuallyFetching(true);
    setProjectContent(null);

    // Create a promise for the fetch task
    const fetchTask = (async () => {
      try {
        const response = await fetch(`/api/project-content?url=${encodeURIComponent(project.link)}`);
        const data = await response.json();
        if (data.content) {
          let content = data.content;
          
          // Specific injection for iiNet project
          if (project.title.includes("iiNet")) {
            const firstImgIndex = content.indexOf("/>");
            if (firstImgIndex !== -1) {
              const injection = `<p class="text-white/90 leading-relaxed mb-8 text-lg md:text-xl max-w-3xl mx-auto font-bold text-center">Copywriting for radio advertising and audio recording direction:</p>`;
              content = content.slice(0, firstImgIndex + 2) + "\n" + injection + content.slice(firstImgIndex + 2);
            }
          }
          
          setProjectContent(content);
        } else {
          setProjectContent(`<div class="p-12 text-center text-zinc-500">Could not load project content. <a href="${project.link}" target="_blank" class="text-brand-accent underline">View on Behance</a></div>`);
        }
      } catch (error) {
        console.error("Error fetching project content:", error);
        setProjectContent(`<div class="p-12 text-center text-red-500">Failed to load content. Please try again later.</div>`);
      } finally {
        setIsActuallyFetching(false);
      }
    })();

    // Race the fetch task against a 3-second timeout
    // This ensures the loader is "held" for at most 3 seconds
    await Promise.race([
      fetchTask,
      new Promise(resolve => setTimeout(resolve, 3000))
    ]);

    setIsLoadingContent(false);
  };

  // Handle scroll-reveal autoplay for audio, video, and iframes
  useEffect(() => {
    if (!projectContent || !contentRef.current) return;

    const timer = setTimeout(() => {
      if (!contentRef.current) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target;
              
              if (el instanceof HTMLMediaElement) {
                // Native Audio/Video
                el.play().catch(err => console.warn("Autoplay blocked:", el.tagName, err));
              } else if (el instanceof HTMLIFrameElement) {
                // Iframe (Vimeo/YouTube)
                const src = el.src;
                if (src.includes("vimeo.com")) {
                  el.contentWindow?.postMessage({ method: "play" }, "*");
                } else if (src.includes("youtube.com")) {
                  el.contentWindow?.postMessage(JSON.stringify({ event: "command", func: "playVideo", args: "" }), "*");
                }
              }
              
              observer.unobserve(el);
            }
          });
        },
        { threshold: 0.2 } // Trigger earlier for better feel
      );

      const mediaElements = contentRef.current.querySelectorAll('audio, video, iframe.video-iframe');
      mediaElements.forEach(el => observer.observe(el));

      return () => observer.disconnect();
    }, 800); // Slightly longer delay to ensure iframes are ready

    return () => clearTimeout(timer);
  }, [projectContent]);

  const closeProject = () => {
    setActiveProject(null);
    setProjectContent(null);
  };

  // Prevent scroll when lightbox is open
  useEffect(() => {
    if (activeProject || isRatesOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeProject, isRatesOpen]);
  
  return (
    <div ref={containerRef} className="relative min-h-screen font-sans bg-[#fdfcfb] overflow-x-hidden">
      {/* Noise Texture Overlay */}
      <div className="noise" />
      
      {/* Background Element */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-screen pointer-events-none z-0 opacity-100 mix-blend-multiply">
        <img 
          src="https://raw.githubusercontent.com/mickrefalo90/MichaelRefalo-Portfolio/refs/heads/main/Michael%20Refalo-Right.jpg" 
          alt="" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain object-right-top"
        />
      </div>
      
      {/* Floating Buttons Group */}
      <div className="fixed top-8 right-8 z-[60] flex flex-col gap-3 items-end">
        <motion.a
          href="#contact"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white text-zinc-900 border border-zinc-200 px-6 md:px-8 py-3 rounded-full font-bold uppercase tracking-widest text-[10px] md:text-xs shadow-lg hover:bg-brand-accent hover:text-white hover:border-brand-accent transition-all duration-300"
        >
          Contact
        </motion.a>
        <motion.button
          onClick={() => setIsRatesOpen(true)}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white text-brand-accent border border-brand-accent px-6 md:px-8 py-3 rounded-full font-bold uppercase tracking-widest text-[10px] md:text-xs shadow-lg hover:bg-brand-accent hover:text-white transition-all duration-300"
        >
          Rates
        </motion.button>
      </div>
 
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 py-32 relative">
        <div className="max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-bold uppercase tracking-[0.3em] text-zinc-400 mb-8"
          >
            Michael Refalo | Creative Manager
          </motion.div>
          
          <div className="overflow-hidden mb-2 md:mb-4">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.5rem,10vw,12rem)] font-display leading-[0.9] tracking-wider uppercase"
            >
              Bridging strategy
            </motion.h1>
          </div>
          <div className="relative">
            <div className="overflow-hidden mb-4 md:mb-6">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(2.5rem,10vw,12rem)] font-display leading-[0.9] tracking-wider uppercase"
              >
                <span className="text-brand-accent font-bold">& </span> execution
              </motion.h1>
            </div>
          </div>
 
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.4, duration: 1.5 }}
            className="flex flex-wrap gap-8 mb-16 mt-16 md:mt-24"
          >
            {[
              { icon: <Zap size={18} />, title: "Creative Direction" },
              { icon: <Target size={18} />, title: "Brand Strategy" },
              { icon: <Users size={18} />, title: "Team Leadership" }
            ].map((skill, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="text-brand-accent">{skill.icon}</div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 whitespace-nowrap">{skill.title}</span>
              </div>
            ))}
          </motion.div>
 
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 1.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end"
          >
            <p className="text-xl md:text-2xl text-zinc-600 leading-relaxed max-w-xl">
              15+ years of creating experiences while directing creative teams. Bringing interactive and engaging executions to life while delivering impactful brand activations and end-to-end marketing campaigns.
            </p>
          </motion.div>
        </div>
      </section>
 
      {/* About Section */}
      <section id="about" className="min-h-screen py-32 px-6 md:px-12 lg:px-24 bg-zinc-950 text-white relative flex items-center justify-center">
        <div className="max-w-4xl mx-auto w-full">
          <div className="space-y-12">
            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-row items-center gap-6 md:gap-12"
            >
              <div className="w-24 h-24 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-brand-accent shrink-0">
                <img 
                  src="https://media.licdn.com/dms/image/v2/C5603AQFc3qOsauE_4A/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1530834090805?e=2147483647&v=beta&t=DliVNTbaoaLvCZ97QUHXkC34Y113mYergRT182lQp88" 
                  alt="Michael Refalo" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-5xl md:text-9xl font-display tracking-wider uppercase leading-[0.8]">Meet <br /> Michael <br /> Refalo.</h2>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="space-y-8 text-zinc-400 text-lg md:text-xl leading-relaxed"
            >
              <p>
                With over 15 years of experience in brand strategy and creative design, Michael Refalo specialises in turning complex concepts into engaging visuals that are not only effective but also fun! He has had the opportunity to lead creative projects and teams across various industries, including work with notable brands like The Wiggles, TPG Telecom and Toys'R'Us.
              </p>
              <p>
                Michael takes a balanced approach in day-to-day creation. Ensuring that with every creative execution, he delivers effective solutions that impress the client and resonate with audiences.
              </p>
              <p>
                Beyond his creative work, he is a dedicated mentor and collaborative problem-solver who values guiding teams, pushing their creative boundaries and exploring thoughtful, innovative approaches for every presented challenge.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="pt-8 flex justify-center md:justify-start"
            >
              <a 
                href="https://drive.google.com/file/d/1YY-ghTTgm-82TgV88nycvhP6t-6IzyV1/view?usp=sharing" 
                target="_blank"
                className="group flex items-center gap-4 px-8 py-4 border-2 border-brand-accent rounded-full text-white font-bold uppercase tracking-[0.2em] text-xs hover:bg-brand-accent transition-all duration-300"
              >
                View Full CV <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>
 
      {/* Work Section - Tiled Gallery Style */}
      <section id="work" className="py-32 px-6 md:px-12 lg:px-24 relative min-h-screen">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="text-5xl md:text-7xl font-display uppercase tracking-widest leading-none">
            Selected <span className="text-brand-accent">Work</span>
          </h2>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs max-w-xs md:text-right">
            A selection of Michael's favourite works:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden bg-zinc-100 aspect-square cursor-pointer"
              onClick={() => openProject(project)}
            >
              <div className="block w-full h-full">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Static Overlay */}
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 md:p-10">
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-accent">
                      {project.category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-display text-white uppercase tracking-wider leading-none">
                      {project.title}
                    </h3>
                    <p className="text-white/80 text-xs font-medium max-w-md line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-2 text-white text-[10px] font-bold uppercase tracking-widest pt-2">
                      View Project <ArrowUpRight size={12} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Portfolio Buttons */}
        <div className="flex flex-row items-center justify-center gap-4 mt-20 px-6">
          {/* Behance Button */}
          <a 
            href="https://www.behance.net/michaelrefalo1" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 px-4 md:px-8 py-4 bg-[#00B137] outline outline-2 outline-[#00B137] -outline-offset-2 rounded-lg transition-all duration-400 hover:bg-white"
          >
            <svg 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-5 h-5 text-white group-hover:text-[#00B137] transition-colors duration-400"
            >
              <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
            </svg>
            <span className="text-white font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] group-hover:text-[#00B137] transition-colors duration-400 whitespace-nowrap">
              View Behance
            </span>
          </a>
        </div>
      </section>

      {/* Help & Contact Section */}
      <section id="contact" className="py-32 px-6 md:px-12 lg:px-24 bg-white border-y border-zinc-100 relative min-h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center space-y-16">
          <div className="space-y-8">
            <TypewriterHeading />
            <DynamicHelpText />
          </div>
          
          <div className="flex flex-row flex-wrap justify-center items-center gap-8 md:gap-24">
            <a href="mailto:m2.refalo.mr@gmail.com" className="group flex flex-col items-center gap-4 transition-transform hover:scale-105">
              <div className="text-brand-accent">
                <Mail size={48} className="md:w-16 md:h-16" />
              </div>
              <p className="font-bold uppercase tracking-widest text-base md:text-xl">Email</p>
            </a>
            <a href="tel:+61409230959" className="group flex flex-col items-center gap-4 transition-transform hover:scale-105">
              <div className="text-brand-accent">
                <Phone size={48} className="md:w-16 md:h-16" />
              </div>
              <p className="font-bold uppercase tracking-widest text-base md:text-xl">Phone</p>
            </a>
            <a href="https://www.linkedin.com/in/michael-refalo" target="_blank" className="group flex flex-col items-center gap-4 transition-transform hover:scale-105">
              <div className="text-brand-accent">
                <Linkedin size={48} className="md:w-16 md:h-16" />
              </div>
              <p className="font-bold uppercase tracking-widest text-base md:text-xl">LinkedIn</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 border-t border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-8 text-zinc-400 text-xs font-bold uppercase tracking-[0.2em]">
        <p>© 2026 <span className="text-brand-accent">Michael Refalo</span></p>
        <div className="flex items-center gap-8">
          <a href="https://www.behance.net/michaelrefalo1" target="_blank" className="hover:text-brand-accent transition-colors">Behance</a>
          <a href="https://www.linkedin.com/in/michael-refalo" target="_blank" className="hover:text-brand-accent transition-colors">LinkedIn</a>
        </div>
        <p>Sydney, Australia</p>
      </footer>

      {/* Rates Lightbox */}
      <AnimatePresence>
        {isRatesOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-12 bg-black/80 backdrop-blur-xl"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsRatesOpen(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl max-h-[85vh] bg-white rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-zinc-100 my-8 md:my-16"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 md:px-8 md:py-6 border-b border-zinc-100 bg-white sticky top-0 z-10">
                <h2 className="text-xl md:text-4xl font-display uppercase tracking-widest text-zinc-900">Rate Card</h2>
                <button 
                  onClick={() => setIsRatesOpen(false)}
                  className="p-1.5 md:p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-400 hover:text-zinc-900"
                >
                  <X size={20} className="md:w-6 md:h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-12 space-y-6 md:space-y-10">
                <div className="space-y-2 md:space-y-4">
                  <p className="text-zinc-600 leading-relaxed text-sm md:text-lg">
                    Michael is available for freelance and contract services. If you have a project in mind that's out of the below scope, feel free to email him here.{" "}
                    <a href="mailto:m2.refalo.mr@gmail.com" className="text-brand-accent font-bold hover:underline">
                      Email Michael.
                    </a>
                  </p>
                </div>

                <div className="space-y-3 md:space-y-4">
                  <div className="grid grid-cols-1 gap-2 md:gap-4">
                    {[
                      { label: "Ad hoc Design Services", price: "$120AUD* /hour" },
                      { label: "Logo Development", price: "$550*", note: "(with 2 revisions)" },
                      { label: "Branding and Strategy Pack", price: "$1,200*", note: "(with consult and 2 revisions)" },
                      { label: "Branding Pack add-on", price: "$500*", note: "(Animated Logo, Templates, Social Support)" }
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col md:flex-row items-center justify-between p-3 md:p-6 bg-zinc-50 rounded-xl gap-1 md:gap-2 text-center md:text-left">
                        <div>
                          <p className="font-bold uppercase tracking-widest text-zinc-900 text-[10px] md:text-sm">{item.label}</p>
                          {item.note && <p className="text-[8px] md:text-[10px] uppercase tracking-widest text-zinc-500 mt-0.5 md:mt-1">{item.note}</p>}
                        </div>
                        <p className="text-brand-accent font-display text-base md:text-xl">{item.price}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-[9px] md:text-[10px] text-zinc-400 uppercase tracking-widest text-right pr-2">
                    * EX GST
                  </p>
                </div>

                <div className="space-y-4 md:space-y-8">
                  <p className="text-zinc-500 font-medium leading-tight md:leading-relaxed italic text-center px-4 text-[10px] md:text-base">
                    Ongoing Creative Services are available, please contact Michael to discuss your needs and negotiate customised plan.
                  </p>

                  <div className="pt-2 md:pt-4 flex justify-center">
                    <a 
                      href="#contact" 
                      onClick={() => setIsRatesOpen(false)}
                      className="group flex items-center gap-2 md:gap-3 px-6 py-3 md:px-10 md:py-4 bg-zinc-900 text-white rounded-full font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs hover:bg-brand-accent transition-all duration-300"
                    >
                      Contact Michael <ArrowRight size={14} className="md:w-4 md:h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Lightbox */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/90 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-6xl max-h-full bg-zinc-950 rounded-2xl overflow-hidden flex flex-col border border-zinc-800"
            >
              {/* Lightbox Header */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-zinc-800 bg-zinc-950 sticky top-0 z-10">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-accent">{activeProject.category}</span>
                  <h2 className="text-2xl md:text-4xl font-display uppercase tracking-wider text-white">{activeProject.title}</h2>
                </div>
                <button 
                  onClick={closeProject}
                  className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-500 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Lightbox Content */}
              <div 
                ref={contentRef}
                className="flex-1 overflow-y-auto p-8 md:p-12 bg-black relative min-h-[400px]"
              >
                <AnimatePresence mode="wait">
                  {isLoadingContent ? (
                    <motion.div 
                      key="loader"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm gap-6"
                    >
                      <div className="relative">
                        <Loader2 className="animate-spin text-brand-accent" size={64} />
                        <motion.div 
                          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 bg-brand-accent/20 blur-xl rounded-full"
                        />
                      </div>
                      <div className="text-center space-y-2">
                        <p className="text-white font-display text-2xl uppercase tracking-[0.2em]">Loading Project</p>
                        <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Curating creative assets...</p>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                <div className="max-w-4xl mx-auto">
                  {projectContent ? (
                    <div 
                      className="project-content-render space-y-8"
                      dangerouslySetInnerHTML={{ __html: projectContent }} 
                    />
                  ) : isActuallyFetching ? (
                    <div className="flex flex-col items-center justify-center py-32 gap-4">
                      <Loader2 className="animate-spin text-brand-accent/50" size={32} />
                      <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Still fetching assets...</p>
                    </div>
                  ) : !isLoadingContent && (
                    <div className="text-center py-20 space-y-6">
                      <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs">No creative content could be extracted.</p>
                      <div className="flex flex-col items-center gap-4">
                        <button 
                          onClick={() => activeProject && openProject(activeProject)}
                          className="px-6 py-2 border border-zinc-800 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-900 transition-colors rounded-full"
                        >
                          Retry Loading
                        </button>
                        <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
                          Or <a href={activeProject?.link} target="_blank" className="text-brand-accent hover:underline">view directly on Behance</a>
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-12 pt-12 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Tools Used</h3>
                      <div className="flex flex-wrap gap-2">
                        {activeProject.tools.map((tool: string, index: number) => (
                          <span key={index} className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-[10px] font-bold uppercase tracking-widest text-zinc-200 rounded-full">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-center md:items-end gap-4">
                      <a 
                        href={activeProject.link} 
                        target="_blank" 
                        className="flex items-center gap-3 px-6 py-3 bg-brand-accent text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-brand-accent/90 transition-colors"
                      >
                        View on Behance <ExternalLink size={14} />
                      </a>
                      <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest text-center md:text-right">
                        If you are having trouble loading this project, please <a href={activeProject.link} target="_blank" className="text-brand-accent hover:underline">click here</a> to view it on Behance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
