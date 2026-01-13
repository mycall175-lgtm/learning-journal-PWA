import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { BookOpen, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReflectionForm } from "@/components/reflection-form";
import { ReflectionCard } from "@/components/reflection-card";
import { ReflectionCardSkeleton } from "@/components/skeleton-card";
import { EmptyState } from "@/components/empty-state";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Reflection } from "@shared/schema";

export default function Journal() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [weekFilter, setWeekFilter] = useState<string>("all");

  const { data: reflections, isLoading } = useQuery<Reflection[]>({
    queryKey: ["/api/reflections"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: { name: string; reflection: string; week?: number }) => {
      return apiRequest("POST", "/api/reflections", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reflections"] });
      toast({
        title: "Reflection added",
        description: "Your reflection has been saved successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save reflection. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/reflections/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reflections"] });
      toast({
        title: "Reflection deleted",
        description: "Your reflection has been removed.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete reflection. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: { name: string; reflection: string; week?: number }) => {
    createMutation.mutate(data);
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const filteredReflections = reflections?.filter((reflection) => {
    const matchesSearch =
      searchQuery === "" ||
      reflection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reflection.reflection.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesWeek =
      weekFilter === "all" || reflection.week?.toString() === weekFilter;
    
    return matchesSearch && matchesWeek;
  }).reverse() || [];

  const currentDate = new Date().toDateString();

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="mx-auto max-w-3xl px-4">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Journal</h1>
          <p className="text-muted-foreground">{currentDate}</p>
        </header>

        <div className="sticky top-16 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 -mx-4 px-4 border-b mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reflections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search"
              />
            </div>
            <Select value={weekFilter} onValueChange={setWeekFilter}>
              <SelectTrigger className="w-full sm:w-[180px]" data-testid="select-week-filter">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by week" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Weeks</SelectItem>
                {Array.from({ length: 14 }, (_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                    Week {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-8">
          <ReflectionForm
            onSubmit={handleSubmit}
            isSubmitting={createMutation.isPending}
          />
        </div>

        <section>
          <h2 className="text-xl font-semibold mb-6">Previous Reflections</h2>
          
          {isLoading ? (
            <div className="space-y-6">
              <ReflectionCardSkeleton />
              <ReflectionCardSkeleton />
              <ReflectionCardSkeleton />
            </div>
          ) : filteredReflections.length > 0 ? (
            <div className="space-y-6">
              {filteredReflections.map((reflection) => (
                <ReflectionCard
                  key={reflection.id}
                  reflection={reflection}
                  onDelete={handleDelete}
                  isDeleting={deleteMutation.isPending}
                />
              ))}
            </div>
          ) : reflections && reflections.length > 0 ? (
            <EmptyState
              icon={Search}
              title="No matching reflections"
              description="Try adjusting your search or filter to find what you're looking for."
              actionLabel="Clear Filters"
              onAction={() => {
                setSearchQuery("");
                setWeekFilter("all");
              }}
            />
          ) : (
            <EmptyState
              icon={BookOpen}
              title="No reflections yet"
              description="Start documenting your learning by adding your first reflection above."
            />
          )}
        </section>
      </div>
    </div>
  );
}
