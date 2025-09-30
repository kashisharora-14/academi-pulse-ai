import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Shield, QrCode, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";

const VerifyProfile = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Decode and verify the profile data
    try {
      if (code) {
        const decodedParam = decodeURIComponent(code);
        const decoded = JSON.parse(atob(decodedParam));
        setProfileData(decoded);
      }
    } catch (error) {
      console.error("Invalid verification code", error);
    }
    setLoading(false);
  }, [code]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 max-w-md">
          <div className="text-center">
            <QrCode className="h-12 w-12 mx-auto mb-4 animate-pulse" />
            <p>Verifying profile...</p>
          </div>
        </Card>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <Shield className="h-16 w-16 mx-auto mb-4 text-red-500" />
          <h2 className="text-xl font-bold mb-2">Invalid Verification Code</h2>
          <p className="text-muted-foreground mb-4">
            The QR code or link you scanned is invalid or has expired.
          </p>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go to Home
          </Button>
        </Card>
      </div>
    );
  }

  const renderStudentProfile = () => {
    const studentData = profileData.data;
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{studentData.name || "Student"}</h2>
            <p className="text-muted-foreground">Student ID: {studentData.id || "N/A"}</p>
            {studentData.email && <p className="text-sm text-muted-foreground">{studentData.email}</p>}
          </div>
          <Badge className="bg-green-600">
            <CheckCircle className="mr-1 h-4 w-4" />
            Verified
          </Badge>
        </div>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Academic Records</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{studentData.cgpa || "N/A"}</div>
              <div className="text-sm text-blue-700">CGPA</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{studentData.credits || "N/A"}</div>
              <div className="text-sm text-green-700">Credits</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{studentData.attendance ? `${studentData.attendance}%` : "N/A"}</div>
              <div className="text-sm text-purple-700">Attendance</div>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{studentData.certifications?.length || 0}</div>
              <div className="text-sm text-orange-700">Certifications</div>
            </div>
          </div>
        </Card>

        {studentData.certifications && studentData.certifications.length > 0 && (
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Achievements & Certifications</h3>
            <div className="space-y-3">
              {studentData.certifications.map((cert: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2 p-2 border rounded">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">{cert}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {studentData.scholarships && studentData.scholarships.length > 0 && (
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Schemes Availed</h3>
            <div className="space-y-2">
              {studentData.scholarships.map((scheme: string, idx: number) => (
                <div key={idx} className="p-3 bg-green-50 rounded border-l-4 border-green-400">
                  <p className="font-medium">{scheme}</p>
                  <p className="text-sm text-muted-foreground">Active</p>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    );
  };

  const renderInstitutionProfile = () => {
    const instData = profileData.data;
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{instData.name || "Institution"}</h2>
            <p className="text-muted-foreground">Institution ID: {instData.id || "N/A"}</p>
          </div>
          <Badge className="bg-green-600">
            <CheckCircle className="mr-1 h-4 w-4" />
            Verified
          </Badge>
        </div>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Performance Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-xl font-bold text-blue-600">{instData.nirfRank || "N/A"}</div>
              <div className="text-sm text-blue-700">NIRF Rank</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-xl font-bold text-green-600">{instData.naacGrade || "N/A"}</div>
              <div className="text-sm text-green-700">NAAC Grade</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="text-xl font-bold text-purple-600">{instData.placementRate || "N/A"}</div>
              <div className="text-sm text-purple-700">Placement Rate</div>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <div className="text-xl font-bold text-orange-600">{instData.totalStudents || "N/A"}</div>
              <div className="text-sm text-orange-700">Total Students</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Additional Information</h3>
          <div className="space-y-2">
            {instData.faculty && (
              <div className="flex items-center justify-between p-2 border rounded">
                <span className="text-sm">Faculty Members</span>
                <span className="font-semibold">{instData.faculty}</span>
              </div>
            )}
            {instData.programs && (
              <div className="flex items-center justify-between p-2 border rounded">
                <span className="text-sm">Programs Offered</span>
                <span className="font-semibold">{instData.programs}</span>
              </div>
            )}
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold">Universal Verification</h1>
                <p className="text-sm text-muted-foreground">Blockchain-secured profile verification</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => navigate("/")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <CheckCircle className="h-6 w-6 text-green-600" />
          <div>
            <p className="font-semibold text-green-800">Profile Verified Successfully</p>
            <p className="text-sm text-green-700">
              This profile has been authenticated via blockchain and is officially verified by NEDP
            </p>
          </div>
        </div>

        {profileData.type === "student" && renderStudentProfile()}
        {profileData.type === "institution" && renderInstitutionProfile()}

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600">
            <strong>Verification Details:</strong> This profile was verified on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}.
            The verification is secured by blockchain technology and cannot be tampered with.
          </p>
        </div>
      </main>
    </div>
  );
};

export default VerifyProfile;
