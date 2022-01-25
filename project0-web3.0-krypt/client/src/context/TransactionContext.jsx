import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const singer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, contractABI, singer);

    return contract;
}

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setcurrentAccount] = useState("");
    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));

    const handleChange = (e, name) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: e.target.value
        }))
    }

    const chechIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please install metamask!");

            const accounts = await ethereum.request({ method: 'eth_accounts' });
            if (accounts.length) {
                setcurrentAccount(accounts[0]);
            } else {
                console.log("No accounts found!");
            }
            console.log(accounts)

        } catch (error) {
            console.log(error)
            throw new Error("No etherum object.")
        }

    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install metamask!");
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setcurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error)
            throw new Error("No etherum object.")
        }
    }

    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("Please install metamask!");

            const { addressTo, amount, keyword, message } = formData;
            const contract = getEthereumContract();
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from:currentAccount,
                    to: addressTo,
                    gas: '0x5208',
                    value: ethers.utils.parseEther(amount)._hex,
                }]
            });

            const txHash = await contract.addToBlockchain(addressTo, ethers.utils.parseEther(amount), keyword, message);
            setIsLoading(true);
            console.log(`Loading-${txHash.hash}`);

            await txHash.wait();
            setIsLoading(false);
            console.log(`Success-${txHash.hash}`);
        

            const txCount = await contract.getTransactionCount();

            setTransactionCount(txCount.toNumber());

        } catch (error) {
            console.log(error)
            throw new Error("No etherum object.")
        }
    }


    useEffect(() => {
        chechIfWalletIsConnected();
    }, [])

    return (
        <TransactionContext.Provider value={{ handleChange, formData, setFormData, connectWallet, currentAccount, sendTransaction }}>
            {children}
        </TransactionContext.Provider>
    )
}