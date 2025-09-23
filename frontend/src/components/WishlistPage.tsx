import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ArrowLeft, Heart, BookOpen, Trash2, Sparkles, Star, Crown } from 'lucide-react';
import { BookCard, Book } from './BookCard';
import { motion } from 'motion/react';

interface WishlistPageProps {
  userData: {
    name: string;
    college: string;
    phone: string;
    email: string;
  };
  wishlist: Book[];
  onBack: () => void;
  onRemoveFromWishlist: (bookId: string) => void;
  onBorrowNow: (book: Book) => void;
}

export function WishlistPage({ 
  userData, 
  wishlist, 
  onBack, 
  onRemoveFromWishlist, 
  onBorrowNow 
}: WishlistPageProps) {
  const averageBorrowDuration = wishlist.length > 0 
    ? Math.round(wishlist.reduce((sum, book) => sum + book.borrowDuration, 0) / wishlist.length)
    : 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-pink-50/50 to-rose-50/30">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-pink-400/15 to-rose-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-rose-400/15 to-pink-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-violet-400/5 to-pink-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 bg-white/70 backdrop-blur-2xl border-b border-white/20 shadow-2xl"
      >
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button variant="ghost" onClick={onBack} className="p-3 hover:bg-pink-100/50 rounded-2xl">
                <ArrowLeft className="w-6 h-6" />
              </Button>
            </motion.div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-4xl bg-gradient-to-r from-pink-700 to-rose-700 bg-clip-text text-transparent tracking-tight">
                  My Wishlist
                </h1>
                <p className="text-sm text-gray-600">Curated Academic Collection</p>
              </div>
            </div>
          </div>

          {wishlist.length > 0 && (
            <div className="flex items-center gap-4">
              <div className="text-right px-6 py-3 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl">
                <div className="text-sm text-gray-600">Wishlist Collection</div>
                <div className="text-2xl text-pink-600">{wishlist.length} Books</div>
                <div className="text-xs text-blue-600">Avg. {averageBorrowDuration} days sharing</div>
              </div>
            </div>
          )}
        </div>
      </motion.header>

      <motion.main 
        className="relative z-10 max-w-7xl mx-auto px-8 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {wishlist.length === 0 ? (
          /* Empty Wishlist State */
          <motion.div variants={itemVariants}>
            <Card className="border-0 bg-white/60 backdrop-blur-2xl shadow-2xl">
              <CardContent className="p-20 text-center">
                <motion.div 
                  className="w-32 h-32 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-8"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Heart className="w-16 h-16 text-pink-500" />
                </motion.div>
                
                <motion.h2 
                  className="text-4xl text-gray-900 mb-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Your Wishlist is Empty
                </motion.h2>
                
                <motion.p 
                  className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Start building your dream academic collection. Add books you love and track 
                  them for future borrowing through our free sharing community.
                </motion.p>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={onBack}
                    className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white px-12 py-4 text-lg shadow-2xl"
                  >
                    <BookOpen className="w-6 h-6 mr-3" />
                    Explore Books
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <>
            {/* Wishlist Stats */}
            <motion.div className="mb-12" variants={itemVariants}>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { 
                    title: 'Books in Wishlist', 
                    value: wishlist.length, 
                    icon: Heart, 
                    color: 'from-pink-500 to-rose-500',
                    bgColor: 'from-pink-50 to-rose-50'
                  },
                  { 
                    title: 'Academic Subjects', 
                    value: new Set(wishlist.map(book => book.subject)).size, 
                    icon: Crown, 
                    color: 'from-violet-500 to-purple-500',
                    bgColor: 'from-violet-50 to-purple-50'
                  },
                  { 
                    title: 'Avg. Borrow Duration', 
                    value: `${averageBorrowDuration} days`, 
                    icon: BookOpen, 
                    color: 'from-blue-500 to-indigo-500',
                    bgColor: 'from-blue-50 to-indigo-50'
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <Card className={`border-0 bg-gradient-to-br ${stat.bgColor} backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-300`}>
                      <CardContent className="p-6 text-center">
                        <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl`}>
                          <stat.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-2xl mb-2 text-gray-900">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.title}</div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Bulk Actions */}
            <motion.div 
              className="flex justify-between items-center mb-8"
              variants={itemVariants}
            >
              <div>
                <h3 className="text-2xl text-gray-900 mb-2">Your Curated Collection</h3>
                <p className="text-gray-600">
                  {wishlist.length} book{wishlist.length !== 1 ? 's' : ''} saved for free community sharing
                </p>
              </div>
              
              <div className="flex gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    onClick={() => wishlist.forEach(book => onRemoveFromWishlist(book.id))}
                    className="bg-white/80 backdrop-blur-xl border-white/30 hover:bg-red-50/80 hover:border-red-200 shadow-xl text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear Wishlist
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Wishlist Grid */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              variants={containerVariants}
            >
              {wishlist.map((book, index) => (
                <motion.div
                  key={book.id}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ y: -10 }}
                  className="relative group"
                >
                  {/* Wishlist Badge */}
                  <motion.div 
                    className="absolute -top-2 -right-2 z-10 w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-xl"
                    whileHover={{ scale: 1.2 }}
                    onClick={() => onRemoveFromWishlist(book.id)}
                  >
                    <Heart className="w-4 h-4 text-white fill-current" />
                  </motion.div>

                  {/* Enhanced Book Card */}
                  <div className="relative">
                    <BookCard
                      book={book}
                      onBorrowNow={onBorrowNow}
                    />
                    
                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                      <div className="absolute bottom-4 left-4 right-4">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            size="sm"
                            onClick={() => onBorrowNow(book)}
                            className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white"
                          >
                            <BookOpen className="w-3 h-3 mr-2" />
                            Borrow This Book
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Book Stats */}
                  <motion.div 
                    className="mt-4 p-4 bg-white/60 backdrop-blur-xl rounded-xl shadow-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                  >
                    <div className="flex justify-between items-center text-sm">
                      <div>
                        <span className="text-gray-500">Condition:</span>
                        <span className="ml-2 text-blue-600 capitalize">{book.condition}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Duration:</span>
                        <span className="ml-2 text-pink-600">{book.borrowDuration} days</span>
                      </div>
                    </div>
                    <div className="mt-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full"
                        style={{ width: '100%' }}
                      ></div>
                    </div>
                    <div className="text-xs text-center mt-2 text-gray-600">
                      Free community sharing
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom Actions */}
            <motion.div 
              className="flex justify-center mt-16"
              variants={itemVariants}
            >
              <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-2xl p-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-pink-500" />
                  <span className="text-lg text-gray-900">Ready to learn together?</span>
                  <Sparkles className="w-5 h-5 text-pink-500" />
                </div>
                <p className="text-gray-600 mb-6">
                  Start borrowing from your wishlist and join our knowledge sharing community
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => wishlist.length > 0 && onBorrowNow(wishlist[0])}
                    className="bg-gradient-to-r from-pink-600 via-rose-600 to-pink-700 hover:from-pink-700 hover:via-rose-700 hover:to-pink-800 text-white px-12 py-4 text-lg shadow-2xl"
                    disabled={wishlist.length === 0}
                  >
                    <BookOpen className="w-5 h-5 mr-3" />
                    Start Borrowing Books
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </motion.main>
    </div>
  );
}