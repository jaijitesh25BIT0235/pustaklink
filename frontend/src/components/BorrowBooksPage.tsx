import React, { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, Filter, Search, BookOpen } from 'lucide-react';
import { BookCard, Book } from './BookCard';

interface BorrowBooksPageProps {
  userData: {
    name: string;
    college: string;
    phone: string;
    email: string;
  };
  onBack: () => void;
  onBorrowNow: (book: Book) => void;
  onAddToWishlist: (book: Book) => void;
  wishlist: Book[];
}

// Mock data for academic book sharing - completely free
const mockBooks: Book[] = [
  {
    id: '1',
    title: 'Introduction to Algorithms (4th Edition)',
    author: 'Thomas H. Cormen, Charles E. Leiserson',
    subject: 'Computer Science',
    condition: 'excellent',
    lenderName: 'Rahul Sharma',
    lenderCollege: 'VIT Vellore',
    lenderPhone: '+91 98765 43210',
    borrowDuration: 14
  },
  {
    id: '2',
    title: 'Calculus: Early Transcendentals (8th Edition)',
    author: 'James Stewart, Daniel Clegg',
    subject: 'Mathematics',
    condition: 'good',
    lenderName: 'Priya Singh',
    lenderCollege: 'VIT Chennai',
    lenderPhone: '+91 87654 32109',
    borrowDuration: 10
  },
  {
    id: '3',
    title: 'Principles of Physics (10th Edition)',
    author: 'David Halliday, Robert Resnick',
    subject: 'Physics',
    condition: 'fair',
    lenderName: 'Amit Kumar',
    lenderCollege: 'VIT Vellore',
    lenderPhone: '+91 76543 21098',
    borrowDuration: 7
  },
  {
    id: '4',
    title: 'Organic Chemistry (8th Edition)',
    author: 'Paula Yurkanis Bruice',
    subject: 'Chemistry',
    condition: 'excellent',
    lenderName: 'Neha Gupta',
    lenderCollege: 'VIT Bhopal',
    lenderPhone: '+91 65432 10987',
    borrowDuration: 14
  },
  {
    id: '5',
    title: 'Data Structures and Algorithms Made Easy',
    author: 'Narasimha Karumanchi',
    subject: 'Computer Science',
    condition: 'good',
    lenderName: 'Vikash Jain',
    lenderCollege: 'VIT Vellore',
    lenderPhone: '+91 54321 09876',
    borrowDuration: 21
  },
  {
    id: '6',
    title: 'Principles of Economics (8th Edition)',
    author: 'N. Gregory Mankiw',
    subject: 'Economics',
    condition: 'excellent',
    lenderName: 'Asha Patel',
    lenderCollege: 'VIT Chennai',
    lenderPhone: '+91 43210 98765',
    borrowDuration: 14
  },
  {
    id: '7',
    title: 'Database System Concepts (7th Edition)',
    author: 'Abraham Silberschatz, Henry F. Korth',
    subject: 'Computer Science',
    condition: 'good',
    lenderName: 'Arjun Reddy',
    lenderCollege: 'VIT Vellore',
    lenderPhone: '+91 98765 12345',
    borrowDuration: 10
  },
  {
    id: '8',
    title: 'Engineering Mechanics: Statics (14th Edition)',
    author: 'Russell C. Hibbeler',
    subject: 'Engineering',
    condition: 'excellent',
    lenderName: 'Kavya Nair',
    lenderCollege: 'VIT Bhopal',
    lenderPhone: '+91 87654 67890',
    borrowDuration: 14
  }
];

const subjects = ['All Subjects', 'Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Economics', 'History', 'English Literature', 'Psychology', 'Business Studies', 'Engineering', 'Medicine', 'Data Science', 'Electronics'];

const colleges = ['All Campuses', 'VIT Vellore', 'VIT Chennai', 'VIT Bhopal', 'VIT AP'];

const conditions = ['All Conditions', 'excellent', 'good', 'fair', 'poor'];

export function BorrowBooksPage({ userData, onBack, onBorrowNow, onAddToWishlist, wishlist }: BorrowBooksPageProps) {
  const [filters, setFilters] = useState({
    search: '',
    subject: 'All Subjects',
    author: '',
    college: 'All Campuses',
    condition: 'All Conditions'
  });

  const filteredBooks = useMemo(() => {
    return mockBooks.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                           book.author.toLowerCase().includes(filters.search.toLowerCase());
      const matchesSubject = filters.subject === 'All Subjects' || book.subject === filters.subject;
      const matchesAuthor = !filters.author || book.author.toLowerCase().includes(filters.author.toLowerCase());
      const matchesCollege = filters.college === 'All Campuses' || book.lenderCollege === filters.college;
      const matchesCondition = filters.condition === 'All Conditions' || book.condition === filters.condition;
      
      return matchesSearch && matchesSubject && matchesAuthor && matchesCollege && matchesCondition;
    });
  }, [filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-50">
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="p-2 hover:bg-slate-100">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                Browse Books
              </h1>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-slate-600">Available Books</div>
            <div className="text-xl text-indigo-600">{filteredBooks.length} books</div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Filters */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 mb-8 shadow-lg border border-slate-200/60">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-slate-700 to-slate-500 rounded-lg flex items-center justify-center">
              <Filter className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl tracking-tight text-slate-900">Filter Academic Books</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            <div className="space-y-3">
              <Label htmlFor="search" className="text-slate-700">Search Books</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="search"
                  placeholder="Title, author, keywords..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="pl-10 h-11 border-slate-300 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-slate-700">Subject</Label>
              <Select value={filters.subject} onValueChange={(value) => handleFilterChange('subject', value)}>
                <SelectTrigger className="h-11 border-slate-300 focus:border-indigo-500">
                  <SelectValue />
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
              <Label htmlFor="author" className="text-slate-700">Author</Label>
              <Input
                id="author"
                placeholder="Author name..."
                value={filters.author}
                onChange={(e) => handleFilterChange('author', e.target.value)}
                className="h-11 border-slate-300 focus:border-indigo-500"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-slate-700">Campus</Label>
              <Select value={filters.college} onValueChange={(value) => handleFilterChange('college', value)}>
                <SelectTrigger className="h-11 border-slate-300 focus:border-indigo-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {colleges.map(college => (
                    <SelectItem key={college} value={college}>
                      {college}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-slate-700">Condition</Label>
              <Select value={filters.condition} onValueChange={(value) => handleFilterChange('condition', value)}>
                <SelectTrigger className="h-11 border-slate-300 focus:border-indigo-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {conditions.map(condition => (
                    <SelectItem key={condition} value={condition}>
                      {condition === 'All Conditions' ? condition : condition.charAt(0).toUpperCase() + condition.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-2xl tracking-tight text-slate-900">
              {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'} available for sharing
            </h3>
            <p className="text-slate-600 mt-1">Free academic resource sharing by VIT students</p>
          </div>
        </div>

        {filteredBooks.length === 0 ? (
          <div className="text-center py-16 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/60">
            <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl text-slate-800 mb-3">No books found</h3>
            <p className="text-slate-600 mb-6">Try adjusting your search criteria or browse different subjects</p>
            <Button 
              onClick={() => setFilters({
                search: '',
                subject: 'All Subjects',
                author: '',
                college: 'All Campuses',
                condition: 'All Conditions'
              })}
              variant="outline"
              className="border-slate-300"
            >
              Clear all filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map(book => (
              <BookCard
                key={book.id}
                book={book}
                onBorrowNow={onBorrowNow}
                onAddToWishlist={onAddToWishlist}
                isInWishlist={wishlist.some(w => w.id === book.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}