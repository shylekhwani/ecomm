🛒 Trendora E-Commerce App:

A modern E-Commerce web application built with Next.js 14, TypeScript, Zustand, NextAuth, and TailwindCSS.
It supports Google Authentication, cart & wishlist management per user session, and a clean UI for browsing and purchasing products.


🚀 Features:

🔐 Google Authentication with NextAuth
🛍️ Product Management via Sanity CMS (headless CMS)
🛒 Persistent Shopping Cart (cart resets on logout to prevent data leakage)
💳 Stripe Payment Gateway for secure checkout
❤️ Add to Favorites/Wishlist
📦 Order Placement and Tracking
🌙 Responsive & Modern UI with Tailwind CSS
🖼️ Dynamic Product Images with Next.js Image Optimization


🛠️ Tech Stack

Frontend:
⚡ Next.js 14 (App Router, Server & Client Components)
🎨 Tailwind CSS
🖼️ Next/Image

Backend & Services:
🔐 NextAuth.js (Google OAuth)
🛍️ Sanity CMS (Product & Content Management)
💳 Stripe (Payment Gateway)

State Management:
🗂️ Zustand (Cart & Favorites state management)


📸 Screenshots:

![sample](./assest/Screenshot%20(1).png)

![sample](./assest/Screenshot%20(2).png)

![sample](./assest/Screenshot%20(3).png)

![sample](./assest/Screenshot%20(4).png)

![sample](./assest/Screenshot%20(5).png)


🔑 Key Learning Highlights:

- Solved cart persistence issue by tying cart/wishlist state to authenticated users.
- Ensured session cleanup on logout (cart & wishlist reset).
- Implemented server actions with Next.js App Router.
- Gained experience with Zustand global state and NextAuth session handling.


📌 Future Enhancements:

🛒 Integrate Payment Gateway (Stripe/Razorpay)
📦 Order History Page
⭐ Product Ratings & Reviews
🏷️ Admin Dashboard for product management