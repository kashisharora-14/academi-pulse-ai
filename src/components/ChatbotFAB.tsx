
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { X, MessageCircle, Bot, ExternalLink } from 'lucide-react';

const ChatbotFAB = () => {
  const [isOpen, setIsOpen] = useState(false);

  const quickActions = [
    { title: 'Find Scholarships', desc: 'Check your eligibility for available schemes' },
    { title: 'Dropout Statistics', desc: 'View regional dropout data and trends' },
    { title: 'Institution Info', desc: 'Get details about colleges and universities' },
    { title: 'Digital Portfolio', desc: 'Create your automated portfolio' }
  ];

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="h-14 w-14 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg"
            size="lg"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        )}
      </div>

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80">
          <Card className="shadow-xl">
            <CardHeader className="bg-blue-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Bot className="h-5 w-5" />
                  Scheme Assistant
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-blue-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-3">
                  Hi! I can help you with scholarships, education data, and more. What would you like to know?
                </p>
                
                <div className="space-y-2">
                  {quickActions.map((action, index) => (
                    <div
                      key={index}
                      className="p-2 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => {
                        // Navigate to appropriate dashboard with chat functionality
                        if (action.title === 'Find Scholarships') {
                          window.location.href = '/student#chat';
                        } else if (action.title === 'Dropout Statistics' || action.title === 'Institution Info') {
                          window.location.href = '/admin#analytics';
                        } else {
                          window.location.href = '/student';
                        }
                      }}
                    >
                      <div className="font-medium text-sm">{action.title}</div>
                      <div className="text-xs text-gray-500">{action.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  className="flex-1" 
                  onClick={() => window.location.href = '/chatbot'}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Full Chat
                </Button>
              </div>
              
              <div className="mt-3 text-center">
                <Badge variant="outline" className="text-xs">
                  Powered by AI
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default ChatbotFAB;
