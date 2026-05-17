import React, { useState, useEffect } from 'react';

const ProfileSubscription = ({ playerId, initialPremiumStatus, initialBalance }) => {
    const [isPremium, setIsPremium] = useState(initialPremiumStatus);
    const [walletBalance, setWalletBalance] = useState(initialBalance);
    const [loading, setLoading] = useState(false);

    // Check URL params for Stripe success redirect
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
            body: JSON.stringify({ playerId, amount: 20 }) // Depositing $20 for demo
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
            window.location.href = data.url; // Redirect to Stripe Checkout
        }
        setLoading(false);
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-6">
            <div>
                <h2 className="text-xl font-bold">Premium Status</h2>
                {isPremium ? (
                    <span className="inline-block mt-2 px-3 py-1 bg-green-200 text-green-800 rounded-full font-semibold">
            Premium Member 🌟
          </span>
                ) : (
                    <span className="inline-block mt-2 px-3 py-1 bg-gray-200 text-gray-800 rounded-full font-semibold">
            Standard Member
          </span>
                )}
            </div>

            {!isPremium && (
                <>
                    <div className="border-t pt-4">
                        <h3 className="font-semibold text-lg">Local Wallet</h3>
                        <p className="text-gray-600 mb-2">Balance: ${walletBalance}.00</p>
                        <div className="flex space-x-2">
                            <button
                                onClick={handleDeposit}
                                className="px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                            >
                                Deposit $20
                            </button>
                            <button
                                onClick={payWithWallet}
                                disabled={loading}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                            >
                                Pay $10 from Wallet
                            </button>
                        </div>
                    </div>

                    <div className="border-t pt-4">
                        <h3 className="font-semibold text-lg mb-2">Credit Card</h3>
                        <button
                            onClick={payWithStripe}
                            disabled={loading}
                            className="w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
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