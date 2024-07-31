import { atom } from "recoil";

let today = new Date();
const year = today.getFullYear();
const temp = today.getMonth() + 1
const month = temp - 10 < 0 ? "0" + temp : temp;


export const dateStateAtom = atom({
    key: "dateState",
    default: year + "-" + month
});