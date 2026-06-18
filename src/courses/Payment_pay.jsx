import React, { useState } from 'react';
import {
    ChevronRight,
    Check,
    CreditCard,
    Wallet,
    CheckCircle2,
    Tag,
    ShieldCheck,
    Clock,
    Lock,
    Sparkles,
    X
} from 'lucide-react';
import './Payment_pay.css';

const levelColors = {
    Beginner: { bg: '#eef9f0', text: '#16a34a', dot: '#22c55e' },
    Intermediate: { bg: '#fff7ed', text: '#c2410c', dot: '#f97316' },
    Advanced: { bg: '#faf5ff', text: '#7c3aed', dot: '#a855f7' },
};

const thumbColors = ['#0089EA', '#6366f1', '#0ea5e9'];

function Payment_pay() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const doneStep1 = currentStep >= 1;
    const doneStep2 = currentStep !== null;
    const doneStep3 = isSuccessModalOpen;
    const stepError = doneStep2 && !doneStep1;

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
            title: 'Adobe Illustrator logo brand',
            level: 'Intermediate',
            duration: '15h',
            price: 100,
        },
        {
            id: 3,
            title: 'Adobe After Effects motion graphics',
            level: 'Advanced',
            duration: '30h',
            price: 100,
        },
    ];

    const [selectedCourses, setSelectedCourses] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [discountCode, setDiscountCode] = useState('');

    const toggleCourse = (id) =>
        setSelectedCourses(prev =>
            prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
        );

    const subtotal = coursesData.filter(c => selectedCourses.includes(c.id)).reduce((s, c) => s + c.price, 0);
    const estimatedTax = subtotal > 0 ? 15 : 0;
    let discount = 0;
    const code_discount = "Moathhazeem";
    if (discountCode === code_discount) {
        discount = subtotal * 0.1;
    }
    const discountPercentage = subtotal > 0 ? (discount / subtotal) * 100 : 0;
    const total = subtotal + estimatedTax - discount;
    const discountLabel = discount > 0 ? '' : ' (NONE)';
    const done = isSuccessModalOpen;


    return (
        <div className="payment-page-wrapper">
            <div className="payment-bg-decor" aria-hidden="true">
                <span className="payment-blob payment-blob-1" />
                <span className="payment-blob payment-blob-2" />
            </div>

            <div className="payment-container">

                <nav className="payment-breadcrumbs" aria-label="Breadcrumb">
                    <a href="/">Home</a>
                    <ChevronRight size={14} />
                    <a href="/Explore">Courses</a>
                    <ChevronRight size={14} />
                    <a href="/Explore/Course">Course Details</a>
                    <ChevronRight size={14} />
                    <span className="current">Payment</span>
                </nav>

                <div className="payment-header">
                    <span className="payment-eyebrow">
                        <Sparkles size={13} />
                        Secure checkout
                    </span>
                    <h1>Checkout &amp; Payment</h1>
                    <p>Review your selected courses, choose a payment method, and finalize your order. No hidden fees.</p>
                    <div className="payment-trust-row">
                        <span><ShieldCheck size={14} /> SSL encrypted</span>
                        <span><Lock size={14} /> PCI compliant</span>
                        <span><CheckCircle2 size={14} /> 30-day refund</span>
                    </div>
                </div>

                <div className="payment-content">

                    <div className="payment-left">

                        <section className="payment-section" id="step-courses">
                            <div className="step-header">
                                <span className="step-pill">Step 1</span>
                                <div className="step-header-text">
                                    <h2>Your Selected Courses</h2>
                                    <p>Select what you want to learn today.</p>
                                </div>
                                <span className="step-count">{selectedCourses.length} selected</span>
                            </div>

                            <div className="courses-grid">
                                {coursesData.map((course, idx) => {
                                    const isSelected = selectedCourses.includes(course.id);
                                    const lv = levelColors[course.level] || levelColors.Beginner;
                                    const accent = thumbColors[idx % thumbColors.length];
                                    const initials = course.title.split(' ').slice(0, 2).map(w => w[0]).join('');
                                    return (
                                        <div
                                            key={course.id}
                                            className={`course-card${isSelected ? ' selected' : ''}`}
                                            onClick={() => {
                                                toggleCourse(course.id);
                                                if (isSelected) {
                                                    if (selectedCourses.length <= 1) {
                                                        setCurrentStep(0);
                                                    } else {
                                                        setCurrentStep(1);
                                                    }
                                                }
                                                else {
                                                    setCurrentStep(1);
                                                }

                                            }}
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={0}
                                            onKeyDown={e => e.key === ' ' && toggleCourse(course.id)}
                                        >
                                            <div className="course-card-check" >
                                                {isSelected
                                                    ? <div className="checkbox-checked"><Check size={12} strokeWidth={3} /></div>
                                                    : <div className="checkbox-unchecked" />}
                                            </div>
                                            <div className="course-card-details">
                                                <h3 className="course-card-title">{course.title}</h3>
                                                <div className="course-card-meta">
                                                    <span className="meta-badge" style={{ background: lv.bg, color: lv.text }}>
                                                        <span className="meta-dot" style={{ background: lv.dot }} />
                                                        {course.level}
                                                    </span>
                                                    <span className="meta-sep" />
                                                    <Clock size={11} />
                                                    <span>{course.duration}</span>
                                                </div>
                                                <div className="course-card-price">${course.price.toFixed(2)}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="courses-subtotal">
                                <span>Sub-total</span>
                                <strong>${subtotal.toFixed(2)}</strong>
                            </div>
                        </section>

                        <section className="payment-section" id="step-payment">
                            <div className="step-header">
                                <span className="step-pill">Step 2</span>
                                <div className="step-header-text">
                                    <h2>Payment Method</h2>
                                    <p>Select how you&apos;d like to pay. All transactions are secured.</p>
                                </div>
                            </div>

                            <div className="payment-methods-list">

                                <label
                                    id="method-card"
                                    className={`method-item${paymentMethod === 'card' ? ' selected' : ''}`}
                                >
                                    <div className="method-icon">
                                        <CreditCard size={22} />
                                    </div>
                                    <div className="method-details">
                                        <div className="method-title-row">
                                            <h3>Credit / Debit card</h3>
                                            <span className="method-badge">Recommended</span>
                                        </div>
                                        <p>Visa, Mastercard, AmEx — fast and secure.</p>
                                    </div>
                                    <div className="method-radio">
                                        <input
                                            type="radio"
                                            name="payment_method"
                                            value="card"
                                            checked={paymentMethod === 'card'}
                                            onChange={() => { setPaymentMethod('card'); setCurrentStep(2); }}
                                        />
                                        <div className="radio-custom" />
                                    </div>
                                </label>

                                <label
                                    id="method-paypal"
                                    className={`method-item${paymentMethod === 'paypal' ? ' selected' : ''}`}
                                >
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
                                            onChange={() => { setPaymentMethod('paypal'); setCurrentStep(2); }}
                                        />
                                        <div className="radio-custom" />
                                    </div>
                                </label>

                                <label
                                    id="method-applepay"
                                    className={`method-item${paymentMethod === 'apple' ? ' selected' : ''}`}
                                >
                                    <div className="method-icon">
                                        <Wallet size={22} />
                                    </div>
                                    <div className="method-details">
                                        <h3>Apple Pay</h3>
                                        <p>Quick checkout on Apple devices.</p>
                                    </div>
                                    <div className="method-radio">
                                        <input
                                            type="radio"
                                            name="payment_method"
                                            value="apple"
                                            checked={paymentMethod === 'apple'}
                                            onChange={() => { setPaymentMethod('apple'); setCurrentStep(2); }}
                                        />
                                        <div className="radio-custom" />
                                    </div>
                                </label>

                            </div>

                            <div className="security-note">
                                <ShieldCheck size={14} />
                                <span>All transactions are SSL-encrypted and PCI-DSS compliant.</span>
                            </div>
                        </section>

                    </div>

                    <div className="payment-right">
                        <div className="order-summary-card">
                            <div className="summary-accent" aria-hidden="true" />

                            <div className="checkout-progress">
                                <div className={`progress-step ${doneStep1 ? 'done' : stepError ? 'error' : ''}`}><span className="progress-dot">
                                    {doneStep1 ? (<Check size={10} strokeWidth={3} />) : (stepError ? (<X size={10} strokeWidth={3} />) : 1)}</span>
                                    <span>Courses</span>
                                </div>
                                <div className={`progress-line ${doneStep1 ? 'done' : stepError ? 'error' : ''}`} /><div className={`progress-step ${doneStep2 ? 'done' : ''}`}>
                                    <span className="progress-dot">
                                        {doneStep2 ? <Check size={10} strokeWidth={3} /> : 2}</span>
                                    <span>Payment</span>
                                </div>
                                <div className={`progress-line ${doneStep3 ? 'done' : ''}`} />
                                <div className={`progress-step ${doneStep3 ? 'done' : ''}`}>
                                    <span className="progress-dot">
                                        {doneStep3 ? <Check size={10} strokeWidth={3} /> : 3}</span>
                                    <span>Done</span>
                                </div>
                            </div>

                            <div className="summary-header">
                                <h2>Order Summary</h2>
                                <p className="summary-subtitle">Transparent pricing, always.</p>
                            </div>

                            <div className="summary-rows">
                                <div className="summary-row">
                                    <span>Subtotal ({selectedCourses.length} {selectedCourses.length === 1 ? 'course' : 'courses'})</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Estimated tax</span>
                                    <span>${estimatedTax.toFixed(2)}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Discount ({discountPercentage > 0 ? `${discountPercentage}%` : 0})</span>
                                    <span>${discount.toFixed(2)}</span>
                                </div>
                                <div className="summary-divider" />
                                <div className="summary-row total-row">
                                    <span>Total due</span>
                                    <span className="total-amount">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="discount-section">
                                <label htmlFor="coupon-input">Discount code</label>
                                <div className="discount-input-group">
                                    <div className="input-wrapper">
                                        <Tag size={15} className="tag-icon" aria-hidden="true" />
                                        <input
                                            id="coupon-input"
                                            type="text"
                                            placeholder="Enter coupon code"
                                            value={discountCode}
                                            onChange={(e) => setDiscountCode(e.target.value)}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <button className="apply-btn" type="button">Apply</button>
                                </div>
                            </div>

                            <div className="guarantee-alert">
                                <div className="guarantee-icon">
                                    <CheckCircle2 size={20} strokeWidth={2.5} />
                                </div>
                                <div className="guarantee-content">
                                    <h4>30-day return policy</h4>
                                    <p>Not satisfied? Request a full refund within 30 days — no questions asked.</p>
                                </div>
                            </div>

                            <button className="complete-purchase-btn" type="button" disabled={selectedCourses.length === 0 || !paymentMethod} onClick={() => setIsModalOpen(true)}>
                                <Lock size={16} />
                                Complete Purchase
                            </button>
                        </div>
                    </div>

                </div>
            </div>
            {isModalOpen && selectedCourses.length >= 1 && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>

                        {/* الهيدر أو رأس النافذة */}
                        <div className="modal-header">
                            <h3>🛒 Complete Your Purchase</h3>
                            <button className="close-modal-btn" onClick={() => setIsModalOpen(false)}>×</button>
                        </div>

                        {/* محتوى النافذة الداخلي */}
                        <div className="modal-body">
                            <div className="purchase-info-card">
                                <p className="purchase-message-title">Selected Courses</p>
                                <p className="purchase-count">{selectedCourses.length} course(s) ready for checkout</p>
                            </div>
                            <div className="purchase-courses-list">
                                {selectedCourses.map((courseId) => {
                                    const course = coursesData.find(c => c.id === courseId);
                                    if (!course) return null;
                                    return (
                                        <div key={course.id} className="purchase-course-item">
                                            <p className="purchase-course-name">{course.title}</p>
                                            <p className="purchase-course-price">${course.price.toFixed(2)}</p>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="price-section">
                                <span>Total Amount:</span>
                                <strong className="total-price">${total.toFixed(2)}</strong>
                            </div>
                        </div>

                        {/* الأزرار في الأسفل (Footer) */}
                        <div className="modal-footer">
                            <button className="cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                            <button className="confirm-purchase-btn" disabled={!paymentMethod} onClick={() => {
                                // 1. ضع هنا دالة إتمام الشراء الفعلية (مثل إرسال البيانات للخادم)
                                setCurrentStep(2);
                                // 2. إغلاق النافذة الأولى
                                setIsModalOpen(false);

                                // 3. فتح نافذة النجاح
                                setIsSuccessModalOpen(true);

                            }}>
                                Payment confirmation
                            </button>
                        </div>

                    </div>
                </div>
            )}
            {isSuccessModalOpen && (
                <div className="modal-overlay" onClick={() => setIsSuccessModalOpen(false)}>
                    <div className="modal-content success-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal-btn" onClick={() => setIsSuccessModalOpen(false)}>×</button>
                        <div className="success-icon">🎉</div>
                        <h2>Purchase Successful!</h2>
                        <p>Thank you for your purchase. Your courses are now ready in your dashboard.</p>

                        <div className="modal-footer" style={{ justifyContent: 'center' }}>
                            <button className="confirm-purchase-btn" onClick={() => setIsSuccessModalOpen(false)}>
                                Go to Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Payment_pay;
