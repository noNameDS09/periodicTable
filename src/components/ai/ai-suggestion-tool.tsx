"use client";

import { useState } from 'react';
import { suggestElements, type SuggestElementsInput } from '@/ai/flows/suggest-elements';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Wand2 } from 'lucide-react';

export function AISuggestionTool() {
  const [properties, setProperties] = useState("");
  const [suggestions, setSuggestions] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!properties.trim()) {
      toast({
        title: "Input Required",
        description: "Please describe the element properties.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setSuggestions(null);

    try {
      const input: SuggestElementsInput = { properties };
      const result = await suggestElements(input);
      setSuggestions(result.suggestions);
    } catch (error) {
      console.error("AI suggestion error:", error);
      toast({
        title: "Error",
        description: "Failed to get AI suggestions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Wand2 className="h-6 w-6 text-primary" />
          <CardTitle>AI Element Suggester</CardTitle>
        </div>
        <CardDescription>
          Describe properties of an element (e.g., "highly reactive metal", "forms diatomic molecules", "noble gas with low boiling point") and let AI suggest related elements.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="element-properties" className="text-sm font-medium">Element Properties</Label>
            <Textarea
              id="element-properties"
              value={properties}
              onChange={(e) => setProperties(e.target.value)}
              placeholder="e.g., Light, very reactive metal, good conductor"
              rows={3}
              className="mt-1"
              disabled={isLoading}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Suggesting...
              </span>
            ) : (
              <span className="flex items-center">
                <Wand2 className="mr-2 h-4 w-4" /> Get Suggestions
              </span>
            )}
          </Button>
        </CardFooter>
      </form>
      {suggestions && (
        <CardContent>
          <h3 className="text-lg font-semibold mb-2 mt-4">AI Suggestions:</h3>
          <div className="p-4 bg-muted rounded-md whitespace-pre-wrap text-sm">
            {suggestions}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
