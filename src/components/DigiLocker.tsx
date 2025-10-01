import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  Download, 
  Trash2, 
  Eye,
  Shield,
  CheckCircle,
  AlertCircle,
  FolderOpen,
  Search,
  Filter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Document {
  id: number;
  file_name: string;
  category_id: number;
  file_size: number;
  file_type: string;
  is_verified: boolean;
  uploaded_at: string;
  tags: string[];
}

interface Category {
  id: number;
  name: string;
  icon: string;
  description: string;
}

interface DigiLockerProps {
  userEmail: string;
  planType?: string;
}

export const DigiLocker = ({ userEmail, planType = 'free' }: DigiLockerProps) => {
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [storageUsed, setStorageUsed] = useState(0);
  const [documentCount, setDocumentCount] = useState(0);
  const [uploading, setUploading] = useState(false);

  const storageLimits = {
    free: 2,
    basic: 10,
    premium: 50,
    enterprise: 500
  };

  const documentLimits = {
    free: 10,
    basic: 50,
    premium: 500,
    enterprise: -1 // unlimited
  };

  const storageLimit = storageLimits[planType as keyof typeof storageLimits] || 2;
  const documentLimit = documentLimits[planType as keyof typeof documentLimits] || 10;
  const storagePercentage = (storageUsed / (storageLimit * 1024)) * 100;

  useEffect(() => {
    loadCategories();
    loadDocuments();
    loadStorageUsage();
  }, [userEmail]);

  const loadCategories = async () => {
    // Mock categories - in production, fetch from database
    setCategories([
      { id: 1, name: 'Academic', icon: 'GraduationCap', description: 'Degrees, certificates' },
      { id: 2, name: 'Identity', icon: 'IdCard', description: 'ID documents' },
      { id: 3, name: 'Certificates', icon: 'Award', description: 'Achievement certificates' },
      { id: 4, name: 'Reports', icon: 'FileText', description: 'Report cards' },
      { id: 5, name: 'Financial', icon: 'DollarSign', description: 'Receipts' },
      { id: 6, name: 'Personal', icon: 'User', description: 'Personal docs' },
      { id: 7, name: 'Other', icon: 'Folder', description: 'Miscellaneous' },
    ]);
  };

  const loadDocuments = async () => {
    // Mock documents - in production, fetch from database
    setDocuments([]);
    setDocumentCount(0);
  };

  const loadStorageUsage = async () => {
    // Mock storage - in production, fetch from database
    setStorageUsed(0);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (documentCount >= documentLimit && documentLimit !== -1) {
      toast({
        title: "Document Limit Reached",
        description: `Your ${planType} plan allows up to ${documentLimit} documents. Upgrade to add more.`,
        variant: "destructive",
      });
      return;
    }

    const file = files[0];
    const fileSizeMB = file.size / (1024 * 1024);

    if (storageUsed + fileSizeMB > storageLimit * 1024) {
      toast({
        title: "Storage Limit Exceeded",
        description: `Upgrade your plan to get more storage.`,
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // In production, upload to Supabase Storage and save metadata to database
      // For now, simulate upload
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "Document Uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });

      loadDocuments();
      loadStorageUsage();
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to upload document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteDocument = async (docId: number) => {
    try {
      // In production, delete from Supabase Storage and database
      toast({
        title: "Document Deleted",
        description: "Document removed successfully.",
      });
      loadDocuments();
      loadStorageUsage();
    } catch (error) {
      toast({
        title: "Delete Failed",
        description: "Failed to delete document.",
        variant: "destructive",
      });
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = selectedCategory === 'all' || doc.category_id === parseInt(selectedCategory);
    const matchesSearch = doc.file_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Storage Usage Card */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Storage Usage</h3>
            <p className="text-sm text-muted-foreground">
              {formatBytes(storageUsed * 1024 * 1024)} of {storageLimit} GB used
            </p>
          </div>
          <Badge variant={planType === 'free' ? 'secondary' : 'default'} className="capitalize">
            {planType} Plan
          </Badge>
        </div>
        <Progress value={storagePercentage} className="mb-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{documentCount} {documentLimit === -1 ? '' : `/ ${documentLimit}`} documents</span>
          {storagePercentage > 80 && (
            <span className="text-yellow-600 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              Running low on storage
            </span>
          )}
        </div>
      </Card>

      {/* Upload Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Upload Documents</h3>
          <Shield className="h-5 w-5 text-green-600" />
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="category">Document Category</Label>
            <Select defaultValue="1">
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat.id} value={cat.id.toString()}>
                    {cat.name} - {cat.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="file-upload">Choose File</Label>
            <div className="mt-2 flex items-center gap-2">
              <Input
                id="file-upload"
                type="file"
                onChange={handleFileUpload}
                disabled={uploading}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                className="flex-1"
              />
              <Button disabled={uploading}>
                <Upload className="w-4 h-4 mr-2" />
                {uploading ? 'Uploading...' : 'Upload'}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Supported: PDF, JPG, PNG, DOC, DOCX (Max 50MB per file)
            </p>
          </div>
        </div>
      </Card>

      {/* Filter and Search */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="w-full md:w-64">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat.id} value={cat.id.toString()}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Documents List */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">My Documents</h3>
        
        {filteredDocuments.length === 0 ? (
          <Card className="p-12 text-center">
            <FolderOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h4 className="text-lg font-semibold mb-2">No Documents Yet</h4>
            <p className="text-muted-foreground mb-4">
              Upload your first document to get started with DigiLocker
            </p>
            <Button>
              <Upload className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
          </Card>
        ) : (
          filteredDocuments.map((doc) => (
            <Card key={doc.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <FileText className="h-10 w-10 text-blue-600" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium truncate">{doc.file_name}</p>
                      {doc.is_verified && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span>{formatBytes(doc.file_size)}</span>
                      <span>{new Date(doc.uploaded_at).toLocaleDateString()}</span>
                      <span className="capitalize">{doc.file_type}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDeleteDocument(doc.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
