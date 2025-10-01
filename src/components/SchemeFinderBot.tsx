
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Send, Bot, User, CheckCircle, XCircle, Bell } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  schemes?: SchemeRecommendation[];
}

interface SchemeRecommendation {
  name: string;
  eligible: boolean;
  amount: string;
  requirements: string[];
  deadline: string;
  applicationLink: string;
}

const SchemeFinderBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your Education Scheme Assistant. I can help you find scholarships, check eligibility, and provide information about dropout statistics. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const sampleSchemes: SchemeRecommendation[] = [
    {
      name: 'PM-USHA Scholarship',
      eligible: true,
      amount: '₹50,000/year',
      requirements: ['Female student', 'Rural background', 'Family income < ₹8 lakh'],
      deadline: '31st March 2024',
      applicationLink: '#'
    },
    {
      name: 'Merit Scholarship',
      eligible: true,
      amount: '₹25,000/year',
      requirements: ['Minimum 85% marks', 'State domicile'],
      deadline: '15th April 2024',
      applicationLink: '#'
    },
    {
      name: 'SC/ST National Scholarship',
      eligible: false,
      amount: '₹30,000/year',
      requirements: ['SC/ST category', 'Family income < ₹2.5 lakh'],
      deadline: '30th April 2024',
      applicationLink: '#'
    }
  ];

  const processMessage = (message: string): { content: string; schemes?: SchemeRecommendation[] } => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('mca') && lowerMessage.includes('punjab')) {
      return {
        content: 'Based on your query about MCA eligibility in Punjab University, here are the scholarships you may be eligible for:',
        schemes: sampleSchemes
      };
    }
    
    if (lowerMessage.includes('dropout') && lowerMessage.includes('statistics')) {
      return {
        content: 'Here are the latest dropout statistics:\n\n📊 National Average: 12.8%\n📊 Punjab: 11.2%\n📊 Rural Areas: 16.4%\n📊 Female Students: 14.1%\n\nRegions with highest dropout rates:\n• Bihar East: 24.5%\n• Jharkhand Mining Belt: 21.3%\n• Odisha Tribal Areas: 19.8%\n\nWould you like information about intervention programs?'
      };
    }
    
    if (lowerMessage.includes('scholarship') || lowerMessage.includes('scheme')) {
      return {
        content: 'I can help you find scholarships! Please provide:\n• Your course (e.g., B.Tech, MCA, MBA)\n• State/University\n• Category (if applicable)\n• Family income range\n\nOr ask me something like: "Am I eligible for PM Scholarship if I\'m an MCA student in Punjab University?"',
        schemes: sampleSchemes
      };
    }
    
    if (lowerMessage.includes('eligible') || lowerMessage.includes('eligibility')) {
      return {
        content: 'To check your eligibility, I need some information. Here are scholarships based on common criteria:',
        schemes: sampleSchemes
      };
    }

    if (lowerMessage.includes('digital') && lowerMessage.includes('portfolio')) {
      return {
        content: 'Digital Portfolio features:\n\n📄 Auto-generated from your academic records\n🏆 Showcases achievements, projects, certifications\n📊 Tracks skill development over time\n🔗 Shareable with employers and institutions\n📱 Mobile-friendly format\n\nWould you like to create your digital portfolio?'
      };
    }
    
    return {
      content: 'I can help you with:\n• Finding scholarships and schemes\n• Checking eligibility criteria\n• Dropout statistics by region\n• Institution-wise information\n• Digital portfolio creation\n\nWhat specific information do you need?'
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const response = processMessage(inputMessage);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response.content,
        timestamp: new Date(),
        schemes: response.schemes
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Scheme Finder Assistant</h1>
          <p className="text-gray-600">AI-powered chatbot for scholarships, schemes, and education insights</p>
        </div>

        <Card className="h-[600px] flex flex-col">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-blue-500" />
              Education Scheme Assistant
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] ${message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100'} rounded-lg p-3`}>
                      <div className="flex items-start gap-2 mb-2">
                        {message.type === 'bot' ? (
                          <Bot className="h-4 w-4 mt-1 text-blue-500" />
                        ) : (
                          <User className="h-4 w-4 mt-1" />
                        )}
                        <div className="flex-1">
                          <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                          
                          {message.schemes && (
                            <div className="mt-4 space-y-3">
                              {message.schemes.map((scheme, index) => (
                                <div key={index} className="bg-white rounded-lg p-4 border">
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-medium text-gray-900">{scheme.name}</h4>
                                    <div className="flex items-center gap-2">
                                      {scheme.eligible ? (
                                        <Badge className="bg-green-100 text-green-800">
                                          <CheckCircle className="h-3 w-3 mr-1" />
                                          Eligible
                                        </Badge>
                                      ) : (
                                        <Badge className="bg-red-100 text-red-800">
                                          <XCircle className="h-3 w-3 mr-1" />
                                          Not Eligible
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                  
                                  <div className="text-sm text-gray-600 mb-2">
                                    <strong>Amount:</strong> {scheme.amount}
                                  </div>
                                  
                                  <div className="text-sm text-gray-600 mb-2">
                                    <strong>Requirements:</strong>
                                    <ul className="list-disc list-inside ml-2 mt-1">
                                      {scheme.requirements.map((req, reqIndex) => (
                                        <li key={reqIndex}>{req}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  
                                  <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-600">
                                      <Bell className="h-3 w-3 inline mr-1" />
                                      Deadline: {scheme.deadline}
                                    </div>
                                    {scheme.eligible && (
                                      <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                                        Apply Now
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                      <div className="flex items-center gap-2">
                        <Bot className="h-4 w-4 text-blue-500" />
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            <div className="flex gap-2 mt-4">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about scholarships, eligibility, or dropout statistics..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isTyping}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="mt-2 text-xs text-gray-500">
              Try asking: "Am I eligible for PM Scholarship as an MCA student?" or "Show dropout statistics for Punjab"
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SchemeFinderBot;
