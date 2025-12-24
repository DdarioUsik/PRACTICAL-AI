import { useState, useEffect } from "react";
import { ChevronDown, Bot, Target, Calendar, Laptop, Rocket, ServerCog, Database, FileText, Shield, TrendingUp, Video, MessageCircle, File, Bus, Zap, Lightbulb, Trophy, Mail, Menu, X, Globe, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

interface WeekData {
  number: number;
  title: string;
  subtitle: string;
  color: string;
  goals: string[];
  tools: string[];
  content?: string[];
  assignment: string;
}

const weekData: WeekData[] = [
  {
    number: 1,
    title: "Tools Overview and Meta-prompting",
    subtitle: "Mastering basic and advanced AI interaction techniques",
    color: "bg-primary",
    goals: [
      "Get an overview of key course tools and learn to combine them quickly",
      "Master basic and advanced meta-prompting techniques",
      "Create a personal Prompt-Port for storing and versioning templates"
    ],
    tools: ["ChatGPT", "Gemini", "Claude 3", "Perplexity.ai", "NotebookLM"],
    content: [
      "AI Tools Demonstration Show",
      "ChatGPT, Gemini, Claude 3, Perplexity.ai, NotebookLM — comparison of capabilities and costs",
      "How Large Language Models 'Think'",
      "Neural networks and probabilistic text generation",
      "Meta-prompting: system instructions, roles, T-templates, clarification cycles",
      "Prompt-Port: where to store, how to version and share",
      "Prompt engineering techniques: Few-Shot, Reverse Prompting, Chain-of-Thought, ReAct, Self-Critique",
      "Ethics, fact-checking and BIAS mitigation"
    ],
    assignment: "Build your Prompt-Port and populate it with at least five meta-prompts for your daily tasks."
  },
  {
    number: 2,
    title: "Custom GPTs for Recurring Tasks",
    subtitle: "Creating personalized AI assistants",
    color: "bg-secondary",
    goals: [
      "Learn to create custom GPTs tailored for specific recurring tasks of participants"
    ],
    tools: ["ChatGPT (GPT Builder + Knowledge)", "TabTabTab", "Perplexity.ai", "WhisprAI"],
    content: [
      "GPT Builder in ChatGPT",
      "Persona, Tone, Response Style, Knowledge upload",
      "Fine-tuning the knowledge base",
      "Working with PDFs, links, internal documents",
      "TabTabTab for visual specifications and creating flowcharts",
      "WhisprAI for working with voice notes and transcription",
      "Test cycle: task → response → instruction correction",
      "Assistant chaining and no-code integrations",
      "Docs/Sheets, voice notes, email",
      "Prioritizing GenAI use cases (expertise × impact)"
    ],
    assignment: "Create your own GPT assistant that solves your routine task and demonstrate it to colleagues."
  },
  {
    number: 3,
    title: "Automated Data Collection from the Internet",
    subtitle: "Web-scraping and AI-powered data analysis",
    color: "bg-accent",
    goals: [
      "Learn to automatically collect fresh data (articles, competitor sites, RSS/news feeds)",
      "Prepare collected data for AI assistant analysis"
    ],
    tools: ["Octoparse", "Perplexity.ai", "NotebookLM", "Exa AI"],
    content: [
      "Web-scraping 101: legal aspects, HTML structure, common patterns",
      "Octoparse in practice: spider setup, scheduling collection, data export",
      "Exa AI for smart web content search and creating web-sets",
      "Perplexity.ai for researchers: combining fresh search with evidence links",
      "NotebookLM as knowledge-hub: import, citation, quick queries to database",
      "Data → LLM-analysis pipeline: automatic summarization, insight clustering"
    ],
    assignment: "Build an end-to-end pipeline: collect competitor site data → upload to NotebookLM → get report with key insights using LLM."
  },
  {
    number: 4,
    title: "Rapid Product Development",
    subtitle: "From data to presentations, knowledge bases and websites",
    color: "bg-purple-600",
    goals: [
      "Learn to instantly transform data, insights and ideas into finished products",
      "Create presentations, knowledge bases, single-page websites"
    ],
    tools: ["Claude 3", "Gamma.app", "lovable.dev", "BukvitsaAI"],
    content: [
      "Data-to-Product concept: thinking in 'ready artifacts'",
      "Automatic presentation generation",
      "Claude 3 + prompts for slides",
      "Gamma — design and interaction",
      "Structured knowledge bases: export from NotebookLM/Perplexity to Notion/GDrive",
      "Creating a website in 15 minutes: lovable.dev and AI-landing best practices",
      "BukvitsaAI for rapid text content creation and copywriting",
      "CI/CD for content: updating presentations and sites when new data appears"
    ],
    assignment: "Use insights from Week 3, automatically convert them into a Claude/Gamma presentation and publish a single-page landing with lovable.dev."
  }
];

const results = [
  {
    icon: <Rocket className="w-6 h-6 text-white" />,
    title: "Productivity Enhancement",
    description: "Effectively use AI assistants to boost productivity",
    color: "bg-primary"
  },
  {
    icon: <ServerCog className="w-6 h-6 text-white" />,
    title: "Custom GPT Assistants",
    description: "Design your own GPT assistants and integrate them into processes",
    color: "bg-secondary"
  },
  {
    icon: <Database className="w-6 h-6 text-white" />,
    title: "Automated Data Collection",
    description: "Automatically collect and analyze external data",
    color: "bg-accent"
  },
  {
    icon: <FileText className="w-6 h-6 text-white" />,
    title: "Content Generation",
    description: "Generate presentations, knowledge bases and sites using AI",
    color: "bg-purple-600"
  },
  {
    icon: <Shield className="w-6 h-6 text-white" />,
    title: "Ethics and Security",
    description: "Maintain ethics and security when working with GenAI",
    color: "bg-green-600"
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-white" />,
    title: "Development Planning",
    description: "Plan further development of AI competencies in the company",
    color: "bg-indigo-600"
  }
];

const tools = [
  { name: "ChatGPT", icon: <MessageCircle className="text-primary text-2xl" /> },
  { name: "Claude 3", icon: <Bot className="text-secondary text-2xl" /> },
  { name: "Perplexity.ai", icon: <Target className="text-accent text-2xl" /> },
  { name: "NotebookLM", icon: <File className="text-purple-600 text-2xl" /> },
  { name: "Octoparse", icon: <Database className="text-green-600 text-2xl" /> },
  { name: "Gamma", icon: <FileText className="text-indigo-600 text-2xl" /> },
  { name: "TabTabTab", icon: <Zap className="text-blue-600 text-2xl" /> },
  { name: "WhisprAI", icon: <MessageCircle className="text-orange-600 text-2xl" /> },
  { name: "Exa AI", icon: <Target className="text-teal-600 text-2xl" /> },
  { name: "BukvitsaAI", icon: <FileText className="text-red-600 text-2xl" /> }
];

export default function HomeEN() {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (elementId: string) => {
    document.getElementById(elementId)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
    setIsMenuOpen(false);
  };

  const toggleWeek = (weekNumber: number) => {
    setExpandedWeek(expandedWeek === weekNumber ? null : weekNumber);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your interest! We will contact you shortly.');
  };

  return (
    <div className="font-sans bg-light text-neutral leading-relaxed">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black border-b border-gray-800 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="font-heading font-bold text-xl text-white">PRACTICAL AI</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollTo('overview')} className="text-white hover:text-accent transition-colors">About</button>
              <button onClick={() => scrollTo('program')} className="text-white hover:text-accent transition-colors">Program</button>
              <button onClick={() => scrollTo('results')} className="text-white hover:text-accent transition-colors">Results</button>
              <button onClick={() => scrollTo('pricing')} className="text-white hover:text-accent transition-colors">Pricing</button>
              <button onClick={() => scrollTo('contact')} className="text-white hover:text-accent transition-colors">Contact</button>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-white" />
                <a href="/" className="text-white hover:text-accent transition-colors text-sm">RU</a>
                <span className="text-gray-400">|</span>
                <span className="text-accent font-medium text-sm">EN</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-white hover:text-accent"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button onClick={() => scrollTo('overview')} className="block w-full text-left px-3 py-2 text-white hover:text-accent hover:bg-gray-800 rounded-md">About</button>
              <button onClick={() => scrollTo('program')} className="block w-full text-left px-3 py-2 text-white hover:text-accent hover:bg-gray-800 rounded-md">Program</button>
              <button onClick={() => scrollTo('results')} className="block w-full text-left px-3 py-2 text-white hover:text-accent hover:bg-gray-800 rounded-md">Results</button>
              <button onClick={() => scrollTo('pricing')} className="block w-full text-left px-3 py-2 text-white hover:text-accent hover:bg-gray-800 rounded-md">Pricing</button>
              <button onClick={() => scrollTo('contact')} className="block w-full text-left px-3 py-2 text-white hover:text-accent hover:bg-gray-800 rounded-md">Contact</button>
              <div className="flex items-center space-x-2 px-3 py-2">
                <Globe className="w-4 h-4 text-white" />
                <a href="/" className="text-white hover:text-accent transition-colors text-sm">RU</a>
                <span className="text-gray-400">|</span>
                <span className="text-accent font-medium text-sm">EN</span>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-20 pb-16 bg-gradient-to-br from-primary to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-cover bg-center opacity-10" 
             style={{backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')"}}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-heading font-bold text-4xl lg:text-6xl mb-6 leading-tight">
                Practical AI Skills<br />
                <span className="text-orange-300">for Your Team</span>
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed">
                In 4 weeks, we create effective AI assistants with your team for your real business tasks.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center text-lg">
                  <Calendar className="text-orange-300 mr-3" />
                  <span>4 weeks of training</span>
                </div>
                <div className="flex items-center text-lg">
                  <Video className="text-orange-300 mr-3" />
                  <span>Online sessions + practice</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => scrollTo('program')}
                  className="bg-accent hover:bg-orange-600 text-white px-8 py-4 text-lg font-medium transition-all duration-300 transform hover:scale-105"
                >
                  Explore Program
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open('https://forms.gle/rUAzkmZA1YiZhBeB6', '_blank')}
                  className="border-2 border-white hover:bg-white hover:text-primary text-white px-8 py-4 text-lg font-medium transition-all duration-300"
                >
                  Register
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="AI tools interface" 
                className="rounded-2xl shadow-2xl w-full h-auto" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-neutral mb-6">
              Main Course Goal
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              For each participant to leave with a ready-made tool for solving their practical task and understanding how to further implement artificial intelligence in their other processes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center p-8 bg-light hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="text-white text-2xl" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-4">Target Audience</h3>
                <p className="text-gray-600">Company employees of various levels</p>
              </CardContent>
            </Card>
            <Card className="text-center p-8 bg-light hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="text-white text-2xl" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-4">Duration</h3>
                <p className="text-gray-600">4 weeks of intensive training</p>
              </CardContent>
            </Card>
            <Card className="text-center p-8 bg-light hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <Laptop className="text-white text-2xl" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-4">Format</h3>
                <p className="text-gray-600">Weekly online sessions + practical assignments</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Program Section */}
      <section id="program" className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-neutral mb-6">
              Course Program
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              4 weeks of structured learning with practical assignments
            </p>
          </div>

          <div className="space-y-6">
            {weekData.map((week) => (
              <Card key={week.number} className="bg-white shadow-md hover:shadow-lg transition-all duration-300">
                <div 
                  className="p-6 cursor-pointer"
                  onClick={() => toggleWeek(week.number)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className={`w-16 h-16 ${week.color} rounded-full flex items-center justify-center text-white font-bold text-xl`}>
                        {week.number}
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-xl text-neutral mb-2">
                          Week {week.number}: {week.title}
                        </h3>
                        <p className="text-gray-600">{week.subtitle}</p>
                      </div>
                    </div>
                    <ChevronDown 
                      className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${
                        expandedWeek === week.number ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>

                {expandedWeek === week.number && (
                  <CardContent className="pt-0 pb-6">
                    <div className="ml-22 space-y-6">
                      <div>
                        <h4 className="font-semibold text-lg mb-3 text-primary">Goals:</h4>
                        <ul className="space-y-2">
                          {week.goals.map((goal, index) => (
                            <li key={index} className="flex items-start">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-gray-700">{goal}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-lg mb-3 text-secondary">Tools:</h4>
                        <div className="flex flex-wrap gap-2">
                          {week.tools.map((tool, index) => (
                            <span key={index} className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-medium">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>

                      {week.content && (
                        <div>
                          <h4 className="font-semibold text-lg mb-3 text-accent">Content:</h4>
                          <ul className="space-y-2">
                            {week.content.map((item, index) => (
                              <li key={index} className="flex items-start">
                                <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span className="text-gray-700">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div>
                        <h4 className="font-semibold text-lg mb-3 text-purple-600">Assignment:</h4>
                        <p className="text-gray-700 bg-purple-50 p-4 rounded-lg">
                          {week.assignment}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-neutral mb-6">
              Learning Outcomes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              At the end of the course, participants will be able to:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((result, index) => (
              <Card key={index} className="bg-white p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className={`w-16 h-16 ${result.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    {result.icon}
                  </div>
                  <h3 className="font-heading font-semibold text-xl mb-4 text-center">{result.title}</h3>
                  <p className="text-gray-600 text-center">{result.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h3 className="font-heading font-bold text-2xl text-neutral mb-6">
              Final Assignment
            </h3>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Develop a corporate plan for continuous AI tool implementation, including data scraping, analysis, and publishing results in convenient formats (presentations/internal websites).
            </p>
          </div>
        </div>
      </section>

      {/* Technical Support Section */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-neutral mb-6">
              Technical Support
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              All necessary tools and support for effective learning
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-heading font-semibold text-2xl mb-6">Platforms and tools:</h3>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {tools.map((tool, index) => (
                  <Card key={index} className="bg-white p-4 text-center">
                    <CardContent className="pt-4">
                      <div className="mb-2">{tool.icon}</div>
                      <p className="font-medium">{tool.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <h3 className="font-heading font-semibold text-2xl mb-6">Learning format:</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <Video className="text-primary mr-4" />
                  <span>Weekly online sessions via Zoom/Teams</span>
                </li>
                <li className="flex items-center">
                  <MessageCircle className="text-secondary mr-4" />
                  <span>Corporate chat support</span>
                </li>
                <li className="flex items-center">
                  <File className="text-accent mr-4" />
                  <span>Self-study materials</span>
                </li>
                <li className="flex items-center">
                  <Bus className="text-purple-600 mr-4" />
                  <span>Mentor feedback</span>
                </li>
              </ul>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Team collaboration with technology" 
                className="rounded-2xl shadow-lg w-full h-auto" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-neutral mb-6">
              Course Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced experts in artificial intelligence and corporate training
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center p-8 bg-light hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full">
                  <img 
                    src="/attached_assets/Дизайн без названия_1754590634504.png" 
                    alt="Danil Usyk" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-2">Danil Usik</h3>
                <p className="text-primary font-medium mb-3">CEO of PRACTICAL AI Project</p>
                <p className="text-gray-600 text-sm">Serial entrepreneur specializing in implementing AI solutions in business processes</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 bg-light hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full">
                  <img 
                    src="/attached_assets/photo_2025-08-07_15-47-17_1754592458557.jpg" 
                    alt="Svetlana Galakhova" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-2">Svetlana Galakhova</h3>
                <p className="text-secondary font-medium mb-3">AI Strategist, Founder of AIHUB.WORKS</p>
                <p className="text-gray-600 text-sm">Course expert, specialist in integrating AI tools in corporate environments</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 bg-light hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full">
                  <img 
                    src="/attached_assets/IMG_3660_1754590574048.jpg" 
                    alt="Valeria Poltorak" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-2">Valeria Poltorak</h3>
                <p className="text-accent font-medium mb-3">Course Methodologist</p>
                <p className="text-gray-600 text-sm">Ex-WorldSkills, specialist in educational program development and learning methodology</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Investment Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl lg:text-4xl mb-6">
            Investment in the Future
          </h2>
          <p className="text-xl leading-relaxed max-w-4xl mx-auto mb-12">
            This course helps your team stay at the cutting edge of technology, accelerating research, decision-making, and delivery of impactful materials to both external and internal company circuits.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="text-white text-2xl" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Process Acceleration</h3>
              <p className="text-blue-100">Reducing time spent on routine tasks</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="text-white text-2xl" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Innovation</h3>
              <p className="text-blue-100">Implementing cutting-edge technologies</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="text-white text-2xl" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Competitive Advantage</h3>
              <p className="text-blue-100">Staying ahead in AI adoption</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-neutral mb-6">
              Course Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Course cost is calculated individually for each team
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="bg-white border shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="text-5xl font-bold text-neutral mb-4">from $500</div>
                  <div className="text-xl text-gray-600 mb-2">per participant</div>
                  <p className="text-gray-500">Final cost depends on team size</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <Users className="text-accent mr-4 w-6 h-6" />
                    <span className="text-lg">Flexible pricing based on number of participants</span>
                  </div>
                  <div className="flex items-center">
                    <Target className="text-accent mr-4 w-6 h-6" />
                    <span className="text-lg">Complete 4-week training program</span>
                  </div>
                  <div className="flex items-center">
                    <Zap className="text-accent mr-4 w-6 h-6" />
                    <span className="text-lg">AI assistants created for your specific tasks</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="text-accent mr-4 w-6 h-6" />
                    <span className="text-lg">Individual approach for each team</span>
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <Button 
                    onClick={() => window.open('https://forms.gle/rUAzkmZA1YiZhBeB6', '_blank')}
                    className="w-full bg-accent hover:bg-orange-600 text-white py-4 text-lg font-semibold"
                  >
                    Register for Course
                  </Button>
                  <p className="text-sm text-gray-500">
                    Submit a request and we'll calculate the cost for your team
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-neutral mb-6">
              Start Your Team Training
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Contact us for detailed information and to create a customized program
            </p>
            <Button 
              onClick={() => window.open('https://forms.gle/rUAzkmZA1YiZhBeB6', '_blank')}
              className="bg-accent hover:bg-orange-600 text-white px-12 py-6 text-xl font-semibold transform hover:scale-105 transition-all duration-300"
            >
              Register for Course
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Bot className="text-primary text-3xl mr-4" />
            <span className="font-heading font-bold text-2xl">AI at Work</span>
          </div>
          <p className="text-gray-300 mb-6">
            We empower teams with practical AI skills
          </p>
          <div className="flex justify-center items-center space-x-6">
            <div className="flex items-center">
              <Mail className="text-accent mr-2" />
              <span className="text-gray-300">Contact us for more information</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}