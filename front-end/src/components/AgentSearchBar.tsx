import {
  Box,
  Typography,
  Select,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
} from '@mui/material';
import Visibility from '@mui/icons-material/Search';
import Filter from '@mui/icons-material/FilterAltOutlined';
import type { AgentSearchBarComponent } from '../utils/types/component-types';

export default function AgentSearchBar({
  displayNumber,
  handleDisplayNumberChange,
  searchText,
  handleSearchChange,
  handleAddAgent,
}: AgentSearchBarComponent) {
  return (
    <Box
      marginTop={2}
      marginInlineStart={1}
      display={'flex'}
      justifyContent={'space-between'}
    >
      <span>
        <Typography
          component="span"
          fontSize="14px"
          fontWeight={400}
          color="#303F54"
        >
          Show
        </Typography>
        <Select
          value={displayNumber}
          style={{
            height: '1.8rem',
            marginInline: '0.5rem',
            background: '#fff',
          }}
          onChange={handleDisplayNumberChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' , 'id':'display-select'}}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
        </Select>
        <Typography
          component="span"
          fontSize="14px"
          fontWeight={400}
          color="#303F54"
        >
          Entries
        </Typography>
      </span>
      <span style={{}}>
        <OutlinedInput
          value={searchText}
          onChange={handleSearchChange}
          id="outlined-adornment-search"
          type={'text'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton>
                <Visibility />
              </IconButton>
            </InputAdornment>
          }
          label="Search"
          
          style={{
            height: '1.8rem',
            marginInline: '0.5rem',
            background: '#fff',
          }}
        />
        <Button
          style={{ backgroundColor: '#fff', height: '1.8rem' }}
          variant="outlined"
          startIcon={<Filter />}
        >
          Filter
        </Button>
        <span
          style={{
            width: '1rem',
            borderRight: '1px solid rgba(0, 0, 0, 0.12)',
            paddingInline: '0.3rem',
            marginRight: '0.5rem',
          }}
        ></span>
        <Button
          onClick={handleAddAgent}
          style={{ height: '1.8rem' }}
          variant="contained"
        >
          Add Agent
        </Button>
      </span>
    </Box>
  );
}
