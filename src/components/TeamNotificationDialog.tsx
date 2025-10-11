
import { useState, useEffect } from "react";
import { X, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export const TeamNotificationDialog = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if notification has been seen
    const hasSeenNotification = sessionStorage.getItem('teamNotificationSeen');
    if (!hasSeenNotification) {
      // Show notification after a brief delay
      setShowNotification(true);
      setTimeout(() => setIsVisible(true), 100);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      sessionStorage.setItem('teamNotificationSeen', 'true');
      setShowNotification(false);
    }, 300);
  };

  if (!showNotification) return null;

  return (
    <div 
      className={`fixed top-20 right-4 z-50 w-96 bg-white rounded-lg shadow-2xl border-2 border-blue-200 transition-all duration-500 ease-out transform ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className="p-6">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="flex items-center justify-center mb-4">
          <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <h3 className="text-center text-xl font-bold mb-2">Team Information</h3>
        <p className="text-center text-sm text-gray-600 mb-4">This project is developed by</p>
        
        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg border-2 border-blue-200">
          <div className="text-center space-y-3">
            <div>
              <p className="text-xs text-gray-600 mb-1">Team Name</p>
              <p className="text-xl font-bold text-blue-800">RE-CONNECT</p>
            </div>
            <div className="pt-2">
              <p className="text-xs text-gray-600 mb-1">Team ID</p>
              <div className="bg-yellow-100 border-2 border-yellow-400 rounded-md px-3 py-2 inline-block">
                <p className="text-xl font-bold text-yellow-800">#99958</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center pt-4">
          <Button onClick={handleClose} className="bg-blue-600 hover:bg-blue-700 px-8">
            OK
          </Button>
        </div>
      </div>
    </div>
  );
};
