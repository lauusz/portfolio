import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { skills } from '../constants/data';

const SkillSphere = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const hoveredSkillRef = useRef<string | null>(null);

  const mousePosRef = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const previousMouse = useRef({ x: 0, y: 0 });
  const rotationVelocity = useRef({ x: 0.002, y: 0.003 });
  const isVisibleRef = useRef(true);
  const isTabActiveRef = useRef(true);
  const rafRef = useRef<number>(0);

  const setHovered = useCallback((skill: string | null) => {
    hoveredSkillRef.current = skill;
    setHoveredSkill(skill);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isTouch = window.matchMedia('(hover: none)').matches;
    const width = container.clientWidth;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'low-power' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    const radius = 2.2;
    const skillNodes: { mesh: THREE.Sprite; label: string; originalScale: THREE.Vector3 }[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5));

    // Create text sprites once, reuse
    skills.forEach((skill, i) => {
      const y = 1 - (i / (skills.length - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * r * radius;
      const z = Math.sin(theta) * r * radius;
      const yPos = y * radius;

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      canvas.width = 256;
      canvas.height = 64;
      ctx.fillStyle = 'rgba(0, 240, 255, 0.9)';
      ctx.font = 'bold 24px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(skill.name, 128, 32);

      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.8,
      });
      const sprite = new THREE.Sprite(material);
      sprite.position.set(x, yPos, z);
      const scale = new THREE.Vector3(1.2, 0.3, 1);
      sprite.scale.copy(scale);

      sphereGroup.add(sprite);
      skillNodes.push({
        mesh: sprite,
        label: skill.name,
        originalScale: scale.clone(),
      });
    });

    // Connecting lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.04,
    });
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions: number[] = [];

    for (let i = 0; i < skillNodes.length; i++) {
      for (let j = i + 1; j < skillNodes.length; j++) {
        const dist = skillNodes[i].mesh.position.distanceTo(skillNodes[j].mesh.position);
        if (dist < 1.8) {
          linePositions.push(
            skillNodes[i].mesh.position.x, skillNodes[i].mesh.position.y, skillNodes[i].mesh.position.z,
            skillNodes[j].mesh.position.x, skillNodes[j].mesh.position.y, skillNodes[j].mesh.position.z,
          );
        }
      }
    }

    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    sphereGroup.add(lines);

    // Center glow
    const glowGeo = new THREE.SphereGeometry(0.3, 8, 8);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.08,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    sphereGroup.add(glow);

    // Raycaster
    const raycaster = new THREE.Raycaster();
    let frameCount = 0;

    // Animation loop
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);

      // Skip if not visible or tab hidden
      if (!isVisibleRef.current || !isTabActiveRef.current) return;

      // Skip every 2nd frame (30fps)
      frameCount++;
      if (frameCount % 2 !== 0) return;

      sphereGroup.rotation.y += rotationVelocity.current.y;
      sphereGroup.rotation.x += rotationVelocity.current.x;

      if (!isDragging.current) {
        rotationVelocity.current.x *= 0.995;
        rotationVelocity.current.y *= 0.995;
        if (Math.abs(rotationVelocity.current.y) < 0.002) rotationVelocity.current.y = 0.002;
      }

      // Raycast only every 5th frame for performance
      if (!isTouch && frameCount % 10 === 0 && mousePosRef.current.x !== 0) {
        const mouse = new THREE.Vector2(
          (mousePosRef.current.x / width) * 2 - 1,
          -(mousePosRef.current.y / height) * 2 + 1,
        );
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(skillNodes.map((n) => n.mesh));

        if (intersects.length > 0) {
          const hit = intersects[0].object as THREE.Sprite;
          const node = skillNodes.find((n) => n.mesh === hit);
          if (node) {
            setHovered(node.label);
            hit.material.opacity = 1;
            hit.scale.set(1.5, 0.375, 1);
          }
        } else if (hoveredSkillRef.current) {
          setHovered(null);
          skillNodes.forEach((n) => {
            n.mesh.material.opacity = 0.8;
            n.mesh.scale.copy(n.originalScale);
          });
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Mouse events
    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      previousMouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mousePosRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };

      if (isDragging.current) {
        const deltaX = e.clientX - previousMouse.current.x;
        const deltaY = e.clientY - previousMouse.current.y;
        rotationVelocity.current.y = deltaX * 0.001;
        rotationVelocity.current.x = deltaY * 0.001;
        previousMouse.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    if (!isTouch) {
      container.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    // IntersectionObserver — pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0, rootMargin: '100px' },
    );
    observer.observe(container);

    // Visibility API
    const handleVisibility = () => { isTabActiveRef.current = document.visibilityState === 'visible'; };
    document.addEventListener('visibilitychange', handleVisibility);

    // Resize
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('visibilitychange', handleVisibility);
      observer.disconnect();
      renderer.dispose();
      skillNodes.forEach((n) => {
        n.mesh.material.map?.dispose();
        n.mesh.material.dispose();
      });
      lineGeometry.dispose();
      lineMaterial.dispose();
      glowGeo.dispose();
      glowMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [setHovered]);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="w-full h-[400px] md:h-[500px]"
        style={{ touchAction: 'none' }}
      />
      {hoveredSkill && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-sm text-primary bg-void border border-primary px-4 py-2">
          {'>'} {hoveredSkill}
        </div>
      )}
      <div className="absolute top-4 right-4 font-mono text-xs text-muted">
        <span className="text-primary">{'>'}</span> drag to rotate
      </div>
    </div>
  );
};

export default SkillSphere;
