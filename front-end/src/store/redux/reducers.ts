import type { PayloadAction } from "@reduxjs/toolkit";
import type { UserState } from "../../utils/types/state-types";

function setUser(state:UserState, action: PayloadAction<UserState>) {
    state = {...action.payload};
};

export default {
    setUser
}
