import {
  Box,
  IconButton,
  Typography,
  Avatar,
  TextField,
  MenuItem,
} from '@mui/material';
import {
  Edit as EditIcon,
  DeleteForeverOutlined as DeleteIcon,
  SaveOutlined as SaveIcon,
} from '@mui/icons-material';
import { lightBlue } from '@mui/material/colors';
import type { AgentsListComponent } from '../utils/types/component-types';
import { useState, type ChangeEvent } from 'react';
import { type Agent } from '../utils/types/state-types';

export default function AgentsList({
  agentList,
  handleSaveButton,
  handleEditButton,
  handleDeleteButton,
}: AgentsListComponent) {
  const [changedData, setChangedData] = useState<Agent[]>([]);
  const typographyStyles = {
    component: 'span',
    fontSize: '16px',
    fontWeight: 600,
    color: '#303F54',
  };

  function handleOnDataChange(ev: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>, index:number) {
    console.log(ev.target.name);
    console.log(ev.target.value);
    setChangedData(state =>{
        const newState = [...state];
        newState[index] = {...state[index], [ev.target.name]:ev.target.value};
        return newState;
    })
    
  }

  return (
    <Box bgcolor={'#fff'} borderRadius={5}>
      <ul style={{ padding: '0.5rem' }}>
        <li
          style={{
            display: 'grid',
            gridTemplateColumns: '3fr 2fr 2fr 2fr 1fr 1fr auto',
            marginLeft: 0,
            borderBottom: '3px solid rgba(0, 0, 0, 0.12)',
          }}
        >
          <Typography {...typographyStyles}>Agent</Typography>
          <Typography {...typographyStyles}>Email</Typography>
          <Typography {...typographyStyles}>Password</Typography>
          <Typography {...typographyStyles}>Phone</Typography>
          <Typography {...typographyStyles}>Status</Typography>
          <Typography {...typographyStyles}>Actions</Typography>
        </li>
        {agentList.map((el, index) => {
          return (
            <li
              key={el.phone}
              style={{
                display: 'grid',
                gridTemplateColumns: '3fr 2fr 2fr 2fr 1fr 1fr auto',
                marginLeft: 0,
                borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                alignItems: 'center',
              }}
            >
              {el.isEditing ? (
                <>
                  <TextField
                    id="outlined-name"
                    margin='dense'
                    size="small"
                    label="Name"
                    name="name"
                    variant="outlined"
                    onChange={(ev)=>{handleOnDataChange(ev, index)}}
                    placeholder={el.firstName + el.lastName}
                  />

                  <TextField
                    id="outlined-email"
                    margin='dense'
                    label="Email"
                    size="small"
                    name="email"
                    variant="outlined"
                    onChange={handleOnDataChange}
                    placeholder={el.email}
                  />
                  <TextField
                    id="outlined-password"
                    margin='dense'
                    label="Password"
                    name="password"
                    size="small"
                    variant="outlined"
                    onChange={handleOnDataChange}
                    placeholder={el.password}
                  />
                  <TextField
                    id="outlined-phone"
                    size="small"
                    label="Phone"
                    margin='dense'
                    name="phone"
                    onChange={handleOnDataChange}
                    variant="outlined"
                    placeholder={el.phone}
                  />
                  <TextField
                    value={el.status}
                    id="outlined-status"
                    margin='dense'
                    name="status"
                    size="small"
                    select
                    style={{}}
                    onChange={handleOnDataChange}
                  >
                    <MenuItem value={'Active'}>Active</MenuItem>
                    <MenuItem value={'Inactive'}>Inactive</MenuItem>
                    <MenuItem value={'Ongoing'}>Ongoing</MenuItem>
                  </TextField>
                  <span style={{ textAlign: 'center' }}>
                    <IconButton
                      onClick={() => {
                        handleSaveButton(index);
                      }}
                    >
                      <SaveIcon color="info" />
                    </IconButton>
                  </span>
                </>
              ) : (
                <>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      sx={{
                        bgcolor: lightBlue,
                        width: '30px',
                        height: '30px',
                        fontSize: '0.9rem',
                        marginRight: '5px',
                      }}
                    >
                      {el.firstName[0] + el.lastName[0]}
                    </Avatar>
                    <Typography color="#303F54">
                      {el.firstName + ' ' + el.lastName}
                    </Typography>
                  </span>

                  <Typography color="#303F54">{el.email}</Typography>
                  <Typography color="#303F54">************</Typography>
                  <Typography color="#303F54">{el.phone}</Typography>
                  <span style={{}}>
                    <Typography
                      component={'span'}
                      bgcolor={
                        el.status === 'Inactive' ? 'tomato' : 'greenyellow'
                      }
                      color="#303F54"
                      display={'inline'}
                      padding={'5px'}
                      paddingInline={'10px'}
                    >
                      {el.status}
                    </Typography>
                  </span>

                  <span
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                    }}
                  >
                    <IconButton
                      onClick={() => {
                        setChangedData((state) => {
                          const newState = [...state];
                          newState[index] = { ...el };
                          return newState;
                        });
                        handleEditButton(index);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
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
