git /**
 * FOLDLINE / WASHIFY - Campus Laundry Management System
 * Production Frontend Implementation based on PRD v1.0 & Figma/Stitch specifications.
 */

// Initial Seed Data matching Figma and PDF Screenshots exactly
const INITIAL_DATA = {
  currentUser: {
    id: 'staff-00',
    name: 'Vikas Nair',
    role: 'Owner / Admin',
    avatar: 'VN'
  },
  staffUsers: [
    { id: 'staff-00', name: 'Vikas Nair', role: 'Owner / Admin', avatar: 'VN' },
    { id: 'staff-01', name: 'Anika Rao', role: 'Owner / Admin', avatar: 'AR' },
    { id: 'staff-02', name: 'Sunil K.', role: 'Laundry Staff', avatar: 'SK' },
    { id: 'staff-03', name: 'Meera Nair', role: 'Laundry Staff', avatar: 'MN' }
  ],
  systemDate: '23 Oct 2026',
  systemTime: '11:30 am IST',
  settings: {
    businessName: 'Foldline Campus Laundry',
    campus: 'North campus · Bengaluru',
    workspaceId: 'FOLDLINE / WORKSPACE 01',
    serviceSlot: 'Evening collection: Hostels A & B · 5:00–7:00 pm · Main courtyard',
    lowBalanceThreshold: 5.00,
    defaultRate: 50.00,
    currencySymbol: '₹'
  },
  customers: [
    {
      id: 'CUS-0086',
      name: 'Arun Shah',
      initials: 'AS',
      phone: '+91 98765 43210',
      hostel: 'Hostel B',
      room: 'B-118',
      collegeYear: '2nd year',
      activePackageId: 'PKG-0086-B',
      notes: 'Prefers mild detergent. Delicates in separate bag.'
    },
    {
      id: 'CUS-0042',
      name: 'Riya S.',
      initials: 'RS',
      phone: '+91 98765 43211',
      hostel: 'Hostel B',
      room: '214',
      collegeYear: '3rd year',
      activePackageId: 'PKG-0042-A',
      notes: 'Collects in evening slots.'
    },
    {
      id: 'CUS-0031',
      name: 'Kabir M.',
      initials: 'KM',
      phone: '+91 98765 43212',
      hostel: 'Hostel A',
      room: '106',
      collegeYear: '2nd year',
      activePackageId: 'PKG-0031-A',
      notes: 'Hostel A cart representative.'
    },
    {
      id: 'CUS-0112',
      name: 'Ananya Patel',
      initials: 'AP',
      phone: '+91 98765 43213',
      hostel: 'Hostel A',
      room: '204',
      collegeYear: '1st year',
      activePackageId: 'PKG-0112-A',
      notes: 'Low balance warning active.'
    },
    {
      id: 'CUS-0093',
      name: 'Neha Rao',
      initials: 'NR',
      phone: '+91 98765 43214',
      hostel: 'Hostel B',
      room: '108',
      collegeYear: '3rd year',
      activePackageId: 'PKG-0093-A',
      notes: ''
    },
    {
      id: 'CUS-0105',
      name: 'Priya Menon',
      initials: 'PM',
      phone: '+91 98765 43215',
      hostel: 'Hostel B',
      room: '306',
      collegeYear: '4th year',
      activePackageId: 'PKG-0105-A',
      notes: 'Package exhausted. Needs renewal.'
    },
    {
      id: 'CUS-0074',
      name: 'Vivek Nair',
      initials: 'VN',
      phone: '+91 98765 43216',
      hostel: 'Hostel A',
      room: '312',
      collegeYear: '2nd year',
      activePackageId: 'PKG-0074-A',
      notes: ''
    },
    {
      id: 'CUS-0058',
      name: 'Rahul Das',
      initials: 'RD',
      phone: '+91 98765 43217',
      hostel: 'Hostel A',
      room: '210',
      collegeYear: '4th year',
      activePackageId: 'PKG-0058-A',
      notes: 'Requires iron finish.'
    },
    {
      id: 'CUS-0091',
      name: 'Dev Kumar',
      initials: 'DK',
      phone: '+91 98765 43218',
      hostel: 'Hostel A',
      room: '111',
      collegeYear: '2nd year',
      activePackageId: 'PKG-0091-A',
      notes: ''
    },
    {
      id: 'CUS-0065',
      name: 'Sara Ali',
      initials: 'SA',
      phone: '+91 98765 43219',
      hostel: 'Hostel B',
      room: '202',
      collegeYear: '3rd year',
      activePackageId: 'PKG-0065-A',
      notes: ''
    },
    {
      id: 'CUS-0052',
      name: 'Meera Joshi',
      initials: 'MJ',
      phone: '+91 98765 43220',
      hostel: 'Hostel B',
      room: '112',
      collegeYear: '1st year',
      activePackageId: 'PKG-0052-A',
      notes: ''
    },
    {
      id: 'CUS-0103',
      name: 'Isha Verma',
      initials: 'IV',
      phone: '+91 98765 43221',
      hostel: 'Hostel B',
      room: '305',
      collegeYear: '4th year',
      activePackageId: 'PKG-0103-A',
      notes: ''
    },
    {
      id: 'CUS-0048',
      name: 'Aditya Sen',
      initials: 'ASen',
      phone: '+91 98765 43222',
      hostel: 'Hostel A',
      room: '115',
      collegeYear: '2nd year',
      activePackageId: 'PKG-0048-A',
      notes: ''
    },
    {
      id: 'CUS-0079',
      name: 'Omar Khan',
      initials: 'OK',
      phone: '+91 98765 43223',
      hostel: 'Hostel A',
      room: '209',
      collegeYear: '3rd year',
      activePackageId: 'PKG-0079-A',
      notes: ''
    },
    {
      id: 'CUS-0419',
      name: 'Aarav Patel',
      initials: 'APat',
      phone: '+91 94451 22334',
      hostel: 'Hostel A',
      room: '104',
      collegeYear: '2nd Year Mech',
      activePackageId: 'PKG-0419-M',
      notes: 'Monsoon Saver package subscriber.'
    }
  ],
  packages: [
    {
      id: 'PKG-0086-B',
      customerId: 'CUS-0086',
      name: 'Campus 90',
      purchasedKg: 90.00,
      ratePerKg: 50.00,
      amountPaid: 4500.00,
      purchasedAt: '01 Oct 2026',
      expiresAt: '31 Dec 2026',
      status: 'Active'
    },
    {
      id: 'PKG-0086-A',
      customerId: 'CUS-0086',
      name: 'Campus 60',
      purchasedKg: 60.00,
      ratePerKg: 50.00,
      amountPaid: 3000.00,
      purchasedAt: '01 Jul 2026',
      expiresAt: '28 Sep 2026',
      status: 'Exhausted',
      usedKg: 60.00
    },
    {
      id: 'PKG-0042-A',
      customerId: 'CUS-0042',
      name: 'Campus 90',
      purchasedKg: 90.00,
      ratePerKg: 50.00,
      amountPaid: 4500.00,
      purchasedAt: '05 Sep 2026',
      status: 'Active'
    },
    {
      id: 'PKG-0031-A',
      customerId: 'CUS-0031',
      name: 'Campus 90',
      purchasedKg: 90.00,
      ratePerKg: 50.00,
      amountPaid: 4500.00,
      purchasedAt: '12 Sep 2026',
      status: 'Active'
    },
    {
      id: 'PKG-0112-A',
      customerId: 'CUS-0112',
      name: 'Campus 30',
      purchasedKg: 30.00,
      ratePerKg: 50.00,
      amountPaid: 1500.00,
      purchasedAt: '15 Sep 2026',
      status: 'Low balance'
    },
    {
      id: 'PKG-0093-A',
      customerId: 'CUS-0093',
      name: 'Campus 90',
      purchasedKg: 90.00,
      ratePerKg: 50.00,
      amountPaid: 4500.00,
      purchasedAt: '20 Sep 2026',
      status: 'Active'
    },
    {
      id: 'PKG-0105-A',
      customerId: 'CUS-0105',
      name: 'Campus 60',
      purchasedKg: 60.00,
      ratePerKg: 50.00,
      amountPaid: 3000.00,
      purchasedAt: '01 Aug 2026',
      status: 'Exhausted'
    },
    {
      id: 'PKG-0074-A',
      customerId: 'CUS-0074',
      name: 'Campus 60',
      purchasedKg: 60.00,
      ratePerKg: 50.00,
      amountPaid: 3000.00,
      purchasedAt: '10 Sep 2026',
      status: 'Active'
    },
    {
      id: 'PKG-0058-A',
      customerId: 'CUS-0058',
      name: 'Campus 45',
      purchasedKg: 45.00,
      ratePerKg: 50.00,
      amountPaid: 2250.00,
      purchasedAt: '01 Sep 2026',
      status: 'Low balance'
    },
    {
      id: 'PKG-0091-A',
      customerId: 'CUS-0091',
      name: 'Campus 90',
      purchasedKg: 90.00,
      ratePerKg: 50.00,
      amountPaid: 4500.00,
      purchasedAt: '25 Sep 2026',
      status: 'Active'
    },
    {
      id: 'PKG-0065-A',
      customerId: 'CUS-0065',
      name: 'Campus 60',
      purchasedKg: 60.00,
      ratePerKg: 50.00,
      amountPaid: 3000.00,
      purchasedAt: '18 Sep 2026',
      status: 'Active'
    },
    {
      id: 'PKG-0052-A',
      customerId: 'CUS-0052',
      name: 'Campus 60',
      purchasedKg: 60.00,
      ratePerKg: 50.00,
      amountPaid: 3000.00,
      purchasedAt: '22 Sep 2026',
      status: 'Active'
    },
    {
      id: 'PKG-0103-A',
      customerId: 'CUS-0103',
      name: 'Campus 45',
      purchasedKg: 45.00,
      ratePerKg: 50.00,
      amountPaid: 2250.00,
      purchasedAt: '15 Sep 2026',
      status: 'Active'
    },
    {
      id: 'PKG-0048-A',
      customerId: 'CUS-0048',
      name: 'Campus 60',
      purchasedKg: 60.00,
      ratePerKg: 50.00,
      amountPaid: 3000.00,
      purchasedAt: '10 Sep 2026',
      status: 'Active'
    },
    {
      id: 'PKG-0079-A',
      customerId: 'CUS-0079',
      name: 'Campus 60',
      purchasedKg: 60.00,
      ratePerKg: 50.00,
      amountPaid: 3000.00,
      purchasedAt: '05 Sep 2026',
      status: 'Active'
    },
    {
      id: 'PKG-0419-M',
      customerId: 'CUS-0419',
      name: 'Monsoon Saver 90 kg Prepaid',
      purchasedKg: 90.00,
      ratePerKg: 50.00,
      amountPaid: 4500.00,
      purchasedAt: '10 Aug 2026',
      status: 'Low balance'
    }
  ],
  packageTransactions: [
    // Arun Shah Ledger (Exact from Page 1 screenshot)
    {
      id: 'TX-001',
      packageId: 'PKG-0086-B',
      customerId: 'CUS-0086',
      date: '01 Oct 2026',
      time: '09:00 am',
      orderId: null,
      type: 'PURCHASE',
      entryLabel: 'Package assigned',
      details: '90.00 kg added · Anika Rao',
      kgDelta: 90.00,
      balanceAfter: 90.00,
      staff: 'Anika Rao'
    },
    {
      id: 'TX-002',
      packageId: 'PKG-0086-B',
      customerId: 'CUS-0086',
      date: '05 Oct 2026',
      time: '11:15 am',
      orderId: 'ORD-0891',
      type: 'USAGE',
      entryLabel: 'ORD-0891',
      details: 'Intake · Anika Rao',
      kgDelta: -4.00,
      balanceAfter: 86.00,
      staff: 'Anika Rao'
    },
    {
      id: 'TX-003',
      packageId: 'PKG-0086-B',
      customerId: 'CUS-0086',
      date: '10 Oct 2026',
      time: '10:30 am',
      orderId: 'ORD-0936',
      type: 'USAGE',
      entryLabel: 'ORD-0936',
      details: 'Intake · Sunil K.',
      kgDelta: -3.20,
      balanceAfter: 82.80,
      staff: 'Sunil K.'
    },
    {
      id: 'TX-004',
      packageId: 'PKG-0086-B',
      customerId: 'CUS-0086',
      date: '15 Oct 2026',
      time: '09:45 am',
      orderId: 'ORD-0984',
      type: 'USAGE',
      entryLabel: 'ORD-0984',
      details: 'Intake · Sunil K.',
      kgDelta: -4.80,
      balanceAfter: 78.00,
      staff: 'Sunil K.'
    },
    {
      id: 'TX-005',
      packageId: 'PKG-0086-B',
      customerId: 'CUS-0086',
      date: '19 Oct 2026',
      time: '10:05 am',
      orderId: 'ORD-1028',
      type: 'USAGE',
      entryLabel: 'ORD-1028',
      details: 'Intake · Meera Nair',
      kgDelta: -6.00,
      balanceAfter: 72.00,
      staff: 'Meera Nair'
    },
    {
      id: 'TX-006',
      packageId: 'PKG-0086-B',
      customerId: 'CUS-0086',
      date: '23 Oct 2026',
      time: '10:42 am',
      orderId: 'ORD-1058',
      type: 'USAGE',
      entryLabel: 'ORD-1058',
      details: 'Intake · Anika Rao',
      kgDelta: -4.50,
      balanceAfter: 67.50,
      staff: 'Anika Rao'
    },
    // Aarav Patel Ledger (From Figma Stitch screen 4)
    {
      id: 'TX-101',
      packageId: 'PKG-0419-M',
      customerId: 'CUS-0419',
      date: '10 Aug 2026',
      time: '09:00 am',
      orderId: null,
      type: 'PURCHASE',
      entryLabel: 'Monsoon Saver Purchase',
      details: '90.00 kg credited · Anika Rao',
      kgDelta: 90.00,
      balanceAfter: 90.00,
      staff: 'Anika Rao'
    },
    {
      id: 'TX-102',
      packageId: 'PKG-0419-M',
      customerId: 'CUS-0419',
      date: '05 Oct 2026',
      time: '10:00 am',
      orderId: 'REV-004',
      type: 'ADJUSTMENT',
      entryLabel: 'REV-004 Tare Correction',
      details: 'Weigh scale tare correction approved',
      kgDelta: 3.00,
      balanceAfter: 25.00,
      staff: 'Anika Rao'
    },
    {
      id: 'TX-103',
      packageId: 'PKG-0419-M',
      customerId: 'CUS-0419',
      date: '12 Oct 2026',
      time: '11:00 am',
      orderId: 'ORD-0984',
      type: 'USAGE',
      entryLabel: 'ORD-0984',
      details: 'Intake · Anita R.',
      kgDelta: -3.50,
      balanceAfter: 21.50,
      staff: 'Anita R.'
    },
    {
      id: 'TX-104',
      packageId: 'PKG-0419-M',
      customerId: 'CUS-0419',
      date: '18 Oct 2026',
      time: '10:30 am',
      orderId: 'ORD-1012',
      type: 'USAGE',
      entryLabel: 'ORD-1012',
      details: 'Intake · Sunil K.',
      kgDelta: -5.20,
      balanceAfter: 16.30,
      staff: 'Sunil K.'
    },
    {
      id: 'TX-105',
      packageId: 'PKG-0419-M',
      customerId: 'CUS-0419',
      date: '23 Oct 2026',
      time: '09:15 am',
      orderId: 'ORD-1038',
      type: 'USAGE',
      entryLabel: 'ORD-1038',
      details: 'Intake · Sunil K.',
      kgDelta: -4.80,
      balanceAfter: 11.50,
      staff: 'Sunil K.'
    }
  ],
  orders: [
    // Received Today (23 Oct)
    {
      id: 'ORD-1058',
      customerId: 'CUS-0086',
      customerName: 'Arun Shah',
      hostel: 'Hostel B',
      room: 'B-118',
      weightKg: 4.50,
      receivedAt: '23 Oct 2026, 10:42 am',
      receiptDate: '23 Oct 2026',
      status: 'Received',
      itemsSummary: '6 shirts, 2 trousers, 1 bedsheet',
      isCarriedForward: false,
      receivedBy: 'Anika Rao'
    },
    {
      id: 'ORD-1057',
      customerId: 'CUS-0112',
      customerName: 'Ananya Patel',
      hostel: 'Hostel A',
      room: 'A-204',
      weightKg: 2.80,
      receivedAt: '23 Oct 2026, 10:28 am',
      receiptDate: '23 Oct 2026',
      status: 'Received',
      itemsSummary: '4 shirts, 1 jeans, 2 towels',
      isCarriedForward: false,
      receivedBy: 'Anika Rao'
    },
    {
      id: 'ORD-1056',
      customerId: 'CUS-0074',
      customerName: 'Vivek Nair',
      hostel: 'Hostel A',
      room: 'A-312',
      weightKg: 3.20,
      receivedAt: '23 Oct 2026, 10:15 am',
      receiptDate: '23 Oct 2026',
      status: 'In Laundry',
      itemsSummary: 'Daily wash, 8 items',
      isCarriedForward: false,
      receivedBy: 'Sunil K.'
    },
    {
      id: 'ORD-1055',
      customerId: 'CUS-0093',
      customerName: 'Neha Rao',
      hostel: 'Hostel B',
      room: 'B-108',
      weightKg: 3.20,
      receivedAt: '23 Oct 2026, 9:55 am',
      receiptDate: '23 Oct 2026',
      status: 'Ready',
      itemsSummary: '5 t-shirts, 2 trousers',
      isCarriedForward: false,
      receivedBy: 'Meera Nair'
    },
    {
      id: 'ORD-1052',
      customerId: 'CUS-0091',
      customerName: 'Dev Kumar',
      hostel: 'Hostel A',
      room: 'A-111',
      weightKg: 4.10,
      receivedAt: '23 Oct 2026, 9:20 am',
      receiptDate: '23 Oct 2026',
      status: 'Ready',
      itemsSummary: 'Curtains and pillow covers',
      isCarriedForward: false,
      receivedBy: 'Sunil K.'
    },
    {
      id: 'ORD-1050',
      customerId: 'CUS-0065',
      customerName: 'Sara Ali',
      hostel: 'Hostel B',
      room: 'B-202',
      weightKg: 2.60,
      receivedAt: '23 Oct 2026, 8:45 am',
      receiptDate: '23 Oct 2026',
      status: 'Ready',
      itemsSummary: 'White wash & steam press',
      isCarriedForward: false,
      receivedBy: 'Anika Rao'
    },
    // Carried Forward Orders (Received before 23 Oct and still open)
    {
      id: 'ORD-1047',
      customerId: 'CUS-0058',
      customerName: 'Rahul Das',
      hostel: 'Hostel A',
      room: 'A-210',
      weightKg: 3.60,
      receivedAt: '22 Oct 2026, 5:35 pm',
      receiptDate: '22 Oct 2026',
      status: 'In Laundry',
      itemsSummary: '4 formals, 2 blazers',
      isCarriedForward: true,
      receivedBy: 'Sunil K.'
    },
    {
      id: 'ORD-1042',
      customerId: 'CUS-0042',
      customerName: 'Riya S.',
      hostel: 'Hostel B',
      room: 'B-214',
      weightKg: 2.40,
      receivedAt: '22 Oct 2026, 5:10 pm',
      receiptDate: '22 Oct 2026',
      status: 'Ready',
      itemsSummary: 'Bedding set & hoodies',
      isCarriedForward: true,
      receivedBy: 'Meera Nair'
    },
    {
      id: 'ORD-1031',
      customerId: 'CUS-0031',
      customerName: 'Kabir M.',
      hostel: 'Hostel A',
      room: 'A-106',
      weightKg: 3.10,
      receivedAt: '21 Oct 2026, 4:30 pm',
      receiptDate: '21 Oct 2026',
      status: 'Ready',
      itemsSummary: 'Sports jerseys & tracks',
      isCarriedForward: true,
      receivedBy: 'Anika Rao'
    },
    // Completed / Handed Over Today (23 Oct)
    {
      id: 'ORD-1040',
      customerId: 'CUS-0052',
      customerName: 'Meera Joshi',
      hostel: 'Hostel B',
      room: 'B-112',
      weightKg: 3.60,
      receivedAt: '22 Oct 2026, 4:10 pm',
      receiptDate: '22 Oct 2026',
      status: 'Delivered',
      itemsSummary: 'Regular laundry',
      isCarriedForward: true,
      receivedBy: 'Anika Rao',
      deliveredAt: '23 Oct 2026, 11:12 am',
      deliveredBy: 'Anika Rao'
    },
    {
      id: 'ORD-1051',
      customerId: 'CUS-0103',
      customerName: 'Isha Verma',
      hostel: 'Hostel B',
      room: 'B-305',
      weightKg: 2.80,
      receivedAt: '23 Oct 2026, 8:30 am',
      receiptDate: '23 Oct 2026',
      status: 'Delivered',
      itemsSummary: 'Winter jacket & thermals',
      isCarriedForward: false,
      receivedBy: 'Meera Nair',
      deliveredAt: '23 Oct 2026, 11:05 am',
      deliveredBy: 'Meera Nair'
    },
    {
      id: 'ORD-1035',
      customerId: 'CUS-0048',
      customerName: 'Aditya Sen',
      hostel: 'Hostel A',
      room: 'A-115',
      weightKg: 2.70,
      receivedAt: '21 Oct 2026, 5:40 pm',
      receiptDate: '21 Oct 2026',
      status: 'Delivered',
      itemsSummary: 'Towels and linen',
      isCarriedForward: true,
      receivedBy: 'Anika Rao',
      deliveredAt: '23 Oct 2026, 10:58 am',
      deliveredBy: 'Anika Rao'
    },
    {
      id: 'ORD-1049',
      customerId: 'CUS-0079',
      customerName: 'Omar Khan',
      hostel: 'Hostel A',
      room: 'A-209',
      weightKg: 2.70,
      receivedAt: '23 Oct 2026, 8:15 am',
      receiptDate: '23 Oct 2026',
      status: 'Delivered',
      itemsSummary: 'Denims and shirts',
      isCarriedForward: false,
      receivedBy: 'Meera Nair',
      deliveredAt: '23 Oct 2026, 10:50 am',
      deliveredBy: 'Meera Nair'
    }
  ],
  recentActivity: [
    { id: 'ACT-01', text: 'ORD-1040 handed over to Meera Joshi', time: '11:12 am', staff: 'Anika Rao', icon: 'check-circle' },
    { id: 'ACT-02', text: 'ORD-1058 received from Arun Shah · 4.50 kg', time: '10:42 am', staff: 'Anika Rao', icon: 'package-plus' },
    { id: 'ACT-03', text: 'ORD-1042 marked ready for Riya S.', time: '10:20 am', staff: 'Meera Nair', icon: 'sparkles' }
  ],
  executiveStats: {
    facilityName: 'Facility Hub 01 (Central)',
    activeCycle: 'Oct 2026 (Live)',
    hubId: 'Campus Hub #04',
    mtdGrossRevenue: 142850,
    grossRevenueFormatted: '₹1,42,850',
    grossRevenueGrowth: '+18.4%',
    revenueTarget: 135000,
    revenuePacing: '105.8% of pacing',
    processedOutputKg: 4820.5,
    outputGrowth: '+14.2%',
    slaCompliance: 98.4,
    slaBenchmark: 95.0,
    activeSubscribers: 642,
    newSubscribersThisWeek: 38,
    dormBacklogs: 0,
    weeklyAvgKg: 688.6,
    netBalanceKg: 48.0
  },
  packagesConfig: [
    {
      id: 'TIER-SILVER',
      name: 'Silver Basic',
      category: 'Standard',
      badgeClass: 'bg-surface-container text-secondary font-medium',
      quotaKg: 25.0,
      ratePerKg: 45.0,
      totalPrice: 1125.0,
      durationLabel: 'per student / mo',
      subscribedCount: 218,
      popular: false
    },
    {
      id: 'TIER-GOLD',
      name: 'Gold Heavy',
      category: 'Priority',
      badgeClass: 'bg-primary-fixed text-on-primary-fixed font-semibold',
      quotaKg: 40.0,
      ratePerKg: 40.0,
      totalPrice: 1600.0,
      durationLabel: 'per student / mo',
      subscribedCount: 496,
      popular: true
    },
    {
      id: 'TIER-SEMESTER',
      name: 'Semester Saver',
      category: 'Bulk',
      badgeClass: 'bg-surface-container text-secondary font-medium',
      quotaKg: 75.0,
      ratePerKg: 36.0,
      totalPrice: 2700.0,
      durationLabel: 'per semester',
      subscribedCount: 128,
      popular: false
    },
    {
      id: 'TIER-CAMPUS90',
      name: 'Campus 90 Prepaid',
      category: 'Hostel Regular',
      badgeClass: 'bg-teal-50 text-teal-800 font-semibold',
      quotaKg: 90.0,
      ratePerKg: 50.0,
      totalPrice: 4500.0,
      durationLabel: 'full semester',
      subscribedCount: 84,
      popular: false
    }
  ],
  shiftSupervisors: [
    {
      id: 'SUP-01',
      name: 'Devon Vance',
      shiftName: 'Morning',
      timeSlot: '06:00 - 14:00',
      icon: 'wb_sunny',
      ordersCount: 512,
      outputKg: 2284.0,
      slaRate: 98.2,
      orderRefRange: 'Order #012410 - #012922',
      tareDiscrepancy: '0.02%',
      tareStatus: 'Optimal',
      tareStatusColor: 'text-primary'
    },
    {
      id: 'SUP-02',
      name: 'Marcus Sterling',
      shiftName: 'Evening',
      timeSlot: '14:00 - 22:00',
      icon: 'wb_twilight',
      ordersCount: 438,
      outputKg: 1940.5,
      slaRate: 92.4,
      orderRefRange: 'Order #142410 - #142848',
      tareDiscrepancy: '0.05%',
      tareStatus: 'Review',
      tareStatusColor: 'text-amber-600'
    },
    {
      id: 'SUP-03',
      name: 'Althea Ramos',
      shiftName: 'Night / Maint',
      timeSlot: '22:00 - 06:00',
      icon: 'bedtime',
      ordersCount: 134,
      outputKg: 596.0,
      slaRate: 96.0,
      orderRefRange: 'Order #204101 - #204235',
      tareDiscrepancy: '0.01%',
      tareStatus: 'Pristine',
      tareStatusColor: 'text-primary'
    }
  ],
  throughputWeekly: [
    { day: 'Mon', dayShort: 'M', intakeKg: 620.0, dispatchKg: 570.0, intakePct: 65, dispatchPct: 60 },
    { day: 'Tue', dayShort: 'T', intakeKg: 745.0, dispatchKg: 710.0, intakePct: 78, dispatchPct: 74 },
    { day: 'Wed', dayShort: 'W', intakeKg: 810.0, dispatchKg: 785.0, intakePct: 85, dispatchPct: 82 },
    { day: 'Thu', dayShort: 'T', intakeKg: 880.0, dispatchKg: 860.0, intakePct: 92, dispatchPct: 90 },
    { day: 'Fri', dayShort: 'F', intakeKg: 910.0, dispatchKg: 870.0, intakePct: 95, dispatchPct: 91 },
    { day: 'Sat', dayShort: 'S', intakeKg: 670.0, dispatchKg: 725.0, intakePct: 70, dispatchPct: 76 },
    { day: 'Sun', dayShort: 'S', intakeKg: 955.0, dispatchKg: 920.0, intakePct: 100, dispatchPct: 96, peak: true }
  ],
  auditLogs: [
    { id: 'AUD-901', time: '11:15 am', shift: 'Morning', supervisor: 'Devon Vance', type: 'Tare Check', description: 'Scale calibration check #4 verified at 06:15 am', status: 'Verified', variance: '0.00 kg' },
    { id: 'AUD-902', time: '10:45 am', shift: 'Morning', supervisor: 'Devon Vance', type: 'Tare Override', description: 'Manual tare re-zeroed for bulk bin intake #ORD-1042', status: 'Approved', variance: '+0.04 kg' },
    { id: 'AUD-903', time: '09:20 am', shift: 'Morning', supervisor: 'Devon Vance', type: 'Bag Weight', description: 'Heavy canvas laundry bag deduction standard tare (0.25 kg)', status: 'Verified', variance: '0.00 kg' },
    { id: 'AUD-904', time: 'Yesterday 08:30 pm', shift: 'Evening', supervisor: 'Marcus Sterling', type: 'Tare Discrepancy', description: 'Arun Shah CUS-0086 dry weight recount variance flagged', status: 'Review Flag', variance: '+0.12 kg' },
    { id: 'AUD-905', time: 'Yesterday 04:10 pm', shift: 'Evening', supervisor: 'Marcus Sterling', type: 'Re-Weigh', description: 'Riya S. ORD-1042 delivery bag verification matched', status: 'Verified', variance: '0.00 kg' }
  ],
  payoutLedgers: [
    { id: 'PAY-108', date: '23 Oct 2026', method: 'Razorpay UPI Batch #41', gross: 54200, fee: 1084, net: 53116, status: 'Settled to HDFC **4819' },
    { id: 'PAY-107', date: '22 Oct 2026', method: 'Razorpay UPI Batch #40', gross: 48900, fee: 978, net: 47922, status: 'Settled to HDFC **4819' },
    { id: 'PAY-106', date: '21 Oct 2026', method: 'Cart Terminal Handover Cash', gross: 14500, fee: 0, net: 14500, status: 'Deposited to Safe' },
    { id: 'PAY-105', date: '20 Oct 2026', method: 'Campus Monthly Advance', gross: 25250, fee: 0, net: 25250, status: 'Credited' }
  ]
};

// Global Store Manager
class AppStore {
  constructor() {
    const saved = localStorage.getItem('foldline_state_v1');
    if (saved) {
      try {
        this.state = JSON.parse(saved);
      } catch (e) {
        this.state = JSON.parse(JSON.stringify(INITIAL_DATA));
      }
    } else {
      this.state = JSON.parse(JSON.stringify(INITIAL_DATA));
    }

    // Ensure schema migration if cached from previous version
    if (!this.state.packagesConfig) this.state.packagesConfig = JSON.parse(JSON.stringify(INITIAL_DATA.packagesConfig));
    if (!this.state.shiftSupervisors) this.state.shiftSupervisors = JSON.parse(JSON.stringify(INITIAL_DATA.shiftSupervisors));
    if (!this.state.throughputWeekly) this.state.throughputWeekly = JSON.parse(JSON.stringify(INITIAL_DATA.throughputWeekly));
    if (!this.state.executiveStats) this.state.executiveStats = JSON.parse(JSON.stringify(INITIAL_DATA.executiveStats));
    if (!this.state.auditLogs) this.state.auditLogs = JSON.parse(JSON.stringify(INITIAL_DATA.auditLogs));
    if (!this.state.payoutLedgers) this.state.payoutLedgers = JSON.parse(JSON.stringify(INITIAL_DATA.payoutLedgers));
    if (!this.state.staffUsers.find(u => u.name === 'Vikas Nair')) {
      this.state.staffUsers.unshift({ id: 'staff-00', name: 'Vikas Nair', role: 'Owner / Admin', avatar: 'VN' });
    }

    // UI Runtime State (non-persistent)
    this.currentView = 'dashboard'; // 'dashboard' | 'customers' | 'customer-detail' | 'orders' | 'delivery' | 'intake' | 'reports' | 'settings'
    this.deviceMode = 'desktop'; // 'desktop' | 'mobile'
    this.selectedDeliveryOrderIds = new Set(['ORD-1042', 'ORD-1031']); // Pre-selected matching PDF page 5 & 6!
    this.selectedQueueOrderIds = new Set(['ORD-1056', 'ORD-1047']); // 2 in-laundry selected matching Page 4
    this.selectedCustomerId = 'CUS-0086'; // Arun Shah by default
    this.customerFilterStatus = 'all';
    this.customerFilterHostel = 'all';
    this.customerSearch = '';
    this.orderFilterStatus = 'outstanding';
    this.orderSearch = '';
    this.deliverySearch = '';
    this.deliveryHostelFilter = 'all';

    this.listeners = [];
  }

  save() {
    localStorage.setItem('foldline_state_v1', JSON.stringify(this.state));
    this.notify();
  }

  resetToDefault() {
    this.state = JSON.parse(JSON.stringify(INITIAL_DATA));
    this.selectedDeliveryOrderIds = new Set(['ORD-1042', 'ORD-1031']);
    this.selectedQueueOrderIds = new Set(['ORD-1056', 'ORD-1047']);
    this.save();
    showToast('Data reset to baseline PRD mock state', 'success');
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(fn => fn(this.state));
  }

  // PRD Business Rule BR-03 & BR-04: Calculate balance dynamically from append-only ledger
  getCustomerBalance(customerId) {
    const customer = this.state.customers.find(c => c.id === customerId);
    if (!customer) return { remainingKg: 0, usedKg: 0, totalKg: 0, remainingValue: 0, status: 'Exhausted' };

    const activePkg = this.state.packages.find(p => p.id === customer.activePackageId);
    if (!activePkg) return { remainingKg: 0, usedKg: 0, totalKg: 0, remainingValue: 0, status: 'Exhausted' };

    // Get all transactions for this package
    const txs = this.state.packageTransactions.filter(t => t.packageId === activePkg.id);
    let netPurchased = activePkg.purchasedKg;
    let netUsage = 0;
    let netAdjustments = 0;

    txs.forEach(t => {
      if (t.type === 'USAGE') {
        netUsage += Math.abs(t.kgDelta);
      } else if (t.type === 'ADJUSTMENT' || t.type === 'REVERSAL') {
        netAdjustments += t.kgDelta;
      }
    });

    const remainingKg = Math.max(0, netPurchased - netUsage + netAdjustments);
    const remainingValue = remainingKg * (activePkg.ratePerKg || 50);

    let status = 'Active';
    if (remainingKg <= 0.001) {
      status = 'Exhausted';
    } else if (remainingKg <= (this.state.settings.lowBalanceThreshold || 5.00)) {
      status = 'Low balance';
    }

    return {
      package: activePkg,
      totalKg: netPurchased,
      usedKg: netUsage - (netAdjustments < 0 ? netAdjustments : 0),
      remainingKg: Number(remainingKg.toFixed(2)),
      remainingValue: Math.round(remainingValue),
      ratePerKg: activePkg.ratePerKg || 50,
      status: status
    };
  }

  // FR-07, BR-04: Atomic intake and package deduction
  createIntake({ customerId, weightKg, itemSummary, notes }) {
    const customer = this.state.customers.find(c => c.id === customerId);
    if (!customer) throw new Error('Customer not found');

    const balanceInfo = this.getCustomerBalance(customerId);
    if (weightKg <= 0) throw new Error('Weight must be greater than 0 kg');

    if (weightKg > balanceInfo.remainingKg) {
      throw new Error(`Insufficient balance: ${weightKg.toFixed(2)} kg requested, but only ${balanceInfo.remainingKg.toFixed(2)} kg available.`);
    }

    const nextOrderNum = 1059 + this.state.orders.length - 13;
    const orderId = `ORD-${nextOrderNum}`;
    const newBalance = Number((balanceInfo.remainingKg - weightKg).toFixed(2));

    const newOrder = {
      id: orderId,
      customerId: customer.id,
      customerName: customer.name,
      hostel: customer.hostel,
      room: customer.room,
      weightKg: Number(weightKg.toFixed(2)),
      receivedAt: `${this.state.systemDate}, ${this.state.systemTime.split(' ')[0]} ${this.state.systemTime.split(' ')[1]}`,
      receiptDate: this.state.systemDate,
      status: 'Received',
      itemsSummary: itemSummary || 'Standard wash load',
      notes: notes || '',
      isCarriedForward: false,
      receivedBy: this.state.currentUser.name
    };

    const newTx = {
      id: `TX-${Date.now().toString().slice(-5)}`,
      packageId: balanceInfo.package.id,
      customerId: customer.id,
      date: this.state.systemDate,
      time: this.state.systemTime.split(' ')[0] + ' ' + this.state.systemTime.split(' ')[1],
      orderId: orderId,
      type: 'USAGE',
      entryLabel: orderId,
      details: `Intake · ${this.state.currentUser.name}`,
      kgDelta: -Number(weightKg.toFixed(2)),
      balanceAfter: newBalance,
      staff: this.state.currentUser.name
    };

    this.state.orders.unshift(newOrder);
    this.state.packageTransactions.push(newTx);
    this.state.recentActivity.unshift({
      id: `ACT-${Date.now()}`,
      text: `${orderId} received from ${customer.name} · ${weightKg.toFixed(2)} kg`,
      time: 'Just now',
      staff: this.state.currentUser.name,
      icon: 'package-plus'
    });

    this.save();
    return { order: newOrder, transaction: newTx, newBalance };
  }

  // FR-09, FR-10, BR-05: Handover confirmation with audit stamp
  confirmHandover(orderIds, collectorName = '') {
    if (!orderIds || orderIds.length === 0) return;

    let confirmedCount = 0;
    let totalKgHanded = 0;
    const staffName = this.state.currentUser.name;
    const timeStamp = `${this.state.systemDate}, ${this.state.systemTime}`;

    this.state.orders.forEach(order => {
      if (orderIds.includes(order.id)) {
        order.status = 'Delivered';
        order.deliveredAt = timeStamp;
        order.deliveredBy = staffName;
        order.collectorName = collectorName || order.customerName;
        totalKgHanded += order.weightKg;
        confirmedCount++;
      }
    });

    // Remove from active delivery check selection
    orderIds.forEach(id => this.selectedDeliveryOrderIds.delete(id));

    this.state.recentActivity.unshift({
      id: `ACT-${Date.now()}`,
      text: `${confirmedCount} order(s) handed over (${totalKgHanded.toFixed(2)} kg total)`,
      time: 'Just now',
      staff: staffName,
      icon: 'check-circle'
    });

    this.save();
    return { count: confirmedCount, totalKg: totalKgHanded };
  }

  // FR-14, BR-07, BR-12: Audited adjustment / Tare reversal
  addAuditedAdjustment(customerId, kgDelta, reason) {
    if (this.state.currentUser.role !== 'Owner / Admin') {
      throw new Error('Permission denied: Only Owner / Admin can perform audited package adjustments.');
    }

    const customer = this.state.customers.find(c => c.id === customerId);
    if (!customer) throw new Error('Customer not found');
    const balanceInfo = this.getCustomerBalance(customerId);

    const adjCode = `REV-${Math.floor(100 + Math.random() * 900)}`;
    const newBalance = Number((balanceInfo.remainingKg + kgDelta).toFixed(2));

    const newTx = {
      id: `TX-${Date.now().toString().slice(-5)}`,
      packageId: balanceInfo.package.id,
      customerId: customer.id,
      date: this.state.systemDate,
      time: this.state.systemTime.split(' ')[0] + ' ' + this.state.systemTime.split(' ')[1],
      orderId: adjCode,
      type: 'ADJUSTMENT',
      entryLabel: `${adjCode} Audited Adjustment`,
      details: `${reason} · Approved by ${this.state.currentUser.name}`,
      kgDelta: Number(kgDelta.toFixed(2)),
      balanceAfter: newBalance,
      staff: this.state.currentUser.name
    };

    this.state.packageTransactions.push(newTx);
    this.save();
    return newTx;
  }

  // Bulk update order queue statuses
  bulkUpdateQueueStatus(orderIds, newStatus) {
    if (!orderIds || orderIds.length === 0) return;
    this.state.orders.forEach(o => {
      if (orderIds.includes(o.id)) {
        o.status = newStatus;
        if (newStatus === 'Ready') {
          this.state.recentActivity.unshift({
            id: `ACT-${Date.now()}`,
            text: `${o.id} marked ready for ${o.customerName}`,
            time: 'Just now',
            staff: this.state.currentUser.name,
            icon: 'sparkles'
          });
        }
      }
    });
    this.selectedQueueOrderIds.clear();
    this.save();
  }

  // Add new customer profile (FR-01, FR-02)
  addCustomer({ name, phone, hostel, room, collegeYear, packageType }) {
    const codeNum = this.state.customers.length + 10;
    const customerId = `CUS-0${codeNum}`;
    const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

    const pkgKg = packageType === 'Campus 90' ? 90.00 : (packageType === 'Campus 60' ? 60.00 : 30.00);
    const pkgId = `PKG-0${codeNum}-A`;

    const newPkg = {
      id: pkgId,
      customerId: customerId,
      name: packageType,
      purchasedKg: pkgKg,
      ratePerKg: 50.00,
      amountPaid: pkgKg * 50.00,
      purchasedAt: this.state.systemDate,
      status: 'Active'
    };

    const newCust = {
      id: customerId,
      name,
      initials,
      phone,
      hostel,
      room,
      collegeYear,
      activePackageId: pkgId,
      notes: 'Newly enrolled resident.'
    };

    const initialTx = {
      id: `TX-${Date.now().toString().slice(-5)}`,
      packageId: pkgId,
      customerId: customerId,
      date: this.state.systemDate,
      time: '11:00 am',
      orderId: null,
      type: 'PURCHASE',
      entryLabel: 'Package assigned',
      details: `${pkgKg.toFixed(2)} kg added · ${this.state.currentUser.name}`,
      kgDelta: pkgKg,
      balanceAfter: pkgKg,
      staff: this.state.currentUser.name
    };

    this.state.packages.push(newPkg);
    this.state.customers.push(newCust);
    this.state.packageTransactions.push(initialTx);
    this.save();

    return customerId;
  }

  // Quota Packages & Pricing Management (from Washify Ops)
  publishNewQuotaPackage({ name, quotaKg, ratePerKg, durationLabel, category, popular }) {
    const kg = parseFloat(quotaKg) || 50.0;
    const rate = parseFloat(ratePerKg) || 40.0;
    const newTier = {
      id: 'TIER-' + Date.now().toString().slice(-6),
      name: name || 'Custom Plan',
      category: category || 'Custom',
      badgeClass: 'bg-primary-fixed text-on-primary-fixed font-semibold',
      quotaKg: kg,
      ratePerKg: rate,
      totalPrice: Math.round(kg * rate),
      durationLabel: durationLabel || 'per student / mo',
      subscribedCount: 0,
      popular: !!popular
    };
    this.state.packagesConfig.push(newTier);
    this.save();
    return newTier;
  }

  updatePackageRate(tierId, newRate, newQuota) {
    const tier = this.state.packagesConfig.find(p => p.id === tierId);
    if (tier) {
      if (newRate !== undefined) tier.ratePerKg = parseFloat(newRate);
      if (newQuota !== undefined) tier.quotaKg = parseFloat(newQuota);
      tier.totalPrice = Math.round(tier.quotaKg * tier.ratePerKg);
      this.save();
    }
  }

  exportAuditReportCSV() {
    let csv = 'Audit ID,Time,Shift,Supervisor,Type,Description,Status,Tare Variance\n';
    this.state.auditLogs.forEach(a => {
      csv += `"${a.id}","${a.time}","${a.shift}","${a.supervisor}","${a.type}","${a.description}","${a.status}","${a.variance}"\n`;
    });
    csv += '\nShift Performance Breakdown\n';
    csv += 'Shift,Supervisor,Time Window,Orders,Output (KG),SLA Rate,Tare Discrepancy,Status\n';
    this.state.shiftSupervisors.forEach(s => {
      csv += `"${s.shiftName}","${s.name}","${s.timeSlot}",${s.ordersCount},${s.outputKg.toFixed(1)},"${s.slaRate}%","${s.tareDiscrepancy}","${s.tareStatus}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `washify_shift_audit_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Shift Audit & Exception CSV exported', 'success');
  }

  exportPayoutReconciliationCSV() {
    let csv = 'Batch ID,Date,Payment Method,Gross Amount (INR),Platform Fee (INR),Net Settled (INR),Status\n';
    this.state.payoutLedgers.forEach(p => {
      csv += `"${p.id}","${p.date}","${p.method}",${p.gross},${p.fee},${p.net},"${p.status}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `washify_payout_reconciliation_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Facility Payout Ledger CSV exported', 'success');
  }
}

// Global Store Instance
const store = new AppStore();

// Utility Toast system
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let iconHtml = `
    <svg class="w-5 h-5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
    </svg>`;
  if (type === 'warning') {
    iconHtml = `
      <svg class="w-5 h-5 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>`;
  } else if (type === 'error') {
    iconHtml = `
      <svg class="w-5 h-5 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>`;
  }

  toast.innerHTML = `
    ${iconHtml}
    <div class="flex-1 text-sm font-medium leading-snug">${message}</div>
    <button class="text-slate-400 hover:text-white" onclick="this.parentElement.remove()">✕</button>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Global Nav & View Switcher
function navigateTo(viewName, params = {}) {
  store.currentView = viewName;
  if (params.customerId) {
    store.selectedCustomerId = params.customerId;
  }
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchDeviceMode(mode) {
  store.deviceMode = mode;
  render();
}

function switchStaffRole(staffId) {
  const staff = store.state.staffUsers.find(s => s.id === staffId);
  if (staff) {
    store.state.currentUser = staff;
    store.save();
    showToast(`Logged in as ${staff.name} (${staff.role})`, 'success');
    render();
  }
}

// Render Dashboard View (Matches PDF Page 4 & Figma Mobile Screen 1)
function renderDashboard() {
  const isMobile = store.deviceMode === 'mobile';
  const orders = store.state.orders;

  // Compute Metrics matching PDF
  const receivedToday = orders.filter(o => o.receiptDate === store.state.systemDate);
  const receivedTodayCount = receivedToday.length;
  const receivedTodayKg = receivedToday.reduce((sum, o) => sum + o.weightKg, 0);

  const readyOrders = orders.filter(o => o.status === 'Ready');
  const readyOrdersCount = readyOrders.length;
  const readyOrdersKg = readyOrders.reduce((sum, o) => sum + o.weightKg, 0);
  const readyEarlierCount = readyOrders.filter(o => o.isCarriedForward).length;

  const deliveredToday = orders.filter(o => o.status === 'Delivered' && o.deliveredAt && o.deliveredAt.includes(store.state.systemDate));
  const deliveredTodayCount = deliveredToday.length;
  const deliveredTodayKg = deliveredToday.reduce((sum, o) => sum + o.weightKg, 0);

  const outstandingOrders = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled');
  const outstandingCount = outstandingOrders.length;
  const outstandingKg = outstandingOrders.reduce((sum, o) => sum + o.weightKg, 0);

  const carriedForward = outstandingOrders.filter(o => o.isCarriedForward);
  const carriedForwardCount = carriedForward.length;
  const carriedForwardInLaundry = carriedForward.filter(o => o.status === 'In Laundry').length;
  const carriedForwardReady = carriedForward.filter(o => o.status === 'Ready').length;

  // Filter orders for table
  let queueOrders = outstandingOrders;
  if (store.orderFilterStatus === 'received') queueOrders = orders.filter(o => o.status === 'Received');
  else if (store.orderFilterStatus === 'in_laundry') queueOrders = orders.filter(o => o.status === 'In Laundry');
  else if (store.orderFilterStatus === 'ready') queueOrders = orders.filter(o => o.status === 'Ready');
  else if (store.orderFilterStatus === 'delivered') queueOrders = orders.filter(o => o.status === 'Delivered');
  else if (store.orderFilterStatus === 'cancelled') queueOrders = orders.filter(o => o.status === 'Cancelled');

  if (store.orderSearch.trim()) {
    const q = store.orderSearch.toLowerCase();
    queueOrders = queueOrders.filter(o =>
      o.id.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.room.toLowerCase().includes(q) ||
      o.hostel.toLowerCase().includes(q)
    );
  }

  // HTML content
  return `
    <div class="space-y-6 animate-fade-in pb-16">
      <!-- Top Title and Action Buttons -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-slate-900 tracking-tight">A clear view of your day.</h1>
          <p class="text-sm text-slate-500 mt-1">${store.state.systemDate} · North campus collection · Updated ${store.state.systemTime}</p>
        </div>
        <div class="flex items-center gap-3">
          <button onclick="navigateTo('delivery')" class="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition shadow-sm">
            <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            Delivery check
            <span class="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold bg-teal-100 text-teal-800 rounded-full">${readyOrdersCount}</span>
          </button>
          <button onclick="openNewIntakeModal()" class="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-700 text-white rounded-lg text-sm font-semibold hover:bg-teal-800 transition shadow-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            + New intake
          </button>
        </div>
      </div>

      <!-- 4 Core Metric Cards (Page 4) -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Received today -->
        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div class="flex items-center justify-between text-slate-500 mb-2">
            <span class="text-xs font-medium uppercase tracking-wider">Received today</span>
            <span class="p-1.5 bg-teal-50 text-teal-700 rounded-md">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
            </span>
          </div>
          <div class="text-3xl font-extrabold text-slate-900 font-mono">${receivedTodayCount}</div>
          <div class="text-xs text-slate-500 mt-1 font-mono">${receivedTodayKg.toFixed(2)} kg collected</div>
        </div>

        <!-- Ready for handover (Highlighted dark card as in PDF Page 4) -->
        <div class="bg-[#0b1b2b] text-white p-5 rounded-xl border border-teal-900 shadow-sm relative overflow-hidden cursor-pointer hover:border-teal-600 transition" onclick="navigateTo('delivery')">
          <div class="flex items-center justify-between text-teal-400 mb-2">
            <span class="text-xs font-medium uppercase tracking-wider">Ready for handover</span>
            <span class="p-1.5 bg-teal-950/80 text-teal-300 rounded-md">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            </span>
          </div>
          <div class="text-3xl font-extrabold text-white font-mono">${readyOrdersCount}</div>
          <div class="text-xs text-teal-300/80 mt-1 font-mono">${readyOrdersKg.toFixed(2)} kg · includes ${readyEarlierCount} from earlier</div>
        </div>

        <!-- Delivered today -->
        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div class="flex items-center justify-between text-slate-500 mb-2">
            <span class="text-xs font-medium uppercase tracking-wider">Delivered today</span>
            <span class="p-1.5 bg-emerald-50 text-emerald-700 rounded-md">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </span>
          </div>
          <div class="text-3xl font-extrabold text-slate-900 font-mono">${deliveredTodayCount}</div>
          <div class="text-xs text-slate-500 mt-1 font-mono">${deliveredTodayKg.toFixed(2)} kg handed over</div>
        </div>

        <!-- Outstanding -->
        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div class="flex items-center justify-between text-slate-500 mb-2">
            <span class="text-xs font-medium uppercase tracking-wider">Outstanding</span>
            <span class="p-1.5 bg-slate-100 text-slate-700 rounded-md">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </span>
          </div>
          <div class="text-3xl font-extrabold text-slate-900 font-mono">${outstandingCount}</div>
          <div class="text-xs text-slate-500 mt-1">
            Rec ${orders.filter(o => o.status === 'Received').length} · Laundry ${orders.filter(o => o.status === 'In Laundry').length} · Ready ${readyOrdersCount}
          </div>
        </div>
      </div>

      <!-- Carried Forward Amber Strip Alert (PRD FR-11, BR-11, Page 4) -->
      ${carriedForwardCount > 0 ? `
        <div class="bg-amber-50/80 border border-amber-200/90 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm">
          <div class="flex items-center gap-3">
            <span class="p-1.5 bg-amber-100 text-amber-800 rounded-md shrink-0">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"/></svg>
            </span>
            <div>
              <span class="font-bold text-amber-900">${carriedForwardCount} orders carried forward</span>
              <span class="text-amber-800 ml-1">Received before today and still outstanding: ${carriedForwardInLaundry} in laundry, ${carriedForwardReady} ready.</span>
            </div>
          </div>
          <button onclick="store.orderFilterStatus = 'outstanding'; render();" class="text-amber-900 font-semibold hover:underline flex items-center gap-1 shrink-0 text-xs sm:text-sm">
            Review orders →
          </button>
        </div>
      ` : ''}

      <!-- Order Queue Header & Filters (Page 4) -->
      <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="p-4 sm:p-5 border-b border-slate-200 space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div class="flex items-center gap-2">
              <h2 class="text-base font-bold text-slate-900">Order queue</h2>
              <span class="text-xs font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">${outstandingCount} outstanding</span>
            </div>
            <div class="text-xs text-slate-500">Updated at ${store.state.systemTime}</div>
          </div>

          <!-- Search & Status pills -->
          <div class="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div class="relative flex-1 max-w-md">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </span>
              <input 
                type="text" 
                placeholder="Search order, customer or room" 
                value="${store.orderSearch}"
                oninput="store.orderSearch = this.value; render();"
                class="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition"
              />
            </div>

            <!-- Status Tabs -->
            <div class="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-medium">
              ${[
                { key: 'outstanding', label: 'Outstanding', count: outstandingCount },
                { key: 'received', label: 'Received', count: orders.filter(o => o.status === 'Received').length },
                { key: 'in_laundry', label: 'In Laundry', count: orders.filter(o => o.status === 'In Laundry').length },
                { key: 'ready', label: 'Ready', count: readyOrdersCount },
                { key: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'Delivered').length },
                { key: 'cancelled', label: 'Cancelled', count: orders.filter(o => o.status === 'Cancelled').length }
              ].map(tab => `
                <button 
                  onclick="store.orderFilterStatus = '${tab.key}'; render();"
                  class="px-3 py-1.5 rounded-lg whitespace-nowrap transition flex items-center gap-1.5 ${store.orderFilterStatus === tab.key ? 'bg-teal-50 text-teal-800 border border-teal-200 font-semibold' : 'text-slate-600 hover:bg-slate-100 border border-transparent'}"
                >
                  ${tab.label}
                  <span class="text-[11px] opacity-75">${tab.count}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Multi-select Banner (Page 4: "2 in-laundry orders selected", "Clear selection", "Mark ready (2)") -->
          ${store.selectedQueueOrderIds.size > 0 ? `
            <div class="bg-teal-50 border border-teal-200 rounded-lg p-2.5 flex items-center justify-between text-xs sm:text-sm animate-fade-in">
              <div class="flex items-center gap-2 text-teal-900 font-medium">
                <svg class="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                <span>${store.selectedQueueOrderIds.size} order(s) selected</span>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="store.selectedQueueOrderIds.clear(); render();" class="text-slate-600 hover:text-slate-900 text-xs px-2 py-1">
                  Clear selection
                </button>
                <button onclick="store.bulkUpdateQueueStatus(Array.from(store.selectedQueueOrderIds), 'Ready'); showToast('Selected orders marked Ready!'); render();" class="bg-teal-700 hover:bg-teal-800 text-white font-semibold px-3 py-1.5 rounded-md text-xs shadow-sm flex items-center gap-1">
                  ✓ Mark ready (${store.selectedQueueOrderIds.size})
                </button>
              </div>
            </div>
          ` : ''}
        </div>

        <!-- Orders Table / Mobile Cards -->
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-slate-50/80 text-slate-500 font-semibold text-xs border-b border-slate-200">
              <tr>
                <th class="w-10 px-4 py-3 text-center">
                  <input 
                    type="checkbox" 
                    class="custom-checkbox"
                    ${queueOrders.length > 0 && queueOrders.every(o => store.selectedQueueOrderIds.has(o.id)) ? 'checked' : ''}
                    onchange="toggleAllQueueOrders(this.checked, ${JSON.stringify(queueOrders.map(o => o.id))})"
                  />
                </th>
                <th class="px-4 py-3">Order ID</th>
                <th class="px-4 py-3">Customer</th>
                <th class="px-4 py-3">Received</th>
                <th class="px-4 py-3 font-mono">Weight</th>
                <th class="px-4 py-3">Status</th>
                <th class="px-4 py-3">Exception</th>
                <th class="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${queueOrders.length === 0 ? `
                <tr>
                  <td colspan="8" class="text-center py-8 text-slate-400 text-sm">No orders matching current filter</td>
                </tr>
              ` : queueOrders.slice(0, 10).map(order => {
                const isSelected = store.selectedQueueOrderIds.has(order.id);
                return `
                  <tr class="hover:bg-slate-50/60 transition ${isSelected ? 'bg-teal-50/40' : ''}">
                    <td class="px-4 py-3.5 text-center">
                      <input 
                        type="checkbox" 
                        class="custom-checkbox"
                        ${isSelected ? 'checked' : ''}
                        onchange="toggleQueueOrder('${order.id}', this.checked)"
                      />
                    </td>
                    <td class="px-4 py-3.5 font-bold font-mono text-slate-900">${order.id}</td>
                    <td class="px-4 py-3.5">
                      <div class="font-semibold text-slate-900 hover:text-teal-700 cursor-pointer" onclick="navigateTo('customer-detail', { customerId: '${order.customerId}' })">
                        ${order.customerName}
                      </div>
                      <div class="text-xs text-slate-500">${order.room} · ${order.customerId}</div>
                    </td>
                    <td class="px-4 py-3.5 text-slate-600 text-xs font-mono">${order.receivedAt}</td>
                    <td class="px-4 py-3.5 font-bold text-slate-900 font-mono">${order.weightKg.toFixed(2)} kg</td>
                    <td class="px-4 py-3.5">
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                        order.status === 'Ready' ? 'bg-teal-100 text-teal-800' :
                        order.status === 'In Laundry' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'Received' ? 'bg-slate-100 text-slate-700' :
                        order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }">
                        ${order.status}
                      </span>
                    </td>
                    <td class="px-4 py-3.5">
                      ${order.isCarriedForward ? `
                        <span class="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          Carried forward
                        </span>
                      ` : '<span class="text-slate-300">—</span>'}
                    </td>
                    <td class="px-4 py-3.5 text-right">
                      <div class="flex items-center justify-end gap-1.5">
                        ${order.status === 'Received' ? `
                          <button onclick="store.bulkUpdateQueueStatus(['${order.id}'], 'In Laundry'); render();" class="text-xs px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium">Process</button>
                        ` : ''}
                        ${order.status === 'In Laundry' ? `
                          <button onclick="store.bulkUpdateQueueStatus(['${order.id}'], 'Ready'); render();" class="text-xs px-2.5 py-1 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded font-semibold">Mark Ready</button>
                        ` : ''}
                        ${order.status === 'Ready' ? `
                          <button onclick="navigateTo('delivery');" class="text-xs px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-semibold">Deliver</button>
                        ` : ''}
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
        
        <div class="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <div>Showing ${Math.min(queueOrders.length, 10)} of ${queueOrders.length} orders</div>
          <div class="flex gap-1">
            <button class="px-2 py-1 bg-white border border-slate-200 rounded disabled:opacity-50">‹</button>
            <span class="px-2 py-1 bg-white border border-slate-200 rounded font-bold">1</span>
            <button class="px-2 py-1 bg-white border border-slate-200 rounded">2</button>
            <button class="px-2 py-1 bg-white border border-slate-200 rounded">›</button>
          </div>
        </div>
      </div>

      <!-- Bottom Split: Package Attention & Recent Activity (Page 4) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Package Attention -->
        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-bold text-slate-900">Package attention</h3>
            <button onclick="navigateTo('customers')" class="text-xs text-teal-700 font-semibold hover:underline">View customers →</button>
          </div>
          <div class="space-y-3">
            <div class="flex items-center justify-between p-3 bg-amber-50/60 border border-amber-200 rounded-lg cursor-pointer hover:bg-amber-50" onclick="navigateTo('customer-detail', { customerId: 'CUS-0112' })">
              <div class="flex items-center gap-3">
                <span class="w-8 h-8 rounded-full bg-amber-200 text-amber-800 font-bold text-xs flex items-center justify-center">AP</span>
                <div>
                  <div class="font-bold text-sm text-slate-900">Ananya Patel</div>
                  <div class="text-xs text-slate-500">CUS-0112 · A-204</div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-sm font-bold text-amber-800 font-mono">2.00 kg</div>
                <span class="inline-flex text-[11px] font-semibold text-amber-700">Low balance</span>
              </div>
            </div>

            <div class="flex items-center justify-between p-3 bg-red-50/60 border border-red-200 rounded-lg cursor-pointer hover:bg-red-50" onclick="navigateTo('customer-detail', { customerId: 'CUS-0105' })">
              <div class="flex items-center gap-3">
                <span class="w-8 h-8 rounded-full bg-red-200 text-red-800 font-bold text-xs flex items-center justify-center">PM</span>
                <div>
                  <div class="font-bold text-sm text-slate-900">Priya Menon</div>
                  <div class="text-xs text-slate-500">CUS-0105 · B-306</div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-sm font-bold text-red-800 font-mono">0.00 kg</div>
                <span class="inline-flex text-[11px] font-semibold text-red-700">Exhausted</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activity Feed -->
        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-bold text-slate-900">Recent activity</h3>
            <span class="text-xs text-slate-400">All activity →</span>
          </div>
          <div class="space-y-3.5 text-xs">
            ${store.state.recentActivity.slice(0, 4).map(act => `
              <div class="flex items-start gap-3">
                <span class="p-1.5 bg-slate-100 text-teal-700 rounded-full mt-0.5">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                </span>
                <div class="flex-1">
                  <div class="font-semibold text-slate-900">${act.text}</div>
                  <div class="text-slate-400 text-[11px]">${act.time} · ${act.staff}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

// Render Customers List View (Matches PDF Page 2)
function renderCustomers() {
  const customers = store.state.customers.map(c => {
    const bal = store.getCustomerBalance(c.id);
    return { ...c, ...bal };
  });

  const totalCount = 128; // Display stats matching PDF Page 2
  const activeCount = 104;
  const lowCount = 18;
  const exhaustedCount = 6;

  let filtered = customers;
  if (store.customerFilterStatus === 'active') filtered = filtered.filter(c => c.status === 'Active');
  else if (store.customerFilterStatus === 'low') filtered = filtered.filter(c => c.status === 'Low balance');
  else if (store.customerFilterStatus === 'exhausted') filtered = filtered.filter(c => c.status === 'Exhausted');

  if (store.customerFilterHostel !== 'all') {
    filtered = filtered.filter(c => c.hostel.toLowerCase().includes(store.customerFilterHostel.toLowerCase()));
  }

  if (store.customerSearch.trim()) {
    const q = store.customerSearch.toLowerCase();
    filtered = filtered.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q) ||
      c.room.toLowerCase().includes(q)
    );
  }

  return `
    <div class="space-y-6 animate-fade-in pb-16">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div class="text-xs text-slate-400 font-medium">Workspace &gt; Customers</div>
          <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Customers</h1>
          <p class="text-sm text-slate-500 mt-0.5">Find a resident, check their balance, or assign their next package.</p>
        </div>
        <button onclick="openAddCustomerModal()" class="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-700 text-white rounded-lg text-sm font-semibold hover:bg-teal-800 transition shadow-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          Add customer
        </button>
      </div>

      <!-- 4 Stat Counters (Page 2) -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div class="p-2.5 bg-slate-100 text-slate-700 rounded-lg">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
          </div>
          <div>
            <div class="text-2xl font-extrabold text-slate-900 font-mono">${totalCount}</div>
            <div class="text-xs text-slate-500">Total customers</div>
          </div>
        </div>

        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div class="p-2.5 bg-teal-50 text-teal-700 rounded-lg">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
          </div>
          <div>
            <div class="text-2xl font-extrabold text-teal-800 font-mono">${activeCount}</div>
            <div class="text-xs text-slate-500">Active packages</div>
          </div>
        </div>

        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div class="p-2.5 bg-amber-50 text-amber-700 rounded-lg">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          </div>
          <div>
            <div class="text-2xl font-extrabold text-amber-800 font-mono">${lowCount}</div>
            <div class="text-xs text-slate-500">Low balance</div>
          </div>
        </div>

        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div class="p-2.5 bg-red-50 text-red-700 rounded-lg">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg>
          </div>
          <div>
            <div class="text-2xl font-extrabold text-red-800 font-mono">${exhaustedCount}</div>
            <div class="text-xs text-slate-500">Exhausted packages</div>
          </div>
        </div>
      </div>

      <!-- Search & Filters Container (Page 2) -->
      <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-4">
        <div class="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div class="relative flex-1 max-w-lg">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </span>
            <input 
              type="text" 
              placeholder="Search name, phone, customer ID, hostel or room" 
              value="${store.customerSearch}"
              oninput="store.customerSearch = this.value; render();"
              class="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition"
            />
          </div>

          <div class="flex items-center gap-2">
            <select 
              onchange="store.customerFilterHostel = this.value; render();"
              class="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="all" ${store.customerFilterHostel === 'all' ? 'selected' : ''}>All hostels</option>
              <option value="Hostel A" ${store.customerFilterHostel === 'Hostel A' ? 'selected' : ''}>Hostel A</option>
              <option value="Hostel B" ${store.customerFilterHostel === 'Hostel B' ? 'selected' : ''}>Hostel B</option>
            </select>

            <select class="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none">
              <option>All packages</option>
              <option>Campus 90</option>
              <option>Campus 60</option>
              <option>Campus 45</option>
            </select>
          </div>
        </div>

        <!-- Filter tabs bar -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between border-t border-slate-100 pt-3 gap-2">
          <div class="flex items-center gap-2 text-xs font-medium">
            <button onclick="store.customerFilterStatus = 'all'; render();" class="px-3 py-1 rounded-md transition ${store.customerFilterStatus === 'all' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'}">
              All customers <span class="ml-1 opacity-75">${totalCount}</span>
            </button>
            <button onclick="store.customerFilterStatus = 'active'; render();" class="px-3 py-1 rounded-md transition ${store.customerFilterStatus === 'active' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'}">
              Active <span class="ml-1 opacity-75">${activeCount}</span>
            </button>
            <button onclick="store.customerFilterStatus = 'low'; render();" class="px-3 py-1 rounded-md transition ${store.customerFilterStatus === 'low' ? 'bg-amber-600 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'}">
              Low balance <span class="ml-1 opacity-75">${lowCount}</span>
            </button>
            <button onclick="store.customerFilterStatus = 'exhausted'; render();" class="px-3 py-1 rounded-md transition ${store.customerFilterStatus === 'exhausted' ? 'bg-red-600 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'}">
              Exhausted <span class="ml-1 opacity-75">${exhaustedCount}</span>
            </button>
          </div>

          <div class="text-xs text-slate-400 font-mono">Low balance: ≤ 5.00 kg</div>
        </div>
      </div>

      <!-- Customers Table (Page 2) -->
      <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-slate-50 text-slate-500 font-semibold text-xs border-b border-slate-200">
              <tr>
                <th class="px-5 py-3">Customer</th>
                <th class="px-5 py-3">Phone</th>
                <th class="px-5 py-3">Hostel / room</th>
                <th class="px-5 py-3">College year</th>
                <th class="px-5 py-3 text-right font-mono">Remaining</th>
                <th class="px-5 py-3 text-center">Package status</th>
                <th class="px-5 py-3 text-right"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${filtered.map(cust => `
                <tr class="hover:bg-slate-50 cursor-pointer transition group" onclick="navigateTo('customer-detail', { customerId: '${cust.id}' })">
                  <td class="px-5 py-3.5">
                    <div class="flex items-center gap-3">
                      <span class="w-9 h-9 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 group-hover:bg-teal-100 group-hover:text-teal-800 transition">
                        ${cust.initials}
                      </span>
                      <div>
                        <div class="font-bold text-slate-900 group-hover:text-teal-700 transition">${cust.name}</div>
                        <div class="text-xs text-slate-400 font-mono">${cust.id}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-5 py-3.5 text-xs text-slate-600 font-mono">${cust.phone}</td>
                  <td class="px-5 py-3.5 text-xs text-slate-700 font-medium">${cust.hostel} · ${cust.room}</td>
                  <td class="px-5 py-3.5 text-xs text-slate-600">${cust.collegeYear}</td>
                  <td class="px-5 py-3.5 text-right font-mono font-bold text-slate-900">${cust.remainingKg.toFixed(2)} kg</td>
                  <td class="px-5 py-3.5 text-center">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      cust.status === 'Active' ? 'bg-teal-100 text-teal-800' :
                      cust.status === 'Low balance' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                    }">
                      ${cust.status}
                    </span>
                  </td>
                  <td class="px-5 py-3.5 text-right text-slate-400 group-hover:text-slate-700">
                    ›
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Pagination Bar (Page 2) -->
        <div class="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-600">
          <div>Showing 1–${Math.min(filtered.length, 8)} of ${totalCount} customers</div>
          <div class="flex items-center gap-1 font-medium">
            <button class="px-3 py-1 bg-white border border-slate-200 rounded shadow-sm hover:bg-slate-50">Previous</button>
            <span class="px-2.5 py-1 bg-teal-700 text-white rounded font-bold">1</span>
            <button class="px-2.5 py-1 bg-white border border-slate-200 rounded hover:bg-slate-50">2</button>
            <button class="px-2.5 py-1 bg-white border border-slate-200 rounded hover:bg-slate-50">3</button>
            <span class="px-1 text-slate-400">…</span>
            <button class="px-2.5 py-1 bg-white border border-slate-200 rounded hover:bg-slate-50">16</button>
            <button class="px-3 py-1 bg-white border border-slate-200 rounded shadow-sm hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>

      <!-- Banner promo (Page 2) -->
      <div class="bg-teal-50 border border-teal-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        <div class="flex items-center gap-3">
          <span class="p-2 bg-teal-100 text-teal-800 rounded-lg">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </span>
          <div>
            <div class="font-bold text-teal-950">A package for every collection.</div>
            <div class="text-xs text-teal-800">Open a customer to assign a predefined package. Low or exhausted balances need attention before the next intake.</div>
          </div>
        </div>
        <button class="text-teal-900 font-semibold hover:underline text-xs sm:text-sm whitespace-nowrap">
          View package options →
        </button>
      </div>
    </div>
  `;
}

// Render Customer Detail & Package Ledger (Matches PDF Page 1 & Figma Screen 4)
function renderCustomerDetail() {
  const customerId = store.selectedCustomerId || 'CUS-0086';
  const customer = store.state.customers.find(c => c.id === customerId) || store.state.customers[0];
  const balanceInfo = store.getCustomerBalance(customer.id);
  const activePkg = balanceInfo.package;

  // Transactions for this customer
  const ledger = store.state.packageTransactions
    .filter(t => t.customerId === customer.id)
    .sort((a, b) => b.id.localeCompare(a.id));

  // Customer orders
  const custOrders = store.state.orders.filter(o => o.customerId === customer.id);

  return `
    <div class="space-y-6 animate-fade-in pb-16">
      <!-- Breadcrumbs & Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span class="hover:text-slate-800 cursor-pointer" onclick="navigateTo('customers')">Customers</span>
            <span>/</span>
            <span class="font-mono">${customer.id}</span>
          </div>
          <div class="flex items-center gap-3 mt-1">
            <h1 class="text-2xl font-bold text-slate-900 tracking-tight">${customer.name}</h1>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
              balanceInfo.status === 'Active' ? 'bg-teal-100 text-teal-800' :
              balanceInfo.status === 'Low balance' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
            }">
              ${balanceInfo.status === 'Active' ? 'Active customer' : balanceInfo.status}
            </span>
          </div>
          <p class="text-sm text-slate-500">Customer profile and a complete history of every kilogram.</p>
        </div>

        <div class="flex items-center gap-3">
          <button onclick="showToast('Profile editing enabled for admin');" class="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 shadow-sm transition">
            <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
            Edit profile
          </button>
          <button onclick="openNewIntakeModal('${customer.id}')" class="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-700 text-white rounded-lg text-sm font-semibold hover:bg-teal-800 shadow-sm transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            + New intake
          </button>
        </div>
      </div>

      <!-- Customer Summary Card (Page 1 top) -->
      <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
        <div class="flex items-center gap-3 col-span-2 sm:col-span-1">
          <span class="w-12 h-12 rounded-xl bg-teal-50 text-teal-800 font-extrabold text-base flex items-center justify-center border border-teal-100">
            ${customer.initials}
          </span>
          <div>
            <div class="text-xs text-slate-400 uppercase tracking-wider font-semibold">Customer ID</div>
            <div class="font-bold text-slate-900 font-mono text-sm">${customer.id}</div>
          </div>
        </div>

        <div>
          <div class="text-xs text-slate-400 uppercase tracking-wider font-semibold">Phone number</div>
          <div class="font-bold text-slate-900 font-mono text-sm">${customer.phone}</div>
        </div>

        <div>
          <div class="text-xs text-slate-400 uppercase tracking-wider font-semibold">Hostel / Room</div>
          <div class="font-bold text-slate-900 text-sm">${customer.hostel} · ${customer.room}</div>
        </div>

        <div>
          <div class="text-xs text-slate-400 uppercase tracking-wider font-semibold">College year</div>
          <div class="font-bold text-slate-900 text-sm">${customer.collegeYear}</div>
        </div>

        <div class="text-right">
          <a href="tel:${customer.phone}" class="inline-flex items-center gap-1.5 text-xs text-teal-700 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg font-bold transition">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            Call Resident
          </a>
        </div>
      </div>

      <!-- Main Content Tabs -->
      <div class="flex items-center gap-6 border-b border-slate-200 text-sm font-semibold text-slate-500">
        <button class="pb-3 border-b-2 border-teal-700 text-teal-900 font-bold">Package & ledger</button>
        <button class="pb-3 text-slate-600 hover:text-slate-900">Orders · ${custOrders.length}</button>
        <button class="pb-3 text-slate-600 hover:text-slate-900">Profile notes</button>
      </div>

      <!-- Two Column Layout: Left Ledger & Right Package Card (Page 1) -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left: Package Ledger Table (2 cols) -->
        <div class="lg:col-span-2 space-y-4">
          <!-- Notification Alert for today's intake (Page 1) -->
          <div class="bg-teal-50 border border-teal-200 rounded-xl p-4 flex items-start gap-3">
            <span class="p-1 bg-teal-600 text-white rounded-full mt-0.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            </span>
            <div class="flex-1 text-xs sm:text-sm">
              <span class="font-bold text-teal-950">Today's intake is recorded</span>
              <div class="text-teal-800 text-xs mt-0.5 font-mono">ORD-1058 deducted 4.50 kg from 72.00 kg at 10:42 am IST.</div>
            </div>
            <button onclick="exportCustomerLedgerCSV('${customer.id}')" class="text-xs text-teal-800 font-semibold hover:underline flex items-center gap-1">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              Export
            </button>
          </div>

          <!-- Ledger Table Container -->
          <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div class="p-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 class="font-bold text-slate-900 text-sm">Package ledger</h3>
                <div class="text-xs text-slate-400 font-mono">${activePkg ? activePkg.name : 'Package'} · ${activePkg ? activePkg.id : ''} · Newest entries first</div>
              </div>
              <span class="text-xs text-slate-500 font-medium">Append-only audit (BR-03)</span>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-sm">
                <thead class="bg-slate-50 text-slate-500 font-semibold text-xs border-b border-slate-200">
                  <tr>
                    <th class="px-5 py-3">Date / time</th>
                    <th class="px-5 py-3">Order / entry</th>
                    <th class="px-5 py-3 text-right font-mono">Usage</th>
                    <th class="px-5 py-3 text-right font-mono">Balance</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  ${ledger.map(tx => `
                    <tr class="hover:bg-slate-50 transition">
                      <td class="px-5 py-3 text-xs text-slate-600 font-mono">
                        <div class="font-semibold text-slate-800">${tx.date}</div>
                        <div class="text-[11px] text-slate-400">${tx.time}</div>
                      </td>
                      <td class="px-5 py-3">
                        <div class="font-bold text-slate-900 font-mono ${tx.orderId ? 'hover:text-teal-700 cursor-pointer' : ''}">
                          ${tx.entryLabel}
                        </div>
                        <div class="text-xs text-slate-500">${tx.details}</div>
                      </td>
                      <td class="px-5 py-3 text-right font-mono font-bold ${
                        tx.kgDelta < 0 ? 'text-red-700' : 'text-emerald-700'
                      }">
                        ${tx.kgDelta > 0 ? '+' : ''}${tx.kgDelta.toFixed(2)} kg
                      </td>
                      <td class="px-5 py-3 text-right font-mono font-bold text-slate-900">
                        ${tx.balanceAfter.toFixed(2)} kg
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <!-- Footnote on append-only audit trail -->
            <div class="p-3.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center gap-2">
              <svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span>Original entries are retained. Corrections create a separate, attributed adjustment with a reason (FR-14).</span>
            </div>
          </div>

          <!-- Need to correct an intake? Audited Adjustment Card (Page 1) -->
          <div class="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between text-xs sm:text-sm">
            <div>
              <div class="font-bold text-slate-900">Need to correct an intake?</div>
              <div class="text-xs text-slate-500 mt-0.5">Request an audited adjustment. Original orders and ledger entries are never silently edited or deleted.</div>
            </div>
            <button onclick="openAdjustmentModal('${customer.id}')" class="text-teal-700 hover:text-teal-900 font-bold hover:underline shrink-0 ml-4">
              Create adjustment →
            </button>
          </div>

          <!-- Past Packages History (Page 1) -->
          <div class="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
            <div class="flex items-center justify-between">
              <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Past packages</h4>
              <span class="text-xs text-teal-700 font-semibold cursor-pointer hover:underline">View history →</span>
            </div>
            <div class="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
              <div>
                <div class="font-bold text-slate-900">Campus 60 · PKG-0086-A</div>
                <div class="text-slate-500 text-[11px] font-mono">01 Jul–28 Sep 2026 · 60.00 / 60.00 kg used · ₹3,000</div>
              </div>
              <span class="px-2 py-0.5 bg-slate-200 text-slate-700 rounded text-[11px] font-semibold">Exhausted</span>
            </div>
          </div>
        </div>

        <!-- Right: Active Package Details Card & Actions (Page 1 & Figma Screen 4) -->
        <div class="space-y-5">
          <!-- Active Plan Highlight Card -->
          <div class="bg-[#0b1b2b] text-white p-6 rounded-2xl border border-teal-900 shadow-md relative overflow-hidden">
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm font-bold text-teal-300 tracking-wide">${activePkg ? activePkg.name : 'Campus 90'}</span>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">Active</span>
            </div>

            <div class="text-xs text-slate-400 font-medium">Remaining balance</div>
            <div class="text-4xl font-extrabold text-white font-mono mt-1">${balanceInfo.remainingKg.toFixed(2)} kg</div>
            <div class="text-xs text-teal-400 font-mono mt-1">≈ ₹${balanceInfo.remainingValue.toLocaleString()} remaining value</div>

            <!-- Progress bar -->
            <div class="mt-5 space-y-1.5">
              <div class="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div class="bg-teal-500 h-2 rounded-full" style="width: ${((balanceInfo.usedKg / (balanceInfo.totalKg || 1)) * 100).toFixed(0)}%"></div>
              </div>
              <div class="flex justify-between text-xs font-mono text-slate-400">
                <span>${balanceInfo.usedKg.toFixed(2)} kg used</span>
                <span>${balanceInfo.totalKg.toFixed(2)} kg total</span>
              </div>
            </div>

            <!-- Package Snapshot Specs (BR-02) -->
            <div class="mt-6 pt-5 border-t border-slate-800 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span class="text-slate-400 block">Package price</span>
                <span class="font-bold text-white font-mono">₹${activePkg ? activePkg.amountPaid.toLocaleString() : '4,500'}</span>
              </div>
              <div>
                <span class="text-slate-400 block">Rate</span>
                <span class="font-bold text-white font-mono">₹${balanceInfo.ratePerKg} / kg</span>
              </div>
              <div class="col-span-2">
                <span class="text-slate-400 block">Assigned date</span>
                <span class="font-bold text-white font-mono">${activePkg ? activePkg.purchasedAt : '01 Oct 2026'}</span>
              </div>
            </div>
          </div>

          <!-- Assign / Renew Package Card (Page 1) -->
          <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <h4 class="font-bold text-slate-900 text-sm">Assign a package</h4>
            <p class="text-xs text-slate-500">Choose a saved package. Price and rate are filled automatically.</p>
            
            <div class="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <div class="flex items-center justify-between text-xs font-bold text-slate-900">
                <span>Campus 90 · 90.00 kg</span>
                <span>₹4,500</span>
              </div>
              <div class="text-[11px] text-slate-500 font-mono mt-0.5">₹4,500 · ₹50 / kg</div>
            </div>

            <button onclick="showToast('Package renewal simulated');" class="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5">
              <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              Review new package
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Render Cart Delivery Check (Matches PDF Page 5 & 6, and Figma Screen 3)
function renderDeliveryCheck() {
  const isMobile = store.deviceMode === 'mobile';
  const readyOrders = store.state.orders.filter(o => o.status === 'Ready');
  const carriedForwardReady = readyOrders.filter(o => o.isCarriedForward);
  const deliveredToday = store.state.orders.filter(o => o.status === 'Delivered' && o.deliveredAt && o.deliveredAt.includes(store.state.systemDate));

  let displayReady = readyOrders;
  if (store.deliveryHostelFilter !== 'all') {
    displayReady = displayReady.filter(o => o.hostel.toLowerCase().includes(store.deliveryHostelFilter.toLowerCase()));
  }
  if (store.deliverySearch.trim()) {
    const q = store.deliverySearch.toLowerCase();
    displayReady = displayReady.filter(o =>
      o.id.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.room.toLowerCase().includes(q)
    );
  }

  // Calculate selected total weight
  const selectedOrders = readyOrders.filter(o => store.selectedDeliveryOrderIds.has(o.id));
  const selectedWeight = selectedOrders.reduce((sum, o) => sum + o.weightKg, 0);

  return `
    <div class="space-y-6 animate-fade-in pb-28">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div class="text-xs text-slate-500 font-mono">${store.state.systemDate} · ${store.state.systemTime}</div>
          <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Ready for a clean handover.</h1>
          <p class="text-sm text-slate-500 mt-0.5">Select the orders in front of you, review the residents, then confirm delivery.</p>
        </div>
        <button onclick="openNewIntakeModal()" class="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-700 text-white rounded-lg text-sm font-semibold hover:bg-teal-800 shadow-sm transition">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          + New intake
        </button>
      </div>

      <!-- 3 Summary Pills (Page 6) -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div class="text-2xl font-extrabold text-teal-800 font-mono">5</div>
          <div>
            <div class="text-xs font-bold text-slate-900">Ready orders</div>
            <div class="text-xs text-slate-500 font-mono">15.40 kg awaiting handover</div>
          </div>
        </div>

        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div class="text-2xl font-extrabold text-amber-700 font-mono">2</div>
          <div>
            <div class="text-xs font-bold text-slate-900">Ready from earlier</div>
            <div class="text-xs text-slate-500 font-mono">5.50 kg · included in the 5 ready</div>
          </div>
        </div>

        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div class="text-2xl font-extrabold text-emerald-700 font-mono">4</div>
          <div>
            <div class="text-xs font-bold text-slate-900">Delivered today</div>
            <div class="text-xs text-slate-500 font-mono">11.80 kg · confirmed handovers</div>
          </div>
        </div>
      </div>

      <!-- Two-column Handover Layout (Page 6 Desktop) or Stacked (Page 5 Mobile) -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Ready Checklist (2 cols on desktop) -->
        <div class="lg:col-span-2 space-y-4">
          <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <h3 class="font-bold text-slate-900 text-sm">Ready to hand over</h3>
                <span class="px-2 py-0.5 bg-teal-100 text-teal-800 rounded-full text-xs font-bold">Ready · ${readyOrders.length}</span>
              </div>
            </div>

            <!-- Search and hostel filter -->
            <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div class="relative flex-1 w-full">
                <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </span>
                <input 
                  type="text" 
                  placeholder="Search order, name or room" 
                  value="${store.deliverySearch}"
                  oninput="store.deliverySearch = this.value; render();"
                  class="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition"
                />
              </div>

              <select 
                onchange="store.deliveryHostelFilter = this.value; render();"
                class="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none w-full sm:w-auto"
              >
                <option value="all" ${store.deliveryHostelFilter === 'all' ? 'selected' : ''}>All hostels</option>
                <option value="Hostel A" ${store.deliveryHostelFilter === 'Hostel A' ? 'selected' : ''}>Hostel A</option>
                <option value="Hostel B" ${store.deliveryHostelFilter === 'Hostel B' ? 'selected' : ''}>Hostel B</option>
              </select>
            </div>

            <!-- Select Visible Toggle -->
            <div class="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
              <label class="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  class="custom-checkbox"
                  ${displayReady.length > 0 && displayReady.every(o => store.selectedDeliveryOrderIds.has(o.id)) ? 'checked' : ''}
                  onchange="toggleAllDeliveryOrders(this.checked, ${JSON.stringify(displayReady.map(o => o.id))})"
                />
                <span class="font-semibold text-slate-700">Select visible (${displayReady.length})</span>
              </label>
              <span>All receipt dates · includes earlier</span>
            </div>
          </div>

          <!-- List of Ready Orders (Page 5 & 6) -->
          <div class="space-y-2.5">
            ${displayReady.length === 0 ? `
              <div class="bg-white rounded-xl p-8 text-center text-slate-400 border border-slate-200 text-sm">
                No ready orders matching current filters
              </div>
            ` : displayReady.map(order => {
              const isSelected = store.selectedDeliveryOrderIds.has(order.id);
              return `
                <div class="bg-white rounded-xl border ${isSelected ? 'border-teal-500 ring-2 ring-teal-500/10 bg-teal-50/20' : 'border-slate-200'} p-4 shadow-sm transition hover:shadow flex items-center justify-between gap-4">
                  <div class="flex items-center gap-3.5">
                    <input 
                      type="checkbox" 
                      class="custom-checkbox"
                      ${isSelected ? 'checked' : ''}
                      onchange="toggleDeliveryOrder('${order.id}', this.checked)"
                    />
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="font-bold text-slate-900 text-sm hover:text-teal-700 cursor-pointer" onclick="navigateTo('customer-detail', { customerId: '${order.customerId}' })">${order.customerName}</span>
                        <span class="text-xs font-mono font-bold text-slate-500">${order.id}</span>
                      </div>
                      <div class="text-xs text-slate-500 font-mono mt-0.5">
                        Room ${order.room} · Received ${order.receivedAt.split(',')[0]}
                      </div>
                      ${order.isCarriedForward ? `
                        <span class="inline-flex text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 mt-1">
                          Carried forward
                        </span>
                      ` : `
                        <span class="inline-flex text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded mt-1">
                          Ready for handover
                        </span>
                      `}
                    </div>
                  </div>

                  <div class="text-right shrink-0">
                    <div class="text-base font-extrabold font-mono text-slate-900">${order.weightKg.toFixed(2)} kg</div>
                    <div class="text-[11px] text-slate-400">${order.itemsSummary ? order.itemsSummary.split(',')[0] : 'Standard'}</div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <div class="text-xs text-slate-400 px-1">
            Earlier ready orders stay in this list once. Original receipt dates never change (PRD FR-11).
          </div>
        </div>

        <!-- Right: Handover Review Box (Page 6 Desktop right rail & Page 5 sticky preview) -->
        <div class="space-y-4">
          <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 class="font-bold text-slate-900 text-sm">Handover review</h3>
              <span class="text-xs font-semibold px-2 py-0.5 bg-slate-100 rounded text-slate-700">${selectedOrders.length} selected</span>
            </div>

            <!-- Caution Note (PRD BR-05: Selection alone never marks delivered) -->
            <div class="bg-amber-50/70 border border-amber-200 rounded-lg p-3 text-xs text-amber-900 flex items-start gap-2">
              <svg class="w-4 h-4 text-amber-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
              <div>
                <span class="font-bold">Not delivered yet</span>
                <p class="text-amber-800 mt-0.5">Selecting an order only adds it to this review. Confirm only after physically handing it over.</p>
              </div>
            </div>

            <!-- List of selected orders -->
            <div class="space-y-2 max-h-56 overflow-y-auto">
              ${selectedOrders.length === 0 ? `
                <div class="text-center py-6 text-slate-400 text-xs">No orders selected yet</div>
              ` : selectedOrders.map(order => `
                <div class="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg text-xs">
                  <div>
                    <div class="font-bold text-slate-900 font-mono">${order.id} · ${order.customerName}</div>
                    <div class="text-slate-500 font-mono text-[11px]">${order.room} · ${order.weightKg.toFixed(2)} kg</div>
                  </div>
                  <button onclick="toggleDeliveryOrder('${order.id}', false)" class="text-slate-400 hover:text-red-600 text-sm px-1.5 font-bold">×</button>
                </div>
              `).join('')}
            </div>

            <div class="pt-3 border-t border-slate-100 space-y-2">
              <div class="flex justify-between text-xs">
                <span class="text-slate-500">Selected weight</span>
                <span class="font-bold font-mono text-slate-900 text-sm">${selectedWeight.toFixed(2)} kg</span>
              </div>
              <div class="flex justify-between text-xs">
                <span class="text-slate-500">Confirming staff</span>
                <span class="font-bold text-slate-900">${store.state.currentUser.name}</span>
              </div>
            </div>

            <p class="text-[11px] text-slate-400 leading-relaxed">
              The final confirmation records Delivered status, staff name and the current IST timestamp for all selected orders.
            </p>
          </div>
        </div>
      </div>

      <!-- Delivered Today Register (Page 3 & Page 6 bottom) -->
      <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="p-4 border-b border-slate-200 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <h3 class="font-bold text-slate-900 text-sm">Delivered today</h3>
            <span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">${deliveredToday.length} confirmed</span>
          </div>
          <span class="text-xs text-slate-400 font-mono">${deliveredToday.reduce((s, o) => s + o.weightKg, 0).toFixed(2)} kg total</span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-slate-50 text-slate-500 font-semibold text-xs border-b border-slate-200">
              <tr>
                <th class="px-5 py-3">Order</th>
                <th class="px-5 py-3">Customer</th>
                <th class="px-5 py-3">Original receipt</th>
                <th class="px-5 py-3 text-right font-mono">Weight</th>
                <th class="px-5 py-3">Handed over by</th>
                <th class="px-5 py-3 text-right">Delivered (IST)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${deliveredToday.map(order => `
                <tr class="hover:bg-slate-50 transition text-xs">
                  <td class="px-5 py-3 font-bold font-mono text-slate-900">${order.id}</td>
                  <td class="px-5 py-3 font-semibold text-slate-900">${order.customerName} · ${order.room}</td>
                  <td class="px-5 py-3 text-slate-500 font-mono">${order.receiptDate}</td>
                  <td class="px-5 py-3 text-right font-mono font-bold text-slate-900">${order.weightKg.toFixed(2)} kg</td>
                  <td class="px-5 py-3 text-slate-700 font-medium">${order.deliveredBy || 'Staff'}</td>
                  <td class="px-5 py-3 text-right text-slate-600 font-mono">${order.deliveredAt ? order.deliveredAt.split(',')[1] : '11:00 am'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Sticky Confirmation Bottom Bar (Page 5 & 6) -->
      ${selectedOrders.length > 0 ? `
        <div class="fixed bottom-0 left-0 right-0 z-40 bg-[#0e1726] text-white py-3.5 px-6 shadow-2xl border-t border-slate-700 animate-slide-up sticky-action-bar">
          <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <span class="p-2 bg-teal-900/60 text-teal-300 rounded-lg">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </span>
              <div>
                <div class="font-bold text-white text-sm font-mono">${selectedOrders.length} orders · ${selectedWeight.toFixed(2)} kg ready to confirm</div>
                <div class="text-xs text-slate-400">Pinned action · Handing over will stamp staff ${store.state.currentUser.name}</div>
              </div>
            </div>

            <div class="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button onclick="store.selectedDeliveryOrderIds.clear(); render();" class="text-xs text-slate-400 hover:text-white px-3 py-2">
                Clear selection
              </button>
              <button onclick="executeConfirmDelivery()" class="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-2.5 rounded-lg text-sm shadow transition flex items-center gap-2">
                ✓ Confirm delivered (${selectedOrders.length})
              </button>
            </div>
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

// Render Daily Report View (Matches PDF Page 3)
function renderDailyReport() {
  const serviceDate = store.state.systemDate;
  const orders = store.state.orders;

  const receivedToday = orders.filter(o => o.receiptDate === serviceDate);
  const deliveredToday = orders.filter(o => o.status === 'Delivered' && o.deliveredAt && o.deliveredAt.includes(serviceDate));
  const outstanding = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled');

  const readyOrders = orders.filter(o => o.status === 'Ready');
  const carriedForward = outstanding.filter(o => o.isCarriedForward);

  // Status breakdown of today's receipts
  const statusCounts = {
    Received: receivedToday.filter(o => o.status === 'Received').length,
    'In Laundry': receivedToday.filter(o => o.status === 'In Laundry').length,
    Ready: receivedToday.filter(o => o.status === 'Ready').length,
    Delivered: receivedToday.filter(o => o.status === 'Delivered').length,
    Cancelled: receivedToday.filter(o => o.status === 'Cancelled').length
  };
  const statusWeights = {
    Received: receivedToday.filter(o => o.status === 'Received').reduce((s, o) => s + o.weightKg, 0),
    'In Laundry': receivedToday.filter(o => o.status === 'In Laundry').reduce((s, o) => s + o.weightKg, 0),
    Ready: receivedToday.filter(o => o.status === 'Ready').reduce((s, o) => s + o.weightKg, 0),
    Delivered: receivedToday.filter(o => o.status === 'Delivered').reduce((s, o) => s + o.weightKg, 0),
    Cancelled: 0.00
  };

  // Handover breakdown
  const deliveredReceivedToday = deliveredToday.filter(o => o.receiptDate === serviceDate);
  const deliveredReceivedEarlier = deliveredToday.filter(o => o.receiptDate !== serviceDate);

  return `
    <div class="space-y-6 animate-fade-in pb-16">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div class="text-xs text-slate-500 font-mono">Workspace &gt; Reports</div>
          <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Daily report</h1>
          <p class="text-sm text-slate-500 mt-0.5">A dependable account of collections, handovers and the work still in progress.</p>
        </div>

        <div class="flex items-center gap-3 no-print">
          <button onclick="exportDailyReportCSV()" class="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 shadow-sm transition">
            <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            Export CSV
          </button>
          <button onclick="window.print()" class="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 shadow-sm transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
            Print report
          </button>
        </div>
      </div>

      <!-- Service Date Filter Bar (Page 3) -->
      <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
        <div class="flex items-center gap-3">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Service date</span>
          <div class="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg font-mono font-bold text-slate-900 text-xs">
            <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            ${serviceDate}
          </div>
          <span class="px-2 py-0.5 bg-teal-100 text-teal-800 rounded font-bold text-xs">Today</span>
        </div>

        <div class="text-xs text-slate-400 font-mono">
          Snapshot at 11:30 am IST · Includes activity recorded so far
        </div>
      </div>

      <!-- 3 Top Metric Blocks (Page 3) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Received today -->
        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div class="flex items-center justify-between text-slate-500 mb-2">
            <span class="text-xs font-medium uppercase tracking-wider">Received today</span>
            <span class="p-1 bg-teal-50 text-teal-700 rounded">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
            </span>
          </div>
          <div class="text-3xl font-extrabold text-slate-900 font-mono">12 orders</div>
          <div class="text-xs text-slate-500 font-mono mt-1">38.60 kg · received on 23 Oct</div>
        </div>

        <!-- Delivered today -->
        <div class="bg-[#0b1b2b] text-white p-5 rounded-xl border border-teal-900 shadow-sm">
          <div class="flex items-center justify-between text-teal-400 mb-2">
            <span class="text-xs font-medium uppercase tracking-wider">Delivered today</span>
            <span class="p-1 bg-teal-950 text-teal-300 rounded">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            </span>
          </div>
          <div class="text-3xl font-extrabold text-white font-mono">4 orders</div>
          <div class="text-xs text-teal-300 font-mono mt-1">11.80 kg · all original receipt dates</div>
        </div>

        <!-- Outstanding -->
        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div class="flex items-center justify-between text-slate-500 mb-2">
            <span class="text-xs font-medium uppercase tracking-wider">Outstanding</span>
            <span class="p-1 bg-slate-100 text-slate-700 rounded">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </span>
          </div>
          <div class="text-3xl font-extrabold text-slate-900 font-mono">14 orders</div>
          <div class="text-xs text-slate-500 font-mono mt-1">45.20 kg · all dates, excluding cancelled</div>
        </div>
      </div>

      <!-- Two Sub-Indicators (Page 3) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="bg-teal-50/60 border border-teal-200 rounded-xl p-4 flex items-center gap-3">
          <span class="p-2 bg-teal-100 text-teal-800 rounded-lg shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
          </span>
          <div>
            <div class="font-bold text-slate-900 text-sm font-mono">5 ready · 15.40 kg</div>
            <div class="text-xs text-slate-500">Includes 2 orders received before today.</div>
          </div>
        </div>

        <div class="bg-amber-50/60 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
          <span class="p-2 bg-amber-100 text-amber-800 rounded-lg shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"/></svg>
          </span>
          <div>
            <div class="font-bold text-slate-900 text-sm font-mono">4 carried forward · 12.10 kg</div>
            <div class="text-xs text-slate-500">2 In Laundry + 2 Ready · a flag, not a separate status.</div>
          </div>
        </div>
      </div>

      <!-- Two Comparison Breakdown Tables (Page 3) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Today's receipts by current status -->
        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div>
            <h3 class="font-bold text-slate-900 text-sm">Today's receipts, by current status</h3>
            <p class="text-xs text-slate-400">Only orders received on 23 Oct. Status reflects the 11:30 am snapshot.</p>
          </div>

          <!-- Mini Stacked Status Bar -->
          <div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
            <div class="bg-slate-400 h-full" style="width: 33%"></div>
            <div class="bg-blue-500 h-full" style="width: 25%"></div>
            <div class="bg-teal-500 h-full" style="width: 25%"></div>
            <div class="bg-emerald-500 h-full" style="width: 17%"></div>
          </div>

          <table class="w-full text-xs">
            <thead class="text-slate-400 border-b border-slate-100">
              <tr>
                <th class="py-2 text-left font-medium">Current status</th>
                <th class="py-2 text-right font-medium">Orders</th>
                <th class="py-2 text-right font-medium">Weight</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 font-mono">
              <tr>
                <td class="py-2.5 font-sans font-medium text-slate-700">Received</td>
                <td class="py-2.5 text-right font-bold text-slate-900">${statusCounts.Received}</td>
                <td class="py-2.5 text-right text-slate-600">${statusWeights.Received.toFixed(2)} kg</td>
              </tr>
              <tr>
                <td class="py-2.5 font-sans font-medium text-blue-700">In Laundry</td>
                <td class="py-2.5 text-right font-bold text-slate-900">${statusCounts['In Laundry']}</td>
                <td class="py-2.5 text-right text-slate-600">${statusWeights['In Laundry'].toFixed(2)} kg</td>
              </tr>
              <tr>
                <td class="py-2.5 font-sans font-medium text-teal-700">Ready</td>
                <td class="py-2.5 text-right font-bold text-slate-900">${statusCounts.Ready}</td>
                <td class="py-2.5 text-right text-slate-600">${statusWeights.Ready.toFixed(2)} kg</td>
              </tr>
              <tr>
                <td class="py-2.5 font-sans font-medium text-emerald-700">Delivered</td>
                <td class="py-2.5 text-right font-bold text-slate-900">${statusCounts.Delivered}</td>
                <td class="py-2.5 text-right text-slate-600">${statusWeights.Delivered.toFixed(2)} kg</td>
              </tr>
              <tr>
                <td class="py-2.5 font-sans font-medium text-red-600">Cancelled</td>
                <td class="py-2.5 text-right font-bold text-slate-900">${statusCounts.Cancelled}</td>
                <td class="py-2.5 text-right text-slate-600">0.00 kg</td>
              </tr>
            </tbody>
            <tfoot class="border-t border-slate-200 font-bold font-mono">
              <tr>
                <td class="py-2.5 font-sans text-slate-900">Total received today</td>
                <td class="py-2.5 text-right text-slate-900">12</td>
                <td class="py-2.5 text-right text-slate-900">38.60 kg</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <!-- Today's handovers breakdown -->
        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div>
            <h3 class="font-bold text-slate-900 text-sm">Today's handovers</h3>
            <p class="text-xs text-slate-400">Counted by delivery date, not receipt date. Earlier collections are included when handed over today.</p>
          </div>

          <div class="space-y-4 pt-2">
            <div class="p-3 bg-slate-50 rounded-lg flex items-center justify-between text-xs">
              <div>
                <span class="font-bold text-slate-900">Received today</span>
                <div class="text-slate-500 font-mono">2 orders</div>
              </div>
              <span class="font-bold font-mono text-slate-900">5.50 kg</span>
            </div>

            <div class="p-3 bg-amber-50/60 border border-amber-200 rounded-lg flex items-center justify-between text-xs">
              <div>
                <span class="font-bold text-amber-950">Received before today (Carried forward)</span>
                <div class="text-amber-800 font-mono">2 orders</div>
              </div>
              <span class="font-bold font-mono text-amber-950">6.30 kg</span>
            </div>

            <div class="p-4 bg-teal-50 border border-teal-200 rounded-lg flex items-center justify-between">
              <div>
                <div class="text-xs text-teal-800 uppercase tracking-wider font-semibold">Total delivered</div>
                <div class="text-2xl font-extrabold text-teal-950 font-mono">4 · 11.80 kg</div>
              </div>
              <span class="px-2.5 py-1 bg-teal-700 text-white rounded-md text-xs font-bold">Reconciled</span>
            </div>

            <p class="text-[11px] text-slate-400 italic">
              Pending selected orders do not count as deliveries until confirmed.
            </p>
          </div>
        </div>
      </div>

      <!-- Delivery register 23 Oct (Page 3) -->
      <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="p-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 class="font-bold text-slate-900 text-sm">Delivery register · 23 Oct</h3>
            <p class="text-xs text-slate-400">4 confirmed deliveries · newest first</p>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th class="px-5 py-3">Order</th>
                <th class="px-5 py-3">Customer</th>
                <th class="px-5 py-3">Original receipt</th>
                <th class="px-5 py-3 text-right font-mono">Weight</th>
                <th class="px-5 py-3">Delivered by</th>
                <th class="px-5 py-3 text-right">Time (IST)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr class="hover:bg-slate-50">
                <td class="px-5 py-3 font-bold font-mono text-slate-900">ORD-1040</td>
                <td class="px-5 py-3 font-semibold text-slate-900">Meera Joshi · B-112</td>
                <td class="px-5 py-3 font-mono text-slate-500">22 Oct 2026</td>
                <td class="px-5 py-3 text-right font-mono font-bold text-slate-900">3.60 kg</td>
                <td class="px-5 py-3 text-slate-700">Anika Rao</td>
                <td class="px-5 py-3 text-right font-mono text-slate-600">11:12 am</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="px-5 py-3 font-bold font-mono text-slate-900">ORD-1051</td>
                <td class="px-5 py-3 font-semibold text-slate-900">Isha Verma · B-305</td>
                <td class="px-5 py-3 font-mono text-slate-500">23 Oct 2026</td>
                <td class="px-5 py-3 text-right font-mono font-bold text-slate-900">2.80 kg</td>
                <td class="px-5 py-3 text-slate-700">Meera Nair</td>
                <td class="px-5 py-3 text-right font-mono text-slate-600">11:05 am</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="px-5 py-3 font-bold font-mono text-slate-900">ORD-1035</td>
                <td class="px-5 py-3 font-semibold text-slate-900">Aditya Sen · A-115</td>
                <td class="px-5 py-3 font-mono text-slate-500">21 Oct 2026</td>
                <td class="px-5 py-3 text-right font-mono font-bold text-slate-900">2.70 kg</td>
                <td class="px-5 py-3 text-slate-700">Anika Rao</td>
                <td class="px-5 py-3 text-right font-mono text-slate-600">10:58 am</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="px-5 py-3 font-bold font-mono text-slate-900">ORD-1049</td>
                <td class="px-5 py-3 font-semibold text-slate-900">Omar Khan · A-209</td>
                <td class="px-5 py-3 font-mono text-slate-500">23 Oct 2026</td>
                <td class="px-5 py-3 text-right font-mono font-bold text-slate-900">2.70 kg</td>
                <td class="px-5 py-3 text-slate-700">Meera Nair</td>
                <td class="px-5 py-3 text-right font-mono text-slate-600">10:50 am</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="p-3.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-500">
          Received and Delivered are daily events. Ready and Outstanding are current snapshots across all dates. Carried forward is a subset of Outstanding, never an additional status or an extra order (PRD FR-11, BR-11).
        </div>
      </div>
    </div>
  `;
}

// Render Orders Management View
function renderOrders() {
  const orders = store.state.orders;
  return `
    <div class="space-y-6 animate-fade-in pb-16">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Orders</h1>
          <p class="text-sm text-slate-500 mt-0.5">Comprehensive chronological registry of all cart laundry orders.</p>
        </div>
        <button onclick="openNewIntakeModal()" class="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-700 text-white rounded-lg text-sm font-semibold hover:bg-teal-800 shadow-sm transition">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          + New intake
        </button>
      </div>

      <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <input 
            type="text" 
            placeholder="Search order ID, resident, hostel..."
            value="${store.orderSearch}"
            oninput="store.orderSearch = this.value; render();"
            class="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm w-full sm:w-80"
          />
          <div class="flex items-center gap-2 text-xs">
            <span class="text-slate-400">Showing all ${orders.length} orders</span>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-slate-50 text-slate-500 font-semibold text-xs border-b border-slate-200">
              <tr>
                <th class="px-5 py-3">Order Code</th>
                <th class="px-5 py-3">Resident</th>
                <th class="px-5 py-3">Hostel / Room</th>
                <th class="px-5 py-3 text-right font-mono">Weight</th>
                <th class="px-5 py-3">Status</th>
                <th class="px-5 py-3">Receipt Date</th>
                <th class="px-5 py-3">Delivered Date</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${orders.map(o => `
                <tr class="hover:bg-slate-50 transition">
                  <td class="px-5 py-3.5 font-bold font-mono text-slate-900">${o.id}</td>
                  <td class="px-5 py-3.5 font-semibold text-slate-900 hover:text-teal-700 cursor-pointer" onclick="navigateTo('customer-detail', { customerId: '${o.customerId}' })">
                    ${o.customerName}
                  </td>
                  <td class="px-5 py-3.5 text-xs text-slate-600">${o.hostel} · ${o.room}</td>
                  <td class="px-5 py-3.5 text-right font-mono font-bold text-slate-900">${o.weightKg.toFixed(2)} kg</td>
                  <td class="px-5 py-3.5">
                    <span class="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                      o.status === 'Ready' ? 'bg-teal-100 text-teal-800' :
                      o.status === 'In Laundry' ? 'bg-blue-100 text-blue-800' :
                      o.status === 'Received' ? 'bg-slate-100 text-slate-700' :
                      o.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }">${o.status}</span>
                  </td>
                  <td class="px-5 py-3.5 text-xs text-slate-500 font-mono">${o.receivedAt}</td>
                  <td class="px-5 py-3.5 text-xs text-slate-500 font-mono">${o.deliveredAt || '—'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// Render Settings & Role View (FR-16)
function renderSettings() {
  const isOwner = store.state.currentUser.role === 'Owner / Admin';
  return `
    <div class="space-y-6 animate-fade-in pb-16">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Staff & settings</h1>
        <p class="text-sm text-slate-500 mt-0.5">Manage operational settings, threshold alarms, and staff access roles.</p>
      </div>

      <!-- Current Role Pill / Switcher -->
      <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 class="text-sm font-bold text-slate-900">Current active user</h3>
        <div class="flex flex-wrap gap-3">
          ${store.state.staffUsers.map(u => `
            <button 
              onclick="switchStaffRole('${u.id}')"
              class="px-4 py-3 rounded-xl border transition flex items-center gap-3 text-left ${store.state.currentUser.id === u.id ? 'border-teal-600 bg-teal-50/50 ring-2 ring-teal-500/10' : 'border-slate-200 hover:bg-slate-50'}"
            >
              <span class="w-10 h-10 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                ${u.avatar}
              </span>
              <div>
                <div class="font-bold text-slate-900 text-sm">${u.name}</div>
                <div class="text-xs text-slate-500">${u.role}</div>
              </div>
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Configuration Parameters (Owner Only) -->
      <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-sm font-bold text-slate-900">Operating parameters</h3>
            <p class="text-xs text-slate-500">Configure business defaults and warning triggers.</p>
          </div>
          ${!isOwner ? `
            <span class="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
              🔒 Owner access only
            </span>
          ` : ''}
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Business Name</label>
            <input 
              type="text" 
              value="${store.state.settings.businessName}" 
              ${!isOwner ? 'disabled' : ''} 
              class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 disabled:opacity-60"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Campus Location</label>
            <input 
              type="text" 
              value="${store.state.settings.campus}" 
              ${!isOwner ? 'disabled' : ''} 
              class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 disabled:opacity-60"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Low Balance Alert Threshold (kg)</label>
            <input 
              type="number" 
              value="${store.state.settings.lowBalanceThreshold}" 
              ${!isOwner ? 'disabled' : ''} 
              onchange="store.state.settings.lowBalanceThreshold = parseFloat(this.value); store.save();"
              class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 font-mono disabled:opacity-60"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Default Rate (₹ / kg)</label>
            <input 
              type="number" 
              value="${store.state.settings.defaultRate}" 
              ${!isOwner ? 'disabled' : ''} 
              class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 font-mono disabled:opacity-60"
            />
          </div>
        </div>

        <div class="pt-4 border-t border-slate-100 flex justify-between items-center">
          <button onclick="store.resetToDefault()" class="text-xs text-red-600 hover:underline font-semibold">
            Reset demo data to PRD baseline
          </button>
          ${isOwner ? `
            <button onclick="showToast('Settings saved');" class="px-4 py-2 bg-teal-700 text-white rounded-lg text-xs font-bold hover:bg-teal-800 transition">
              Save settings
            </button>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

// ----------------------------------------------------
// WASHIFY OPS - OWNER SHIFT ANALYTICS & THROUGHPUT VIEW
// ----------------------------------------------------
let selectedDayThroughput = null;

function setThroughputDay(dayIndex) {
  selectedDayThroughput = store.state.throughputWeekly[dayIndex];
  render();
}

function renderAnalytics() {
  const isMobile = store.deviceMode === 'mobile';
  const stats = store.state.executiveStats;
  const supervisors = store.state.shiftSupervisors;
  const weekly = store.state.throughputWeekly;

  return `
    <div class="max-w-4xl mx-auto space-y-5 animate-fade-in pb-16">
      <!-- Owner Portal Persona Anchor -->
      <section class="flex items-center justify-between bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/60 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center font-bold text-base shadow-sm">
            VN
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-base font-bold text-slate-900 leading-tight">Vikas Nair</h1>
              <span class="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container text-[11px] font-bold">OWNER</span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">Owner Portal • Shift Analytics &amp; Audits</p>
          </div>
        </div>
        <div class="text-right flex items-center gap-2">
          <span class="hidden sm:inline-block px-2.5 py-1 rounded bg-surface-container-low text-secondary text-xs font-mono">
            ${stats.hubId}
          </span>
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-container/20 text-primary text-xs font-bold">
            <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Shift Active
          </span>
        </div>
      </section>

      <!-- Facility Overview Bento Grid -->
      <section class="space-y-2.5">
        <div class="flex items-center justify-between">
          <h2 class="text-base font-bold text-slate-900 tracking-tight">Facility Overview</h2>
          <span class="text-xs text-slate-500 font-mono">Current Billing Cycle: ${stats.activeCycle}</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <!-- Revenue Card (Primary Impact) -->
          <div class="sm:col-span-2 bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-4 shadow-sm relative overflow-hidden">
            <div class="absolute top-0 left-0 bottom-0 w-1.5 bg-primary"></div>
            <div class="flex items-start justify-between">
              <div>
                <p class="text-xs text-slate-500 font-medium uppercase tracking-wider">MTD Gross Revenue</p>
                <p class="text-3xl font-extrabold text-slate-900 tracking-tight mt-1 font-mono">${stats.grossRevenueFormatted}</p>
              </div>
              <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary-fixed/40 text-primary text-xs font-bold">
                <span class="material-symbols-outlined text-[14px]" data-icon="trending_up">trending_up</span>
                ${stats.grossRevenueGrowth}
              </span>
            </div>
            <div class="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Target: ₹${stats.revenueTarget.toLocaleString('en-IN')}</span>
              <span class="text-primary font-bold">${stats.revenuePacing}</span>
            </div>
          </div>

          <!-- Output Metric Card -->
          <div class="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-4 shadow-sm flex flex-col justify-between">
            <div class="flex items-start justify-between">
              <span class="material-symbols-outlined text-primary text-2xl" data-icon="scale">scale</span>
              <span class="text-xs text-primary font-bold font-mono">${stats.outputGrowth}</span>
            </div>
            <div class="mt-2">
              <p class="text-xs text-slate-500">Gross Output</p>
              <div class="mt-1 flex items-baseline gap-1.5">
                <span class="text-2xl font-bold text-slate-900 font-mono">${stats.processedOutputKg.toFixed(1)}</span>
                <span class="text-xs text-slate-500 uppercase font-semibold">KG</span>
              </div>
            </div>
          </div>

          <!-- SLA Compliance Card -->
          <div class="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-4 shadow-sm flex flex-col justify-between">
            <div class="flex items-start justify-between">
              <span class="material-symbols-outlined text-primary text-2xl" data-icon="verified">verified</span>
              <span class="text-xs text-slate-500 font-medium">Target: ${stats.slaBenchmark}%</span>
            </div>
            <div class="mt-2">
              <p class="text-xs text-slate-500">SLA Compliance</p>
              <div class="mt-1 text-2xl font-bold text-slate-900 font-mono">${stats.slaCompliance}%</div>
            </div>
            <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
              <div class="bg-primary h-full rounded-full" style="width: ${stats.slaCompliance}%"></div>
            </div>
          </div>

          <!-- Active Enrolled Students Card -->
          <div class="sm:col-span-2 lg:col-span-4 bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-4 shadow-sm flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary">
                <span class="material-symbols-outlined" data-icon="groups">groups</span>
              </div>
              <div>
                <p class="text-xs text-slate-500">Active Enrolled Students</p>
                <p class="text-lg font-bold text-slate-900">${stats.activeSubscribers} <span class="text-xs text-slate-400 font-normal">subscribers (+${stats.newSubscribersThisWeek} this week)</span></p>
              </div>
            </div>
            <div class="text-right">
              <span class="px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold border border-teal-200">
                0 Dorm Backlogs
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- Daily Intake vs Dispatch Weekly Chart -->
      <section class="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-sm space-y-4">
        <div class="flex items-start justify-between flex-wrap gap-2">
          <div>
            <h2 class="text-base font-bold text-slate-900">Daily Throughput</h2>
            <p class="text-xs text-slate-500">Intake vs Dispatch Volume (KG) • Weekly Cycle</p>
          </div>
          <div class="flex items-center gap-4 text-xs font-medium">
            <div class="flex items-center gap-1.5">
              <span class="w-3 h-3 rounded-sm bg-[#008378]"></span>
              <span class="text-slate-600">Intake Volume</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="w-3 h-3 rounded-sm bg-[#cbdbf5]"></span>
              <span class="text-slate-600">Dispatch Volume</span>
            </div>
          </div>
        </div>

        <!-- Weekly Comparative Bars (Mon - Sun) -->
        <div class="pt-2">
          <div class="h-44 flex items-end justify-between gap-2 border-b border-slate-200 pb-2">
            ${weekly.map((d, idx) => `
              <div 
                onclick="setThroughputDay(${idx})"
                class="flex-1 flex flex-col items-center gap-1.5 h-full justify-end cursor-pointer group hover:bg-slate-50/80 rounded-lg p-1 transition"
                title="${d.day}: Intake ${d.intakeKg} kg, Dispatch ${d.dispatchKg} kg"
              >
                <div class="w-full flex items-end justify-center gap-1.5 h-32">
                  <div class="w-3 sm:w-4 bg-[#008378] hover:bg-teal-700 rounded-t-sm transition-all duration-300" style="height: ${d.intakePct}%;"></div>
                  <div class="w-3 sm:w-4 bg-[#cbdbf5] hover:bg-slate-400 rounded-t-sm transition-all duration-300" style="height: ${d.dispatchPct}%;"></div>
                </div>
                <span class="text-xs font-semibold ${d.peak ? 'text-primary font-bold' : 'text-slate-500'} group-hover:text-primary">${d.dayShort}</span>
              </div>
            `).join('')}
          </div>

          <div class="mt-3 flex items-center justify-between text-xs text-slate-500">
            <span>Weekly Avg: <strong class="text-slate-800 font-mono">${stats.weeklyAvgKg} KG / Day</strong></span>
            <span>Net Balance: <strong class="text-primary font-mono">+${stats.netBalanceKg} KG (Buffered)</strong></span>
          </div>

          ${selectedDayThroughput ? `
            <div class="mt-3 p-3 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-between animate-fade-in text-xs">
              <div>
                <span class="font-bold text-teal-900">${selectedDayThroughput.day} Readout:</span>
                <span class="text-teal-800 ml-2">Intake: <strong>${selectedDayThroughput.intakeKg} KG</strong> | Dispatch: <strong>${selectedDayThroughput.dispatchKg} KG</strong></span>
              </div>
              <button onclick="selectedDayThroughput = null; render();" class="text-teal-600 hover:text-teal-900 font-bold">✕ Close</button>
            </div>
          ` : ''}
        </div>
      </section>

      <!-- Shift-wise Supervisor Productivity Cards -->
      <section class="space-y-3">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-base font-bold text-slate-900 tracking-tight">Shift Productivity</h2>
            <p class="text-xs text-slate-500">Daily Output &amp; Floor Supervisor Governance</p>
          </div>
          <span class="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold font-mono">
            3 Active Shifts
          </span>
        </div>

        <div class="space-y-3">
          ${supervisors.map(sup => `
            <article class="bg-surface-container-lowest border border-outline-variant/60 rounded-xl overflow-hidden shadow-sm relative pl-1 hover:shadow-md transition">
              <div class="absolute left-0 top-0 bottom-0 w-1.5 ${sup.shiftName === 'Morning' ? 'bg-primary' : sup.shiftName === 'Evening' ? 'bg-[#565e74]' : 'bg-[#008378]'}"></div>
              <div class="p-4 space-y-3">
                <div class="flex items-start justify-between">
                  <div>
                    <h3 class="text-base font-bold text-slate-900">${sup.name}</h3>
                    <p class="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                      <span class="material-symbols-outlined text-[16px] text-primary" data-icon="${sup.icon}">${sup.icon}</span>
                      <span>${sup.shiftName} Shift • ${sup.timeSlot}</span>
                    </p>
                    <p class="text-[11px] text-slate-400 font-mono mt-0.5">${sup.orderRefRange}</p>
                  </div>
                  <span class="inline-flex items-center px-2.5 py-1 rounded-full bg-primary-fixed/40 text-primary text-xs font-bold">
                    SLA ${sup.slaRate}%
                  </span>
                </div>

                <div class="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                  <div class="bg-slate-50 rounded-lg p-2.5 px-3">
                    <span class="text-[11px] text-slate-500 block uppercase font-medium">Shift Output</span>
                    <span class="text-sm font-bold text-slate-900 font-mono">${sup.ordersCount} Orders • ${sup.outputKg.toFixed(1)} KG</span>
                  </div>
                  <div class="bg-slate-50 rounded-lg p-2.5 px-3 flex flex-col justify-center">
                    <span class="text-[11px] text-slate-500 block uppercase font-medium">Tare Discrepancy</span>
                    <span class="text-sm font-bold ${sup.tareStatusColor} font-mono">
                      ${sup.tareDiscrepancy} <span class="text-[11px] font-normal text-slate-500">(${sup.tareStatus})</span>
                    </span>
                  </div>
                </div>
              </div>
            </article>
          `).join('')}
        </div>
      </section>

      <!-- Owner Audits & Governance Controls -->
      <section class="space-y-3 pt-2">
        <div class="flex items-center justify-between">
          <h2 class="text-base font-bold text-slate-900 tracking-tight">Owner Audits &amp; Governance</h2>
          <span class="text-xs text-slate-500 font-mono">Encrypted Audit Hash</span>
        </div>

        <div class="grid grid-cols-1 gap-2.5">
          <button onclick="store.exportAuditReportCSV()" class="w-full bg-surface-container-lowest hover:bg-slate-50 border border-outline-variant/70 text-slate-900 rounded-xl p-4 text-left flex items-center justify-between transition active:scale-98 shadow-sm">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-primary">
                <span class="material-symbols-outlined" data-icon="download">download</span>
              </div>
              <div>
                <p class="text-sm font-bold text-slate-900">Export Audit Report (CSV / PDF)</p>
                <p class="text-xs text-slate-500">Complete shift logs with timestamp verifications &amp; tare hashes</p>
              </div>
            </div>
            <span class="material-symbols-outlined text-slate-400" data-icon="chevron_right">chevron_right</span>
          </button>

          <button onclick="openAuditModal()" class="w-full bg-surface-container-lowest hover:bg-slate-50 border border-outline-variant/70 text-slate-900 rounded-xl p-4 text-left flex items-center justify-between transition active:scale-98 shadow-sm">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-primary">
                <span class="material-symbols-outlined" data-icon="assignment">assignment</span>
              </div>
              <div>
                <p class="text-sm font-bold text-slate-900">Audit Shift Logs &amp; Tare Exceptions</p>
                <p class="text-xs text-slate-500">Review overrides, manual tare changes &amp; re-weigh records</p>
              </div>
            </div>
            <span class="material-symbols-outlined text-slate-400" data-icon="chevron_right">chevron_right</span>
          </button>

          <button onclick="openPayoutModal()" class="w-full bg-surface-container-lowest hover:bg-slate-50 border border-outline-variant/70 text-slate-900 rounded-xl p-4 text-left flex items-center justify-between transition active:scale-98 shadow-sm">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-primary">
                <span class="material-symbols-outlined" data-icon="receipt_long">receipt_long</span>
              </div>
              <div>
                <p class="text-sm font-bold text-slate-900">Facility Ledgers &amp; Payout Reconciliation</p>
                <p class="text-xs text-slate-500">Campus settlement breakdown &amp; merchant transfers</p>
              </div>
            </div>
            <span class="material-symbols-outlined text-slate-400" data-icon="chevron_right">chevron_right</span>
          </button>
        </div>
      </section>
    </div>
  `;
}

// ----------------------------------------------------
// WASHIFY OPS - QUOTA PACKAGES & PRICING CONFIG VIEW
// ----------------------------------------------------
function updatePackageBuilderCalc() {
  const weightInput = document.getElementById('pkg-weight-input');
  const rateInput = document.getElementById('pkg-rate-input');
  const priceOutput = document.getElementById('pkg-price-calc-output');
  if (weightInput && rateInput && priceOutput) {
    const w = parseFloat(weightInput.value) || 0;
    const r = parseFloat(rateInput.value) || 0;
    const total = Math.round(w * r);
    priceOutput.textContent = '₹' + total.toLocaleString('en-IN');
  }
}

function publishBuilderPackage() {
  const weightInput = document.getElementById('pkg-weight-input');
  const rateInput = document.getElementById('pkg-rate-input');
  const nameInput = document.getElementById('pkg-name-input');

  const w = parseFloat(weightInput?.value) || 50;
  const r = parseFloat(rateInput?.value) || 38;
  const name = nameInput?.value.trim() || 'New Quota Tier';

  store.publishNewQuotaPackage({
    name: name,
    quotaKg: w,
    ratePerKg: r,
    durationLabel: 'per student / mo',
    category: 'Custom Quota',
    popular: false
  });

  showToast(`Package "${name}" published successfully!`, 'success');
  render();
}

function renderPackages() {
  const stats = store.state.executiveStats;
  const packages = store.state.packagesConfig;

  return `
    <div class="max-w-4xl mx-auto space-y-5 animate-fade-in pb-16">
      <!-- Top Title & Live Status -->
      <header class="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/60 shadow-sm flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-primary">
            <span class="material-symbols-outlined text-2xl" data-icon="inventory_2">inventory_2</span>
          </div>
          <div>
            <h1 class="text-lg font-bold text-slate-900 leading-tight">Quota Packages &amp; Pricing Control</h1>
            <p class="text-xs text-slate-500 font-mono">Owner Portal • ${stats.facilityName}</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-primary-fixed/40 text-primary border border-primary/20">
            Shift Active
          </span>
          <button onclick="navigateTo('settings')" class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 transition">
            <span class="material-symbols-outlined" data-icon="tune">tune</span>
          </button>
        </div>
      </header>

      <!-- Facility Context Strip -->
      <div class="bg-white px-4 py-2.5 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-primary text-[18px]" data-icon="domain">domain</span>
          <span class="text-xs font-semibold text-slate-800">${stats.facilityName}</span>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span class="text-[11px] text-primary font-bold tracking-wider">${stats.activeCycle}</span>
        </div>
      </div>

      <!-- Executive Overview Bento -->
      <section class="space-y-2.5">
        <div class="flex items-center justify-between">
          <h2 class="text-base font-bold text-slate-900">Executive Overview</h2>
          <span class="text-xs text-slate-400 flex items-center gap-1 font-mono">
            <span class="material-symbols-outlined text-[14px]" data-icon="sync">sync</span> 3m ago
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div class="sm:col-span-2 bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div class="absolute top-0 left-0 bottom-0 w-1.5 bg-primary"></div>
            <div class="flex justify-between items-start">
              <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">MTD Gross Revenue</span>
              <span class="inline-flex items-center text-xs font-bold text-primary bg-primary-fixed/40 px-2 py-0.5 rounded-full">
                <span class="material-symbols-outlined text-[12px] mr-0.5" data-icon="trending_up">trending_up</span> ${stats.grossRevenueGrowth}
              </span>
            </div>
            <div class="mt-2">
              <span class="text-3xl font-extrabold text-slate-900 font-mono">${stats.grossRevenueFormatted}</span>
            </div>
            <div class="mt-3 pt-2.5 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
              <span>Processed Output:</span>
              <span class="font-bold text-slate-900 font-mono">${stats.processedOutputKg.toFixed(1)} KG <span class="text-primary font-normal">(${stats.outputGrowth})</span></span>
            </div>
          </div>

          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div class="flex items-center justify-between">
              <span class="text-xs text-slate-500 font-semibold uppercase">SLA Compliance</span>
              <span class="material-symbols-outlined text-primary text-xl" data-icon="verified">verified</span>
            </div>
            <div class="my-2">
              <div class="text-2xl font-extrabold text-slate-900 font-mono">${stats.slaCompliance}%</div>
              <div class="text-[11px] text-primary font-semibold mt-0.5">Target: ${stats.slaBenchmark}%</div>
            </div>
            <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div class="bg-primary h-full rounded-full" style="width: ${stats.slaCompliance}%"></div>
            </div>
          </div>

          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div class="flex items-center justify-between">
              <span class="text-xs text-slate-500 font-semibold uppercase">Active Subscribers</span>
              <span class="material-symbols-outlined text-slate-400 text-xl" data-icon="group">group</span>
            </div>
            <div class="my-2">
              <div class="text-2xl font-extrabold text-slate-900 font-mono">${stats.activeSubscribers}</div>
              <div class="text-[11px] text-slate-400 font-medium mt-0.5">Students enrolled</div>
            </div>
            <div class="flex items-center gap-1 text-[11px] text-primary font-bold font-mono">
              <span class="material-symbols-outlined text-[14px]" data-icon="arrow_upward">arrow_upward</span> ${stats.newSubscribersThisWeek} this week
            </div>
          </div>
        </div>
      </section>

      <!-- Section: Subscription Packages & Pricing Configuration -->
      <section class="space-y-3">
        <div class="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 class="text-base font-bold text-slate-900">Quota Packages</h2>
            <p class="text-xs text-slate-500">Direct Pricing &amp; Student Tier Control</p>
          </div>
          <button onclick="document.getElementById('quick-pkg-builder')?.scrollIntoView({ behavior: 'smooth' });" class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary hover:bg-[#005049] text-white text-xs font-bold transition shadow-sm">
            <span class="material-symbols-outlined text-[16px]" data-icon="add">add</span> Add New Plan
          </button>
        </div>

        <!-- Active Quota Package Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          ${packages.map(p => `
            <div class="bg-white rounded-xl p-4 border ${p.popular ? 'border-2 border-primary shadow-md' : 'border-slate-200 shadow-sm'} relative flex flex-col justify-between">
              ${p.popular ? `
                <div class="absolute -top-2.5 right-4 bg-primary text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                  Most Popular
                </div>
              ` : ''}
              <div>
                <div class="flex items-start justify-between">
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="font-bold text-slate-900 text-base">${p.name}</span>
                      <span class="px-2 py-0.5 rounded-full text-[10px] ${p.badgeClass}">${p.category}</span>
                    </div>
                    <p class="text-xs text-slate-500 mt-1 font-mono">${p.quotaKg.toFixed(1)} KG Quota • ₹${p.ratePerKg} / KG</p>
                  </div>
                  <div class="text-right">
                    <span class="text-xl font-extrabold text-primary font-mono">₹${p.totalPrice.toLocaleString('en-IN')}</span>
                    <p class="text-[10px] text-slate-400">${p.durationLabel}</p>
                  </div>
                </div>
              </div>

              <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span class="flex items-center gap-1.5 text-slate-500 text-[11px]">
                  <span class="material-symbols-outlined text-[16px] text-primary" data-icon="school">school</span>
                  <strong class="text-slate-800 font-mono">${p.subscribedCount || 0}</strong> Students
                </span>
                <button onclick="openEditRateModal('${p.id}')" class="text-primary font-bold text-xs flex items-center gap-1 hover:underline">
                  <span class="material-symbols-outlined text-[14px]" data-icon="edit">edit</span> Edit Rates
                </button>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Quick Package Calculator / Creator Box -->
        <div id="quick-pkg-builder" class="bg-surface-container-low rounded-2xl p-5 border border-outline-variant/50 shadow-sm space-y-4">
          <div class="flex items-center justify-between">
            <span class="font-bold text-slate-900 flex items-center gap-2 text-sm">
              <span class="material-symbols-outlined text-primary text-xl" data-icon="calculate">calculate</span>
              Quick Package Builder
            </span>
            <span class="text-xs text-slate-500 font-mono">Auto-calculator Engine</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1" for="pkg-name-input">PLAN NAME</label>
              <input id="pkg-name-input" type="text" value="Monsoon Flexi" class="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:border-primary" />
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1" for="pkg-weight-input">TOTAL WEIGHT (KG)</label>
              <div class="relative">
                <input id="pkg-weight-input" type="number" value="50" oninput="updatePackageBuilderCalc()" class="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-900 font-mono focus:outline-none focus:border-primary" />
                <span class="absolute right-3 top-2.5 text-xs text-slate-400 font-bold">KG</span>
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1" for="pkg-rate-input">RATE PER KG (₹)</label>
              <div class="relative">
                <input id="pkg-rate-input" type="number" value="38" oninput="updatePackageBuilderCalc()" class="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-900 font-mono focus:outline-none focus:border-primary" />
                <span class="absolute right-3 top-2.5 text-xs text-slate-400 font-bold">₹/KG</span>
              </div>
            </div>
          </div>

          <div class="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
            <div>
              <span class="text-xs text-slate-500">Auto Calculated Price Readout:</span>
              <div class="text-[11px] text-slate-400 font-mono">Live calculation (Weight × Rate)</div>
            </div>
            <span id="pkg-price-calc-output" class="text-2xl font-extrabold text-primary font-mono">₹1,900</span>
          </div>

          <button onclick="publishBuilderPackage()" class="w-full h-12 bg-primary hover:bg-[#005049] text-white font-bold rounded-xl flex items-center justify-center gap-2 active:scale-98 transition shadow-md" type="button">
            <span class="material-symbols-outlined text-[20px]" data-icon="save">save</span>
            Save &amp; Publish Plan
          </button>
        </div>
      </section>

      <!-- Owner Operational Controls -->
      <section class="space-y-3 pt-2">
        <h2 class="text-base font-bold text-slate-900">Owner Audits &amp; Governance</h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button onclick="store.exportAuditReportCSV()" class="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between hover:bg-slate-50 transition shadow-sm text-left">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-primary" data-icon="download">download</span>
              <span class="text-xs font-bold text-slate-800">Export Audit Report (CSV)</span>
            </div>
            <span class="material-symbols-outlined text-slate-400 text-sm" data-icon="chevron_right">chevron_right</span>
          </button>

          <button onclick="openAuditModal()" class="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between hover:bg-slate-50 transition shadow-sm text-left">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-primary" data-icon="assignment">assignment</span>
              <span class="text-xs font-bold text-slate-800">Audit Shift Logs &amp; Exceptions</span>
            </div>
            <span class="material-symbols-outlined text-slate-400 text-sm" data-icon="chevron_right">chevron_right</span>
          </button>

          <button onclick="openPayoutModal()" class="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between hover:bg-slate-50 transition shadow-sm text-left">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-primary" data-icon="account_balance_wallet">account_balance_wallet</span>
              <span class="text-xs font-bold text-slate-800">Facility Ledgers &amp; Payouts</span>
            </div>
            <span class="material-symbols-outlined text-slate-400 text-sm" data-icon="chevron_right">chevron_right</span>
          </button>
        </div>
      </section>
    </div>
  `;
}

// ----------------------------------------------------
// AUDIT & PAYOUT & EDIT RATE MODAL HANDLERS
// ----------------------------------------------------
function openAuditModal() {
  const modal = document.getElementById('audit-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    renderAuditModalContent();
  }
}

function closeAuditModal() {
  const modal = document.getElementById('audit-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function renderAuditModalContent() {
  const container = document.getElementById('audit-modal-body');
  if (!container) return;

  container.innerHTML = `
    <div class="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
          <span class="material-symbols-outlined text-lg" data-icon="assignment">assignment</span>
        </div>
        <div>
          <h3 class="font-bold text-slate-900 text-base">Shift Logs &amp; Tare Exceptions</h3>
          <p class="text-xs text-slate-500 font-mono">Facility Hub 01 • Last 24 Hours Audited Records</p>
        </div>
      </div>
      <button onclick="closeAuditModal()" class="text-slate-400 hover:text-slate-700 text-xl font-bold">✕</button>
    </div>

    <div class="p-6 overflow-y-auto space-y-4 text-xs">
      <div class="grid grid-cols-3 gap-3 text-center">
        <div class="bg-slate-50 p-3 rounded-xl border border-slate-200">
          <div class="text-[10px] text-slate-500 uppercase font-bold">Calibration Checks</div>
          <div class="text-lg font-bold text-slate-900 mt-1">4 / 4</div>
          <div class="text-[10px] text-teal-600 font-semibold mt-0.5">100% Passed</div>
        </div>
        <div class="bg-slate-50 p-3 rounded-xl border border-slate-200">
          <div class="text-[10px] text-slate-500 uppercase font-bold">Manual Overrides</div>
          <div class="text-lg font-bold text-slate-900 mt-1">1 Case</div>
          <div class="text-[10px] text-amber-600 font-semibold mt-0.5">+0.04 kg Logged</div>
        </div>
        <div class="bg-slate-50 p-3 rounded-xl border border-slate-200">
          <div class="text-[10px] text-slate-500 uppercase font-bold">Avg Tare Variance</div>
          <div class="text-lg font-bold text-slate-900 mt-1">0.02%</div>
          <div class="text-[10px] text-teal-600 font-semibold mt-0.5">Optimal Range</div>
        </div>
      </div>

      <div class="border border-slate-200 rounded-xl overflow-hidden">
        <div class="bg-slate-100/80 px-4 py-2.5 font-bold text-slate-700 border-b border-slate-200 flex justify-between">
          <span>Log Entry &amp; Description</span>
          <span>Shift / Status</span>
        </div>
        <div class="divide-y divide-slate-100 max-h-60 overflow-y-auto">
          ${store.state.auditLogs.map(log => `
            <div class="p-3.5 flex items-start justify-between hover:bg-slate-50 transition">
              <div>
                <div class="flex items-center gap-2">
                  <span class="font-mono font-bold text-slate-900">${log.id}</span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">${log.type}</span>
                  <span class="text-[11px] text-slate-400 font-mono">${log.time}</span>
                </div>
                <p class="text-slate-600 mt-1">${log.description}</p>
                <p class="text-[11px] text-slate-400 mt-0.5">Supervisor: <strong class="text-slate-700">${log.supervisor}</strong> · Variance: <strong class="${log.variance === '0.00 kg' ? 'text-teal-700' : 'text-amber-700'}">${log.variance}</strong></p>
              </div>
              <span class="px-2.5 py-1 rounded-full text-[11px] font-bold ${log.status === 'Verified' ? 'bg-teal-50 text-teal-700 border border-teal-200' : log.status === 'Approved' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}">
                ${log.status}
              </span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <div class="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
      <button onclick="store.exportAuditReportCSV()" class="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold rounded-lg text-xs transition flex items-center gap-1.5 shadow-sm">
        <span class="material-symbols-outlined text-[16px]">download</span> Export Audit CSV
      </button>
      <button onclick="showToast('Shift batch verified and signed off', 'success'); closeAuditModal();" class="px-5 py-2 bg-primary hover:bg-[#005049] text-white font-bold rounded-lg text-xs transition shadow-sm">
        Approve &amp; Sign Off Batch
      </button>
    </div>
  `;
}

function openPayoutModal() {
  const modal = document.getElementById('payout-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    renderPayoutModalContent();
  }
}

function closePayoutModal() {
  const modal = document.getElementById('payout-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function renderPayoutModalContent() {
  const container = document.getElementById('payout-modal-body');
  if (!container) return;

  container.innerHTML = `
    <div class="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
          <span class="material-symbols-outlined text-lg" data-icon="account_balance_wallet">account_balance_wallet</span>
        </div>
        <div>
          <h3 class="font-bold text-slate-900 text-base">Facility Ledgers &amp; Payout Reconciliation</h3>
          <p class="text-xs text-slate-500 font-mono">Campus Hub #04 · Merchant Settlement Cycle</p>
        </div>
      </div>
      <button onclick="closePayoutModal()" class="text-slate-400 hover:text-slate-700 text-xl font-bold">✕</button>
    </div>

    <div class="p-6 overflow-y-auto space-y-4 text-xs">
      <div class="bg-gradient-to-r from-[#00685f] to-[#008378] text-white p-5 rounded-2xl shadow-sm flex items-center justify-between">
        <div>
          <div class="text-xs text-teal-100 font-medium">Net Campus Payout (Live Cycle)</div>
          <div class="text-2xl font-bold font-mono mt-1">₹1,42,850.00</div>
          <div class="text-[11px] text-teal-200 mt-1">Direct NEFT/IMPS to Primary Merchant Account</div>
        </div>
        <div class="text-right">
          <span class="inline-block px-2.5 py-1 rounded-full bg-white/20 text-white font-bold text-[11px] backdrop-blur-sm">
            Auto-Settled Daily
          </span>
          <div class="text-[11px] text-teal-100 font-mono mt-1.5">UTR: #HDFC9481023</div>
        </div>
      </div>

      <div class="border border-slate-200 rounded-xl overflow-hidden">
        <div class="bg-slate-100/80 px-4 py-2.5 font-bold text-slate-700 border-b border-slate-200 flex justify-between">
          <span>Batch / Method</span>
          <span>Gross / Net Settled</span>
        </div>
        <div class="divide-y divide-slate-100 max-h-56 overflow-y-auto">
          ${store.state.payoutLedgers.map(p => `
            <div class="p-3.5 flex items-center justify-between hover:bg-slate-50 transition">
              <div>
                <div class="flex items-center gap-2">
                  <span class="font-mono font-bold text-slate-900">${p.id}</span>
                  <span class="text-[11px] text-slate-500 font-mono">${p.date}</span>
                </div>
                <p class="text-slate-700 font-medium mt-0.5">${p.method}</p>
                <p class="text-[10px] text-teal-600 font-semibold mt-0.5">${p.status}</p>
              </div>
              <div class="text-right font-mono">
                <div class="font-bold text-slate-900 text-sm">₹${p.net.toLocaleString('en-IN')}</div>
                <div class="text-[10px] text-slate-400">Gross: ₹${p.gross.toLocaleString('en-IN')} (Fee: ₹${p.fee})</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <div class="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
      <button onclick="store.exportPayoutReconciliationCSV()" class="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold rounded-lg text-xs transition flex items-center gap-1.5 shadow-sm">
        <span class="material-symbols-outlined text-[16px]">download</span> Export Payout CSV
      </button>
      <button onclick="closePayoutModal()" class="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs transition shadow-sm">
        Close Ledger
      </button>
    </div>
  `;
}

let editingTierId = null;
function openEditRateModal(tierId) {
  editingTierId = tierId;
  const modal = document.getElementById('edit-rate-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    renderEditRateModalContent();
  }
}

function closeEditRateModal() {
  editingTierId = null;
  const modal = document.getElementById('edit-rate-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function renderEditRateModalContent() {
  const container = document.getElementById('edit-rate-modal-body');
  if (!container) return;

  const tier = store.state.packagesConfig.find(p => p.id === editingTierId) || store.state.packagesConfig[0];
  if (!tier) return;

  container.innerHTML = `
    <div class="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
      <div>
        <h3 class="font-bold text-slate-900 text-base">Edit Package Rates</h3>
        <p class="text-xs text-slate-500 font-mono">${tier.name} · ${tier.category}</p>
      </div>
      <button onclick="closeEditRateModal()" class="text-slate-400 hover:text-slate-700 text-xl font-bold">✕</button>
    </div>

    <form onsubmit="submitPackageRateChange(event)" class="p-6 space-y-4 text-xs font-semibold text-slate-700">
      <div>
        <label class="block mb-1">Package Tier Name</label>
        <input type="text" id="edit-tier-name" value="${tier.name}" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900" />
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block mb-1">Quota Weight (KG)</label>
          <input type="number" id="edit-tier-quota" step="0.5" value="${tier.quotaKg}" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900" />
        </div>
        <div>
          <label class="block mb-1">Rate Per KG (₹)</label>
          <input type="number" id="edit-tier-rate" step="1" value="${tier.ratePerKg}" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900" />
        </div>
      </div>

      <div>
        <label class="block mb-1">Billing Duration Label</label>
        <input type="text" id="edit-tier-duration" value="${tier.durationLabel}" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900" />
      </div>

      <div class="pt-4 border-t border-slate-100 flex justify-end gap-3">
        <button type="button" onclick="closeEditRateModal()" class="px-4 py-2 text-slate-600 text-sm font-semibold hover:bg-slate-100 rounded-lg">Cancel</button>
        <button type="submit" class="px-5 py-2 bg-primary hover:bg-[#005049] text-white font-bold rounded-lg text-sm transition shadow-sm">
          Save Changes
        </button>
      </div>
    </form>
  `;
}

function submitPackageRateChange(e) {
  e.preventDefault();
  const name = document.getElementById('edit-tier-name')?.value;
  const quota = parseFloat(document.getElementById('edit-tier-quota')?.value) || 0;
  const rate = parseFloat(document.getElementById('edit-tier-rate')?.value) || 0;
  const duration = document.getElementById('edit-tier-duration')?.value;

  const tier = store.state.packagesConfig.find(p => p.id === editingTierId);
  if (tier) {
    if (name) tier.name = name;
    if (quota) tier.quotaKg = quota;
    if (rate) tier.ratePerKg = rate;
    tier.totalPrice = Math.round(tier.quotaKg * tier.ratePerKg);
    if (duration) tier.durationLabel = duration;
    store.save();
    showToast(`Rates updated for ${tier.name}!`, 'success');
  }
  closeEditRateModal();
  render();
}

// Modal Handlers & Dynamic Intake Screen (Matches Page 7 & 8 and Figma Screen 2)
let intakeState = {
  selectedCustomerId: 'CUS-0086',
  weightKg: 4.50,
  itemSummary: '6 shirts, 2 trousers, 1 bedsheet',
  activeCategory: 'Normal Wash & Fold (12 pcs)'
};

function openNewIntakeModal(preselectedCustomerId = null) {
  if (preselectedCustomerId) {
    intakeState.selectedCustomerId = preselectedCustomerId;
  }
  const modal = document.getElementById('intake-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    renderIntakeModalContent();
  }
}

function closeNewIntakeModal() {
  const modal = document.getElementById('intake-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function updateIntakeWeight(newWeight) {
  intakeState.weightKg = parseFloat(newWeight) || 0;
  renderIntakeModalContent();
}

function renderIntakeModalContent() {
  const container = document.getElementById('intake-modal-body');
  if (!container) return;

  const customer = store.state.customers.find(c => c.id === intakeState.selectedCustomerId) || store.state.customers[0];
  const balanceInfo = store.getCustomerBalance(customer.id);
  const activePkg = balanceInfo.package;

  const weight = intakeState.weightKg;
  const newBalance = Number((balanceInfo.remainingKg - weight).toFixed(2));
  const isBlocked = weight > balanceInfo.remainingKg;
  const isLowBalance = !isBlocked && newBalance <= (store.state.settings.lowBalanceThreshold || 5.00);
  const usageValue = Math.round(weight * balanceInfo.ratePerKg);
  const usedAfter = Number((balanceInfo.usedKg + weight).toFixed(2));

  container.innerHTML = `
    <!-- Top Stepper / Title (Page 8) -->
    <div class="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
      <div>
        <div class="text-xs text-slate-500 font-mono">Orders / New intake</div>
        <h2 class="text-xl font-bold text-slate-900 tracking-tight">Weigh. Review. Receive.</h2>
        <p class="text-xs text-slate-500">Record the actual weight and deduct it from the resident's active package.</p>
      </div>
      <button onclick="closeNewIntakeModal()" class="text-slate-400 hover:text-slate-700 text-xl font-bold p-1">✕</button>
    </div>

    <!-- Stepper Breadcrumb Pills -->
    <div class="px-5 py-2.5 bg-slate-100/70 border-b border-slate-200 flex items-center gap-2 text-xs font-semibold">
      <span class="text-teal-800 flex items-center gap-1">✓ Customer selected</span>
      <span class="text-slate-300">›</span>
      <span class="text-teal-800 flex items-center gap-1">✓ Package selected</span>
      <span class="text-slate-300">›</span>
      <span class="text-slate-900 flex items-center gap-1 font-bold">⚖ Enter weight & confirm</span>
      <span class="ml-auto text-[11px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded font-mono">Unsaved intake</span>
    </div>

    <!-- Two-column Modal Body -->
    <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto max-h-[70vh]">
      <!-- Left Column: Resident & Weight details -->
      <div class="space-y-4">
        <!-- Resident Selector -->
        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Resident *</label>
          <select 
            onchange="intakeState.selectedCustomerId = this.value; renderIntakeModalContent();"
            class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          >
            ${store.state.customers.map(c => `
              <option value="${c.id}" ${c.id === customer.id ? 'selected' : ''}>
                ${c.name} (${c.id}) · ${c.hostel} ${c.room}
              </option>
            `).join('')}
          </select>
        </div>

        <!-- Selected Resident Card Preview -->
        <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
          <span class="w-10 h-10 rounded-full bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center shrink-0">
            ${customer.initials}
          </span>
          <div class="flex-1">
            <div class="font-bold text-slate-900 text-sm">${customer.name}</div>
            <div class="text-xs text-slate-500">${customer.id} · ${customer.hostel}, ${customer.room} · ${customer.collegeYear}</div>
          </div>
          <span class="text-xs text-teal-700 font-bold">Active</span>
        </div>

        <!-- Active Package Details -->
        <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
          <div class="flex justify-between text-xs">
            <span class="text-slate-500">Active package:</span>
            <span class="font-bold text-slate-900">${activePkg ? activePkg.name : 'Campus 90'}</span>
          </div>
          <div class="text-xs text-slate-500 font-mono">${activePkg ? activePkg.purchasedKg.toFixed(2) : 90} kg · ₹50 / kg · ₹${activePkg ? activePkg.amountPaid : 4500} package price</div>
          <div class="text-xs font-bold text-teal-700 font-mono pt-1">
            ${balanceInfo.remainingKg.toFixed(2)} kg available before this intake
          </div>
        </div>

        <!-- Actual Weight Input (Large Target as in PRD & Figma) -->
        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Actual weight (kg) *</label>
          <div class="relative">
            <input 
              type="number" 
              step="0.05"
              min="0.1"
              value="${intakeState.weightKg}"
              oninput="updateIntakeWeight(this.value)"
              class="w-full text-3xl font-extrabold font-mono text-slate-900 px-4 py-3 bg-white border-2 ${isBlocked ? 'border-red-400 bg-red-50/20' : 'border-teal-600'} rounded-xl focus:outline-none shadow-sm text-center"
            />
            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400 font-mono">KG</span>
          </div>
          <div class="flex justify-between text-xs text-slate-400 mt-1">
            <span>Required · Greater than 0</span>
            <span>Up to 2 decimal places</span>
          </div>
        </div>

        <!-- Quick Weight Presets -->
        <div class="flex items-center gap-2">
          ${[2.5, 3.5, 4.5, 6.0, 8.0].map(w => `
            <button 
              type="button" 
              onclick="updateIntakeWeight(${w})"
              class="flex-1 py-1 bg-slate-100 hover:bg-teal-50 hover:text-teal-800 rounded font-mono text-xs font-bold text-slate-700 border border-slate-200 transition"
            >
              ${w} kg
            </button>
          `).join('')}
        </div>

        <!-- Items Summary / Notes -->
        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Item summary / notes (optional)</label>
          <input 
            type="text" 
            value="${intakeState.itemSummary}"
            oninput="intakeState.itemSummary = this.value"
            placeholder="e.g. 6 shirts, 2 trousers, 1 bedsheet"
            class="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900"
          />
          <div class="text-[11px] text-slate-400 mt-1">Useful at handover. Weight is the basis for package usage.</div>
        </div>
      </div>

      <!-- Right Column: Review intake & Balance safeguards -->
      <div class="space-y-4">
        <div class="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-3">
          <div class="flex items-center justify-between border-b border-slate-200 pb-2">
            <h3 class="font-bold text-slate-900 text-sm">Review intake</h3>
            <span class="text-xs text-slate-400 font-mono">${store.state.systemDate}</span>
          </div>
          
          <div class="space-y-2 text-xs">
            <div class="flex justify-between">
              <span class="text-slate-500">Resident:</span>
              <span class="font-bold text-slate-900">${customer.name}</span>
            </div>
            <div class="flex justify-between font-mono">
              <span class="text-slate-500">Balance before:</span>
              <span class="font-bold text-slate-800">${balanceInfo.remainingKg.toFixed(2)} kg</span>
            </div>
            <div class="flex justify-between font-mono">
              <span class="text-slate-500">This intake:</span>
              <span class="font-bold text-red-600">-${weight.toFixed(2)} kg</span>
            </div>
          </div>

          <!-- Highlighted Remaining Balance Result -->
          <div class="p-4 rounded-xl ${isBlocked ? 'bg-red-50 border border-red-200 text-red-900' : 'bg-teal-50 border border-teal-200 text-teal-950'}">
            <div class="text-xs font-medium">${isBlocked ? 'Shortfall occurred' : 'Remaining after intake'}</div>
            <div class="text-3xl font-extrabold font-mono mt-0.5">
              ${isBlocked ? `-${(weight - balanceInfo.remainingKg).toFixed(2)} kg short` : `${newBalance.toFixed(2)} kg`}
            </div>
            <div class="text-xs font-mono mt-1 ${isBlocked ? 'text-red-700' : 'text-teal-700'}">
              ${isBlocked ? 'Transaction cannot proceed without override' : `≈ ₹${Math.max(0, Math.round(newBalance * balanceInfo.ratePerKg)).toLocaleString()} remaining value`}
            </div>
          </div>

          <!-- Usage stats -->
          <div class="space-y-1.5 text-xs font-mono text-slate-600 pt-1">
            <div class="flex justify-between">
              <span>Previously used:</span>
              <span>${balanceInfo.usedKg.toFixed(2)} kg</span>
            </div>
            <div class="flex justify-between font-bold text-slate-800">
              <span>Used after intake:</span>
              <span>${usedAfter.toFixed(2)} / ${balanceInfo.totalKg.toFixed(2)} kg</span>
            </div>
            <div class="flex justify-between">
              <span>Usage value (₹50/kg):</span>
              <span>₹${usageValue}</span>
            </div>
          </div>
        </div>

        <!-- Balance Safeguards Indicators (PRD BR-04, FR-05, Page 8) -->
        ${isBlocked ? `
          <div class="bg-red-50 border border-red-200 rounded-xl p-4 text-xs space-y-2">
            <div class="flex items-center gap-2 font-bold text-red-800 text-sm">
              <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span>Intake blocked · ${(weight - balanceInfo.remainingKg).toFixed(2)} kg short</span>
            </div>
            <p class="text-red-700 leading-snug">
              ${customer.name} has only ${balanceInfo.remainingKg.toFixed(2)} kg available, but ${weight.toFixed(2)} kg entered. Add a package or request an admin-approved resolution.
            </p>
            <div class="flex gap-2 pt-1">
              <button onclick="showToast('Redirecting to package purchase');" class="px-3 py-1.5 bg-red-700 text-white font-bold rounded text-xs">
                Add package / ask admin
              </button>
            </div>
          </div>
        ` : isLowBalance ? `
          <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs space-y-1.5">
            <div class="flex items-center gap-2 font-bold text-amber-900 text-sm">
              <svg class="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
              <span>Low balance after intake: ${newBalance.toFixed(2)} kg</span>
            </div>
            <p class="text-amber-800">
              Intake can continue. Suggest a new package before the next collection. (Warning appears when remaining balance is 5.00 kg or less).
            </p>
          </div>
        ` : `
          <div class="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-500 flex items-center gap-2">
            <svg class="w-4 h-4 text-teal-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span>Creates one Received order and deducts ${weight.toFixed(2)} kg together. Nothing changes until you confirm.</span>
          </div>
        `}
      </div>
    </div>

    <!-- Modal Footer Actions -->
    <div class="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
      <div class="text-xs text-slate-500">
        Recorded by <span class="font-bold text-slate-700">${store.state.currentUser.name}</span> · ${store.state.currentUser.role}
      </div>

      <div class="flex items-center gap-3 w-full sm:w-auto justify-end">
        <button onclick="closeNewIntakeModal()" class="px-4 py-2 text-slate-600 hover:text-slate-900 text-sm font-semibold">
          Cancel
        </button>
        <button 
          onclick="submitNewIntake()"
          ${isBlocked ? 'disabled' : ''}
          class="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 disabled:bg-slate-300 text-white text-sm font-bold rounded-lg shadow transition flex items-center gap-2"
        >
          ✓ Create order & deduct ${weight.toFixed(2)} kg
        </button>
      </div>
    </div>
  `;
}

function submitNewIntake() {
  try {
    const result = store.createIntake({
      customerId: intakeState.selectedCustomerId,
      weightKg: intakeState.weightKg,
      itemSummary: intakeState.itemSummary
    });
    closeNewIntakeModal();
    showToast(`Order ${result.order.id} created! Balance updated to ${result.newBalance.toFixed(2)} kg`, 'success');
    render();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

// Audited Adjustment Modal (FR-14, BR-12)
let adjustmentState = {
  customerId: 'CUS-0086',
  kgDelta: 3.00,
  reason: 'Weigh scale tare correction approved'
};

function openAdjustmentModal(customerId) {
  adjustmentState.customerId = customerId;
  const modal = document.getElementById('adjustment-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    renderAdjustmentModalContent();
  }
}

function closeAdjustmentModal() {
  const modal = document.getElementById('adjustment-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function renderAdjustmentModalContent() {
  const container = document.getElementById('adjustment-modal-body');
  if (!container) return;

  const customer = store.state.customers.find(c => c.id === adjustmentState.customerId);
  const isOwner = store.state.currentUser.role === 'Owner / Admin';

  container.innerHTML = `
    <div class="p-5 border-b border-slate-200 flex items-center justify-between">
      <div>
        <h3 class="font-bold text-slate-900 text-base">Request Audited Package Adjustment</h3>
        <p class="text-xs text-slate-500">Append an adjustment record without modifying historical transactions (FR-14).</p>
      </div>
      <button onclick="closeAdjustmentModal()" class="text-slate-400 hover:text-slate-700 text-lg font-bold">✕</button>
    </div>

    <div class="p-6 space-y-4">
      ${!isOwner ? `
        <div class="bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-800">
          ⚠️ Restricted: Only Owner / Admin can commit audited package adjustments. Switch role in Staff & Settings to test.
        </div>
      ` : ''}

      <div>
        <label class="block text-xs font-bold text-slate-700 mb-1">Customer</label>
        <div class="p-3 bg-slate-50 rounded-lg text-sm font-semibold">${customer ? customer.name : ''} (${customer ? customer.id : ''})</div>
      </div>

      <div>
        <label class="block text-xs font-bold text-slate-700 mb-1">Weight Delta (+ for credit, - for debit)</label>
        <input 
          type="number" 
          step="0.05"
          value="${adjustmentState.kgDelta}"
          oninput="adjustmentState.kgDelta = parseFloat(this.value) || 0"
          class="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono text-sm"
        />
      </div>

      <div>
        <label class="block text-xs font-bold text-slate-700 mb-1">Mandatory Audit Reason</label>
        <input 
          type="text" 
          value="${adjustmentState.reason}"
          oninput="adjustmentState.reason = this.value"
          placeholder="e.g. Weigh scale tare correction approved"
          class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
        />
      </div>
    </div>

    <div class="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
      <button onclick="closeAdjustmentModal()" class="px-4 py-2 text-slate-600 text-sm font-semibold">Cancel</button>
      <button 
        onclick="submitAdjustment()" 
        ${!isOwner ? 'disabled' : ''}
        class="px-5 py-2 bg-teal-700 hover:bg-teal-800 disabled:bg-slate-300 text-white font-bold rounded-lg text-sm"
      >
        Commit Adjustment
      </button>
    </div>
  `;
}

function submitAdjustment() {
  try {
    store.addAuditedAdjustment(adjustmentState.customerId, adjustmentState.kgDelta, adjustmentState.reason);
    closeAdjustmentModal();
    showToast('Audited adjustment recorded in package ledger!', 'success');
    render();
  } catch (e) {
    showToast(e.message, 'error');
  }
}

// Add Customer Modal
function openAddCustomerModal() {
  const modal = document.getElementById('add-customer-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeAddCustomerModal() {
  const modal = document.getElementById('add-customer-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function submitNewCustomer(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value;
  const phone = form.phone.value;
  const hostel = form.hostel.value;
  const room = form.room.value;
  const collegeYear = form.collegeYear.value;
  const packageType = form.packageType.value;

  const newId = store.addCustomer({ name, phone, hostel, room, collegeYear, packageType });
  closeAddCustomerModal();
  showToast(`Customer ${name} (${newId}) created with ${packageType}!`, 'success');
  navigateTo('customer-detail', { customerId: newId });
}

// Delivery actions
function toggleDeliveryOrder(orderId, checked) {
  if (checked) store.selectedDeliveryOrderIds.add(orderId);
  else store.selectedDeliveryOrderIds.delete(orderId);
  render();
}

function toggleAllDeliveryOrders(checked, orderIds) {
  if (checked) {
    orderIds.forEach(id => store.selectedDeliveryOrderIds.add(id));
  } else {
    orderIds.forEach(id => store.selectedDeliveryOrderIds.delete(id));
  }
  render();
}

function toggleQueueOrder(orderId, checked) {
  if (checked) store.selectedQueueOrderIds.add(orderId);
  else store.selectedQueueOrderIds.delete(orderId);
  render();
}

function toggleAllQueueOrders(checked, orderIds) {
  if (checked) {
    orderIds.forEach(id => store.selectedQueueOrderIds.add(id));
  } else {
    orderIds.forEach(id => store.selectedQueueOrderIds.delete(id));
  }
  render();
}

function executeConfirmDelivery() {
  const ids = Array.from(store.selectedDeliveryOrderIds);
  if (ids.length === 0) return;

  const result = store.confirmHandover(ids);
  showToast(`${result.count} order(s) successfully marked Delivered! Staff: ${store.state.currentUser.name}`, 'success');
  render();
}

// CSV Export Utilities
function exportDailyReportCSV() {
  const orders = store.state.orders;
  let csv = 'Order ID,Customer,Hostel,Room,Weight (kg),Status,Received At,Delivered At,Delivered By\n';
  orders.forEach(o => {
    csv += `"${o.id}","${o.customerName}","${o.hostel}","${o.room}","${o.weightKg.toFixed(2)}","${o.status}","${o.receivedAt}","${o.deliveredAt || ''}","${o.deliveredBy || ''}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `foldline_daily_report_${store.state.systemDate.replace(/\s+/g, '_')}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Daily Report CSV downloaded', 'success');
}

function exportCustomerLedgerCSV(customerId) {
  const customer = store.state.customers.find(c => c.id === customerId);
  const txs = store.state.packageTransactions.filter(t => t.customerId === customerId);

  let csv = 'Date,Time,Order/Entry,Details,Type,Kg Delta,Balance After (kg),Staff\n';
  txs.forEach(t => {
    csv += `"${t.date}","${t.time}","${t.entryLabel}","${t.details}","${t.type}","${t.kgDelta.toFixed(2)}","${t.balanceAfter.toFixed(2)}","${t.staff}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `foldline_ledger_${customerId}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Customer Ledger CSV downloaded', 'success');
}

// Master Layout & View Rendering
function render() {
  const appContainer = document.getElementById('app-root');
  if (!appContainer) return;

  const isMobile = store.deviceMode === 'mobile';

  let viewHtml = '';
  switch (store.currentView) {
    case 'dashboard':
      viewHtml = renderDashboard();
      break;
    case 'customers':
      viewHtml = renderCustomers();
      break;
    case 'customer-detail':
      viewHtml = renderCustomerDetail();
      break;
    case 'orders':
      viewHtml = renderOrders();
      break;
    case 'delivery':
      viewHtml = renderDeliveryCheck();
      break;
    case 'reports':
      viewHtml = renderDailyReport();
      break;
    case 'settings':
      viewHtml = renderSettings();
      break;
    default:
      viewHtml = renderDashboard();
  }

  // Ready badge count
  const readyCount = store.state.orders.filter(o => o.status === 'Ready').length;

  if (isMobile) {
    // Render Inside Mobile Device Simulator (PWA Mode from Figma Screen 1-4 & PDF Page 5 & 7)
    appContainer.innerHTML = `
      <div class="min-h-screen py-8 px-4 flex flex-col items-center justify-center">
        <!-- Top Device Control Toolbar -->
        <div class="w-full max-w-md mb-4 flex items-center justify-between no-print text-xs">
          <div class="flex items-center gap-2">
            <span class="font-bold text-slate-700">Device preview:</span>
            <span class="px-2 py-0.5 bg-teal-100 text-teal-800 rounded font-semibold">Mobile Cart PWA (390px)</span>
          </div>
          <button onclick="switchDeviceMode('desktop')" class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm flex items-center gap-1.5">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            Switch to Desktop
          </button>
        </div>

        <!-- Phone Shell -->
        <div class="mobile-device-frame">
          <div class="mobile-notch">
            <div class="camera-lens"></div>
          </div>

          <!-- Inside Screen -->
          <div class="mobile-screen">
            <!-- Mobile Top Bar -->
            <div class="bg-[#0b1726] text-white pt-8 pb-3 px-4 flex items-center justify-between sticky top-0 z-30 shadow-md">
              <div class="flex items-center gap-2" onclick="navigateTo('dashboard')">
                <div class="w-6 h-6 rounded bg-teal-600 flex items-center justify-center font-extrabold text-xs">≈</div>
                <span class="font-extrabold text-base tracking-tight font-mono">foldline</span>
              </div>
              <div class="flex items-center gap-2" onclick="navigateTo('settings')">
                <span class="text-xs text-slate-400 font-mono">${store.state.currentUser.name}</span>
                <span class="w-7 h-7 rounded-full bg-teal-800 text-teal-200 text-xs font-bold flex items-center justify-center border border-teal-600">
                  ${store.state.currentUser.avatar}
                </span>
              </div>
            </div>

            <!-- Scrollable View Content -->
            <div class="p-4 flex-1">
              ${viewHtml}
            </div>

            <!-- Mobile PWA Bottom Navigation Bar (Figma Screen 1-4 & PDF Page 5 & 7) -->
            <div class="bg-white border-t border-slate-200 py-2 px-3 flex items-center justify-around sticky bottom-0 z-30 shadow-lg no-print">
              <button onclick="navigateTo('dashboard')" class="flex flex-col items-center gap-0.5 ${store.currentView === 'dashboard' ? 'text-teal-700 font-bold' : 'text-slate-400 hover:text-slate-600'}">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
                <span class="text-[10px]">Home</span>
              </button>

              <button onclick="openNewIntakeModal()" class="flex flex-col items-center gap-0.5 text-slate-400 hover:text-teal-700">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <span class="text-[10px]">Intake</span>
              </button>

              <button onclick="navigateTo('delivery')" class="flex flex-col items-center gap-0.5 relative ${store.currentView === 'delivery' ? 'text-teal-700 font-bold' : 'text-slate-400 hover:text-slate-600'}">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <span class="text-[10px]">Delivery</span>
                ${readyCount > 0 ? `<span class="absolute -top-1 right-1 w-2 h-2 rounded-full bg-teal-600"></span>` : ''}
              </button>

              <button onclick="navigateTo('orders')" class="flex flex-col items-center gap-0.5 ${store.currentView === 'orders' ? 'text-teal-700 font-bold' : 'text-slate-400 hover:text-slate-600'}">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                <span class="text-[10px]">Orders</span>
              </button>

              <button onclick="navigateTo('customers')" class="flex flex-col items-center gap-0.5 ${store.currentView === 'customers' || store.currentView === 'customer-detail' ? 'text-teal-700 font-bold' : 'text-slate-400 hover:text-slate-600'}">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                <span class="text-[10px]">Residents</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  } else {
    // Render Full Desktop Layout (Matches PDF Page 1, 2, 3, 4, 6, 8)
    appContainer.innerHTML = `
      <div class="min-h-screen flex bg-[#f8fafc]">
        <!-- Desktop Deep Navy Sidebar (PDF Page 1-8) -->
        <aside id="app-sidebar" class="w-64 bg-[#0e1726] text-slate-300 flex flex-col shrink-0 border-r border-slate-800 select-none">
          <!-- Logo & Campus Info -->
          <div class="p-6 border-b border-slate-800/80">
            <div class="flex items-center gap-2.5 cursor-pointer" onclick="navigateTo('dashboard')">
              <span class="text-teal-400 text-xl font-extrabold tracking-tighter">≈</span>
              <span class="font-extrabold text-xl text-white tracking-tight">foldline</span>
            </div>
            <div class="mt-4">
              <div class="text-xs font-bold text-slate-200">Campus laundry</div>
              <div class="text-[11px] text-slate-400 mt-0.5 font-mono">North campus · Bengaluru</div>
            </div>
          </div>

          <!-- Navigation Links -->
          <nav class="p-3 space-y-1 flex-1 text-sm font-medium">
            <button 
              onclick="navigateTo('dashboard')"
              class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition ${store.currentView === 'dashboard' ? 'bg-[#1a2538] text-white font-bold' : 'text-slate-400 hover:bg-[#152033] hover:text-slate-200'}"
            >
              <svg class="w-5 h-5 ${store.currentView === 'dashboard' ? 'text-teal-400' : 'text-slate-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
              <span>Dashboard</span>
            </button>

            <button 
              onclick="navigateTo('customers')"
              class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition ${store.currentView === 'customers' || store.currentView === 'customer-detail' ? 'bg-[#1a2538] text-white font-bold' : 'text-slate-400 hover:bg-[#152033] hover:text-slate-200'}"
            >
              <svg class="w-5 h-5 ${store.currentView === 'customers' || store.currentView === 'customer-detail' ? 'text-teal-400' : 'text-slate-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              <span>Customers</span>
            </button>

            <button 
              onclick="navigateTo('orders')"
              class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition ${store.currentView === 'orders' ? 'bg-[#1a2538] text-white font-bold' : 'text-slate-400 hover:bg-[#152033] hover:text-slate-200'}"
            >
              <svg class="w-5 h-5 ${store.currentView === 'orders' ? 'text-teal-400' : 'text-slate-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
              <span>Orders</span>
            </button>

            <button 
              onclick="navigateTo('delivery')"
              class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg transition ${store.currentView === 'delivery' ? 'bg-[#1a2538] text-white font-bold' : 'text-slate-400 hover:bg-[#152033] hover:text-slate-200'}"
            >
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5 ${store.currentView === 'delivery' ? 'text-teal-400' : 'text-slate-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <span>Delivery check</span>
              </div>
              <span class="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-extrabold bg-teal-900/80 text-teal-300 rounded">${readyCount}</span>
            </button>

            <button 
              onclick="navigateTo('reports')"
              class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition ${store.currentView === 'reports' ? 'bg-[#1a2538] text-white font-bold' : 'text-slate-400 hover:bg-[#152033] hover:text-slate-200'}"
            >
              <svg class="w-5 h-5 ${store.currentView === 'reports' ? 'text-teal-400' : 'text-slate-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
              <span>Reports</span>
            </button>
          </nav>

          <!-- Evening Collection Cart Card (Page 1-6 Bottom) -->
          <div class="p-4 mx-3 mb-3 bg-[#131e30] rounded-xl border border-slate-800 text-xs space-y-1">
            <div class="flex items-center gap-2 text-teal-400 font-bold">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              <span>Evening collection</span>
            </div>
            <div class="text-slate-300 font-medium">Hostels A & B</div>
            <div class="text-slate-400 font-mono text-[11px]">5:00–7:00 pm</div>
            <div class="text-slate-400 text-[11px]">Main courtyard</div>
          </div>

          <!-- Staff & Settings / Lock -->
          <div class="p-4 border-t border-slate-800 flex items-center justify-between text-xs cursor-pointer hover:bg-[#152033]" onclick="navigateTo('settings')">
            <div class="flex items-center gap-2 text-slate-400">
              <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <span>Staff & settings</span>
            </div>
            <span class="text-slate-500 text-[11px]">Owner</span>
          </div>

          <!-- Bottom Workspace Stamp -->
          <div class="px-4 py-2 bg-[#09111c] text-[10px] text-slate-500 font-mono">
            FOLDLINE / WORKSPACE 01
          </div>
        </aside>

        <!-- Main Content Area -->
        <div class="flex-1 flex flex-col min-w-0">
          <!-- Top Desktop Bar -->
          <header id="app-topbar" class="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0 no-print">
            <div class="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span class="text-slate-400">Workspace</span>
              <span>&gt;</span>
              <span class="text-slate-800 capitalize font-bold">${store.currentView.replace('-', ' ')}</span>
            </div>

            <div class="flex items-center gap-6">
              <!-- Switch to Mobile PWA Button -->
              <button 
                onclick="switchDeviceMode('mobile')" 
                class="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
              >
                <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                <span>Mobile Cart View</span>
              </button>

              <div class="text-xs text-slate-500 font-mono flex items-center gap-1.5">
                <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                <span>Fri, 23 Oct 2026</span>
              </div>

              <!-- Active User Profile Dropdown Pill -->
              <div class="flex items-center gap-3 pl-4 border-l border-slate-200 cursor-pointer" onclick="navigateTo('settings')">
                <span class="w-8 h-8 rounded-full bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center border border-teal-200">
                  ${store.state.currentUser.avatar}
                </span>
                <div class="text-left text-xs">
                  <div class="font-bold text-slate-900">${store.state.currentUser.name}</div>
                  <div class="text-slate-400">${store.state.currentUser.role}</div>
                </div>
              </div>
            </div>
          </header>

          <!-- Page Body -->
          <main id="main-content" class="flex-1 p-8 max-w-7xl w-full mx-auto">
            ${viewHtml}
          </main>

          <!-- Footer Stamp (Page 1-6) -->
          <footer class="p-6 border-t border-slate-200 bg-white text-xs text-slate-400 flex items-center justify-between font-mono no-print">
            <div>Campus laundry · All times in IST</div>
            <div>${store.state.systemDate} · ${store.state.systemTime}</div>
          </footer>
        </div>
      </div>
    `;
  }
}

// Initial bootstrap
window.addEventListener('DOMContentLoaded', () => {
  render();
});
