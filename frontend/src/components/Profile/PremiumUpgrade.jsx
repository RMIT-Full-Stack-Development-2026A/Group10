// src/components/Profile/PremiumUpgrade.jsx
import React, { useState, useEffect } from 'react';
import { paymentService } from '../../services/paymentService';
import { profileService } from '../../services/profileService';

const PremiumUpgrade = () => {
    const [balance, setBalance] = useState(0);
    const [isPremium, setIsPremium] = useState(false);
    const [depositAmount, setDepositAmount] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const loadProfile = async () => {
            const response = await profileService.getProfile('me');
            if (response.data) {
                setBalance(response.data.walletBalance || 0);
                setIsPremium(response.data.isPremium || false);
            }
        };
        loadProfile();

        // Check if we just came back from a successful Stripe payment
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('success')) {
            setMessage('Stripe Payment Successful! You are now Premium.');
            setIsSuccess(true);
            setIsPremium(true);
            window.history.replaceState(null, '', window.location.pathname); // Clean up the URL
        }
        if (urlParams.get('canceled')) {
            setMessage('Stripe Payment Canceled.');
            setIsSuccess(false);
            window.history.replaceState(null, '', window.location.pathname);
        }
    }, []);

    const handleDeposit = async (e) => {
        e.preventDefault();
        const response = await paymentService.deposit(Number(depositAmount));
        if (response.status === 200 && response.data) {
            setBalance(response.data.walletBalance);
            setMessage(`Deposited $${depositAmount} successfully!`);
            setIsSuccess(true);
            setDepositAmount('');
        } else {
            setMessage(response.data?.message || 'Deposit failed.');
            setIsSuccess(false);
        }
    };

    const handleSubscribe = async () => {
        const response = await paymentService.subscribeWallet();
        if (response.status === 200 && response.data) {
            setBalance(response.data.walletBalance);
            setIsPremium(true);
            setMessage('Congratulations! You are now a Premium Member!');
            setIsSuccess(true);
        } else {
            setMessage(response.data?.message || 'Subscription failed.');
            setIsSuccess(false);
        }
    };

    // Handle the Stripe click
    const handleStripeCheckout = async () => {
        const response = await paymentService.createStripeCheckout();
        if (response.status === 200 && response.data?.url) {
            // Redirect the user completely to Stripe's secure page
            window.location.href = response.data.url;
        } else {
            setMessage(response.data?.message || 'Failed to initialize Stripe.');
            setIsSuccess(false);
        }
    };

    return (
        <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginBottom: '20px', color: '#4CAF50', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
                Premium Subscription
            </h3>
            
            <div style={{ display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', textAlign: 'center', border: '1px solid #e0e0e0' }}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#555' }}>Local Wallet Balance</h4>
                    <h1 style={{ margin: '0', color: '#333', fontSize: '36px' }}>${balance.toFixed(2)}</h1>
                    <p style={{ marginTop: '10px', fontWeight: 'bold', color: isPremium ? '#ff9800' : '#757575' }}>
                        {isPremium ? '⭐ Premium Member' : 'Standard Account'}
                    </p>
                </div>

                <div style={{ flex: 2 }}>
                    {message && (
                        <div style={{ padding: '10px', marginBottom: '15px', borderRadius: '4px', backgroundColor: isSuccess ? '#e8f5e9' : '#ffebee', color: isSuccess ? '#2e7d32' : '#c62828', border: `1px solid ${isSuccess ? '#c8e6c9' : '#ffcdd2'}` }}>
                            {message}
                        </div>
                    )}

                    {!isPremium ? (
                        <>
                            <form onSubmit={handleDeposit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                                <input 
                                    type="number" min="1" placeholder="Amount to deposit ($)" 
                                    value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)}
                                    style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} required
                                />
                                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                                    Deposit Funds
                                </button>
                            </form>

                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button onClick={handleSubscribe} style={{ flex: 1, padding: '15px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' }}>
                                    Pay with Wallet ($10)
                                </button>
                                
                                <button onClick={handleStripeCheckout} style={{ flex: 1, padding: '15px', backgroundColor: '#635BFF', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' }}>
                                    💳 Pay with Stripe
                                </button>
                            </div>
                        </>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#fff8e1', border: '1px solid #ffe082', borderRadius: '8px' }}>
                            <h3 style={{ color: '#ff8f00', margin: '0 0 10px 0' }}>Thank you for your support!</h3>
                            <p style={{ margin: 0, color: '#555' }}>You have full access to all premium features.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PremiumUpgrade;