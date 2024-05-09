import { Address, toNano } from '@ton/core';
import { UserContract } from '../wrappers/UserContract';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const userContract = provider.open(UserContract.createFromConfig({
        owner_address: Address.parse("UQCovSj8c8Ik1I-RZt7dbIOEulYe-MfJ2SN5eMhxwfACvp7x"),
        parent_address: Address.parse("EQAT9EF-3upnXCXaSLfsRjpEQMFBMAdw9D-TGsmsnyN4Oh5P"),
        campaign_id: 1,
        public_key: 59404852957881491208161262178047543490527709553548189276561698965588786171491n,
    }, await compile('UserContract')));

    await userContract.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(userContract.address);

    // run methods on `userContract`
}
