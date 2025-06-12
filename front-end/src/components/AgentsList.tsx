import {
  Box,
  IconButton,
  Typography,
  Avatar,
  TextField,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import EditIcon from './icons/EditIcon';
import SaveIcon from './icons/SaveIcon';
import DeleteIcon from './icons/DeleteIcon';
import SortIcon from './icons/SortIcon';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import type { AgentsListComponent } from '../utils/types/component-types';
import { useState, type ChangeEvent } from 'react';
import { type Agent, type AgentStatus } from '../utils/types/state-types';

export default function AgentsList({
  agentList,
  handleSaveButton,
  handleEditButton,
  handleDeleteButton,
  handleSort
}: AgentsListComponent) {
  const [changedData, setChangedData] = useState<Agent[]>([]);
  const [showPassword, setShowPassword] = useState<boolean[]>([]);
  const typographyStyles = {
    component: 'span',
    fontSize: '14px',
    fontWeight: 600,
    color: '#7F8B9B',
  };

  function handleOnDataChange(
    ev: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>,
    index: number,
  ) {
    setChangedData((state) => {
      const newState = [...state];
      if (ev.target.name === 'name') {
        const fName = ev.target.value.split(' ')[0];
        const lName = ev.target.value.split(' ')[1];
        newState[index] = {
          ...state[index],
          firstName: fName || '',
          lastName: lName || '',
        };
      } else {
        newState[index] = {
          ...state[index],
          [ev.target.name]: ev.target.value,
        };
      }
      return newState;
    });
  }

  function stringToColor(string: string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: '23px',
        height: '23px',
        fontSize: '12px',
        marginRight: '8px',
        fontWeight: '500',
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  return (
    <Box bgcolor={'#fff'} borderRadius={5}>
      <ul style={{ padding: '0.5rem' }}>
        <li
          style={{
            display: 'grid',
            gridTemplateColumns: '3fr 3fr 2fr 2fr 2fr 1fr auto',
            marginLeft: 0,
            borderBottom: '3px solid rgba(0, 0, 0, 0.12)',
          }}
        >
          <span>
            <Typography {...typographyStyles}>Agent</Typography>
            <IconButton onClick={()=>{handleSort('name')}}>
              <SortIcon />
            </IconButton>
          </span>
          <Typography {...typographyStyles}>Email</Typography>
          <Typography {...typographyStyles}>Password</Typography>
          <Typography {...typographyStyles}>Phone</Typography>
          <span>
            <Typography {...typographyStyles}>Status</Typography>
            <IconButton onClick={()=>{handleSort('status')}}>
              <SortIcon />
            </IconButton>
          </span>
          <Typography {...typographyStyles} textAlign={'center'}>
            Actions
          </Typography>
        </li>
        {agentList.map((el, index) => {
          return (
            <li
              key={el.phone}
              style={{
                display: 'grid',
                gridTemplateColumns: '3fr 3fr 2fr 2fr 2fr 1fr auto',
                marginLeft: 0,
                borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                alignItems: 'center',
                paddingBlock: '5px',
              }}
            >
              {el.isEditing ? (
                <>
                  <span>
                    <TextField
                      id="outlined-name"
                      margin="dense"
                      size="small"
                      name="name"
                      variant="outlined"
                      value={
                        changedData[index].firstName +
                        ' ' +
                        changedData[index].lastName
                      }
                      onChange={(ev) => {
                        handleOnDataChange(ev, index);
                      }}
                      placeholder={el.firstName + ' ' + el.lastName}
                    />
                  </span>

                  <span>
                    <TextField
                      id="outlined-email"
                      margin="dense"
                      value={changedData[index].email}
                      size="small"
                      name="email"
                      variant="outlined"
                      onChange={(e) => {
                        handleOnDataChange(e, index);
                      }}
                      placeholder={el.email}
                    />
                  </span>
                  <span style={{ paddingRight: '10px' }}>
                    <TextField
                      type={showPassword[index] ? 'text' : 'password'}
                      id="outlined-password"
                      margin="dense"
                      value={changedData[index].password}
                      name="password"
                      size="small"
                      variant="outlined"
                      onChange={(e) => {
                        handleOnDataChange(e, index);
                      }}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                size="small"
                                aria-label={
                                  showPassword[index]
                                    ? 'hide the password'
                                    : 'display the password'
                                }
                                onClick={() => {
                                  setShowPassword((state) => {
                                    const newState = [...state];
                                    newState[index] = !state[index];
                                    return newState;
                                  });
                                }}
                              >
                                {showPassword[index] ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                      placeholder={el.password}
                    />
                  </span>
                  <span>
                    <TextField
                      id="outlined-phone"
                      size="small"
                      value={changedData[index].phone}
                      margin="dense"
                      name="phone"
                      onChange={(e) => {
                        handleOnDataChange(e, index);
                      }}
                      variant="outlined"
                      placeholder={el.phone}
                    />
                  </span>
                  <span style={{ textAlign: 'center' }}>
                    <TextField
                      value={el.status}
                      id="outlined-status"
                      margin="dense"
                      name="status"
                      size="small"
                      select
                      onChange={(e) => {
                        el.status = e.target.value as AgentStatus;
                        handleOnDataChange(e, index);
                      }}
                    >
                      <MenuItem value={'Active'}>Active</MenuItem>
                      <MenuItem value={'Inactive'}>Inactive</MenuItem>
                      <MenuItem value={'Ongoing'}>Ongoing</MenuItem>
                    </TextField>
                  </span>

                  <span style={{ textAlign: 'center' }}>
                    <IconButton
                      onClick={() => {
                        handleSaveButton(index, changedData[index]);
                      }}
                    >
                      <SaveIcon />
                    </IconButton>
                  </span>
                </>
              ) : (
                <>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      {...stringAvatar(
                        el.firstName[0] + ' ' + (el.lastName[0] || ''),
                      )}
                    ></Avatar>
                    <Typography
                      fontWeight={400}
                      fontSize={'14px'}
                      color="#303F54"
                    >
                      {el.firstName + ' ' + el.lastName}
                    </Typography>
                  </span>

                  <Typography fontSize={'14px'} color="#303F54">
                    {el.email}
                  </Typography>
                  <Typography fontSize={'14px'} color="#303F54">
                    ************
                  </Typography>
                  <Typography fontSize={'14px'} color="#303F54">
                    ({el.phone.substring(0, 3)})-{el.phone.substring(3, 6)}-
                    {el.phone.substring(6, 10)}
                  </Typography>
                  <span>
                    <Typography
                      fontSize={'14px'}
                      component={'span'}
                      bgcolor={el.status === 'Inactive' ? '#FF543D' : '#49AC00'}
                      borderRadius={2}
                      color="#fff"
                      display={'inline'}
                      padding={'3px'}
                      paddingInline={'6px'}
                    >
                      {el.status}
                    </Typography>
                  </span>

                  <span
                    style={{
                      display: 'flex',
                      justifyContent: 'space-evenly',
                    }}
                  >
                    <IconButton
                      onClick={() => {
                        setChangedData((state) => {
                          const newState = [...state];
                          newState[index] = { ...el };
                          return newState;
                        });
                        setShowPassword((state) => {
                          const newState = [...state];
                          newState[index] = false;
                          return state;
                        });
                        handleEditButton(index);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      style={{ fontSize: '1rem' }}
                      onClick={() => {
                        handleDeleteButton(index);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </Box>
  );
}
