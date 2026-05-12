import { avatarImage, moduleImages, csdlImage, nguonImage, luoiImage, smisImage } from './assets/images';

export type Module = {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
};

export type UserConfig = {
  username: string;
  fullName: string;
  department: string;
  avatarUrl: string;
  mainModuleIds: string[];
  secondaryModuleIds: string[];
};

export const ALL_MODULES: Module[] = [
  { id: 'm1', title: 'CSDL-MT', subtitle: 'CSDL môi trường', imageUrl: csdlImage },
  { id: 'm2', title: 'PMIS-Nguồn', subtitle: 'QLKT nguồn điện', imageUrl: nguonImage },
  { id: 'm3', title: 'PMIS-Lưới', subtitle: 'QLKT lưới điện', imageUrl: luoiImage },
  { id: 'm4', title: 'SMIS', subtitle: 'Quản lý an toàn', imageUrl: smisImage },
  { id: 'm5', title: 'OMS', subtitle: 'Quản lý thông tin mất điện', imageUrl: moduleImages.m5 },
  { id: 'm6', title: 'THỦY VĂN', subtitle: 'Tổng hợp thủy văn, thủy điện', imageUrl: moduleImages.m6 },
  { id: 'm7', title: 'DASHBOARD', subtitle: 'CBCNV tổng hợp thông tin', imageUrl: moduleImages.m7 },
  { id: 'm8', title: 'QUẢN TRỊ EVN', subtitle: 'Quản trị PMIS toàn Tập đoàn', imageUrl: moduleImages.m8 },
  { id: 'm9', title: 'TRÍCH XUẤT', subtitle: 'Trích xuất dữ liệu tùy chỉnh', imageUrl: moduleImages.m9 },
  { id: 'm10', title: 'ETMS', subtitle: 'QLKT hệ thống thông tin', imageUrl: moduleImages.m10 },
];

export const INITIAL_USER_CONFIG: UserConfig = {
  username: 'hungyenpc\\chiennv',
  fullName: 'Nguyễn Văn Chiến',
  department: 'Phó phòng - Phòng Kỹ thuật An toàn',
  avatarUrl: avatarImage,
  mainModuleIds: ['m1', 'm2', 'm3', 'm4'],
  secondaryModuleIds: ['m5', 'm6', 'm7', 'm8', 'm9', 'm10'],
};
