//MESSAGES SCREEN START ----------------------------------
export const conversations = [
  {
    id: '1',
    name: 'John M.',
    service: 'Plumber',
    lastMessage: 'I can come fix your sink at 2pm tomorrow. Does that work for you?',
    time: '10 min ago',
    phone: '0783322419',
    unread: 1,
    imageUrl: 'https://api.a0.dev/assets/image?text=John%20M.%20Plumber&aspect=1:1',
    messages: [
      { id: '1', text: 'Hello, I saw your request about the leaking tap.', sent: false, time: '11:20 AM' },
      { id: '2', text: 'Yes, it\'s still leaking badly. Can you help?', sent: true, time: '11:22 AM' },
      { id: '3', text: 'I can come fix your sink at 2pm tomorrow. Does that work for you?', sent: false, time: '11:25 AM' },
    ]
  },
  {
    id: '2',
    name: 'Sarah K.',
    service: 'Tutor',
    lastMessage: 'Great! I\'ll bring some practice materials for your son.',
    time: '2 hours ago',
    phone: '0783322419',
    unread: 2,
    imageUrl: 'https://api.a0.dev/assets/image?text=Sarah%20K.%20Tutor&aspect=1:1',
    messages: [
      { id: '1', text: 'Hi, I\'m interested in tutoring your son in mathematics.', sent: false, time: '9:30 AM' },
      { id: '2', text: 'That sounds great! He\'s struggling with algebra.', sent: true, time: '9:45 AM' },
      { id: '3', text: 'I specialize in algebra. When would be a good time to start?', sent: false, time: '9:50 AM' },
      { id: '4', text: 'How about tomorrow at 4pm?', sent: true, time: '10:05 AM' },
      { id: '5', text: 'Great! I\'ll bring some practice materials for your son.', sent: false, time: '10:10 AM' },
    ]
  },
  {
    id: '3',
    name: 'David N.',
    service: 'Electrician',
    lastMessage: 'I\'ll need to replace the circuit breaker. It will cost around R600.',
    time: 'Yesterday',
    phone: '0783322419',
    unread: 0,
    imageUrl: 'https://api.a0.dev/assets/image?text=David%20N.%20Electrician&aspect=1:1',
    messages: [
      { id: '1', text: 'Hello, I\'m having issues with my electricity. Lights keep flickering.', sent: true, time: '3:20 PM' },
      { id: '2', text: 'That sounds like a potential circuit overload. When can I come check?', sent: false, time: '3:30 PM' },
      { id: '3', text: 'Can you come tomorrow morning?', sent: true, time: '3:35 PM' },
      { id: '4', text: 'Yes, I can be there around 9am.', sent: false, time: '3:40 PM' },
      { id: '5', text: 'I\'ll need to replace the circuit breaker. It will cost around R600.', sent: false, time: '5:15 PM' },
    ]
  },
  {
    id: '4',
    name: 'Thandi M.',
    service: 'Cleaner',
    lastMessage: 'I\'ve finished cleaning. Left the keys under the mat as requested.',
    time: 'Monday',
    phone: '0783322419',
    unread: 1,
    imageUrl: 'https://api.a0.dev/assets/image?text=Thandi%20M.%20Cleaner&aspect=1:1',
    messages: []
  },
  {
    id: '5',
    name: 'Sipho Z.',
    service: 'Gardener',
    lastMessage: 'Your garden is looking much better now. I\'ve planted those flowers you wanted.',
    time: 'Last week',
    phone: '0783322419',
    unread: 0,
    imageUrl: 'https://api.a0.dev/assets/image?text=Sipho%20Z.%20Gardener&aspect=1:1',
    messages: []
  }
];
// MESSAGES SCREEN END======================================


//DASHBOARD SCREEN START ---------------------------------
// Service categories for the app
export const serviceCategories = [
  { id: '1', name: 'Plumbing', icon: 'plumbing' },
  { id: '2', name: 'Electrical', icon: 'electrical-services' },
  { id: '3', name: 'Tutoring', icon: 'school' },
  { id: '4', name: 'Cleaning', icon: 'cleaning-services' },
  { id: '5', name: 'Gardening', icon: 'yard' },
  { id: '6', name: 'Beauty', icon: 'content-cut' },
  { id: '7', name: 'Transport', icon: 'directions-car' },
  { id: '8', name: 'Cooking', icon: 'restaurant' },
];

// Mock data for nearby providers
export const nearbyProviders = [
  {
    id: '1',
    name: 'John M.',
    service: 'Plumbing',
    rating: 4.8,
    reviews: 24,
    distance: '0.8 km',
    imageUrl: 'https://api.a0.dev/assets/image?text=John%20M.%20Plumber&aspect=1:1',
    verified: true
  },
  {
    id: '2',
    name: 'Sarah K.',
    service: 'Tutoring',
    rating: 4.9,
    reviews: 37,
    distance: '1.2 km',
    imageUrl: 'https://api.a0.dev/assets/image?text=Sarah%20K.%20Tutor&aspect=1:1',
    verified: true
  },
  {
    id: '3',
    name: 'David N.',
    service: 'Electrical',
    rating: 4.7,
    reviews: 18,
    distance: '1.5 km',
    imageUrl: 'https://api.a0.dev/assets/image?text=David%20N.%20Electrician&aspect=1:1',
    verified: false
  },
];

// Mock data for live gigs (requests)
export const liveRequests = [
  {
    id: '1',
    title: 'Fix leaking tap urgently',
    category: 'Plumbing',
    location: 'Soweto, Zone 4',
    time: 'Today, ASAP',
    postedTime: '25 min ago',
    description: 'Kitchen sink is leaking badly and causing water damage. Need someone to fix it today.',
    budget: 'R200-R350',
    images: [
      'https://api.a0.dev/assets/image?text=Leaking%20Tap&aspect=16:9',
      'https://api.a0.dev/assets/image?text=Water%20Damage&aspect=16:9'
    ],
    preferences: ['Professional tools', 'Same day service', 'Experienced plumber'],
    poster: {
      id: '101',
      name: 'Themba K.',
      rating: 4.7,
      imageUrl: 'https://api.a0.dev/assets/image?text=Themba%20K.&aspect=1:1',
      joinedDate: 'June 2022',
      completedJobs: 8
    }
  },
  {
    id: '2',
    title: 'Need help with Grade 10 Math',
    category: 'Tutoring',
    location: 'Orlando East',
    time: 'Tomorrow, 4PM',
    postedTime: '1 hour ago',
    description: 'Kitchen sink is leaking badly and causing water damage. Need someone to fix it today.',
    budget: 'R200-R350',
    images: [
      'https://api.a0.dev/assets/image?text=Leaking%20Tap&aspect=16:9',
      'https://api.a0.dev/assets/image?text=Water%20Damage&aspect=16:9'
    ],
    preferences: ['Professional tools', 'Same day service', 'Experienced plumber'],
    poster: {
      id: '101',
      name: 'Jay Nhlapho.',
      rating: 4.7,
      imageUrl: 'https://i.scdn.co/image/ab6761610000517494b019d16885a45caaf10ca3',
      joinedDate: 'June 2022',
      completedJobs: 8
    }
  },
  {
    id: '3',
    title: 'Garden maintenance needed',
    category: 'Gardening',
    location: 'Diepkloof',
    time: 'This weekend',
    postedTime: '3 hours ago',
    description: 'Kitchen sink is leaking badly and causing water damage. Need someone to fix it today.',
    budget: 'R200-R350',
    images: [
      'https://api.a0.dev/assets/image?text=Leaking%20Tap&aspect=16:9',
      'https://api.a0.dev/assets/image?text=Water%20Damage&aspect=16:9'
    ],
    preferences: ['Professional tools', 'Same day service', 'Experienced plumber'],
    poster: {
      id: '101',
      name: 'Themba K.',
      rating: 4.7,
      imageUrl: 'https://api.a0.dev/assets/image?text=Themba%20K.&aspect=1:1',
      joinedDate: 'June 2022',
      completedJobs: 8
    }
  },
];

//DASHBOARD SCREEN END ==============================



// PROFILE SCREEN START---------------------------

export const mockReviews = [
  { id: '1', reviewer: 'Lerato M.', rating: 5, comment: 'Excellent job on short notice!' },
  { id: '2', reviewer: 'Sipho D.', rating: 4, comment: 'Very professional and friendly.' },
  { id: '4', reviewer: 'Zanele K.', rating: 5, comment: 'Highly recommended!' },
   { id: '5', reviewer: 'Lerato M.', rating: 5, comment: 'Excellent job on short notice!' },
  { id: '6', reviewer: 'Sipho D.', rating: 4, comment: 'Very professional and friendly.' },
  { id: '7', reviewer: 'Zanele K.', rating: 5, comment: 'Highly recommended!' },
   { id: '8', reviewer: 'Lerato M.', rating: 5, comment: 'Excellent job on short notice!' },
  { id: '9', reviewer: 'Sipho D.', rating: 4, comment: "It looks like you're encountering some dependency warnings when running yarn install for your React Native/Expo project. These warnings are generally not critical, but it's good to address them for better long-term maintenance. Here's how to handle them" },
  { id: '10', reviewer: 'Zanele K.', rating: 5, comment: 'Highly recommended!' },
];

// Service options with icons
export const serviceOptions = [
  { id: '1', name: 'Plumbing', icon: 'plumbing' },
  { id: '2', name: 'Electrical', icon: 'electrical-services' },
  { id: '3', name: 'Tutoring', icon: 'school' },
  { id: '4', name: 'Cleaning', icon: 'cleaning-services' },
  { id: '5', name: 'Gardening', icon: 'yard' },
  { id: '6', name: 'Beauty', icon: 'content-cut' },
  { id: '7', name: 'Transport', icon: 'directions-car' },
  { id: '8', name: 'Cooking', icon: 'restaurant' },
  { id: '9', name: 'Other', icon: 'add-circle-outline' }
];

export const userData = {
    id: '4',
    name: 'Jay Anderson',
    imageUrl: 'https://api.a0.dev/assets/image?text=TM&aspect=1:1',
    location: 'Ext 4, Emalahleni, Mpumalanga',
    rating: 4.7,
    reviews: 23,
    joinDate: 'Joined August 2023',
    verified: true,
    completedJobs: 48,
    requestsMade: 12,
    loggedIn: false,
    services: [
      { id: '1', name: 'Electrical', description: 'Residential electrical repairs', price: 'R150-R300/hr', icon: 'electrical-services' },
      { id: '2', name: 'Plumbing', description: 'Water system repairs', price: 'R180-R250/hr', icon: 'plumbing' }
    ],
    requests: [
      { id: '1', title: 'Fix leaking tap', status: 'active', date: '2 days ago', responses: 4 },
      { id: '2', title: 'Garden cleanup', status: 'pending', date: '5 days ago', responses: 1 },
      { id: '3', title: 'Math tutoring', status: 'completed', date: '2 weeks ago', provider: 'Sarah K.' }
    ],
    portfolio: [
      { id: '1', title: 'Kitchen Renovation', imageUrl: 'https://api.a0.dev/assets/image?text=Kitchen&aspect=16:9' },
      { id: '2', title: 'Bathroom Plumbing', imageUrl: 'https://api.a0.dev/assets/image?text=Bathroom&aspect=16:9' }
    ],
    qualifications: ['National Certificate: Electrical Engineering', 'Plumbing Service Certificate'],
    status: ''
  }

  //PROFILE SCREEN END ===================================



  //NOTIFICATION SCREEN START-----------------------------
export const notifications = [
    {
      id: '1',
      type: 'message',
      title: 'New message from John',
      description: 'Hi there! I would like to discuss the plumbing job...',
      time: '2 min ago',
      read: false,
      image: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      id: '2',
      type: 'booking',
      title: 'Booking confirmed',
      description: 'Your electrical service has been booked for tomorrow at 2pm',
      time: '1 hour ago',
      read: true,
      image: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    {
      id: '3',
      type: 'payment',
      title: 'Payment received',
      description: 'R1,200 has been deposited to your account',
      time: '3 hours ago',
      read: true,
      icon: 'cash'
    },
    {
      id: '4',
      type: 'review',
      title: 'New review',
      description: 'Sarah gave you 5 stars for your plumbing work',
      time: '1 day ago',
      read: true,
      icon: 'star'
    },
    {
      id: '5',
      type: 'system',
      title: 'App update available',
      description: 'Update to version 2.1.0 for new features',
      time: '2 days ago',
      read: false,
      icon: 'alert-circle'
    },
  ];
  //NOTIFICATION SCREEN END ==============================