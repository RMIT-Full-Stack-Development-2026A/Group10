import React, { useState, useEffect } from 'react';
import './ProfileSubscription.css'; // Path to your new CSS file

const ProfileSubscription = ({ playerId, initialPremiumStatus, initialBalance }) => {
    const [isPremium, setIsPremium] = useState(initialPremiumStatus);
    const [walletBalance, setWalletBalance] = useState(initialBalance);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        if (query.get('success') === 'true' && query.get('playerId') === playerId) {
            confirmStripePayment();
        }
    }, [playerId]);

    const confirmStripePayment = async () => {
        await fetch('/api/subscription/stripe-success', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ playerId })
        });
        setIsPremium(true);
        alert('Stripe payment successful! You are now premium.');
    };

    const handleDeposit = async () => {
        const res = await fetch('/api/subscription/deposit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ playerId, amount: 20 })
        });
        const data = await res.json();
        setWalletBalance(data.balance);
    };

    const payWithWallet = async () => {
        setLoading(true);
        const res = await fetch('/api/subscription/wallet-pay', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ playerId })
        });

        if (res.ok) {
            setIsPremium(true);
            setWalletBalance(prev => prev - 10);
            alert('Subscribed successfully using Wallet!');
        } else {
            const data = await res.json();
            alert(data.message);
        }
        setLoading(false);
    };

    const payWithStripe = async () => {
        setLoading(true);
        const res = await fetch('/api/subscription/stripe-checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ playerId })
        });
        const data = await res.json();
        if (data.url) {
            window.location.href = data.url;
        }
        setLoading(false);
    };

    return (
        <div className="profile-sub-card">
            <div>
                <h2 className="sub-heading">Premium Status</h2>
                {isPremium ? (
                    <span className="sub-badge sub-badge-premium">
            Premium Member 🌟
          </span>
                ) : (
                    <span className="sub-badge sub-badge-standard">
            Standard Member
          </span>
                )}
            </div>

            {!isPremium && (
                <>
                    <div className="sub-section">
                        <h3 className="sub-section-title">Local Wallet</h3>
                        <p className="sub-text">Balance: ${walletBalance}.00</p>
                        <div className="btn-group">
                            <button
                                onClick={handleDeposit}
                                className="btn-sub btn-wallet-deposit"
                            >
                                Deposit $20
                            </button>
                            <button
                                onClick={payWithWallet}
                                disabled={loading}
                                className="btn-sub btn-wallet-pay"
                            >
                                Pay $10 from Wallet
                            </button>
                        </div>
                    </div>

                    <div className="sub-section">
                        <h3 className="sub-section-title">Credit Card</h3>
                        <button
                            onClick={payWithStripe}
                            disabled={loading}
                            className="btn-sub btn-stripe"
                        >
                            Pay $10 with Stripe
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProfileSubscription;