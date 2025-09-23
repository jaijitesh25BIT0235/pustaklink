import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { User, BookOpen, TrendingUp, Heart, UserCheck, LogOut, Sparkles, Stars, Zap, Crown, Globe, Shield, Target, BarChart3, Award, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { FloatingParticles, MorphingBlob, GradientOrb, SpotlightEffect, HolographicCard, DataParticles } from './ui/visual-effects';

interface HomePageProps {
  userData: {
    name: string;
    college: string;
    phone: string;
    email: string;
  };
  onNavigate: (page: 'lend' | 'borrow' | 'profile' | 'wishlist') => void;
  onLogout: () => void;
}

export function HomePage({ userData, onNavigate, onLogout }: HomePageProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
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

  const cardHoverVariants = {
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };

  return (
    <div className="min-h-screen relative overflow-hidden particle-bg mesh-bg">
      {/* Advanced Background System */}
      <FloatingParticles />
      <DataParticles />
      
      {/* Multiple Morphing Blobs */}
      <GradientOrb size="w-[500px] h-[500px]" position="top-10 left-10" gradient="from-violet-500/30 to-blue-500/30" />
      <GradientOrb size="w-[400px] h-[400px]" position="bottom-10 right-10" gradient="from-emerald-500/25 to-cyan-500/25" />
      <GradientOrb size="w-[300px] h-[300px]" position="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" gradient="from-pink-500/20 to-rose-500/20" />
      
      <MorphingBlob className="w-96 h-96 top-20 right-1/4" color="purple" />
      <MorphingBlob className="w-80 h-80 bottom-32 left-1/4" color="blue" />
      <MorphingBlob className="w-64 h-64 top-1/3 right-10" color="pink" />
      
      {/* Premium overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/90 via-transparent to-slate-50/90 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none"></div>

      {/* Enhanced Header */}
      <SpotlightEffect>
        <motion.header 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative z-10 glass-ultra border-b border-white/30 shadow-ultra"
        >
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <motion.div 
              className="flex items-center gap-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div 
                className="w-16 h-16 bg-gradient-to-br from-violet-600 via-blue-600 to-cyan-500 rounded-3xl flex items-center justify-center shadow-neon hover-glow relative"
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Crown className="w-9 h-9 text-white" />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent animate-pulse"></div>
              </motion.div>
              <div>
                <h1 className="text-5xl gradient-text-glow tracking-tight animate-text-glow">
                  PustakLink
                </h1>
                <motion.p 
                  className="text-sm text-gray-600 flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Globe className="w-4 h-4" />
                  Premium Academic Exchange
                  <Shield className="w-4 h-4 text-green-500" />
                </motion.p>
              </div>
            </motion.div>
            
            <div className="flex items-center gap-6">
              <motion.div 
                className="flex items-center gap-4 px-6 py-3 bg-gradient-to-r from-white/80 to-gray-50/80 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl"
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                  <UserCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">{userData.name}</p>
                  <p className="text-xs text-gray-600">VIT Student</p>
                </div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  onClick={onLogout}
                  className="bg-white/80 backdrop-blur-xl border-white/30 hover:bg-red-50/80 hover:border-red-200 hover:text-red-600 shadow-xl transition-all duration-300"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>
      </SpotlightEffect>

      {/* Main Content */}
      <motion.main 
        className="relative z-10 max-w-7xl mx-auto px-8 py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.div className="text-center mb-20" variants={itemVariants}>
          <motion.div 
            className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-gradient-to-r from-violet-500/10 to-blue-500/10 backdrop-blur-xl rounded-full border border-violet-200/30"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-5 h-5 text-violet-600" />
            <span className="text-violet-700">Premium Academic Resource Platform</span>
            <Stars className="w-5 h-5 text-violet-600" />
          </motion.div>
          
          <motion.h2 
            className="text-6xl mb-8 bg-gradient-to-r from-slate-900 via-violet-800 to-slate-900 bg-clip-text text-transparent leading-tight"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            Elite Knowledge Exchange
          </motion.h2>
          
          <motion.p 
            className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Experience the future of academic resource sharing with our sophisticated borrowing and lending ecosystem, 
            exclusively designed for VIT's intellectual community.
          </motion.p>
        </motion.div>

        {/* Action Cards */}
        <motion.div className="grid lg:grid-cols-2 gap-12 mb-20" variants={itemVariants}>
          {/* Lend Books Card */}
          <motion.div
            variants={cardHoverVariants}
            whileHover="hover"
            className="group cursor-pointer"
            onClick={() => onNavigate('lend')}
          >
            <Card className="h-full border-0 bg-gradient-to-br from-white/90 via-emerald-50/50 to-green-50/30 backdrop-blur-2xl shadow-2xl hover:shadow-3xl transition-all duration-700 relative overflow-hidden">
              {/* Animated background elements */}
              <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-green-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
              
              <CardHeader className="text-center pb-8 relative z-10">
                <motion.div 
                  className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:shadow-emerald-500/50"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <TrendingUp className="w-12 h-12 text-white" />
                </motion.div>
                <CardTitle className="text-4xl text-gray-900 mb-4 group-hover:text-emerald-700 transition-colors">
                  Lend Books
                </CardTitle>
                <CardDescription className="text-xl text-gray-700 leading-relaxed">
                  Share your academic collection and help fellow students learn
                </CardDescription>
              </CardHeader>
              
              <CardContent className="px-10 pb-10 relative z-10">
                <div className="space-y-6 mb-10">
                  {[
                    'Smart duration-based sharing system',
                    'Verified VIT student network',
                    'Automated return tracking',
                    'Free community knowledge exchange'
                  ].map((feature, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center gap-4"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                    >
                      <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full shadow-lg"></div>
                      <span className="text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 hover:from-emerald-700 hover:via-green-700 hover:to-emerald-800 text-white py-4 text-lg shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 group-hover:scale-105"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('lend');
                  }}
                >
                  <Zap className="w-5 h-5 mr-3" />
                  Start Sharing Journey
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Borrow Books Card */}
          <motion.div
            variants={cardHoverVariants}
            whileHover="hover"
            className="group cursor-pointer"
            onClick={() => onNavigate('borrow')}
          >
            <Card className="h-full border-0 bg-gradient-to-br from-white/90 via-blue-50/50 to-indigo-50/30 backdrop-blur-2xl shadow-2xl hover:shadow-3xl transition-all duration-700 relative overflow-hidden">
              {/* Animated background elements */}
              <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-br from-indigo-400/20 to-blue-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
              
              <CardHeader className="text-center pb-8 relative z-10">
                <motion.div 
                  className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:shadow-blue-500/50"
                  whileHover={{ rotate: -360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <BookOpen className="w-12 h-12 text-white" />
                </motion.div>
                <CardTitle className="text-4xl text-gray-900 mb-4 group-hover:text-blue-700 transition-colors">
                  Borrow Books
                </CardTitle>
                <CardDescription className="text-xl text-gray-700 leading-relaxed">
                  Access elite academic resources through free community sharing
                </CardDescription>
              </CardHeader>
              
              <CardContent className="px-10 pb-10 relative z-10">
                <div className="space-y-6 mb-10">
                  {[
                    'Curated premium book collection',
                    'Advanced AI-powered search',
                    'Exclusive VIT student network',
                    'Free access to academic resources'
                  ].map((feature, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center gap-4"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                    >
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-lg"></div>
                      <span className="text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-800 text-white py-4 text-lg shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 group-hover:scale-105"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('borrow');
                  }}
                >
                  <BookOpen className="w-5 h-5 mr-3" />
                  Explore Collection
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Quick Access Navigation */}
        <motion.div className="flex justify-center gap-8 mb-20" variants={itemVariants}>
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              onClick={() => onNavigate('profile')}
              className="px-8 py-4 bg-white/80 backdrop-blur-xl border-white/30 hover:bg-violet-50/80 hover:border-violet-200 shadow-2xl text-lg group"
            >
              <User className="w-5 h-5 mr-3 text-violet-600 group-hover:text-violet-700" />
              My Profile
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              onClick={() => onNavigate('wishlist')}
              className="px-8 py-4 bg-white/80 backdrop-blur-xl border-white/30 hover:bg-pink-50/80 hover:border-pink-200 shadow-2xl text-lg group"
            >
              <Heart className="w-5 h-5 mr-3 text-pink-600 group-hover:text-pink-700" />
              Wishlist
            </Button>
          </motion.div>
        </motion.div>

        {/* Platform Statistics */}
        <motion.div className="grid md:grid-cols-3 gap-8 mb-20" variants={itemVariants}>
          {[
            { 
              title: "Active Users", 
              value: "15,247", 
              change: "+12.3%", 
              icon: Users, 
              color: "from-blue-500 to-cyan-500",
              bgColor: "from-blue-50 to-cyan-50" 
            },
            { 
              title: "Books Shared", 
              value: "68,429", 
              change: "+8.7%", 
              icon: BookOpen, 
              color: "from-emerald-500 to-green-500",
              bgColor: "from-emerald-50 to-green-50" 
            },
            { 
              title: "Success Rate", 
              value: "98.2%", 
              change: "+0.5%", 
              icon: Target, 
              color: "from-violet-500 to-purple-500",
              bgColor: "from-violet-50 to-purple-50" 
            }
          ].map((stat, index) => (
            <HolographicCard key={index} className="group">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className={`border-0 bg-gradient-to-br ${stat.bgColor} backdrop-blur-xl shadow-ultra hover-lift`}>
                  <CardContent className="p-8 text-center relative">
                    <motion.div 
                      className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-neon`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <stat.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h4 className="text-3xl mb-2 text-gray-900">{stat.value}</h4>
                    <p className="text-gray-600 mb-2">{stat.title}</p>
                    <span className="text-green-600 text-sm flex items-center justify-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {stat.change}
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            </HolographicCard>
          ))}
        </motion.div>

        {/* Feature Showcase */}
        <motion.div className="mb-20" variants={itemVariants}>
          <div className="text-center mb-12">
            <motion.h3 
              className="text-5xl mb-6 gradient-text-glow"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Revolutionary Features
            </motion.h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience next-generation academic resource management with cutting-edge technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "AI-Powered Matching", desc: "Smart algorithms connect you with perfect resources", icon: Zap, color: "from-yellow-500 to-orange-500" },
              { title: "Blockchain Security", desc: "Immutable transaction records and trust verification", icon: Shield, color: "from-green-500 to-emerald-500" },
              { title: "Global Network", desc: "Connect with students worldwide for resource exchange", icon: Globe, color: "from-blue-500 to-indigo-500" },
              { title: "Premium Analytics", desc: "Deep insights into your academic resource portfolio", icon: BarChart3, color: "from-purple-500 to-violet-500" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -15, scale: 1.05 }}
                className="group"
              >
                <Card className="border-0 glass-ultra hover:shadow-neon transition-all duration-500 h-full">
                  <CardContent className="p-6 text-center">
                    <motion.div 
                      className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-2xl`}
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <feature.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <h4 className="text-lg mb-3 text-gray-900 group-hover:text-violet-700 transition-colors">{feature.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Profile Summary */}
        <motion.div className="max-w-5xl mx-auto" variants={itemVariants}>
          <HolographicCard>
            <Card className="border-0 card-ultra shadow-premium">
              <CardContent className="p-12">
                <motion.h3 
                  className="text-4xl text-center mb-12 gradient-text-glow"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  Your Academic Profile
                </motion.h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {[
                    { label: 'Student Name', value: userData.name, icon: User, color: 'from-blue-500 to-cyan-500' },
                    { label: 'Institution', value: userData.college, icon: Crown, color: 'from-violet-500 to-purple-500' },
                    { label: 'Contact', value: userData.phone, icon: UserCheck, color: 'from-emerald-500 to-green-500' },
                    { label: 'Email', value: userData.email, icon: Sparkles, color: 'from-pink-500 to-rose-500' }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="text-center p-8 glass-ultra rounded-3xl hover-lift group"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -10 }}
                    >
                      <motion.div 
                        className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-neon group-hover:shadow-2xl`}
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.6 }}
                      >
                        <item.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <span className="block text-sm text-gray-500 mb-3 uppercase tracking-wider">{item.label}</span>
                      <span className="text-gray-900 text-sm break-all group-hover:text-violet-700 transition-colors">{item.value}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.div 
                  className="mt-12 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                >
                  <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-full border border-emerald-200/30">
                    <Award className="w-5 h-5 text-emerald-600" />
                    <span className="text-emerald-700">Verified VIT Student</span>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Shield className="w-5 h-5 text-emerald-600" />
                    </motion.div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </HolographicCard>
        </motion.div>
      </motion.main>
    </div>
  );
}