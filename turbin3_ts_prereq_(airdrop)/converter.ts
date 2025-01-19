import bs58 from 'bs58';
import prompt from 'prompt-sync';

// Initialize the prompt
const input = prompt({ sigint: true });

// Function to decode base58 to wallet (binary data)
function base58ToWallet(base58: string): Uint8Array {
    return bs58.decode(base58);
}

// Function to encode wallet (binary data) to base58
function walletToBase58(wallet: Uint8Array): string {
    return bs58.encode(wallet);
}

// Main function to handle user input and conversion
function main() {
    // Display the mode selection prompt in a single line
    const mode = input('Choose mode (1: base58 to wallet, 2: wallet to base58): ').trim();

    if (mode === '1') {
        // Prompt for base58 input in a single line
        const base58 = input('Enter your base58 encoded private key: ').trim();
        const wallet = base58ToWallet(base58);
        console.log('Decoded wallet:', Array.from(wallet));
    } else if (mode === '2') {
        // Prompt for wallet input as a single comma-separated line
        const walletInput = input('Enter your wallet as a comma-separated list of bytes (e.g., 34,46,55,...): ').trim();
        const wallet = Uint8Array.from(walletInput.split(',').map(byte => parseInt(byte.trim(), 10)));
        const base58 = walletToBase58(wallet);
        console.log('Encoded base58:', base58);
    } else {
        console.log('Invalid mode selected. Please choose 1 or 2.');
    }
}

// Run the main function
main();

