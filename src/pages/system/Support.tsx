
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  HelpCircle, 
  FileText, 
  Video, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Download,
  Play,
  Eye,
  EyeOff
} from "lucide-react";
import { SupportDocument, SupportVideo, FAQ } from "@/types/support";

const Support = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddDocument, setShowAddDocument] = useState(false);
  const [showAddVideo, setShowAddVideo] = useState(false);
  const [showAddFAQ, setShowAddFAQ] = useState(false);

  // Mock data - in real implementation this would come from backend
  const [documents, setDocuments] = useState<SupportDocument[]>([
    {
      id: "1",
      title: "User Manual v2.1",
      description: "Complete user manual for the IKE system",
      fileName: "ike-user-manual-v2.1.pdf",
      fileUrl: "/documents/user-manual.pdf",
      category: "user-guide",
      uploadDate: "2024-01-15",
      uploadedBy: "System Admin",
      fileSize: "2.4 MB"
    },
    {
      id: "2", 
      title: "Student Data Privacy Policy",
      description: "Guidelines for handling student data according to GDPR",
      fileName: "student-data-privacy.pdf",
      fileUrl: "/documents/privacy-policy.pdf",
      category: "policy",
      uploadDate: "2024-01-10",
      uploadedBy: "Legal Team",
      fileSize: "856 KB"
    }
  ]);

  const [videos, setVideos] = useState<SupportVideo[]>([
    {
      id: "1",
      title: "Getting Started with IKE System",
      description: "Introduction video for new users",
      videoUrl: "https://example.com/video1",
      category: "overview",
      duration: "5:32",
      uploadDate: "2024-01-20",
      uploadedBy: "Training Team"
    },
    {
      id: "2",
      title: "Managing Student Placements",
      description: "Step-by-step guide for student placement management",
      videoUrl: "https://example.com/video2", 
      category: "tutorial",
      duration: "12:45",
      uploadDate: "2024-01-18",
      uploadedBy: "Training Team"
    }
  ]);

  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: "1",
      question: "How do I reset my password?",
      answer: "You can reset your password by clicking the 'Forgot Password' link on the login page and following the instructions sent to your email.",
      category: "account",
      isPublished: true,
      createdDate: "2024-01-15",
      updatedDate: "2024-01-15",
      createdBy: "Support Team"
    },
    {
      id: "2",
      question: "Why can't I see student data from other municipalities?",
      answer: "Access to student data is restricted based on your role and organizational assignment. You can only view data within your authorized scope for privacy and security reasons.",
      category: "permissions",
      isPublished: true,
      createdDate: "2024-01-12",
      updatedDate: "2024-01-12", 
      createdBy: "Support Team"
    }
  ]);

  const [newDocument, setNewDocument] = useState({
    title: "",
    description: "",
    category: "user-guide" as const,
    file: null as File | null
  });

  const [newVideo, setNewVideo] = useState({
    title: "",
    description: "",
    videoUrl: "",
    category: "tutorial" as const,
    duration: ""
  });

  const [newFAQ, setNewFAQ] = useState({
    question: "",
    answer: "",
    category: "general" as const,
    isPublished: true
  });

  const handleAddDocument = () => {
    if (!newDocument.title || !newDocument.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const document: SupportDocument = {
      id: String(documents.length + 1),
      title: newDocument.title,
      description: newDocument.description,
      fileName: newDocument.file?.name || "document.pdf",
      fileUrl: "/documents/" + (newDocument.file?.name || "document.pdf"),
      category: newDocument.category,
      uploadDate: new Date().toISOString().split('T')[0],
      uploadedBy: "Current User",
      fileSize: newDocument.file ? `${(newDocument.file.size / 1024 / 1024).toFixed(1)} MB` : "Unknown"
    };

    setDocuments([...documents, document]);
    setNewDocument({ title: "", description: "", category: "user-guide", file: null });
    setShowAddDocument(false);

    toast({
      title: "Document Added",
      description: "Document has been successfully uploaded.",
    });
  };

  const handleAddVideo = () => {
    if (!newVideo.title || !newVideo.videoUrl) {
      toast({
        title: "Error", 
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const video: SupportVideo = {
      id: String(videos.length + 1),
      title: newVideo.title,
      description: newVideo.description,
      videoUrl: newVideo.videoUrl,
      category: newVideo.category,
      duration: newVideo.duration,
      uploadDate: new Date().toISOString().split('T')[0],
      uploadedBy: "Current User"
    };

    setVideos([...videos, video]);
    setNewVideo({ title: "", description: "", videoUrl: "", category: "tutorial", duration: "" });
    setShowAddVideo(false);

    toast({
      title: "Video Added",
      description: "Video has been successfully added.",
    });
  };

  const handleAddFAQ = () => {
    if (!newFAQ.question || !newFAQ.answer) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.", 
        variant: "destructive",
      });
      return;
    }

    const faq: FAQ = {
      id: String(faqs.length + 1),
      question: newFAQ.question,
      answer: newFAQ.answer,
      category: newFAQ.category,
      isPublished: newFAQ.isPublished,
      createdDate: new Date().toISOString().split('T')[0],
      updatedDate: new Date().toISOString().split('T')[0],
      createdBy: "Current User"
    };

    setFaqs([...faqs, faq]);
    setNewFAQ({ question: "", answer: "", category: "general", isPublished: true });
    setShowAddFAQ(false);

    toast({
      title: "FAQ Added",
      description: "FAQ has been successfully created.",
    });
  };

  const toggleFAQPublished = (id: string) => {
    setFaqs(faqs.map(faq => 
      faq.id === id ? { ...faq, isPublished: !faq.isPublished } : faq
    ));
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'user-guide': 'bg-blue-100 text-blue-800',
      'technical': 'bg-purple-100 text-purple-800', 
      'policy': 'bg-red-100 text-red-800',
      'other': 'bg-gray-100 text-gray-800',
      'tutorial': 'bg-green-100 text-green-800',
      'overview': 'bg-yellow-100 text-yellow-800',
      'feature-demo': 'bg-indigo-100 text-indigo-800',
      'troubleshooting': 'bg-orange-100 text-orange-800',
      'general': 'bg-slate-100 text-slate-800',
      'account': 'bg-cyan-100 text-cyan-800',
      'permissions': 'bg-pink-100 text-pink-800',
      'data': 'bg-emerald-100 text-emerald-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">Support System</h1>
          <p className="text-ike-neutral">Manage support documents, videos, and FAQs</p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
          <Input
            placeholder="Search support content..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="documents" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Video className="w-4 h-4" />
            Videos
          </TabsTrigger>
          <TabsTrigger value="faqs" className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4" />
            FAQs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Support Documents</CardTitle>
                  <CardDescription>
                    Manage user guides, policies, and technical documentation
                  </CardDescription>
                </div>
                <Button onClick={() => setShowAddDocument(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Document
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.filter(doc => 
                  doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  doc.description.toLowerCase().includes(searchTerm.toLowerCase())
                ).map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <FileText className="w-5 h-5 text-ike-primary" />
                        <h3 className="font-medium">{doc.title}</h3>
                        <Badge className={getCategoryColor(doc.category)}>
                          {doc.category.replace('-', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-ike-neutral mb-2">{doc.description}</p>
                      <div className="flex items-center gap-4 text-xs text-ike-neutral">
                        <span>Uploaded: {doc.uploadDate}</span>
                        <span>By: {doc.uploadedBy}</span>
                        <span>Size: {doc.fileSize}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="videos">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Instructional Videos</CardTitle>
                  <CardDescription>
                    Manage tutorial and training videos for users
                  </CardDescription>
                </div>
                <Button onClick={() => setShowAddVideo(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Video
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {videos.filter(video => 
                  video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  video.description.toLowerCase().includes(searchTerm.toLowerCase())
                ).map((video) => (
                  <div key={video.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Video className="w-5 h-5 text-ike-primary" />
                        <h3 className="font-medium">{video.title}</h3>
                        <Badge className={getCategoryColor(video.category)}>
                          {video.category.replace('-', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-ike-neutral mb-2">{video.description}</p>
                      <div className="flex items-center gap-4 text-xs text-ike-neutral">
                        <span>Duration: {video.duration}</span>
                        <span>Uploaded: {video.uploadDate}</span>
                        <span>By: {video.uploadedBy}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faqs">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>
                    Manage common questions and answers for users
                  </CardDescription>
                </div>
                <Button onClick={() => setShowAddFAQ(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add FAQ
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {faqs.filter(faq => 
                  faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
                ).map((faq) => (
                  <div key={faq.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <HelpCircle className="w-5 h-5 text-ike-primary" />
                        <Badge className={getCategoryColor(faq.category)}>
                          {faq.category}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFAQPublished(faq.id)}
                          className="p-1"
                        >
                          {faq.isPublished ? (
                            <Eye className="w-4 h-4 text-green-600" />
                          ) : (
                            <EyeOff className="w-4 h-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <h3 className="font-medium mb-2">{faq.question}</h3>
                    <p className="text-sm text-ike-neutral mb-3">{faq.answer}</p>
                    <div className="flex items-center gap-4 text-xs text-ike-neutral">
                      <span>Created: {faq.createdDate}</span>
                      <span>By: {faq.createdBy}</span>
                      <span>Status: {faq.isPublished ? 'Published' : 'Draft'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Document Dialog */}
      <Dialog open={showAddDocument} onOpenChange={setShowAddDocument}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Support Document</DialogTitle>
            <DialogDescription>
              Upload a new document to help users with the system.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="docTitle" className="text-right">Title</Label>
              <Input
                id="docTitle"
                className="col-span-3"
                value={newDocument.title}
                onChange={(e) => setNewDocument({...newDocument, title: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="docDescription" className="text-right">Description</Label>
              <Textarea
                id="docDescription"
                className="col-span-3"
                value={newDocument.description}
                onChange={(e) => setNewDocument({...newDocument, description: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="docCategory" className="text-right">Category</Label>
              <Select value={newDocument.category} onValueChange={(value: any) => setNewDocument({...newDocument, category: value})}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user-guide">User Guide</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="policy">Policy</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="docFile" className="text-right">File</Label>
              <Input
                id="docFile"
                type="file"
                className="col-span-3"
                onChange={(e) => setNewDocument({...newDocument, file: e.target.files?.[0] || null})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDocument(false)}>Cancel</Button>
            <Button onClick={handleAddDocument}>Add Document</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Video Dialog */}
      <Dialog open={showAddVideo} onOpenChange={setShowAddVideo}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Instructional Video</DialogTitle>
            <DialogDescription>
              Add a new video to help users learn the system.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="videoTitle" className="text-right">Title</Label>
              <Input
                id="videoTitle"
                className="col-span-3"
                value={newVideo.title}
                onChange={(e) => setNewVideo({...newVideo, title: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="videoDescription" className="text-right">Description</Label>
              <Textarea
                id="videoDescription"
                className="col-span-3"
                value={newVideo.description}
                onChange={(e) => setNewVideo({...newVideo, description: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="videoUrl" className="text-right">Video URL</Label>
              <Input
                id="videoUrl"
                className="col-span-3"
                placeholder="https://..."
                value={newVideo.videoUrl}
                onChange={(e) => setNewVideo({...newVideo, videoUrl: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="videoCategory" className="text-right">Category</Label>
              <Select value={newVideo.category} onValueChange={(value: any) => setNewVideo({...newVideo, category: value})}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tutorial">Tutorial</SelectItem>
                  <SelectItem value="overview">Overview</SelectItem>
                  <SelectItem value="feature-demo">Feature Demo</SelectItem>
                  <SelectItem value="troubleshooting">Troubleshooting</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="videoDuration" className="text-right">Duration</Label>
              <Input
                id="videoDuration"
                className="col-span-3"
                placeholder="e.g., 5:32"
                value={newVideo.duration}
                onChange={(e) => setNewVideo({...newVideo, duration: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddVideo(false)}>Cancel</Button>
            <Button onClick={handleAddVideo}>Add Video</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add FAQ Dialog */}
      <Dialog open={showAddFAQ} onOpenChange={setShowAddFAQ}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add FAQ</DialogTitle>
            <DialogDescription>
              Create a new frequently asked question and answer.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="faqQuestion" className="text-right">Question</Label>
              <Textarea
                id="faqQuestion"
                className="col-span-3"
                value={newFAQ.question}
                onChange={(e) => setNewFAQ({...newFAQ, question: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="faqAnswer" className="text-right">Answer</Label>
              <Textarea
                id="faqAnswer"
                className="col-span-3"
                rows={4}
                value={newFAQ.answer}
                onChange={(e) => setNewFAQ({...newFAQ, answer: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="faqCategory" className="text-right">Category</Label>
              <Select value={newFAQ.category} onValueChange={(value: any) => setNewFAQ({...newFAQ, category: value})}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="account">Account</SelectItem>
                  <SelectItem value="permissions">Permissions</SelectItem>
                  <SelectItem value="data">Data</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddFAQ(false)}>Cancel</Button>
            <Button onClick={handleAddFAQ}>Add FAQ</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Support;
