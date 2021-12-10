import { Injectable } from '@nestjs/common';

import {
    Keypair,
    Transaction,
    LAMPORTS_PER_SOL,
    SystemProgram
} from '@solana/web3.js';

import * as web3 from '@solana/web3.js';

@Injectable()
export class AppService {
    connection = new web3.Connection(web3.clusterApiUrl('devnet'));

    //   getHello(): string {
    //     return 'Hello World!';
    //   }

    async createWallet(): Promise<any> {
        // generating keypair for wallet 1
        const walletFrom: any = Keypair.generate();

        // generating keypair for wallet 2
        const walletTo: any = Keypair.generate();

        console.log({
            walletFrom,
            walletTo,
            publicKeyFrom: walletFrom.publicKey,
            publicKeyStringFrom: walletFrom.publicKey.toString(),
            publicKeyTo: walletTo.publicKey,
            publicKeyStringTo: walletTo.publicKey.toString()
        });

        // checking balance for wallet 1 and 2
        const walletBalanceFrom: any = await this.connection.getBalance(
                walletFrom.publicKey
            ),
            walletBalanceTo: any = await this.connection.getBalance(
                walletTo.publicKey
            );

        console.log({ walletBalanceFrom, walletBalanceTo });

        // airdrop sol in wallet 1
        const airDropSignature: any = await this.connection.requestAirdrop(
            walletFrom.publicKey,
            2000000000
        );

        console.log({ airDropSignature });

        // confirming transaction for airDrop
        const confirmTransaction: any =
            await this.connection.confirmTransaction(airDropSignature);

        console.log({ confirmTransaction });

        // checking balance for wallet 1 and 2 after airDrop
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

        // transferring of sol from wallet 1 to wallet 2
        const transfer: any = await transaction.add(
            SystemProgram.transfer({
                fromPubkey: walletFrom.publicKey,
                toPubkey: walletTo.publicKey,
                lamports: LAMPORTS_PER_SOL
            })
        );

        console.log({ transfer });

        // confirming transaction for sol
        const confirmTransactions: any = await web3.sendAndConfirmTransaction(
            this.connection,
            transaction,
            [walletFrom]
        );

        console.log({ confirmTransactions });

        // checking balance for wallet 1 and 2 after transfer
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
}
