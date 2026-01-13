import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Mail, 
  Github, 
  Linkedin, 
  MapPin, 
  GraduationCap,
  Code2,
  Palette,
  Globe,
  Database,
  Smartphone
} from "lucide-react";

const skills = [
  {
    category: "Frontend",
    icon: Palette,
    items: ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS"],
  },
  {
    category: "Backend",
    icon: Database,
    items: ["Python", "Flask", "Node.js", "REST APIs", "JSON"],
  },
  {
    category: "Mobile & PWA",
    icon: Smartphone,
    items: ["Progressive Web Apps", "Service Workers", "Responsive Design", "Offline Storage"],
  },
  {
    category: "Tools & Other",
    icon: Code2,
    items: ["Git", "GitHub", "VS Code", "PythonAnywhere", "Chrome DevTools"],
  },
];

const contacts = [
  { icon: Mail, label: "m.yadav2321764@uca.ac.uk", href: "mailto:m.yadav2321764@uca.ac.uk" },
  { icon: Github, label: "github.com/mykelyadav", href: "https://github.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: MapPin, label: "Farnham, UK", href: null },
];

export default function About() {
  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-4">
        <section className="mb-12">
          <Card>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <Avatar className="h-32 w-32 md:h-48 md:w-48 mx-auto md:mx-0">
                  <AvatarFallback className="text-4xl bg-primary/10 text-primary font-semibold">
                    MY
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">Mykel Yadav</h1>
                  <p className="text-lg text-muted-foreground mb-4">
                    BSc (Hons) Computer Science Student | ID: 2321764
                  </p>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground mb-6">
                    <GraduationCap className="h-5 w-5" />
                    <span>University for the Creative Arts</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed max-w-2xl">
                    I'm a passionate computer science student focusing on mobile application development 
                    and web technologies. This Learning Journal documents my journey through the FGCT6021 
                    module, where I'm building a Progressive Web App using HTML, CSS, JavaScript, Flask, 
                    and various web APIs.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <div className="grid gap-8 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-6">Skills & Technologies</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {skills.map((skillGroup) => {
                const Icon = skillGroup.icon;
                return (
                  <Card key={skillGroup.category} className="hover-elevate">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-semibold">{skillGroup.category}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          <aside>
            <h2 className="text-2xl font-semibold mb-6">Quick Links</h2>
            <Card>
              <CardContent className="p-6 space-y-4">
                {contacts.map((contact, index) => {
                  const Icon = contact.icon;
                  const content = (
                    <div className="flex items-center gap-3 p-2 rounded-md hover-elevate">
                      <div className="rounded-full bg-muted p-2">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm">{contact.label}</span>
                    </div>
                  );
                  
                  return contact.href ? (
                    <a
                      key={index}
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                      data-testid={`link-contact-${index}`}
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={index}>{content}</div>
                  );
                })}
              </CardContent>
            </Card>

            <h2 className="text-2xl font-semibold mb-6 mt-8">Course Info</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Module</span>
                    <span className="font-medium">FGCT6021</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Course</span>
                    <span className="font-medium">Mobile App Dev</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">14 Weeks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Focus</span>
                    <span className="font-medium">PWA Development</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">About This Project</h2>
          <Card>
            <CardContent className="p-6 md:p-8">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  This Learning Journal is a Progressive Web App (PWA) built as part of the FGCT6021 
                  Mobile Application Development module. It serves as both a learning log and a 
                  portfolio to showcase my work throughout the 14-week course.
                </p>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-6">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Globe className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">Responsive</p>
                      <p className="text-xs text-muted-foreground">Mobile-first design</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Smartphone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">Installable</p>
                      <p className="text-xs text-muted-foreground">Add to home screen</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Database className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">Offline Ready</p>
                      <p className="text-xs text-muted-foreground">Works without internet</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Code2 className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">Modern Stack</p>
                      <p className="text-xs text-muted-foreground">React + TypeScript</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
