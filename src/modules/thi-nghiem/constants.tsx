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
      { id: 'MBA-T1', name: 'Máy biến áp T1', type: 'Máy biến áp', status: 'Đã duyệt', nextDue: '2026-05-15' },
      { id: 'MC-171', name: 'Máy cắt 171', type: 'Máy cắt', status: 'Không duyệt', nextDue: '2026-05-20' },
      { id: 'TI-171', name: 'Biến dòng 171', type: 'Biến dòng', status: 'Không duyệt', nextDue: '2026-05-20' },
      { id: 'TU-171', name: 'Biến điện áp 171', type: 'Biến điện áp', status: 'Chờ duyệt', nextDue: '2026-05-20' },
      { id: 'DCL-171-1', name: 'Dao cách ly 171-1', type: 'Dao cách ly', status: 'Không duyệt', nextDue: '2026-05-22' },
      { id: 'DCL-171-2', name: 'Dao cách ly 171-2', type: 'Dao cách ly', status: 'Chờ duyệt', nextDue: '2026-05-22' },
      { id: 'CSV-171', name: 'Chống sét van 171', type: 'Chống sét van', status: 'Đã duyệt', nextDue: '2026-05-18' },
      { id: 'DH-171', name: 'Hệ thống đo lường 171', type: 'Thiết bị đo', status: 'Không duyệt', nextDue: '2026-05-24' },
      { id: 'MC-172', name: 'Máy cắt 172', type: 'Máy cắt', status: 'Chờ duyệt', nextDue: '2026-05-21' },
      { id: 'TI-172', name: 'Biến dòng 172', type: 'Biến dòng', status: 'Chờ duyệt', nextDue: '2026-05-21' },
      { id: 'TU-172', name: 'Biến điện áp 172', type: 'Biến điện áp', status: 'Chờ duyệt', nextDue: '2026-05-21' },
      { id: 'CSV-172', name: 'Chống sét van 172', type: 'Chống sét van', status: 'Không duyệt', nextDue: '2026-05-19' }
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
    title: 'Yêu cầu Thí nghiệm trạm biến áp khách hàng Xí nghiệp 110kV',
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
    unit: 'Xí nghiệp 110kV',
    department: 'Phòng Cơ điện',
    description: 'Thử nghiệm định kỳ các thiết bị trạm biến áp 560kVA.',
    devices: [
      { id: 'MBA-KH-01', name: 'Máy biến áp 560kVA', type: 'Máy biến áp', status: 'Sẵn sàng' }
    ],
    outage: { required: true, duration: '4 giờ' }
  },
  {
    id: 10,
    code: 'KH-TN-2026-020',
    title: 'Kế hoạch Thí nghiệm định kỳ thiết bị ngăn lộ 110kV TBA Văn Lâm (E3.4)',
    type: 'Định kỳ',
    category: 'Kế hoạch',
    status: 'Mới lập',
    createdDate: '2026-05-12',
    startDate: '2026-06-15',
    endDate: '2026-06-16',
    creator: 'Lê Văn Khách',
    approver: '-',
    unit: 'Điện lực Thành phố Hưng Yên',
    description: 'Thí nghiệm định kỳ Máy cắt, Dao cách ly, TI, TU ngăn lộ 171 và 172',
    devices: [
      { id: 'VL-MC-171', name: 'Máy cắt 171 Văn Lâm', type: 'Máy cắt', status: 'Chưa làm', nextDue: '2026-06-15' },
      { id: 'VL-DCL-171', name: 'Dao cách ly 171-1 Văn Lâm', type: 'Dao cách ly', status: 'Chưa làm', nextDue: '2026-06-15' }
    ]
  },
  {
    id: 11,
    code: 'YC-TN-2026-021',
    title: 'Yêu cầu thí nghiệm định kỳ Trạm biến áp 110kV Giai Phạm (E3.6)',
    type: 'Định kỳ',
    category: 'Yêu cầu',
    status: 'Đang duyệt',
    createdDate: '2026-05-14',
    startDate: '2026-06-18',
    endDate: '2026-06-19',
    creator: 'Trần Văn Kế',
    approver: '-',
    unit: 'Công ty Dịch vụ điện lực',
    description: 'Bảo dưỡng định kỳ MBA T1 Giai Phạm',
    devices: [
      { id: 'GP-MBA-T1', name: 'Máy biến áp T1 Giai Phạm', type: 'Máy biến áp', status: 'Chưa làm', nextDue: '2026-06-18' }
    ]
  },
  {
    id: 12,
    code: 'KH-TN-2026-022',
    title: 'Thí nghiệm sau lắp đặt Máy biến áp T3 Trạm 110kV Phố Nối',
    type: 'Định kỳ',
    category: 'Kế hoạch',
    status: 'Đang lập',
    createdDate: '2026-05-16',
    startDate: '2026-06-20',
    endDate: '2026-06-22',
    creator: 'Vũ Văn Mới',
    approver: '-',
    unit: 'Điện lực Thành phố Hưng Yên',
    description: 'Thí nghiệm nghiệm thu đóng điện MBA T3 mới lắp đặt.',
    devices: [
      { id: 'MBA-T3-PN', name: 'Máy biến áp T3 Phố Nối', type: 'Máy biến áp', status: 'Chưa làm', nextDue: '2026-06-20' },
      { id: 'MC-173-PN', name: 'Máy cắt 173 Phố Nối', type: 'Máy cắt', status: 'Chưa làm', nextDue: '2026-06-20' }
    ]
  },
  {
    id: 13,
    code: 'KH-TN-2026-023',
    title: 'Kế hoạch thí nghiệm hiệu chuẩn chống sét van Lộ 172 Khoái Châu',
    type: 'Định kỳ',
    category: 'Kế hoạch',
    status: 'Đã duyệt',
    createdDate: '2026-05-18',
    startDate: '2026-06-25',
    endDate: '2026-06-26',
    creator: 'Nguyễn Kế Hoạch',
    approver: 'Phạm Duyệt Vốn',
    unit: 'Xí nghiệp Thí nghiệm',
    description: 'Kiểm tra phóng điện cục bộ và dòng rò rỉ xoay chiều chống sét van lộ 172',
    devices: [
      { id: 'KC-CSV-172', name: 'Chống sét van 172 Khoái Châu', type: 'Chống sét van', status: 'Chưa làm', nextDue: '2026-06-25' }
    ]
  },
  {
    id: 14,
    code: 'YC-TN-2026-024',
    title: 'Yêu cầu thí nghiệm hiệu chuẩn hệ thống bảo vệ rơ le ngăn lộ 171 Kim Động',
    type: 'Đột xuất',
    category: 'Yêu cầu',
    status: 'Đang duyệt',
    createdDate: '2026-05-20',
    startDate: '2026-06-28',
    endDate: '2026-06-29',
    creator: 'Lê Văn Đo',
    approver: 'Trần Văn Duyệt',
    unit: 'Điện lực Thành phố Hưng Yên',
    description: 'Thử nghiệm rơ le so lệch dọc đường dây lộ 171',
    devices: [
      { id: 'RL-171-KD', name: 'Rơ le bảo vệ ngăn 171 Kim Động', type: 'Thiết bị đo', status: 'Chưa làm', nextDue: '2026-06-28' }
    ]
  },
  {
    id: 15,
    code: 'YC-TN-2026-025',
    title: 'Thử nghiệm lấy mẫu dầu định kỳ MBA T2 Mỹ Hào',
    type: 'Định kỳ',
    category: 'Yêu cầu',
    status: 'Mới lập',
    createdDate: '2026-05-22',
    startDate: '2026-07-02',
    endDate: '2026-07-03',
    creator: 'Hoàng Văn Yêu',
    approver: '-',
    unit: 'Xí nghiệp 110kV',
    description: 'Thực hiện phân tích chất lượng dầu cách điện trong máy biến áp T2',
    devices: [
      { id: 'MBA-T2-MH', name: 'Máy biến áp T2 Mỹ Hào', type: 'Máy biến áp', status: 'Chưa làm', nextDue: '2026-07-02' }
    ]
  },
  {
    id: 16,
    code: 'KH-TN-2026-026',
    title: 'Kế hoạch kiểm định đồng hồ đo đếm ranh giới lộ 471 Kim Động',
    type: 'Kiểm định',
    category: 'Kế hoạch',
    status: 'Đang thực hiện',
    createdDate: '2026-05-24',
    startDate: '2026-07-05',
    endDate: '2026-07-06',
    creator: 'Vũ Văn Định',
    approver: 'Phạm Văn Duyệt',
    unit: 'Điện lực Thành phố Hưng Yên',
    description: 'Kiểm định định kỳ công tơ điện tử đo đếm ranh giới đầu nguồn lộ 471',
    devices: [
      { id: 'CT-471-KD', name: 'Công tơ điện tử lộ 471 Kim Động', type: 'Thiết bị đo', status: 'Đang làm', nextDue: '2026-07-05' }
    ]
  }
];

export const MOCK_TESTING_CATALOG = [
  // --- PHỐ NỐI (E3.5) ---
  { id: 1, device: 'Máy biến áp T1 - TBA Phố Nối', lastTest: '2024-05-15', nextDue: '2026-05-15', interval: '24 tháng', status: 'Đến hạn', urgency: 'Cao', code: 'PD-MBA-001', type: 'Trạm', location: 'Trạm 110kV Phố Nối' },
  { id: 11, device: 'Máy biến áp T2 - TBA Phố Nối', lastTest: '2024-08-10', nextDue: '2026-08-10', interval: '24 tháng', status: 'Bình thường', urgency: 'Thấp', code: 'PD-MBA-002', type: 'Trạm', location: 'Trạm 110kV Phố Nối' },
  { id: 9, device: 'Máy cắt 171 - MBA T1 - Phố Nối', lastTest: '2024-05-15', nextDue: '2026-05-15', interval: '24 tháng', status: 'Đến hạn', urgency: 'Cao', code: 'PD-MC-171', type: 'Máy cắt', location: 'Trạm 110kV Phố Nối', parentId: 1 },
  { id: 12, device: 'Máy cắt 172 - MBA T2 - Phố Nối', lastTest: '2024-08-10', nextDue: '2026-08-10', interval: '24 tháng', status: 'Bình thường', urgency: 'Thấp', code: 'PD-MC-172', type: 'Máy cắt', location: 'Trạm 110kV Phố Nối', parentId: 11 },
  { id: 10, device: 'Biến dòng 171 - MBA T1 - Phố Nối', lastTest: '2024-05-15', nextDue: '2026-05-15', interval: '24 tháng', status: 'Đến hạn', urgency: 'Cao', code: 'PD-TI-171', type: 'Biến dòng', location: 'Trạm 110kV Phố Nối', parentId: 1 },
  { id: 13, device: 'Biến dòng 172 - MBA T2 - Phố Nối', lastTest: '2024-08-10', nextDue: '2026-08-10', interval: '24 tháng', status: 'Bình thường', urgency: 'Thấp', code: 'PD-TI-172', type: 'Biến dòng', location: 'Trạm 110kV Phố Nối', parentId: 11 },
  { id: 14, device: 'Biến điện áp 171 - TBA Phố Nối', lastTest: '2024-05-15', nextDue: '2026-05-15', interval: '24 tháng', status: 'Đến hạn', urgency: 'Cao', code: 'PD-TU-171', type: 'Biến điện áp', location: 'Trạm 110kV Phố Nối', parentId: 1 },
  { id: 15, device: 'Biến điện áp 172 - TBA Phố Nối', lastTest: '2024-08-10', nextDue: '2026-08-10', interval: '24 tháng', status: 'Bình thường', urgency: 'Thấp', code: 'PD-TU-172', type: 'Biến điện áp', location: 'Trạm 110kV Phố Nối', parentId: 11 },
  { id: 16, device: 'Dao cách ly 171-1 - TBA Phố Nối', lastTest: '2025-01-10', nextDue: '2026-07-10', interval: '18 tháng', status: 'Bình thường', urgency: 'Thấp', code: 'PD-DCL-171A', type: 'Dao cách ly', location: 'Trạm 110kV Phố Nối', parentId: 1 },
  { id: 17, device: 'Dao cách ly 172-1 - TBA Phố Nối', lastTest: '2025-02-15', nextDue: '2026-08-15', interval: '18 tháng', status: 'Bình thường', urgency: 'Thấp', code: 'PD-DCL-172A', type: 'Dao cách ly', location: 'Trạm 110kV Phố Nối', parentId: 11 },
  { id: 18, device: 'Chống sét van Lộ 171 - TBA Phố Nối', lastTest: '2025-04-12', nextDue: '2026-04-12', interval: '12 tháng', status: 'Quá hạn', urgency: 'Rất cao', code: 'PD-CSV-171', type: 'Chống sét van', location: 'Trạm 110kV Phố Nối', parentId: 1 },
  { id: 19, device: 'Chống sét van Lộ 172 - TBA Phố Nối', lastTest: '2025-05-20', nextDue: '2026-05-20', interval: '12 tháng', status: 'Quá hạn', urgency: 'Rất cao', code: 'PD-CSV-172', type: 'Chống sét van', location: 'Trạm 110kV Phố Nối', parentId: 11 },

  // --- KHOÁI CHÂU (E3.1) ---
  { id: 20, device: 'Máy biến áp T1 - TBA Khoái Châu', lastTest: '2024-06-18', nextDue: '2026-06-18', interval: '24 tháng', status: 'Sắp đến hạn', urgency: 'Trung bình', code: 'KC-MBA-T1', type: 'Trạm', location: 'Trạm 110kV Khoái Châu' },
  { id: 21, device: 'Máy biến áp T2 - TBA Khoái Châu', lastTest: '2024-06-20', nextDue: '2026-06-20', interval: '24 tháng', status: 'Sắp đến hạn', urgency: 'Trung bình', code: 'KC-MBA-T2', type: 'Trạm', location: 'Trạm 110kV Khoái Châu' },
  { id: 22, device: 'Máy cắt 171 - TBA Khoái Châu', lastTest: '2024-06-18', nextDue: '2026-06-18', interval: '24 tháng', status: 'Sắp đến hạn', urgency: 'Trung bình', code: 'KC-MC-171', type: 'Máy cắt', location: 'Trạm 110kV Khoái Châu', parentId: 20 },
  { id: 23, device: 'Biến dòng 171 - TBA Khoái Châu', lastTest: '2024-06-18', nextDue: '2026-06-18', interval: '24 tháng', status: 'Sắp đến hạn', urgency: 'Trung bình', code: 'KC-TI-171', type: 'Biến dòng', location: 'Trạm 110kV Khoái Châu', parentId: 20 },
  { id: 24, device: 'Biến điện áp 171 - TBA Khoái Châu', lastTest: '2024-06-18', nextDue: '2026-06-18', interval: '24 tháng', status: 'Sắp đến hạn', urgency: 'Trung bình', code: 'KC-TU-171', type: 'Biến điện áp', location: 'Trạm 110kV Khoái Châu', parentId: 20 },
  { id: 25, device: 'Dao cách ly 171-1 - TBA Khoái Châu', lastTest: '2025-06-01', nextDue: '2026-06-01', interval: '12 tháng', status: 'Quá hạn', urgency: 'Cao', code: 'KC-DCL-171', type: 'Dao cách ly', location: 'Trạm 110kV Khoái Châu', parentId: 20 },
  { id: 26, device: 'Chống sét van Lộ 171 - TBA Khoái Châu', lastTest: '2025-06-01', nextDue: '2026-06-01', interval: '12 tháng', status: 'Quá hạn', urgency: 'Đến hạn', code: 'KC-CSV-171', type: 'Chống sét van', location: 'Trạm 110kV Khoái Châu', parentId: 20 },

  // --- MỸ HÀO (E3.2) ---
  { id: 30, device: 'Máy biến áp T1 - TBA Mỹ Hào', lastTest: '2024-11-15', nextDue: '2026-11-15', interval: '24 tháng', status: 'Bình thường', urgency: 'Thấp', code: 'MH-MBA-T1', type: 'Trạm', location: 'Trạm 110kV Mỹ Hào' },
  { id: 31, device: 'Máy cắt 173 - TBA Mỹ Hào', lastTest: '2024-11-15', nextDue: '2026-11-15', interval: '24 tháng', status: 'Bình thường', urgency: 'Thấp', code: 'MH-MC-173', type: 'Máy cắt', location: 'Trạm 110kV Mỹ Hào', parentId: 30 },
  { id: 32, device: 'Biến dòng 173 - TBA Mỹ Hào', lastTest: '2024-11-15', nextDue: '2026-11-15', interval: '24 tháng', status: 'Bình thường', urgency: 'Thấp', code: 'MH-TI-173', type: 'Biến dòng', location: 'Trạm 110kV Mỹ Hào', parentId: 30 },
  { id: 33, device: 'Biến điện áp 173 - TBA Mỹ Hào', lastTest: '2024-11-15', nextDue: '2026-11-15', interval: '24 tháng', status: 'Bình thường', urgency: 'Thấp', code: 'MH-TU-173', type: 'Biến điện áp', location: 'Trạm 110kV Mỹ Hào', parentId: 30 },
  { id: 34, device: 'Dao cách ly 173-1 - TBA Mỹ Hào', lastTest: '2025-05-10', nextDue: '2026-11-10', interval: '18 tháng', status: 'Bình thường', urgency: 'Thấp', code: 'MH-DCL-173', type: 'Dao cách ly', location: 'Trạm 110kV Mỹ Hào', parentId: 30 },
  { id: 35, device: 'Chống sét van Lộ 173 - TBA Mỹ Hào', lastTest: '2025-04-12', nextDue: '2026-04-12', interval: '12 tháng', status: 'Quá hạn', urgency: 'Rất cao', code: 'PD-CSV-173', type: 'Chống sét van', location: 'Trạm 110kV Mỹ Hào', parentId: 30 },

  // --- KIM ĐỘNG (E3.3) ---
  { id: 40, device: 'Máy biến áp T1 - TBA Kim Động', lastTest: '2024-03-22', nextDue: '2026-03-22', interval: '24 tháng', status: 'Quá hạn', urgency: 'Rất cao', code: 'KD-MBA-T1', type: 'Trạm', location: 'Trạm 110kV Kim Động' },
  { id: 41, device: 'Máy cắt 172 - TBA Kim Động', lastTest: '2024-03-22', nextDue: '2026-03-22', interval: '24 tháng', status: 'Quá hạn', urgency: 'Rất cao', code: 'KD-MC-172', type: 'Máy cắt', location: 'Trạm 110kV Kim Động', parentId: 40 },
  { id: 42, device: 'Biến dòng 172 - TBA Kim Động', lastTest: '2024-03-22', nextDue: '2026-03-22', interval: '24 tháng', status: 'Quá hạn', urgency: 'Rất cao', code: 'KD-TI-172', type: 'Biến dòng', location: 'Trạm 110kV Kim Động', parentId: 40 },
  { id: 43, device: 'Biến điện áp 172 - TBA Kim Động', lastTest: '2024-03-22', nextDue: '2026-03-22', interval: '24 tháng', status: 'Quá hạn', urgency: 'Rất cao', code: 'KD-TU-172', type: 'Biến điện áp', location: 'Trạm 110kV Kim Động', parentId: 40 },
  { id: 44, device: 'Dao cách ly 172-1 - TBA Kim Động', lastTest: '2024-09-15', nextDue: '2026-03-15', interval: '18 tháng', status: 'Quá hạn', urgency: 'Rất cao', code: 'KD-DCL-172', type: 'Dao cách ly', location: 'Trạm 110kV Kim Động', parentId: 40 },
  { id: 45, device: 'Chống sét van Lộ 172 - TBA Kim Động', lastTest: '2025-03-15', nextDue: '2026-03-15', interval: '12 tháng', status: 'Quá hạn', urgency: 'Rất cao', code: 'KD-CSV-172', type: 'Chống sét van', location: 'Trạm 110kV Kim Động', parentId: 40 },

  // --- VĂN LÂM (E3.4) ---
  { id: 50, device: 'Máy biến áp T1 - TBA Văn Lâm', lastTest: '2024-10-05', nextDue: '2026-10-05', interval: '24 tháng', status: 'Bình thường', urgency: 'Thấp', code: 'VL-MBA-T1', type: 'Trạm', location: 'Trạm 110kV Văn Lâm' },
  { id: 51, device: 'Máy cắt 174 - TBA Văn Lâm', lastTest: '2024-10-05', nextDue: '2026-10-05', interval: '24 tháng', status: 'Bình thường', urgency: 'Thấp', code: 'VL-MC-174', type: 'Máy cắt', location: 'Trạm 110kV Văn Lâm', parentId: 50 },
  { id: 52, device: 'Biến dòng 174 - TBA Văn Lâm', lastTest: '2024-10-05', nextDue: '2026-10-05', interval: '24 tháng', status: 'Bình thường', urgency: 'Thấp', code: 'VL-TI-174', type: 'Biến dòng', location: 'Trạm 110kV Văn Lâm', parentId: 50 },
  { id: 53, device: 'Biến điện áp 174 - TBA Văn Lâm', lastTest: '2024-10-05', nextDue: '2026-10-05', interval: '24 tháng', status: 'Bình thường', urgency: 'Thấp', code: 'VL-TU-174', type: 'Biến điện áp', location: 'Trạm 110kV Văn Lâm', parentId: 50 },
  { id: 54, device: 'Dao cách ly 174-1 - TBA Văn Lâm', lastTest: '2025-04-10', nextDue: '2026-10-10', interval: '18 tháng', status: 'Bình thường', urgency: 'Thấp', code: 'VL-DCL-174', type: 'Dao cách ly', location: 'Trạm 110kV Văn Lâm', parentId: 50 },
  { id: 55, device: 'Chống sét van Lộ 174 - TBA Văn Lâm', lastTest: '2025-05-15', nextDue: '2026-05-15', interval: '12 tháng', status: 'Quá hạn', urgency: 'Đến hạn', code: 'VL-CSV-174', type: 'Chống sét van', location: 'Trạm 110kV Văn Lâm', parentId: 50 },

  // --- GIAI PHẠM (E3.6) ---
  { id: 60, device: 'Máy biến áp T1 - TBA Giai Phạm', lastTest: '2024-12-01', nextDue: '2026-12-01', interval: '24 tháng', status: 'Bình thường', urgency: 'Thấp', code: 'GP-MBA-T1', type: 'Trạm', location: 'Trạm 110kV Giai Phạm' },
  { id: 61, device: 'Máy cắt 171 - TBA Giai Phạm', lastTest: '2024-12-01', nextDue: '2026-12-01', interval: '24 tháng', status: 'Bình thường', urgency: 'Thấp', code: 'GP-MC-171', type: 'Máy cắt', location: 'Trạm 110kV Giai Phạm', parentId: 60 },
  { id: 62, device: 'Biến dòng 171 - TBA Giai Phạm', lastTest: '2024-12-01', nextDue: '2026-12-01', interval: '24 tháng', status: 'Bình thường', urgency: 'Thấp', code: 'GP-TI-171', type: 'Biến dòng', location: 'Trạm 110kV Giai Phạm', parentId: 60 },
  { id: 63, device: 'Biến điện áp 171 - TBA Giai Phạm', lastTest: '2024-12-01', nextDue: '2026-12-01', interval: '24 tháng', status: 'Bình thường', urgency: 'Thấp', code: 'GP-TU-171', type: 'Biến điện áp', location: 'Trạm 110kV Giai Phạm', parentId: 60 },
  { id: 64, device: 'Dao cách ly 171-1 - TBA Giai Phạm', lastTest: '2025-06-01', nextDue: '2026-12-01', interval: '18 tháng', status: 'Bình thường', urgency: 'Thấp', code: 'GP-DCL-171', type: 'Dao cách ly', location: 'Trạm 110kV Giai Phạm', parentId: 60 },
  { id: 65, device: 'Chống sét van Lộ 171 - TBA Giai Phạm', lastTest: '2025-05-30', nextDue: '2026-05-30', interval: '12 tháng', status: 'Quá hạn', urgency: 'Rất cao', code: 'GP-CSV-171', type: 'Chống sét van', location: 'Trạm 110kV Giai Phạm', parentId: 60 },

  // --- ĐƯỜNG DÂY (DZ) ---
  { id: 70, device: 'Đường dây 171 - Khoái Châu', lastTest: '2023-06-01', nextDue: '2026-06-01', interval: '36 tháng', status: 'Sắp đến hạn', urgency: 'Trung bình', code: 'PD-DD-171', type: 'Đường dây', location: 'TBA 110kV Khoái Châu' },
  { id: 71, device: 'Chống sét van ĐD 171-Khoái Châu', lastTest: '2025-06-01', nextDue: '2026-06-01', interval: '12 tháng', status: 'Đến hạn', urgency: 'Cao', code: 'KC-CSV-DD171', type: 'Chống sét van', location: 'TBA 110kV Khoái Châu', parentId: 70 },
  
  { id: 72, device: 'Đường dây 172 - Văn Lâm', lastTest: '2024-02-10', nextDue: '2027-02-10', interval: '36 tháng', status: 'Bình thường', urgency: 'Thấp', code: 'VL-DD-172', type: 'Đường dây', location: 'TBA 110kV Văn Lâm' },
  { id: 73, device: 'Chống sét van ĐD 172-Văn Lâm', lastTest: '2025-05-20', nextDue: '2026-05-20', interval: '12 tháng', status: 'Quá hạn', urgency: 'Rất cao', code: 'VL-CSV-DD172', type: 'Chống sét van', location: 'TBA 110kV Văn Lâm', parentId: 72 },

  { id: 74, device: 'Đường dây 111 - Phố Nối', lastTest: '2023-11-20', nextDue: '2026-11-20', interval: '36 tháng', status: 'Bình thường', urgency: 'Thấp', code: 'PN-DD-111', type: 'Đường dây', location: 'TBA 110kV Phố Nối' },
  { id: 75, device: 'Chống sét van ĐD 111-Phố Nối', lastTest: '2025-05-15', nextDue: '2026-05-15', interval: '12 tháng', status: 'Quá hạn', urgency: 'Đến hạn', code: 'PN-CSV-DD111', type: 'Chống sét van', location: 'TBA 110kV Phố Nối', parentId: 74 },

  // --- ĐIỆN LỰC THÀNH PHỐ HƯNG YÊN ---
  { id: 80, device: 'Trạm biến áp 110kV TP Hưng Yên', lastTest: '2024-06-15', nextDue: '2026-06-15', interval: '24 tháng', status: 'Bình thường', urgency: 'Thấp', code: 'TBA-TPHY-110', type: 'Trạm', location: 'Điện lực Thành phố Hưng Yên' },
  { id: 81, device: 'Máy biến áp T1 - TBA TP Hưng Yên', lastTest: '2024-06-15', nextDue: '2026-06-15', interval: '24 tháng', status: 'Bình thường', urgency: 'Thấp', code: 'PD-MBA-TPHY-T1', type: 'Máy biến áp', location: 'Điện lực Thành phố Hưng Yên', parentId: 80 },
  { id: 82, device: 'Máy cắt 171 - MBA T1 - TP Hưng Yên', lastTest: '2024-05-15', nextDue: '2026-05-15', interval: '24 tháng', status: 'Đến hạn', urgency: 'Cao', code: 'PD-MC-TPHY-171', type: 'Máy cắt', location: 'Điện lực Thành phố Hưng Yên', parentId: 81 },
  { id: 83, device: 'Biến dòng 171 - MBA T1 - TP Hưng Yên', lastTest: '2024-06-15', nextDue: '2026-06-15', interval: '24 tháng', status: 'Bình thường', urgency: 'Thấp', code: 'PD-TI-TPHY-171', type: 'Biến dòng', location: 'Điện lực Thành phố Hưng Yên', parentId: 81 },
  { id: 84, device: 'Biến điện áp 171 - TBA TP Hưng Yên', lastTest: '2024-03-10', nextDue: '2026-03-10', interval: '24 tháng', status: 'Quá hạn', urgency: 'Rất cao', code: 'PD-TU-TPHY-171', type: 'Biến điện áp', location: 'Điện lực Thành phố Hưng Yên', parentId: 81 },
  { id: 85, device: 'Chống sét van Lộ 171 - TBA TP Hưng Yên', lastTest: '2025-05-30', nextDue: '2026-05-30', interval: '12 tháng', status: 'Quá hạn', urgency: 'Rất cao', code: 'PD-CSV-TPHY-171', type: 'Chống sét van', location: 'Điện lực Thành phố Hưng Yên', parentId: 81 },

  // --- THIẾT BỊ CHƯA THIẾT LẬP HOẶC KHÔNG CÓ CẤU HÌNH (CHI NHÁNH KHÁC) ---
  { id: 91, device: 'Dao cách ly DS-171 - TBA Phố Nối', lastTest: '-', nextDue: '-', interval: 'Chưa thiết lập', status: 'Chưa có chu kỳ', urgency: 'Thấp', code: 'PD-DCL-UNC', type: 'Dao cách ly', location: 'Trạm 110kV Phố Nối' },
  { id: 92, device: 'Hệ thống đo lường bảo vệ 172 - E3.3', lastTest: '-', nextDue: '-', interval: 'Chưa thiết lập', status: 'Chưa có chu kỳ', urgency: 'Thấp', code: 'KD-HTD-UNC', type: 'Thiết bị đo', location: 'Trạm 110kV Kim Động' },
  { id: 93, device: 'Khối liên kết TU-TI đo đếm lộ 471 - E3.2', lastTest: '-', nextDue: '-', interval: 'Chưa thiết lập', status: 'Chưa có chu kỳ', urgency: 'Thấp', code: 'MH-TUTI-UNC', type: 'TU-TI', location: 'Trạm 110kV Mỹ Hào' },
  { id: 94, device: 'Cầu chì tự rơi FCO-171 - E3.1', lastTest: '-', nextDue: '-', interval: 'Chưa thiết lập', status: 'Chưa có chu kỳ', urgency: 'Thấp', code: 'KC-FCO-UNC', type: 'Cầu chì', location: 'Trạm 110kV Khoái Châu' },
  { id: 95, device: 'Dao cách ly DS-172 - TBA Văn Lâm', lastTest: '-', nextDue: '-', interval: 'Chưa thiết lập', status: 'Chưa có chu kỳ', urgency: 'Thấp', code: 'VL-DCL-UNC', type: 'Dao cách ly', location: 'Trạm 110kV Văn Lâm' },
  { id: 96, device: 'Hệ thống đo lường bảo vệ 174 - E3.6', lastTest: '-', nextDue: '-', interval: 'Chưa thiết lập', status: 'Chưa có chu kỳ', urgency: 'Thấp', code: 'GP-HTD-UNC', type: 'Thiết bị đo', location: 'Trạm 110kV Giai Phạm' }
];

export const MOCK_TESTING_DATA = [
  {
    id: 1,
    time: '2026-05-15 08:00',
    device: 'Máy biến áp T1 - TBA Phố Nối',
    type: 'Định kỳ',
    sourceType: 'Kế hoạch',
    status: 'Đã hoàn thành',
    team: 'Đội thí nghiệm 1 - TT Thí nghiệm điện',
    leader: 'Nguyễn Văn Kết',
    result: 'Đạt',
    project: 'Kế hoạch thí nghiệm định kỳ năm 2026',
    planName: 'Kế hoạch thí nghiệm định kỳ Trạm 110kV Phố Nối - Quý II/2026',
    signedDate: '16/05/2026',
    condition: 'Thời tiết nắng ráo, nhiệt độ 30°C, độ ẩm 65%',
    items: [
      { name: 'Đo điện trở cách điện cuộn dây (R60)', unit: 'MΩ', value: '2500', limit: '≥ 2000', eval: 'Đạt' },
      { name: 'Đo tỷ số biến áp (Tỉ số biến)', unit: '%', value: '0.05', limit: '≤ 0.5', eval: 'Đạt' },
      { name: 'Đo điện trở một chiều các cuộn dây', unit: 'mΩ', value: '12.5', limit: '≤ 13.0', eval: 'Đạt' },
      { name: 'Thử độ bền điện môi dầu cách điện', unit: 'kV', value: '38.2', limit: '≥ 35', eval: 'Đạt' },
      { name: 'Đo chiết suất & hàm lượng mỡ ẩm dầu', unit: 'ppm', value: '11.0', limit: '≤ 15', eval: 'Đạt' }
    ],
    images: ['https://picsum.photos/seed/test1/800/600'],
    attachments: [{ name: 'Bien_ban_thi_nghiem_T1_2026.pdf', size: '2.5 MB' }],
    signing: [
      { role: 'Trưởng nhóm TN', name: 'Nguyễn Văn Kết', time: '15/05/2026 16:30', status: 'Đã ký' },
      { role: 'Đội trưởng TN', name: 'Trần Văn Duyệt', time: '15/05/2026 17:15', status: 'Đã ký' },
    ]
  },
  {
    id: 112,
    time: '2026-05-21 09:30',
    device: 'Máy cắt 171 - MBA T1 - Phố Nối',
    type: 'Đột xuất',
    sourceType: 'Yêu cầu',
    status: 'Đã hoàn thành',
    team: 'Đội thí nghiệm 1 - TT Thí nghiệm điện',
    leader: 'Nguyễn Văn Kết',
    result: 'Đạt',
    project: 'Sự cố phát nóng cực tiếp điểm chính 171',
    planName: 'Biên bản xử lý và thí nghiệm Máy cắt 171 Phố Nối',
    signedDate: '21/05/2026',
    condition: 'Nhiệt độ 32°C, không mưa',
    items: [
      { name: 'Đo điện trở tiếp xúc cực tiếp điểm chính', unit: 'μΩ', value: '32.1', limit: '≤ 50', eval: 'Đạt' },
      { name: 'Đo thời gian đóng cắt đồng thời (3 pha)', unit: 'ms', value: '41.5', limit: '≤ 45', eval: 'Đạt' },
      { name: 'Kiểm tra độ dòng rò rỉ cơ học', unit: 'MΩ', value: '6200', limit: '≥ 5000', eval: 'Đạt' },
      { name: 'Thử nghiệm áp lực cơ cấu nén lò xo (SF6)', unit: 'MPa', value: '0.56', limit: '0.55 ± 0.02', eval: 'Đạt' }
    ],
    images: [],
    attachments: [{ name: 'BB_MC171_Phonoi_2026.pdf', size: '1.8 MB' }],
    signing: [
      { role: 'Người thí nghiệm', name: 'Phan Văn Phong', time: '21/05/2026 11:30', status: 'Đã ký' },
      { role: 'Trưởng phòng Kỹ thuật', name: 'Lê Văn Thắng', time: '21/05/2026 14:00', status: 'Đã ký' }
    ]
  },
  {
    id: 120,
    time: '2026-06-02 08:30',
    device: 'Máy biến áp T1 - TBA Khoái Châu',
    type: 'Định kỳ',
    sourceType: 'Kế hoạch',
    status: 'Đã hoàn thành',
    team: 'Đội Thí nghiệm 2',
    leader: 'Phạm Văn Thành',
    result: 'Đạt',
    project: 'Kế hoạch thí nghiệm định kỳ năm 2026',
    planName: 'Thí nghiệm định kỳ Quý II/2026 Trạm Khoái Châu',
    signedDate: '02/06/2026',
    condition: 'Trời hửng nắng, nhiệt độ 29°C, độ ẩm 70%',
    items: [
      { name: 'Đo điện trở cách điện cuộn dây (R60)', unit: 'MΩ', value: '2800', limit: '≥ 2000', eval: 'Đạt' },
      { name: 'Đo tỷ số biến áp (Tỉ số biến)', unit: '%', value: '0.04', limit: '≤ 0.5', eval: 'Đạt' },
      { name: 'Đo điện trở một chiều các cuộn dây', unit: 'mΩ', value: '11.8', limit: '≤ 13.0', eval: 'Đạt' },
      { name: 'Thử độ bền điện môi dầu cách điện', unit: 'kV', value: '41.0', limit: '≥ 35', eval: 'Đạt' }
    ],
    images: [],
    attachments: [{ name: 'BB_T1_KhoaiChau_2026.pdf', size: '3.1 MB' }],
    signing: []
  },
  {
    id: 135,
    time: '2026-05-18 10:00',
    device: 'Chống sét van Lộ 173 - TBA Mỹ Hào',
    type: 'Đột xuất',
    sourceType: 'Yêu cầu',
    status: 'Đã hoàn thành',
    team: 'Đội thí nghiệm 2 - TT Thí nghiệm điện',
    leader: 'Phạm Văn Thành',
    result: 'Đạt',
    project: 'Yêu cầu kiểm tra sau dông sét cục bộ Mỹ Hào',
    planName: 'Kiểm tra đột xuất CSV Lộ 173 Mỹ Hào',
    signedDate: '19/05/2026',
    items: [
      { name: 'Đo dòng rò xoay chiều dưới điện áp cực đại', unit: 'μA', value: '112', limit: '≤ 150', eval: 'Đạt' },
      { name: 'Đo điện trở cách điện vỏ sứ và van cách điện', unit: 'MΩ', value: '3100', limit: '≥ 2500', eval: 'Đạt' },
      { name: 'Kiểm tra thông số kỹ thuật bộ đếm sét', unit: 'Lần', value: 'Trơn nhạy', limit: 'Hoạt động nhạy', eval: 'Đạt' }
    ],
    images: [],
    attachments: [],
    signing: []
  },
  {
    id: 5,
    time: '2026-05-19 14:30',
    device: 'Máy biến áp T2 - TBA Gia Lâm',
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
    device: 'Dao cách ly 171-1 - TBA Phố Nối',
    type: 'Định kỳ',
    sourceType: 'Kế hoạch',
    status: 'Đã hoàn thành',
    team: 'Đội thí nghiệm 1',
    leader: 'Nguyễn Văn Kết',
    result: 'Đạt',
    project: 'Kế hoạch thí nghiệm định kỳ năm 2026',
    planName: 'Kế hoạch thí nghiệm định kỳ Trạm 110kV Phố Nối - Quý II/2026',
    signedDate: '21/05/2026',
    items: [
      { name: 'Kiểm tra điện trở cách điện vỏ thiết bị', unit: 'MΩ', value: '1800', limit: '≥ 1000', eval: 'Đạt' },
      { name: 'Kiểm tra đo điện trở tiếp xúc mối nối tiếp cực', unit: 'μΩ', value: '12.0', limit: 'Tối ưu', eval: 'Đạt' },
      { name: 'Kiểm tra độ trơn tru đóng cắt cơ học', unit: 'Lần', value: 'Đóng cắt tốt', limit: 'Trơn hoạt động', eval: 'Đạt' }
    ],
    images: [],
    attachments: [],
    signing: []
  }
];
