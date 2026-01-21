import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Quote, RefreshCw, WifiOff } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface QuoteData {
  content: string;
  author: string;
}

const fallbackQuotes: QuoteData[] = [
  { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { content: "Learning is not attained by chance, it must be sought for with ardor and diligence.", author: "Abigail Adams" },
  { content: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.", author: "Dr. Seuss" },
  { content: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
  { content: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi" },
  { content: "The beautiful thing about learning is that nobody can take it away from you.", author: "B.B. King" },
];

async function fetchQuoteFromAPI(): Promise<QuoteData> {
  const response = await fetch("https://api.quotable.io/random?tags=education|wisdom|inspirational");
  if (!response.ok) throw new Error("Failed to fetch quote");
  const data = await response.json();
  return { content: data.content, author: data.author };
}

function getStoredQuote(): QuoteData | null {
  try {
    const stored = localStorage.getItem("dailyQuote");
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.quote;
    }
  } catch {
    return null;
  }
  return null;
}

function storeQuote(quote: QuoteData): void {
  localStorage.setItem("dailyQuote", JSON.stringify({ quote, date: new Date().toDateString() }));
}

function getRandomFallback(): QuoteData {
  return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
}

export function QuoteCard() {
  const queryClient = useQueryClient();

  const { data: quote, isLoading, isError, isFetching, refetch } = useQuery<QuoteData>({
    queryKey: ["/quote"],
    queryFn: async () => {
      try {
        const newQuote = await fetchQuoteFromAPI();
        storeQuote(newQuote);
        return newQuote;
      } catch {
        const stored = getStoredQuote();
        if (stored) return stored;
        return getRandomFallback();
      }
    },
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
    retry: 1,
  });

  const isOffline = !navigator.onLine;
  const showOfflineHint = isError || isOffline;

  const handleRefresh = async () => {
    queryClient.removeQueries({ queryKey: ["/quote"] });
    await refetch();
  };

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Quote className="h-8 w-8 text-primary shrink-0 mt-1" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/3 mt-4" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20" data-testid="card-daily-quote">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Quote className="h-8 w-8 text-primary shrink-0 mt-1" />
          <div className="flex-1">
            <p className="text-lg italic leading-relaxed mb-3" data-testid="text-quote-content">
              "{quote?.content}"
            </p>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <p className="text-sm text-muted-foreground font-medium" data-testid="text-quote-author">
                — {quote?.author}
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                disabled={isFetching}
                className="gap-2"
                data-testid="button-refresh-quote"
              >
                <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
                New Quote
              </Button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          {showOfflineHint && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <WifiOff className="h-3 w-3" />
              <span>Showing cached quote</span>
            </div>
          )}
          <p className="text-xs text-muted-foreground ml-auto">
            Powered by Quotable API
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
