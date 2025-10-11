
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

export const TeamNotificationDialog = () => {
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    // Show dialog on initial load
    const hasSeenNotification = sessionStorage.getItem('teamNotificationSeen');
    if (!hasSeenNotification) {
      setShowDialog(true);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem('teamNotificationSeen', 'true');
    setShowDialog(false);
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <DialogTitle className="text-center text-xl">Team Information</DialogTitle>
          <DialogDescription className="text-center text-base pt-2">
            This project is developed by
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border-2 border-blue-200 w-full">
            <div className="text-center space-y-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">Team Name</p>
                <p className="text-2xl font-bold text-blue-800">RE-CONNECT</p>
              </div>
              <div className="pt-2">
                <p className="text-sm text-gray-600 mb-1">Team ID</p>
                <div className="bg-yellow-100 border-2 border-yellow-400 rounded-md px-4 py-2 inline-block">
                  <p className="text-2xl font-bold text-yellow-800">#99958</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center pt-2">
          <Button onClick={handleClose} className="bg-blue-600 hover:bg-blue-700 px-8">
            OK
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
