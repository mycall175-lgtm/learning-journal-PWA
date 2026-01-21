import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Code, Database, Globe, Layout, Server, Smartphone, Gamepad2, CheckCircle2, Lightbulb, Target, Wrench } from "lucide-react";

interface LabReflection {
  lab: number;
  title: string;
  icon: typeof BookOpen;
  objectives: string[];
  learnings: string[];
  challenges: string[];
  skills: string[];
}

const labReflections: LabReflection[] = [
  {
    lab: 1,
    title: "Introduction to Mobile Development",
    icon: Smartphone,
    objectives: [
      "Understand the fundamentals of mobile application development",
      "Set up the development environment",
      "Learn about Progressive Web Apps (PWAs)",
    ],
    learnings: [
      "PWAs combine the best of web and mobile apps, offering offline support, installability, and native-like experiences",
      "The mobile-first design approach ensures apps work well across all device sizes",
      "Understanding the difference between native, hybrid, and web-based mobile applications",
    ],
    challenges: [
      "Setting up the development environment with all necessary tools",
      "Understanding the project structure and file organization",
    ],
    skills: ["PWA Concepts", "Development Setup", "Mobile-First Design"],
  },
  {
    lab: 2,
    title: "HTML & CSS Fundamentals",
    icon: Layout,
    objectives: [
      "Build semantic HTML structure",
      "Implement responsive CSS layouts",
      "Apply mobile-first design principles",
    ],
    learnings: [
      "Semantic HTML improves accessibility and SEO by using meaningful elements like header, nav, main, section, and article",
      "CSS Flexbox and Grid provide powerful layout systems for responsive designs",
      "CSS custom properties (variables) enable consistent theming across the application",
    ],
    challenges: [
      "Deciding between section vs article elements for proper semantic meaning",
      "Creating layouts that work seamlessly across mobile, tablet, and desktop",
    ],
    skills: ["Semantic HTML", "CSS Flexbox", "CSS Grid", "Responsive Design"],
  },
  {
    lab: 3,
    title: "JavaScript & DOM Manipulation",
    icon: Code,
    objectives: [
      "Implement dynamic user interactions",
      "Manipulate the DOM with JavaScript",
      "Handle user events effectively",
    ],
    learnings: [
      "Event listeners enable interactive features like theme toggles and navigation menus",
      "DOM manipulation allows dynamic content updates without page reloads",
      "Form validation provides immediate feedback to users before submission",
    ],
    challenges: [
      "Understanding event bubbling and capturing",
      "Managing state across different components",
    ],
    skills: ["DOM Manipulation", "Event Handling", "Form Validation", "JavaScript ES6+"],
  },
  {
    lab: 4,
    title: "APIs & Data Integration",
    icon: Globe,
    objectives: [
      "Integrate third-party APIs (Quotable API for inspirational quotes)",
      "Use Browser APIs (LocalStorage, Service Worker, Navigator)",
      "Implement the Fetch API for data retrieval",
    ],
    learnings: [
      "Third-party APIs like Quotable provide dynamic content that enriches user experience",
      "LocalStorage API persists data like theme preferences across sessions",
      "Navigator API detects online/offline status for better user feedback",
      "Service Worker API enables offline functionality and caching strategies",
    ],
    challenges: [
      "Handling API failures gracefully with fallback content",
      "Implementing proper error handling for network requests",
    ],
    skills: ["Fetch API", "LocalStorage", "Service Workers", "Third-Party APIs"],
  },
  {
    lab: 5,
    title: "Backend Development with Flask",
    icon: Server,
    objectives: [
      "Build a REST API using Python Flask",
      "Implement CRUD operations",
      "Structure backend code following best practices",
    ],
    learnings: [
      "Flask provides a lightweight framework for building REST APIs in Python",
      "RESTful design uses HTTP methods (GET, POST, PUT, DELETE) for different operations",
      "CORS configuration is essential for frontend-backend communication",
    ],
    challenges: [
      "Designing clean API endpoints that follow REST conventions",
      "Handling validation and error responses consistently",
    ],
    skills: ["Python", "Flask", "REST API", "Backend Development"],
  },
  {
    lab: 6,
    title: "Data Persistence",
    icon: Database,
    objectives: [
      "Implement persistent data storage using JSON files",
      "Handle file I/O operations safely",
      "Ensure data integrity across server restarts",
    ],
    learnings: [
      "JSON file storage provides simple persistence for small applications",
      "Proper file handling ensures data is not lost on errors",
      "Data validation before storage prevents corrupt data",
    ],
    challenges: [
      "Ensuring atomic writes to prevent data corruption",
      "Managing concurrent access to data files",
    ],
    skills: ["JSON Storage", "File I/O", "Data Persistence", "Error Handling"],
  },
  {
    lab: 7,
    title: "PWA Implementation",
    icon: BookOpen,
    objectives: [
      "Create a Web App Manifest for installability",
      "Implement Service Workers for offline caching",
      "Enable the app to work offline",
    ],
    learnings: [
      "Web App Manifest defines app metadata like name, icons, and display mode",
      "Service Workers intercept network requests for caching strategies",
      "Cache-first strategy improves performance and enables offline access",
      "Offline fallback pages provide graceful degradation when network is unavailable",
    ],
    challenges: [
      "Debugging service worker lifecycle and caching behavior",
      "Determining which assets to cache for optimal offline experience",
    ],
    skills: ["Service Workers", "Web App Manifest", "Offline Caching", "PWA"],
  },
];

const miniProjectReflection = {
  title: "Tic Tac Toe Game",
  icon: Gamepad2,
  description: "An interactive Tic Tac Toe game built as the mini project for this course, demonstrating game logic, state management, and user interaction.",
  sections: {
    design: {
      title: "9.1 Design Choices",
      content: [
        "Clean, minimalist interface that focuses on gameplay",
        "Color-coded X (blue) and O (rose) for clear player distinction",
        "Responsive grid layout that works on all screen sizes",
        "Scoreboard to track wins across multiple games",
        "Material Design principles with subtle shadows and animations",
      ],
    },
    implementation: {
      title: "9.2 Technical Implementation",
      content: [
        "React functional components with useState for game state",
        "Array-based board representation for efficient updates",
        "Win detection algorithm checking rows, columns, and diagonals",
        "LocalStorage integration for persisting scores across sessions",
        "TypeScript for type safety and better code organization",
      ],
    },
    challenges: {
      title: "9.3 Challenges Faced",
      content: [
        "Implementing efficient win detection without redundant checks",
        "Managing game state reset while preserving score history",
        "Creating smooth animations for moves and game completion",
        "Ensuring the game is fully accessible via keyboard navigation",
      ],
    },
    outcomes: {
      title: "9.4 Learning Outcomes",
      content: [
        "Deepened understanding of React state management patterns",
        "Learned to implement game logic in a declarative UI framework",
        "Practiced accessibility considerations in interactive applications",
        "Gained experience with localStorage for persistent client data",
        "Applied responsive design principles to a game interface",
      ],
    },
  },
  technologies: ["React", "TypeScript", "Tailwind CSS", "LocalStorage API"],
};

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" data-testid="text-portfolio-title">
            Portfolio Reflections
          </h1>
          <p className="text-muted-foreground">
            FGCT6021 Mobile Application Development - Labs 1-7 & Mini Project
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Mykel Yadav | Student ID: 2321764
          </p>
        </div>

        <Tabs defaultValue="labs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="labs" data-testid="tab-labs">Labs 1-7</TabsTrigger>
            <TabsTrigger value="mini" data-testid="tab-mini-project">Mini Project</TabsTrigger>
          </TabsList>

          <TabsContent value="labs" className="space-y-6">
            {labReflections.map((lab) => (
              <Card key={lab.lab} data-testid={`card-lab-${lab.lab}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-primary/10">
                      <lab.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span>Lab {lab.lab}: {lab.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-primary" />
                      Objectives
                    </h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      {lab.objectives.map((obj, i) => (
                        <li key={i}>{obj}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium flex items-center gap-2 mb-2">
                      <Lightbulb className="h-4 w-4 text-amber-500" />
                      Key Learnings
                    </h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      {lab.learnings.map((learning, i) => (
                        <li key={i}>{learning}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium flex items-center gap-2 mb-2">
                      <Wrench className="h-4 w-4 text-orange-500" />
                      Challenges
                    </h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      {lab.challenges.map((challenge, i) => (
                        <li key={i}>{challenge}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {lab.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="mini" className="space-y-6">
            <Card data-testid="card-mini-project">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-primary/10">
                    <miniProjectReflection.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span>{miniProjectReflection.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  {miniProjectReflection.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {miniProjectReflection.technologies.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>

                <div className="space-y-6">
                  {Object.entries(miniProjectReflection.sections).map(([key, section]) => (
                    <div key={key} className="border-t pt-4">
                      <h4 className="font-medium flex items-center gap-2 mb-3">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        {section.title}
                      </h4>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        {section.content.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-8 bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-3">Browser APIs Used in This Application</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-2">
                <Badge variant="outline">LocalStorage API</Badge>
                <span className="text-sm text-muted-foreground">Theme persistence, quote caching, game scores</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline">Service Worker API</Badge>
                <span className="text-sm text-muted-foreground">Offline caching and background sync</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline">Navigator API</Badge>
                <span className="text-sm text-muted-foreground">Online/offline detection, PWA install</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline">Fetch API</Badge>
                <span className="text-sm text-muted-foreground">API requests to backend and third-party services</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-4 bg-green-500/5 border-green-500/20">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-3">Accessibility Features</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Semantic HTML structure with proper heading hierarchy
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                ARIA labels on interactive elements and navigation
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                High contrast color scheme meeting WCAG guidelines
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Keyboard navigation support throughout the application
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Focus indicators on all interactive elements
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Screen reader compatible content structure
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
