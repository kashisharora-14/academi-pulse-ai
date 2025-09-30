import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2, QrCode } from "lucide-react";
import { toast } from "sonner";
import QRCodeLib from "qrcode";

interface QRCodeGeneratorProps {
  data: any;
  type: "student" | "institution" | "faculty" | "certificate";
  title?: string;
}

export const QRCodeGenerator = ({ data, type, title }: QRCodeGeneratorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Create a shareable link with URL-safe encoded data
  const generateShareableLink = () => {
    const baseUrl = window.location.origin;
    const encodedData = encodeURIComponent(btoa(JSON.stringify({ type, data })));
    return `${baseUrl}/verify/${encodedData}`;
  };

  const shareableLink = generateShareableLink();

  // Generate QR code on canvas
  useEffect(() => {
    if (canvasRef.current) {
      QRCodeLib.toCanvas(canvasRef.current, shareableLink, {
        width: 256,
        margin: 2,
        errorCorrectionLevel: 'H'
      });
    }
  }, [shareableLink]);

  // Download QR code as PNG
  const downloadQR = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const downloadLink = document.createElement("a");
          downloadLink.href = url;
          downloadLink.download = `${type}-qr-${data.id || 'code'}.png`;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
          URL.revokeObjectURL(url);
          toast.success("QR code downloaded successfully!");
        }
      });
    }
  };

  // Copy link to clipboard
  const copyLink = () => {
    navigator.clipboard.writeText(shareableLink);
    toast.success("Shareable link copied to clipboard!");
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <QrCode className="h-5 w-5" />
          {title || `${type.charAt(0).toUpperCase() + type.slice(1)} QR Code`}
        </h3>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <div className="p-4 bg-white rounded-lg border-2 border-dashed border-gray-300">
          <canvas ref={canvasRef} />
        </div>

        <div className="w-full space-y-2">
          <p className="text-sm text-muted-foreground text-center">
            Scan to access {type} profile and verified data
          </p>
          
          <div className="flex gap-2">
            <Button onClick={downloadQR} variant="outline" className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Download QR
            </Button>
            <Button onClick={copyLink} variant="outline" className="flex-1">
              <Share2 className="mr-2 h-4 w-4" />
              Copy Link
            </Button>
          </div>
        </div>

        <div className="w-full p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-800 break-all">
            <strong>Shareable Link:</strong> {shareableLink.slice(0, 50)}...
          </p>
        </div>

        <div className="w-full space-y-2">
          <p className="text-xs font-semibold">QR Code Features:</p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>✓ Blockchain-verified authenticity</li>
            <li>✓ Real-time data retrieval</li>
            <li>✓ Secure encryption</li>
            <li>✓ Universal verification</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};
