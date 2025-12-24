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
    title: "Обзор инструментов и метапромтинг",
    subtitle: "Освоение базовых и продвинутых техник работы с ИИ",
    color: "bg-primary",
    goals: [
      "Получить обзор ключевых инструментов курса и научиться их быстро комбинировать",
      "Освоить базовые и продвинутые техники метапромтинга",
      "Создать личный Prompt-Port для хранения и версионирования шаблонов"
    ],
    tools: ["ChatGPT", "Gemini", "Claude 3", "Perplexity.ai", "NotebookLM"],
    content: [
      "Демонстрационное шоу инструментов",
      "ChatGPT, Gemini, Claude 3, Perplexity.ai, NotebookLM — сравнение возможностей и стоимости",
      "Как «думают» большие языковые модели",
      "Нейронные сети и вероятностная генерация текста",
      "Метапромтинг: системные инструкции, роли, T-шаблоны, циклы уточнений",
      "Prompt-Port: где хранить, как версионировать и делиться",
      "Техники промт-инжиниринга: Few-Shot, Reverse Prompting, Chain-of-Thought, ReAct, Self-Critique",
      "Этика, фактчекинг и борьба с BIAS"
    ],
    assignment: "Соберите свой Prompt-Port и наполните его минимум пятью метапромтами под ваши ежедневные задачи."
  },
  {
    number: 2,
    title: "Кастомные GPT под повторяющиеся задачи",
    subtitle: "Создание персонализированных ИИ-ассистентов",
    color: "bg-secondary",
    goals: [
      "Научиться создавать кастомные GPT, «заточенные» под конкретные повторяющиеся задачи участников"
    ],
    tools: ["ChatGPT (GPT Builder + Knowledge)", "TabTabTab", "Perplexity.ai", "WhisprAI"],
    content: [
      "Конструктор GPT в ChatGPT",
      "Persona, Tone, Response Style, загрузка Knowledge",
      "Тонкая настройка базы знаний",
      "Работа с PDF, ссылками, внутренними документами",
      "TabTabTab для визуального ТЗ и создания блок-схем",
      "WhisprAI для работы с голосовыми заметками и транскрипцией",
      "Тест-цикл «задача → ответ → коррекция инструкций»",
      "Чейнинг ассистентов и интеграции без кода",
      "Docs/Sheets, голосовые заметки, e-mail",
      "Приоритизация GenAI-кейсов («экспертность × impact»)"
    ],
    assignment: "Создайте собственного GPT-ассистента, решающего вашу рутинную задачу, и продемонстрируйте его коллегам."
  },
  {
    number: 3,
    title: "Автоматический сбор актуальных данных из интернета",
    subtitle: "Web-scraping и анализ данных с помощью ИИ",
    color: "bg-accent",
    goals: [
      "Научиться автоматически собирать свежие данные (статьи, сайты конкурентов, RSS/новостные ленты)",
      "Готовить собранные данные к анализу ИИ-ассистентом"
    ],
    tools: ["Octoparse", "Perplexity.ai", "NotebookLM", "Exa AI"],
    content: [
      "Web-scraping 101: правовые аспекты, структура HTML, типовые паттерны",
      "Octoparse на практике: настройка «паука», планирование расписания сбора, экспорт данных",
      "Exa AI для умного поиска по веб-контенту и создания веб-сетов",
      "Perplexity.ai для исследователя: комбинируем свежий поиск и ссылки-доказательства",
      "NotebookLM как knowledge-hub: импорт, цитирование, быстрые запросы к базе",
      "Pipeline «данные → LLM-анализ»: автоматическое резюмирование, кластеризация инсайтов"
    ],
    assignment: "Постройте сквозной pipeline: соберите данные сайта-конкурента → загрузите в NotebookLM → получите отчёт с ключевыми инсайтами с помощью LLM."
  },
  {
    number: 4,
    title: "Быстрый выпуск продуктов",
    subtitle: "От данных к презентациям, базам знаний и сайтам",
    color: "bg-purple-600",
    goals: [
      "Научиться мгновенно превращать данные, выводы и идеи в завершённые продукты",
      "Создавать презентации, базы знаний, одностраничные сайты"
    ],
    tools: ["Claude 3", "Gamma.app", "lovable.dev", "BukvitsaAI"],
    content: [
      "Концепция Data-to-Product: мышление «готовым артефактом»",
      "Автоматическая генерация презентаций",
      "Claude 3 + prompts для слайдов",
      "Gamma — дизайн и взаимодействие",
      "Структурированные базы знаний: экспорт из NotebookLM/Perplexity в Notion/GDrive",
      "Создание сайта за 15 минут: lovable.dev и best-practices AI-лендингов",
      "BukvitsaAI для быстрого создания текстового контента и копирайтинга",
      "CI/CD для контента: обновление презентаций и сайта при появлении новых данных"
    ],
    assignment: "Используйте выводы из 3-й недели, автоматически превратите их в презентацию Claude/Gamma и опубликуйте одностраничный лендинг с lovable.dev."
  }
];

const results = [
  {
    icon: <Rocket className="w-6 h-6 text-white" />,
    title: "Повышение продуктивности",
    description: "Эффективно пользоваться ИИ-ассистентами для повышения продуктивности",
    color: "bg-primary"
  },
  {
    icon: <ServerCog className="w-6 h-6 text-white" />,
    title: "Кастомные GPT-помощники",
    description: "Проектировать собственных GPT-помощников и интегрировать их в процессы",
    color: "bg-secondary"
  },
  {
    icon: <Database className="w-6 h-6 text-white" />,
    title: "Автоматический сбор данных",
    description: "Автоматически собирать и анализировать внешние данные",
    color: "bg-accent"
  },
  {
    icon: <FileText className="w-6 h-6 text-white" />,
    title: "Генерация контента",
    description: "Генерировать презентации, базы знаний и сайты на основе ИИ",
    color: "bg-purple-600"
  },
  {
    icon: <Shield className="w-6 h-6 text-white" />,
    title: "Этика и безопасность",
    description: "Соблюдать этику и безопасность при работе с GenAI",
    color: "bg-green-600"
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-white" />,
    title: "Планирование развития",
    description: "Планировать дальнейшее развитие ИИ-компетенций в компании",
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

export default function Home() {
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
    alert('Спасибо за ваш интерес! Мы свяжемся с вами в ближайшее время.');
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
              <button onClick={() => scrollTo('overview')} className="text-white hover:text-accent transition-colors">О курсе</button>
              <button onClick={() => scrollTo('program')} className="text-white hover:text-accent transition-colors">Программа</button>
              <button onClick={() => scrollTo('results')} className="text-white hover:text-accent transition-colors">Результаты</button>
              <button onClick={() => scrollTo('pricing')} className="text-white hover:text-accent transition-colors">Цены</button>
              <button onClick={() => scrollTo('contact')} className="text-white hover:text-accent transition-colors">Контакты</button>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-white" />
                <span className="text-accent font-medium text-sm">RU</span>
                <span className="text-gray-400">|</span>
                <a href="/en" className="text-white hover:text-accent transition-colors text-sm">EN</a>
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
              <button onClick={() => scrollTo('overview')} className="block w-full text-left px-3 py-2 text-white hover:text-accent hover:bg-gray-800 rounded-md">О курсе</button>
              <button onClick={() => scrollTo('program')} className="block w-full text-left px-3 py-2 text-white hover:text-accent hover:bg-gray-800 rounded-md">Программа</button>
              <button onClick={() => scrollTo('results')} className="block w-full text-left px-3 py-2 text-white hover:text-accent hover:bg-gray-800 rounded-md">Результаты</button>
              <button onClick={() => scrollTo('pricing')} className="block w-full text-left px-3 py-2 text-white hover:text-accent hover:bg-gray-800 rounded-md">Цены</button>
              <button onClick={() => scrollTo('contact')} className="block w-full text-left px-3 py-2 text-white hover:text-accent hover:bg-gray-800 rounded-md">Контакты</button>
              <div className="flex items-center space-x-2 px-3 py-2">
                <Globe className="w-4 h-4 text-white" />
                <span className="text-accent font-medium text-sm">RU</span>
                <span className="text-gray-400">|</span>
                <a href="/en" className="text-white hover:text-accent transition-colors text-sm">EN</a>
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
                Практические навыки работы с AI<br />
                <span className="text-orange-300">для вашей команды</span>
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed">
                За 4 недели мы с вашей командой создаем эффективных AI-ассистентов под ваши реальные бизнес-задачи.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center text-lg">
                  <Calendar className="text-orange-300 mr-3" />
                  <span>4 недели обучения</span>
                </div>
                <div className="flex items-center text-lg">
                  <Video className="text-orange-300 mr-3" />
                  <span>Онлайн-сессии + практика</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => scrollTo('program')}
                  className="bg-accent hover:bg-orange-600 text-white px-8 py-4 text-lg font-medium transition-all duration-300 transform hover:scale-105"
                >
                  Изучить программу
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open('https://forms.gle/rUAzkmZA1YiZhBeB6', '_blank')}
                  className="border-2 border-white hover:bg-white hover:text-primary text-white px-8 py-4 text-lg font-medium transition-all duration-300"
                >
                  Записаться
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
              Главная цель курса
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Чтобы каждый участник ушел с готовым инструментом для решения своей практической задачи и пониманием, как дальше внедрять искусственный интеллект в остальные свои процессы
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center p-8 bg-light hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="text-white text-2xl" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-4">Целевая аудитория</h3>
                <p className="text-gray-600">Сотрудники компаний различного уровня</p>
              </CardContent>
            </Card>
            <Card className="text-center p-8 bg-light hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="text-white text-2xl" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-4">Продолжительность</h3>
                <p className="text-gray-600">4 недели интенсивного обучения</p>
              </CardContent>
            </Card>
            <Card className="text-center p-8 bg-light hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <Laptop className="text-white text-2xl" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-4">Формат</h3>
                <p className="text-gray-600">Еженедельные онлайн-сессии + практические задания</p>
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
              Программа курса
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              4 недели структурированного обучения с практическими заданиями
            </p>
          </div>

          <div className="space-y-6">
            {weekData.map((week) => (
              <Card key={week.number} className="bg-white shadow-sm border border-gray-100 overflow-hidden">
                <div 
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleWeek(week.number)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 ${week.color} rounded-full flex items-center justify-center mr-4`}>
                        <span className="text-white font-bold text-lg">{week.number}</span>
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-xl text-neutral">{week.title}</h3>
                        <p className="text-gray-600">{week.subtitle}</p>
                      </div>
                    </div>
                    <ChevronDown 
                      className={`text-gray-400 transform transition-transform ${
                        expandedWeek === week.number ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>
                
                {expandedWeek === week.number && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-100 pt-6">
                      <h4 className="font-semibold text-lg mb-4 text-neutral">Цели недели:</h4>
                      <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                        {week.goals.map((goal, index) => (
                          <li key={index}>{goal}</li>
                        ))}
                      </ul>
                      
                      <h4 className="font-semibold text-lg mb-4 text-neutral">Инструменты:</h4>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {week.tools.map((tool, index) => (
                          <span key={index} className={`${week.color}/10 text-${week.color.replace('bg-', '')} px-3 py-1 rounded-full text-sm`}>
                            {tool}
                          </span>
                        ))}
                      </div>

                      {week.content && (
                        <>
                          <h4 className="font-semibold text-lg mb-4 text-neutral">Программа занятий:</h4>
                          <ul className="list-disc list-inside space-y-1 text-gray-600 mb-6 text-sm">
                            {week.content.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </>
                      )}

                      <h4 className="font-semibold text-lg mb-4 text-neutral">Практическое задание:</h4>
                      <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                        {week.assignment}
                      </p>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Final Assignment */}
          <div className="mt-12 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-8">
            <h3 className="font-heading font-bold text-2xl mb-4">Итоговое задание курса</h3>
            <p className="text-lg leading-relaxed">
              Разработать корпоративный план постоянного внедрения ИИ-инструментов, включающий скрапинг данных, анализ и публикацию результатов в удобном формате (презентации / внутренний сайт).
            </p>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-neutral mb-6">
              Результаты обучения
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              В конце курса участники получат практические навыки работы с ИИ-инструментами
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((result, index) => (
              <Card key={index} className="p-6 bg-light hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className={`w-12 h-12 ${result.color} rounded-xl flex items-center justify-center mb-6`}>
                    {result.icon}
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-3">{result.title}</h3>
                  <p className="text-gray-600">{result.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Section */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-neutral mb-6">
              Техническое обеспечение
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Все необходимые инструменты и поддержка для эффективного обучения
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-heading font-semibold text-2xl mb-6">Платформы и инструменты:</h3>
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

              <h3 className="font-heading font-semibold text-2xl mb-6">Формат обучения:</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <Video className="text-primary mr-4" />
                  <span>Еженедельные онлайн-сессии Zoom/Teams</span>
                </li>
                <li className="flex items-center">
                  <MessageCircle className="text-secondary mr-4" />
                  <span>Корпоративный чат-поддержка</span>
                </li>
                <li className="flex items-center">
                  <File className="text-accent mr-4" />
                  <span>Материалы для самостоятельной работы</span>
                </li>
                <li className="flex items-center">
                  <Bus className="text-purple-600 mr-4" />
                  <span>Обратная связь наставников</span>
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
              Команда курса
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Опытные эксперты в области искусственного интеллекта и корпоративного обучения
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center p-8 bg-light hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full">
                  <img 
                    src="/attached_assets/Дизайн без названия_1754590634504.png" 
                    alt="Данил Усик" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-2">Данил Усик</h3>
                <p className="text-primary font-medium mb-3">CEO Проекта PRACTICAL AI</p>
                <p className="text-gray-600 text-sm">Серийный предприниматель, специализирующийся на внедрении ИИ-решений в бизнес-процессы</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 bg-light hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full">
                  <img 
                    src="/attached_assets/photo_2025-08-07_15-47-17_1754592458557.jpg" 
                    alt="Светлана Галахова" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-2">Светлана Галахова</h3>
                <p className="text-secondary font-medium mb-3">AI-стратег, основатель AIHUB.WORKS</p>
                <p className="text-gray-600 text-sm">Эксперт курса, специалист по интеграции ИИ-инструментов в корпоративную среду</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 bg-light hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full">
                  <img 
                    src="/attached_assets/IMG_3660_1754590574048.jpg" 
                    alt="Валерия Полторак" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-2">Валерия Полторак</h3>
                <p className="text-accent font-medium mb-3">Методист курса</p>
                <p className="text-gray-600 text-sm">Ex-WorldSkills, специалист по разработке образовательных программ и методологии обучения</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Investment Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl lg:text-4xl mb-6">
            Инвестиции в будущее
          </h2>
          <p className="text-xl leading-relaxed max-w-4xl mx-auto mb-12">
            Этот курс помогает вашей команде оставаться на острие технологий, ускоряя исследования, 
            принятие решений и вывод результативных материалов во внешний и внутренний контур компании.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="text-white text-2xl" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Ускорение процессов</h3>
              <p className="text-blue-100">Сокращение времени на рутинные задачи</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="text-white text-2xl" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Инновации</h3>
              <p className="text-blue-100">Внедрение передовых технологий</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="text-white text-2xl" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Конкурентное преимущество</h3>
              <p className="text-blue-100">Опережение рынка в использовании ИИ</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-neutral mb-6">
              Стоимость обучения
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Стоимость курса рассчитывается индивидуально для каждой команды
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="bg-white border shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="text-5xl font-bold text-neutral mb-4">от $500</div>
                  <div className="text-xl text-gray-600 mb-2">за участника</div>
                  <p className="text-gray-500">Конечная стоимость зависит от размера команды</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <Users className="text-accent mr-4 w-6 h-6" />
                    <span className="text-lg">Гибкая цена в зависимости от количества участников</span>
                  </div>
                  <div className="flex items-center">
                    <Target className="text-accent mr-4 w-6 h-6" />
                    <span className="text-lg">Полная 4-недельная программа обучения</span>
                  </div>
                  <div className="flex items-center">
                    <Zap className="text-accent mr-4 w-6 h-6" />
                    <span className="text-lg">Создание AI-ассистентов под ваши задачи</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="text-accent mr-4 w-6 h-6" />
                    <span className="text-lg">Индивидуальный подход к каждой команде</span>
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <Button 
                    onClick={() => window.open('https://forms.gle/rUAzkmZA1YiZhBeB6', '_blank')}
                    className="w-full bg-accent hover:bg-orange-600 text-white py-4 text-lg font-semibold"
                  >
                    Записаться на курс
                  </Button>
                  <p className="text-sm text-gray-500">
                    Оставьте заявку, и мы рассчитаем стоимость для вашей команды
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
              Начните обучение команды
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Свяжитесь с нами для получения подробной информации и составления индивидуальной программы
            </p>
            <Button 
              onClick={() => window.open('https://forms.gle/rUAzkmZA1YiZhBeB6', '_blank')}
              className="bg-accent hover:bg-orange-600 text-white px-12 py-6 text-xl font-semibold transform hover:scale-105 transition-all duration-300"
            >
              Записаться на курс
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Bot className="text-accent text-3xl mr-4" />
              <span className="font-heading font-bold text-2xl">ИИ в работе</span>
            </div>
            <p className="text-gray-400 mb-6">
              Корпоративное обучение использованию искусственного интеллекта
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="text-2xl" />
              </a>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8">
              <p className="text-gray-400">© 2024 ИИ в работе. Все права защищены.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
