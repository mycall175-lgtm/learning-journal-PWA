import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, Calendar, User } from "lucide-react";
import type { Reflection } from "@shared/schema";

interface ReflectionCardProps {
  reflection: Reflection;
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
}

export function ReflectionCard({ reflection, onDelete, isDeleting }: ReflectionCardProps) {
  const wordCount = reflection.reflection.split(/\s+/).filter(Boolean).length;

  return (
    <Card 
      className="hover-elevate group" 
      data-testid={`card-reflection-${reflection.id}`}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <Badge variant="secondary" className="gap-1">
              <Calendar className="h-3 w-3" />
              {reflection.date}
            </Badge>
            {reflection.week && (
              <Badge variant="outline">Week {reflection.week}</Badge>
            )}
          </div>
          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => onDelete(reflection.id)}
              disabled={isDeleting}
              data-testid={`button-delete-${reflection.id}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="font-semibold">{reflection.name}</span>
          </div>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {reflection.reflection}
          </p>
        </div>

        <div className="mt-4 pt-4 border-t">
          <span className="text-xs text-muted-foreground">
            {wordCount} words
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
