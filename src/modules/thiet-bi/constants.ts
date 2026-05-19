export const VOLTAGES = ["500kV", "220kV", "110kV", "<110kV"];

export const MOCK_CONG_TRINH = Array.from({length: 10}, (_, i) => `Công trình lưới điện ${i+1} - Hưng Yên`);
export const MOCK_DUONG_DAY = Array.from({length: 10}, (_, i) => `Đường dây 110kV lộ ${170 + i} Hưng Yên`);
export const MOCK_TRAM = Array.from({length: 10}, (_, i) => `Trạm biến áp 110kV E28.${i+1}`);
export const MOCK_VI_TRI = Array.from({length: 10}, (_, i) => `Vị trí cột số ${i+1} - ĐD 110kV`);
export const MOCK_NHANH_RE = Array.from({length: 10}, (_, i) => `Nhánh rẽ ${i+1} - KCN Thăng Long II`);
export const MOCK_THIET_BI = Array.from({length: 10}, (_, i) => `Máy biến áp T${i+1} - 63MVA`);

export const DEVICE_TYPE_COLORS: Record<string, string> = {
  'Đơn vị': 'bg-blue-100 text-blue-700 border-blue-200',
  'Trạm': 'bg-orange-100 text-orange-700 border-orange-200',
  'Đường dây': 'bg-green-100 text-green-700 border-green-200',
  'Ngăn lộ': 'bg-purple-100 text-purple-700 border-purple-200',
  'Nút': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  'Móng cột': 'bg-amber-100 text-amber-700 border-amber-200',
  'Sứ': 'bg-teal-100 text-teal-700 border-teal-200',
  'Xà': 'bg-rose-100 text-rose-700 border-rose-200',
  'default': 'bg-gray-100 text-gray-700 border-gray-200'
};
