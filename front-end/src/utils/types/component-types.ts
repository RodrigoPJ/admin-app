import type { SelectChangeEvent } from "@mui/material";
import type { ChangeEventHandler, } from "react";
import type { Agent } from "./state-types";

export type CallOutcome = (typeof CALL_OUTCOMES)[number];

export const CALL_OUTCOMES = [
  "scheduled",
  "rescheduled",
  "cancellation",
  "handled-by-agent",
  "not-available",
] as const;

export interface AgentSearchBarComponent {
  displayNumber: number;
  handleDisplayNumberChange: (ev:SelectChangeEvent<number>) => void;
  searchText: string;
  handleSearchChange: ChangeEventHandler;
  handleAddAgent: ()=>void;
}

export interface AgentsListComponent {
  agentList: Agent[];
  handleSaveButton: (index:number, changedData:Agent)=>void;
  handleEditButton: (index:number)=>void;
  handleDeleteButton: (index:number)=>void;
  handleSort: (prop:string)=>void;
}
