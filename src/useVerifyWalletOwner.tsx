import { useEffect } from "react";
import { useAccount, useSignMessage } from "wagmi";

const SIGN_IN_MESSAGE =
  'SuperRare uses this cryptographic signature in place of a password, verifying that you are the owner of this Ethereum address. By clicking "Sign" you agree to our Terms of Service and consent to our usage of your data as described in our Privacy Notice.';

export const useVerifyWalletOwner = () => {
  const { address, isConnected, isReconnecting } = useAccount();
  const { signMessage, failureReason, isError, isIdle, isSuccess, data } =
    useSignMessage();

  useEffect(() => {
    if (isConnected && isReconnecting === false) {
      signMessage({ message: SIGN_IN_MESSAGE, account: address });
    }
  }, [isConnected, isReconnecting]);

  return {
    signature: data ?? null,
    address: address ?? null,
    failureReason,
    isError,
    isIdle,
    isSuccess,
  };
};
