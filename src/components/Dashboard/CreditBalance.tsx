'use client';

    import { useSession } from 'next-auth/react';

    export function CreditBalance({ credits }: { credits: number }) {
      const { data: session } = useSession();

      if (!session) {
        return null;
      }

      return (
        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold">Credits: {credits}</span>
        </div>
      );
    }
