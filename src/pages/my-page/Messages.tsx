
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { 
  Send, 
  Search, 
  Phone, 
  Video, 
  MoreVertical,
  Paperclip,
  Mic,
  CheckCheck,
  Check,
  Settings
} from "lucide-react";

const Messages = () => {
  const conversations = [
    {
      id: 1,
      name: "System Administrator",
      avatar: "SA",
      lastMessage: "Scheduled maintenance will occur on January 20th...",
      timestamp: "10:30",
      unreadCount: 2,
      isOnline: true
    },
    {
      id: 2,
      name: "Regional Office",
      avatar: "RO",
      lastMessage: "The enrollment period for the next school year...",
      timestamp: "15:45",
      unreadCount: 0,
      isOnline: false
    },
    {
      id: 3,
      name: "Data Management Team",
      avatar: "DM",
      lastMessage: "Please review and validate student data...",
      timestamp: "09:15",
      unreadCount: 1,
      isOnline: true
    }
  ];

  const messages = [
    {
      id: 1,
      text: "Hello! I hope you're doing well. I wanted to inform you about the upcoming system maintenance scheduled for January 20th.",
      sender: "System Administrator",
      timestamp: "10:28",
      isOwn: false,
      status: "read"
    },
    {
      id: 2,
      text: "The maintenance will occur from 2:00 AM to 4:00 AM. During this time, the system will be temporarily unavailable.",
      sender: "System Administrator", 
      timestamp: "10:29",
      isOwn: false,
      status: "read"
    },
    {
      id: 3,
      text: "Thank you for the notification. Will there be any data backup procedures in place?",
      timestamp: "10:35",
      isOwn: true,
      status: "delivered"
    },
    {
      id: 4,
      text: "Yes, absolutely! All data will be automatically backed up before the maintenance begins. No action is required from your end.",
      sender: "System Administrator",
      timestamp: "10:37",
      isOwn: false,
      status: "read"
    }
  ];

  const selectedConversation = conversations[0];

  return (
    <div className="h-[calc(100vh-120px)] flex bg-ike-neutral-light">
      {/* Left Sidebar - Conversations List */}
      <div className="w-1/3 border-r border-ike-neutral-light bg-white">
        {/* Header */}
        <div className="p-4 border-b border-ike-neutral-light bg-ike-primary text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Messages</h2>
            <Button variant="ghost" size="sm" className="text-white hover:bg-ike-primary-dark">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-ike-neutral-light">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
            <Input
              placeholder="Search conversations..."
              className="pl-10 border-ike-neutral/20 focus:border-ike-primary"
            />
          </div>
        </div>

        {/* Conversations List */}
        <ScrollArea className="flex-1">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-4 border-b border-ike-neutral-light cursor-pointer hover:bg-ike-neutral-light/50 transition-colors ${
                conversation.id === selectedConversation.id ? 'bg-ike-primary/5' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-ike-primary text-white font-medium">
                      {conversation.avatar}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-ike-success rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-ike-neutral-dark truncate">
                      {conversation.name}
                    </h3>
                    <span className="text-xs text-ike-neutral">{conversation.timestamp}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-ike-neutral truncate">
                      {conversation.lastMessage}
                    </p>
                    {conversation.unreadCount > 0 && (
                      <span className="bg-ike-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-2">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Right Side - Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-ike-neutral-light bg-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="" />
              <AvatarFallback className="bg-ike-primary text-white">
                {selectedConversation.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-ike-neutral-dark">{selectedConversation.name}</h3>
              <p className="text-xs text-ike-success">Online</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Phone className="w-5 h-5 text-ike-neutral" />
            </Button>
            <Button variant="ghost" size="sm">
              <Video className="w-5 h-5 text-ike-neutral" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-5 h-5 text-ike-neutral" />
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4 bg-gradient-to-b from-ike-neutral-light/30 to-ike-neutral-light/10">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 shadow-sm ${
                    message.isOwn
                      ? 'bg-ike-primary text-white rounded-br-sm'
                      : 'bg-white text-ike-neutral-dark rounded-bl-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <div className={`flex items-center justify-end mt-2 space-x-1 ${
                    message.isOwn ? 'text-white/70' : 'text-ike-neutral'
                  }`}>
                    <span className="text-xs">{message.timestamp}</span>
                    {message.isOwn && (
                      <div className="flex">
                        {message.status === 'delivered' ? (
                          <CheckCheck className="w-4 h-4" />
                        ) : (
                          <Check className="w-4 h-4" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 border-t border-ike-neutral-light bg-white">
          <div className="flex items-end space-x-3">
            <Button variant="ghost" size="sm" className="text-ike-neutral hover:text-ike-primary">
              <Paperclip className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <Textarea
                placeholder="Type a message..."
                className="min-h-0 resize-none border-ike-neutral/20 focus:border-ike-primary"
                rows={1}
              />
            </div>
            <Button variant="ghost" size="sm" className="text-ike-neutral hover:text-ike-primary">
              <Mic className="w-5 h-5" />
            </Button>
            <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
