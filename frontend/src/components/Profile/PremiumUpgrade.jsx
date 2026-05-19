// src/components/Profile/PremiumUpgrade.jsx
import React, { useState, useEffect } from 'react';
import { paymentService } from '../../services/paymentService';
import { profileService } from '../../services/profileService';
import { Card } from '../common/Card';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

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

        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('success')) {
            setMessage('Stripe Payment Successful! You are now Premium.');
            setIsSuccess(true);
            setIsPremium(true);
            window.history.replaceState(null, '', window.location.pathname);
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

    const handleStripeCheckout = async () => {
        const response = await paymentService.createStripeCheckout();
        if (response.status === 200 && response.data?.url) {
            window.location.href = response.data.url;
        } else {
            setMessage(response.data?.message || 'Failed to initialize Stripe.');
            setIsSuccess(false);
        }
    };

    return (
        <Card title="Premium Subscription" className="premium-card card-lg">
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
                            <form onSubmit={handleDeposit} style={{ display: 'flex', gap: '10px', marginBottom: '20px', alignItems: 'flex-start' }}>
                                <div style={{ flex: 1 }}>
                                    <Input 
                                        type="number" min="1" placeholder="Amount to deposit ($)" 
                                        value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} required
                                    />
                                </div>
                                <div style={{ width: '150px' }}>
                                    <Button type="submit" variant="secondary">Deposit</Button>
                                </div>
                            </form>

                            <div style={{ display: 'flex', gap: '10px' }}>
                                <Button onClick={handleSubscribe} variant="primary">
                                    Pay with Wallet ($10)
                                </Button>
                                
                                {/* We can override our standard button background for Stripe's distinct purple color */}
                                <Button onClick={handleStripeCheckout} style={{ backgroundColor: '#635BFF', color: 'white' }}>
                                    💳 Pay with Stripe
                                </Button>
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
        </Card>
    );
};

export default PremiumUpgrade;