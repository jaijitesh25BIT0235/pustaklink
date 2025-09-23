import React, { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { HomePage } from './components/HomePage';
import { LendBookPage } from './components/LendBookPage';
import { BorrowBooksPage } from './components/BorrowBooksPage';
import { BookContactPage } from './components/BookContactPage';
import { ProfilePage } from './components/ProfilePage';
import { WishlistPage } from './components/WishlistPage';
import { Book } from './components/BookCard';

type Page = 'login' | 'home' | 'lend' | 'borrow' | 'book-contact' | 'profile' | 'wishlist';

interface UserData {
  name: string;
  college: string;
  phone: string;
  email: string;
}

interface LentBook extends Book {
  dateIssued: string;
  returnDate: string;
  borrowerName: string;
  borrowerContact: string;
  status: 'active' | 'returned' | 'overdue';
}

interface BorrowedBook extends Book {
  dateIssued: string;
  returnDate: string;
  lenderContact: string;
  status: 'active' | 'returned' | 'overdue';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [wishlist, setWishlist] = useState<Book[]>([]);
  const [lentBooks, setLentBooks] = useState<LentBook[]>([]);
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);

  const handleLogin = (user: UserData) => {
    setUserData(user);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setUserData(null);
    setSelectedBook(null);
    setWishlist([]);
    setLentBooks([]);
    setBorrowedBooks([]);
    setCurrentPage('login');
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  const handleBookPosted = (book: Book) => {
    // Add to lent books with mock data
    const lentBook: LentBook = {
      ...book,
      dateIssued: new Date().toISOString().split('T')[0],
      returnDate: new Date(Date.now() + book.borrowDuration * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      borrowerName: 'Available for lending',
      borrowerContact: 'Pending',
      status: 'active'
    };
    setLentBooks(prev => [...prev, lentBook]);
    setCurrentPage('home');
  };

  const handleBorrowNow = (book: Book) => {
    setSelectedBook(book);
    setCurrentPage('book-contact');
  };

  const handleConfirmBorrow = (book: Book) => {
    // Add to borrowed books after contacting the owner
    const borrowedBook: BorrowedBook = {
      ...book,
      dateIssued: new Date().toISOString().split('T')[0],
      returnDate: new Date(Date.now() + book.borrowDuration * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      lenderContact: book.lenderPhone,
      status: 'active' as const
    };
    
    setBorrowedBooks(prev => [...prev, borrowedBook]);
    setCurrentPage('profile');
  };

  const handleAddToWishlist = (book: Book) => {
    if (!wishlist.find(item => item.id === book.id)) {
      setWishlist(prev => [...prev, book]);
    }
  };

  const handleRemoveFromWishlist = (bookId: string) => {
    setWishlist(prev => prev.filter(book => book.id !== bookId));
  };

  if (!userData) {
    return <LoginPage onLogin={handleLogin} />;
  }

  switch (currentPage) {
    case 'home':
      return (
        <HomePage
          userData={userData}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      );
    
    case 'lend':
      return (
        <LendBookPage
          userData={userData}
          onBack={() => handleNavigate('home')}
          onBookPosted={handleBookPosted}
        />
      );
    
    case 'borrow':
      return (
        <BorrowBooksPage
          userData={userData}
          onBack={() => handleNavigate('home')}
          onBorrowNow={handleBorrowNow}
          onAddToWishlist={handleAddToWishlist}
          wishlist={wishlist}
        />
      );

    case 'book-contact':
      if (!selectedBook) {
        return (
          <BorrowBooksPage
            userData={userData}
            onBack={() => handleNavigate('home')}
            onBorrowNow={handleBorrowNow}
            onAddToWishlist={handleAddToWishlist}
            wishlist={wishlist}
          />
        );
      }
      return (
        <BookContactPage
          book={selectedBook}
          userData={userData}
          onBack={() => handleNavigate('borrow')}
          onConfirmBorrow={handleConfirmBorrow}
          onAddToWishlist={handleAddToWishlist}
          isInWishlist={wishlist.some(w => w.id === selectedBook.id)}
        />
      );

    case 'profile':
      return (
        <ProfilePage
          userData={userData}
          lentBooks={lentBooks}
          borrowedBooks={borrowedBooks}
          onBack={() => handleNavigate('home')}
          onNavigate={handleNavigate}
        />
      );

    case 'wishlist':
      return (
        <WishlistPage
          userData={userData}
          wishlist={wishlist}
          onBack={() => handleNavigate('home')}
          onRemoveFromWishlist={handleRemoveFromWishlist}
          onBorrowNow={handleBorrowNow}
        />
      );
    
    default:
      return (
        <HomePage
          userData={userData}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      );
  }
}