import { ConnectKitButton } from 'connectkit';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FiAlertTriangle, FiHelpCircle } from 'react-icons/fi';
import { useAccount } from 'wagmi';

import { WorldcoinModal } from '@/components/WorldcoinModal';

function Home() {
    const { push } = useRouter();
    const [showModal, setShowModal] = useState(false);
    const { isConnected } = useAccount();

    useEffect(() => {
        if (isConnected) {
            push('/onboarding/setup');
        }
    }, [isConnected]);

    return (
        <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{
                duration: 0.5,
                type: 'spring',
                stiffness: 260,
                damping: 20,
            }}
        >
            <div className="flex flex-col justify-center items-center">
                <h3 className="text-gray-800 text-justify mt-4">
                    <b>Everyone </b> deserves to have an <b>ENS Name.</b> This
                    app serves as a demonstration of{' '}
                    <b>sybil resistant name issuance.</b> Simply sign in with
                    the button below, and claim your worldname!
                </h3>
                <h3 className="text-gray-800 text-justify mt-4">
                    Sybil Resistance is an important factor allowing for{' '}
                    <b>zero registration fees</b> and <b>no KYC</b>. This is a{' '}
                    <b>decentralized</b> application and your data stored on the{' '}
                    <b>optimism blockchain.</b>
                </h3>
                <ConnectKitButton.Custom>
                    {({
                        isConnected,

                        show,

                        address,
                    }) => {
                        return (
                            <button onClick={show} className="worldidbtn">
                                {isConnected ? address : 'Connect Wallet'}
                            </button>
                        );
                    }}
                </ConnectKitButton.Custom>
                <div className="text-red-500 text-sm text-justify flex gap-2 mt-4 items-center">
                    <FiAlertTriangle className="w-6 h-6" />
                    <p>
                        Make sure to use an external wallet,{' '}
                        <b className="underline">NOT</b> the{' '}
                        <b className="underline">Worldcoin Wallet</b> as it is
                        not yet supported for transfers.
                    </p>
                </div>
                <button
                    onClick={() => {
                        setShowModal(true);
                    }}
                    className="flex flex-row justify-center items-center mt-4 text-sm group hover:cursor-pointer"
                >
                    {' '}
                    What is
                    <span className="text-indigo-700 ml-1 group-hover:underline">
                        {' '}
                        Worldcoin?
                    </span>
                    <FiHelpCircle className="ml-1" />
                </button>
            </div>

            <WorldcoinModal
                showModal={showModal}
                onClose={() => {
                    setShowModal(false);
                }}
            />
        </motion.div>
    );
}

export default Home;
