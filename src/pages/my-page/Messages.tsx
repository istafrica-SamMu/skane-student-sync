import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
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
  Settings,
  FileText,
  Image,
  Archive,
  Bell,
  Shield,
  Palette,
  Users,
  Mail,
  Plus,
  Eye,
  Clock,
  UserCheck
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Messages = () => {
  const [messageText, setMessageText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [selectedConversationId, setSelectedConversationId] = useState(1);
  const [showNewMessageDialog, setShowNewMessageDialog] = useState(false);
  const [showMessageTrackingDialog, setShowMessageTrackingDialog] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  // New message form state
  const [newMessage, setNewMessage] = useState({
    recipient: "",
    recipientType: "individual", // individual, principal, role
    subject: "",
    content: "",
    sendToEmail: false,
    attachments: [] as File[]
  });

  // Message tracking data
  const [sentMessages] = useState([
    {
      id: 1,
      subject: "System Maintenance Notification",
      recipients: ["All Users"],
      sentDate: "2024-01-15 14:30",
      deliveredCount: 45,
      readCount: 32,
      emailSent: true
    },
    {
      id: 2,
      subject: "New Feature Announcement",
      recipients: ["Regional Administrators"],
      sentDate: "2024-01-10 09:15",
      deliveredCount: 8,
      readCount: 6,
      emailSent: false
    }
  ]);

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
      conversationId: 1,
      text: "Hello! I hope you're doing well. I wanted to inform you about the upcoming system maintenance scheduled for January 20th.",
      sender: "System Administrator",
      timestamp: "10:28",
      isOwn: false,
      status: "read"
    },
    {
      id: 2,
      conversationId: 1,
      text: "The maintenance will occur from 2:00 AM to 4:00 AM. During this time, the system will be temporarily unavailable.",
      sender: "System Administrator", 
      timestamp: "10:29",
      isOwn: false,
      status: "read"
    },
    {
      id: 3,
      conversationId: 1,
      text: "Thank you for the notification. Will there be any data backup procedures in place?",
      timestamp: "10:35",
      isOwn: true,
      status: "delivered"
    },
    {
      id: 4,
      conversationId: 1,
      text: "Yes, absolutely! All data will be automatically backed up before the maintenance begins. No action is required from your end.",
      sender: "System Administrator",
      timestamp: "10:37",
      isOwn: false,
      status: "read"
    },
    {
      id: 5,
      conversationId: 2,
      text: "The enrollment period for the next school year begins on February 1st. Please ensure all documentation is ready.",
      sender: "Regional Office",
      timestamp: "15:40",
      isOwn: false,
      status: "read"
    },
    {
      id: 6,
      conversationId: 2,
      text: "We'll need to coordinate with all participating schools for the enrollment process.",
      sender: "Regional Office",
      timestamp: "15:42",
      isOwn: false,
      status: "read"
    },
    {
      id: 7,
      conversationId: 2,
      text: "I'll prepare the necessary documents and coordinate with the schools. When is the deadline for submissions?",
      timestamp: "15:45",
      isOwn: true,
      status: "delivered"
    },
    {
      id: 8,
      conversationId: 3,
      text: "Please review and validate student data for the upcoming semester. The validation deadline is approaching.",
      sender: "Data Management Team",
      timestamp: "09:10",
      isOwn: false,
      status: "read"
    },
    {
      id: 9,
      conversationId: 3,
      text: "We need to ensure all student records are accurate before the semester begins.",
      sender: "Data Management Team",
      timestamp: "09:12",
      isOwn: false,
      status: "read"
    },
    {
      id: 10,
      conversationId: 3,
      text: "I'll start the validation process today. How many records need to be reviewed?",
      timestamp: "09:15",
      isOwn: true,
      status: "delivered"
    }
  ];

  const selectedConversation = conversations.find(conv => conv.id === selectedConversationId) || conversations[0];
  const currentMessages = messages.filter(msg => msg.conversationId === selectedConversationId);

  const isSystemAdmin = user?.role === 'devadmin' || user?.role === 'regional-admin';

  const recipientOptions = [
    { value: "individual", label: "Individual User" },
    { value: "principal", label: "Users by Principal" },
    { value: "role", label: "Users by Role" },
    { value: "all", label: "All Users" }
  ];

  const principalOptions = [
    { value: "principal-1", label: "Malmö Elementary School" },
    { value: "principal-2", label: "Lund High School" },
    { value: "principal-3", label: "Helsingborg Middle School" }
  ];

  const roleOptions = [
    { value: "regional-admin", label: "Regional Administrators" },
    { value: "municipality-admin", label: "Municipality Administrators" },
    { value: "school-admin", label: "School Administrators" },
    { value: "orgadmin", label: "Organization Administrators" }
  ];

  const handleConversationClick = (conversationId: number) => {
    setSelectedConversationId(conversationId);
  };

  const handleCall = (type: "phone" | "video") => {
    toast({
      title: `${type === "phone" ? "Phone" : "Video"} call initiated`,
      description: `Connecting to ${selectedConversation.name}...`,
    });
  };

  const handleFileAttach = (type: string) => {
    toast({
      title: "File attached",
      description: `${type} attachment ready to send`,
    });
  };

  const handleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      toast({
        title: "Recording saved",
        description: "Voice message is ready to send",
      });
    } else {
      setIsRecording(true);
      toast({
        title: "Recording started",
        description: "Speak your message now",
      });
    }
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      toast({
        title: "Message sent",
        description: "Your message has been delivered",
      });
      setMessageText("");
    }
  };

  const handleSendNewMessage = () => {
    if (!newMessage.subject.trim() || !newMessage.content.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in both subject and message content.",
        variant: "destructive"
      });
      return;
    }

    let recipientDescription = "";
    switch (newMessage.recipientType) {
      case "individual":
        recipientDescription = "selected user";
        break;
      case "principal":
        recipientDescription = principalOptions.find(p => p.value === newMessage.recipient)?.label || "selected principal";
        break;
      case "role":
        recipientDescription = roleOptions.find(r => r.value === newMessage.recipient)?.label || "selected role";
        break;
      case "all":
        recipientDescription = "all users";
        break;
    }

    toast({
      title: "Message Sent Successfully",
      description: `Message sent to ${recipientDescription}${newMessage.sendToEmail ? ' (including email)' : ''}`,
    });

    setShowNewMessageDialog(false);
    setNewMessage({
      recipient: "",
      recipientType: "individual",
      subject: "",
      content: "",
      sendToEmail: false,
      attachments: []
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setNewMessage(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
    toast({
      title: "Files attached",
      description: `${files.length} file(s) attached to message`,
    });
  };

  return (
    <div className="h-[calc(100vh-120px)] flex bg-ike-neutral-light">
      {/* Left Sidebar - Conversations List */}
      <div className="w-1/3 border-r border-ike-neutral-light bg-white">
        {/* Header */}
        <div className="p-4 border-b border-ike-neutral-light bg-ike-primary text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Messages</h2>
            
            <div className="flex items-center space-x-2">
              {/* New Message for System Admins */}
              {isSystemAdmin && (
                <Dialog open={showNewMessageDialog} onOpenChange={setShowNewMessageDialog}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-ike-primary-dark">
                      <Plus className="w-4 h-4 mr-1" />
                      New
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        Send New Message
                      </DialogTitle>
                      <DialogDescription>
                        Send a message to individual users or groups within the system
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="recipientType">Recipient Type</Label>
                          <Select 
                            value={newMessage.recipientType} 
                            onValueChange={(value) => setNewMessage(prev => ({...prev, recipientType: value, recipient: ""}))}
                          >
                            <SelectTrigger className="border-ike-primary/20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {recipientOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {newMessage.recipientType === "principal" && (
                          <div>
                            <Label htmlFor="principal">Select Principal</Label>
                            <Select 
                              value={newMessage.recipient} 
                              onValueChange={(value) => setNewMessage(prev => ({...prev, recipient: value}))}
                            >
                              <SelectTrigger className="border-ike-primary/20">
                                <SelectValue placeholder="Choose principal" />
                              </SelectTrigger>
                              <SelectContent>
                                {principalOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        {newMessage.recipientType === "role" && (
                          <div>
                            <Label htmlFor="role">Select Role</Label>
                            <Select 
                              value={newMessage.recipient} 
                              onValueChange={(value) => setNewMessage(prev => ({...prev, recipient: value}))}
                            >
                              <SelectTrigger className="border-ike-primary/20">
                                <SelectValue placeholder="Choose role" />
                              </SelectTrigger>
                              <SelectContent>
                                {roleOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        {newMessage.recipientType === "individual" && (
                          <div>
                            <Label htmlFor="individual">Search User</Label>
                            <Input
                              placeholder="Type to search users..."
                              value={newMessage.recipient}
                              onChange={(e) => setNewMessage(prev => ({...prev, recipient: e.target.value}))}
                              className="border-ike-primary/20 focus:border-ike-primary"
                            />
                          </div>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          placeholder="Enter message subject"
                          value={newMessage.subject}
                          onChange={(e) => setNewMessage(prev => ({...prev, subject: e.target.value}))}
                          className="border-ike-primary/20 focus:border-ike-primary"
                        />
                      </div>

                      <div>
                        <Label htmlFor="content">Message Content *</Label>
                        <Textarea
                          id="content"
                          placeholder="Enter your message..."
                          rows={4}
                          value={newMessage.content}
                          onChange={(e) => setNewMessage(prev => ({...prev, content: e.target.value}))}
                          className="border-ike-primary/20 focus:border-ike-primary"
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="sendToEmail"
                          checked={newMessage.sendToEmail}
                          onCheckedChange={(checked) => setNewMessage(prev => ({...prev, sendToEmail: !!checked}))}
                        />
                        <Label htmlFor="sendToEmail" className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Also send to recipients' email addresses
                        </Label>
                      </div>

                      <div>
                        <Label htmlFor="attachments">Attachments</Label>
                        <Input
                          id="attachments"
                          type="file"
                          multiple
                          onChange={handleFileUpload}
                          className="border-ike-primary/20 focus:border-ike-primary"
                        />
                        {newMessage.attachments.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {newMessage.attachments.map((file, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {file.name}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button onClick={handleSendNewMessage} className="bg-ike-primary hover:bg-ike-primary-dark text-white">
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}

              {/* Message Tracking for System Admins */}
              {isSystemAdmin && (
                <Dialog open={showMessageTrackingDialog} onOpenChange={setShowMessageTrackingDialog}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-ike-primary-dark">
                      <Eye className="w-4 h-4 mr-1" />
                      Track
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[800px]">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Eye className="w-5 h-5" />
                        Message Tracking
                      </DialogTitle>
                      <DialogDescription>
                        View delivery status and read receipts for sent messages
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      {sentMessages.map((message) => (
                        <Card key={message.id} className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold text-ike-neutral-dark">{message.subject}</h4>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className="text-xs">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {message.sentDate}
                                </Badge>
                                {message.emailSent && (
                                  <Badge className="bg-ike-primary text-white text-xs">
                                    <Mail className="w-3 h-3 mr-1" />
                                    Email Sent
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-4 text-sm text-ike-neutral">
                              <span>Recipients: {message.recipients.join(", ")}</span>
                            </div>
                            
                            <div className="flex items-center space-x-6">
                              <div className="flex items-center space-x-2">
                                <CheckCheck className="w-4 h-4 text-ike-success" />
                                <span className="text-sm">Delivered: {message.deliveredCount}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <UserCheck className="w-4 h-4 text-ike-primary" />
                                <span className="text-sm">Read: {message.readCount}</span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}

              {/* Settings Modal */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-ike-primary-dark">
                    <Settings className="w-5 h-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Message Settings
                    </DialogTitle>
                    <DialogDescription>
                      Configure your messaging preferences and notifications
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6 py-4">
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold flex items-center gap-2">
                        <Bell className="w-4 h-4" />
                        Notifications
                      </h4>
                      <div className="space-y-3 pl-6">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked className="rounded" />
                          <span className="text-sm">Desktop notifications</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked className="rounded" />
                          <span className="text-sm">Email notifications</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">Sound alerts</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Privacy
                      </h4>
                      <div className="space-y-3 pl-6">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked className="rounded" />
                          <span className="text-sm">Show online status</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked className="rounded" />
                          <span className="text-sm">Read receipts</span>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold flex items-center gap-2">
                        <Palette className="w-4 h-4" />
                        Appearance
                      </h4>
                      <div className="space-y-3 pl-6">
                        <div>
                          <label className="text-sm font-medium">Theme</label>
                          <select className="w-full mt-1 p-2 border rounded-md">
                            <option>Light</option>
                            <option>Dark</option>
                            <option>Auto</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={() => toast({ title: "Settings saved", description: "Your preferences have been updated" })}>
                      Save Changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
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
                conversation.id === selectedConversationId ? 'bg-ike-primary/5 border-l-4 border-l-ike-primary' : ''
              }`}
              onClick={() => handleConversationClick(conversation.id)}
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
            {/* Phone Call Modal */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Phone className="w-5 h-5 text-ike-neutral" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Start Phone Call
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to start a phone call with {selectedConversation.name}?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleCall("phone")}>
                    Start Call
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* Video Call Modal */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Video className="w-5 h-5 text-ike-neutral" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2">
                    <Video className="w-5 h-5" />
                    Start Video Call
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to start a video call with {selectedConversation.name}?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleCall("video")}>
                    Start Call
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* More Options Modal */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-5 h-5 text-ike-neutral" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[300px]">
                <DialogHeader>
                  <DialogTitle>Conversation Options</DialogTitle>
                </DialogHeader>
                <div className="space-y-2 py-4">
                  <Button variant="ghost" className="w-full justify-start" onClick={() => toast({ title: "Conversation archived" })}>
                    <Archive className="w-4 h-4 mr-2" />
                    Archive Conversation
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => toast({ title: "Notifications muted" })}>
                    <Bell className="w-4 h-4 mr-2" />
                    Mute Notifications
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-red-600" onClick={() => toast({ title: "Conversation cleared" })}>
                    <Archive className="w-4 h-4 mr-2" />
                    Clear History
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4 bg-gradient-to-b from-ike-neutral-light/30 to-ike-neutral-light/10">
          <div className="space-y-4">
            {currentMessages.map((message) => (
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
            {/* File Attachment Modal */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-ike-neutral hover:text-ike-primary">
                  <Paperclip className="w-5 h-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Paperclip className="w-5 h-5" />
                    Attach File
                  </DialogTitle>
                  <DialogDescription>
                    Choose the type of file you want to attach
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2"
                    onClick={() => handleFileAttach("Document")}
                  >
                    <FileText className="w-8 h-8" />
                    Document
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2"
                    onClick={() => handleFileAttach("Image")}
                  >
                    <Image className="w-8 h-8" />
                    Image
                  </Button>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <div className="flex-1">
              <Textarea
                placeholder="Type a message..."
                className="min-h-0 resize-none border-ike-neutral/20 focus:border-ike-primary"
                rows={1}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
            </div>

            {/* Voice Recording Modal */}
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`text-ike-neutral hover:text-ike-primary ${isRecording ? 'text-red-500' : ''}`}
                >
                  <Mic className="w-5 h-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Mic className="w-5 h-5" />
                    Voice Message
                  </DialogTitle>
                  <DialogDescription>
                    Record a voice message to send
                  </DialogDescription>
                </DialogHeader>
                <div className="py-8 text-center">
                  <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
                    isRecording ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-ike-primary/10 text-ike-primary'
                  }`}>
                    <Mic className="w-8 h-8" />
                  </div>
                  <p className="text-sm text-ike-neutral mb-4">
                    {isRecording ? 'Recording... Tap to stop' : 'Tap to start recording'}
                  </p>
                  <Button 
                    onClick={handleRecording}
                    className={isRecording ? 'bg-red-500 hover:bg-red-600' : ''}
                  >
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                  </Button>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button 
              className="bg-ike-primary hover:bg-ike-primary-dark text-white"
              onClick={handleSendMessage}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
