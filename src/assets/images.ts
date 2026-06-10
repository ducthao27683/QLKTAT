import bgImage from './bg.png';
import bgLoginImage from './bgLog.jpg';
import avatarImage from './avatar.png';
import csdlImage from './csdl.jpg';
import nguonImage from './nguon.jpg';
import luoiImage from './sodo.jpg';
import smisImage from './smis.jpg';
import modulesImage from './Modules.png';

export { bgImage, bgLoginImage, avatarImage, csdlImage, nguonImage, luoiImage, smisImage, modulesImage };

// Placeholder base64 images to prevent build errors.
// Please replace these with actual imports once you upload the files to src/assets/


const generateModuleImage = (color1: string, color2: string) => {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23${color1}'/%3E%3Cstop offset='100%25' stop-color='%23${color2}'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)'/%3E%3Cpath d='M0 300 L 100 150 L 200 250 L 300 100 L 400 200 L 400 300 Z' fill='%23ffffff' opacity='0.1'/%3E%3C/svg%3E`;
};
 
export const moduleImages: Record<string, string> = {
  m1: generateModuleImage('3b82f6', '1d4ed8'),
  m2: generateModuleImage('10b981', '047857'),
  m3: generateModuleImage('f59e0b', 'b45309'),
  m4: generateModuleImage('ef4444', 'b91c1c'),
  m5: generateModuleImage('8b5cf6', '6d28d9'),
  m6: generateModuleImage('06b6d4', '0e7490'),
  m7: generateModuleImage('f43f5e', 'be123c'),
  m8: generateModuleImage('6366f1', '4338ca'),
  m9: generateModuleImage('14b8a6', '0f766e'),
  m10: generateModuleImage('84cc16', '4d7c0f'),
};
