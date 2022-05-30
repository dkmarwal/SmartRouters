import React, { useEffect, useState, useCallback } from "react";
import Box from "@mui/material/Box";
import ButtonDesign from "../../../components/Button";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Popover from "../../../components/Popover";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import StyledTable from "../../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles";
import {
  fetchProductsSLA,
  fetchProductsSLAforExcel,
  fetchsearchSLA,
} from "../../../redux/actions/products";
import RequestChip from "../../../components/RequestChip";
import { withRouter } from "react-router-dom";
import ViewDialog from "./../../../components/Dialogs";
import ViewAuditTrail from "./ViewAuditTrail";
import { deleteSLAdetails } from "../../../redux/helpers/product";
import ConfirmDialog from "../../../components/Dialogs/ConfirmDialog";
import DownloadIcon from "@mui/icons-material/Download";
import XLSX from "xlsx";
// function createData(
//   ProServices,
//   ProductAction,
//   ImpStandard,
//   ImpCritical,
//   OverStandard
// ) {
//   return { ProServices, ProductAction, ImpStandard, ImpCritical, OverStandard };
// }

const ProductSLA = withRouter(({ history }) => {
  const classes = styles();
  const [OpenBox, SetOpenBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [getskillsafterDelete, setgetskillsafterDelete] = useState(false);
  const [filters, setFilters] = useState({
    PageNum: 1,
    PageSize: 10,
  });
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const [openDeleteDialogFlag, setOpenDeleteDialogFlag] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const [selectedActionId, setSelectedActionId] = useState(null);
  const [deleteDialogSuccess, setDeleteDialogSuccess] = useState(false);
  const [rowSelected, setrowSelected] = useState([]);
  const [TotalPagesForSearch, setTotalPagesForSearch] = useState(0);
  const [TotalCountForSearch, setTotalCountForSearch] = useState(0);
  const [CurrentPageForSearch, setCurrentPageForSearch] = useState(1);
  const [PageSizeForSearch, setPageSizeForSearch] = useState(1);
  const actionbyId = localStorage.getItem("actionby");
  const RoleFlag = localStorage.getItem("Role");
  const [searched, setSearched] = useState("");
  const selectedRowskill = useSelector(
    (state) => state.rowISelected.selecteditrow
  );
  const rowmessage = useSelector((state) => state?.products?.list?.message);
  //   useEffect(() => {
  //     getProducts(filters);
  //     //Below comment is to disable warning explicitly, since there is no other workaround.
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  const open = Boolean(anchorEl);
  const id = open ? `simple-popover-${anchorEl}` : null;
  const openAction = Boolean(anchorE2);
  const idAction = open ? `simple-popover-${anchorE2}` : null;
  const Permissions= localStorage.getItem("Permissions");
  const getProducts = (filters) => {
    setIsLoading(true);
    dispatch(fetchProductsSLA(filters)).then(() => {
      setIsLoading(false);
    });
  };
  useEffect(() => {
    getProducts(filters);

    //Below comment is to disable warning explicitly, since there is no other workaround.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getskillsafterDelete]);
  // const getProductsForXsel = () => {
  // const payloadForExcel={WithOutPagination:true};
  //   setIsLoading(true);
  //   dispatch(fetchProductsSLA(payloadForExcel)).then(() => {
  //     setIsLoading(false);
  //   });
  // };
  const handlePaginationChange = (newObj) => {
    setFilters(newObj);
    searched.length ? skillSearchOnPagination(newObj) : getProducts(newObj);
  };

  const handlePaginationForward = () => {
    const newPageNum = filters["PageNum"] + 1;
    const newObj = { PageNum: newPageNum, PageSize: filters["PageSize"] };
    handlePaginationChange(newObj);
  };
  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickAction = (event, id) => {
    setAnchorE2(event.currentTarget);
    setSelectedActionId(id);
  };
  // const handleCloseAction = () => {

  //   setAnchorE2(null);
  // };
  const handlePaginationBackward = () => {
    const newPageNum = filters["PageNum"] - 1;
    const newObj = { PageNum: newPageNum, PageSize: filters["PageSize"] };
    handlePaginationChange(newObj);
  };
  const debounceFunction = (func, delay) => {
    let timer;
    return function () {
      let self = this;
      let args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(self, args);
      }, delay);
    };
  };

  // const open = Boolean(anchorEl);
  // const id = open ? 'simple-popover' : undefined;
  const columns = [
    {
      id: "ProServices",
      label: "Product & Services",
      minWidth: 180,
      format: (product, i) => {
        const moreCount =
          RowData[i]?.Product.Services?.length > 1
            ? +RowData[i]?.Product.Services?.length - 1
            : "";
        return (
          <>
            <div>
              <div className={classes.prodName}>
                {searched.length
                  ? rowSelected[i]?.Product["ProdName"]
                  : RowData[i]?.Product["ProdName"]}
              </div>
              {searched.length ? (
                <div>
                  {rowSelected[i]?.Product?.Services[0]["ServiceName"]}{" "}
                  {moreCount && (
                    <span
                      //aria-describedby={`${id}`}
                      id="popperTriggerPOD"
                      onClick={(e) => handleClickAction(e, `${i}-priskills`)}
                      className={classes.moreCount}
                    >
                      {RowData[i]?.Product?.Services.length > 1
                        ? ` +${moreCount}`
                        : null}
                    </span>
                  )}
                </div>
              ) : (
                <div>
                  {RowData[i]?.Product?.Services[0]["ServiceName"]}{" "}
                  {moreCount && (
                    <span
                      //aria-describedby={`${id}`}
                      id={`"popperTriggerPODOne${i}`}
                      onClick={(e) => handleClickAction(e, `${i}-priskills`)}
                      className={classes.moreCount}
                    >
                      {RowData[i]?.Product?.Services.length > 1
                        ? ` +${moreCount} More`
                        : null}
                    </span>
                  )}
                </div>
              )}
              <Popover
                id={`${idAction}`}
                className={classes.popper}
                anchorEl={anchorE2}
                onClose={() => setAnchorE2(false)}
                open={
                  RowData[i]?.Product?.Services.length > 1 &&
                  openAction &&
                  selectedActionId === `${i}-priskills`
                }
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Box p={1}>
                  {RowData[i]?.Product.Services?.length > 1 &&
                    RowData[i]?.Product.Services?.map((values) => (
                      <div key={values["ServiceName"]}>
                        {values["ServiceName"]}
                      </div>
                    ))}
                </Box>
              </Popover>
            </div>
          </>
        );
      },
      isClickable: false,
    },
    {
      id: "ProductAction",
      label: "Product Action",
      minWidth: 120,
      //align: "center",
      // format: (actionType) => <span>{actionType}</span>,
      format: (value, i) => {
        const visibleSkillsCount = 1;
        const moreCount = value && value.length - visibleSkillsCount;

        const showMoreCount = moreCount > 0;
        return (
          <>
            <div
              //aria-describedby={`${id}`}
              id={`popperTriggerPODTwo${i}`}
              onClick={(e) => handleClick(e, `${i}-primaryskills`)}
            >
              <RequestChip name={value[0]["ActionName"]} />
              <span className={classes.moreCount}>
                {showMoreCount ? ` +${moreCount} More` : ""}
              </span>
            </div>
            <Popover
              id={`${id}`}
              className={classes.popper}
              anchorEl={anchorEl}
              onClose={handleClose}
              open={
                value.length > 1 && open && selectedId === `${i}-primaryskills`
              }
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Box p={1}>
                {value &&
                  value.map((values) => (
                    <div key={values["ActionName"]}>{values["ActionName"]}</div>
                  ))}
              </Box>
            </Popover>
          </>
        );
      },

      // (

      //   // <RequestChip name={value && value.toLocaleString("en-US")} />
      //   <RequestChip name={value[0]["ActionName"]} />
      // ),
      isClickable: false,
    },
    {
      id: "Impl_StandardTime",
      label: "Standard Lead Time (Implementation)",
      //lable: `<b>Test</b>`,
      minWidth: 170,
      //align: "center",
      format: (value) => <b>{`${value == null ? '' : value + ' days'}`}</b>,
      isClickable: false,
    },
    {
      id: "Impl_CriticalPath",
      label: "Critical Lead Time (Implementation)",
      minWidth: 150,
      //align: "center",
      format: (value) => <b>{`${value == null ? '' : value + ' days'}`}</b>,
      isClickable: false,
    },
    {
      id: "Overall_StandardTime",
      label: "Standard Lead Time (Overall)",
      minWidth: 170,
      //align: "center",
      format: (value) => <b>{`${value == null ? '' : value + ' days'}`}</b>,
      isClickable: false,
    },
    {
      id: "Overall_CriticalPath",
      label: "Critical Lead Time (Overall)",
      minWidth: 130,
      //align: "center",
      format: (value) => <b>{`${value == null ? '' : value + ' days'}`}</b>,
      isClickable: false,
    },
    {
      id: "WorkingHours",
      label: "Working Hours",
      minWidth: 100,
      //align: "center",
      format: (value) => <b>{`${value == null ? '' : value + ' hours'}`}</b>,
      isClickable: false,
    },
    {
      id: "ModifiedBy",
      label: "Last Modified By",
      minWidth: "13%",
      maxWidth: "13%",
      //width: 200,
      isClickable: false,
      },
      {
      id: "ModifiedDate",
      label: "Last Modified On",
      minWidth: "13%",
      maxWidth: "13%",
      //width: 200,
      isClickable: false,
      },
    {
      id: "Id",
      label: "1",
      minWidth: 30,
      align: "center",
      textIndent: -5000,
      format: (value) => (
        <>
          <IconButton
            aria-label="more"
            //id="long-button"
            //aria-controls="long-menu"
            // aria-expanded={actionPopOpen ? action : undefined}
            aria-haspopup="true"
            onClick={actionClick}
            style={{ color: "#0C2174" }}
          >
            <MoreVertIcon />
          </IconButton>
        </>
      ),
      isClickable: false,
    },
  ];

  const actionsarray = [
  {
      id: "copy",
      label: "Copy",
      isClickable: <ViewDialog />,
    },
    {
      id: "edit",
      label: "Edit",
      isClickable: <ViewDialog />,
    },
    {
      id: "delete",
      label: "Delete",
      isClickable: true,
    },
    {
      id: "viewaudittrail",
      label: "View Audit Trail",
      isClickable: true,
    },
  ];
  let skillsPermissions=JSON.parse(Permissions)?.filter((value)=>{

    return value.PageName==="Product SLA"
})

let ActionNames=skillsPermissions.map((value)=>{
  return value.ActionName
})
let actionss=ActionNames.includes("Delete")?actionsarray:actionsarray.filter((item) => item.id !== "delete");
let actions=ActionNames.includes("Modify")?actionss:actionss.filter((item) => item.id !== "edit" && "copy");
  const [action, setAction] = React.useState(false);
  const [selectedActionIndex, setselectedActionIndex] = React.useState(1);
  const actionPopOpen = Boolean(action);
  const actionClick = (event) => {
    setAction(event.currentTarget);
  };
  // const [openDialogFlag, setOpenDialogFlag] = useState(false);
  const [openTrailFlag, setOpenTrailFlag] = useState(false);

  // const [selectedRowID,setSelectedRowID] = useState("")
  const selectedRowID = useSelector((state) => state.rowIdSelected.selectedrow);
  const pushToEditSkills = (id) => {
    history.push(`/admin/editSla/${id}`);
  };
  const pushToCopySkills = (id) => {
    history.push(`/admin/copySla/${id}`);
  };
  const RowData = useSelector((state) => state.products?.list?.data) || [];
  //const RowDataServies = useSelector((state) => state.products?.list?.data[0].Product.Services[0].ServiceName);
  const actionItemClick = (event, index) => {
    setselectedActionIndex(index);
    setAction(null);
    let value = event.target.innerText;
    switch (value) {
      case "View Audit Trail":
        return setOpenTrailFlag(true);
        case "Copy":
          return pushToCopySkills(selectedRowID);
      case "Edit":
        return pushToEditSkills(selectedRowID);
      case "Delete":
        return setOpenDeleteDialogFlag(true);
      default:
        return "";
    }
  };

  const actionPopClose = () => {
    setAction(null);
  };
  // const DeleteAfterSave=()=>{
  //   const payload = { "id" : selectedID };
  //    Setloader(true)
  //   deleteSkill(payload).then((res) => {
  //       const flag = res["Success"]
  //       if(flag) {
  //         Setloader(false)
  //         setOpenDeleteDialogFlag(false)
  //         setgetskillsafterDelete(!getskillsafterDelete)
  //       // history.push("/admin/skills")
  //       return

  //   }
  //   Setloader(false)
  //   alert('there was some error please try again !')
  //   // Setloading(false)
  //   setOpenDeleteDialogFlag(false)
  //   });

  // }
  const [isdeleteitLoader, setIsdeleteitLoader] = useState(false);
  const deleteDialogOnconform = () => {
    setSearched("");
    setgetskillsafterDelete(!getskillsafterDelete);
    setDeleteDialogSuccess(false);
  };
  const deleteSuccess = () => {
    setIsdeleteitLoader(true);
    // setIsDeleteLoader(true)
    // setDeleteDialogSuccess(true)
    DeleteAfterSave(selectedRowID);
    // let newCount = deletedLoaderCount
    // newCount++
    // setDeletedLoaderCount(newCount)
    // setOpenDeleteDialogFlag(false);
  };
  //
  const DeleteAfterSave = (selectedRowID) => {
    // setDeleteDialogSuccess(false)
    const payload = { id: selectedRowID, ActionBy: Number(actionbyId) };
    // Setloader(true);

    deleteSLAdetails(payload).then((res) => {
      const flag = res["Success"];
      if (flag) {
        // setOpenDeleteDialogFlag(false);
        // setIsDeleteLoader(false)
        setIsdeleteitLoader(false);
        setOpenDeleteDialogFlag(false);
        setDeleteDialogSuccess(true);
        // setDeleteDialogSuccess(true)
        // Setloader(false);

        // history.push("/admin/skills")
        return;
      }
      // Setloader(false);
      alert("there was some error please try again !");
      // Setloading(false)
    });
  };

  const { products } = store;
  async function slasearch(value) {
    let objNew = { PageNum: 1, PageSize: 10 };

    let newObj = !value.length
      ? { ...objNew, SearchName: value }
      : { ...filters, SearchName: value };

    const val = await fetchsearchSLA(newObj);
    const filteredData = await val();

    setrowSelected(filteredData.Data || []);
    setTotalPagesForSearch(filteredData.TotalPages);
    setTotalCountForSearch(filteredData.TotalCount);
    setCurrentPageForSearch(filteredData.CurrentPage);

    setPageSizeForSearch(filteredData.PageSize);
  }
  const debounceMethod = useCallback(
    debounceFunction((nextValue) => slasearch(nextValue), 1000),
    []
  );
  const skillSearchOnPagination = async (newobj) => {
    let newObj = { ...newobj, SearchName: searched };

    const val = await fetchsearchSLA(newObj);
    const filteredData = await val();

    setrowSelected(filteredData.Data || []);

    setTotalPagesForSearch(filteredData.TotalPages);
    setTotalCountForSearch(filteredData.TotalCount);
    setCurrentPageForSearch(filteredData.CurrentPage);

    setPageSizeForSearch(filteredData.PageSize);
  };
  function convertArraysToString(data, key) {
    let newArray = [];
    for (let i = 0; i < data.length; i++) {
      newArray.push(data[i][`${key}`]);
    }
    let joinedArray = newArray.join();
    return joinedArray;
  }
  const convertDataforExcel = (data) => {
    let newArray = [];

    for (let i = 0; i < data.length; i++) {
      newArray.push({
        Product: data[i].Product.ProdName,
        Services: convertArraysToString(
          data[i].Product.Services,
          "ServiceName"
        ),
        "Product Action": convertArraysToString(
          data[i].ProductAction,
          "ActionName"
        ),
        "Standard Lead Time (Implementation)": data[i].Impl_StandardTime + " days",
        "Critical Lead Time (Implementation)": data[i].Impl_CriticalPath + " days",
        "Standard Lead Time (Overall)": data[i].Overall_StandardTime + " days",
        "Critical Lead Time (Overall)": data[i].Overall_CriticalPath + " days",
        "Working Hours": data[i].WorkingHours + " hours",
        "Last Modified By":data[i].ModifiedBy,
        "Last Modified On":data[i].ModifiedDate,
      });
    }
    return newArray;
  };
  const downloadExcel = () => {
    const payloadForExcel = { WithOutPagination: true };

    dispatch(fetchProductsSLAforExcel(payloadForExcel)).then((resp) => {
      let data = convertDataforExcel(resp.Data);
      const workSheet = XLSX.utils.json_to_sheet(data);
      const workBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workBook, workSheet, "ProductSlaData");
      //Buffer
      // let buf=XLSX.write(workBook,{bookType:"xlsx",type:"buffer"})
      //Binary string
      XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
      //Download
      XLSX.writeFile(workBook, "ProductSlaData.xlsx");
    });
  };
  return (
    <div>
      {(products && products.list && products.list.isLoading) || isLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <>
          {SetOpenBox && (
            <Menu
              id="lock-menu"
              anchorEl={action}
              open={actionPopOpen}
              onClose={actionPopClose}
              MenuListProps={{
                "aria-labelledby": "lock-button",
                role: "listbox",
              }}
              style={{ boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)" }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {actions.map((action, index) => (
                <MenuItem
                  key={action}
                  onClick={(event) => actionItemClick(event, index)}
                >
                  {action.label}
                </MenuItem>
              ))}
            </Menu>
          )}
          {openTrailFlag === true && (
            <ViewDialog
              name="auditrail"
              title={"Audit Trail History"}
              message={<ViewAuditTrail pageData={filters} pageID={3} />}
              showCancelBtn={true}
              showOkBtn={false}
              setOpen={setOpenTrailFlag}
            />
          )}
          {openDeleteDialogFlag === true && (
            <ConfirmDialog
              name="delete"
              onConfirm={deleteSuccess}
              confirmText={"Delete"}
              title={"Are You Sure ?"}
              message={`Do you really want to delete ${selectedRowskill.Product.ProdName}?`}
              //open={openDeleteDialogFlag}
              setOpen={setOpenDeleteDialogFlag}
              warningIcon={true}
              showCancelBtn={true}
              isLoading={isdeleteitLoader}
            />
          )}
          {deleteDialogSuccess === true && (
            <ConfirmDialog
              name="delete"
              onConfirm={deleteDialogOnconform}
              confirmText={"Okay"}
              title={"Deleted"}
              message={`${selectedRowskill.Product.ProdName} deleted sucessfully!`}
              //open={openDeleteDialogFlag}
              setOpen={setDeleteDialogSuccess}
              warningIcon={true}
              showCancelBtn={false}
            />
          )}
          {/* { openDeleteDialogFlag == true && 
    
        <ViewDialog name="delete" onConfirm={DeleteAfterSave} confirmText={"Confirm"} title={ "Are You Sure?"} 
         message={ <span >This action will delete this skill from the Skills record,
            please confirm by clicking on the confirm button.</span>} 
            open ={openDeleteDialogFlag}/>
      } */}
          <div className={classes.topButton}>
          {ActionNames.includes("Extract")&&
            <span className={classes.exactLink}>
              <DownloadIcon />{" "}
              <span
                onClick={() => downloadExcel()}
                className={classes.exactText}
              >
                Extract SLA
              </span>
            </span>}
            <span className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                // value={setValue}
                // onChange={(e)=>searchHelp(e)}
                onChange={(e) => {
                  debounceMethod(e.target.value);
                  setSearched(e.target.value);
                }}
                // onCancelSearch={() => cancelSearch()}
              />
            </span>
            {ActionNames.includes("Add")&&  <ButtonDesign
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => history.push("addsla")}
              children={<span>Add SLA</span>}
              style={{ fontSize: "14px" }}
            />}
          </div>
          <div className={classes.tabPanel}>
            <StyledTable
              rows={
                searched.length
                  ? rowSelected
                  : rowmessage=="There is no records available."? []:products && products.list && products.list.data
              }
              //rows={rows}
              columns={columns}
              pageNumber={
                searched.length
                  ? CurrentPageForSearch
                  : products && products.list && products.list.currentPage
              }
              pageSize={
                searched.length
                  ? PageSizeForSearch
                  : products && products.list && products.list.pageSize
              }
              totalCount={
                searched.length
                  ? TotalCountForSearch
                  : products && products.list && products.list.totalCount
              }
              totalPages={
                searched.length
                  ? TotalPagesForSearch
                  : products && products.list && products.list.totalPages
              }
              handlePaginationBackward={handlePaginationBackward}
              handlePaginationForward={handlePaginationForward}
              openBox={OpenBox}
              SetOpenBox={SetOpenBox}
            />
          </div>
        </>
      )}
    </div>
  );
});

export default ProductSLA;
