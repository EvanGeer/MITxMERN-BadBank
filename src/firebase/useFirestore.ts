import {
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import AccountContext, { accContext } from "../contexts/accountContext";
import Account from "../types/Account";
import { AccountType } from "../types/AccountType";
import User from "../types/User";
import { auth } from "./auth";
import { db } from "./firestoreSetup";

export function useFirestore(): () => accContext {
  const defaultAccount = {
    number: "00001001",
    name: "Checking",
    type: AccountType.CHECKING,
    balance: NaN,
    ledger: [],
  };
  const [firebaseUser, loading, error] = useAuthState(auth);
  

  const [userDocRef, setUserDocRef] =
    useState<DocumentReference<DocumentData> | null>(null);

  useEffect(() => {
    if (!firebaseUser) return;
    const _doc = doc(db, "users", firebaseUser.uid);
    getDoc(_doc).then((docSnapshot) => {
      // create default account if none exists
      if (!docSnapshot.exists()) {
        setDoc(_doc, {
          accts: [
            { ...defaultAccount, balance: 0 },
          ],
        });
      }
    });

    setUserDocRef(_doc);
  }, [firebaseUser]);

  useEffect(() => {
    if (!userDocRef) return;

    // set initial values
    getDoc(userDocRef).then((snap) => {
      const userData = snap.data();
      console.log("User Data Retrieved");
      console.log(userData);
      if (!userData) return;

      let newAccount = userData.accts[0] as Account;

      if (!newAccount) {
        newAccount = { ...defaultAccount, balance: 0 };
        // const newAccts = { ...userData.accts, "00001001": newAccount };
        updateDoc(userDocRef, {
          accts: [newAccount],
        });
      }
    });

    // handle updates to the Firestore from the remote
    onSnapshot(userDocRef, (doc) => {
      const userData = doc.data();
      console.log(userData);
      if (!userData) return;

      console.log("Accounts:");
      // const userAccounts = Object.keys(userData.accts);
      // console.log(userAccounts);
      setAccounts(userData.accts);

      let updatedSnap = userData.accts.find((x: Account) => x.number === account.number) as Account;
      // console.log("Current data: ", doc.data());
      setAccount(updatedSnap);
    });
  }, [userDocRef]);

  const updateAccount = (acct: Account) => {
    setAccount(acct);

    console.log(acctIndex);
    if (!userDocRef) return;

    const newAccts = [...accounts]
    const acctNumber = acct.number;
    let newIndex = accounts.findIndex((x) => x.number === acctNumber);

    if (newIndex === -1) {
      newIndex = newAccts.push(acct);
    } else {
      newAccts[newIndex] = acct;
    }

    setAcctIndex(newIndex);
    // context.setAccount(acct);
    updateDoc(userDocRef, {
      accts: newAccts
    });
  };

  function pad(value: number) {
    let numberString = value.toString();
    while (numberString.length < 8) numberString = "0" + numberString;
    return numberString;
  }

  const createNewAccount = (name: string, type: AccountType) => {
    const newAccount = {
      ...defaultAccount,
      name,
      type,
      number: "00001002",
      balance: 0,
    };

    updateAccount(newAccount);
  };

  return {
    account,
    updateAccount,
    user: firebaseUser,
    accounts,
    createNewAccount,
    acctIndex,
  };
}
