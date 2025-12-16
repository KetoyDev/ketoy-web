import React from 'react';
import './FloatingLogos.css';

export default function FloatingLogos() {
  // Development and coding related logos/icons
  const logos = [
    // React
    { icon: '⚛️', name: 'React', gradient: 'linear-gradient(135deg, #61DAFB, #21A1F1)' },
    // JavaScript
    { icon: '🟨', name: 'JavaScript', gradient: 'linear-gradient(135deg, #F7DF1E, #F0DB4F)' },
    // TypeScript
    { icon: 'TS', name: 'TypeScript', gradient: 'linear-gradient(135deg, #3178C6, #235A97)' },
    // Node.js
    { icon: '🟢', name: 'Node', gradient: 'linear-gradient(135deg, #68A063, #43853D)' },
    // Python
    { icon: '🐍', name: 'Python', gradient: 'linear-gradient(135deg, #3776AB, #FFD43B)' },
    // Git
    { icon: '📦', name: 'Git', gradient: 'linear-gradient(135deg, #F05032, #E84D31)' },
    // Docker
    { icon: '🐳', name: 'Docker', gradient: 'linear-gradient(135deg, #2496ED, #1D63ED)' },
    // VS Code
    { icon: '💻', name: 'VSCode', gradient: 'linear-gradient(135deg, #007ACC, #005A9E)' },
    // HTML5
    { icon: '🌐', name: 'HTML', gradient: 'linear-gradient(135deg, #E34F26, #F06529)' },
    // CSS3
    { icon: '🎨', name: 'CSS', gradient: 'linear-gradient(135deg, #1572B6, #33A9DC)' },
    // MongoDB
    { icon: '🍃', name: 'MongoDB', gradient: 'linear-gradient(135deg, #47A248, #4DB33D)' },
    // AWS
    { icon: '☁️', name: 'Cloud', gradient: 'linear-gradient(135deg, #FF9900, #EC7211)' },
    // API
    { icon: '🔌', name: 'API', gradient: 'linear-gradient(135deg, #6366F1, #4F46E5)' },
    // Database
    { icon: '💾', name: 'Database', gradient: 'linear-gradient(135deg, #336791, #235A97)' },
    // Terminal
    { icon: '⌨️', name: 'Terminal', gradient: 'linear-gradient(135deg, #4EAA25, #66BB6A)' },
    // Code
    { icon: '</>', name: 'Code', gradient: 'linear-gradient(135deg, #8B5CF6, #7C3AED)' },
    // Mountain/Logo
    { icon: '🗻', name: 'Mountain', gradient: 'linear-gradient(135deg, #ff8c42, #d65db1, #845ec2)' },
  ];

  // Create multiple instances of logos with different animations
  const createLogoInstances = () => {
    const instances = [];
    const totalLogos = 40; // More logos but smaller
    
    for (let i = 0; i < totalLogos; i++) {
      const logo = logos[i % logos.length];
      instances.push({
        ...logo,
        key: `${logo.name}-${i}`,
        delay: Math.random() * 25,
        left: Math.random() * 95 + 2,
        duration: 18 + Math.random() * 15,
        size: 35 + Math.random() * 25
      });
    }
    
    return instances;
  };

  const logoInstances = createLogoInstances();

  return (
    <div className="floating-logos-container">
      {logoInstances.map((logo) => (
        <div
          key={logo.key}
          className="floating-logo"
          style={{
            '--delay': `${logo.delay}s`,
            '--duration': `${logo.duration}s`,
            '--size': `${logo.size}px`,
            left: `${logo.left}%`
          }}
        >
          <div className="logo-content" style={{ background: logo.gradient }}>
            <span className="logo-icon">{logo.icon}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
