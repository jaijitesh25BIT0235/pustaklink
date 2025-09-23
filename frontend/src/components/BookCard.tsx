import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { BookOpen, MapPin, Phone, User, Heart } from 'lucide-react';
import { motion } from 'motion/react';

export interface Book {
  id: string;
  title: string;
  author: string;
  subject: string;
  condition: string;
  lenderName: string;
  lenderCollege: string;
  lenderPhone: string;
  borrowDuration: number; // days
}

interface BookCardProps {
  book: Book;
  onBorrowNow?: (book: Book) => void;
  onAddToWishlist?: (book: Book) => void;
  isInWishlist?: boolean;
}

export function BookCard({ book, onBorrowNow, onAddToWishlist, isInWishlist }: BookCardProps) {

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'excellent': return 'bg-emerald-500/10 text-emerald-700 border-emerald-200';
      case 'good': return 'bg-blue-500/10 text-blue-700 border-blue-200';
      case 'fair': return 'bg-amber-500/10 text-amber-700 border-amber-200';
      case 'poor': return 'bg-red-500/10 text-red-700 border-red-200';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative group"
    >
      <Card className="h-full border-0 bg-white/90 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-indigo-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
        
        {/* Wishlist Button */}
        {onAddToWishlist && (
          <motion.button
            onClick={() => onAddToWishlist(book)}
            className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${
              isInWishlist 
                ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white' 
                : 'bg-white/90 backdrop-blur-xl text-gray-600 hover:text-pink-500'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
          </motion.button>
        )}

        <CardHeader className="pb-4 relative z-10">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-base leading-tight text-gray-900 mb-2 line-clamp-2">{book.title}</h3>
              <p className="text-sm text-gray-600">by {book.author}</p>
            </div>
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <Badge variant="secondary" className="text-xs px-3 py-1 bg-gray-100 text-gray-700 border-0">
              {book.subject}
            </Badge>
            <Badge className={`text-xs px-3 py-1 border ${getConditionColor(book.condition)}`}>
              {book.condition}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-0 pb-4 relative z-10">
          <div className="space-y-4">
            {/* Borrow Duration Display */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-700">Available for</span>
                <div className="text-lg text-blue-700 bg-blue-100 px-4 py-2 rounded-full">
                  {book.borrowDuration} days
                </div>
              </div>
              <div className="text-xs text-blue-600 mt-2 text-center">
                Free academic sharing
              </div>
            </div>

            {/* Lender Information */}
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">{book.lenderName}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="truncate text-gray-700">{book.lenderCollege}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">{book.lenderPhone}</span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-0 gap-3 relative z-10">
          {onBorrowNow && (
            <motion.div className="w-full" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                size="sm" 
                onClick={() => onBorrowNow(book)}
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-xs shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Borrow This Book
              </Button>
            </motion.div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}