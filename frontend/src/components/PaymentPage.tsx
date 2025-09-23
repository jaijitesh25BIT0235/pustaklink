import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { ArrowLeft, CreditCard, Shield, CheckCircle } from 'lucide-react';
import { Book } from './BookCard';

interface PaymentPageProps {
  cart: Book[];
  userData: {
    name: string;
    college: string;
    phone: string;
    email: string;
  };
  onBack: () => void;
  onPaymentComplete: () => void;
}

export function PaymentPage({ cart, userData, onBack, onPaymentComplete }: PaymentPageProps) {
  const [paymentData, setPaymentData] = useState({
    paymentMethod: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    upiId: ''
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const subtotal = cart.reduce((sum, book) => sum + book.salePrice, 0);
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePaymentMethodChange = (value: string) => {
    setPaymentData(prev => ({ ...prev, paymentMethod: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      
      // Auto redirect after success
      setTimeout(() => {
        onPaymentComplete();
      }, 3000);
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="text-center p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl mb-4">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">
              Your order has been placed successfully. You will receive seller contact details via email shortly.
            </p>
            <div className="text-sm text-gray-500 mb-6">
              <p>Order Total: ₹{total}</p>
              <p>Books Purchased: {cart.length}</p>
            </div>
            <Button onClick={onPaymentComplete} className="w-full">
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Payment
          </h1>
          <div className="flex items-center gap-2 ml-auto">
            <Shield className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-600">Secure Payment</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <Label>Payment Method</Label>
                    <Select onValueChange={handlePaymentMethodChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="card">Credit/Debit Card</SelectItem>
                        <SelectItem value="upi">UPI</SelectItem>
                        <SelectItem value="netbanking">Net Banking</SelectItem>
                        <SelectItem value="wallet">Digital Wallet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {paymentData.paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          placeholder="Name on card"
                          value={paymentData.cardName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={paymentData.cardNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={paymentData.expiryDate}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            placeholder="123"
                            value={paymentData.cvv}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentData.paymentMethod === 'upi' && (
                    <div className="space-y-2">
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input
                        id="upiId"
                        name="upiId"
                        placeholder="yourname@upi"
                        value={paymentData.upiId}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  )}

                  {paymentData.paymentMethod === 'netbanking' && (
                    <div className="space-y-2">
                      <Label>Select Bank</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose your bank" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sbi">State Bank of India</SelectItem>
                          <SelectItem value="hdfc">HDFC Bank</SelectItem>
                          <SelectItem value="icici">ICICI Bank</SelectItem>
                          <SelectItem value="axis">Axis Bank</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {paymentData.paymentMethod === 'wallet' && (
                    <div className="space-y-2">
                      <Label>Digital Wallet</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose wallet" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="paytm">Paytm</SelectItem>
                          <SelectItem value="phonepe">PhonePe</SelectItem>
                          <SelectItem value="gpay">Google Pay</SelectItem>
                          <SelectItem value="amazonpay">Amazon Pay</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700" 
                    disabled={!paymentData.paymentMethod || isProcessing}
                  >
                    {isProcessing ? 'Processing Payment...' : `Pay ₹${total}`}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cart.map((book, index) => (
                    <div key={book.id}>
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm truncate">{book.title}</p>
                          <p className="text-xs text-gray-500">{book.author}</p>
                          <p className="text-xs text-gray-500">{book.sellerName}</p>
                        </div>
                        <p className="text-sm">₹{book.salePrice}</p>
                      </div>
                      {index < cart.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                  
                  <Separator />
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal ({cart.length} items)</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>₹{deliveryFee}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg">
                      <span>Total</span>
                      <span className="text-green-600">₹{total}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Delivery Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>{userData.name}</p>
                <p>{userData.college}</p>
                <p>{userData.phone}</p>
                <p>{userData.email}</p>
              </CardContent>
            </Card>

            <div className="text-xs text-gray-500 bg-yellow-50 p-3 rounded">
              <p>📞 <strong>Note:</strong> After payment, you'll receive seller contact details to coordinate book pickup/delivery directly with them.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}