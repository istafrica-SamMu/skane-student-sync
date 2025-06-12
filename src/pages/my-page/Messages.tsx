
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, Clock, User, CheckCircle } from "lucide-react";

const Messages = () => {
  const messages = [
    {
      id: 1,
      subject: "System Maintenance Notification",
      sender: "System Administrator",
      timestamp: "2024-01-15 10:30",
      status: "unread",
      priority: "high",
      content: "Scheduled maintenance will occur on January 20th from 2:00 AM to 4:00 AM."
    },
    {
      id: 2,
      subject: "New Enrollment Period Opens",
      sender: "Regional Office",
      timestamp: "2024-01-14 15:45",
      status: "read",
      priority: "medium",
      content: "The enrollment period for the next school year will open on February 1st."
    },
    {
      id: 3,
      subject: "Data Validation Required",
      sender: "Data Management Team",
      timestamp: "2024-01-13 09:15",
      status: "unread",
      priority: "medium",
      content: "Please review and validate student data for your municipality by January 25th."
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-ike-primary">Messages</h1>
        <p className="text-ike-neutral-dark mt-2">
          View and manage your system messages and notifications
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="bg-ike-primary/10 text-ike-primary">
            {messages.filter(m => m.status === 'unread').length} Unread
          </Badge>
          <Badge variant="outline">
            {messages.length} Total
          </Badge>
        </div>
        <Button className="bg-ike-primary hover:bg-ike-primary/90">
          <MessageSquare className="w-4 h-4 mr-2" />
          Compose Message
        </Button>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <Card key={message.id} className={`transition-all hover:shadow-md ${
            message.status === 'unread' ? 'border-ike-primary/30 bg-ike-primary/5' : ''
          }`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <CardTitle className="text-lg">{message.subject}</CardTitle>
                    {message.status === 'unread' && (
                      <Badge className="bg-ike-primary text-white text-xs">New</Badge>
                    )}
                    {message.status === 'read' && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-ike-neutral">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{message.sender}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{message.timestamp}</span>
                    </div>
                    <Badge 
                      variant={message.priority === 'high' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {message.priority}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-3">
              <CardDescription className="text-base">
                {message.content}
              </CardDescription>
              <div className="flex space-x-2 mt-4">
                <Button variant="outline" size="sm">
                  Reply
                </Button>
                <Button variant="ghost" size="sm">
                  Forward
                </Button>
                {message.status === 'unread' && (
                  <Button variant="ghost" size="sm">
                    Mark as Read
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Messages;
