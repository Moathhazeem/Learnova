import React, { useState } from 'react';
import {
    ChevronRight,
    Check,
    CreditCard,
    Apple,
    CheckCircle2,
    Tag
} from 'lucide-react';
import './Payment_pay.css';

function Payment_pay() {
    const coursesData = [
        {
            id: 1,
            title: 'Adobe Photoshop social media',
            level: 'Beginner',
            duration: '7h',
            price: 80,
        },
        {
            id: 2,
            title: 'Adobe illustrator logo brand',
            level: 'Intermediate',
            duration: '15h',
            price: 100,
        },
        {
            id: 3,
            title: 'Adobe after effect motion graphics',
            level: 'Advanced',
            duration: '30h',
            price: 100,
        }
    ];

    const [selectedCourses, setSelectedCourses] = useState([1, 2]);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [discountCode, setDiscountCode] = useState('');

    const toggleCourse = (id) => {
        setSelectedCourses(prev =>
            prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
        );
    };

    const getSubtotal = () => {
        return coursesData
            .filter(c => selectedCourses.includes(c.id))
            .reduce((sum, course) => sum + course.price, 0);
    };

    const subtotal = getSubtotal();
    const estimatedTax = 0;
    const discount = 0;
    const total = subtotal + estimatedTax - discount;

    return (
        <div className="payment-page-wrapper">
        <div className="payment-container">
            {/* Breadcrumbs */}
            <nav className="payment-breadcrumbs">
                <a href="/">Home</a>
                <ChevronRight size={16} />
                <a href="/courses">Courses</a>
                <ChevronRight size={16} />
                <a href="/course-details">Course Details</a>
                <ChevronRight size={16} />
                <a href="/checkout">Checkout</a>
                <ChevronRight size={16} />
                <span className="current">Payment</span>
            </nav>

            {/* Page Title */}
            <div className="payment-header">
                <h1>Payment</h1>
                <p>Choose your courses, apply a discount coupon, and pay with your preferred method. We'll show every line item—no surprises.</p>
            </div>

            {/* Main Content */}
            <div className="payment-content">

                {/* Left Column */}
                <div className="payment-left">
                    {/* Courses List */}
                    <section className="payment-section">
                        <div className="section-header">
                            <div className="header-text">
                                <h2>Your courses</h2>
                                <p>Select what you want to learn today.</p>
                            </div>
                            <div className="selected-count">
                                <span>Selected</span>
                                <strong>{selectedCourses.length}</strong>
                            </div>
                        </div>

                        <div className="courses-list">
                            {coursesData.map(course => {
                                const isSelected = selectedCourses.includes(course.id);
                                return (
                                    <div
                                        key={course.id}
                                        className={`course-item ${isSelected ? 'selected' : ''}`}
                                        onClick={() => toggleCourse(course.id)}
                                    >
                                        <div className="course-checkbox">
                                            {isSelected ? (
                                                <div className="checkbox-checked"><Check size={14} strokeWidth={3} /></div>
                                            ) : (
                                                <div className="checkbox-unchecked"></div>
                                            )}
                                        </div>
                                        <div className="course-details">
                                            <h3>{course.title}</h3>
                                            <div className="course-meta">
                                                <span>{course.level}</span>
                                                <span>•</span>
                                                <span>{course.duration}</span>
                                            </div>
                                        </div>
                                        <div className="course-price">
                                            ${course.price.toFixed(2)}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* Payment Methods */}
                    <section className="payment-section">
                        <div className="section-header">
                            <div className="header-text">
                                <h2>Payment method</h2>
                                <p>Select your preferred payment method</p>
                            </div>
                        </div>

                        <div className="payment-methods-list">
                            {/* Card */}
                            <label className={`method-item ${paymentMethod === 'card' ? 'selected' : ''}`}>
                                <div className="method-icon">
                                    <CreditCard size={24} />
                                </div>
                                <div className="method-details">
                                    <h3>Credit / Debit card</h3>
                                    <p>Visa, Mastercard, AmEx. Fast and secure.</p>
                                </div>
                                <div className="method-radio">
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        value="card"
                                        checked={paymentMethod === 'card'}
                                        onChange={() => setPaymentMethod('card')}
                                    />
                                    <div className="radio-custom"></div>
                                </div>
                            </label>

                            {/* PayPal */}
                            <label className={`method-item ${paymentMethod === 'paypal' ? 'selected' : ''}`}>
                                <div className="method-icon paypal-icon">
                                    <span className="p-blue-dark">P</span>
                                    <span className="p-blue-light">P</span>
                                </div>
                                <div className="method-details">
                                    <h3>PayPal</h3>
                                    <p>Pay with your PayPal balance or linked account.</p>
                                </div>
                                <div className="method-radio">
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        value="paypal"
                                        checked={paymentMethod === 'paypal'}
                                        onChange={() => setPaymentMethod('paypal')}
                                    />
                                    <div className="radio-custom"></div>
                                </div>
                            </label>

                            {/* Apple Pay */}
                            <label className={`method-item ${paymentMethod === 'apple' ? 'selected' : ''}`}>
                                <div className="method-icon">
                                    <Apple size={24} />
                                    <span className="apple-pay-text">Pay</span>
                                </div>
                                <div className="method-details">
                                    <h3>Apple Pay</h3>
                                    <p>Quick checkout on compatible devices.</p>
                                </div>
                                <div className="method-radio">
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        value="apple"
                                        checked={paymentMethod === 'apple'}
                                        onChange={() => setPaymentMethod('apple')}
                                    />
                                    <div className="radio-custom"></div>
                                </div>
                            </label>
                        </div>
                    </section>
                </div>

                {/* Right Column */}
                <div className="payment-right">
                    <div className="order-summary-card">
                        <h2>Order summary</h2>
                        <p className="summary-subtitle">Transparent pricing, always.</p>

                        <div className="summary-rows">
                            <div className="summary-row">
                                <span>Subtotal ({selectedCourses.length} courses)</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Estimated tax</span>
                                <span>${estimatedTax.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Discount</span>
                                <span className="discount-value">${discount.toFixed(2)}</span>
                            </div>
                            <div className="summary-row total-row">
                                <span>Total due</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="discount-section">
                            <label>Discount code</label>
                            <div className="discount-input-group">
                                <div className="input-wrapper">
                                    <Tag size={18} className="tag-icon" />
                                    <input
                                        type="text"
                                        placeholder="Enter coupon code"
                                        value={discountCode}
                                        onChange={(e) => setDiscountCode(e.target.value)}
                                    />
                                </div>
                                <button className="apply-btn">Apply</button>
                            </div>
                        </div>

                        <button className="complete-purchase-btn">
                            Complete purchase
                        </button>

                        <div className="guarantee-alert">
                            <div className="guarantee-icon">
                                <CheckCircle2 size={24} strokeWidth={2.5} />
                            </div>
                            <div className="guarantee-content">
                                <h4>30-day return policy</h4>
                                <p>If the course isn't the right fit, request a refund within 30 days—no hassle.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        </div>
    );
}

export default Payment_pay;
