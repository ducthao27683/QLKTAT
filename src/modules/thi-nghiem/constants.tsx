export const MOCK_TESTING_PLANS = [
  {
    id: 1,
    code: 'KH-TN-2026-001',
    title: 'Kế hoạch thí nghiệm định kỳ Trạm 110kV Phố Nối - Quý II/2026',
    type: 'Định kỳ',
    category: 'Kế hoạch',
    status: 'Đã duyệt',
    createdDate: '2026-04-10',
    startDate: '2026-05-15',
    endDate: '2026-05-30',
    creator: 'Nguyễn Kế Hoạch',
    approver: 'Phạm Duyệt Vốn',
    description: 'Thực hiện thí nghiệm định kỳ cho toàn bộ thiết bị ngăn lộ 110kV và MBA T1 Phố Nối.',
    devices: [
      { id: 'MBA-T1', name: 'Máy biến áp T1', type: 'Máy biến áp', status: 'Đã xong', nextDue: '2026-05-15' },
      { id: 'MC-171', name: 'Máy cắt 171', type: 'Máy cắt', status: 'Chưa làm', nextDue: '2026-05-20' },
      { id: 'TI-171', name: 'Biến dòng 171', type: 'Biến dòng', status: 'Chưa làm', nextDue: '2026-05-20' }
    ],
    outage: {
      required: true,
      startTime: '2026-05-15T08:00',
      endTime: '2026-05-15T17:00',
      scope: 'Ngừng cung cấp điện phía 110kV trạm Phố Nối',
      attachments: [{ name: 'Phuong_an_thi_cong.pdf', size: '1.2 MB' }]
    },
    history: [
      { id: 1, type: 'Lập lần 1', user: 'Nguyễn Kế Hoạch', time: '2026-04-10 08:30', note: 'Tạo kế hoạch thí nghiệm định kỳ' },
      { id: 2, type: 'Trình duyệt lần 1', user: 'Nguyễn Kế Hoạch', time: '2026-04-10 09:00', note: 'Kính trình ban lãnh đạo phê duyệt' },
      { id: 3, type: 'Duyệt lần 1', user: 'Phạm Duyệt Vốn', time: '2026-04-11 10:00', note: 'Đồng ý thực hiện' },
    ]
  },
  {
    id: 2,
    code: 'KH-TN-2026-042',
    title: 'Thí nghiệm kiểm định thiết bị sau sự cố đường dây 171 E3.1',
    type: 'Sau sự cố',
    category: 'Kế hoạch',
    status: 'Đang duyệt',
    createdDate: '2026-05-18',
    startDate: '2026-05-20',
    endDate: '2026-05-21',
    creator: 'Lê Văn Đo',
    approver: 'Trần Văn Duyệt',
    description: 'Kiểm tra đặc tính cách điện chuỗi sứ và phụ kiện sau sự cố phóng điện ngày 03/04.',
    devices: [
      { id: 'DD-110-171', name: 'Đường dây 110kV 171', type: 'Đường dây', status: 'Đang làm', nextDue: '2026-10-03' }
    ],
    outage: {
      required: true,
      startTime: '2026-05-20T09:30',
      endTime: '2026-05-20T12:00',
      scope: 'Cắt điện đường dây 171 E3.1'
    }
  },
  {
    id: 3,
    code: 'YC-TN-2026-005',
    title: 'Yêu cầu thí nghiệm đột xuất Máy biến áp T2',
    type: 'Đột xuất',
    category: 'Yêu cầu',
    status: 'Đang duyệt',
    createdDate: '2026-05-22',
    startDate: '2026-05-25',
    endDate: '2026-05-26',
    creator: 'Hoàng Văn Yêu',
    approver: 'Chưa duyệt',
    description: 'Phát hiện nhiệt độ dầu tăng cao bất thường, cần thí nghiệm phân tích khí hòa tan (DGA).',
    devices: [
      { id: 'MBA-T2', name: 'Máy biến áp T2', type: 'Máy biến áp', status: 'Chưa thực hiện', nextDue: '2026-08-20' }
    ],
    outage: {
      required: false,
      scope: 'Lấy mẫu dầu trực tiếp'
    }
  },
  {
    id: 4,
    code: 'YC-TN-2026-006',
    title: 'Yêu cầu kiểm định đồng hồ đo lường Ngăn lộ 172',
    type: 'Kiểm định',
    category: 'Yêu cầu',
    status: 'Đang lập',
    createdDate: '2026-05-24',
    startDate: '2026-06-01',
    endDate: '2026-06-02',
    creator: 'Vũ Văn Mới',
    approver: '-',
    description: 'Đến hạn kiểm định định kỳ các hiệu thiết bị đo lường bảo vệ.',
    devices: [
      { id: 'DH-172', name: 'Hệ thống đo lường 172', type: 'Thiết bị đo', status: 'Chưa thực hiện', nextDue: '2026-06-01' }
    ]
  }
];

export const MOCK_TESTING_CATALOG = [
  { id: 1, device: 'Máy biến áp T1 - TBA Phố Nối', lastTest: '2024-05-15', nextDue: '2026-05-15', interval: '24 tháng', status: 'Đến hạn', urgency: 'Cao' },
  { id: 2, device: 'Máy cắt 112 - TBA Khoái Châu', lastTest: '2023-06-01', nextDue: '2026-06-01', interval: '36 tháng', status: 'Sắp đến hạn', urgency: 'Trung bình' },
  { id: 3, device: 'Chống sét van Lộ 173', lastTest: '2025-04-12', nextDue: '2026-04-12', interval: '12 tháng', status: 'Quá hạn', urgency: 'Rất cao' },
  { id: 4, device: 'Máy biến áp T2 - TBA Gia Lâm', lastTest: '2024-08-20', nextDue: '2026-08-20', interval: '24 tháng', status: 'Bình thường', urgency: 'Thấp' }
];

export const MOCK_TESTING_DATA = [
  {
    id: 1,
    time: '2026-05-15 08:00',
    device: 'Máy biến áp T1 - TBA 110kV Phố Nối',
    type: 'Thí nghiệm định kỳ',
    status: 'Đã hoàn thành',
    team: 'Đội thí nghiệm 1 - TT Thí nghiệm điện',
    leader: 'Nguyễn Văn Kết',
    result: 'Đạt',
    project: 'Kế hoạch thí nghiệm định kỳ năm 2026',
    condition: 'Thời tiết nắng ráo, nhiệt độ 30°C, độ ẩm 65%',
    items: [
      { name: 'Đo điện trở cách điện cuộn dây', unit: 'MΩ', value: '2500', limit: '> 2000', eval: 'Đạt' },
      { name: 'Đo tỷ số biến', unit: '%', value: '0.05', limit: '< 0.5', eval: 'Đạt' },
      { name: 'Đo điện trở một chiều', unit: 'mΩ', value: '12.5', limit: '< 13.0', eval: 'Đạt' },
      { name: 'Thử nghiệm không tải', unit: 'A', value: '1.2', limit: '< 1.5', eval: 'Đạt' },
      { name: 'Phân tích hàm lượng ẩm trong dầu', unit: 'ppm', value: '15', limit: '< 20', eval: 'Đạt' },
      { name: 'Kiểm tra độ chọc thủng điện trường dầu', unit: 'kV', value: '55', limit: '> 50', eval: 'Đạt' },
      { name: 'Thử nghiệm tăng cao điện áp tần số công nghiệp', unit: 'kV', value: 'OK', limit: '38kV/1p', eval: 'Đạt' }
    ],
    images: ['https://picsum.photos/seed/test1/800/600', 'https://picsum.photos/seed/test2/800/600', 'https://picsum.photos/seed/test3/800/600', 'https://picsum.photos/seed/test4/800/600'],
    attachments: [{ name: 'Bien_ban_thi_nghiem_T1_2026.pdf', size: '2.5 MB' }, { name: 'Giay_chung_nhan_hieu_chuan.pdf', size: '1.1 MB' }],
    signing: [
      { role: 'Trưởng nhóm TN', name: 'Nguyễn Văn Kết', time: '15/05/2026 16:30', status: 'Đã ký' },
      { role: 'Đội trưởng TN', name: 'Trần Văn Duyệt', time: '15/05/2026 17:15', status: 'Đã ký' },
      { role: 'Phòng Kỹ thuật', name: 'Lê Văn Kiểm', time: '16/05/2026 08:45', status: 'Đã ký' },
      { role: 'Lãnh đạo đơn vị', name: 'Phạm Thế Ký', time: '16/05/2026 10:20', status: 'Đã ký' }
    ]
  },
  {
    id: 2,
    time: '2026-05-20 09:30',
    device: 'Đường dây 110kV 171 E3.1',
    type: 'Thí nghiệm sau sự cố',
    status: 'Đang thực hiện',
    team: 'Đội thí nghiệm 2 - TT Thí nghiệm điện',
    leader: 'Lê Văn Đo',
    result: 'Chưa có',
    project: 'Xử lý sự cố lộ 171 ngày 03/04',
    condition: 'Thời tiết có mây, nhiệt độ 28°C',
    items: [],
    images: [],
    attachments: [],
    signing: []
  },
  {
    id: 3,
    time: '2026-05-22 14:00',
    device: 'Máy cắt 112 - TBA Khoái Châu',
    type: 'Thí nghiệm định kỳ',
    status: 'Chưa đạt',
    team: 'Đội thí nghiệm 1 - TT Thí nghiệm điện',
    leader: 'Trần Văn Chỉnh',
    result: 'Không đạt',
    project: 'Kế hoạch thí nghiệm định kỳ năm 2026',
    condition: 'Nhiệt độ 32°C, độ ẩm 60%',
    items: [
      { name: 'Đo điện trở tiếp xúc', unit: 'μΩ', value: '85', limit: '< 50', eval: 'Không đạt' },
      { name: 'Thời gian đóng/cắt', unit: 'ms', value: '45/38', limit: '<50 / <40', eval: 'Đạt' }
    ],
    images: ['https://picsum.photos/seed/test5/800/600'],
    attachments: [{ name: 'BB_TN_MC112.pdf', size: '1.5 MB' }],
    signing: [
      { role: 'Trưởng nhóm TN', name: 'Trần Văn Chỉnh', time: '22/05/2026 16:00', status: 'Đã ký' },
      { role: 'Phòng Kỹ thuật', name: 'Lê Văn Kiểm', time: '-', status: 'Từ chối duyệt' }
    ]
  }
];
