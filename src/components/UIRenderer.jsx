import React from 'react';

// Component to render JSON UI structure as actual React components
export default function UIRenderer({ jsonData }) {
  const renderComponent = (component, index) => {
    if (!component || !component.type) return null;

    const { type, props = {}, children = [] } = component;
    const { modifier = {}, ...restProps } = props;

    // Build style object from modifier
    const style = {
      ...buildModifierStyles(modifier),
      ...buildPropsStyles(type, restProps)
    };

    // Render based on component type
    switch (type) {
      case 'Column':
        return (
          <div key={index} style={{ ...style, display: 'flex', flexDirection: 'column', ...buildArrangementStyles(props) }}>
            {children.map((child, i) => renderComponent(child, i))}
          </div>
        );

      case 'Row':
        return (
          <div key={index} style={{ ...style, display: 'flex', flexDirection: 'row', ...buildArrangementStyles(props) }}>
            {children.map((child, i) => renderComponent(child, i))}
          </div>
        );

      case 'Box':
        return (
          <div key={index} style={{ ...style, position: 'relative', display: 'flex', ...buildAlignmentStyles(props) }}>
            {children.map((child, i) => renderComponent(child, i))}
          </div>
        );

      case 'Card':
        return (
          <div key={index} style={{ 
            ...style, 
            borderRadius: parseShape(props.shape),
            backgroundColor: props.containerColor || '#fff',
            border: props.border ? `${props.border.width}px solid ${props.border.color}` : 'none',
            boxShadow: props.elevation ? `0 ${props.elevation}px ${props.elevation * 2}px rgba(0,0,0,0.2)` : 'none',
            overflow: 'hidden'
          }}>
            {children.map((child, i) => renderComponent(child, i))}
          </div>
        );

      case 'Text':
        return (
          <span key={index} style={{ 
            ...style,
            fontSize: props.fontSize ? `${props.fontSize}px` : '16px',
            fontWeight: parseFontWeight(props.fontWeight),
            color: props.color || '#000',
            textAlign: props.textAlign || 'left',
            whiteSpace: 'pre-line'
          }}>
            {props.text}
          </span>
        );

      case 'Spacer':
        return (
          <div key={index} style={{ 
            width: props.width ? `${props.width}px` : 'auto',
            height: props.height ? `${props.height}px` : 'auto'
          }} />
        );

      case 'Button':
        return (
          <button key={index} style={{ 
            ...style,
            backgroundColor: props.containerColor || '#007bff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'scale(1.02)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)'; }}>
            {children.map((child, i) => renderComponent(child, i))}
          </button>
        );

      case 'Image':
        const imageSrc = getImageSource(props.source);
        return (
          <img 
            key={index} 
            src={imageSrc || 'https://via.placeholder.com/200'}
            alt={props.contentDescription || 'Image'}
            style={{ 
              ...style,
              objectFit: parseScaleType(props.scaleType),
              width: modifier.fillMaxSize ? '100%' : modifier.width ? `${modifier.width}px` : 'auto',
              height: modifier.fillMaxSize ? '100%' : modifier.height ? `${modifier.height}px` : 'auto'
            }} 
          />
        );

      case 'Component':
        return renderCustomComponent(props.name, props.properties, index);

      default:
        return null;
    }
  };

  // Helper functions
  const buildModifierStyles = (modifier) => {
    const styles = {};

    if (modifier.fillMaxSize) {
      styles.width = '100%';
      styles.height = '100%';
    }
    if (modifier.fillMaxWidth) {
      styles.width = `${modifier.fillMaxWidth * 100}%`;
    }
    if (modifier.width) styles.width = `${modifier.width}px`;
    if (modifier.height) styles.height = `${modifier.height}px`;
    
    if (modifier.padding) {
      const p = modifier.padding;
      styles.padding = p.all ? `${p.all}px` : 
        `${p.vertical || p.top || 0}px ${p.horizontal || p.right || 0}px ${p.vertical || p.bottom || 0}px ${p.horizontal || p.left || 0}px`;
    }
    
    if (modifier.margin) {
      const m = modifier.margin;
      styles.margin = m.all ? `${m.all}px` : 
        `${m.vertical || m.top || 0}px ${m.horizontal || m.right || m.start || 0}px ${m.vertical || m.bottom || 0}px ${m.horizontal || m.left || m.start || 0}px`;
    }

    if (modifier.background) styles.backgroundColor = modifier.background;
    if (modifier.rotation) styles.transform = `rotate(${modifier.rotation}deg)`;
    
    if (modifier.gradient) {
      const g = modifier.gradient;
      const direction = g.direction === 'vertical' ? '180deg' : '90deg';
      styles.background = `linear-gradient(${direction}, ${g.colors.join(', ')})`;
    }

    return styles;
  };

  const buildPropsStyles = (type, props) => {
    const styles = {};
    return styles;
  };

  const buildArrangementStyles = (props) => {
    const styles = {};
    
    if (props.verticalArrangement) {
      switch (props.verticalArrangement) {
        case 'center': styles.justifyContent = 'center'; break;
        case 'spaceEvenly': styles.justifyContent = 'space-evenly'; break;
        case 'spaceAround': styles.justifyContent = 'space-around'; break;
        case 'spaceBetween': styles.justifyContent = 'space-between'; break;
      }
    }
    
    if (props.horizontalArrangement) {
      switch (props.horizontalArrangement) {
        case 'center': styles.justifyContent = 'center'; break;
        case 'spaceEvenly': styles.justifyContent = 'space-evenly'; break;
        case 'spaceAround': styles.justifyContent = 'space-around'; break;
        case 'spaceBetween': styles.justifyContent = 'space-between'; break;
      }
    }
    
    if (props.horizontalAlignment) {
      switch (props.horizontalAlignment) {
        case 'centerHorizontally': styles.alignItems = 'center'; break;
        case 'start': styles.alignItems = 'flex-start'; break;
        case 'end': styles.alignItems = 'flex-end'; break;
      }
    }
    
    if (props.verticalAlignment) {
      switch (props.verticalAlignment) {
        case 'centerVertically': styles.alignItems = 'center'; break;
        case 'bottom': styles.alignItems = 'flex-end'; break;
        case 'top': styles.alignItems = 'flex-start'; break;
      }
    }

    return styles;
  };

  const buildAlignmentStyles = (props) => {
    const styles = {};
    
    if (props.contentAlignment) {
      switch (props.contentAlignment) {
        case 'center': styles.justifyContent = 'center'; styles.alignItems = 'center'; break;
        case 'bottomCenter': styles.justifyContent = 'center'; styles.alignItems = 'flex-end'; break;
        case 'topCenter': styles.justifyContent = 'center'; styles.alignItems = 'flex-start'; break;
      }
    }

    return styles;
  };

  const parseShape = (shape) => {
    if (!shape) return '0px';
    if (shape.includes('rounded_corners_')) {
      const values = shape.replace('rounded_corners_', '').split('_');
      return `${values[0]}px ${values[1]}px ${values[2]}px ${values[3]}px`;
    }
    if (shape.includes('rounded_')) {
      const value = shape.replace('rounded_', '');
      return `${value}px`;
    }
    return '0px';
  };

  const parseFontWeight = (weight) => {
    if (!weight) return 'normal';
    if (weight === 'bold') return 'bold';
    return 'normal';
  };

  const parseScaleType = (scaleType) => {
    switch (scaleType) {
      case 'fillBounds': return 'fill';
      case 'centerCrop': return 'cover';
      default: return 'contain';
    }
  };

  const getImageSource = (source) => {
    if (!source) return null;
    if (typeof source === 'string') return source;
    if (source.type === 'url') return source.value;
    if (source.type === 'res') return 'https://via.placeholder.com/400x300/3b82f6/ffffff?text=Image+Placeholder';
    return null;
  };

  const renderCustomComponent = (name, properties, index) => {
    switch (name) {
      case 'UserCard':
        return (
          <div key={index} style={{ 
            padding: '16px', 
            background: 'rgba(255,255,255,0.05)', 
            border: '1px solid rgba(255,255,255,0.1)', 
            borderRadius: '12px',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              background: properties.isOnline ? '#22c55e' : '#6b7280',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 'bold'
            }}>
              {properties.name.charAt(0)}
            </div>
            <div>
              <div style={{ fontWeight: 'bold', color: '#fff' }}>{properties.name}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>{properties.email}</div>
            </div>
            <div style={{ 
              marginLeft: 'auto', 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              background: properties.isOnline ? '#22c55e' : '#6b7280' 
            }} />
          </div>
        );

      case 'StatsCard':
        return (
          <div key={index} style={{ 
            padding: '20px', 
            background: 'rgba(255,255,255,0.05)', 
            border: '1px solid rgba(255,255,255,0.1)', 
            borderRadius: '12px',
            minWidth: '140px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>
              {properties.title}
            </div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: properties.color, marginBottom: '4px' }}>
              {properties.value}
            </div>
            <div style={{ fontSize: '14px', color: '#22c55e' }}>
              {properties.subtitle}
            </div>
          </div>
        );

      case 'ActionButton':
        const variants = {
          primary: { bg: '#3b82f6', color: '#fff' },
          secondary: { bg: 'rgba(255,255,255,0.1)', color: '#fff' },
          danger: { bg: '#ef4444', color: '#fff' }
        };
        const variant = variants[properties.variant] || variants.primary;
        const sizes = { small: '8px 12px', medium: '10px 16px', large: '12px 20px' };
        const size = sizes[properties.size] || sizes.medium;

        return (
          <button key={index} style={{ 
            padding: size,
            background: variant.bg,
            color: variant.color,
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            {properties.icon && <span>{properties.icon}</span>}
            {properties.text}
          </button>
        );

      default:
        return <div key={index}>Unknown component: {name}</div>;
    }
  };

  try {
    const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
    return (
      <div style={{ 
        width: '100%', 
        maxWidth: '400px', 
        margin: '0 auto',
        background: '#f8f9fa',
        minHeight: '600px',
        overflowY: 'auto',
        overflowX: 'hidden'
      }}>
        {renderComponent(data, 0)}
      </div>
    );
  } catch (error) {
    return (
      <div style={{ padding: '20px', color: '#ef4444', textAlign: 'center' }}>
        <strong>Error rendering UI:</strong>
        <pre style={{ marginTop: '10px', fontSize: '12px', textAlign: 'left' }}>{error.message}</pre>
      </div>
    );
  }
}
