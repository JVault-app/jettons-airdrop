import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { UserContract } from '../wrappers/UserContract';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('UserContract', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('UserContract');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let userContract: SandboxContract<UserContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        userContract = blockchain.openContract(UserContract.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await userContract.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: userContract.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and userContract are ready to use
    });
});
