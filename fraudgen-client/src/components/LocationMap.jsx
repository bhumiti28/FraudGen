import React, { useEffect, useState, useRef } from 'react';

function LocationMap({ transactions }) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const leafletMapRef = useRef(null);
  const markersRef = useRef([]);
  const mapContainerId = useRef(`map-${Math.random().toString(36).substr(2, 9)}`);
  const scriptRef = useRef(null);
  const styleRef = useRef(null);

  // Clean up function
  const cleanupLeaflet = () => {
    if (leafletMapRef.current) {
      leafletMapRef.current.remove();
      leafletMapRef.current = null;
    }
    
    if (markersRef.current.length > 0) {
      markersRef.current = [];
    }
    
    if (scriptRef.current && document.body.contains(scriptRef.current)) {
      document.body.removeChild(scriptRef.current);
      scriptRef.current = null;
    }
    
    if (styleRef.current && document.head.contains(styleRef.current)) {
      document.head.removeChild(styleRef.current);
      styleRef.current = null;
    }
    
    setMapLoaded(false);
  };

  // Load Leaflet resources
  const loadLeafletResources = () => {
    // Check if Leaflet is already loaded
    if (window.L) {
      initializeMap();
      return;
    }
    
    // Load CSS if not already loaded
    if (!document.querySelector('link[href*="leaflet.css"]')) {
      const linkElement = document.createElement('link');
      linkElement.rel = 'stylesheet';
      linkElement.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
      document.head.appendChild(linkElement);
      styleRef.current = linkElement;
    }

    // Load JS if not already loaded
    if (!window.L) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
      script.integrity = 'sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==';
      script.crossOrigin = '';
      
      script.onload = () => {
        setTimeout(() => {
          // Use setTimeout to ensure the DOM element is fully rendered
          initializeMap();
        }, 100);
      };
      
      document.body.appendChild(script);
      scriptRef.current = script;
    }
  };

  // Initialize the map
  const initializeMap = () => {
    try {
      const mapElement = document.getElementById(mapContainerId.current);
      
      if (!mapElement) {
        console.error("Map container not found:", mapContainerId.current);
        return;
      }
      
      if (!window.L) {
        console.error("Leaflet not loaded");
        return;
      }
      
      // Create map instance
      const map = window.L.map(mapContainerId.current, {
        // Add better mobile touch support
        tap: true,
        tapTolerance: 15
      }).setView([40.7282, -74.0776], 2);
      
      // Add tile layer
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);
      
      leafletMapRef.current = map;
      setMapLoaded(true);
      
      // Force a resize after initialization to fix any size issues
      setTimeout(() => {
        if (map) {
          map.invalidateSize();
        }
      }, 500);

      // Add resize event listener to handle map size changes
      const handleResize = () => {
        if (map) {
          map.invalidateSize();
        }
      };
      
      window.addEventListener('resize', handleResize);
      
      // Return cleanup function
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    } catch (err) {
      console.error("Error initializing map:", err);
    }
  };

  // Initialize the map only once
  useEffect(() => {
    // Only load Leaflet if not already loaded
    if (!mapLoaded && !leafletMapRef.current) {
      loadLeafletResources();
    }

    // Clean up on component unmount
    return cleanupLeaflet;
  }, []);
  
  // Update markers when transactions change
  useEffect(() => {
    if (mapLoaded && leafletMapRef.current && transactions && window.L) {
      // Force a map resize to ensure correct display
      leafletMapRef.current.invalidateSize();
      
      // Remove existing markers
      markersRef.current.forEach(marker => {
        if (marker && marker.remove) {
          marker.remove();
        }
      });
      markersRef.current = [];
      
      // Create new markers
      const newMarkers = [];
      const validLocations = [];
      
      transactions.forEach(tx => {
        if (tx.location_data && tx.location_data.latitude && tx.location_data.longitude) {
          try {
            // Convert latitude/longitude to numbers to avoid errors
            const lat = parseFloat(tx.location_data.latitude);
            const lng = parseFloat(tx.location_data.longitude);
            
            // Skip if invalid coordinates
            if (isNaN(lat) || isNaN(lng)) return;
            
            // Skip if coordinates are out of range
            if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return;
            
            // Add to valid locations for bounds
            validLocations.push([lat, lng]);
            
            // Determine marker color based on transaction risk
            const markerColor = tx.prediction && tx.prediction.includes('FRAUD') ? 'red' : 
                              tx.prediction && tx.prediction.includes('HIGH_RISK') ? 'orange' : 
                              tx.prediction && tx.prediction.includes('NEEDS_REVIEW') ? 'yellow' : 
                              'green';
            
            // Create custom marker icon
            const markerIcon = window.L.divIcon({
              className: 'custom-marker',
              html: `<div style="width: 16px; height: 16px; border-radius: 50%; background-color: ${markerColor}; border: 2px solid white;"></div>`,
              iconSize: [20, 20],
              iconAnchor: [10, 10]
            });
            
            // Create marker
            const marker = window.L.marker(
              [lat, lng], 
              { icon: markerIcon }
            ).addTo(leafletMapRef.current);
            
            // Format amount safely
            const amount = tx.transaction_data && tx.transaction_data.amount && 
                          typeof tx.transaction_data.amount === 'number' ? 
                          tx.transaction_data.amount.toLocaleString() : '0';
            
            // Add popup with transaction details
            marker.bindPopup(`
              <div class="min-w-[200px]">
                <h3 class="m-0 mb-1.5">${tx.prediction || 'Unknown'}</h3>
                <p class="m-0 mb-0.5"><strong>Amount:</strong> $${amount}</p>
                <p class="m-0 mb-0.5"><strong>Type:</strong> ${tx.transaction_data?.type || 'Unknown'}</p>
                <p class="m-0 mb-0.5"><strong>Location:</strong> ${tx.location_data.city || 'Unknown'}, ${tx.location_data.region || 'Unknown'}, ${tx.location_data.country || 'Unknown'}</p>
                ${tx.location_data.is_vpn || tx.location_data.is_proxy ? 
                  '<p class="m-0 text-red-600"><strong>VPN/Proxy detected</strong></p>' : ''}
              </div>
            `);
            
            newMarkers.push(marker);
          } catch (err) {
            console.error("Error creating marker:", err);
          }
        }
      });
      
      markersRef.current = newMarkers;
      
      // Adjust map view to fit markers if there are any
      if (validLocations.length > 0) {
        try {
          // Check if we have at least 2 distinct locations
          const uniqueLocations = new Set(validLocations.map(loc => `${loc[0]},${loc[1]}`));
          
          if (uniqueLocations.size >= 2) {
            // Multiple distinct locations, create bounds
            const bounds = window.L.latLngBounds(validLocations);
            leafletMapRef.current.fitBounds(bounds, { padding: [50, 50] });
          } else {
            // Only one location, just center on it
            const center = validLocations[0];
            leafletMapRef.current.setView(center, 12);
          }
        } catch (err) {
          console.error("Error adjusting map view:", err);
          
          // Fallback to default view if bounds fails
          leafletMapRef.current.setView([40.7282, -74.0776], 2);
        }
      }
    }
  }, [mapLoaded, transactions]);

  return (
    <div id={mapContainerId.current} className="h-full w-full rounded-lg overflow-hidden">
      {!mapLoaded && (
        <div className="h-full flex justify-center items-center bg-gray-50 text-blue-500 text-base">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-3"></div>
            <span>Loading map...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default LocationMap;