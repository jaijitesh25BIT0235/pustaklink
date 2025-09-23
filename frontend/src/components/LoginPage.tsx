import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { AlertCircle, BookOpen, Crown, Shield, Sparkles, Zap, Globe, Users, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { FloatingParticles, MorphingBlob, GradientOrb, SpotlightEffect, HolographicCard } from './ui/visual-effects';

interface LoginPageProps {
  onLogin: (userData: {
    name: string;
    college: string;
    phone: string;
    email: string;
  }) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    college: '',
    phone: '',
    email: ''
  });
  const [error, setError] = useState('');

  const validateEmail = (email: string): boolean => {
    return email.toLowerCase().endsWith('vitstudent.ac.in');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.name && formData.college && formData.phone && formData.email) {
      if (!validateEmail(formData.email)) {
        setError('Access not permitted. Please use your VIT student email ID ending with vitstudent.ac.in');
        return;
      }
      onLogin(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    
    // Clear error when user starts typing in email field
    if (e.target.name === 'email' && error) {
      setError('');
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen relative overflow-hidden particle-bg mesh-bg">
      {/* Advanced Background System */}
      <FloatingParticles />
      
      {/* Multiple Gradient Orbs */}
      <GradientOrb size="w-[600px] h-[600px]" position="top-0 left-0" gradient="from-violet-500/20 to-blue-500/20" />
      <GradientOrb size="w-[500px] h-[500px]" position="bottom-0 right-0" gradient="from-emerald-500/20 to-cyan-500/20" />
      <GradientOrb size="w-[400px] h-[400px]" position="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" gradient="from-pink-500/15 to-rose-500/15" />
      
      <MorphingBlob className="w-96 h-96 top-20 right-20" color="purple" />
      <MorphingBlob className="w-80 h-80 bottom-20 left-20" color="blue" />
      
      {/* Premium overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-transparent to-slate-50/80 pointer-events-none"></div>
      
      <div className="min-h-screen flex items-center justify-center p-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl w-full items-center">
          
          {/* Left Side - Branding */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <motion.div 
              className="flex items-center justify-center lg:justify-start gap-4 mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="w-20 h-20 bg-gradient-to-br from-violet-600 via-blue-600 to-cyan-500 rounded-3xl flex items-center justify-center shadow-neon hover-glow"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Crown className="w-10 h-10 text-white" />
              </motion.div>
              <div>
                <h1 className="text-6xl gradient-text-glow tracking-tight animate-text-glow">
                  PustakLink
                </h1>
                <p className="text-lg text-gray-600 flex items-center gap-2 justify-center lg:justify-start">
                  <Globe className="w-5 h-5" />
                  Premium Academic Exchange
                </p>
              </div>
            </motion.div>

            <motion.h2 
              className="text-4xl mb-6 text-gray-800 leading-tight"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Join the Future of <br />
              <span className="gradient-text">Academic Sharing</span>
            </motion.h2>

            <motion.p 
              className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Connect with fellow VIT students in our exclusive academic resource sharing platform. 
              Experience free, secure, and intelligent book exchange.
            </motion.p>

            {/* Feature Icons */}
            <motion.div 
              className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {[
                { icon: Shield, label: "Secure Platform", color: "from-green-500 to-emerald-500" },
                { icon: Users, label: "VIT Community", color: "from-blue-500 to-indigo-500" },
                { icon: Award, label: "Premium Features", color: "from-purple-500 to-violet-500" }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm text-gray-600">{feature.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <HolographicCard className="max-w-md mx-auto">
              <SpotlightEffect>
                <Card className="border-0 glass-ultra shadow-premium hover:shadow-premium-hover transition-all duration-500">
                  <CardHeader className="text-center pb-8">
                    <motion.div 
                      className="w-16 h-16 bg-gradient-to-br from-violet-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-neon"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <BookOpen className="w-8 h-8 text-white" />
                    </motion.div>
                    <CardTitle className="text-3xl gradient-text-glow mb-3">
                      Welcome Back
                    </CardTitle>
                    <CardDescription className="text-lg text-gray-600">
                      Enter your VIT credentials to access the platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <motion.form 
                      onSubmit={handleSubmit} 
                      className="space-y-6"
                      variants={formVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.div className="space-y-3" variants={itemVariants}>
                        <Label htmlFor="name" className="text-gray-700 flex items-center gap-2">
                          <Crown className="w-4 h-4 text-violet-600" />
                          Student Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="h-12 glass border-0 placeholder:text-gray-400 focus:ring-2 focus:ring-violet-500/50 transition-all duration-300"
                        />
                      </motion.div>
                      
                      <motion.div className="space-y-3" variants={itemVariants}>
                        <Label htmlFor="college" className="text-gray-700 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-blue-600" />
                          College Name
                        </Label>
                        <Input
                          id="college"
                          name="college"
                          type="text"
                          placeholder="Enter your college name"
                          value={formData.college}
                          onChange={handleChange}
                          required
                          className="h-12 glass border-0 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                        />
                      </motion.div>
                      
                      <motion.div className="space-y-3" variants={itemVariants}>
                        <Label htmlFor="phone" className="text-gray-700 flex items-center gap-2">
                          <Zap className="w-4 h-4 text-emerald-600" />
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="h-12 glass border-0 placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500/50 transition-all duration-300"
                        />
                      </motion.div>
                      
                      <motion.div className="space-y-3" variants={itemVariants}>
                        <Label htmlFor="email" className="text-gray-700 flex items-center gap-2">
                          <Shield className="w-4 h-4 text-green-600" />
                          VIT Student Email ID
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="yourname@vitstudent.ac.in"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className={`h-12 glass border-0 placeholder:text-gray-400 focus:ring-2 transition-all duration-300 ${
                            error ? 'focus:ring-red-500/50 ring-2 ring-red-500/50' : 'focus:ring-green-500/50'
                          }`}
                        />
                        <p className="text-xs text-gray-500 flex items-center gap-2">
                          <Globe className="w-3 h-3" />
                          Please use your official VIT student email ending with @vitstudent.ac.in
                        </p>
                      </motion.div>
                      
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <Alert className="border-0 bg-red-50/80 backdrop-blur-xl">
                            <AlertCircle className="h-4 w-4 text-red-600" />
                            <AlertDescription className="text-red-700">
                              {error}
                            </AlertDescription>
                          </Alert>
                        </motion.div>
                      )}
                      
                      <motion.div variants={itemVariants}>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button 
                            type="submit" 
                            className="w-full h-12 bg-gradient-to-r from-violet-600 via-blue-600 to-indigo-600 hover:from-violet-700 hover:via-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                          >
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              initial={{ x: "-100%" }}
                              whileHover={{ x: "100%" }}
                              transition={{ duration: 0.6 }}
                            />
                            <BookOpen className="w-5 h-5 mr-2" />
                            Enter PustakLink
                          </Button>
                        </motion.div>
                      </motion.div>

                      <motion.div 
                        className="text-center pt-4"
                        variants={itemVariants}
                      >
                        <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                          <Shield className="w-4 h-4 text-green-500" />
                          Secure • Verified • Exclusive for VIT Students
                        </p>
                      </motion.div>
                    </motion.form>
                  </CardContent>
                </Card>
              </SpotlightEffect>
            </HolographicCard>
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center gap-8 glass-ultra px-6 py-3 rounded-full">
            <div className="text-center">
              <div className="text-lg gradient-text">15,247</div>
              <div className="text-xs text-gray-600">Active Students</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-lg gradient-text">68,429</div>
              <div className="text-xs text-gray-600">Books Shared</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-lg gradient-text">98.2%</div>
              <div className="text-xs text-gray-600">Success Rate</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}