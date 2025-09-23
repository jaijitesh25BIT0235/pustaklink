import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, BookOpenCheck, Calendar, Share2, Heart, Clock } from 'lucide-react';
import { Book } from './BookCard';

interface LendBookPageProps {
  userData: {
    name: string;
    college: string;
    phone: string;
    email: string;
  };
  onBack: () => void;
  onBookPosted: (book: Book) => void;
}

const subjects = [
  'Computer Science',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Economics',
  'History',
  'English Literature',
  'Psychology',
  'Business Studies',
  'Engineering',
  'Medicine',
  'Data Science',
  'Electronics',
  'Mechanical Engineering',
  'Civil Engineering'
];

export function LendBookPage({ userData, onBack, onBookPosted }: LendBookPageProps) {
  const [formData, setFormData] = useState({
    subject: '',
    bookName: '',
    author: '',
    condition: '',
    borrowDuration: '14'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.subject && formData.bookName && formData.author && formData.condition && formData.borrowDuration) {
      const newBook: Book = {
        id: Math.random().toString(36).substr(2, 9),
        title: formData.bookName,
        author: formData.author,
        subject: formData.subject,
        condition: formData.condition,
        lenderName: userData.name,
        lenderCollege: userData.college,
        lenderPhone: userData.phone,
        borrowDuration: parseInt(formData.borrowDuration)
      };
      
      alert('Book listed successfully for free sharing!');
      onBookPosted(newBook);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} className="p-2 hover:bg-slate-100">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
              <BookOpenCheck className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
              Share Your Book
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="border border-slate-200/60 bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <BookOpenCheck className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-3xl tracking-tight text-slate-900">Share Your Academic Book</CardTitle>
                <p className="text-slate-600 text-lg leading-relaxed">Help fellow VIT students by sharing your books for free</p>
              </CardHeader>
              
              <CardContent className="px-8 pb-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="subject" className="text-slate-700">Academic Subject</Label>
                      <Select onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}>
                        <SelectTrigger className="h-12 border-slate-300 focus:border-emerald-500">
                          <SelectValue placeholder="Select subject area" />
                        </SelectTrigger>
                        <SelectContent>
                          {subjects.map(subject => (
                            <SelectItem key={subject} value={subject}>
                              {subject}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="condition" className="text-slate-700">Book Condition</Label>
                      <Select onValueChange={(value) => setFormData(prev => ({ ...prev, condition: value }))}>
                        <SelectTrigger className="h-12 border-slate-300 focus:border-emerald-500">
                          <SelectValue placeholder="Condition assessment" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent - Like new condition</SelectItem>
                          <SelectItem value="good">Good - Minor wear, fully readable</SelectItem>
                          <SelectItem value="fair">Fair - Some highlighting/notes</SelectItem>
                          <SelectItem value="poor">Poor - Heavy wear but usable</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="bookName" className="text-slate-700">Complete Book Title</Label>
                    <Input
                      id="bookName"
                      name="bookName"
                      type="text"
                      placeholder="Enter the full title including edition if applicable"
                      value={formData.bookName}
                      onChange={handleChange}
                      className="h-12 border-slate-300 focus:border-emerald-500"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="author" className="text-slate-700">Author(s)</Label>
                    <Input
                      id="author"
                      name="author"
                      type="text"
                      placeholder="Primary author name(s)"
                      value={formData.author}
                      onChange={handleChange}
                      className="h-12 border-slate-300 focus:border-emerald-500"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="borrowDuration" className="text-slate-700">Sharing Duration (Days)</Label>
                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, borrowDuration: value }))}>
                      <SelectTrigger className="h-12 border-slate-300 focus:border-emerald-500">
                        <SelectValue placeholder="How long can students borrow?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 days - Short term</SelectItem>
                        <SelectItem value="14">14 days - Standard (Recommended)</SelectItem>
                        <SelectItem value="21">21 days - Extended</SelectItem>
                        <SelectItem value="30">30 days - Long term</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <Button type="button" variant="outline" onClick={onBack} className="flex-1 h-12 border-slate-300">
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="flex-1 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                      disabled={!formData.subject || !formData.bookName || !formData.author || !formData.condition || !formData.borrowDuration}
                    >
                      <Share2 className="w-5 h-5 mr-2" />
                      Share Book Freely
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            {/* Sharing Details */}
            <Card className="border border-emerald-200/60 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-emerald-800 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Community Sharing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white/70 rounded-lg p-4 border border-emerald-200/40">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-emerald-700">Sharing Duration</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-emerald-600" />
                    </div>
                  </div>
                  <div className="text-2xl text-emerald-800">{formData.borrowDuration || '14'} days</div>
                  <div className="text-xs text-emerald-600 mt-1">Free community access</div>
                </div>
                
                <div className="bg-white/70 rounded-lg p-4 border border-emerald-200/40">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm text-emerald-700">Community Impact</span>
                  </div>
                  <div className="text-lg text-emerald-800">100% Free</div>
                  <div className="text-xs text-emerald-600 mt-1">Helping fellow students learn</div>
                </div>
              </CardContent>
            </Card>

            {/* Lender Info */}
            <Card className="border border-slate-200/60 bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-slate-800">Your Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Name:</span>
                  <span className="text-slate-800">{userData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Institution:</span>
                  <span className="text-slate-800">{userData.college}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Contact:</span>
                  <span className="text-slate-800">{userData.phone}</span>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <span className="text-xs text-slate-500">{userData.email}</span>
                </div>
              </CardContent>
            </Card>

            {/* Community Guidelines */}
            <div className="bg-blue-50 border border-blue-200/60 rounded-lg p-4">
              <h4 className="text-blue-800 mb-3 flex items-center gap-2">
                <BookOpenCheck className="w-4 h-4" />
                Sharing Guidelines
              </h4>
              <ul className="text-sm text-blue-700 space-y-2">
                <li>• Books are shared completely free</li>
                <li>• Be responsive to borrowing requests</li>
                <li>• Include accurate condition details</li>
                <li>• Support our academic community</li>
                <li>• Arrange convenient pickup times</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}