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
  }
];
