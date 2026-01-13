import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, FolderCode } from "lucide-react";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card 
      className="overflow-hidden hover-elevate group flex flex-col" 
      data-testid={`card-project-${project.id}`}
    >
      <div className="aspect-video bg-gradient-to-br from-primary/20 via-primary/10 to-background relative overflow-hidden">
        {project.imageUrl ? (
          <img 
            src={project.imageUrl} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <FolderCode className="h-16 w-16 text-primary/30" />
          </div>
        )}
      </div>
      <CardContent className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="gap-1 text-xs">
            <Calendar className="h-3 w-3" />
            {project.date}
          </Badge>
        </div>
        <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
        {project.demoUrl && (
          <Button asChild variant="outline" className="mt-4 w-full" size="sm">
            <a 
              href={project.demoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              data-testid={`link-project-demo-${project.id}`}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Demo
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
