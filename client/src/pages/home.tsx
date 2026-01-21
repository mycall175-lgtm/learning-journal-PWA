import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, FolderKanban, Calendar, ArrowRight, Code2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StatCard } from "@/components/stat-card";
import { ReflectionCard } from "@/components/reflection-card";
import { StatCardSkeleton, ReflectionCardSkeleton } from "@/components/skeleton-card";
import { QuoteCard } from "@/components/quote-card";
import type { Reflection } from "@shared/schema";

export default function Home() {
  const { data: reflections, isLoading } = useQuery<Reflection[]>({
    queryKey: ["/api/reflections"],
  });

  const stats = {
    totalEntries: reflections?.length || 0,
    weeksCompleted: reflections ? new Set(reflections.map(r => r.week).filter(Boolean)).size : 0,
    technologies: 6,
  };

  const recentReflections = reflections?.slice(-2).reverse() || [];

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-32">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
              <Sparkles className="h-4 w-4" />
              Progressive Web App
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Learning Journal
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
              Document your weekly learning journey, showcase your projects, and build your professional portfolio. 
              A PWA that works offline and can be installed on any device.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/journal">
                <Button size="lg" className="gap-2" data-testid="button-start-journal">
                  <BookOpen className="h-5 w-5" />
                  Start Journaling
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/projects">
                <Button size="lg" variant="outline" className="gap-2" data-testid="button-view-projects">
                  <FolderKanban className="h-5 w-5" />
                  View Projects
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-xl font-semibold mb-4 text-center">Daily Inspiration</h2>
          <QuoteCard />
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-semibold mb-8 text-center">Your Progress</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              <>
                <StatCardSkeleton />
                <StatCardSkeleton />
                <StatCardSkeleton />
              </>
            ) : (
              <>
                <StatCard
                  title="Total Entries"
                  value={stats.totalEntries}
                  icon={BookOpen}
                  description="Journal reflections"
                />
                <StatCard
                  title="Weeks Completed"
                  value={stats.weeksCompleted}
                  icon={Calendar}
                  description="of 14 week course"
                />
                <StatCard
                  title="Technologies"
                  value={stats.technologies}
                  icon={Code2}
                  description="HTML, CSS, JS, Flask, PWA, APIs"
                />
              </>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold">Recent Reflections</h2>
            <Link href="/journal">
              <Button variant="ghost" className="gap-2" data-testid="link-view-all-reflections">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2">
              <ReflectionCardSkeleton />
              <ReflectionCardSkeleton />
            </div>
          ) : recentReflections.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {recentReflections.map((reflection) => (
                <ReflectionCard key={reflection.id} reflection={reflection} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-16 text-center">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No reflections yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start documenting your learning journey by adding your first reflection.
                </p>
                <Link href="/journal">
                  <Button data-testid="button-add-first-reflection">Add Your First Reflection</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to get started?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Begin documenting your mobile application development journey today.
          </p>
          <Link href="/journal">
            <Button size="lg" className="gap-2" data-testid="button-cta-journal">
              <BookOpen className="h-5 w-5" />
              Go to Journal
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
