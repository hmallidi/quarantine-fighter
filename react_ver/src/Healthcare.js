import React, { Component } from "react";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
 
class Healthcare extends Component {
  
  function createData(name, address, phone_number, website, hours) {
    return {name, address, phone_number, website, hours};
  }

  const rows = [
	createData('hospital', 'address', '1234567890', 'website.com', '12AM - 11PM'), 
	createData('hospital', 'address', '1234567890', 'website.com', '12AM - 11PM')
  ];

  function descendingComparator(a, b, orderBy) {
	  if(b[orderBy] < a[orderBy]) {
		  return -1;
	  }
	  if(b[orderBy] > a[orderBy]) {
		  return 1;
	  }
	  return 0; 
  }

  function getComparator(order, orderBy) {
	  return order == 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
	  const stabilizedThis = array.map((el, index) => [el, index]);
	  stabilizedThis.sort((a, b) => {
		  const order = comparator(a[0], b[0]);
		  if (order !== 0) return order;
		  return a[1] - b[1];
	  });
	  return stabilizedThis.map((el) => el[0]);
  }

  const headCells = [
	  
  ];

  function EnhancedTableHead(props) {
	const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
	const createSortHandler = (property) => (event) => {
	  onRequestSort(event, property);
	};
  
	return (
	  <TableHead>
		<TableRow>
		  <TableCell padding="checkbox">
			<Checkbox
			  indeterminate={numSelected > 0 && numSelected < rowCount}
			  checked={rowCount > 0 && numSelected === rowCount}
			  onChange={onSelectAllClick}
			  inputProps={{ 'aria-label': 'select all desserts' }}
			/>
		  </TableCell>
		  {headCells.map((headCell) => (
			<TableCell
			  key={headCell.id}
			  align={headCell.numeric ? 'right' : 'left'}
			  padding={headCell.disablePadding ? 'none' : 'default'}
			  sortDirection={orderBy === headCell.id ? order : false}
			>
			  <TableSortLabel
				active={orderBy === headCell.id}
				direction={orderBy === headCell.id ? order : 'asc'}
				onClick={createSortHandler(headCell.id)}
			  >
				{headCell.label}
				{orderBy === headCell.id ? (
				  <span className={classes.visuallyHidden}>
					{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
				  </span>
				) : null}
			  </TableSortLabel>
			</TableCell>
		  ))}
		</TableRow>
	  </TableHead>
	);
  }
  
  EnhancedTableHead.propTypes = {
	classes: PropTypes.object.isRequired,
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
  };
  
  const useToolbarStyles = makeStyles((theme) => ({
	root: {
	  paddingLeft: theme.spacing(2),
	  paddingRight: theme.spacing(1),
	},
	highlight:
	  theme.palette.type === 'light'
		? {
			color: theme.palette.secondary.main,
			backgroundColor: lighten(theme.palette.secondary.light, 0.85),
		  }
		: {
			color: theme.palette.text.primary,
			backgroundColor: theme.palette.secondary.dark,
		  },
	title: {
	  flex: '1 1 100%',
	},
  }));
  
  const EnhancedTableToolbar = (props) => {
	const classes = useToolbarStyles();
	const { numSelected } = props;
  
	return (
	  <Toolbar
		className={clsx(classes.root, {
		  [classes.highlight]: numSelected > 0,
		})}
	  >
		{numSelected > 0 ? (
		  <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
			{numSelected} selected
		  </Typography>
		) : (
		  <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
			Nutrition
		  </Typography>
		)}
  
		{numSelected > 0 ? (
		  <Tooltip title="Delete">
			<IconButton aria-label="delete">
			  <DeleteIcon />
			</IconButton>
		  </Tooltip>
		) : (
		  <Tooltip title="Filter list">
			<IconButton aria-label="filter list">
			  <FilterListIcon />
			</IconButton>
		  </Tooltip>
		)}
	  </Toolbar>
	);
  };
  
  EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
  };
  
  const useStyles = makeStyles((theme) => ({
	root: {
	  width: '100%',
	},
	paper: {
	  width: '100%',
	  marginBottom: theme.spacing(2),
	},
	table: {
	  minWidth: 750,
	},
	visuallyHidden: {
	  border: 0,
	  clip: 'rect(0 0 0 0)',
	  height: 1,
	  margin: -1,
	  overflow: 'hidden',
	  padding: 0,
	  position: 'absolute',
	  top: 20,
	  width: 1,
	},
  }));  

  function EnhancedTableHead(props) {
	const {classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return(
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>Address</TableCell>
						<TableCell>Phone Number</TableCell>
						<TableCell>Website</TableCell>
						<TableCell>Hours</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow key={row.name}>
							<Table Cell component="th" scope="row">
								{row.name}
							</Table>
							<TableCell>{row.address}</TableCell>
							<TableCell>{row.phone_number}</TableCell>
							<TableCell>{row.website}</TableCell>
							<TableCell>{row.hours}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
  }
  
  render() {
    return (
      <HashRouter>
	        <div>
	        <h1>COVID	FIGHTER</h1>
	          <ul className="header">
	            <li><NavLink exact to="/">Home</NavLink></li>
	            <li><NavLink exact to="/Grocery">Grocery</NavLink></li>
	            <li><NavLink exact to="/Restaurant">Restaurant</NavLink></li>
	            <li><NavLink exact to="/Healthcare">Healthcare</NavLink></li>
	            <li><NavLink exact to="/About">About</NavLink></li>
	          </ul>
	          <div className="content">
				  <Route exact path="/" component={Home}/>
				  <Route path="/Grocery" exact component={Grocery}/>
				  <Route path="/Restaurant" exact component={Restaurant}/>
				  <Route path="/Healthcare" exact component={Healthcare}/>
				  <Route path="/About" exact component={About}/>
				</div>
	        </div>
	        
	    </HashRouter>
      <div>
        <h2>HELLO</h2>
        <p>Cras facilisis urna ornare ex volutpat, et
        convallis erat elementum. Ut aliquam, ipsum vitae
        gravida suscipit, metus dui bibendum est, eget rhoncus nibh
        metus nec massa. Maecenas hendrerit laoreet augue
        nec molestie. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.</p>
 
        <p>Duis a turpis sed lacus dapibus elementum sed eu lectus.</p>
      </div>
    );
  }
}
 
export default Healthcare;