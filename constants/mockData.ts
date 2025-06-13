//MessagesScreen
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