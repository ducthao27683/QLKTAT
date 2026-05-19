export const MOCK_INCIDENTS = [
  {
    id: 1,
    time: '2026-04-05 08:30:15',
    device: 'Máy biến áp T1 - TBA 110kV Phố Nối',
    description: 'Phát hiện rò rỉ dầu tại van xả đáy máy biến áp T1. Mức dầu trong bình dầu phụ giảm nhanh. Đã thực hiện tách máy biến áp ra khỏi vận hành để kiểm tra và xử lý.',
    cause: 'Do gioăng cao su tại vị trí van xả đáy bị lão hóa dẫn đến mất khả năng làm kín.',
    status: 'Đang xử lý',
    voltage: '110kV',
    type: 'TBA',
    images: ['https://picsum.photos/seed/transformer1/800/600', 'https://picsum.photos/seed/transformer2/800/600'],
    attachments: [{ name: 'Bien_ban_su_co.pdf', size: '1.2 MB' }, { name: 'Anh_hien_truong.jpg', size: '0.8 MB' }],
    reduction: { status: 'Chờ duyệt', content: 'Đăng ký giảm trừ sự cố do nguyên nhân khách quan (lão hóa thiết bị).' },
    tracking: [
      { date: '2026-04-05 09:00', content: 'Đội sửa chữa có mặt tại hiện trường.' },
      { date: '2026-04-05 10:30', content: 'Hoàn thành công tác xả dầu để thay gioăng.' },
    ]
  },
  {
    id: 2,
    time: '2026-04-03 14:20:00',
    device: 'Đường dây 110kV 171 E3.1',
    description: 'Sự cố thoáng qua lộ 171. Rơ le khoảng cách F21 tác động tại vùng 1. Đã thực hiện đóng lại thành công (ARC). Kiểm tra hiện trường không phát hiện dấu vết phóng điện.',
    cause: 'Nghi ngờ do chim đậu hoặc vật lạ bay vào đường dây gây ngắn mạch thoáng qua.',
    status: 'Xử lý xong',
    voltage: '110kV',
    type: 'Dz',
    images: ['https://picsum.photos/seed/line1/800/600'],
    attachments: [{ name: 'Bao_cao_ARC.pdf', size: '0.5 MB' }],
    reduction: { status: 'Đã duyệt', content: 'Đã được duyệt giảm trừ sự cố thoáng qua.' },
    tracking: [
      { date: '2026-04-03 15:00', content: 'Kiểm tra hành lang tuyến, không phát hiện bất thường.' },
    ]
  },
  {
    id: 3,
    time: '2026-04-01 22:15:45',
    device: 'Ngăn lộ 112 - TBA 110kV Khoái Châu',
    description: 'Máy cắt 112 không đóng được từ xa. Kiểm tra tại chỗ phát hiện cuộn đóng bị cháy.',
    cause: 'Cuộn đóng bị ẩm dẫn đến chạm chập và cháy khi có lệnh đóng.',
    status: 'Mới',
    voltage: '110kV',
    type: 'TBA',
    images: [],
    attachments: [],
    reduction: { status: 'Chưa đăng ký', content: '' },
    tracking: []
  },
  {
    id: 4,
    time: '2026-03-25 10:45:00',
    device: 'TBA 110kV Văn Lâm (E3.4)',
    description: 'Rơ le F87T tác động nhảy máy cắt 131, 431 máy biến áp T1 do sự cố ngắn mạch phía hạ áp.',
    cause: 'Do chuột cắn phá gây ngắn mạch tại thanh cái 22kV.',
    status: 'Xử lý xong',
    voltage: '110kV',
    type: 'TBA',
    images: ['https://picsum.photos/seed/substation1/800/600'],
    attachments: [{ name: 'Bao_cao_su_co_chuot.pdf', size: '1.5 MB' }],
    reduction: { status: 'Xử lý xong', content: 'Sự cố do động vật xâm nhập.' },
    tracking: [
      { date: '2026-03-25 11:30', content: 'Thay thế các đoạn thanh cái bị phóng điện.' },
      { date: '2026-03-25 14:00', content: 'Vệ sinh công nghiệp và đóng điện trở lại.' }
    ]
  },
  {
    id: 5,
    time: '2026-03-20 02:15:30',
    device: 'Đường dây 110kV 172 E3.5',
    description: 'Sự cố vĩnh cửu lộ 172. Rơ le F21 tác động vùng 1. Kiểm tra hiện trường phát hiện đứt dây pha C tại khoảng cột 45-46.',
    cause: 'Do sét đánh trực tiếp vào dây dẫn gây đứt dây.',
    status: 'Xử lý xong',
    voltage: '110kV',
    type: 'Dz',
    images: ['https://picsum.photos/seed/line2/800/600'],
    attachments: [{ name: 'Nhat_ky_su_co_172.docx', size: '0.9 MB' }],
    reduction: { status: 'Đã duyệt', content: 'Sự cố thiên tai (sét đánh).' },
    tracking: [
      { date: '2026-03-20 04:00', content: 'Vật tư đã được chuyển ra hiện trường.' },
      { date: '2026-03-20 08:30', content: 'Hoàn thành nối dây và căng dây.' }
    ]
  },
  {
    id: 6,
    time: '2026-03-15 16:20:00',
    device: 'TBA 110kV Mỹ Hào (E3.2)',
    description: 'Máy cắt 471 nhảy do tác động của bảo vệ quá dòng F51. Kiểm tra phát hiện phóng điện tại đầu cáp ngầm ra lộ 471.',
    cause: 'Do chất lượng đầu cáp bị suy giảm sau thời gian dài vận hành.',
    status: 'Đang xử lý',
    voltage: '22kV',
    type: 'TBA',
    images: ['https://picsum.photos/seed/cable1/800/600'],
    attachments: [],
    reduction: { status: 'Chưa đăng ký', content: '' },
    tracking: [
      { date: '2026-03-15 17:00', content: 'Đang thực hiện làm lại đầu cáp.' }
    ]
  }
];
