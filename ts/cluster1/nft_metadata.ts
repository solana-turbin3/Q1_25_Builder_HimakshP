import wallet from "../../turbin3-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader({address: "https://devnet.irys.xyz/"}));
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        const image = "https://devnet.irys.xyz/Af3fi3rPjVfPjK5MXKq7tw11cAyV2us4boYjXvjnV8V2"
        const metadata = {
            name: "Monk",
            symbol: "MNK",
            description: "A cool NFT",
            image,
            attributes: [
                {trait_type: 'Color', value: 'purple'}
            ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: image
                    },
                ]
            },
            creators: []
        };
        const myUri = await umi.uploader.uploadJson(metadata)
        console.log("Your metadata URI: ", myUri);

        // https://devnet.irys.xyz/5yVFBxcLZMswZSSWn58oaTZHiQdGvGPro5NoeQ1gSTBU
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
