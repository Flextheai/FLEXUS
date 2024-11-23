'use client';

    import { useState, useEffect } from 'react';
    import { useSession } from 'next-auth/react';
    import { prisma } from '@/lib/prisma';

    export function ImageGallery() {
      const { data: session } = useSession();
      const [generations, setGenerations] = useState([]);

      useEffect(() => {
        const fetchGenerations = async () => {
          if (!session?.user) return;

          try {
            const response = await fetch(`/api/generations?userId=${session.user.id}`);
            const data = await response.json();
            setGenerations(data);
          } catch (error) {
            console.error('Error fetching generations:', error);
          }
        };

        fetchGenerations();
      }, [session]);

      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {generations.map((generation: any) => (
            <div key={generation.id} className="border rounded-lg p-4">
              <img src={generation.imageUrl} alt={generation.prompt} className="w-full rounded-lg" />
              <p className="mt-2 text-sm">{generation.prompt}</p>
            </div>
          ))}
        </div>
      );
    }
