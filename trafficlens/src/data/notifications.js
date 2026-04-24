const notifications = [
  {
    id: 1,
    title: 'Fine Payment Due',
    message: 'Your speeding fine of R1,500 on N1 Cape Town is due on 12 May 2025.',
    type: 'warning',
    isRead: false,
    created_at: '2025-04-23T08:00:00'
  },
  {
    id: 2,
    title: 'License Expiry Reminder',
    message: 'Your driver\'s license expires on 28 September 2026. Renew early to avoid delays.',
    type: 'info',
    isRead: false,
    created_at: '2025-04-22T14:30:00'
  },
  {
    id: 3,
    title: 'Vehicle Disc Expiring',
    message: 'The license disc for GP 82 TT expires on 28 April 2025. Renew now to avoid fines.',
    type: 'warning',
    isRead: false,
    created_at: '2025-04-20T09:15:00'
  },
  {
    id: 4,
    title: 'Payment Confirmed',
    message: 'Your payment of R500 for Traffic light fine in Observatory has been processed.',
    type: 'success',
    isRead: true,
    created_at: '2025-02-05T11:20:00'
  },
  {
    id: 5,
    title: 'New Roadblock Alert',
    message: 'A roadblock has been scheduled on N2 Cape Town this weekend. Plan your route accordingly.',
    type: 'info',
    isRead: true,
    created_at: '2025-04-18T16:00:00'
  }
];

export default notifications;