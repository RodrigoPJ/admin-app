import { Box, Typography, type SelectChangeEvent } from '@mui/material';
import { useState, type ChangeEvent } from 'react';
import AgentSearchBar from '../components/AgentSearchBar';
import { fakeUsers } from './fakeUsers';
import AgentsList from '../components/AgentsList';

export function UserAdmin() {
  const [displayNumber, setDisplayNumber] = useState(10);
  const [searchText, setSearchText] = useState('');
  const [agentList, setAgentList] = useState(fakeUsers);

  function handleDisplayNumberChange(ev: SelectChangeEvent<number>) {
    const newNumber =
      typeof ev.target.value === 'number'
        ? ev.target.value
        : parseInt(ev.target.value);
    setDisplayNumber(newNumber);
  }

  function handleEditButton(index: number) {
    setAgentList((state) => {
      const newState = [...state];
      newState[index] = { ...state[index], isEditing: true };
      return newState;
    });
  }
  function handleDeleteButton(index: number) {
    setAgentList((state) => {
      const newState = [...state];
      newState.splice(index, 1);
      return newState;
    });
  }

  function handleAddAgent() {}

  function handleSearchChange(ev: ChangeEvent<HTMLInputElement>) {
    setSearchText(ev.target.value);
  }

  function handleSaveButton(index: number) {
    setAgentList((state) => {
      const newState = [...state];
      newState[index] = { ...state[index], isEditing: false };
      return newState;
    });
  }

  return (
    <Box margin={2.5}>
      <Typography
        component="p"
        fontSize="18px"
        fontWeight={400}
        color="#303F54"
      >
        Agent Management
      </Typography>
      <AgentSearchBar
        displayNumber={displayNumber}
        searchText={searchText}
        handleDisplayNumberChange={handleDisplayNumberChange}
        handleAddAgent={handleAddAgent}
        handleSearchChange={handleSearchChange}
      />
      <AgentsList
        agentList={agentList}
        handleDeleteButton={handleDeleteButton}
        handleEditButton={handleEditButton}
        handleSaveButton={handleSaveButton}
      />
    </Box>
  );
}
