import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useDisasterData } from '../hooks/useDisasterData';
import * as THREE from 'three';

const DisasterMarker = ({ position, type, intensity, data }) => {
  const meshRef = useRef();
  const ringRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 1.5;
      const pulseScale = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.3;
      meshRef.current.scale.setScalar(hovered ? pulseScale * 1.5 : pulseScale);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.5;
      ringRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  const getColor = () => {
    switch (type) {
      case 'earthquake': return '#ff6b35';
      case 'flood': return '#4ecdc4';
      case 'wildfire': return '#ff9500';
      case 'storm': return '#a855f7';
      case 'weather': return '#06b6d4';
      default: return '#ef4444';
    }
  };

  const getEmissiveColor = () => {
    switch (type) {
      case 'earthquake': return '#ff3300';
      case 'flood': return '#00cccc';
      case 'wildfire': return '#ff6600';
      case 'storm': return '#8833ff';
      case 'weather': return '#0099cc';
      default: return '#cc0000';
    }
  };

  return (
    <group position={position}>
      <mesh 
        ref={meshRef} 
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial 
          color={getColor()} 
          emissive={getEmissiveColor()}
          emissiveIntensity={0.3}
          transparent 
          opacity={0.9}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
      
      <mesh ref={ringRef}>
        <ringGeometry args={[0.12, 0.18, 32]} />
        <meshBasicMaterial 
          color={getColor()} 
          transparent 
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      <pointLight 
        color={getColor()} 
        intensity={intensity * 0.8} 
        distance={2} 
        decay={2}
      />
      
      {intensity > 2 && (
        <mesh>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshBasicMaterial 
            color={getColor()} 
            transparent 
            opacity={0.1}
            wireframe
          />
        </mesh>
      )}
    </group>
  );
};

const Scene = ({ selectedCountry, countries }) => {
  const globeRef = useRef();
  const atmosphereRef = useRef();
  const { earthquakes, weatherAlerts, wildfires } = useDisasterData();
  const { camera } = useThree();
  const [focusTarget, setFocusTarget] = useState(null);
  
  // Update focus target when country is selected
  useEffect(() => {
    if (selectedCountry) {
      const country = countries.find(c => c.name === selectedCountry);
      if (country) {
        const phi = (90 - country.lat) * (Math.PI / 180);
        const theta = (country.lng + 180) * (Math.PI / 180);
        const x = -(2.5 * Math.sin(phi) * Math.cos(theta));
        const z = 2.5 * Math.sin(phi) * Math.sin(theta);
        const y = 2.5 * Math.cos(phi);
        setFocusTarget({ x, y, z });
      }
    } else {
      setFocusTarget(null);
    }
  }, [selectedCountry, countries]);
  
  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.003;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += 0.001;
      atmosphereRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
    
    // Camera movement - focus on selected country or default orbit
    if (focusTarget) {
      // Smooth transition to focus target
      camera.position.x += (focusTarget.x - camera.position.x) * 0.02;
      camera.position.y += (focusTarget.y - camera.position.y) * 0.02;
      camera.position.z += (focusTarget.z - camera.position.z) * 0.02;
      camera.lookAt(0, 0, 0);
    } else {
      // Default orbital movement
      const targetX = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
      const targetZ = 3 + Math.cos(state.clock.elapsedTime * 0.1) * 0.3;
      camera.position.x += (targetX - camera.position.x) * 0.02;
      camera.position.y += (0 - camera.position.y) * 0.02;
      camera.position.z += (targetZ - camera.position.z) * 0.02;
      camera.lookAt(0, 0, 0);
    }
  });

  const disasterData = useMemo(() => {
    const data = [];
    
    const latLngTo3D = (lat, lng, radius = 1.02) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      return [x, y, z];
    };
    
    // Filter disasters by selected country if one is selected
    const filterByCountry = (disaster) => {
      if (!selectedCountry) return true;
      return disaster.country?.toLowerCase().includes(selectedCountry.toLowerCase()) ||
             disaster.location?.toLowerCase().includes(selectedCountry.toLowerCase());
    };
    
    earthquakes.filter(filterByCountry).slice(0, 8).forEach((eq, index) => {
      const position = eq.latitude && eq.longitude 
        ? latLngTo3D(eq.latitude, eq.longitude)
        : latLngTo3D((Math.random() - 0.5) * 180, (Math.random() - 0.5) * 360);
      
      data.push({
        id: `eq_${index}`,
        type: 'earthquake',
        position,
        intensity: eq.severity === 'high' ? 4 : eq.severity === 'medium' ? 3 : 2.2,
        data: eq
      });
    });
    
    wildfires.filter(filterByCountry).slice(0, 5).forEach((fire, index) => {
      const position = fire.latitude && fire.longitude 
        ? latLngTo3D(fire.latitude, fire.longitude)
        : latLngTo3D((Math.random() - 0.5) * 180, (Math.random() - 0.5) * 360);
      
      data.push({
        id: `fire_${index}`,
        type: 'wildfire',
        position,
        intensity: fire.severity === 'high' ? 3.5 : 2.8,
        data: fire
      });
    });
    
    weatherAlerts.filter(filterByCountry).slice(0, 5).forEach((alert, index) => {
      const position = alert.latitude && alert.longitude 
        ? latLngTo3D(alert.latitude, alert.longitude)
        : latLngTo3D((Math.random() - 0.5) * 180, (Math.random() - 0.5) * 360);
      
      data.push({
        id: `alert_${index}`,
        type: 'weather',
        position,
        intensity: alert.severity === 'high' ? 3.2 : 2.5,
        data: alert
      });
    });
    
    return data;
  }, [earthquakes, weatherAlerts, wildfires, selectedCountry]);

  return (
    <>
      <ambientLight intensity={0.4} color="#404080" />
      <directionalLight position={[10, 10, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-10, -10, -5]} intensity={0.3} color="#4080ff" />
      
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[1.3, 64, 64]} />
        <meshBasicMaterial
          color="#1e40af"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
      
      <group ref={globeRef}>
        <mesh>
          <sphereGeometry args={[1, 128, 128]} />
          <meshStandardMaterial
            color="#0f172a"
            roughness={0.8}
            metalness={0.2}
            emissive="#1e293b"
            emissiveIntensity={0.1}
          />
        </mesh>
        
        <mesh>
          <sphereGeometry args={[1.01, 64, 32]} />
          <meshBasicMaterial
            color="#334155"
            wireframe
            transparent
            opacity={0.2}
          />
        </mesh>
        
        <mesh>
          <sphereGeometry args={[0.95, 32, 32]} />
          <meshBasicMaterial
            color="#1e293b"
            transparent
            opacity={0.8}
          />
        </mesh>
        
        {disasterData.map((disaster) => (
          <DisasterMarker
            key={disaster.id}
            position={disaster.position}
            type={disaster.type}
            intensity={disaster.intensity}
            data={disaster.data}
          />
        ))}
        
        {/* Country highlight markers */}
        {selectedCountry && countries.map((country) => {
          if (country.name === selectedCountry) {
            const phi = (90 - country.lat) * (Math.PI / 180);
            const theta = (country.lng + 180) * (Math.PI / 180);
            const x = -(1.05 * Math.sin(phi) * Math.cos(theta));
            const z = 1.05 * Math.sin(phi) * Math.sin(theta);
            const y = 1.05 * Math.cos(phi);
            const position = [x, y, z];
            
            return (
              <mesh key={`country-${country.name}`} position={position}>
                <sphereGeometry args={[0.03, 16, 16]} />
                <meshBasicMaterial 
                  color="#00ff88" 
                  transparent 
                  opacity={0.8}
                />
                <pointLight color="#00ff88" intensity={1} distance={0.5} />
              </mesh>
            );
          }
          return null;
        })}
        
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.4, 1.42, 64]} />
          <meshBasicMaterial
            color="#3b82f6"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
        
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <ringGeometry args={[1.5, 1.52, 64]} />
          <meshBasicMaterial
            color="#8b5cf6"
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </>
  );
};

const Globe3D = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const countries = [
    { name: 'India', lat: 20.5937, lng: 78.9629 },
    { name: 'Japan', lat: 36.2048, lng: 138.2529 },
    { name: 'USA', lat: 37.0902, lng: -95.7129 },
    { name: 'Indonesia', lat: -0.7893, lng: 113.9213 },
    { name: 'Turkey', lat: 38.9637, lng: 35.2433 },
    { name: 'China', lat: 35.8617, lng: 104.1954 },
    { name: 'Australia', lat: -25.2744, lng: 133.7751 },
    { name: 'Brazil', lat: -14.2350, lng: -51.9253 },
    { name: 'Mexico', lat: 23.6345, lng: -102.5528 },
    { name: 'Canada', lat: 56.1304, lng: -106.3468 },
    { name: 'Russia', lat: 61.5240, lng: 105.3188 },
    { name: 'Chile', lat: -35.6751, lng: -71.5430 }
  ];

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCountrySelect = (country) => {
    setSelectedCountry(country.name);
    setSearchTerm(country.name);
    setShowSearch(false);
  };

  return (
    <div className="w-full h-full relative overflow-hidden rounded-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 opacity-50" />
      

      <Canvas 
        camera={{ position: [0, 0, 3], fov: 75 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
      >
        <fog attach="fog" args={['#0f172a', 2, 8]} />
        <Scene selectedCountry={selectedCountry} countries={countries} />
      </Canvas>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none" />
    </div>
  );
};

export default Globe3D;
