import { Box, Typography, type SelectChangeEvent } from '@mui/material';
import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import AgentSearchBar from '../components/AgentSearchBar';
import { fakeUsers } from './fakeUsers';
import AgentsList from '../components/AgentsList';
import type { Agent } from '../utils/types/state-types';
import Pagination from '../components/Pagination';

export function UserAdmin() {
  const [displayNumber, setDisplayNumber] = useState(10);
  const [searchText, setSearchText] = useState('');
  const [agentList, setAgentList] = useState(fakeUsers);
  const [pageNumber, setPageNumber] = useState(1)
  const searchTime = useRef(0);

  const totalPages = Math.ceil(agentList.length / displayNumber);
  const listToDisplay = agentList.slice((pageNumber-1)*displayNumber, displayNumber*pageNumber);  

  useEffect(() => {
    if (searchText) {      
      clearTimeout(searchTime.current);
      searchTime.current = setTimeout(() => {
        const filteredList = fakeUsers.filter(
          (el) =>
            el.email.toLowerCase().includes(searchText.toLowerCase()) ||
            (el.firstName + ' ' + el.lastName)
              .toLowerCase()
              .includes(searchText.toLowerCase()),
        );
        setAgentList(filteredList);
      }, 1000);
    } else {
      setAgentList(fakeUsers);
    }
  }, [searchText]);

  function handleDisplayNumberChange(ev: SelectChangeEvent<number>) {
    const newNumber =
      typeof ev.target.value === 'number'
        ? ev.target.value
        : parseInt(ev.target.value);
    setDisplayNumber(newNumber);
  }

  function handleSort(prop:string){    
    if(prop === 'name'){
      setAgentList(state => {
        const newState = [...state]
        newState.sort((a,b) => a.firstName.toLowerCase() < b.firstName.toLowerCase() ? -1 : 1);
        return newState
      })
    } else if(prop === 'status') {
      setAgentList(state => {
        const newState = [...state]
        newState.sort((a,b) => a.status.toLowerCase() < b.status.toLowerCase() ? -1 : 1);
        return newState
      })
    }
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

  function handleAddAgent() {
    const newAgent: Agent = {
      lastName: 'new',
      firstName: 'Agent',
      email: 'email',
      password: '0000',
      phone: '0000000000',
      status: 'Inactive',
      isEditing: true
    }
    setAgentList(state =>{
      const newState = [...state];
      newState.unshift(newAgent);
      return newState;
    });
  }

  function handleSearchChange(ev: ChangeEvent<HTMLInputElement>) {
    setSearchText(ev.target.value);
  }

  function handleSaveButton(index: number, changedData: Agent) {
    setAgentList((state) => {
      const newState = [...state];
      newState[index] = { ...state[index], ...changedData, isEditing: false };
      return newState;
    });
  }

  function onPageNumberChange(page: number) {
    setPageNumber(page);
  }

  return (
    <Box margin={2.5}>
      <Typography component="h2" fontSize="18px" fontWeight={400}>
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
        agentList={listToDisplay}
        handleDeleteButton={handleDeleteButton}
        handleEditButton={handleEditButton}
        handleSaveButton={handleSaveButton}
        handleSort={handleSort}
      />
      <Box display="flex" justifyContent="space-between">
        <Typography fontSize={'14px'} component="span">
          Showing {(pageNumber-1)*displayNumber +1} to {displayNumber*pageNumber > agentList.length ?agentList.length : displayNumber*pageNumber} of {agentList.length} entries
        </Typography>
        <Pagination
          pageNumber={pageNumber}
          totalPages={totalPages}
          onPageNumberChange={onPageNumberChange}
        />
      </Box>
    </Box>
  );
}
