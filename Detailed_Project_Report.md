# detailed_project_report.pdf (Source Content)

## Project Title

**HunarHub – Digital Marketplace for Local Micro-Entrepreneurs**

## 1. Context & Problem Statement

Millions of micro-entrepreneurs (cobblers, potters, tailors, artisans) possess valuable skills but lack digital visibility. They rely on foot traffic, limiting their income.
**Problem**:

- No digital presence or marketing reach.
- Limited customer discovery.
- No structured way to accept service requests.
- Dependency on middlemen.

## 2. Objectives

**Primary**:

- Digitally connect local micro-entrepreneurs with customers.
- Enable service booking and product selling from one platform.
- Promote traditional skills and handmade products.
  **Secondary**:
- Encourage local/sustainable commerce.
- Reduce dependency on middlemen.

## 3. Scope of Work

**In-Scope**:

- Web-based responsive platform.
- Entrepreneur profiles & service listings.
- Product marketplace for handmade items.
- Order/Service request management.
- Admin dashboard for verification.

**Out of Scope**:

- Native mobile apps (Android/iOS).
- International shipping logistics.

## 4. Functional Requirements

**Customer**:

- Registration/Login.
- Browse/Filter Entrepreneurs (Skill, Location, Price).
- View Profiles & Products.
- Place Service Requests & Buy Products.
- Order History & Reviews.

**Micro-Entrepreneur**:

- Profile Management (Business Name, Skills).
- Product Listing (CRUD).
- Order/Request Management (Accept/Reject).
- Sales Dashboard.

**Admin**:

- User Verification.
- Platform Analytics (Users, Sales).

## 5. Technology Stack

- **Frontend**: React.js, Tailwind CSS (Vite build).
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Atlas).
- **Storage**: Local/Cloud (Implemented Drag & Drop Upload).
- **Authentication**: JWT (JSON Web Tokens).
- **Deployment**: Vercel (Frontend/Backend).

## 6. User Flow

1.  **Registration**: User signs up as "Customer" or "Entrepreneur".
2.  **Onboarding**: Entrepreneur updates profile with business details.
3.  **Discovery**: Customer searches for "Potter" or "Tailor".
4.  **Transaction**:
    - _Service_: Customer sends specific request -> Entrepreneur accepts -> Work done.
    - _Product_: Customer adds to cart -> Buys -> Entrepreneur sees order in Dashboard.
5.  **Completion**: Order marked as delivered.

## 7. Data Entities (Schema)

- **User**: Name, Email, Password, Role (Customer/Entrepreneur/Admin), Address.
- **Entrepreneur**: Business Name, Description, Location, Linked User ID.
- **Product**: Title, Price, Description, Image, Stock, Category, Entrepreneur ID.
- **Order**: Customer ID, Items, Total Amount, Status (Pending/Shipped).
- **ServiceRequest**: Customer ID, Type, Description, Status (Pending/Accepted).

## 8. Key Performance Indicators (KPIs)

- Registered Entrepreneurs count.
- Product Sales Volume.
- Service Request Conversion Rate.

## 9. Future Enhancements

- Mobile Application.
- Integrated Payment Gateway (Razorpay/Stripe).
- Delivery Partner Integration.
