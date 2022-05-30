// import Select from "@mui/material/Select";
// import { fetchAddSLA } from "../../../../redux/helpers/product";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./styles";
import ButtonDesign from "./../../../../components/Button";
import TextFieldInput from "../../../../components/TextField";
import { fetchAllPodMembers } from "../../../../redux/helpers/podMembers";
import {
  fetchAllSkillsTeamMembers,
  fetchTeammembersDetails,
} from "../../../../redux/helpers/teammemberskills";
import { fetchAllPriorityLevels } from "../../../../redux/helpers/prioritylevels";
import Select from "@mui/material/Select";

import {
  TextField,
  Grid,
  Box,
  Checkbox,
  // Chip,
  // CircularProgress,
  MenuItem,
  // Button,
  // ListItemText,
  // Select,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import ConfirmDialog from "../../../../components/Dialogs/ConfirmDialog";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import CheckBoxIcon from "@mui/icons-material//CheckBox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import Switches from "./../../../../components/Switch";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import ViewDialog from "./../../../../components/Dialogs";
import { fetchAddTeammember } from "./../../../../redux/helpers/teammembers";
import {
  findSelectAllInData,
  ValidateEmail,
  getCheckedFlag,
  convert,
  LatestTime,
  toTitleCase,
  CurrentTime,
  convertArra2string,
  convertTimeAndHours,
  allLetter,
  convertDate,
  alphanumeric,
  // ISTtoCST,
} from "./helper";
import { withRouter } from "react-router-dom";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const AddMember = withRouter(({ history }) => {
  const classes = styles();
  const actionbyId = localStorage.getItem("actionby");
  const RoleFlag = localStorage.getItem("Role");
  
  const [formData, setFormData] = useState({
    memberName: "",
    memberId: "",
    userName: "",
    emailId: "",
    role: "user",
    isActive: true,
    priorityLevel: "",
    date: "",
    time: "",
    membersList: null,
    primarySkills: [],
    secondarySkills: [],
    RequestAllocation: true,
    IsTurnOffRequestManually: true,
    TurnOnRequestDateTime: null,
    ActionBy: Number(actionbyId),
    emailIdErr: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectAllIconFlag, SetselectAllIconFlag] = useState({
    memberName: false,
    memberId: false,
    primarySkills: false,
    secondarySkills: false,
  });

  const [allSkillStore, setAllSkillsStore] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [allPodmembers, setAllPodmembers] = useState([]);
  const [allLevels, setAllLevels] = useState([]);

  const [secondrySkillsDropdownValue, setsecondrySkillDropdownValues] =
    useState([]);
  const [errormessage, setErrormessage] = useState("");
  const [errorForTime, setErrorfortime] = useState(false);
  const [timemark, settimemark] = useState(false);
  // const [dateValue, setDateValue] = React.useState(ISTtoCST());
  const [dateValue, setDateValue] = React.useState(
    new Date(
      new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })
    )
  );
  const [timeAP, setTimeAP] = React.useState(
    LatestTime().AMPM === "am" ? 1 : 2
  );
  const [timeHH, setTimeHH] = React.useState(CurrentTime(LatestTime().HOUR));
  const [timeMM, setTimeMM] = React.useState(CurrentTime(LatestTime().MINUTES));
  const [saveSuccessDialog, setSaveSuccessDialog] = useState(false);
  const [saveDialog, setSaveDialog] = useState(false);
  const [isSavedLoader, setIsSavedLoader] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);
  const [roleValue, setRoleValue] = React.useState("user");
  const [activeIt, setActiveIt] = useState("active");
  const [endDateTimeValue, setEndDateTimeValue] = React.useState("set");
  const [switchState, setSwitchState] = React.useState(true);
  const [copyMemberLoading, setCopyMemberLoading] = useState(false);
  const [openDialogCopyForm, setOpenDialogCopyForm] = useState(false);
  const [flagForVaidateName, setFlagForVaidateName] = useState(false);
  const [flagForVaidateMemeberId, setFlagForVaidateMemeberId] = useState(false);
  const [flagForVaidateUserName, setFlagForVaidateUserName] = useState(false);
  const [flagForVaidateEmail, setFlagForVaidateEmail] = useState(false);
  // const [flagForVaidatePrimarySkills,setFlagForVaidatePrimarySkills]=useState(false)
  const {
    memberName,
    memberId,
    userName,
    emailId,
    priorityLevel,
    membersList,
    primarySkills,
    secondarySkills,
  } = formData;
  let stringifyFormdata = JSON.stringify(formData);
  const disabledvalue = useMemo(
    () => disableCheck(),
    [stringifyFormdata, timemark]
  );

  const getAllSkills = () => {
    setIsLoading(true);
    fetchAllSkillsTeamMembers().then((res) => {
      setIsLoading(false);
      setAllSkills(res.Data);
      setAllSkillsStore(res.Data);
	  setsecondrySkillDropdownValues(res.Data);
    });
  };
  const getAllPodmembers = () => {
    setIsLoading(true);
    fetchAllPodMembers().then((res) => {
      setIsLoading(false);
      setAllPodmembers(res.Data);
    });
  };
  const getAllPriorityLevels = () => {
    setIsLoading(true);
    fetchAllPriorityLevels().then((res) => {
      setIsLoading(false);
      setAllLevels(res.Data);
    });
  };

  const setSelectedPrimarySkills = (value) => {
  
  !primarySkills.length&&setAllSkills(allSkillStore)
  !secondarySkills.length&&setsecondrySkillDropdownValues(allSkillStore)
    const flag = findSelectAllInData(value, "Name");

    if (flag) {
      SetselectAllIconFlag({
        ...selectAllIconFlag,
        primarySkills: !selectAllIconFlag.primarySkills,
      });
      if (allSkills.length === formData.primarySkills.length) {
        setFormData({ ...formData, primarySkills: [] });
      }
      setFormData({ ...formData, primarySkills: allSkills });
      let selectedsecondValues = [...allSkills];
      let selectedsecondValuesWithOnlyName = [];
      for (let i = 0; i < selectedsecondValues.length; i++) {
        selectedsecondValuesWithOnlyName.push(selectedsecondValues[i].Name);
      }
      const filteredsecondData = secondrySkillsDropdownValue.filter((item) => {
        
        return !selectedsecondValuesWithOnlyName.includes(item.Name);
      });
    
    
      setsecondrySkillDropdownValues(filteredsecondData);
      return;
    }
	
    const filterSelectedData = value.filter((item) => {
      return item.Name !== "Select All";
    });

    SetselectAllIconFlag({ ...selectAllIconFlag, primarySkills: false });
    setFormData({ ...formData, primarySkills: filterSelectedData });
	
    let selectedValues = [...filterSelectedData];
    let selectedValuesWithOnlyName = [];
    for (let i = 0; i < selectedValues.length; i++) {
      selectedValuesWithOnlyName.push(selectedValues[i].Name);
    }
    const filteredData = allSkills.filter((item) => {
      if (item.Name === "Select All") {
        return [];
      }
      return !selectedValuesWithOnlyName.includes(item.Name);
    });
	

    setsecondrySkillDropdownValues(filteredData);
  };

  const setFlagforprimaryIcon = (value) => {
    const flag = findSelectAllInData(value, "Name");

    if (flag) {
      if (allSkills.length === formData.primarySkills.length) {
        setFormData({ ...formData, primarySkills: [] });
      }
    }
  };
  const [serval,setserval]=useState([])
  const [serhhval,setserhhval]=useState([])
  const filterPrimaryMembersAccToSecondrySkills = (value) => {
	 
	  value.length&&setserval(value)
	  value.length==0&&setAllSkills(allSkills.concat(serval))
    const getAgentNameInArray =
      value.length &&
      value.map((item) => {
        return item.Name;
      });

    if (getAgentNameInArray.length) {
      const filteredValues =
        allSkillStore.length &&
        allSkillStore.filter((items) => {
          return !getAgentNameInArray.includes(items.Name);
        });
     
     
	  setAllSkills(filteredValues);
    }
	
  };

  const setSelectedSecondarySkills = (value) => {
 
  
    const flag = findSelectAllInData(value, "Name");
    if (flag) {
      SetselectAllIconFlag({
        ...selectAllIconFlag,
        secondarySkills: !selectAllIconFlag.secondarySkills,
      });
      if (
        secondrySkillsDropdownValue.length === formData.secondarySkills.length
      ) {
        setFormData({ ...formData, secondarySkills: [] });
        return;
      }
      setFormData({
        ...formData,
        secondarySkills: secondrySkillsDropdownValue,
      });
	  let selectedValues = [...secondrySkillsDropdownValue];
	  let selectedValuesWithOnlyName = [];
	  for (let i = 0; i < selectedValues.length; i++) {
		selectedValuesWithOnlyName.push(selectedValues[i].Name);
	  }
	  const filteredData = allSkills.filter((item) => {
		return !selectedValuesWithOnlyName.includes(item.Name);
	  });
	 setAllSkills(filteredData);
      // filterPrimaryMembersAccToSecondryMembers(secondryMembersDropdownValue)
      return;
    }

    const filteredValue = value.filter((item) => {
      return item !== "Select All";
    });
	
    filterPrimaryMembersAccToSecondrySkills(filteredValue);
    SetselectAllIconFlag({ ...selectAllIconFlag, secondarySkills: false });
    setFormData({ ...formData, secondarySkills: filteredValue });
  };
  const setFlagforIconPrimarySkills = (value) => {
    const flag = findSelectAllInData(value, "Name");

    if (flag) {
      if (
        secondrySkillsDropdownValue.length === formData.secondarySkills.length
      ) {
        setFormData({ ...formData, secondarySkills: [] });
      }
    }
  };

  const handleFormData = (e) => {
    const { name, value } = e.target;
    if (name === "memberName") {
      let flagmemberName = allLetter(e.target);
      const { name, value } = e.target;

      (flagmemberName || !value) && setFormData({ ...formData, [name]: value });
    } else if (name === "memberId" || name === "userName") {
      let flagme = alphanumeric(e.target);
      const { name, value } = e.target;

      (flagme || !value) && setFormData({ ...formData, [name]: value });
    } else {
      setFormData({
        ...formData,
        [`${name}`]: value,
      });
    }
  };
  // const isSaveButtonDisabled =
  // //productTypes.length > 0 &&
  // productAction.length > 0 &&
  // impStandard &&
  // impCritical &&
  // impWorking &&
  // overStandard &&
  // overCritical;

  function HandleAfterSave() {
    setSaveSuccessDialog(false);
    history.push("/admin/teammembers");
  }
  const errorTimeClose = () => {
    setErrorfortime(false);
  };

  const handleSaveDialog = () => {
    setSaveDialog(true);
  };

  const handleSaveSuccessDialog = () => {
    setIsSavedLoader(true);
    handleSave();
  };

  const errorDialogClose = () => {
    setErrorDialog(false);
  };
  const handleCancel = () => {
    history.push("/admin/teammembers");
  };
  const handleSave = () => {
    const {
      memberName,
      memberId,
      userName,
      emailId,

      priorityLevel,

      isActive,
      primarySkills,
      secondarySkills,
      RequestAllocation,
    } = formData;

    const dateVal = convertDate(dateValue);

    let date1 =
      dateVal.length && dateVal[0] + " " + dateVal[1] + " " + dateVal[2];
    const times = convertTimeAndHours(timeAP, timeHH, timeMM);
    // setIsLoading(true);

    const payload = {
      Id: 0,
      Name: memberName,
      AgentCode: memberId,
      EmailId: emailId,
      Role: roleValue=="user"?1:(roleValue=="admin"?3:2),
   
      UserName: userName,
      IsActive: isActive,
      PriorityLevel: roleValue === "manager" ? Number(priorityLevel) : null,
      Level : `Level ${roleValue === "manager" ? Number(priorityLevel) : null}`,
      RequestAllocation: RequestAllocation,
      IsTurnOffRequestManually: RequestAllocation
        ? null
        : endDateTimeValue === "change",
      TurnOnRequestDateTime:
        !switchState && date1 && times ? date1 + " " + times : null,
      PrimarySkillIds: convertArra2string(primarySkills),
      SecondarySkillIds: convertArra2string(secondarySkills),
      ActionBy: Number(actionbyId),
    };

    fetchAddTeammember(payload).then((res) => {
      setIsSavedLoader(false);
      // setIsLoading(false);

      if (res && res["Success"]) {
        setSaveSuccessDialog(true);

        return;
      }
      setErrormessage(res["Message"]);

      setErrorDialog(true);
    });
  };

  useEffect(() => {
    getAllSkills();
    getAllPriorityLevels();
    getAllPodmembers();
  }, []);

  // const [switchState, setSwitchState] = React.useState({
  //   checkedA: true,
  //   checkedB: true,
  // });

  const handleChangeRole = (event) => {
    setRoleValue(event.target.value);

    setFormData({
      ...formData,
      role: event.target.value,
    });
    event.target.value === "user" &&
      setFormData({
        ...formData,
        priorityLevel: null,
      });
    // if (event.target.value === "manager") {
    //   setSwitchState(false);
    //   setFormData({ ...formData, RequestAllocation: false });
    //   return;
    // }

    // setSwitchState(true);
  };

  const handleChangeActive = (event) => {
    setActiveIt(event.target.value);
    setFormData({
      ...formData,
      isActive: event.target.value === "active",
    });
  };

  const handleChangeEnd = (event) => {
    setEndDateTimeValue(event.target.value);
    setFormData({
      ...formData,
      IsTurnOffRequestManually: event.target.value === "change",
    });
  };

  //   const [priorityLavel, setPriorityLavel] = React.useState("");
  const handleChangePriority = (event) => {
    console.log('ggg', event)
    // setPriorityLavel(event.target.value);
    setFormData({
      ...formData,
      priorityLevel: event.target.value,
    });
  };

  const slectedit = (filterSelectedData) => {
    let selectedValues = [...filterSelectedData];
    let selectedValuesWithOnlyName = [];
    for (let i = 0; i < selectedValues.length; i++) {
      selectedValuesWithOnlyName.push(selectedValues[i].Name);
    }
    const filteredData = allSkills.filter((item) => {
      if (item.Name === "Select All") {
        return [];
      }
      return !selectedValuesWithOnlyName.includes(item.Name);
    });
    setsecondrySkillDropdownValues(filteredData);
  };
  const getteamMemberDetails = (teamMemberId) => {
    // setFormData({ ...formData, [name]: value })

    setFormData({
      ...formData,
      memberName: "",
      memberId: "",
      userName: "",
      emailId: "",
      primarySkills: [],
      secondarySkills: [],
    });

    const payload = { Id: teamMemberId };
    fetchTeammembersDetails(payload).then((res) => {
      const teamMemeberData = res && res["Data"];
      const {
        // AgentCode,
        // EmailId,
        IsActive,
        IsTurnOffRequestManually,
        Level,
        PriorityLevel,
        // Name,
        PrimarySkills,
        RequestAllocation,
        Role,
        SecondarySkills,
        TurnOnRequestDateTime,
        // UserName,
      } = teamMemeberData;

      let dateAndTime = !RequestAllocation ? TurnOnRequestDateTime : "";
      let splited = dateAndTime && dateAndTime.split(" ");
      let dateIt, time, HH, MM, KI;
      if (splited) {
        dateIt = splited[2] + "/" + splited[0] + "/" + splited[1];

        time = `${splited[3]}:00`;
        HH = time.split(":")[0];
        MM = time.split(":")[1];
        KI = splited[4];
        Number(HH) < 10 ? setTimeHH(HH[1]) : setTimeHH(HH);
        Number(MM) < 10 ? setTimeMM(MM[1]) : setTimeMM(MM);
        KI === "AM" ? setTimeAP(1) : setTimeAP(2);

        setDateValue(dateIt);
      }
      // let numbers = PriorityLevel && PriorityLevel.match(/\d+/g).map(Number);
      let numbers = PriorityLevel;
      setFormData({
        ...formData,
        memberName: "",
        memberId: "",
        userName: "",
        emailId: "",
        role: Role ? Role==1?"Team Member":"Manager"  : "user",
        RequestAllocation: RequestAllocation,
        IsTurnOffRequestManually: IsTurnOffRequestManually,
        primarySkills: PrimarySkills || [],
        secondarySkills: SecondarySkills || [],
        // priorityLevel: numbers && numbers[0],
        priorityLevel: numbers,
        date: dateIt || "",
        time:
          [
            Number(HH) < 10 ? HH[1] : HH,
            Number(MM) < 10 ? MM[1] : MM,
            "00",
          ].join(":") || "",
      });
      PrimarySkills.length && slectedit(PrimarySkills);

      setSwitchState(RequestAllocation);
      // let RoleValues = Role ? Role==1?"Team Member":"Manager"  : "";
      // console.log('RoleValues',RoleValues)
      // RoleValues ? setRoleValue(RoleValues) : setRoleValue("user");
      let RoleValues = Role ? Role==1?"user":(Role==3?"admin":"manager" ) : "";
      RoleValues ? setRoleValue(RoleValues) : setRoleValue("user");

      // IsTurnOffRequestManually&&setEndDateTimeValue("change");
      IsTurnOffRequestManually
        ? setEndDateTimeValue("change")
        : setEndDateTimeValue("set");
      !switchState && setEndDateTimeValue("change");
      // endDateTimeValue=="set"&& TurnOnRequestDateTime==null&&setDateValue(new Date());setTimeHH(CurrentTime(LatestTime().HOUR));setTimeMM(CurrentTime(LatestTime().MINUTES));setTimeAP(LatestTime().AMPM=="am"?1:2)
      //
      endDateTimeValue === "set" &&
        TurnOnRequestDateTime === null &&
        setDateValue(
          new Date(
            new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })
          )
        );
      setTimeHH(CurrentTime(LatestTime().HOUR));
      setTimeMM(CurrentTime(LatestTime().MINUTES));
      setTimeAP(LatestTime().AMPM === "am" ? 1 : 2);
      // TurnOnRequestDateTime==null

      IsActive ? setActiveIt("active") : setActiveIt("inactive");
      setCopyMemberLoading(false);
      setOpenDialogCopyForm(false);
    });
  };

  const handleChangePodmembers = (event, newvalue) => {
    // setPriorityLavel(event.target.value);
    setFormData({
      ...formData,
      // membersList: event.target.value,
      membersList: newvalue,
    });
  };

  // const RowData = useSelector((state) => state.podMembers?.list?.data) || [];

  const switchHandleChange = (event) => {
    setSwitchState(event.target.checked);
    if (event.target.checked) {
      setFormData({
        ...formData,
        IsTurnOffRequestManually: null,
        TurnOnRequestDateTime: null,
        RequestAllocation: event.target.checked,
      });

      // setRoleValue("user");
      return;
    }
    setFormData({
      ...formData,
      RequestAllocation: event.target.checked,
    });
    // setRoleValue("manager");
  };

  // const [dateValue, setDateValue] = React.useState(new Date());
  // const [timeHH, setTimeHH] = React.useState(LatestTime().HOUR);
  const handleChangeHH = (event) => {
    setTimeHH(event.target.value);
  };

  // const [timeMM, setTimeMM] = React.useState(LatestTime().MINUTES);
  const handleChangeMM = (event) => {
    setTimeMM(event.target.value);
  };

  // =LatestTime().AMPM
  const handleChangeAP = (event) => {
    setTimeAP(event.target.value);
    let values = event.target.value;
    let format = values === 1 ? "AM" : "PM";
    let vals = [
      timeHH < 10 ? `0${timeHH}` : timeHH,
      timeMM < 10 ? `0${timeMM}` : timeMM,
    ].join(":");
    let newValue = vals + " " + format;

    setFormData({
      ...formData,
      time: newValue,
    });
  };

  const dialogCopyForm = () => {
    setFormData({
      ...formData,
      // membersList: event.target.value,
      membersList: null,
    });
    setOpenDialogCopyForm(true);
  };

  const onConfirmDialogCopyForm = () => {
    setCopyMemberLoading(true);
    getteamMemberDetails(membersList.Id);
    // setOpenDialogCopyForm(false)
  };
  const Validatememberboundary = (name) => {
    name === "memberName" && !memberName.length && setFlagForVaidateName(true);
    name === "memberId" &&
      !memberId.length &&
      setFlagForVaidateMemeberId(true);
    name === "userName" && !userName.length && setFlagForVaidateUserName(true);
    name === "emailId" && (!emailId.length||!ValidateEmail(emailId)) && setFlagForVaidateEmail(true);
  };
  const ValidateFocusmemberboundary = (name) => {
    name === "memberName" && setFlagForVaidateName(false);
    name === "memberId" && setFlagForVaidateMemeberId(false);
    name === "userName" && setFlagForVaidateUserName(false);
    name === "emailId" && setFlagForVaidateEmail(false);
  };

  const defaultProps = {
    options: allPodmembers,
    getOptionLabel: (option) => option.AgentName || "",
  };

  const teamMemberName = () => {
    return (
      <>
        <div className={classes.chipSelectHeading}>Team Member Name</div>
        <Autocomplete
          {...defaultProps}
          id="copy-form"
          className={classes.copyFormName}
          value={membersList || []}
          onChange={handleChangePodmembers}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={membersList == null && "Select Copy From"}
            />
          )}
        />
      </>
    );
  };
  const SelectPlaceholder = ({ children }) => {
    //const classes = usePlaceholderStyles();
    return <div className={classes.placeholder}>{children}</div>;
  };
  function ValidateCurrentTimings(dateVals) {
    let currentDate = dateVals ? convertDate(dateVals) : convertDate(dateValue);
    let LastTimeZone = LatestTime().AMPM.toUpperCase();
    // let latestDate=convertDate(new Date());
    // let latestDate = convertDate(ISTtoCST());
    let latestDate = convertDate(
      new Date(
        new Date(
          new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })
        )
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
      }
    }

    return false;
  }
  function disableCheck() {
    // const [FlagSave,setFlagSave]=useState()

    let formDatas = { ...formData };
    const {
      role,
      date,
      time,
      emailIdErr,
      isActive,
      membersList,
	  primarySkills,
      secondarySkills,
      IsTurnOffRequestManually,
      TurnOnRequestDateTime,
      ActionBy,
      RequestAllocation,
      priorityLevel,
      podMembers,
      servicesTypes,
      ...restArray
    } = formDatas;

    const propertyValues = Object.values(restArray);
    let flagfirst = false;
    propertyValues.map((item) => {
      if (!item.length) {
        flagfirst = true;
      }
      return flagfirst;
    });
    let flagForVaidateEmail = !ValidateEmail(emailId);
    const flag2 = !flagfirst ? flagForVaidateEmail : flagfirst;

    // const flag3=!errorForTime?!errorForTime:flag2
    const finalFlag = !timemark ? flag2 : timemark;
    // flag2 =  validateTimings()

    return finalFlag;
  }

  return (
    <>
      {openDialogCopyForm === true && (
        <ViewDialog
          name="copyform"
          title={"Copy From"}
          loading={copyMemberLoading}
          message={teamMemberName()}
          showCancelBtn={true}
          showSaveBtn={true}
          showOkBtn={false}
          clickOutsideToClose={onConfirmDialogCopyForm}
          setOpen={setOpenDialogCopyForm}
          showdisableBtn={membersList == null ? true : false}
        />
      )}
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={8} className={classes.titleContain}>
            <h1>Add Team Member</h1>
            <span className={classes.copyForm} onClick={dialogCopyForm}>
              <CopyAllIcon /> Copy From
            </span>
          </Grid>
        </Grid>
        <Grid container spacing={3} className={classes.marginBottom}>
          <Grid item xs={4}>
            <lable className={classes.chipSelectHeading}>
              Name{" "}
              <span className={classes.selectLimit}>
                (Max 50 characters are allowed)
              </span>{" "}
              <span className={classes.star}>*</span>
            </lable>
            <TextFieldInput
              placeholder="Enter Member Name"
              value={memberName}
              name="memberName"
              onChange={handleFormData}
              margin="dense"
              inputProps={{ maxLength: 50 }}
              onBlur={()=>Validatememberboundary("memberName")}
              error={flagForVaidateName}
              onFocus={()=>ValidateFocusmemberboundary("memberName")}
            />
          </Grid>
          <Grid item xs={4}>
            <lable className={classes.chipSelectHeading}>
              Member ID{" "}
              <span className={classes.selectLimit}>
                (Max 50 characters are allowed)
              </span>{" "}
              <span className={classes.star}>*</span>
            </lable>
            <TextFieldInput
              placeholder="Enter Member ID"
              value={memberId}
              name="memberId"
              onChange={handleFormData}
              margin="dense"
              inputProps={{ maxLength: 50 }}
              onBlur={()=>Validatememberboundary("memberId")}
              error={flagForVaidateMemeberId}
              onFocus={()=>ValidateFocusmemberboundary("memberId")}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} className={classes.marginBottom}>
          <Grid item xs={4}>
            <lable className={classes.chipSelectHeading}>
              Username{" "}
              <span className={classes.selectLimit}>
                (Max 50 characters are allowed)
              </span>{" "}
              <span className={classes.star}>*</span>
            </lable>
            <TextFieldInput
              placeholder="Enter Username"
              value={userName}
              name="userName"
              onChange={handleFormData}
              margin="dense"
              inputProps={{ maxLength: 50 }}
              onBlur={()=>Validatememberboundary("userName")}
              error={flagForVaidateUserName}
              onFocus={()=>ValidateFocusmemberboundary("userName")}
            />
          </Grid>
          <Grid item xs={4}>
            <lable className={classes.chipSelectHeading}>
              Email{" "}
              <span className={classes.selectLimit}>
                (Max 254 characters are allowed)
              </span>{" "}
              <span className={classes.star}>*</span>
            </lable>
            <TextFieldInput
              placeholder="Enter email id"
              value={emailId}
              name="emailId"
              onChange={handleFormData}
              // onBlur={(e) => {
              //   let value = e.target.value;
              //   const flag = ValidateEmail(value);
              //   flag
              //     ? setFormData({
              //         ...formData,
              //         emailIdErr: false,
              //       })
              //     : setFormData({
              //         ...formData,
              //         emailIdErr: true,
              //       });
              //   // alert("Enter valid Email");
              // }}
              onBlur={()=>Validatememberboundary("emailId")}
              error={flagForVaidateEmail}
              margin="dense"
              inputProps={{ maxLength: 254 }}
              onFocus={()=>ValidateFocusmemberboundary("emailId")}
            />
            {/* {formData.emailIdErr && (
              <div style={{ textAlign: "center" }}>
                {" "}
                <span style={{ color: "red" }}>Please Enter Valid Email !</span>
              </div>
            )} */}
          </Grid>
        </Grid>

        {/* End Grid */}

        <Grid container spacing={3} className={classes.marginBottom}>
          <Grid item xs={8}>
            <div className={classes.chipSelectHeading}>Primary Skills</div>
            <Autocomplete
              multiple
              limitTags={5}
              id="primary-skills"
              className={classes.chipSelect}
              options={[{ Id: 0, Name: "Select All" }, ...allSkills] || []}
              disableCloseOnSelect
              loading={isLoading}
              value={primarySkills}
              onChange={(e, newValue) => {
                // if (!newValue.length) {
                //   setsecondrySkillDropdownValues([]);

                //   setFormData({
                //     ...formData,
                //     primarySkills: [],
                //     secondarySkills: [],
                //   });

                //   return;
                // }
                setSelectedPrimarySkills(newValue);

                setFlagforprimaryIcon(newValue);
              }}
              getOptionLabel={(option) => option.Name}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    checked={
                      selected || getCheckedFlag(option, primarySkills, "Name")
                    }
                    indeterminate={option.Name === "Select All" ? true : false}
                    indeterminateIcon={
                      <IndeterminateCheckBoxIcon
                        color={selectAllIconFlag.primarySkills ? "primary" : ""}
                      />
                    }
                    color="primary"
                  />
                  <div className={classes.checkboxLabel}>{option.Name}</div>
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder={
                    primarySkills.length ? "" : "Select Primary Skills"
                  }
                  // onBlur={validatePrimarySkills}
                  // error={flagForVaidatePrimarySkills}
                  className={classes.chipSelectInput}
                  // onFocus={validatebackPrimarySkills}
                />
              )}
            />
            {/* <Autocomplete
              multiple
              limitTags={2}
              id="primary-team-member"
              className={classes.chipSelect}
              options={[{ Id: 0, Name: "Select All" }, ...allSkills] || []}
              //defaultValue={[top100Films[2]]}, ...allPodMembers
              disableCloseOnSelect
              loading={isLoading}
              value={primarySkills}
              onChange={(e, newValue) => {
                if (!newValue.length) {
                  setsecondrySkillDropdownValues([]);

                  setFormData({
                    ...formData,
                    primarySkills: [],
                    secondarySkills: [],
                  });

                  return;
                }
                setSelectedPrimarySkills(newValue);

                setFlagforprimaryIcon(newValue);
              }}
              getOptionLabel={(option) => option.Name}
              // renderTags={() => null}
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    indeterminate={option.Name === "Select All" ? true : false}
                    checked={selected}
                    indeterminateIcon={
                      <IndeterminateCheckBoxIcon
                        color={selectAllIconFlag.primarySkills ? "primary" : ""}
                      />
                    }
                    color="primary"
                  />
                  <div className={classes.checkboxLabel}>{option.Name}</div>
                </React.Fragment>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder={
                    primarySkills.length ? "" : "Select Primary Members"
                  }
                  className={classes.chipSelectInput}
                />
              )}
              renderValue={
                primarySkills &&
                primarySkills.map((p) => (
                  <Chip
                    key={p.Id}
                    label={p.Name}
                    className={classes.prodcutTypeChip}
                    color="primary"
                    onDelete={onDeletePrimarySkillsChips(p.Id)}
                  />
                ))
              }
            /> */}
          </Grid>
        </Grid>

        <Grid container spacing={3} className={classes.marginBottom}>
          <Grid item xs={8}>
            <div className={classes.chipSelectHeading}>Secondary Skills</div>
            <Autocomplete
              multiple
              limitTags={5}
              id="secondary-skills"
              className={classes.chipSelect}
              options={
                secondrySkillsDropdownValue.length
                  ? [
                      { Id: 0, Name: "Select All" },
                      ...secondrySkillsDropdownValue,
                    ]
                  : []
              }
              disableCloseOnSelect
              loading={isLoading}
              value={secondarySkills}
              onChange={(e, newValue) => {
                setSelectedSecondarySkills(newValue);
                setFlagforIconPrimarySkills(newValue);
              }}
              getOptionLabel={(option) => option.Name}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    checked={
                      selected ||
                      getCheckedFlag(option, secondarySkills, "Name")
                    }
                    indeterminate={option.Name === "Select All" ? true : false}
                    indeterminateIcon={
                      <IndeterminateCheckBoxIcon
                        color={
                          selectAllIconFlag.secondaryTeamMember ? "primary" : ""
                        }
                      />
                    }
                    color="primary"
                  />
                  <div className={classes.checkboxLabel}>{option.Name}</div>
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder={
                    secondarySkills.length ? "" : "Select Secondary Skills"
                  }
                  className={classes.chipSelectInput}
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={2}>
            <div className={classes.chipSelectHeading}>Role</div>
          </Grid>
          <Grid item xs={10} style={{ marginBottom: "15px" }}>
            <RadioGroup
              row
              aria-label="role"
              name="row-radio-buttons-group"
              value={roleValue}
              onChange={handleChangeRole}
            >
              <FormControlLabel
                value="user"
                control={<Radio color="primary" size="small" />}
                label="Team Member"
              />
              <FormControlLabel
                value="manager"
                control={<Radio color="primary" size="small" />}
                label="Manager"
              />
              <FormControlLabel
                value="admin"
                control={<Radio color="primary" size="small" />}
                label="Admin"
              />
              
              
            </RadioGroup>
          </Grid>
        </Grid>
        {roleValue === "manager" ? (
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <div className={classes.chipSelectHeading}>Priority Level</div>
              <Select
                id="manage-priority"
                value={priorityLevel}
                onChange={handleChangePriority}
                style={{ width: "100%", marginBottom: "20px" }}
                className={classes.selectOption}
                displayEmpty
                renderValue={
                  priorityLevel !== ""
                    ? undefined
                    : () => (
                        <SelectPlaceholder>
                          Select priority Level
                        </SelectPlaceholder>
                      )
                }
              >
                {allLevels?.map((productType) => (
                  <MenuItem key={productType.Id} value={productType.Id}>
                    {productType.Level}
                  </MenuItem>
                ))}
                {/* <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem> */}
              </Select>
            </Grid>
          </Grid>
        ) : null}
        <Grid container spacing={3} rowSpacing={3}>
          <Grid item xs={2}>
            <div className={classes.chipSelectHeading}>Active Status</div>
          </Grid>
          <Grid item xs={10}>
            <RadioGroup
              onChange={handleChangeActive}
              value={activeIt}
              row
              aria-label="active"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="active"
                control={<Radio color="primary" size="small" />}
                label="Active"
              />
              <FormControlLabel
                value="inactive"
                control={<Radio color="primary" size="small" />}
                label="Inactive"
              />
            </RadioGroup>
          </Grid>
          <Grid item xs={2}>
            <div className={classes.chipSelectHeading}>Request Allocation</div>
          </Grid>
          <Grid item xs={10}>
            <Switches
              checked={switchState}
              onChange={switchHandleChange}
              color="primary"
              name="checkedB"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </Grid>

          {switchState ? null : (
            <>
              <Grid item xs={2}>
                <div className={classes.chipSelectHeading}>
                  End Date and Time
                </div>
              </Grid>

              <Grid item xs={10}>
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
              </Grid>
              {endDateTimeValue === "change" ? null : (
                <>
                  <Grid item xs={2}>
                    <div className={classes.chipSelectHeading}>
                      Select Date and Time{" "}
                      <span className={classes.star}>*</span>
                    </div>
                  </Grid>

                  <Grid item xs={3}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        // minDate={ISTtoCST(new Date())}
                        minDate={
                          new Date(
                            new Date().toLocaleString("en-US", {
                              timeZone: "America/Chicago",
                            })
                          )
                        }
                        value={dateValue}
                        onChange={(newValue) => {
                         
                          setDateValue(newValue);

                          setFormData({
                            ...formData,
                            date: convert(newValue),
                          });
                          let flag = ValidateCurrentTimings(newValue);
                          flag ? setErrorfortime(true) : setErrorfortime(false);
                          flag ? settimemark(true) : settimemark(false);
                        }}
                        InputProps={{ disableUnderline: true }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={3}>
                    <Grid container spacing={3}>
                      <Grid item xs={4}>
                        <Select
                          labelId="demo-controlled-open-select-label"
                          id="hours"
                          value={timeHH}
                          onChange={handleChangeHH}
                          onBlur={() => {
                            let flag = ValidateCurrentTimings();

                            flag
                              ? setErrorfortime(true)
                              : setErrorfortime(false);
                            flag ? settimemark(true) : settimemark(false);
                          }}
                          className={classes.selectOption}
                        >
                          {/* <MenuItem value="">
                        <em>None</em>
                      </MenuItem> */}
                          {Array.from({ length: 12 }, (_, i) => i + 1).map(
                            (item) => {
                              // let Time_data=LatestTime();
                              // const {HOUR}=Time_data;
                              // if(item<HOUR){
                              // return <MenuItem disabled value={item}>{item}</MenuItem>;}
                              // else{
                              return (
                                <MenuItem key={item} value={item}>
                                  {item}
                                </MenuItem>
                              );
                            }
                            // }
                          )}
                        </Select>
                        <div className={classes.timeSelectHeading}>Hours</div>
                      </Grid>
                      <Grid item xs={4}>
                        <Select
                          id="minutes"
                          value={timeMM}
                          onChange={handleChangeMM}
                          onBlur={() => {
                            let flag = ValidateCurrentTimings();

                            flag
                              ? setErrorfortime(true)
                              : setErrorfortime(false);
                            flag ? settimemark(true) : settimemark(false);
                          }}
                          className={classes.selectOption}
                        >
                          {Array.from(new Array(60), (x, i) => i).map(
                            (item) => {
                              // let Time_data=LatestTime();
                              // const {MINUTES}=Time_data;
                              // if(item<MINUTES){
                              // return <MenuItem disabled value={item}>{item}</MenuItem>;}
                              // else{
                              return (
                                <MenuItem key={item} value={item}>
                                  {item}
                                </MenuItem>
                              );
                            }
                            // }
                          )}
                        </Select>
                        <div className={classes.timeSelectHeading}>Minutes</div>
                      </Grid>

                      <Grid item xs={4}>
                        <Select
                          id="ampm"
                          value={timeAP}
                          onChange={handleChangeAP}
                          onBlur={() => {
                            let flag = ValidateCurrentTimings();

                            flag
                              ? setErrorfortime(true)
                              : setErrorfortime(false);
                            flag ? settimemark(true) : settimemark(false);
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
                </>
              )}
            </>
          )}
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Box mt={3}>
              <ButtonDesign
                variant="contained"
                color="primary"
                onClick={handleSaveDialog}
                style={{ fontSize: "16px" }}
                // disabled={!isSaveButtonDisabled}
                disabled={disabledvalue}
                // disabled={false}
              >
                Save
              </ButtonDesign>
              &nbsp;&nbsp;&nbsp;
              <ButtonDesign
                variant="outlined"
                color="primary"
                onClick={() => handleCancel()}
                style={{ fontSize: "16px" }}
              >
                Cancel
              </ButtonDesign>
            </Box>
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid>

        {saveDialog && (
          <ConfirmDialog
            name="auditrail"
            title={"do you want to save this record?"}
            saveIcon={true}
            message={"Please check the information before submitting!"}
            saveText={"Save"}
            onSave={handleSaveSuccessDialog}
            showSaveBtn={true}
            isLoading={isSavedLoader}
            showCancelBtn={true}
            showOkBtn={false}
            setOpen={setSaveDialog}
            //onCancel={handleSaveCancel}
          />
        )}
        {saveSuccessDialog && (
          <ConfirmDialog
            name="auditrail"
            title={"Saved!"}
            successIcon={true}
            message={`${memberName} saved sucessfully!`}
            saveText={"Okay"}
            onSave={HandleAfterSave}
            showSaveBtn={true}
            showCancelBtn={false}
            showOkBtn={false}
            setOpen={setSaveDialog}
            //onCancel={handleSaveCancel}
          />
        )}

        {errorDialog === true && (
          <ConfirmDialog
            name="delete"
            onConfirm={errorDialogClose}
            setOpen={setErrorDialog}
            confirmText={"Okay"}
            title={"Oops"}
            message={`${errormessage} `}
            //open={openDeleteDialogFlag}
            //setOpen={setOpenDeleteDialogFlag}
            warningIcon={true}
            showCancelBtn={false}
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
  );
});

export default AddMember;
