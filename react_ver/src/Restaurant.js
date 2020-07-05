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
 
class Restaurant extends Component {

  const useStyles = makeStyles({
	  table: {
		  minWidth: 650,
	  },
  });
  
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
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
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

  export default function SimpleTable() {
	const clases = useStyles();

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
        <h2>Restaurant</h2>
        <p>The easiest thing to do is post on
        our <a href="http://forum.kirupa.com">forums</a>.
        </p>
      </div>


    );
  }
}
 
export default Restaurant;