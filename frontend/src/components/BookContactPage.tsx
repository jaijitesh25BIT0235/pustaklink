import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, BookOpen, User, MapPin, Phone, Calendar, Clock, MessageCircle, Mail, Heart } from 'lucide-react';
import { Book } from './BookCard';
import { motion } from 'motion/react';

interface BookContactPageProps {
  book: Book;
  userData: {
    name: string;
    college: string;
    phone: string;
    email: string;
  };
  onBack: () => void;
  onConfirmBorrow: (book: Book) => void;
  onAddToWishlist: (book: Book) => void;
  isInWishlist: boolean;
}

export function BookContactPage({ 
  book, 
  userData, 
  onBack, 
  onConfirmBorrow, 
  onAddToWishlist,
  isInWishlist 
}: BookContactPageProps) {
  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'excellent': return 'bg-emerald-500/10 text-emerald-700 border-emerald-200';
      case 'good': return 'bg-blue-500/10 text-blue-700 border-blue-200';
      case 'fair': return 'bg-amber-500/10 text-amber-700 border-amber-200';
      case 'poor': return 'bg-red-500/10 text-red-700 border-red-200';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  const returnDate = new Date(Date.now() + book.borrowDuration * 24 * 60 * 60 * 1000);

  const handleCallLender = () => {
    window.location.href = `tel:${book.lenderPhone}`;
  };

  const handleEmailLender = () => {
    const subject = encodeURIComponent(`Book Request: ${book.title}`);
    const body = encodeURIComponent(
      `Hi ${book.lenderName},\n\nI'm interested in borrowing your book "${book.title}" by ${book.author}.\n\nMy details:\nName: ${userData.name}\nCollege: ${userData.college}\nPhone: ${userData.phone}\nEmail: ${userData.email}\n\nLet me know when would be a good time to arrange the pickup.\n\nThanks!\n${userData.name}`
    );
    window.location.href = `mailto:${book.lenderEmail || ''}?subject=${subject}&body=${body}`;
  };

  const handleWhatsAppLender = () => {
    const message = encodeURIComponent(
      `Hi ${book.lenderName}! I'm interested in borrowing your book "${book.title}" by ${book.author}. I'm ${userData.name} from ${userData.college}. Can we arrange a pickup? 📚`
    );
    const phoneNumber = book.lenderPhone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/70 to-indigo-50/50">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-400/15 to-indigo-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-indigo-400/15 to-blue-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 bg-white/70 backdrop-blur-2xl border-b border-white/20 shadow-2xl"
      >
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center gap-6">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button variant="ghost" onClick={onBack} className="p-3 hover:bg-blue-100/50 rounded-2xl">
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </motion.div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <MessageCircle className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent tracking-tight">
                Contact Book Owner
              </h1>
              <p className="text-sm text-gray-600">Connect for free book sharing</p>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="relative z-10 max-w-6xl mx-auto px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Book Details */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-0 bg-white/80 backdrop-blur-2xl shadow-2xl mb-8">
              <CardHeader className="pb-8">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <motion.div 
                      className="w-20 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-6 shadow-xl"
                      animate={{ 
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <BookOpen className="w-10 h-10 text-blue-600" />
                    </motion.div>
                    <CardTitle className="text-3xl text-gray-900 mb-4 leading-tight">
                      {book.title}
                    </CardTitle>
                    <p className="text-xl text-gray-700 mb-6">by {book.author}</p>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="text-sm px-4 py-2 bg-gray-100 text-gray-700">
                        {book.subject}
                      </Badge>
                      <Badge className={`text-sm px-4 py-2 border ${getConditionColor(book.condition)}`}>
                        {book.condition} condition
                      </Badge>
                    </div>
                  </div>
                  
                  <motion.button
                    onClick={() => onAddToWishlist(book)}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-300 ${
                      isInWishlist 
                        ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white' 
                        : 'bg-white/90 backdrop-blur-xl text-gray-600 hover:text-pink-500'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart className={`w-6 h-6 ${isInWishlist ? 'fill-current' : ''}`} />
                  </motion.button>
                </div>
              </CardHeader>
              
              <CardContent className="px-8 pb-8">
                {/* Sharing Details */}
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-8 border border-emerald-100">
                  <h3 className="text-2xl text-emerald-800 mb-6 flex items-center gap-3">
                    <Calendar className="w-6 h-6" />
                    Free Sharing Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/70 rounded-xl p-6 shadow-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Clock className="w-5 h-5 text-emerald-600" />
                        <span className="text-emerald-700 text-lg">Sharing Duration</span>
                      </div>
                      <div className="text-3xl text-emerald-800 mb-2">{book.borrowDuration} days</div>
                      <div className="text-sm text-emerald-600">Completely free</div>
                    </div>
                    
                    <div className="bg-white/70 rounded-xl p-6 shadow-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <span className="text-blue-700 text-lg">Expected Return</span>
                      </div>
                      <div className="text-xl text-blue-800 mb-2">
                        {returnDate.toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="text-sm text-blue-600">Flexible timing</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-xl border border-emerald-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Heart className="w-5 h-5 text-emerald-600" />
                      <span className="text-emerald-800">Community Sharing</span>
                    </div>
                    <p className="text-emerald-700 text-sm">
                      This book is being shared freely by a fellow VIT student. No payment required - 
                      just community support and knowledge sharing! 📚
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Instructions */}
            <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 backdrop-blur-2xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-800 flex items-center gap-3">
                  <MessageCircle className="w-6 h-6" />
                  How to Connect
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-white/70 rounded-xl">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">1</div>
                    <div>
                      <h4 className="text-blue-800 mb-2">Choose your preferred contact method</h4>
                      <p className="text-blue-700 text-sm">Call, WhatsApp, or email the book owner directly</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-white/70 rounded-xl">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">2</div>
                    <div>
                      <h4 className="text-blue-800 mb-2">Arrange pickup details</h4>
                      <p className="text-blue-700 text-sm">Coordinate a convenient time and place to collect the book</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-white/70 rounded-xl">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">3</div>
                    <div>
                      <h4 className="text-blue-800 mb-2">Confirm your borrow request</h4>
                      <p className="text-blue-700 text-sm">Once contacted, confirm the borrowing arrangement</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Options */}
          <motion.div 
            className="space-y-8"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {/* Lender Information */}
            <Card className="border-0 bg-white/80 backdrop-blur-2xl shadow-2xl">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl text-gray-800 flex items-center gap-3">
                  <User className="w-6 h-6 text-violet-600" />
                  Book Owner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-xl text-gray-900">{book.lenderName}</p>
                    <p className="text-sm text-gray-600">VIT Student</p>
                  </div>
                </div>
                
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{book.lenderCollege}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{book.lenderPhone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Methods */}
            <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 backdrop-blur-2xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl text-emerald-800 flex items-center gap-3">
                  <MessageCircle className="w-6 h-6" />
                  Contact Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    onClick={handleCallLender}
                    className="w-full h-14 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg text-base"
                  >
                    <Phone className="w-5 h-5 mr-3" />
                    Call {book.lenderName}
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    onClick={handleWhatsAppLender}
                    className="w-full h-14 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg text-base"
                  >
                    <MessageCircle className="w-5 h-5 mr-3" />
                    WhatsApp Message
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    onClick={handleEmailLender}
                    variant="outline"
                    className="w-full h-12 border-emerald-200 hover:bg-emerald-50 shadow-lg text-base"
                  >
                    <Mail className="w-5 h-5 mr-3" />
                    Send Email
                  </Button>
                </motion.div>
              </CardContent>
            </Card>

            {/* Confirm Borrow */}
            <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 backdrop-blur-2xl shadow-2xl">
              <CardContent className="p-6">
                <h4 className="text-blue-800 text-lg mb-4">After contacting the owner:</h4>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    onClick={() => onConfirmBorrow(book)}
                    className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg text-base"
                  >
                    <BookOpen className="w-5 h-5 mr-3" />
                    Confirm Borrow Request
                  </Button>
                </motion.div>
                <p className="text-blue-600 text-sm mt-3 text-center">
                  Click after arranging pickup with the owner
                </p>
              </CardContent>
            </Card>

            {/* Community Guidelines */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200/60 rounded-2xl p-6 shadow-lg">
              <h4 className="text-purple-800 text-lg mb-4 flex items-center gap-3">
                <Heart className="w-5 h-5" />
                Community Guidelines
              </h4>
              <ul className="text-purple-700 space-y-2 text-sm">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Be respectful and polite when contacting</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Treat the book with care and return on time</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Arrange convenient pickup/return times</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Support our free sharing community</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}