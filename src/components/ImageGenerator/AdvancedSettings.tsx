'use client';

    import { useState } from 'react';
    import { Slider } from '@/components/ui/Slider';
    import { Switch } from '@/components/ui/Switch';
    import { Card } from '@/components/ui/Card';

    export function AdvancedSettings() {
      const [settings, setSettings] = useState({
        steps: 30,
        cfgScale: 5,
        enableRefiner: false,
        width: 1024,
        height: 1024,
      });

      const handleSettingChange = (key: string, value: number | boolean) => {
        setSettings(prev => ({ ...prev, [key]: value }));
      };

      return (
        <Card className="p-6 space-y-6">
          <h3 className="text-xl font-semibold">Advanced Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Steps ({settings.steps})
              </label>
              <Slider
                value={[settings.steps]}
                onValueChange={([value]) => handleSettingChange('steps', value)}
                min={10}
                max={50}
                step={1}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                CFG Scale ({settings.cfgScale})
              </label>
              <Slider
                value={[settings.cfgScale]}
                onValueChange={([value]) => handleSettingChange('cfgScale', value)}
                min={1}
                max={20}
                step={0.5}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Enable Refiner</label>
              <Switch
                checked={settings.enableRefiner}
                onCheckedChange={(checked) => handleSettingChange('enableRefiner', checked)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Width</label>
                <select
                  value={settings.width}
                  onChange={(e) => handleSettingChange('width', Number(e.target.value))}
                  className="w-full border rounded-md p-2"
                >
                  <option value={512}>512px</option>
                  <option value={768}>768px</option>
                  <option value={1024}>1024px</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Height</label>
                <select
                  value={settings.height}
                  onChange={(e) => handleSettingChange('height', Number(e.target.value))}
                  className="w-full border rounded-md p-2"
                >
                  <option value={512}>512px</option>
                  <option value={768}>768px</option>
                  <option value={1024}>1024px</option>
                </select>
              </div>
            </div>
          </div>
        </Card>
      );
    }
