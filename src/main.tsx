import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LazyMotion, MotionConfig } from 'framer-motion';
import App from './App';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LazyMotion features={() => import('./motionFeatures').then(module => module.default)} strict>
      <MotionConfig reducedMotion="user"><App /></MotionConfig>
    </LazyMotion>
  </StrictMode>,
);
