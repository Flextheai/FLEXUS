'use client';

    import { useState } from 'react';
    import { useSession } from 'next-auth/react';
    import { GeneratorForm } from '@/components/ImageGenerator/GeneratorForm';
    import { ImageGallery } from '@/components/ImageGenerator/ImageGallery';
    import { AdvancedSettings } from '@/components/ImageGenerator/AdvancedSettings';
    import { CreditBalance } from '@/components/Dashboard/CreditBalance';
    import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';

    export default function DashboardPage() {
      const { data: session } = useSession();
      const [activeTab, setActiveTab] = useState('generate');

      if (!session) {
        return <div>Please sign in to access the dashboard.</div>;
      }

      return (
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <CreditBalance credits={session.user.credits} />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="generate">Generate</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="generate">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <GeneratorForm />
                <AdvancedSettings />
              </div>
            </TabsContent>

            <TabsContent value="gallery">
              <ImageGallery />
            </TabsContent>

            <TabsContent value="settings">
              <AdvancedSettings />
            </TabsContent>
          </Tabs>
        </div>
      );
    }
