
import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { MapPin, AlertCircle } from 'lucide-react';

interface SchoolLocation {
  id: number;
  name: string;
  students: number;
  address: string;
  coordinates: [number, number];
  programs: string[];
}

interface InteractiveMapProps {
  mapboxToken: string;
  schoolLocations: SchoolLocation[];
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ mapboxToken, schoolLocations }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapboxToken) {
      setMapError("Mapbox token required");
      return;
    }

    const loadMapboxGL = async () => {
      try {
        // Dynamically import mapbox-gl to avoid SSR issues
        const mapboxgl = await import('mapbox-gl');
        await import('mapbox-gl/dist/mapbox-gl.css');

        if (!mapContainer.current) return;

        // Set access token
        mapboxgl.default.accessToken = mapboxToken;

        // Initialize map centered on Malmö
        const map = new mapboxgl.default.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/light-v11',
          center: [13.0038, 55.6050], // Malmö coordinates
          zoom: 11,
          pitch: 45,
        });

        // Add navigation controls
        map.addControl(
          new mapboxgl.default.NavigationControl({
            visualizePitch: true,
          }),
          'top-right'
        );

        map.on('load', () => {
          setIsMapLoaded(true);
          
          // Add school markers
          schoolLocations.forEach((school) => {
            // Create marker element
            const markerEl = document.createElement('div');
            markerEl.className = 'school-marker';
            markerEl.style.width = '30px';
            markerEl.style.height = '30px';
            markerEl.style.borderRadius = '50%';
            markerEl.style.backgroundColor = '#2563eb';
            markerEl.style.border = '3px solid white';
            markerEl.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
            markerEl.style.cursor = 'pointer';
            markerEl.style.display = 'flex';
            markerEl.style.alignItems = 'center';
            markerEl.style.justifyContent = 'center';
            markerEl.style.color = 'white';
            markerEl.style.fontSize = '12px';
            markerEl.style.fontWeight = 'bold';
            markerEl.textContent = school.students.toString().slice(0, 2);

            // Create popup
            const popup = new mapboxgl.default.Popup({ 
              offset: 25,
              closeButton: true,
              closeOnClick: false
            }).setHTML(`
              <div style="padding: 10px; min-width: 200px;">
                <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #1f2937;">${school.name}</h3>
                <p style="margin: 0 0 4px 0; color: #6b7280; font-size: 14px;">${school.address}</p>
                <p style="margin: 0 0 8px 0; color: #374151;"><strong>${school.students}</strong> students</p>
                <div style="display: flex; gap: 4px; flex-wrap: wrap;">
                  ${school.programs.map(program => 
                    `<span style="background: #eff6ff; color: #2563eb; padding: 2px 6px; border-radius: 4px; font-size: 12px;">${program}</span>`
                  ).join('')}
                </div>
              </div>
            `);

            // Add marker to map
            new mapboxgl.default.Marker(markerEl)
              .setLngLat(school.coordinates)
              .setPopup(popup)
              .addTo(map);
          });
        });

        map.on('error', (e) => {
          console.error('Map error:', e);
          setMapError("Failed to load map. Please check your Mapbox token.");
        });

        // Cleanup function
        return () => {
          map.remove();
        };
      } catch (error) {
        console.error('Error loading Mapbox:', error);
        setMapError("Failed to initialize map. Please check your internet connection.");
      }
    };

    loadMapboxGL();
  }, [mapboxToken, schoolLocations]);

  if (!mapboxToken) {
    return (
      <div className="h-96 flex items-center justify-center border rounded-lg bg-ike-neutral-light">
        <div className="text-center text-ike-neutral">
          <MapPin className="w-12 h-12 mx-auto mb-2 text-ike-primary" />
          <p className="font-medium">Map Ready to Load</p>
          <p className="text-sm">Enter your Mapbox token above to view the interactive map</p>
        </div>
      </div>
    );
  }

  if (mapError) {
    return (
      <div className="h-96 flex items-center justify-center border rounded-lg bg-red-50">
        <div className="text-center text-red-600">
          <AlertCircle className="w-12 h-12 mx-auto mb-2" />
          <p className="font-medium">Map Error</p>
          <p className="text-sm">{mapError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div 
        ref={mapContainer} 
        className="h-96 w-full rounded-lg shadow-lg border"
        style={{ minHeight: '400px' }}
      />
      {!isMapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg">
          <div className="text-center text-ike-neutral">
            <div className="animate-spin w-8 h-8 border-2 border-ike-primary border-t-transparent rounded-full mx-auto mb-2"></div>
            <p>Loading interactive map...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
