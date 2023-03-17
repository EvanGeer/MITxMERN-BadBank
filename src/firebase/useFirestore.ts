import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Account from "../types/Account";
import { AccountType } from "../types/AccountType";
import { db } from "./firestoreSetup";

export function useFirestore() {
  const [account, _setAccount] = useState<Account>({
    number: "chx123",
    name: "Checking",
    type: AccountType.CHECKING,
    balance: 100,
    ledger: [],
  });

  const [docRef, setDocRef] = useState(doc(db, "users", "evan_dev_data"));

  useEffect(() => {
      getDoc(docRef).then((snap) => {
          const user = snap.data();
          console.log(user);
          const newAccount = user?.accts["000055778"] as Account
        setAccount(newAccount)
      });

  }, [])

  const setAccount = (acct: Account) => {
    _setAccount(acct);
    updateDoc(docRef, { accts: {
        "000055778": acct
    }});
  }


  return [account, setAccount];
}
