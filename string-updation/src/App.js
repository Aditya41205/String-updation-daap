import React, { useState } from 'react';
import { BrowserProvider, Contract } from 'ethers';

const contractAddress = '0xD177F3162975474fCBa67cCf41ceE7C1e25bd4d9';
const contractABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "string_",
                "type": "string"
            }
        ],
        "name": "daap",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "stringreturn",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

function App() {
    const [walletAddress, setWalletAddress] = useState('');
    const [inputString, setInputString] = useState('');
    const [retrievedString, setRetrievedString] = useState('');
    const [error, setError] = useState('');

    const connectWallet = async () => {
        if (!window.ethereum) {
            setError('Please install MetaMask to interact with the blockchain.');
            return;
        }

        try {
            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            setWalletAddress(await signer.getAddress());
            setError('');
        } catch (err) {
            setError(err.message || 'An error occurred while connecting the wallet.');
        }
    };

    const handleSetString = async () => {
        if (!walletAddress) {
            setError('Please connect your wallet first.');
            return;
        }

        try {
            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new Contract(contractAddress, contractABI, signer);

            const tx = await contract.daap(inputString);
            await tx.wait();
            setInputString('');
            alert('String updated successfully!');
        } catch (err) {
            setError(err.message || 'An error occurred while setting the string.');
        }
    };

    const handleGetString = async () => {
        if (!walletAddress) {
            setError('Please connect your wallet first.');
            return;
        }

        try {
            const provider = new BrowserProvider(window.ethereum);
            const contract = new Contract(contractAddress, contractABI, provider);

            const result = await contract.stringreturn();
            setRetrievedString(result);
        } catch (err) {
            setError(err.message || 'An error occurred while retrieving the string.');
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial', textAlign: 'center' }}>
            <h2>STRINGUPDATION Contract</h2>
            <div>
                <button onClick={connectWallet}>
                    {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
                </button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <input
                    type="text"
                    placeholder="Enter a string to store"
                    value={inputString}
                    onChange={(e) => setInputString(e.target.value)}
                    style={{ padding: '8px', width: '250px' }}
                />
                <button onClick={handleSetString} style={{ marginLeft: '10px' }}>
                    Set String
                </button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <button onClick={handleGetString}>Get String</button>
                <div style={{ marginTop: '10px', fontSize: '16px', fontStyle: 'italic', color: 'gray' }}>
                    {retrievedString || 'Retrieved string will appear here...'}
                </div>
            </div>
            {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
        </div>
    );
}

export default App;
