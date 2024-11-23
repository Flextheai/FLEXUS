'use client';

    import { useState } from 'react';
    import { toast } from 'react-hot-toast';
    import { useSession } from 'next-auth/react';

    interface GenerationParams {
      prompt: string;
      steps?: number;
      cfgScale?: number;
      enableRefiner?: boolean;
      width?: number;
      height?: number;
    }

    export function useImageGeneration() {
      const { data: session } = useSession();
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState<string | null>(null);

      const generateImage = async (params: GenerationParams) => {
        if (!session?.user) {
          toast.error('Please sign in to generate images');
          return null;
        }

        setLoading(true);
        setError(null);

        try {
          const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
          });

          if (!response.ok) {
            const error = await response.text();
            throw new Error(error);
          }

          const data = await response.json();
          toast.success('Image generated successfully!');
          return data;
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Failed to generate image';
          setError(message);
          toast.error(message);
          return null;
        } finally {
          setLoading(false);
        }
      };

      return {
        generateImage,
        loading,
        error,
      };
    }
