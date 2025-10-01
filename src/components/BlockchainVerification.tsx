
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Shield, CheckCircle, XCircle, AlertTriangle, FileText, Award, Users, Building, Search, Upload } from 'lucide-react';

const BlockchainVerification = () => {
  const [verificationId, setVerificationId] = useState('');
  const [searchResults, setSearchResults] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const sampleVerification = {
    id: 'BLK-2024-001234',
    type: 'degree',
    student: 'Rahul Kumar',
    institution: 'ABC Institute of Technology',
    degree: 'Bachelor of Technology (Computer Science)',
    issueDate: '2024-06-15',
    blockchainHash: '0x4f3c2a1b9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0',
    status: 'verified',
    verificationScore: 98,
    authorities: ['UGC', 'AICTE', 'State Government']
  };

  const verificationHistory = [
    { id: 'BLK-2024-001234', type: 'Degree Certificate', entity: 'ABC Institute', status: 'verified', date: '2024-01-15' },
    { id: 'BLK-2024-001233', type: 'Faculty Credential', entity: 'Dr. Priya Sharma', status: 'verified', date: '2024-01-14' },
    { id: 'BLK-2024-001232', type: 'Accreditation Record', entity: 'XYZ University', status: 'pending', date: '2024-01-13' },
    { id: 'BLK-2024-001231', type: 'Research Publication', entity: 'IEEE Journal', status: 'verified', date: '2024-01-12' },
    { id: 'BLK-2024-001230', type: 'Degree Certificate', entity: 'PQR College', status: 'flagged', date: '2024-01-11' }
  ];

  const institutions = [
    { name: 'ABC Institute of Technology', verified: true, credentials: 1247, riskScore: 2 },
    { name: 'XYZ University', verified: true, credentials: 2156, riskScore: 1 },
    { name: 'PQR College', verified: false, credentials: 89, riskScore: 8 },
    { name: 'DEF Institute', verified: true, credentials: 567, riskScore: 3 }
  ];

  const handleVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setSearchResults(sampleVerification);
      setIsVerifying(false);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-500 text-white';
      case 'pending': return 'bg-yellow-500 text-white';
      case 'flagged': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <AlertTriangle className="h-4 w-4" />;
      case 'flagged': return <XCircle className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const getRiskColor = (score: number) => {
    if (score <= 3) return 'text-green-600';
    if (score <= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Blockchain Verification System</h1>
          <p className="text-gray-600">High-authority verification for degrees, credentials, and institutional records</p>
        </div>

        <Tabs defaultValue="verify" className="space-y-6">
          <TabsList>
            <TabsTrigger value="verify">Verify Credentials</TabsTrigger>
            <TabsTrigger value="upload">Upload Document</TabsTrigger>
            <TabsTrigger value="institutions">Institution Registry</TabsTrigger>
            <TabsTrigger value="history">Verification History</TabsTrigger>
          </TabsList>

          <TabsContent value="verify" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  Credential Verification
                </CardTitle>
                <CardDescription>
                  Enter document ID, Aadhaar number, or blockchain hash to verify credentials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <Input
                    placeholder="Enter verification ID (e.g., BLK-2024-001234)"
                    value={verificationId}
                    onChange={(e) => setVerificationId(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleVerification} disabled={isVerifying || !verificationId}>
                    {isVerifying ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Verify
                      </>
                    )}
                  </Button>
                </div>

                {searchResults && (
                  <div className="space-y-6">
                    <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-8 w-8 text-green-600" />
                          <div>
                            <h3 className="text-lg font-semibold text-green-900">Verification Successful</h3>
                            <p className="text-green-700">Document authenticated on blockchain</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">{searchResults.verificationScore}%</div>
                          <div className="text-sm text-green-600">Trust Score</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-3">Document Details</h4>
                          <div className="space-y-2 text-sm">
                            <div><strong>Student:</strong> {searchResults.student}</div>
                            <div><strong>Institution:</strong> {searchResults.institution}</div>
                            <div><strong>Degree:</strong> {searchResults.degree}</div>
                            <div><strong>Issue Date:</strong> {searchResults.issueDate}</div>
                            <div><strong>Document ID:</strong> {searchResults.id}</div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">Blockchain Information</h4>
                          <div className="space-y-2 text-sm">
                            <div><strong>Hash:</strong> <code className="text-xs bg-gray-100 p-1 rounded">{searchResults.blockchainHash.substring(0, 20)}...</code></div>
                            <div><strong>Status:</strong> 
                              <Badge className="ml-2 bg-green-500 text-white">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            </div>
                            <div className="pt-2">
                              <strong>Verified by:</strong>
                              <div className="flex gap-2 mt-2">
                                {searchResults.authorities.map((auth: string, index: number) => (
                                  <Badge key={index} variant="outline">{auth}</Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Verification Timeline</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium">Document Created</p>
                              <p className="text-sm text-gray-600">Institution uploaded to blockchain</p>
                            </div>
                            <div className="text-sm text-gray-500">{searchResults.issueDate}</div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium">Authority Verification</p>
                              <p className="text-sm text-gray-600">Verified by UGC and AICTE</p>
                            </div>
                            <div className="text-sm text-gray-500">2024-06-16</div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium">Blockchain Confirmation</p>
                              <p className="text-sm text-gray-600">Immutable record created</p>
                            </div>
                            <div className="text-sm text-gray-500">2024-06-16</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-blue-500" />
                  Upload for Verification
                </CardTitle>
                <CardDescription>
                  Upload documents to the blockchain for immutable verification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-700 mb-2">Drop your document here</p>
                    <p className="text-gray-500 mb-4">or click to browse</p>
                    <Button>Choose File</Button>
                    <p className="text-xs text-gray-400 mt-2">Supported: PDF, JPG, PNG (Max 10MB)</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Document Type</h4>
                      <select className="w-full p-2 border rounded-lg">
                        <option>Degree Certificate</option>
                        <option>Faculty Credential</option>
                        <option>Research Publication</option>
                        <option>Accreditation Record</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">Issuing Authority</h4>
                      <Input placeholder="Enter institution/authority name" />
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Blockchain Upload Process</h4>
                    <div className="space-y-2 text-sm text-blue-800">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Document hash generated using SHA-256
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Encrypted and stored on distributed ledger
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Verified by authorized nodes
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Immutable record created
                      </div>
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    Upload to Blockchain
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="institutions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-blue-500" />
                  Institution Registry
                </CardTitle>
                <CardDescription>
                  Verified institutions and their blockchain trust scores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {institutions.map((institution, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Building className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{institution.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={institution.verified ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}>
                              {institution.verified ? 'Verified' : 'Unverified'}
                            </Badge>
                            <span className="text-sm text-gray-600">
                              {institution.credentials} credentials issued
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${getRiskColor(institution.riskScore)}`}>
                          Risk: {institution.riskScore}/10
                        </div>
                        <Progress value={(10 - institution.riskScore) * 10} className="w-24 mt-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  Recent Verifications
                </CardTitle>
                <CardDescription>
                  Latest blockchain verification activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {verificationHistory.map((record, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(record.status)}
                        <div>
                          <h3 className="font-medium">{record.type}</h3>
                          <p className="text-sm text-gray-600">{record.entity}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge className={getStatusColor(record.status)}>
                          {record.status}
                        </Badge>
                        <div className="text-sm text-gray-500">{record.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BlockchainVerification;
