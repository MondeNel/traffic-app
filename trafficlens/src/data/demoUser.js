const demoUser = {
  first_name: 'David',
  last_name: 'Gareth',
  id_number: '020608175379081',
  email: 'david.gareth@gmail.com',
  phone: '+27 82 555 0134',
  address: '14 Smit St, Cape Town',
  date_of_birth: '1996-06-17',
  license: {
    license_number: '1063003041FS',
    license_expiry: '2026-09-28',
    vehicle_codes: 'B'
  },
  // Demo payment account
  paymentAccount: {
    cardholderName: 'David Gareth',
    cardNumber: '4532 7891 2345 6789',
    expiryDate: '09/28',
    cvv: '123',
    cardType: 'VISA',
    balance: 12500,
    bank: 'Standard Bank',
    accountType: 'Current Account'
  },
  vehicles: [
    {
      id: 1,
      plate_number: 'GP 82 TT',
      make: 'Toyota',
      model: 'Corolla',
      year: 2019,
      engine: '1.8L Petrol',
      disc_expiry: '2025-04-28',
      registered_date: '2021-08-14',
      status: 'warning'
    },
    {
      id: 2,
      plate_number: 'GP 14 KW',
      make: 'Volkswagen',
      model: 'Polo',
      year: 2022,
      engine: '1.0L TSI',
      disc_expiry: '2026-02-01',
      registered_date: '2022-03-03',
      status: 'ok'
    }
  ],
  fines: [
    {
      id: 1,
      fine_type: 'speeding',
      description: 'Speeding — N1 Cape Town',
      amount: 1500,
      location: 'N1 Cape Town · 82km/h in 60km/h zone',
      issued_date: '2025-04-12',
      due_date: '2025-05-12',
      status: 'unpaid',
      plate_number: 'GP 82 TT'
    },
    {
      id: 2,
      fine_type: 'expired_disc',
      description: 'Expired disc — GP 82 TT',
      amount: 750,
      location: 'CBD, Cape Town',
      issued_date: '2025-03-28',
      due_date: '2025-04-28',
      status: 'unpaid',
      plate_number: 'GP 82 TT'
    },
    {
      id: 3,
      fine_type: 'parking',
      description: 'No-parking zone — Sea Point',
      amount: 600,
      location: 'Beach Road, Sea Point',
      issued_date: '2025-04-01',
      due_date: '2025-05-01',
      status: 'unpaid',
      plate_number: null
    },
    {
      id: 4,
      fine_type: 'traffic_light',
      description: 'Traffic light — Observatory',
      amount: 500,
      location: 'Main Road, Observatory',
      issued_date: '2025-01-15',
      due_date: '2025-02-15',
      status: 'paid',
      paid_date: '2025-02-05',
      plate_number: null
    }
  ]
};

export default demoUser;