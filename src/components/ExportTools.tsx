import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Download, Share2, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

interface ExportToolsProps {
  data: any;
  title: string;
  type: "student" | "institution" | "faculty" | "report";
}

export const ExportTools = ({ data, title, type }: ExportToolsProps) => {
  
  // Export as PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text(title, 14, 22);
    
    // Add metadata
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 32);
    doc.text(`Type: ${type.toUpperCase()}`, 14, 38);
    
    // Add data table
    if (type === "student") {
      autoTable(doc, {
        startY: 45,
        head: [['Field', 'Value']],
        body: [
          ['Name', data.name || 'N/A'],
          ['ID', data.id || 'N/A'],
          ['Email', data.email || 'N/A'],
          ['CGPA', data.cgpa || 'N/A'],
          ['Credits', data.credits || 'N/A'],
          ['Attendance', data.attendance || 'N/A'],
          ['Scholarships', data.scholarships?.length || '0'],
          ['Certifications', data.certifications?.length || '0'],
        ],
      });
    } else if (type === "institution") {
      autoTable(doc, {
        startY: 45,
        head: [['Metric', 'Value']],
        body: [
          ['Institution Name', data.name || 'N/A'],
          ['Total Students', data.totalStudents || 'N/A'],
          ['Faculty Members', data.faculty || 'N/A'],
          ['NIRF Rank', data.nirfRank || 'N/A'],
          ['NAAC Grade', data.naacGrade || 'N/A'],
          ['Placement Rate', data.placementRate || 'N/A'],
        ],
      });
    } else if (type === "faculty") {
      autoTable(doc, {
        startY: 45,
        head: [['Field', 'Value']],
        body: [
          ['Name', data.name || 'N/A'],
          ['ID', data.id || 'N/A'],
          ['Department', data.department || 'N/A'],
          ['Designation', data.designation || 'N/A'],
          ['APAR Rating', data.aparRating || 'N/A'],
          ['Publications', data.publications || 'N/A'],
          ['Students', data.students || 'N/A'],
          ['Avg Rating', data.avgRating || 'N/A'],
        ],
      });
    } else if (type === "report") {
      autoTable(doc, {
        startY: 45,
        head: [['Metric', 'Value']],
        body: [
          ['Platform Name', data.name || 'N/A'],
          ['Total Students', data.totalStudents || 'N/A'],
          ['Total Institutions', data.totalInstitutions || 'N/A'],
          ['Active Schemes', data.activeSchemes || 'N/A'],
          ['Budget Utilized', data.budgetUtilized || 'N/A'],
          ['Faculty Records', data.facultyRecords || 'N/A'],
          ['System Uptime', data.systemUptime + '%' || 'N/A'],
        ],
      });
    }
    
    // Save PDF
    doc.save(`${title.replace(/\s+/g, '-').toLowerCase()}.pdf`);
    toast.success("PDF exported successfully!");
  };

  // Export as Excel
  const exportToExcel = () => {
    let worksheetData: any[][] = [];
    
    if (type === "student") {
      worksheetData = [
        ['Field', 'Value'],
        ['Name', data.name || 'N/A'],
        ['ID', data.id || 'N/A'],
        ['Email', data.email || 'N/A'],
        ['CGPA', data.cgpa || 'N/A'],
        ['Credits', data.credits || 'N/A'],
        ['Attendance', data.attendance || 'N/A'],
        ['Scholarships', data.scholarships?.length || '0'],
        ['Certifications', data.certifications?.length || '0'],
      ];
    } else if (type === "institution") {
      worksheetData = [
        ['Metric', 'Value'],
        ['Institution Name', data.name || 'N/A'],
        ['Total Students', data.totalStudents || 'N/A'],
        ['Faculty Members', data.faculty || 'N/A'],
        ['NIRF Rank', data.nirfRank || 'N/A'],
        ['NAAC Grade', data.naacGrade || 'N/A'],
        ['Placement Rate', data.placementRate || 'N/A'],
      ];
    } else if (type === "faculty") {
      worksheetData = [
        ['Field', 'Value'],
        ['Name', data.name || 'N/A'],
        ['ID', data.id || 'N/A'],
        ['Department', data.department || 'N/A'],
        ['Designation', data.designation || 'N/A'],
        ['APAR Rating', data.aparRating || 'N/A'],
        ['Publications', data.publications || 'N/A'],
        ['Students', data.students || 'N/A'],
        ['Avg Rating', data.avgRating || 'N/A'],
      ];
    } else if (type === "report") {
      worksheetData = [
        ['Metric', 'Value'],
        ['Platform Name', data.name || 'N/A'],
        ['Total Students', data.totalStudents || 'N/A'],
        ['Total Institutions', data.totalInstitutions || 'N/A'],
        ['Active Schemes', data.activeSchemes || 'N/A'],
        ['Budget Utilized', data.budgetUtilized || 'N/A'],
        ['Faculty Records', data.facultyRecords || 'N/A'],
        ['System Uptime', data.systemUptime + '%' || 'N/A'],
      ];
    }
    
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    
    XLSX.writeFile(workbook, `${title.replace(/\s+/g, '-').toLowerCase()}.xlsx`);
    toast.success("Excel file exported successfully!");
  };

  // Generate shareable link with URL-safe encoding
  const generateShareableLink = () => {
    const baseUrl = window.location.origin;
    const encodedData = encodeURIComponent(btoa(JSON.stringify({ type, data })));
    const link = `${baseUrl}/shared/${encodedData}`;
    
    navigator.clipboard.writeText(link);
    toast.success("Shareable link copied to clipboard!");
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold mb-4">One-Click Export & Share</h3>
      
      <div className="grid gap-3">
        <Button onClick={exportToPDF} variant="outline" className="w-full justify-start">
          <FileText className="mr-2 h-4 w-4" />
          Export as PDF (Digital Transcript)
        </Button>
        
        <Button onClick={exportToExcel} variant="outline" className="w-full justify-start">
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Export as Excel (Raw Data)
        </Button>
        
        <Button onClick={generateShareableLink} variant="outline" className="w-full justify-start">
          <Share2 className="mr-2 h-4 w-4" />
          Generate Shareable Link
        </Button>
        
        <Button onClick={exportToPDF} variant="default" className="w-full justify-start">
          <Download className="mr-2 h-4 w-4" />
          Download All Documents
        </Button>
      </div>

      <div className="mt-4 p-3 bg-green-50 rounded-lg">
        <p className="text-xs text-green-800">
          <strong>Auto-generated digital transcripts</strong> include QR authentication for instant verification by employers and universities.
        </p>
      </div>
    </Card>
  );
};
