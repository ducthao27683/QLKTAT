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
    workTypes: ['Thí nghiệm', 'Kiểm định'],
    requestType: 'VTTB theo công trình',
    location: 'Trạm 110kV Phố Nối (E3.1)',
    contactPerson: 'Nguyễn Văn A',
    contactPhone: '0912345678',
    unit: 'Điện lực Thành phố Hưng Yên',
    department: 'Phòng Kỹ thuật',
    cycle: 'Định kỳ 2 năm',
    project: 'Công trình cải tạo trạm E3.1',
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
  },
  {
    id: 5,
    code: 'KH-TN-2026-008',
    title: 'Kế hoạch Thí nghiệm định kỳ Trạm 110kV Khoái Châu (E3.1)',
    type: 'Định kỳ',
    category: 'Kế hoạch',
    status: 'Mới lập',
    createdDate: '2026-05-10',
    startDate: '10/06',
    endDate: '25/06',
    creator: 'Trần Văn Kế',
    approver: '-',
    description: 'Bảo dưỡng và thí nghiệm định kỳ MBA T1 và các ngăn lộ 110kV.',
    devices: [
      { id: 'MBA-T1-E31', name: 'Máy biến áp T1', type: 'Máy biến áp', status: 'Chưa làm' },
      { id: 'MC-131-E31', name: 'Máy cắt 131', type: 'Máy cắt', status: 'Chưa làm' }
    ],
    outage: { required: true, duration: '8 giờ' }
  },
  {
    id: 6,
    code: 'YC-TN-2026-012',
    title: 'Yêu cầu Thí nghiệm đột xuất Máy cắt 171 Trạm 110kV Mỹ Hào (E3.2)',
    type: 'Đột xuất',
    category: 'Yêu cầu',
    status: 'Đã duyệt',
    createdDate: '2026-05-15',
    startDate: '20/05',
    endDate: '21/05',
    creator: 'Lê Văn Yêu',
    approver: 'Nguyễn Văn Duyệt',
    description: 'Kiểm tra hành trình và điện trở tiếp xúc sau khi phát hiện tiếng kêu lạ khi thao tác.',
    devices: [
      { id: 'MC-171-E32', name: 'Máy cắt 171', type: 'Máy cắt', status: 'Sẵn sàng' }
    ],
    outage: { required: true, duration: '2 giờ' }
  },
  {
    id: 7,
    code: 'KH-TN-2026-009',
    title: 'Kế hoạch Thí nghiệm định kỳ Trạm 110kV Kim Động (E3.3)',
    type: 'Định kỳ',
    category: 'Kế hoạch',
    status: 'Đang thực hiện',
    createdDate: '2026-05-01',
    startDate: '15/05',
    endDate: '20/05',
    creator: 'Vũ Văn Định',
    approver: 'Phạm Văn Duyệt',
    description: 'Thí nghiệm định kỳ theo lịch năm 2026.',
    devices: [
      { id: 'TU-173-E33', name: 'Biến điện áp 173', type: 'Biến điện áp', status: 'Đang làm' }
    ],
    outage: { required: false },
    requestType: 'Dụng cụ an toàn',
    location: 'Kho Xí nghiệp Thí nghiệm',
    contactPerson: 'Trần Văn B',
    contactPhone: '0987654321',
    unit: 'Xí nghiệp Thí nghiệm',
    department: 'Tổ An toàn',
    cycle: '6 tháng'
  },
  {
    id: 9,
    code: 'YC-TN-2026-015',
    title: 'Yêu cầu Thí nghiệm trạm biến áp khách hàng Công ty May mặc Hưng Yên',
    type: 'Theo yêu cầu',
    category: 'Yêu cầu',
    status: 'Đã tiếp nhận',
    createdDate: '2026-05-18',
    startDate: '20/05',
    endDate: '21/05',
    creator: 'Lê Văn Khách',
    approver: 'Nguyễn Văn Duyệt',
    workTypes: ['Thí nghiệm', 'Hiệu chuẩn'],
    requestType: 'Yêu cầu khách hàng',
    location: 'KCN Phố Nối A',
    contactPerson: 'Phạm Văn C',
    contactPhone: '0911223344',
    unit: 'Công ty May mặc Hưng Yên',
    department: 'Phòng Cơ điện',
    description: 'Thử nghiệm định kỳ các thiết bị trạm biến áp 560kVA.',
    devices: [
      { id: 'MBA-KH-01', name: 'Máy biến áp 560kVA', type: 'Máy biến áp', status: 'Sẵn sàng' }
    ],
    outage: { required: true, duration: '4 giờ' }
  }
];

export const MOCK_TESTING_CATALOG = [
  { id: 1, device: 'Máy biến áp T1 - TBA Phố Nối', lastTest: '2024-05-15', nextDue: '2026-05-15', interval: '24 tháng', status: 'Đến hạn', urgency: 'Cao', code: 'PD-MBA-001', type: 'Trạm', location: 'Trạm 110kV Phố Nối' },
  { id: 9, device: 'Máy cắt 171 - MBA T1', lastTest: '2024-05-15', nextDue: '2026-05-15', interval: '24 tháng', status: 'Đến hạn', urgency: 'Cao', code: 'PD-MC-171', type: 'Máy cắt', location: 'MBA T1', parentId: 1 },
  { id: 10, device: 'Biến dòng 171 - MBA T1', lastTest: '2024-05-15', nextDue: '2026-05-15', interval: '24 tháng', status: 'Đến hạn', urgency: 'Cao', code: 'PD-TI-171', type: 'Biến dòng', location: 'MBA T1', parentId: 1 },
  { id: 2, device: 'Đường dây 171 - Khoái Châu', lastTest: '2023-06-01', nextDue: '2026-06-01', interval: '36 tháng', status: 'Sắp đến hạn', urgency: 'Trung bình', code: 'PD-DD-171', type: 'Đường dây', location: 'Trạm 110kV Khoái Châu' },
  { id: 3, device: 'Chống sét van Lộ 173', lastTest: '2025-04-12', nextDue: '2026-04-12', interval: '12 tháng', status: 'Quá hạn', urgency: 'Rất cao', code: 'PD-CSV-173', type: 'Chống sét van', location: 'Đường dây 173' },
  { id: 4, device: 'Máy biến áp T2 - TBA Gia Lâm', lastTest: '2024-08-20', nextDue: '2026-08-20', interval: '24 tháng', status: 'Bình thường', urgency: 'Thấp', code: 'PD-MBA-T2', type: 'Trạm', location: 'Trạm 110kV Gia Lâm' },
  { id: 5, device: 'Biến dòng 171-A Phố Nối', lastTest: '2025-01-10', nextDue: '2026-07-10', interval: '18 tháng', status: 'Bình thường', urgency: 'Thấp', code: 'PD-TI-171A', type: 'Biến dòng', location: 'Trạm 110kV Phố Nối' },
];

export const MOCK_TESTING_DATA = [
  {
    id: 1,
    time: '2026-05-15 08:00',
    device: 'Máy biến áp T1 - TBA 110kV Phố Nối',
    type: 'Định kỳ', // Changed from 'Thí nghiệm định kỳ' for cleaner display
    sourceType: 'Kế hoạch', // New field
    status: 'Đã hoàn thành',
    team: 'Đội thí nghiệm 1 - TT Thí nghiệm điện',
    leader: 'Nguyễn Văn Kết',
    result: 'Đạt',
    project: 'Kế hoạch thí nghiệm định kỳ năm 2026',
    planName: 'Kế hoạch thí nghiệm định kỳ Trạm 110kV Phố Nối - Quý II/2026', // Link to plan name
    signedDate: '16/05/2026',
    condition: 'Thời tiết nắng ráo, nhiệt độ 30°C, độ ẩm 65%',
    items: [
      { name: 'Đo điện trở cách điện cuộn dây', unit: 'MΩ', value: '2500', limit: '> 2000', eval: 'Đạt' },
      { name: 'Đo tỷ số biến', unit: '%', value: '0.05', limit: '< 0.5', eval: 'Đạt' },
      { name: 'Đo điện trở một chiều', unit: 'mΩ', value: '12.5', limit: '< 13.0', eval: 'Đạt' },
    ],
    images: ['https://picsum.photos/seed/test1/800/600'],
    attachments: [{ name: 'Bien_ban_thi_nghiem_T1_2026.pdf', size: '2.5 MB' }],
    signing: [
      { role: 'Trưởng nhóm TN', name: 'Nguyễn Văn Kết', time: '15/05/2026 16:30', status: 'Đã ký' },
      { role: 'Đội trưởng TN', name: 'Trần Văn Duyệt', time: '15/05/2026 17:15', status: 'Đã ký' },
    ]
  },
  {
    id: 4,
    time: '2026-05-18 10:00',
    device: 'Máy cắt 471 Khoái Châu',
    type: 'Đột xuất',
    sourceType: 'Yêu cầu',
    status: 'Đã hoàn thành',
    team: 'Đội thí nghiệm 2 - TT Thí nghiệm điện',
    leader: 'Phạm Văn Thành',
    result: 'Đạt',
    project: 'Yêu cầu xử lý nhiệt độ tiếp xúc cao',
    planName: 'Yêu cầu thí nghiệm đột xuất Máy cắt 471',
    signedDate: '19/05/2026',
    items: [
      { name: 'Đo điện trở tiếp xúc', unit: 'μΩ', value: '35', limit: '< 50', eval: 'Đạt' }
    ],
    images: [],
    attachments: [],
    signing: []
  },
  {
    id: 5,
    time: '2026-05-19 14:30',
    device: 'Biến áp T2 - TBA 110kV Gia Lâm',
    type: 'Phát sinh',
    sourceType: 'Phát sinh',
    status: 'Mới lập',
    team: 'Đội kỹ thuật lưu động',
    leader: 'Hoàng Minh Tâm',
    result: 'Chưa có',
    project: 'Sự cố rò rỉ dầu qua gioăng cao su',
    planName: 'Biên bản kiểm tra rò rỉ dầu T2',
    signedDate: '-',
    items: [],
    images: [],
    attachments: [],
    signing: []
  },
  {
    id: 6,
    time: '2026-05-20 08:30',
    device: 'Dao cách ly 171-1 Phố Nối',
    type: 'Định kỳ',
    sourceType: 'Kế hoạch',
    status: 'Đã hoàn thành',
    team: 'Đội thí nghiệm 1',
    leader: 'Nguyễn Văn Kết',
    result: 'Đạt',
    project: 'Kế hoạch thí nghiệm định kỳ năm 2026',
    planName: 'Kế hoạch thí nghiệm định kỳ Trạm 110kV Phố Nối - Quý II/2026',
    signedDate: '21/05/2026',
    items: [],
    images: [],
    attachments: [],
    signing: []
  }
];
