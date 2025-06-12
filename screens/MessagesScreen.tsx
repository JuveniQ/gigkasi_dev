import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  FlatList,
  Image,
  TextInput
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

// Mock data for conversations
const conversations = [
  {
    id: '1',
    name: 'John M.',
    service: 'Plumber',
    lastMessage: 'I can come fix your sink at 2pm tomorrow. Does that work for you?',
    time: '10 min ago',
    unread: 2,
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
    unread: 0,
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
    unread: 0,
    imageUrl: 'https://api.a0.dev/assets/image?text=Thandi%20M.%20Cleaner&aspect=1:1',
    messages: []
  },
  {
    id: '5',
    name: 'Sipho Z.',
    service: 'Gardener',
    lastMessage: 'Your garden is looking much better now. I\'ve planted those flowers you wanted.',
    time: 'Last week',
    unread: 0,
    imageUrl: 'https://api.a0.dev/assets/image?text=Sipho%20Z.%20Gardener&aspect=1:1',
    messages: []
  }
];

export default function MessagesScreen() {
  const navigation = useNavigation();
  const [activeChat, setActiveChat] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [currentConversation, setCurrentConversation] = useState(null);
  
  const handleChatPress = (conversation) => {
    setActiveChat(conversation.id);
    setCurrentConversation(conversation);
  };
  
  const handleSendMessage = () => {
    if (messageText.trim() === '') return;
    
    // In a real app, this would send the message to an API
    // Here we're just simulating the UI behavior
    setMessageText('');
  };
  
  const handleBackPress = () => {
    setActiveChat(null);
    setCurrentConversation(null);
  };
  
  // Render chat list when no active chat
  if (!activeChat) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Messages</Text>
        </View>
        
        {/* Search bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search conversations..."
              placeholderTextColor="#999"
            />
          </View>
        </View>
        
        {/* Conversations list */}
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.conversationItem}
              onPress={() => handleChatPress(item)}
            >
              <Image source={{ uri: item.imageUrl }} style={styles.avatar} />
              {item.unread > 0 && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadText}>{item.unread}</Text>
                </View>
              )}
              <View style={styles.conversationContent}>
                <View style={styles.conversationHeader}>
                  <Text style={styles.conversationName}>{item.name}</Text>
                  <Text style={styles.conversationTime}>{item.time}</Text>
                </View>
                <Text style={styles.conversationService}>{item.service}</Text>
                <Text 
                  style={[styles.conversationMessage, item.unread > 0 && styles.unreadMessage]} 
                  numberOfLines={1}
                >
                  {item.lastMessage}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContent}
        />
        
        {/* Empty state */}
        {conversations.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="chatbubble-ellipses-outline" size={60} color="#CCCCCC" />
            <Text style={styles.emptyStateTitle}>No messages yet</Text>
            <Text style={styles.emptyStateText}>
              Your conversations with service providers will appear here
            </Text>
          </View>
        )}
      </SafeAreaView>
    );
  }
  
  // Render active chat
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Chat header */}
      <View style={styles.chatHeader}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Image source={{ uri: currentConversation.imageUrl }} style={styles.chatAvatar} />
        <View style={styles.chatHeaderInfo}>
          <Text style={styles.chatHeaderName}>{currentConversation.name}</Text>
          <Text style={styles.chatHeaderService}>{currentConversation.service}</Text>
        </View>
        <TouchableOpacity style={styles.callButton}>
          <Ionicons name="call" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      {/* Messages */}
      <FlatList
        data={currentConversation.messages}
        keyExtractor={(item) => item.id}
        inverted={false}
        contentContainerStyle={styles.messagesContainer}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.sent ? styles.sentMessage : styles.receivedMessage]}>
            <View style={[styles.messageBubble, item.sent ? styles.sentBubble : styles.receivedBubble]}>
              <Text style={[styles.messageText, item.sent ? styles.sentText : styles.receivedText]}>
                {item.text}
              </Text>
            </View>
            <Text style={styles.messageTime}>{item.time}</Text>
          </View>
        )}
      />
      
      {/* Message input */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachButton}>
          <Ionicons name="attach" size={24} color="#666" />
        </TouchableOpacity>
        <TextInput
          style={styles.messageInput}
          placeholder="Type a message..."
          value={messageText}
          onChangeText={setMessageText}
          multiline
        />
        <TouchableOpacity 
          style={[styles.sendButton, !messageText.trim() && styles.disabledSendButton]}
          onPress={handleSendMessage}
          disabled={!messageText.trim()}
        >
          <Ionicons name="send" size={20} color={messageText.trim() ? "#FFFFFF" : "#AAAAAA"} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    backgroundColor: colors.headerColor,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.searchBgColor,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  searchBar: {
    height: 40,
    backgroundColor: '#F5F7FA',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 15,
  },
  listContent: {
    paddingVertical: 8,
  },
  conversationItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    position: 'relative',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  unreadBadge: {
    position: 'absolute',
    top: 12,
    left: 45,
    backgroundColor: '#2196F3',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  conversationName: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  conversationTime: {
    fontSize: 12,
    color: '#999',
  },
  conversationService: {
    fontSize: 12,
    color: 'green',
    marginBottom: 4,
  },
  conversationMessage: {
    fontSize: 14,
    color: '#666',
  },
  unreadMessage: {
    fontWeight: 'bold',
    color: '#333',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  // Chat screen styles
  chatHeader: {
    backgroundColor: colors.headerColor,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
  },
  chatAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  chatHeaderInfo: {
    flex: 1,
  },
  chatHeaderName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  chatHeaderService: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.8,
  },
  callButton: {
    padding: 8,
  },
  messagesContainer: {
    flexGrow: 1,
    padding: 16,
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  sentMessage: {
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 18,
    marginBottom: 2,
  },
  sentBubble: {
    backgroundColor: colors.categoryColor,
    borderBottomRightRadius: 4,
  },
  receivedBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  sentText: {
    color: '#FFFFFF',
  },
  receivedText: {
    color: '#333333',
  },
  messageTime: {
    fontSize: 11,
    color: '#999',
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  attachButton: {
    padding: 8,
  },
  messageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    backgroundColor: '#F5F7FA',
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: colors.buttonColor,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledSendButton: {
    backgroundColor: '#EEEEEE',
  },
});