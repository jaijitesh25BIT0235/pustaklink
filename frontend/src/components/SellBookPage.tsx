import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, BookOpen, DollarSign, Tag } from 'lucide-react';

interface SellBookPageProps {
  userData: {
    name: string;
    college: string;
    phone: string;
    email: string;
  };
  onBack: () => void;
  onBookPosted: () => void;
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
  'Medicine'
];

export function SellBookPage({ userData, onBack, onBookPosted }: SellBookPageProps) {
  const [formData, setFormData] = useState({
    subject: '',
    bookName: '',
    author: '',
    mrp: '',
    condition: ''
  });

  const salePrice = formData.mrp ? Math.round(parseFloat(formData.mrp) * 0.4) : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.subject && formData.bookName && formData.author && formData.mrp && formData.condition) {
      // Here you would typically save the book data
      alert('Book posted successfully!');
      onBookPosted();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Sell Your Book
          </h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">List Your Book</CardTitle>
            <p className="text-gray-600">Fill in the details to post your book for sale</p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
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

              <div className="space-y-2">
                <Label htmlFor="bookName">Book Name</Label>
                <Input
                  id="bookName"
                  name="bookName"
                  type="text"
                  placeholder="Enter the complete book title"
                  value={formData.bookName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Author Name</Label>
                <Input
                  id="author"
                  name="author"
                  type="text"
                  placeholder="Enter author's name"
                  value={formData.author}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mrp">MRP (₹)</Label>
                  <Input
                    id="mrp"
                    name="mrp"
                    type="number"
                    placeholder="Original price"
                    value={formData.mrp}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Sale Price (₹)</Label>
                  <div className="flex items-center h-10 px-3 py-2 border border-gray-200 rounded-md bg-gray-50">
                    <DollarSign className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-green-600">{salePrice || '0'}</span>
                    <span className="text-xs text-gray-500 ml-2">(40% of MRP)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="condition">Book Condition</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, condition: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent - Like new</SelectItem>
                    <SelectItem value="good">Good - Minor wear</SelectItem>
                    <SelectItem value="fair">Fair - Some highlighting/notes</SelectItem>
                    <SelectItem value="poor">Poor - Heavy wear but readable</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm mb-2">Listing Summary</h3>
                <div className="text-xs text-gray-600 space-y-1">
                  <p><strong>Seller:</strong> {userData.name}</p>
                  <p><strong>College:</strong> {userData.college}</p>
                  <p><strong>Contact:</strong> {userData.phone}</p>
                  {formData.subject && <p><strong>Subject:</strong> {formData.subject}</p>}
                  {salePrice > 0 && <p><strong>Price:</strong> ₹{salePrice}</p>}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="button" variant="outline" onClick={onBack} className="flex-1">
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  disabled={!formData.subject || !formData.bookName || !formData.author || !formData.mrp || !formData.condition}
                >
                  <Tag className="w-4 h-4 mr-2" />
                  Post Book
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}