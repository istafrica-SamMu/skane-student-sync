
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
  const map = useRef<any>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Clean and validate token
    const trimmedToken = mapboxToken?.trim() || '';
    
    console.log('Token validation - raw token:', mapboxToken);
    console.log('Token validation - trimmed token:', trimmedToken);
    console.log('Token validation - token length:', trimmedToken.length);
    console.log('Token validation - starts with pk.:', trimmedToken.startsWith('pk.'));

    if (!trimmedToken) {
      console.log('Token validation - empty token');
      setMapError("Please enter a Mapbox public token");
      return;
    }

    if (!trimmedToken.startsWith('pk.')) {
      console.log('Token validation - invalid format');
      setMapError("Please enter a valid Mapbox public token (starts with 'pk.')");
      return;
    }

    if (trimmedToken.length < 50) {
      console.log('Token validation - token too short');
      setMapError("The token appears to be incomplete. Please check your Mapbox token.");
      return;
    }

    console.log('Token validation - passed all checks');

    if (!mapContainer.current) return;

    setIsLoading(true);
    setMapError(null);

    const loadMapboxGL = async () => {
      try {
        console.log('Loading Mapbox GL with token:', trimmedToken.substring(0, 20) + '...');
        
        // Dynamically import mapbox-gl
        const mapboxgl = (await import('mapbox-gl')).default;
        
        // Import CSS
        await import('mapbox-gl/dist/mapbox-gl.css');

        if (!mapContainer.current) {
          setIsLoading(false);
          return;
        }

        // Set access token
        mapboxgl.accessToken = trimmedToken;

        console.log('Initializing map...');

        // Initialize map centered on Malmö
        const mapInstance = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/light-v11',
          center: [13.0038, 55.6050], // Malmö coordinates
          zoom: 11,
          pitch: 0,
        });

        map.current = mapInstance;

        // Add navigation controls
        mapInstance.addControl(
          new mapboxgl.NavigationControl({
            visualizePitch: true,
          }),
          'top-right'
        );

        mapInstance.on('load', () => {
          console.log('Map loaded successfully');
          setIsMapLoaded(true);
          setIsLoading(false);
          
          // Add school markers
          schoolLocations.forEach((school) => {
            // Create marker element
            const markerEl = document.createElement('div');
            markerEl.className = 'school-marker';
            markerEl.style.cssText = `
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background-color: #2563eb;
              border: 3px solid white;
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 10px;
              font-weight: bold;
            `;
            markerEl.textContent = school.students.toString().slice(0, 3);

            // Create popup
            const popup = new mapboxgl.Popup({ 
              offset: 25,
              closeButton: true,
              closeOnClick: false
            }).setHTML(`
              <div style="padding: 12px; min-width: 200px; font-family: system-ui;">
                <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #1f2937; font-size: 14px;">${school.name}</h3>
                <p style="margin: 0 0 4px 0; color: #6b7280; font-size: 12px;">${school.address}</p>
                <p style="margin: 0 0 8px 0; color: #374151; font-size: 13px;"><strong>${school.students}</strong> students</p>
                <div style="display: flex; gap: 4px; flex-wrap: wrap;">
                  ${school.programs.map(program => 
                    `<span style="background: #eff6ff; color: #2563eb; padding: 2px 6px; border-radius: 4px; font-size: 11px;">${program}</span>`
                  ).join('')}
                </div>
              </div>
            `);

            // Add marker to map
            const marker = new mapboxgl.Marker(markerEl)
              .setLngLat(school.coordinates)
              .setPopup(popup)
              .addTo(mapInstance);

            console.log(`Added marker for ${school.name} at`, school.coordinates);
          });
        });

        mapInstance.on('error', (e: any) => {
          console.error('Mapbox error:', e);
          if (e.error && e.error.message) {
            if (e.error.message.includes('401')) {
              setMapError("Invalid Mapbox token. Please check your token is correct and has the necessary permissions.");
            } else if (e.error.message.includes('403')) {
              setMapError("Access denied. Please check your Mapbox token permissions.");
            } else {
              setMapError(`Mapbox error: ${e.error.message}`);
            }
          } else {
            setMapError("Failed to load map. Please check your Mapbox token and internet connection.");
          }
          setIsLoading(false);
        });

        mapInstance.on('styledata', () => {
          console.log('Map style loaded');
        });

      } catch (error) {
        console.error('Error loading Mapbox:', error);
        setMapError("Failed to initialize map. Please check your internet connection and token.");
        setIsLoading(false);
      }
    };

    loadMapboxGL();

    // Cleanup function
    return () => {
      if (map.current) {
        console.log('Cleaning up map');
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapboxToken, schoolLocations]);

  // Check if token exists and is not empty
  if (!mapboxToken || !mapboxToken.trim()) {
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
      {(isLoading || !isMapLoaded) && (
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
