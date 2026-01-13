import { 
  type User, 
  type InsertUser, 
  type Reflection, 
  type InsertReflection,
  type Project,
  type InsertProject
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getReflections(): Promise<Reflection[]>;
  getReflection(id: string): Promise<Reflection | undefined>;
  createReflection(reflection: InsertReflection & { date: string }): Promise<Reflection>;
  deleteReflection(id: string): Promise<boolean>;
  
  getProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  deleteProject(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private reflections: Map<string, Reflection>;
  private projects: Map<string, Project>;

  constructor() {
    this.users = new Map();
    this.reflections = new Map();
    this.projects = new Map();
    
    this.seedData();
  }

  private seedData() {
    const sampleReflections: InsertReflection[] = [
      {
        name: "Student",
        date: "Mon Jan 13 2025",
        reflection: "This week I learned about HTML structure and semantic elements. I found it interesting how proper semantic HTML improves both accessibility and SEO. The most challenging part was understanding when to use section vs article elements.",
        week: 1,
      },
      {
        name: "Student",
        date: "Mon Jan 20 2025",
        reflection: "Explored CSS Flexbox and Grid layouts. Grid is incredibly powerful for creating complex layouts with minimal code. I spent extra time practicing media queries to ensure my Learning Journal is fully responsive across all device sizes.",
        week: 2,
      },
      {
        name: "Student",
        date: "Mon Jan 27 2025",
        reflection: "JavaScript DOM manipulation was the focus this week. I implemented a dynamic navigation menu and theme switcher. The event handling concepts finally clicked after building the form validation feature.",
        week: 3,
      },
    ];

    sampleReflections.forEach((reflection) => {
      const id = randomUUID();
      this.reflections.set(id, { ...reflection, id });
    });

    const sampleProjects: InsertProject[] = [
      {
        title: "Learning Journal PWA",
        description: "A Progressive Web App for documenting weekly learning reflections with offline support, installability, and dynamic data fetching.",
        technologies: ["HTML5", "CSS3", "JavaScript", "React", "PWA"],
        imageUrl: null,
        demoUrl: "/",
        date: "Jan 2025",
      },
      {
        title: "Responsive Portfolio",
        description: "A mobile-first responsive portfolio website showcasing projects and skills with CSS Grid and Flexbox layouts.",
        technologies: ["HTML5", "CSS3", "Flexbox", "Grid"],
        imageUrl: null,
        demoUrl: null,
        date: "Dec 2024",
      },
      {
        title: "Theme Switcher Component",
        description: "A reusable dark/light mode toggle component using CSS custom properties and localStorage for persistence.",
        technologies: ["JavaScript", "CSS", "LocalStorage"],
        imageUrl: null,
        demoUrl: null,
        date: "Nov 2024",
      },
      {
        title: "Flask REST API",
        description: "Backend API for the Learning Journal using Flask framework with JSON file storage for reflections data.",
        technologies: ["Python", "Flask", "REST API", "JSON"],
        imageUrl: null,
        demoUrl: null,
        date: "Feb 2025",
      },
      {
        title: "Service Worker Demo",
        description: "Implementation of service workers for offline caching and background sync capabilities.",
        technologies: ["JavaScript", "Service Workers", "Cache API"],
        imageUrl: null,
        demoUrl: null,
        date: "Mar 2025",
      },
      {
        title: "Form Validation Library",
        description: "A lightweight form validation library with custom rules and real-time feedback using the Validation API.",
        technologies: ["JavaScript", "Validation API", "DOM"],
        imageUrl: null,
        demoUrl: null,
        date: "Oct 2024",
      },
    ];

    sampleProjects.forEach((project) => {
      const id = randomUUID();
      this.projects.set(id, { ...project, id });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getReflections(): Promise<Reflection[]> {
    return Array.from(this.reflections.values());
  }

  async getReflection(id: string): Promise<Reflection | undefined> {
    return this.reflections.get(id);
  }

  async createReflection(insertReflection: InsertReflection & { date: string }): Promise<Reflection> {
    const id = randomUUID();
    const reflection: Reflection = { 
      ...insertReflection, 
      id,
    };
    this.reflections.set(id, reflection);
    return reflection;
  }

  async deleteReflection(id: string): Promise<boolean> {
    return this.reflections.delete(id);
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = { ...insertProject, id };
    this.projects.set(id, project);
    return project;
  }

  async deleteProject(id: string): Promise<boolean> {
    return this.projects.delete(id);
  }
}

export const storage = new MemStorage();
