import React, { useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Toolbar from "@mui/material/Toolbar";
import PropTypes from "prop-types";
import { visuallyHidden } from "@mui/utils";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styles from "./styles";
import Pagination from "./Pagination";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TableSortLabel from "@mui/material/TableSortLabel";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useDispatch, useSelector } from "react-redux";
import {
  saveIndexAction,
  saveRowIdAction,
  saveRow,
  savecolapserow,
} from "../../redux/actions/saveindexAction";
import { fetchRequests } from "../../redux/actions/dashboard";
const StyledTable = (props) => {
  const {
    columns,
    rows,
    pageNumber,
    pageSize,
    totalCount,
    totalPages,
    handlePaginationBackward,
    handlePaginationForward,
    collapseData,
    name = "",
    OpenBox,
    SetOpenBox,
    sortparm,
    // OnSorting,
    setFilters,
    searchItem,
    cardProductStage,
    cardRequestStage,
    AssignedToPagination,
    ClientNamePagination,
    ImplSLAFilterPagination,
    ImplementationTimingPagination,
    ManagerPagination,
    OverallSLAFilterPagination,
    ProductPagination,
    ProductActionPagination,
    setsortvalueorder
  } = props;
  const classes = styles();
  const dispatch = useDispatch();
  const [rowID, setRowID] = useState([]);
  const colapseRowPrevData =
    useSelector(
      (state) => state.collapseSelecteddata?.selectedcolapsedatatrow
    ) || [];

  const handlerowClick = (i) => {
    let newArray = [...rowID];
    let filteredArray = [];
    if (rowID.includes(i)) {
      filteredArray = newArray.filter((item) => {
        return item !== i;
      });
      setRowID(filteredArray);
      return;
    }
    newArray.push(i);
    setRowID(newArray);
  };
  

  
  
  const EnhancedTableToolbar = (props) => {
    //const { numSelected } = props;

    return (
      <Toolbar
      // sx={{
      //   pl: { sm: 2 },
      //   pr: { xs: 1, sm: 1 },
      //   ...(numSelected > 0 && {
      //     bgcolor: (theme) =>
      //       alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
      //   }),
      // }}
      ></Toolbar>
    );
  };

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };
  // const classes = styles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  // const [selected, setSelected] = React.useState([]);
  //const [page, setPage] = React.useState(0);
  // const [dense, setDense] = React.useState(false);
  function sortingTable(sortId) {
    let sortingMapping = {
      RequestIddesc: "ReqId_DESC",
      RequestIdasc: "ReqId_ASC",
      Productasc: "product_ASC",
      Productdesc: "product_DESC",
      StageDetailasc: "ticketstage_ASC",
      StageDetaildesc: "ticketstage_DESC",
      ImplementationTimingasc: "impltiming_ASC",
      ImplementationTimingdesc: "impltiming_DESC",
      ImplSLAasc: "impl_sla_ASC",
      ImplSLAdesc: "impl_sla_DESC",
      OverallSLAasc: "overal_sla_ASC",
      OverallSLAdesc: "overal_sla_DESC",
      AssignedToasc: "AssignedTo_ASC",
      AssignedTodesc: "AssignedTo_DESC",
      Clientasc: "client_ASC",
      Clientdesc: "client_DESC",
      ProductImplementationIdasc:"ImplId_ASC",
      ProductImplementationIddesc:"ImplId_DESC",
    };
    
    let sortingID = sortingMapping[`${sortId}`];
     setsortvalueorder(sortingID)
    let objNew = { PageNum: 1, PageSize: 10 };
    setFilters(objNew);

    let newObj = {
      ...objNew,
      "SortBy": sortingID,
      "SearchName": searchItem,
      "ProductFormStage": cardProductStage,
      "RequestStage":cardRequestStage,
      "AssignedTo": AssignedToPagination,
      "Client": ClientNamePagination,
      "ImplSLAFilter": ImplSLAFilterPagination,
      "ImplementationTiming": ImplementationTimingPagination,
      "Manager": ManagerPagination,
      "OverallSLAFilter": OverallSLAFilterPagination,

      "Product": ProductPagination,
    "ProductAction": ProductActionPagination,
    // "SortBy":sortvalueorder,
    };

    return newObj;
  }
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";

    let currentOrder = isAsc ? "desc" : "asc";

    const sortedPayload = sortingTable(property + currentOrder);
    let sortedPayloadSecond = { ...sortedPayload };
    delete sortedPayloadSecond.PageNum;
    delete sortedPayloadSecond.PageSize;

    props.setSortedCondition(sortedPayloadSecond.SortBy);
    dispatch(fetchRequests(sortedPayload)).then((data) => {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    });
  };
  // const [orderBy,setorderBy]=useState("");
  // const [order,setorder]=useState(false)
  // const createSortHandler=(value)=>{
  //   console.log('value',value)
  //   // const orderBy=value;
  //   // setorderBy(value);
  // };
  // const [filters, setFilters] = React.useState({
  //   PageNum: 1,
  //   PageSize: 10,

  // });
  // const getRequests = (filters) => {
  //   setIsLoading(true);
  //   dispatch(fetchRequests(filters)).then((data) => {
  //     setIsLoading(false);
  //   });
  // };
  // const createSortHandler = (property) => (event) => {
  //   setorderBy(property);
  //   const filterforrequest = {
  //     ...filters,
  //     SortBy:"ImplId_ASC"

  //     // TicketStage: updatedTicketStage ? updatedTicketStage.toString() : "",
  //   };
  //   setFilters(filterforrequest);
  //   getRequests(filterforrequest);
  //   setorder(!order)

  // };
  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const handleOnClickOfColumn = (column, row, i) => {
    console.log('roe',row)
    if (column.id === "Id") {
      dispatch(saveRowIdAction(row.Id));
      dispatch(saveIndexAction(i));

      dispatch(saveRow(row));

      SetOpenBox(!OpenBox);
    }
  };

  let className = "";
  if (name !== "skills") {
    className += "collapsDashboard";
  }

  return (
    <>
      <TableContainer component={Paper} className={classes.root}>
        <Table className={classes.table} aria-label="custom-table">
          <TableHead>
            <TableRow>
              {columns &&
                columns.map((column,index) =>
                  sortparm === true && column.id !== "collapsId" ? (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        maxWidth: column.maxWidth,
                        width: column.width,
                      }}
                      className= {column.class}
                    >
                      <TableSortLabel
                        //  active={orderBy === column.id}
                        //  direction={orderBy === column.id ? order==true?"asc":"desc" : 'asc'}
                        //  onClick={createSortHandler(column.id)}
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : "asc"}
                        onClick={createSortHandler(column.id)}
                        // disabled={!column.isSorting}
                      >
                        {column.label}

                        {orderBy === column.id ? (
                          <Box component="span" sx={visuallyHidden}>
                            {order === "desc"
                              ? "sorted descending"
                              : "sorted ascending"}
                          </Box>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  ) : (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        maxWidth: column.maxWidth,
                        width: column.width,
                        visibility: column.visibility,
                        textIndent: column.textIndent,
                      }}
                      role="columnheader"
                    >
                      {column.label}
                    </TableCell>
                  )
                )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows.map((row, i) => {
                return (
                  <React.Fragment key={row.code}>
                    <TableRow
                      hover
                      //role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns &&
                        columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              onClick={() => {
                                handleOnClickOfColumn(column, row, i);
                              }}
                              key={column.id}
                              align={column.align}
                              style={{
                                minWidth: column.minWidth,
                                maxWidth: column.maxWidth,
                                width: column.width,
                                // wordBreak: "break-all",
                              }}
                            >
                              {column.id === "collapsId" ? (
                                <IconButton
                                  onClick={() => {
                                    handlerowClick(i);
                                    let newArray = [...colapseRowPrevData, row];
                                    dispatch(savecolapserow(newArray));
                                  }}
                                  aria-label="expand row"
                                  size="small"
                                  style={{ color: "#0B1941" }}
                                >
                                  {rowID.includes(i) ? (
                                    <KeyboardArrowDownIcon />
                                  ) : (
                                    <KeyboardArrowRightIcon />
                                  )}
                                </IconButton>
                              ) : column.format ? (
                                column.format(value, i)
                              ) : (
                                value
                              )}
                            </TableCell>
                          );
                        })}
                    </TableRow>

                    <TableRow key={row.code} className={className}>
                      <TableCell colSpan={11} style={{ padding: "0px" }}>
                        <Collapse
                          className={classes.collaps}
                          in={
                            name === "skills"
                              ? rowID.includes(i)
                              : rowID.includes(i)
                          }
                          // in={open}
                          component="div"
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box className={classes.collapsContent}>
                            <Table style={{ width: "100%" }}>
                              <TableBody>
                                <TableRow style={{ verticalAlign: "top" }}>
                                  {collapseData &&
                                    collapseData.map((collapse) => {
                                      const value = row[collapse.id];

                                      // return prp(collapse)
                                      return (
                                        <>
                                          {name === "skills" ? (
                                            // Skills Collaps Table Data
                                            <TableCell
                                              key={collapse.id}
                                              align={collapse.align}
                                              style={{
                                                minWidth: collapse.minWidth,
                                                maxWidth: collapse.maxWidth,
                                                width: collapse.width,
                                                visibility:collapse.visibility,
                                                wordBreak: collapse.wordBreak,
                                              }}
                                            >
                                              {collapse.format
                                                ? collapse.format(value, i)
                                                : value}
                                            </TableCell>
                                          ) : (
                                           
                                              <p key={collapse.id}>
                                                <span
                                                  className={
                                                    classes.collapsContentHeading
                                                  }
                                                >
                                                  {collapse.label} :{" "}
                                                </span>
                                                <span
                                                  className={
                                                    classes.collapsContentValue
                                                  }
                                                >
                                                  {collapse.format
                                                    ? collapse.format(value, i)
                                                    : value}
                                                </span>
                                              </p>
                                          
                                          )}
                                        </>
                                      );
                                    })}
                                </TableRow>
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      {rows.length === 0 && (
        <div className={classes.noRecords}>No record has found</div>
      )}
      <Pagination
        pageNumber={pageNumber}
        pageSize={pageSize}
        totalCount={totalCount}
        handlePaginationBackward={handlePaginationBackward}
        handlePaginationForward={handlePaginationForward}
        totalPages={totalPages}
      />
    </>
  );
};
export default StyledTable;
