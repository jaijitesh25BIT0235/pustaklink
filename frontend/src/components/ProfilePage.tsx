import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, BookOpen, TrendingUp, Clock, User, Phone, Mail, MapPin, AlertTriangle, CheckCircle, XCircle, Crown, Star, Award, Target, Heart, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

interface LentBook {
  id: string;
  title: string;
  author: string;
  subject: string;
  condition: string;
  borrowDuration: number;
  dateIssued: string;
  returnDate: string;
  borrowerName: string;
  borrowerContact: string;
  status: 'active' | 'returned' | 'overdue';
}

interface BorrowedBook {
  id: string;
  title: string;
  author: string;
  subject: string;
  condition: string;
  borrowDuration: number;
  dateIssued: string;
  returnDate: string;
  lenderContact: string;
  status: 'active' | 'returned' | 'overdue';
}

interface ProfilePageProps {
  userData: {
    name: string;
    college: string;
    phone: string;
    email: string;
  };
  lentBooks: LentBook[];
  borrowedBooks: BorrowedBook[];
  onBack: () => void;
  onNavigate: (page: 'lend' | 'borrow' | 'home') => void;
}

export function ProfilePage({ userData, lentBooks, borrowedBooks, onBack, onNavigate }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const totalBooksShared = lentBooks.length;
  const totalBooksBorrowed = borrowedBooks.length;
  const activeLends = lentBooks.filter(book => book.status === 'active').length;
  const activeBorrows = borrowedBooks.filter(book => book.status === 'active').length;
  const communityImpact = totalBooksShared + totalBooksBorrowed;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-500/10 text-blue-700 border-blue-200';
      case 'returned': return 'bg-green-500/10 text-green-700 border-green-200';
      case 'overdue': return 'bg-red-500/10 text-red-700 border-red-200';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Clock className="w-3 h-3" />;
      case 'returned': return <CheckCircle className="w-3 h-3" />;
      case 'overdue': return <AlertTriangle className="w-3 h-3" />;
      default: return <XCircle className="w-3 h-3" />;
    }
  };

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
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-violet-50/50 to-blue-50/30">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-violet-400/15 to-blue-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-blue-400/15 to-purple-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
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
              <Button variant="ghost" onClick={onBack} className="p-3 hover:bg-violet-100/50 rounded-2xl">
                <ArrowLeft className="w-6 h-6" />
              </Button>
            </motion.div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <Crown className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-4xl bg-gradient-to-r from-violet-700 to-blue-700 bg-clip-text text-transparent tracking-tight">
                  My Profile
                </h1>
                <p className="text-sm text-gray-600">Community Sharing Dashboard</p>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <motion.main 
        className="relative z-10 max-w-7xl mx-auto px-8 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Profile Header */}
        <motion.div className="mb-12" variants={itemVariants}>
          <Card className="border-0 bg-gradient-to-r from-white/90 via-violet-50/30 to-blue-50/30 backdrop-blur-2xl shadow-2xl">
            <CardContent className="p-10">
              <div className="flex items-center gap-8">
                <motion.div 
                  className="w-24 h-24 bg-gradient-to-br from-violet-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <User className="w-12 h-12 text-white" />
                </motion.div>
                
                <div className="flex-1">
                  <h2 className="text-4xl mb-2 bg-gradient-to-r from-slate-900 to-violet-800 bg-clip-text text-transparent">
                    {userData.name}
                  </h2>
                  <div className="flex items-center gap-6 text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{userData.college}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{userData.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{userData.email}</span>
                    </div>
                  </div>
                  
                  {/* Status Badges */}
                  <div className="flex gap-3">
                    <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-2 shadow-lg">
                      <Heart className="w-4 h-4 mr-2" />
                      Community Member
                    </Badge>
                    <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 shadow-lg">
                      <Star className="w-4 h-4 mr-2" />
                      VIT Verified
                    </Badge>
                  </div>
                </div>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg">
                    <div className="text-2xl text-emerald-600 mb-1">{totalBooksShared}</div>
                    <div className="text-xs text-gray-600">Books Shared</div>
                  </div>
                  <div className="text-center p-4 bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg">
                    <div className="text-2xl text-blue-600 mb-1">{communityImpact}</div>
                    <div className="text-xs text-gray-600">Community Impact</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Dashboard Tabs */}
        <motion.div variants={itemVariants}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 bg-white/60 backdrop-blur-2xl border-0 shadow-2xl p-2 rounded-2xl">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl py-3 transition-all duration-300"
              >
                <Target className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="lent" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-green-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl py-3 transition-all duration-300"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Books Shared ({lentBooks.length})
              </TabsTrigger>
              <TabsTrigger 
                value="borrowed" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl py-3 transition-all duration-300"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Books Borrowed ({borrowedBooks.length})
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: 'Active Shares', value: activeLends, icon: TrendingUp, color: 'from-emerald-500 to-green-500', bgColor: 'from-emerald-50 to-green-50' },
                  { title: 'Active Borrows', value: activeBorrows, icon: BookOpen, color: 'from-blue-500 to-indigo-500', bgColor: 'from-blue-50 to-indigo-50' },
                  { title: 'Total Shared', value: totalBooksShared, icon: Heart, color: 'from-violet-500 to-purple-500', bgColor: 'from-violet-50 to-purple-50' },
                  { title: 'Community Impact', value: communityImpact, icon: Star, color: 'from-pink-500 to-rose-500', bgColor: 'from-pink-50 to-rose-50' },
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
                        <div className="text-3xl mb-2 text-gray-900">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.title}</div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="flex justify-center gap-6">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => onNavigate('lend')}
                    className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-2xl text-lg"
                  >
                    <TrendingUp className="w-5 h-5 mr-3" />
                    Share New Book
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => onNavigate('borrow')}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-2xl text-lg"
                  >
                    <BookOpen className="w-5 h-5 mr-3" />
                    Browse Books
                  </Button>
                </motion.div>
              </div>
            </TabsContent>

            {/* Lent Books Tab */}
            <TabsContent value="lent" className="space-y-6">
              {lentBooks.length === 0 ? (
                <Card className="border-0 bg-white/60 backdrop-blur-2xl shadow-2xl">
                  <CardContent className="p-20 text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                      <TrendingUp className="w-12 h-12 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl text-gray-900 mb-4">No Books Shared Yet</h3>
                    <p className="text-gray-600 mb-8">Start sharing your books to help fellow students</p>
                    <Button
                      onClick={() => onNavigate('lend')}
                      className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-3 shadow-xl"
                    >
                      Share Your First Book
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6">
                  {lentBooks.map((book, index) => (
                    <motion.div
                      key={book.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="border-0 bg-white/80 backdrop-blur-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
                        <CardContent className="p-8">
                          <div className="flex items-start gap-6">
                            <div className="w-20 h-24 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl flex items-center justify-center border border-emerald-200">
                              <BookOpen className="w-8 h-8 text-emerald-600" />
                            </div>
                            
                            <div className="flex-1 space-y-3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="text-xl text-gray-900 mb-1">{book.title}</h3>
                                  <p className="text-gray-600">by {book.author}</p>
                                  <Badge variant="secondary" className="mt-2">{book.subject}</Badge>
                                </div>
                                <Badge className={`px-3 py-1 ${getStatusColor(book.status)}`}>
                                  {getStatusIcon(book.status)}
                                  <span className="ml-2 capitalize">{book.status}</span>
                                </Badge>
                              </div>
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
                                <div>
                                  <span className="text-sm text-gray-500">Sharing Duration</span>
                                  <div className="text-lg text-emerald-600">{book.borrowDuration} days</div>
                                </div>
                                <div>
                                  <span className="text-sm text-gray-500">Condition</span>
                                  <div className="text-lg text-gray-900 capitalize">{book.condition}</div>
                                </div>
                                <div>
                                  <span className="text-sm text-gray-500">Return Date</span>
                                  <div className="text-lg text-gray-900">{new Date(book.returnDate).toLocaleDateString()}</div>
                                </div>
                                <div>
                                  <span className="text-sm text-gray-500">Borrower</span>
                                  <div className="text-lg text-gray-900">{book.borrowerName}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Borrowed Books Tab */}
            <TabsContent value="borrowed" className="space-y-6">
              {borrowedBooks.length === 0 ? (
                <Card className="border-0 bg-white/60 backdrop-blur-2xl shadow-2xl">
                  <CardContent className="p-20 text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-8">
                      <BookOpen className="w-12 h-12 text-blue-600" />
                    </div>
                    <h3 className="text-2xl text-gray-900 mb-4">No Books Borrowed Yet</h3>
                    <p className="text-gray-600 mb-8">Explore our community collection and start learning</p>
                    <Button
                      onClick={() => onNavigate('borrow')}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 shadow-xl"
                    >
                      Browse Books
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6">
                  {borrowedBooks.map((book, index) => (
                    <motion.div
                      key={book.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="border-0 bg-white/80 backdrop-blur-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
                        <CardContent className="p-8">
                          <div className="flex items-start gap-6">
                            <div className="w-20 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center border border-blue-200">
                              <BookOpen className="w-8 h-8 text-blue-600" />
                            </div>
                            
                            <div className="flex-1 space-y-3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="text-xl text-gray-900 mb-1">{book.title}</h3>
                                  <p className="text-gray-600">by {book.author}</p>
                                  <Badge variant="secondary" className="mt-2">{book.subject}</Badge>
                                </div>
                                <Badge className={`px-3 py-1 ${getStatusColor(book.status)}`}>
                                  {getStatusIcon(book.status)}
                                  <span className="ml-2 capitalize">{book.status}</span>
                                </Badge>
                              </div>
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
                                <div>
                                  <span className="text-sm text-gray-500">Shared For</span>
                                  <div className="text-lg text-blue-600">{book.borrowDuration} days</div>
                                </div>
                                <div>
                                  <span className="text-sm text-gray-500">Condition</span>
                                  <div className="text-lg text-gray-900 capitalize">{book.condition}</div>
                                </div>
                                <div>
                                  <span className="text-sm text-gray-500">Return Date</span>
                                  <div className="text-lg text-gray-900">{new Date(book.returnDate).toLocaleDateString()}</div>
                                </div>
                                <div>
                                  <span className="text-sm text-gray-500">Status</span>
                                  <div className="text-lg text-green-600">Free Access</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.main>
    </div>
  );
}