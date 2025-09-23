import React, { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, Filter, Search, ShoppingCart } from 'lucide-react';
import { BookCard, Book } from './BookCard';

interface BuyBooksPageProps {
  userData: {
    name: string;
    college: string;
    phone: string;
    email: string;
  };
  onBack: () => void;
  onGoToCart: (cart: Book[]) => void;
  onBuyNow: (book: Book) => void;
}

// Mock data for demonstration
const mockBooks: Book[] = [
  {
    id: '1',
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    subject: 'Computer Science',
    mrp: 1200,
    salePrice: 480,
    condition: 'excellent',
    sellerName: 'Rahul Sharma',
    sellerCollege: 'Delhi Technical University',
    sellerPhone: '+91 98765 43210'
  },
  {
    id: '2',
    title: 'Calculus: Early Transcendentals',
    author: 'James Stewart',
    subject: 'Mathematics',
    mrp: 800,
    salePrice: 320,
    condition: 'good',
    sellerName: 'Priya Singh',
    sellerCollege: 'Mumbai University',
    sellerPhone: '+91 87654 32109'
  },
  {
    id: '3',
    title: 'Principles of Physics',
    author: 'David Halliday',
    subject: 'Physics',
    mrp: 950,
    salePrice: 380,
    condition: 'fair',
    sellerName: 'Amit Kumar',
    sellerCollege: 'Delhi Technical University',
    sellerPhone: '+91 76543 21098'
  },
  {
    id: '4',
    title: 'Organic Chemistry',
    author: 'Paula Bruice',
    subject: 'Chemistry',
    mrp: 1100,
    salePrice: 440,
    condition: 'excellent',
    sellerName: 'Neha Gupta',
    sellerCollege: 'Chennai Institute',
    sellerPhone: '+91 65432 10987'
  },
  {
    id: '5',
    title: 'Data Structures and Algorithms',
    author: 'Narasimha Karumanchi',
    subject: 'Computer Science',
    mrp: 650,
    salePrice: 260,
    condition: 'good',
    sellerName: 'Vikash Jain',
    sellerCollege: 'Delhi Technical University',
    sellerPhone: '+91 54321 09876'
  },
  {
    id: '6',
    title: 'Principles of Economics',
    author: 'N. Gregory Mankiw',
    subject: 'Economics',
    mrp: 900,
    salePrice: 360,
    condition: 'excellent',
    sellerName: 'Asha Patel',
    sellerCollege: 'Mumbai University',
    sellerPhone: '+91 43210 98765'
  }
];

const subjects = ['All Subjects', 'Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Economics', 'History', 'English Literature', 'Psychology', 'Business Studies', 'Engineering', 'Medicine'];

const colleges = ['All Colleges', 'Delhi Technical University', 'Mumbai University', 'Chennai Institute', 'Bangalore Tech', 'Kolkata University'];

export function BuyBooksPage({ userData, onBack, onGoToCart, onBuyNow }: BuyBooksPageProps) {
  const [cart, setCart] = useState<Book[]>([]);
  const [filters, setFilters] = useState({
    search: '',
    subject: 'All Subjects',
    author: '',
    college: 'All Colleges'
  });

  const filteredBooks = useMemo(() => {
    return mockBooks.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                           book.author.toLowerCase().includes(filters.search.toLowerCase());
      const matchesSubject = filters.subject === 'All Subjects' || book.subject === filters.subject;
      const matchesAuthor = !filters.author || book.author.toLowerCase().includes(filters.author.toLowerCase());
      const matchesCollege = filters.college === 'All Colleges' || book.sellerCollege === filters.college;
      
      return matchesSearch && matchesSubject && matchesAuthor && matchesCollege;
    });
  }, [filters]);

  const handleAddToCart = (book: Book) => {
    if (!cart.find(item => item.id === book.id)) {
      const newCart = [...cart, book];
      setCart(newCart);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const cartTotal = cart.reduce((sum, book) => sum + book.salePrice, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="p-2">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Buy Books
            </h1>
          </div>
          
          {cart.length > 0 && (
            <Button onClick={() => onGoToCart(cart)} className="relative">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart ({cart.length})
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            </Button>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Filters */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4" />
            <h2 className="text-lg">Filter Books</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search Books</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Book title or author..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Subject</Label>
              <Select value={filters.subject} onValueChange={(value) => handleFilterChange('subject', value)}>
                <SelectTrigger>
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

            <div className="space-y-2">
              <Label htmlFor="author">Author Name</Label>
              <Input
                id="author"
                placeholder="Filter by author..."
                value={filters.author}
                onChange={(e) => handleFilterChange('author', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>College</Label>
              <Select value={filters.college} onValueChange={(value) => handleFilterChange('college', value)}>
                <SelectTrigger>
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
          </div>
        </div>

        {/* Results */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg">
            {filteredBooks.length} books found
          </h3>
          {cart.length > 0 && (
            <div className="text-sm text-gray-600">
              Cart Total: ₹{cartTotal}
            </div>
          )}
        </div>

        {filteredBooks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500 text-lg">No books found matching your criteria</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map(book => (
              <BookCard
                key={book.id}
                book={book}
                onAddToCart={handleAddToCart}
                onBuyNow={onBuyNow}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}