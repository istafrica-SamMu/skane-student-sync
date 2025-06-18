
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Student {
  id: number;
  name: string;
  lat: number;
  lng: number;
  municipality: string;
  schoolUnit: string;
}

interface School {
  id: number;
  name: string;
  lat: number;
  lng: number;
  students: number;
  type: string;
}

interface InteractiveMapProps {
  mapboxToken: string;
  students: Student[];
  schools: School[];
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ mapboxToken, students, schools }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [13.0007, 55.6059], // Center on Skåne region
      zoom: 8,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    map.current.on('load', () => {
      // Add student markers
      students.forEach((student) => {
        const studentPopup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div class="p-2">
            <h3 class="font-semibold text-blue-600">${student.name}</h3>
            <p class="text-sm text-gray-600">Municipality: ${student.municipality}</p>
            <p class="text-sm text-gray-600">School: ${student.schoolUnit}</p>
          </div>
        `);

        new mapboxgl.Marker({ color: '#3B82F6' })
          .setLngLat([student.lng, student.lat])
          .setPopup(studentPopup)
          .addTo(map.current!);
      });

      // Add school markers
      schools.forEach((school) => {
        const schoolPopup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div class="p-2">
            <h3 class="font-semibold text-green-600">${school.name}</h3>
            <p class="text-sm text-gray-600">Type: ${school.type}</p>
            <p class="text-sm text-gray-600">Students: ${school.students}</p>
          </div>
        `);

        new mapboxgl.Marker({ color: '#10B981' })
          .setLngLat([school.lng, school.lat])
          .setPopup(schoolPopup)
          .addTo(map.current!);
      });
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, students, schools]);

  return <div ref={mapContainer} className="w-full h-full" />;
};

export default InteractiveMap;
