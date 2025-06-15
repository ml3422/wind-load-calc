
import React, { useState } from 'react';
import { Card, CardContent } from './components/ui/card';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Label } from './components/ui/label';
import { Info } from 'lucide-react';

const WindLoadModule = () => {
  const [exposureCategory, setExposureCategory] = useState('B');
  const [buildingHeight, setBuildingHeight] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [mwfrsResult, setMwfrsResult] = useState(null);

  const calculateWindLoad = () => {
    const height = parseFloat(buildingHeight);
    const speed = parseFloat(windSpeed);
    if (!height || !speed) return;
    const pressure = 0.00256 * speed * speed;
    setMwfrsResult((pressure * height).toFixed(2));
  };

  return (
    <div className="grid gap-4 p-4">
      <h1 className="text-xl font-bold">Wind Load - MWFRS Calculator</h1>

      <Card>
        <CardContent className="grid gap-2 p-4">
          <Label htmlFor="windSpeed">Basic Wind Speed (V, mph)
            <span className="inline-flex items-center ml-2 text-gray-500 text-sm">
              <Info className="w-4 h-4" />
              <span className="ml-1">IBC 2021 §1609.3</span>
            </span>
          </Label>
          <Input id="windSpeed" type="number" value={windSpeed} onChange={(e) => setWindSpeed(e.target.value)} />

          <Label htmlFor="buildingHeight">Mean Roof Height (ft)</Label>
          <Input id="buildingHeight" type="number" value={buildingHeight} onChange={(e) => setBuildingHeight(e.target.value)} />

          <Label htmlFor="exposure">Exposure Category</Label>
          <select
            id="exposure"
            value={exposureCategory}
            onChange={(e) => setExposureCategory(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>

          <Button className="mt-4" onClick={calculateWindLoad}>Calculate MWFRS Load</Button>

          {mwfrsResult && (
            <div className="mt-4 text-green-700 font-semibold">
              MWFRS Load: {mwfrsResult} psf (Simplified)
              <div className="text-sm text-gray-500">Reference: ASCE 7-16 Eq. 26.10-1</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WindLoadModule;
