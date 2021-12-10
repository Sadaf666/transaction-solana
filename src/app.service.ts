import { Injectable } from '@nestjs/common';

import {
    PublicKey,
    Keypair,
    Transaction,
    LAMPORTS_PER_SOL,
    SystemProgram
} from '@solana/web3.js';

import * as web3 from '@solana/web3.js';

// const connection = new web3.Connection(
//   web3.clusterApiUrl('devnet'),
//   'confirmed',
// );

@Injectable()
export class AppService {
    connection = new web3.Connection(web3.clusterApiUrl('devnet'));

    //   getHello(): string {
    //     return 'Hello World!';
    //   }

    // wallet1 and wallet2
    // save address
    //   check balance for both
    //

    async createWallet(): Promise<any> {
        const walletFrom: any = Keypair.generate();

        const walletTo: any = Keypair.generate();

        console.log({
            walletFrom,
            walletTo,
            publicKeyFrom: walletFrom.publicKey,
            publicKeyStringFrom: walletFrom.publicKey.toString(),
            publicKeyTo: walletTo.publicKey,
            publicKeyStringTo: walletTo.publicKey.toString()
        });

        const walletBalanceFrom: any = await this.connection.getBalance(
                walletFrom.publicKey
            ),
            walletBalanceTo: any = await this.connection.getBalance(
                walletTo.publicKey
            );

        console.log({ walletBalanceFrom, walletBalanceTo });

        const airDropSignature: any = await this.connection.requestAirdrop(
            walletFrom.publicKey,
            2000000000
        );

        console.log({ airDropSignature });

        const confirmTransaction: any =
            await this.connection.confirmTransaction(airDropSignature);

        console.log({ confirmTransaction });

        const walletBalanceFromAfterAirDrop: any =
                await this.connection.getBalance(walletFrom.publicKey),
            walletBalanceToAfterAirDrop: any = await this.connection.getBalance(
                walletTo.publicKey
            );

        console.log({
            walletBalanceFromAfterAirDrop,
            walletBalanceToAfterAirDrop
        });

        const transaction: any = new Transaction();

        const transfer: any = await transaction.add(
            SystemProgram.transfer({
                fromPubkey: walletFrom.publicKey,
                toPubkey: walletTo.publicKey,
                lamports: LAMPORTS_PER_SOL
            })
        );

        console.log({ transfer });

        const confirmTransactions: any = await web3.sendAndConfirmTransaction(
            this.connection,
            transaction,
            [walletFrom]
        );

        console.log({ confirmTransactions });

        const walletBalanceFromAfterTransfer: any =
                await this.connection.getBalance(walletFrom.publicKey),
            walletBalanceToAfterTransfer: any =
                await this.connection.getBalance(walletTo.publicKey);

        console.log({
            walletBalanceFromAfterTransfer,
            walletBalanceToAfterTransfer
        });

        return {
            walletFrom,
            walletTo,
            publicKeyFrom: walletFrom.publicKey,
            publicKeyStringFrom: walletFrom.publicKey.toString(),
            secretKeyFrom: walletFrom.secretKey,
            publicKeyTo: walletTo.publicKey,
            publicKeyStringTo: walletTo.publicKey.toString(),
            secretKeyTo: walletFrom.secretKey,
            walletBalanceFromBefore: walletBalanceFrom,
            walletBalanceToBefore: walletBalanceTo,
            airDropSignature,
            confirmTransaction,
            walletBalanceFromAfterAirDrop,
            walletBalanceToAfterAirDrop,
            transfer,
            confirmTransactions,
            walletBalanceFromAfterTransfer,
            walletBalanceToAfterTransfer
        };
    }

    async balance(): Promise<any> {
        const pubKey1: string = '3DcCt3a7ca9nDXUKTcBR3ugxWPkRBurXz4Up92gxr7F6',
            pubKey2: string = 'Hc7yjcT7NVk9kGD12CTQDsNsU4m996Qb4sU2bTTKk6TS';

        const publicKey1: any = new PublicKey(pubKey1),
            publicKey2: any = new PublicKey(pubKey2);

        const walletBalance1: any = await this.connection.getBalance(
                publicKey1
            ),
            walletBalance2: any = await this.connection.getBalance(publicKey2);

        console.log({ walletBalance1, walletBalance2 });

        return { walletBalance1, walletBalance2 };
    }

    async airDropSol(): Promise<any> {
        const pubKey1: string = '3DcCt3a7ca9nDXUKTcBR3ugxWPkRBurXz4Up92gxr7F6';

        const publicKey1: any = new PublicKey(pubKey1);

        const airDropSignature: any = await this.connection.requestAirdrop(
            publicKey1,
            2000000000
        );

        console.log({ airDropSignature });

        const confirmTransaction: any =
            await this.connection.confirmTransaction(airDropSignature);

        console.log({ confirmTransaction });

        return { airDropSignature, confirmTransaction };
    }

    async transfer(): Promise<any> {
        const pubKey1: string = '3DcCt3a7ca9nDXUKTcBR3ugxWPkRBurXz4Up92gxr7F6',
            pubKey2: string = 'Hc7yjcT7NVk9kGD12CTQDsNsU4m996Qb4sU2bTTKk6TS';

        const publicKey1: any = new PublicKey(pubKey1),
            publicKey2: any = new PublicKey(pubKey2);

        const walletBalance1Before: any = await this.connection.getBalance(
                publicKey1
            ),
            walletBalance2Before: any = await this.connection.getBalance(
                publicKey2
            );

        console.log({ walletBalance1Before, walletBalance2Before });

        const transaction: any = new Transaction();

        const transfer: any = await transaction.add(
            SystemProgram.transfer({
                fromPubkey: publicKey1,
                toPubkey: publicKey2,
                lamports: LAMPORTS_PER_SOL
            })
        );

        console.log({ transfer });

        const payer: any = await this.getAccount();

        const confirmTransaction: any = await web3.sendAndConfirmTransaction(
            this.connection,
            transaction,
            []
            // [publicKey1]
        );

        console.log({ confirmTransaction });

        return {
            walletBalance1Before,
            walletBalance2Before,
            transfer,
            confirmTransaction
        };
    }

    async getAccount(): Promise<any> {
        const pubKey1: string = '3DcCt3a7ca9nDXUKTcBR3ugxWPkRBurXz4Up92gxr7F6';

        const secretKey1: any = {
            '0': 195,
            '1': 246,
            '2': 74,
            '3': 115,
            '4': 210,
            '5': 59,
            '6': 40,
            '7': 64,
            '8': 144,
            '9': 175,
            '10': 53,
            '11': 211,
            '12': 204,
            '13': 52,
            '14': 5,
            '15': 231,
            '16': 170,
            '17': 26,
            '18': 150,
            '19': 160,
            '20': 232,
            '21': 92,
            '22': 200,
            '23': 21,
            '24': 72,
            '25': 236,
            '26': 69,
            '27': 31,
            '28': 107,
            '29': 117,
            '30': 239,
            '31': 199,
            '32': 32,
            '33': 242,
            '34': 38,
            '35': 88,
            '36': 138,
            '37': 71,
            '38': 74,
            '39': 15,
            '40': 102,
            '41': 142,
            '42': 148,
            '43': 227,
            '44': 140,
            '45': 89,
            '46': 58,
            '47': 96,
            '48': 69,
            '49': 229,
            '50': 254,
            '51': 42,
            '52': 169,
            '53': 217,
            '54': 214,
            '55': 56,
            '56': 84,
            '57': 55,
            '58': 74,
            '59': 209,
            '60': 66,
            '61': 150,
            '62': 200,
            '63': 193
        };

        const publicKey1: any = new PublicKey(pubKey1);

        const account: any = await this.connection.getAccountInfoAndContext(
            publicKey1
        );

        const pair: any = Keypair.fromSecretKey(secretKey1);

        console.log({ account, pair });

        return { account };
    }

    //   async createWallet1(): Promise<any> {
    //     const fromWallet: any = await web3.Keypair.generate();

    //     const fromWalletPublicKey: any = fromWallet.publicKey,
    //       secretKey: any = fromWallet.secretKey;

    //     let balance: any = await connection.getBalance(fromWalletPublicKey);

    //     console.log({
    //       fromWalletPublicKey,
    //       secretKey,
    //       balance,
    //     });

    //     // const fromAirdropSignature = await connection.requestAirdrop(
    //     //   fromWalletPublicKey,
    //     //   web3.LAMPORTS_PER_SOL, //A lamport has a value of 0.000000001 SOL.
    //     // );

    //     // console.log({ fromAirdropSignature });

    //     // // Wait for airdrop confirmation
    //     // await connection.confirmTransaction(fromAirdropSignature);

    //     balance = await connection.getBalance(fromWalletPublicKey);

    //     console.log('Balance after adding 1 SOL: ', balance);

    //     const toWallet = await web3.Keypair.generate();

    //     balance = await connection.getBalance(toWallet.publicKey);

    //     console.log({ toWallatBalanceBefore: balance });

    //     const fromAirdropSignature = await connection.requestAirdrop(
    //       toWallet.publicKey,
    //       web3.LAMPORTS_PER_SOL, //A lamport has a value of 0.000000001 SOL.
    //     );

    //     await connection.confirmTransaction(fromAirdropSignature);

    //     balance = await connection.getBalance(toWallet.publicKey);

    //     console.log({ toWallatBalanceAfter: balance });

    //     console.log({ toWallet: toWallet.publicKey });

    //     // Add transfer instruction to transaction
    //     let transaction = new web3.Transaction().add(
    //       web3.SystemProgram.transfer({
    //         fromPubkey: fromWalletPublicKey,
    //         toPubkey: toWallet.publicKey,
    //         lamports: 1, // number of SOL to send
    //       }),
    //     );

    //     console.log({ transaction });

    //     // const toWalletBalance: any = await connection.getBalance(
    //     //   toWallet.publicKey,
    //     // );

    //     // const fromWallet: any = await this.getAccountInfo();

    //     // Sign transaction, broadcast, and confirm
    //     var signature = await web3.sendAndConfirmTransaction(
    //       connection,
    //       transaction,
    //       [fromWallet],
    //     );

    //     console.log('SIGNATURE', signature);

    //     const toWalletBalance: any = await connection.getBalance(
    //       toWallet.publicKey,
    //     );

    //     return {
    //       fromWalletPublicKey,
    //       secretKey,
    //       fromAirdropSignature,
    //       balance,
    //       toWallet,
    //       toWalletPublicKey: toWallet.publicKey,
    //       transaction,
    //       toWalletBalance,
    //     };
    //   }

    //   async requestAirDrop() {
    //     const publicKey: any =
    //       'e86210eceff9568f03fc39fb84b28ce978fb40d1f43a358947f102d80841a320';

    //     let balance: any = await connection.getBalance(publicKey);

    //     console.log({ balance });

    //     const fromAirdropSignature = await connection.requestAirdrop(
    //       publicKey,
    //       web3.LAMPORTS_PER_SOL, //A lamport has a value of 0.000000001 SOL.
    //     );

    //     // Wait for airdrop confirmation
    //     await connection.confirmTransaction(fromAirdropSignature);

    //     balance = await connection.getBalance(publicKey);

    //     console.log('Balance after adding 1 SOL: ', balance);

    //     return { balance };
    //   }

    //   async transferSol() {
    //     const fromWalletPublicKey: any =
    //       'e86210eceff9568f03fc39fb84b28ce978fb40d1f43a358947f102d80841a320';

    //     const toWallet = web3.Keypair.generate();

    //     // Add transfer instruction to transaction
    //     let transaction = new web3.Transaction().add(
    //       web3.SystemProgram.transfer({
    //         fromPubkey: fromWalletPublicKey,
    //         toPubkey: toWallet.publicKey,
    //         lamports: 1, // number of SOL to send
    //       }),
    //     );

    //     console.log({ transaction });

    //     const fromWallet: any = await this.getAccountInfo();

    //     console.log(fromWallet);

    //     // Sign transaction, broadcast, and confirm
    //     var signature = await web3.sendAndConfirmTransaction(
    //       connection,
    //       transaction,
    //       [fromWallet],
    //     );

    //     console.log('SIGNATURE', signature);

    //     return { signature, transaction };
    //   }

    //   async getAccountInfo() {
    //     const publicKey: any = new web3.PublicKey(
    //       '3LBLQwMZhDFdkNFxvf7pxFGuyW5gnwNiTUSuXzZFjZCp',
    //     );

    //     // const info: any = await connection.getAccountInfoAndContext(
    //     //   publicKey.toString(),
    //     // );

    //     const info: any = await connection.getAccountInfo(publicKey);

    //     console.log({ info });

    //     return info;

    //     // return 'Hello World!';
    //     // const stateAccounts: any = await solConnection.getProgramAccounts(
    //     //   ESCROW_PUB_KEY,
    //     // );
    //     // let arr: Array<any> = [];
    //     // if (stateAccounts.length) {
    //     //   console.log({ length: stateAccounts.length });
    //     //   for (const array of stateAccounts) {
    //     //     console.log({ array });
    //     //     const data: any = escrowAccountDataLayout.decode(array.account.data);
    //     //     arr.push(data);
    //     //   }
    //     //   console.log({ arr });
    //   }

    // const info: any = await solConnection.getAccountInfoAndContext(
    //   ESCROW_PUB_KEY,
    // );

    // const parsedInfo: any = await solConnection.getParsedProgramAccounts(
    //   ESCROW_PUB_KEY,
    // );

    // const block: any = await solConnection.getBlock(99252772);

    // const balance = await solConnection.getBalance(ESCROW_PUB_KEY);

    // const transactionCount = await solConnection.getTransactionCount();

    // console.log(stateAccounts);

    // return {
    //   stateAccounts,
    //   length: stateAccounts.length,
    //   arr,
    //   parsedInfo,
    //   balance,
    //   transactionCount,
    //   info,
    //   block,
    // };
    //   }
}
