import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, CreditCard, Trash2, ShoppingBag } from 'lucide-react';
import { Book } from './BookCard';

interface CartPageProps {
  cart: Book[];
  userData: {
    name: string;
    college: string;
    phone: string;
    email: string;
  };
  onBack: () => void;
  onRemoveFromCart: (bookId: string) => void;
  onProceedToPayment: (cart: Book[]) => void;
}

export function CartPage({ cart, userData, onBack, onRemoveFromCart, onProceedToPayment }: CartPageProps) {
  const subtotal = cart.reduce((sum, book) => sum + book.salePrice, 0);
  const deliveryFee = cart.length > 0 ? 50 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Shopping Cart
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {cart.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Start browsing books to add them to your cart</p>
            <Button onClick={onBack} className="bg-blue-600 hover:bg-blue-700">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl mb-4">Items in your cart ({cart.length})</h2>
              
              {cart.map((book) => (
                <Card key={book.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-20 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-gray-500">Book</span>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="truncate">{book.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">by {book.author}</p>
                        <p className="text-xs text-gray-500 mt-1">{book.subject}</p>
                        
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-baseline gap-2">
                            <span className="text-lg text-green-600">₹{book.salePrice}</span>
                            <span className="text-sm text-gray-500 line-through">₹{book.mrp}</span>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onRemoveFromCart(book.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="text-xs text-gray-500 mt-2">
                          Seller: {book.sellerName} • {book.sellerCollege}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({cart.length} items)</span>
                    <span>₹{subtotal}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee</span>
                    <span>₹{deliveryFee}</span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg">
                      <span>Total</span>
                      <span className="text-green-600">₹{total}</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => onProceedToPayment(cart)}
                    className="w-full bg-blue-600 hover:bg-blue-700 mt-6"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Proceed to Payment
                  </Button>
                </CardContent>
              </Card>

              {/* Buyer Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Delivery Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500">Name:</span>
                    <span className="ml-2">{userData.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">College:</span>
                    <span className="ml-2">{userData.college}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Phone:</span>
                    <span className="ml-2">{userData.phone}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Email:</span>
                    <span className="ml-2">{userData.email}</span>
                  </div>
                </CardContent>
              </Card>

              <div className="text-xs text-gray-500 bg-blue-50 p-3 rounded">
                <p>💡 <strong>Tip:</strong> Contact sellers directly for faster delivery and potential discounts on multiple books!</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}