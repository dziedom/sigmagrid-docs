import React, { useEffect, useRef } from 'react';
import styles from './ParticleBackground.module.css';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    const isMobile = window.innerWidth < 768;
    let animId;

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const gridSpacing = isMobile ? 60 : 40;
    const nodes = [];

    function rebuildGrid() {
      nodes.length = 0;
      const cols = Math.ceil(canvas.width / gridSpacing) + 1;
      const rows = Math.ceil(canvas.height / gridSpacing) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          nodes.push({
            x: c * gridSpacing,
            y: r * gridSpacing,
            baseOpacity: 0.04 + Math.random() * 0.04,
            phase: Math.random() * Math.PI * 2,
            speed: 0.3 + Math.random() * 0.4,
            pulse: Math.random() > 0.92,
          });
        }
      }
      return { cols, rows };
    }

    let { cols, rows } = rebuildGrid();

    // Data flow lines — simulated signal paths
    const flows = [];
    const flowCount = isMobile ? 3 : 6;
    for (let i = 0; i < flowCount; i++) {
      flows.push({
        startCol: Math.floor(Math.random() * cols),
        startRow: Math.floor(Math.random() * rows),
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.003,
        length: 3 + Math.floor(Math.random() * 5),
        direction: Math.random() > 0.5 ? 'h' : 'v',
      });
    }

    function draw(time) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = time * 0.001;

      for (const node of nodes) {
        const pulse = Math.sin(t * node.speed + node.phase) * 0.5 + 0.5;
        let opacity = node.baseOpacity + pulse * 0.03;

        if (node.pulse) {
          const glow = Math.sin(t * 1.5 + node.phase) * 0.5 + 0.5;
          opacity += glow * 0.15;
          ctx.fillStyle = `rgba(0, 212, 123, ${opacity})`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      for (const flow of flows) {
        flow.progress += flow.speed;
        if (flow.progress > 1) {
          flow.progress = 0;
          flow.startCol = Math.floor(Math.random() * cols);
          flow.startRow = Math.floor(Math.random() * rows);
          flow.direction = Math.random() > 0.5 ? 'h' : 'v';
        }

        const segmentProgress = flow.progress * flow.length;
        for (let s = 0; s < flow.length; s++) {
          const segOpacity = Math.max(0, 1 - Math.abs(s - segmentProgress) / 2) * 0.12;
          if (segOpacity <= 0) continue;

          let x, y;
          if (flow.direction === 'h') {
            x = (flow.startCol + s) * gridSpacing;
            y = flow.startRow * gridSpacing;
          } else {
            x = flow.startCol * gridSpacing;
            y = (flow.startRow + s) * gridSpacing;
          }

          ctx.fillStyle = `rgba(0, 212, 123, ${segOpacity})`;
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.heroBg} aria-hidden="true" />;
}
