'use client';

    import { useState } from 'react';
    import { ImageService } from '@/services/image-service';
    import toast from 'react-hot-toast';

    export default function GeneratorForm() {
      const [prompt, setPrompt] = useState('');
      const [loading, setLoading] = useState(false);
      const [imageUrl, setImageUrl] = useState('');

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        try {
          const result = await ImageService.generateImage({
            prompt: prompt || 'A cat eating a birthday cake',
          });
          
          setImageUrl(result.image_url);
          toast.success('Image generated successfully!');
        } catch (error) {
          console.error('Generation error:', error);
          toast.error('Failed to generate image');
        } finally {
          setLoading(false);
        }
      };

      return (
        <div className="max-w-2xl mx-auto p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A cat eating a birthday cake"
              className="w-full p-2 border rounded"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white p-2 rounded disabled:opacity-50"
            >
              {loading ? 'Generating...' : 'Generate Image'}
            </button>
          </form>
          
          {imageUrl && (
            <div className="mt-4">
              <img src={imageUrl} alt={prompt} className="w-full rounded-lg" />
            </div>
          )}
        </div>
      );
    }
