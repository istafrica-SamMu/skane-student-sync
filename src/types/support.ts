
export interface SupportDocument {
  id: string;
  title: string;
  description: string;
  fileName: string;
  fileUrl: string;
  category: 'user-guide' | 'technical' | 'policy' | 'other';
  uploadDate: string;
  uploadedBy: string;
  fileSize: string;
}

export interface SupportVideo {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl?: string;
  category: 'tutorial' | 'overview' | 'feature-demo' | 'troubleshooting';
  duration: string;
  uploadDate: string;
  uploadedBy: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'technical' | 'account' | 'permissions' | 'data';
  isPublished: boolean;
  createdDate: string;
  updatedDate: string;
  createdBy: string;
}
