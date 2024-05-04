import { toNano } from '@ton/core';
import { UserContract } from '../wrappers/UserContract';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const userContract = provider.open(UserContract.createFromConfig({}, await compile('UserContract')));

    await userContract.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(userContract.address);

    // run methods on `userContract`
}
