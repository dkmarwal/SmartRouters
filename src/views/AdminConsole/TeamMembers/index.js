import React, { useEffect, useState, useCallback } from "react";
import Box from "@mui/material/Box";
import styles from "./styles";
import StyledTable from "./../../../components/Table";
import SlaChip from "../../../components/SlaChip";
import Popover from "../../../components/Popover";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import CircularProgress from "@mui/material/CircularProgress";
import Switches from "./../../../components/Switch";
import Select from "@mui/material/Select";
import {
  fetchPodMembers,
  fetchPodMembersforexcel,
} from "../../../redux/actions/podmembers";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { fetchSearchMembers } from "../../../redux/actions/podmembers";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ViewDialog from "./../../../components/Dialogs";
import ConfirmDialog from "../../../components/Dialogs/ConfirmDialog";
import ViewAuditTrail from "./ViewAuditTrail";
import ButtonDesign from "../../../components/Button";
import AddIcon from "@mui/icons-material/Add";
import { withRouter } from "react-router-dom";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { ToggleTeammembersDetails } from "../../../redux/helpers/teammemberskills";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { detailTeammembersDetails } from "../../../redux/helpers/teammemberskills";
import DownloadIcon from "@mui/icons-material/Download";
import XLSX from "xlsx";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

import {
  TextField,
  Grid,
  // Checkbox,
  // Chip,
  // ListItemText,
  // Select,
} from "@mui/material";
// function createData(
//   name,
//   agentcode,
//   primaryskills,
//   secondaryskills,
//   designation
// ) {
//   return { name, agentcode, primaryskills, secondaryskills, designation };
// }

// const rows = [
//   createData("Frozen yoghurt", "New", 6.0, 24, 4.0),
//   createData("Ice cream sandwich", "Modify", 9.0, 37, 4.3),
//   createData("Eclair", "Delete", 16.0, 24, 6.0),
//   createData("Cupcake", "Modify", 3.7, 67, 4.3),
//   createData("Gingerbread", "New", 16.0, 49, 3.9),
// ];

const TeamMembers = withRouter(({ history }) => {
  const classes = styles();
  const [OpenBox, SetOpenBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedId, setSelectedId] = useState(null);
  // const [anchorEI, setAnchorEI] = React.useState(null);
  // const [selectedIconId, setSelectedIconId] = useState(null);
  const [
    getrequestallocationsafterToggle,
    setgetrequestallocationsafterToggle,
  ] = useState(false);
  const [errormessage, setErrormessage] = useState("");
  const [filters, setFilters] = useState({
    PageNum: 1,
    PageSize: 10,
  });
  const Permissions= localStorage.getItem("Permissions");
  // const [isDeleteLoader, setIsDeleteLoader] = useState(false);
  // const [deletedLoaderCount, setDeletedLoaderCount] = useState(0);
  const [getskillsafterDelete, setgetskillsafterDelete] = useState(false);
  const [isdeleteitLoader, setIsdeleteitLoader] = useState(false);
  const actionbyId = localStorage.getItem("actionby");
  
  const [errorDialog, setErrorDialog] = useState(false);
  const rowmessage = useSelector((state) => state?.podMembers?.list?.message);
  const RowData = useSelector((state) => state.podMembers?.list?.data) || [];
  const selectedrowData =useSelector((state) => state.rowISelected.selecteditrow) || [];
  const errorDialogClose = () => {
    setErrorDialog(false);
  };
  const [errorForTime, setErrorfortime] = useState(false);
  const RoleFlag = localStorage.getItem("Role");
  const errorTimeClose = () => {
    setErrorfortime(false);
  };
  const deleteSuccess = () => {
    setIsdeleteitLoader(true);
    // setIsDeleteLoader(true)
    // setDeleteDialogSuccess(true)
    DeleteAfterSave(selectedIndexTeammember);
    // let newCount = deletedLoaderCount
    // newCount++
    // setDeletedLoaderCount(newCount)
    // setOpenDeleteDialogFlag(false);
  };
  // useEffect(() => {
  //   getPOD(filters);

  // }, [deletedLoaderCount]);
  const getPOD = (filters) => {
    setIsLoading(true);
    dispatch(fetchPodMembers(filters)).then(() => {
      setIsLoading(false);
    });
  };
  const [loadersForReqAlloc, setLoadersForReqAllocation] = useState({});
  const getPODAfterRequestAllocation = (filters, index) => {
    dispatch(fetchPodMembers(filters)).then(() => {
      let newObj = { ...loadersForReqAlloc, [`${index}`]: false };
      setLoadersForReqAllocation(newObj);
    });
  };
  useEffect(() => {
    getPOD(filters);
    //Below comment is to disable warning explicitly, since there is no other workaround.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getskillsafterDelete, getrequestallocationsafterToggle]);
  // useEffect(() => {
  //   getPOD(filters);
  //   // alert('kkkkkk')

  //   //Below comment is to disable warning explicitly, since there is no other workaround.
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [getrequestallocationsafterToggle]);
  const selectedIndexTeammember =
    useSelector((state) => state.rowIdSelected.selectedrow) || [];
  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };
  // const handleClickIcon = (event, id) => {
  //   setAnchorEI(event.currentTarget);
  //   setSelectedIconId(id);
  // };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function ValidateCurrentTimings(dateVals) {
    let currentDate = dateVals ? convertDate(dateVals) : convertDate(dateValue);
    let LastTimeZone = LatestTime().AMPM.toUpperCase();
    // let latestDate = convertDate(new Date());
    // let latestDate = convertDate(ISTtoCST());
    let latestDate = convertDate(
      new Date(
        new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })
      )
    );
    let selectedTimezone = timeAP === 1 ? "AM" : "PM";
    const currentTimes = LatestTime();

    if (
      currentDate[0] === latestDate[0] &&
      currentDate[1] === latestDate[1] &&
      currentDate[2] === latestDate[2]
    ) {
      if (LastTimeZone === "PM" && selectedTimezone === "AM") {
        // setErrorfortime(true)
        return true;
      }
      if (LastTimeZone === selectedTimezone) {
        if (timeHH < currentTimes.HOUR) {
          return true;
        }
        if (timeHH === currentTimes.HOUR) {
          if (timeMM < currentTimes.MINUTES) {
            return true;
          }
          if (
            timeMM > currentTimes.MINUTES ||
            timeMM === currentTimes.MINUTES
          ) {
            return false;
          }
        }
        if (timeHH > currentTimes.HOUR) {
          return false;
        }

        //         HOUR: 6
        // MINUTES: 34
      }
    }

    return false;
  }
  // const handleCloseIcon = () => {
  //   setAnchorEI(null);
  // };
  const [formData, setFormData] = useState({
    RequestAllocation: false,
    IsTurnOffRequestManually: false,
    TurnOnRequestDateTime: null,
    id: "",
    ActionBy: Number(actionbyId),
    date: "",
    time: "",
  });
  //   function ISTtoCST(intialvalue){
  //     let dateandtimestring= intialvalue?new Date(intialvalue).toString().split("("):
  //     new Date().toString().split("(");
  //     // let dateandtimestring=new Date().toString().split("(");
  //     if (dateandtimestring[1].includes('India')) {
  //       // let timelagging = 11.53;
  //       let timelagging = 11.56;
  //     let indianTime = new Date();
  //     let centralTime = new Date(indianTime.getTime()-((1 * 60 * 60 * 1000) * timelagging));
  //     return centralTime
  // // Found world
  // }
  // let centralTime = new Date();
  // return centralTime

  //   }
  function convertDate(str) {
    // var date = new Date(str),
    let date = new Date(
        new Date(str).toLocaleString("en-US", { timeZone: "America/Chicago" })
      ),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2),
      year = date.getFullYear();
    return [mnth, day, year];
  }

  const convertTimeAndHours = (timeAP, timeHH, timeMM) => {
    let format = timeAP === 1 ? "AM" : "PM";
    let vals = [
      timeHH < 10 ? `0${timeHH}` : timeHH,
      timeMM < 10 ? `0${timeMM}` : timeMM,
    ].join(":");
    let newValue = vals + " " + format;
    return newValue;
  };
  const open = Boolean(anchorEl);
  const id = open ? `simple-popover-${anchorEl}` : undefined;
  // const openIcon = Boolean(anchorEI);
  // const idIcon = openIcon ? `simple-popover-${anchorEI}` : undefined;
  // const [openDeleteDialogFlag, setOpenDeleteDialogFlag] = useState(false);
  // const [switchState, setSwitchState] = React.useState(true);
  const [deleteDialogSuccess, setDeleteDialogSuccess] = useState(false);
  const [rowID, setRowID] = useState([]);
  // const handlerowClick = (i) => {
  //   //setSwitchState(i.target.checked);
  //   let newArray = [...rowID];
  //   let filteredArray = [];
  //   if (rowID.includes(i)) {
  //     filteredArray = newArray.filter((item) => {
  //       return item !== i;
  //     });
  //     setRowID(filteredArray);
  //     return;
  //   }
  //   newArray.push(i);
  //   setRowID(newArray);
  // };
  const actionsarray = [
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

    return value.PageName==="Team Members"
})

let selectedRole = selectedrowData.Role ? selectedrowData.Role==1?"user":(selectedrowData.Role==3?"admin":"manager" ) : "";

let ActionNames=skillsPermissions.map((value)=>{
  return value.ActionName
})
let actionss=ActionNames.includes("Delete")?actionsarray:actionsarray.filter((item) => item.id !== "delete");
let actionFiltered=ActionNames.includes("Modify")?actionss:actionss.filter((item) => item.id !== "edit");
let actions=(RoleFlag==="Manager"&&selectedRole==="admin")?actionFiltered.filter((item) => item.id !== "delete"):actionFiltered;
console.log("kk",(RoleFlag==="Manager"))
  const [action, setAction] = React.useState(false);
  const [switchFlag, setSwitchFlag] = useState(true);
  const [selectedActionIndex, setselectedActionIndex] = React.useState(1);
  const [openDialogRequestFlag, setOpenDialogRequestFlag] = useState(false);
  const selectedRowskill = useSelector(
    (state) => state.rowISelected.selecteditrow
  );
  const actionPopOpen = Boolean(action);
  const actionClick = (event) => {
    setAction(event.currentTarget);
  };
  const [openDialogFlag, setOpenDialogFlag] = useState(false);
  const [openTrailFlag, setOpenTrailFlag] = useState(false);
  // const [selectedRowID, setSelectedRowID] = useState("");
  const [openDeleteDialogFlag, setOpenDeleteDialogFlag] = useState(false);
  const [rowSelected, setrowSelected] = useState([]);
  const [TotalPagesForSearch, setTotalPagesForSearch] = useState(0);
  const [TotalCountForSearch, setTotalCountForSearch] = useState(0);
  const [CurrentPageForSearch, setCurrentPageForSearch] = useState(1);
  const [PageSizeForSearch, setPageSizeForSearch] = useState(1);
  const [searched, setSearched] = useState("");

  // const selectedRowID = useSelector((state) => state.rowIdSelected.selectedrow);
  const pushToEditTeammember = (id) => {
    history.push(`/admin/EditTeammember/${id}`);
  };
  
  const actionItemClick = (event, index) => {
    setselectedActionIndex(index);
    setAction(null);
   
    let value = event.target.innerText;
    switch (value) {
      case "Edit":
        return pushToEditTeammember(selectedIndexTeammember);
      case "Delete":
        return setOpenDeleteDialogFlag(true);
      // return setOpenDialogFlag(true);

      // return deleteSuccess();
      case "View Audit Trail":
        // return setOpenDeleteDialogFlag(true);
        return setOpenTrailFlag(true);
      default:
        return "";
    }
  };
  function LatestTime() {
    // let date = new Date();
    // let date = ISTtoCST();
    let date = new Date(
      new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })
    );

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = { HOUR: hours, MINUTES: minutes, AMPM: ampm };
    return strTime;
  }

  const actionPopClose = () => {
    setAction(null);
  };
  const changenumbertostring = (rolenumber) => {
    const valuestring = rolenumber == 1 ? "Team Member" :(rolenumber==2?"Manager":"Admin");
    return valuestring;
  };

  const columns = [
    {
      id: "active",
      label: "1",
      minWidth: 20,
      textIndent: -100,
      format: (value, i) => {
        return (
          <div style={{
            // display: 'flex',
            // alignItems: 'center',
            // flexWrap: 'wrap',
            verticalAlign: 'middle',
            display: 'inline-flex'
        }}>
          <Tooltip title={RowData[i]?.IsActive ? "active" : "inactive"}>
            
            <FiberManualRecordIcon
              style={
                RowData[i]?.IsActive
                  ? { color: "#7BDCB5" }
                  : { color: "#B80000" }
                  
              }
            />
            </Tooltip>
            </div>
          
        );
      },

      isClickable: true,
    },
    {
      id: "Name",
      label: "Member Details",
      minWidth: 170,
      //format: (value,i) => value && value.toLocaleString("en-US"),
      format: (value, i) => {
        return (
          <>
            <div className={classes.name}>
              {value && value.toLocaleString("en-US")}
            </div>
            <div className={classes.email}>
              {searched.length ? rowSelected[i]?.EmailId : RowData[i]?.EmailId}
            </div>
          </>
        );
      },
      isClickable: true,
    },
    {
      id: "AgentCode",
      label: "Member ID",
      minWidth: 120,
      format: (value) => value && value.toLocaleString("en-US"),
      isClickable: true,
    },
    {
      id: "PrimarySkills",
      label: "Primary Skills",
      minWidth: 0,
      //format: (value) => value && value.toLocaleString("en-US"),
      format: (skills, i) => {
        const visibleSkillsCount = 1;
        const moreCount = skills && skills.length - visibleSkillsCount;
        const showMoreCount = moreCount > 0;
        return (
          <>
            <div
              //aria-describedby={`PrimarySkills`}
              id={`popperTriggerPOD${i}`}
              onClick={(e) => handleClick(e, `${i}-primaryskills`)}
            >
              <span>
                {skills &&
                  skills
                    .filter((_, i) => i < visibleSkillsCount)
                    .map((skill, i) => skill["Name"])
                    .join(", ")}
              </span>
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
                skills.length > 1 && open && selectedId === `${i}-primaryskills`
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
                {skills &&
                  skills.map((skill) => (
                    <div key={skill["Name"]}>{skill["Name"]}</div>
                  ))}
              </Box>
            </Popover>
          </>
        );
      },
      isClickable: true,
    },
    {
      id: "SecondarySkills",
      label: "Secondary Skills",
      minWidth: 0,
      align: "left",
      //format: (value) => value && value.toLocaleString("en-US"),
      format: (skills, i) => {
        const visibleSkillsCount = 1;
        const moreCount = skills && skills.length - visibleSkillsCount;
        const showMoreCount = moreCount > 0;
        return (
          <>
            <div
              //aria-describedby={`${id}`}
              id={`popperTriggerSecondary${i}`}
              onClick={(e) => handleClick(e, `${i}-secondaryskills`)}
            >
              <span>
                {skills &&
                  skills
                    .filter((_, i) => i < visibleSkillsCount)
                    .map((skill, i) => skill["Name"])
                    .join(", ")}
              </span>
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
                skills.length > 1 &&
                open &&
                selectedId === `${i}-secondaryskills`
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
                {skills &&
                  skills.map((skill) => (
                    <div key={skill["Name"]}>{skill["Name"]}</div>
                  ))}
              </Box>
            </Popover>
          </>
        );
      },
      isClickable: true,
    },
    {
      id: "Role",
      label: "Role",
      minWidth: 0,
      align: "center",
      format: (value) =>
        value && changenumbertostring(value).toLocaleString("en-US"),
      isClickable: true,
    },
	{
		id: "Capacity",
		label: "Work Allotted(in hrs)",
		minWidth: 0,
		align: "center",
		// format: (value) => <b>{`${value == ""||null ? 0 + ' hrs' : value + 'hrs'}`}</b>,
		format: (value) => <SlaChip name={`${value == ""||null ? 0  : value }`} />,
		isClickable: false,
	  },
	//   {
	// 	id: "ImplSLA",
	// 	label: "Implementation SLA",
	// 	minWidth: 0,
	// 	align: "center",
	// 	format: (value1) =>
	// 	  value1.Key.length ? (
	// 		value1.Key === "Due in" && value1.Value === "01 day" ? (
	// 		  <>
	// 			<SlaChip name={"duein01days".toLocaleString("en-US")} />
	// 			<span>{value1.Value.toLocaleString("en-US")}</span>
	// 		  </>
	// 		) : value1.Key === "In Operations" &&
	// 		  value1.Value === "Before Breach" ? (
	// 		  <>
	// 			<SlaChip name={"inoperationbeforebreach"} />
	// 			<span>{value1.Value.toLocaleString("en-US")}</span>
	// 		  </>
	// 		) : value1.Key === "In Operations" &&
	// 		  value1.Value === "After Breach" ? (
	// 		  <>
	// 			<SlaChip
	// 			  name={"inoperationafterbreach".toLocaleString("en-US")}
	// 			/>
  
	// 			<span>{value1.Value.toLocaleString("en-US")}</span>
	// 		  </>
	// 		) : (
	// 		  <>
	// 			<SlaChip
	// 			  name={value1.Key && value1.Key.toLocaleString("en-US")}
	// 			/>
	// 			<span>{value1.Value.toLocaleString("en-US")}</span>
	// 		  </>
	// 		)
	// 	  ) : (
	// 		""
	// 	  ),
	// 	isClickable: true,
	//   },
    {
      id: "requestallocation",
      label: "Request Allocation",
      minWidth: 170,
      align: "center",
      format: (value, index) => (
        <>
          {loadersForReqAlloc[`${index}-req`] === true ? (
            <CircularProgress size={20} />
          ) : (
            <>
              {" "}
              <Switches
                // checked={rowID.includes(index)}
                checked={
                  searched.length
                    ? rowSelected[index]?.RequestAllocation
                    : RowData[index]?.RequestAllocation
                }
                // defaultChecked = {true}
                onChange={(e) => {
                  // handlerowClick(index);
                  let flag = e.target.checked;
                  if (flag === true) {
                    let newObj = {
                      ...loadersForReqAlloc,
                      [`${index}-req`]: true,
                    };
                    setLoadersForReqAllocation(newObj);
                    const payload = {
                      id: RowData[index]?.Id,
                      RequestAllocation: true,
                      IsTurnOffRequestManually: null,
                      TurnOnRequestDateTime: null,
                      ActionBy: Number(actionbyId),
                    };
                    ToggleTeammembersDetails(payload).then((res) => {
                      const flag = res["Success"];
                      if (flag) {
                        // setIsSavedLoader(false);
                        getPODAfterRequestAllocation(filters, index);
                        // setOpenDialogRequestFlag(false);
                        return;
                      }

                      setErrormessage(res["Message"]);

                      setErrorDialog(true);
                    });
                  }
                  setFormData({
                    ...formData,
                    id: RowData[index]?.Id,
                  });
                  // handleSwitchData()

                  setSwitchFlag(flag);
                  if (flag === false) {
                    setOpenDialogRequestFlag(true);
                    return;
                  }
                }}
                color="primary"
                name="checkedB"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </>
          )}
        </>
      ),
      isClickable: true,
    },
    {
      id: "Id",
      label: "2",
      minWidth: 30,
      align: "center",
      textIndent: -5000,
      format: (value, index) => (
        <>
          <IconButton
            aria-label="more"
            //id="long-button"
            //aria-controls="long-menu"
            // aria-expanded={actionPopOpen ? action : undefined}
            aria-haspopup="true"
            onClick={(e) => {
              actionClick(e);
              // setSelectedRowID(selectedIndexTeammember)
            }}
            style={{ color: "#0C2174" }}
          >
            <MoreVertIcon />
          </IconButton>
        </>
      ),
      isClickable: false,
    },
  ];

  const store = useSelector((state) => state);

  const dispatch = useDispatch();

  const { podMembers } = store;
  // const [switchState, setSwitchState] = React.useState({
  //   checkedA: true,
  //   checkedB: true,
  // });

  const handlePaginationChange = (newObj) => {
    setRowID([]);
    setFilters(newObj);
    searched.length ? skillSearchOnPagination(newObj) : getPOD(newObj);
  };

  const handlePaginationForward = () => {
    const newPageNum = filters["PageNum"] + 1;
    const newObj = { PageNum: newPageNum, PageSize: filters["PageSize"] };
    handlePaginationChange(newObj);
  };

  const handlePaginationBackward = () => {
    const newPageNum = filters["PageNum"] - 1;
    const newObj = { PageNum: newPageNum, PageSize: filters["PageSize"] };
    handlePaginationChange(newObj);
  };
  function convert(str) {
    // var date = new Date(str),
    let date = new Date(
        new Date(str).toLocaleString("en-US", { timeZone: "America/Chicago" })
      ),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("/");
  }
  const [endDateTimeValue, setEndDateTimeValue] = React.useState("");
  const requestAfterSave = () => {
    // setDeleteDialogSuccess(false)

    const {
      RequestAllocation,
      IsTurnOffRequestManually,
      // TurnOnRequestDateTime,
      id,
      ActionBy,
      // date,
      // time,
    } = formData;

    if (endDateTimeValue.length) {
      const dateVal = convertDate(dateValue);

      let date1 =
        dateVal.length && dateVal[0] + " " + dateVal[1] + " " + dateVal[2];

      const times = convertTimeAndHours(timeAP, timeHH, timeMM);

      const payload = {
        id: id,
        RequestAllocation: RequestAllocation,
        IsTurnOffRequestManually: IsTurnOffRequestManually,
        TurnOnRequestDateTime:
          date1 && times && endDateTimeValue.length
            ? date1 + " " + times
            : null,
        ActionBy: ActionBy,
      };
      // Setloader(true);

      ToggleTeammembersDetails(payload).then((res) => {
        const flag = res["Success"];
        if (flag) {
          // setOpenDeleteDialogFlag(false);
          setIsSavedLoader(false);
          setgetrequestallocationsafterToggle(
            !getrequestallocationsafterToggle
          );
          setOpenDialogRequestFlag(false);

          // setDeleteDialogSuccess(true)
          // Setloader(false);

          // history.push("/admin/skills")
          return;
        }
        // Setloader(false);
        setErrormessage(res["Message"]);

        setErrorDialog(true);
        // Setloading(false)
      });
    }
  };
  const [isSavedLoader, setIsSavedLoader] = useState(false);
  const requestAllocationSave = () => {
    setIsSavedLoader(true);
    // setDeleteDialogSuccess(true)
    requestAfterSave();
    // setOpenDeleteDialogFlag(false);
  };
  // const switchHandleChange = (event) => {
  //   setSwitchState({
  //     ...switchState,
  //     [event.target.name]: event.target.checked,
  //   });
  // };

  const handleChangeEnd = (event) => {
    setEndDateTimeValue(event.target.value);
    setFormData({
      ...formData,
      IsTurnOffRequestManually: event.target.value === "change",
    });
  };
  function CurrentTime(num) {
    if (num < 10) {
      let stre = num.toString();
      let OutNum = Number(stre.replace(/^0*(.+)/, "$1"));
      return OutNum;
    } else {
      return num;
    }
  }
  // const [dateValue, setDateValue] = React.useState(new Date());
  // const [dateValue, setDateValue] = React.useState(ISTtoCST());
  const [dateValue, setDateValue] = React.useState(
    new Date(
      new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })
    )
  );
  const [timeHH, setTimeHH] = React.useState(CurrentTime(LatestTime().HOUR));
  const handleChangeHH = (event) => {
    setTimeHH(event.target.value);
  };

  const [timeMM, setTimeMM] = React.useState(CurrentTime(LatestTime().MINUTES));
  const handleChangeMM = (event) => {
    setTimeMM(event.target.value);
    setFormData({
      ...formData,
      time: [timeHH, event.target.value, "00"].join(":"),
    });
  };

  const [timeAP, setTimeAP] = React.useState(
    LatestTime().AMPM === "am" ? 1 : 2
  );
  const handleChangeAP = (event) => {
    setTimeAP(event.target.value);
  };
  useEffect(() => {
    setEndDateTimeValue("set");
    endDateTimeValue === "set" &&
      // setDateValue(new Date());
      // setDateValue(ISTtoCST());
      setDateValue(
        new Date(
          new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })
        )
      );
    setTimeHH(CurrentTime(LatestTime().HOUR));
    setTimeMM(CurrentTime(LatestTime().MINUTES));
    setTimeAP(LatestTime().AMPM === "am" ? 1 : 2);
  }, [openDialogRequestFlag === false]);
  const turnOffDialogMessage = (i) => {
    return (
      <>
        <Grid item xs={12}>
          <div className={classes.name}>Turn Off Request Allocation Until</div>
        </Grid>
        <Grid item xs={12}>
          <div style={{ marginTop: "20px" }}>
            <RadioGroup
              onChange={handleChangeEnd}
              value={endDateTimeValue}
              row
              aria-label="end"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="set"
                control={<Radio color="primary" size="small" />}
                label="Set End Date and Time"
              />
              <FormControlLabel
                value="change"
                control={<Radio color="primary" size="small" />}
                label="Change Manually at a Later Time"
              />
            </RadioGroup>
          </div>
        </Grid>
        {endDateTimeValue === "set" && (
          <>
            <Grid container spacing={3}>
              <Grid item xs={12}></Grid>
              <Grid item xs={5}>
                <div className={classes.name} style={{ paddingBottom: "10px" }}>
                  Select Date and Time{" "}
                </div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    minDate={
                      new Date(
                        new Date().toLocaleString("en-US", {
                          timeZone: "America/Chicago",
                        })
                      )
                    }
                    value={dateValue}
                    // defaultValue={08/18/2014}
                    onChange={(newValue) => {
                      setDateValue(newValue);
                      setFormData({
                        ...formData,
                        date: convert(newValue),
                      });
                      let flag = ValidateCurrentTimings(newValue);
                      flag ? setErrorfortime(true) : setErrorfortime(false);
                    }}
                    InputProps={{ disableUnderline: true }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={7}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <div
                      className={classes.name}
                      style={{ paddingBottom: "10px" }}
                    >
                      Select Date and Time{" "}
                    </div>
                  </Grid>
                  <Grid item xs={4} style={{ paddingTop: "0px" }}>
                    <Select
                      labelId="demo-controlled-open-select-label"
                      id="hours"
                      value={timeHH}
                      onChange={handleChangeHH}
                      onBlur={() => {
                        let flag = ValidateCurrentTimings();

                        flag ? setErrorfortime(true) : setErrorfortime(false);
                      }}
                      className={classes.selectOption}
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(
                        (item) => {
                          return (
                            <MenuItem key={item} value={item}>
                              {item}
                            </MenuItem>
                          );
                        }
                      )}
                    </Select>
                    <div className={classes.timeSelectHeading}>Hours</div>
                  </Grid>
                  <Grid item xs={4} style={{ paddingTop: "0px" }}>
                    <Select
                      id="minutes"
                      value={timeMM}
                      onChange={handleChangeMM}
                      onBlur={() => {
                        let flag = ValidateCurrentTimings();

                        flag ? setErrorfortime(true) : setErrorfortime(false);
                      }}
                      className={classes.selectOption}
                    >
                      {Array.from({ length: 60 }, (_, i) => i).map((item) => {
                        return (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <div className={classes.timeSelectHeading}>Minutes</div>
                  </Grid>
                  <Grid item xs={4} style={{ paddingTop: "0px" }}>
                    <Select
                      id="ampm"
                      value={timeAP}
                      onChange={handleChangeAP}
                      onBlur={() => {
                        let flag = ValidateCurrentTimings();

                        flag ? setErrorfortime(true) : setErrorfortime(false);
                      }}
                      className={classes.selectOption}
                    >
                      <MenuItem key={1} value={1}>
                        AM
                      </MenuItem>
                      <MenuItem key={2} value={2}>
                        PM
                      </MenuItem>
                    </Select>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid item xs={10}>
              
            </Grid> */}
          </>
        )}
      </>
    );
  };
  const deleteDialogOnconform = () => {
    setSearched("");
    setgetskillsafterDelete(!getskillsafterDelete);
    setDeleteDialogSuccess(false);
  };

  const DeleteAfterSave = (selectedRowID) => {
    // setDeleteDialogSuccess(false)
    const payload = { id: selectedRowID, ActionBy: Number(actionbyId) };
    // Setloader(true);

    detailTeammembersDetails(payload).then((res) => {
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
  const skillSearchOnPagination = async (newobj) => {
    let newObj = { ...newobj, SearchName: searched };

    const val = await fetchSearchMembers(newObj);
    const filteredData = await val();

    setrowSelected(filteredData.Data || []);
    setTotalPagesForSearch(filteredData.TotalPages);
    setTotalCountForSearch(filteredData.TotalCount);
    setCurrentPageForSearch(filteredData.CurrentPage);

    setPageSizeForSearch(filteredData.PageSize);
  };
  async function skillssearch(value) {
    let objNew = { PageNum: 1, PageSize: 10 };

    let newObj = !value.length
      ? { ...objNew, SearchName: value }
      : { ...filters, SearchName: value };

    const val = await fetchSearchMembers(newObj);
    const filteredData = await val();

    setrowSelected(filteredData.Data || []);
    setTotalPagesForSearch(filteredData.TotalPages);
    setTotalCountForSearch(filteredData.TotalCount);
    setCurrentPageForSearch(filteredData.CurrentPage);

    setPageSizeForSearch(filteredData.PageSize);
  }
  const debounceMethod = useCallback(
    debounceFunction((nextValue) => skillssearch(nextValue), 1000),
    []
  );
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
        "Is Active": data[i].IsActive==true?"Active":"Inactive",
        "User Name": data[i].Name,
        "Email Id": data[i].EmailId,
       "Memeber ID": data[i].AgentCode,
        // Products: {"p","o"},

        // productsall(data[i])
        // .map((x)=>{
        //   console.log(x)
        //         return x
        //       })
        // :"",
        "Primary Skills": data[i].PrimarySkills.length
          ? convertArraysToString(data[i].PrimarySkills, "Name")
          : "",
        "Secondary Skills": data[i].SecondarySkills.length
          ? convertArraysToString(data[i].SecondarySkills, "Name")
          : "",
        Role: data[i].Role==1?"Team member":(data[i].Role==3?"Admin":"Manager"),
        
        "Request Allocation": data[i].RequestAllocation==true?"on":"off",
      });

      // data[i].Products.length>1&&  newArray.push({Services:func2(data[i],i)
      // });
    }
    // data[i].Products.length>1?func1(data[i],i):""

    return newArray;
  };
  const downloadExcel = () => {
    const payloadForExcel = { WithOutPagination: true };

    dispatch(fetchPodMembersforexcel(payloadForExcel)).then((resp) => {
      let data = convertDataforExcel(resp.Data);
      const workSheet = XLSX.utils.json_to_sheet(data);
      const workBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workBook, workSheet, "TeammembersData");
      //Buffer
      // let buf=XLSX.write(workBook,{bookType:"xlsx",type:"buffer"})
      //Binary string
      XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
      //Download
      XLSX.writeFile(workBook, "TeammembersData.xlsx");
    });
  };

  return (
    <>
      {(podMembers && podMembers.list && podMembers.list.isLoading) ||
      isLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <>
          {
            openDialogRequestFlag && (
              <ViewDialog
                name="auditrail"
                title={"Turn off Request Allocation ?"}
                message={turnOffDialogMessage(rowID)}
                showCancelBtn={true}
                showOkBtn={false}
                showTurnBtn={true}
                turnText={true}
                setOpen={setOpenDialogRequestFlag}
                loading={isSavedLoader}
                onConfirm={requestAllocationSave}
                showdisableBtn={
                  endDateTimeValue !== "set" && endDateTimeValue !== "change"
                }
              />
            )

            // <ViewDialog name="auditrail"
            //       title={"Audit Trail History"}
            //       message={<ViewAuditTrail pageData={filters} pageID={2}/>}
            //       showCancelBtn={true}
            //       showOkBtn={false}
            //       setOpen={setOpenDialogFlag}
            //       />
          }
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
          {/* {openDialogFlag == true && (
            <ViewDialog
              name="auditrail"
              title={"Audit Trail History"}
              message={<ViewAuditTrail pageData={filters} pageID={2}/>}
              showCancelBtn={true}
              showOkBtn={false}
              setOpen={setOpenDialogFlag}
            />
          )} */}
         
          <div className={classes.topButton}>
          {ActionNames.includes("Extract")&&
            <span className={classes.exactLink}>
              <DownloadIcon />{" "}
              <span
                onClick={() => downloadExcel()}
                className={classes.exactText}
              >
                Extract Team
              </span>
            </span>}
            <div className={classes.search}>
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
                onChange={(e) => {
                  debounceMethod(e.target.value);
                  setSearched(e.target.value);
                }}
              />
            </div>
            {ActionNames.includes("Add")&&    <ButtonDesign
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => history.push("addteammember")}
              children={
                <span style={{ FontSize: "14px" }}>Add New Member</span>
              }
              style={{ fontSize: "14px" }}
            />}
          </div>
          <div className={classes.tabPanel}>
            <StyledTable
              rows={
                searched.length
                  ? rowSelected
                  : rowmessage == "There is no records available."
                  ? []
                  : podMembers && podMembers.list && podMembers.list.data
              }
              //rows={rows}
              columns={columns}
              pageNumber={
                searched.length
                  ? CurrentPageForSearch
                  : podMembers && podMembers.list && podMembers.list.currentPage
              }
              pageSize={
                searched.length
                  ? PageSizeForSearch
                  : podMembers && podMembers.list && podMembers.list.pageSize
              }
              totalCount={
                searched.length
                  ? TotalCountForSearch
                  : podMembers && podMembers.list && podMembers.list.totalCount
              }
              totalPages={
                searched.length
                  ? TotalPagesForSearch
                  : podMembers && podMembers.list && podMembers.list.totalPages
              }
              handlePaginationBackward={handlePaginationBackward}
              handlePaginationForward={handlePaginationForward}
              openBox={OpenBox}
              SetOpenBox={SetOpenBox}
              name={"TeamMembers"}
            />
            {openDeleteDialogFlag === true && (
              <ConfirmDialog
                name="delete"
                onConfirm={deleteSuccess}
                confirmText={"Delete"}
                title={"Are You Sure ?"}
                message={`Do you really want to delete ${selectedRowskill.Name}?`}
                //open={openDeleteDialogFlag}
                setOpen={setOpenDeleteDialogFlag}
                warningIcon={true}
                showCancelBtn={true}
                isLoading={isdeleteitLoader}
              />
            )}
            {errorDialog === true && (
              <ConfirmDialog
                name="delete"
                onConfirm={errorDialogClose}
                confirmText={"Okay"}
                title={"Oops"}
                message={`${errormessage} `}
                //open={openDeleteDialogFlag}
                //setOpen={setOpenDeleteDialogFlag}
                warningIcon={true}
                showCancelBtn={false}
              />
            )}
            {deleteDialogSuccess === true && (
              <ConfirmDialog
                name="delete"
                onConfirm={deleteDialogOnconform}
                confirmText={"Okay"}
                title={"Deleted"}
                message={`${selectedRowskill.Name} deleted sucessfully!`}
                //open={openDeleteDialogFlag}
                setOpen={setOpenDialogFlag}
                warningIcon={true}
                showCancelBtn={false}
              />
            )}
            {openTrailFlag === true && (
              <ViewDialog
                name="auditrail"
                title={"Audit Trail History"}
                message={<ViewAuditTrail pageData={filters} pageID={2} />}
                showCancelBtn={true}
                showOkBtn={false}
                setOpen={setOpenTrailFlag}
              />
            )}
            {errorForTime === true && (
              <ConfirmDialog
                name="delete"
                onConfirm={errorTimeClose}
                confirmText={"Okay"}
                title={"Oops"}
                message={`Incorrect time entry`}
                setOpen={setErrorfortime}
                //open={openDeleteDialogFlag}
                //setOpen={setOpenDeleteDialogFlag}
                warningIcon={true}
                showCancelBtn={false}
              />
            )}
          </div>
        </>
      )}
    </>
  );
});

export default TeamMembers;
