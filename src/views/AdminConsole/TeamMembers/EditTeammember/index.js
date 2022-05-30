// import { fetchAddSLA } from "../../../../redux/helpers/product";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import ButtonDesign from "./../../../../components/Button";
import TextFieldInput from "../../../../components/TextField";
import { fetchAllPodMembers } from "../../../../redux/helpers/podMembers";
import {
  fetchAllSkillsTeamMembers,
  fetchTeammembersDetails,
} from "../../../../redux/helpers/teammemberskills";
import ConfirmDialog from "../../../../components/Dialogs/ConfirmDialog";
import { fetchAllPriorityLevels } from "../../../../redux/helpers/prioritylevels";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import {
  TextField,
  Grid,
  Box,
  Checkbox,
  // Chip,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import {findSelectAllInData, ValidateEmail, getCheckedFlag, convert, LatestTime, 
  toTitleCase, CurrentTime, convertArra2string, convertTimeAndHours, allLetter, convertDate, alphanumeric, 
} from './helper';
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useSelector } from "react-redux";
import Switches from "./../../../../components/Switch";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import ViewDialog from "./../../../../components/Dialogs";
import { fetchAddTeammember } from "./../../../../redux/helpers/teammembers";
import { withRouter } from "react-router-dom";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const EditMember = withRouter(({ history }) => {
  const actionbyId = localStorage.getItem("actionby");
  const classes = styles();
  //const actionbyId = localStorage.getItem("actionby");
  const [formData, setFormData] = useState({
    memberName: "",
    memberId: "",
    userName: "",
    emailId: "",
    role: "user",
    date: "",
    time: "",
    IsActive: true,
    priorityLevel: "",
    membersList: null,
    primarySkills: [],
    secondarySkills: [],
    RequestAllocation: true,
    IsTurnOffRequestManually: true,
    TurnOnRequestDateTime: null,
    ActionBy: Number(actionbyId),
    emailIdErr: false,
  });
  const RoleFlag = localStorage.getItem("Role");
  console.log("roleflag",RoleFlag)
  const Permissions= localStorage.getItem("Permissions");
  let skillsPermissions=JSON.parse(Permissions)?.filter((value)=>{

    return value.PageName==="Team Members"
})

let ActionNames=skillsPermissions.map((value)=>{
  return value.ActionName
})
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
    const [errorDialog, setErrorDialog] = useState(false);
    const [errorForTime, setErrorfortime]=useState(false);
    const [timemark, settimemark]=useState(false)
    const [saveDialog, setSaveDialog] = useState(false);
    const [saveSuccessDialog, setSaveSuccessDialog] = useState(false);
    const [isSavedLoader, setIsSavedLoader] = useState(false);
    const [switchState, setSwitchState] = React.useState(true);
    const [roleValue, setRoleValue] = React.useState("user");
  const [activeIt, setActiveIt] = useState("active");
  const [endDateTimeValue, setEndDateTimeValue] = React.useState("change");
  const [loadingforedit, setLoadingforedit] = useState(false);
  const [copyMemberLoading, setCopyMemberLoading] = useState(false);
 
  // const [dateValue, setDateValue] = React.useState(ISTtoCST());
  const [dateValue, setDateValue] = React.useState(new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })));
  const [timeHH, setTimeHH] = React.useState(CurrentTime(LatestTime().HOUR));
  const [timeMM, setTimeMM] = React.useState(CurrentTime(LatestTime().MINUTES));
  const [timeAP, setTimeAP] = React.useState(LatestTime().AMPM === "am" ? 1 : 2);
  const [openDialogCopyForm, setOpenDialogCopyForm] = useState(false);
  const [flagForVaidateName, setFlagForVaidateName] = useState(false);
  const [flagForVaidateMemeberId, setFlagForVaidateMemeberId] = useState(false);
  const [flagForVaidateUserName, setFlagForVaidateUserName] = useState(false);
  const [flagForVaidateEmail, setFlagForVaidateEmail] = useState(false);
  // const [flagForVaidatePrimarySkills, setFlagForVaidatePrimarySkills] =
  //   useState(false);
  const selectedIndexTeammember =
    useSelector((state) => state.rowIdSelected.selectedrow) || null;
 
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

  

  



  // const setSelectedPrimarySkills = (value) => {
  //   const flag = findSelectAllInData(value, "Name");

  //   if (flag) {
  //     SetselectAllIconFlag({
  //       ...selectAllIconFlag,
  //       primarySkills: !selectAllIconFlag.primarySkills,
  //     });
  //     if (allSkills.length === formData.primarySkills.length) {
  //       setFormData({ ...formData, primarySkills: [] });
  //     }
  //     setFormData({ ...formData, primarySkills: allSkills });
  //     return;
  //   }
  //   const filterSelectedData = value.filter((item) => {
  //     return item.Name !== "Select All";
  //   });
  //   SetselectAllIconFlag({ ...selectAllIconFlag, primarySkills: false });
  //   setFormData({ ...formData, primarySkills: filterSelectedData });

  //   let selectedValues = [...filterSelectedData];
  //   let selectedValuesWithOnlyName = [];
  //   for (let i = 0; i < selectedValues.length; i++) {
  //     selectedValuesWithOnlyName.push(selectedValues[i].Name);
  //   }
  //   const filteredData = allSkills.filter((item) => {
  //     if (item.Name === "Select All") {
  //       return [];
  //     }
  //     return !selectedValuesWithOnlyName.includes(item.Name);
  //   });
  //   setsecondrySkillDropdownValues(filteredData);
  // };
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
  // const filterPrimaryMembersAccToSecondrySkills = (value) => {
  //   const getAgentNameInArray =
  //     value.length &&
  //     value.map((item) => {
  //       return item.Name;
  //     });

  //   if (getAgentNameInArray.length) {
  //     const filteredValues =
  //       allSkillStore.length &&
  //       allSkillStore.filter((items) => {
  //         return !getAgentNameInArray.includes(items.Name);
  //       });

  //     setAllSkills(filteredValues);
  //   }
  // };
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
  function ValidateCurrentTimings(dateVals){
    let currentDate=dateVals ? convertDate(dateVals) :convertDate(dateValue);
    let LastTimeZone=(LatestTime().AMPM).toUpperCase()
    // let latestDate=convertDate(new Date());
    // let latestDate=convertDate(ISTtoCST());
    let latestDate = convertDate(new Date(new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' }))));
    let selectedTimezone =  timeAP===1?'AM':'PM'
   const currentTimes= LatestTime()
   
    if(currentDate[0]===latestDate[0]&&currentDate[1]===latestDate[1]&&currentDate[2]===latestDate[2] ){
      if(LastTimeZone==="PM"&&selectedTimezone==="AM"){
        // setErrorfortime(true)
        return true
      }  
      if(LastTimeZone === selectedTimezone){
        if( timeHH<currentTimes.HOUR  ){
              return true
        }
        if( timeHH === currentTimes.HOUR){
          if(timeMM < currentTimes.MINUTES){
            return true
          }
          if(timeMM > currentTimes.MINUTES ||timeMM === currentTimes.MINUTES ){
            return false
          }
        }
        if(timeHH >currentTimes.HOUR ){
          return false
        }

//         HOUR: 6
// MINUTES: 34

      }
     
    
    }

    return false


  }
  // const setSelectedSecondarySkills = (value) => {
  //   console.log('lolo',primarySkills)
  //   const flag = findSelectAllInData(value, "Name");
  //   if (flag) {
  //     SetselectAllIconFlag({
  //       ...selectAllIconFlag,
  //       secondarySkills: !selectAllIconFlag.secondarySkills,
  //     });
  //     if (
  //       secondrySkillsDropdownValue.length === formData.secondarySkills.length
  //     ) {
  //       setFormData({ ...formData, secondarySkills: [] });
  //       return;
  //     }
  //     setFormData({
  //       ...formData,
  //       secondarySkills: secondrySkillsDropdownValue,
  //     });
  //     // filterPrimaryMembersAccToSecondryMembers(secondryMembersDropdownValue)
  //     return;
  //   }

  //   const filteredValue = value.filter((item) => {
  //     return item !== "Select All";
  //   });

  //   filterPrimaryMembersAccToSecondrySkills(filteredValue);
  //   SetselectAllIconFlag({ ...selectAllIconFlag, secondarySkills: false });
  //   setFormData({ ...formData, secondarySkills: filteredValue });
  // };
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

 
 
  
  const handleSaveDialog = () => {
    setSaveDialog(true);
  };

  const handleSaveSuccessDialog = () => {
    // setSaveDialog(false);
    // setIsLoading(true);
    // setSaveSuccessDialog(true);
    setIsSavedLoader(true);
    handleSave();
  };

  const errorTimeClose = () => {
    setErrorfortime(false);
  };
  const errorDialogClose = () => {
    setErrorDialog(false);
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
  const getteamMemberDetails = (teamMemberId) => {
    const payload = { Id: teamMemberId };
    membersList === null && setLoadingforedit(true);
    if (selectedIndexTeammember === null) {
      HandleAfterSave();
      return;
    }
    
    fetchTeammembersDetails(payload).then((res) => {
    
      membersList === null && setLoadingforedit(false);
      const teamMemeberData = res && res["Data"];
      const {
        AgentCode,
        EmailId,
        // IsActive,
        IsTurnOffRequestManually,
        Level,
        PriorityLevel,
        Name,
        PrimarySkills,
        RequestAllocation,
        Role,
        SecondarySkills,
        TurnOnRequestDateTime,
        UserName,
      } = teamMemeberData;
      

      let dateAndTime =!RequestAllocation? TurnOnRequestDateTime:"";

      let splited = dateAndTime && dateAndTime.split(" ");

      let dateIt, time, HH, MM, KI;

      if (splited) {
        dateIt = splited[2] + "/" + splited[0] + "/" + splited[1];

        time = `${splited[3]}:00`;
        HH = time.split(":")[0];
        MM = time.split(":")[1];

        KI = splited[4];

        setTimeHH(Number(HH));
        setTimeMM(Number(MM));
        KI === "AM" ? setTimeAP(1) : setTimeAP(2);

        setDateValue(dateIt);
      }
      // let numbers = PriorityLevel && PriorityLevel.match(/\d+/g).map(Number);
      let numbers = PriorityLevel;

      setFormData({
        ...formData,
        memberName: membersList != null ? memberName :  Name, 
        memberId: membersList != null ? memberId: AgentCode,
        userName: membersList != null ?  userName: UserName,
        emailId: membersList != null ? emailId : EmailId,
        role: Role ? Role==1?"user":"manager"  : "user",
        RequestAllocation: RequestAllocation,
        IsTurnOffRequestManually: IsTurnOffRequestManually,
        primarySkills: PrimarySkills || [],
        secondarySkills: SecondarySkills || [],
        // priorityLevel: numbers && numbers[0],
        priorityLevel: numbers,
        IsActive: teamMemeberData.IsActive,
        date: dateIt || "",
        time:
          [
            Number(HH) < 10 ? HH[1] : HH,
            Number(MM) < 10 ? MM[1] : MM,
            "00",
          ].join(":") || "",
      });
      // let RoleValues = Role ? Role==1?"user":"manager"  : "";
      let RoleValues = Role ? Role==1?"user":(Role==3?"admin":"manager" ) : "";
   
      RoleValues ? setRoleValue(RoleValues) : setRoleValue("user");
      PrimarySkills.length && slectedit(PrimarySkills);
     
      setSwitchState(RequestAllocation);
      setActiveIt(teamMemeberData.IsActive ? "active" : "inactive");
     
       if( teamMemeberData.RequestAllocation===false){
         if(IsTurnOffRequestManually){
         setEndDateTimeValue("change")}
         else{
          setEndDateTimeValue("set")
         }
          // return
       }
       
       !switchState&&setEndDateTimeValue("change");
        // endDateTimeValue==="set"&& TurnOnRequestDateTime===null&&setDateValue(new Date());setTimeHH(CurrentTime(LatestTime().HOUR));setTimeMM(CurrentTime(LatestTime().MINUTES));setTimeAP(LatestTime().AMPM==="am"?1:2)
        // endDateTimeValue==="set"&& TurnOnRequestDateTime===null&&setDateValue(ISTtoCST());setTimeHH(CurrentTime(LatestTime().HOUR));setTimeMM(CurrentTime(LatestTime().MINUTES));setTimeAP(LatestTime().AMPM==="am"?1:2)
        endDateTimeValue==="set"&& TurnOnRequestDateTime===null&&setDateValue(new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })));
        setTimeHH(CurrentTime(LatestTime().HOUR));setTimeMM(CurrentTime(LatestTime().MINUTES));
      
        setTimeAP(LatestTime().AMPM==="am"?1:2);
        //  teamMemeberData.RequestAllocation!=true &&IsTurnOffRequestManually? setEndDateTimeValue("change"): setEndDateTimeValue("set")

      // IsActive ? setActiveIt("active") : setActiveIt("inactive");
    
      setCopyMemberLoading(false);
      setOpenDialogCopyForm(false);
      // setSelectedPrimarySkills(PrimarySkills)
      setSecondryValuesOnLoad(PrimarySkills);
      console.log("roleValues",roleValue)
      // setSelectedSecondarySkills(SecondarySkills)
    });
  };
  // const isSaveButtonDisabled =
  // //productTypes.length > 0 &&
  // productAction.length > 0 &&
  // impStandard &&
  // impCritical &&
  // impWorking &&
  // overStandard &&
  // overCritical;
  const handleChangeRoleno = (event) => {
   }
  
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
      IsActive: event.target.value === "active",
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
    // setPriorityLavel(event.target.value);
    setFormData({
      ...formData,
      priorityLevel: event.target.value,
    });
  };

 
 

  function setSecondryValuesOnLoad(PrimarySkills) {
    setLoadingforedit(true);
    fetchAllSkillsTeamMembers().then((res) => {
      let allSkills = res.Data;
      setLoadingforedit(false);

      let selectedValues = [...PrimarySkills];

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
      allSkills = res.Data;
    });
  }

  const handleChangePodmembers = (event,newvalue) => {
    // setPriorityLavel(event.target.value);
    setFormData({
      ...formData,
      membersList:  newvalue,
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
      });
      // setRoleValue("user");
      return;
    }

    setFormData({
      ...formData,
      RequestAllocation: event.target.checked,
    });
  };

  // const [dateValue, setDateValue] = React.useState(new Date());
 
 
  
  
  const handleChangeHH = (event) => {
    setTimeHH(event.target.value);
  };

  
  const handleChangeMM = (event) => {
    setTimeMM(event.target.value);
  };

 
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
    setOpenDialogCopyForm(true);
  };

  function HandleAfterSave() {
    history.push("/admin/teammembers");
  }

  const handleSave = () => {
    const {
      memberName,
      memberId,
      userName,
      emailId,
      // role,
      // date,
      // time,
      priorityLevel,
      // membersList,
      IsActive,
      primarySkills,
      secondarySkills,
      // RequestAllocation,
      IsTurnOffRequestManually,
      // TurnOnRequestDateTime,
      // ActionBy,
    } = formData;

    // setIsLoading(true);

    const dateVal = convertDate(dateValue);

    let date1 =
      dateVal.length && dateVal[0] + " " + dateVal[1] + " " + dateVal[2];

    const times = convertTimeAndHours(timeAP, timeHH, timeMM);

    const payload = {
      Id: selectedIndexTeammember != null ? selectedIndexTeammember : 0,
      Name: memberName,
      AgentCode: memberId,
      EmailId: emailId,
      // Role:  roleValue=="user"?1:2,
      Role: roleValue=="user"?1:(roleValue=="admin"?3:2),
      UserName: userName,
      // IsActive: activeIt=="active"?true:false,
      IsActive: IsActive,
      PriorityLevel: roleValue === "manager" ? Number(priorityLevel) : null,
      Level : `Level ${roleValue === "manager" ? Number(priorityLevel) : null}`,
      RequestAllocation: switchState,
      IsTurnOffRequestManually: switchState
        ? null
        : IsTurnOffRequestManually
        ? true
        : false,
      TurnOnRequestDateTime:
        !switchState && date1 && times ? date1 + " " + times : null,
      PrimarySkillIds: convertArra2string(primarySkills),
      SecondarySkillIds: convertArra2string(secondarySkills),
      ActionBy: Number(actionbyId),
    };

    fetchAddTeammember(payload).then((res) => {
      setIsSavedLoader(false);
      setSaveDialog(false);
      // setIsLoading(false);
      if (res && res["Success"]) {
        setSaveSuccessDialog(true);
        //setBtnLoading(false);
        // HandleAfterSave();
        return;
      }
      setErrormessage(res["Message"]);

      setErrorDialog(true);
    });
  };

  // const validateForm = () => {
  //   if (
  //     !formData ||
  //     !formData.impStandard ||
  //     formData.impStandard.trim() === ""
  //   ) {
  //     if (isNaN(formData.impStandard) || formData.impStandard.length != 9) {
  //     }
  //   }
  // };
  const handleCancel = () => {
    history.push("/admin/teammembers");
  };
  useEffect(() => {
    getAllSkills();
    getAllPriorityLevels();
    getAllPodmembers();
  }, []);

  function disableCheck() {
    // const [FlagSave,setFlagSave]=useState()
    let formDatas = { ...formData };
    delete formDatas.role;
    delete formDatas.date;
    delete formDatas.time;
    delete formDatas.emailIdErr;
    // formDatas.IsActive&& delete formDatas.IsActive;
    delete formDatas.IsActive;
    delete formDatas.membersList;
    delete formDatas.primarySkills;
    delete formDatas.secondarySkills;
    delete formDatas.IsTurnOffRequestManually;
    delete formDatas.TurnOnRequestDateTime;
    delete formDatas.ActionBy;
    delete formDatas.RequestAllocation;
    delete formDatas.priorityLevel;

    // delete formDatas.podMembers;
    // delete formDatas.servicesTypes;
    // formDatas = {...formDatas,servicesTypes:[...selectedServices]}

    const propertyValues = Object.values(formDatas);
   
    let flag = false;
    propertyValues.map((item) => {
      if (!item.length) {
        flag = true;
      }
      return flag
     
    });
    let flagForVaidateEmail=!ValidateEmail(emailId);
     const flag2=!flag?flagForVaidateEmail:flag
     const finalFlag = !timemark ? flag2 : timemark

    return finalFlag ;
  }
  // const disabledvalue = useMemo(() => disableCheck(), [JSON.stringify(formData),timemark]);

  // const [switchState, setSwitchState] = React.useState({
  //   checkedA: true,
  //   checkedB: true,
  // });

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
 
  
  // const validateEmailId = () => {
  //   if (!emailId.length) {
  //     setFlagForVaidateEmail(true);
  //   } else if (!ValidateEmail(emailId)) {
  //     setFlagForVaidateEmail(true);
  //   } else {
  //     setFlagForVaidateEmail(false);
  //   }
  // };
  //   const validatebackEmailId=()=>{

  //     setFlagForVaidateEmail(false);

  // }
  
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
  const teamMemberName = () => {
    return (
      <>
        <div className={classes.chipSelectHeading}>Team Member Name</div>

        {/* <Select
          id="manage-priority"
          value={membersList}
          onChange={handleChangePodmembers}
          disableUnderline={true}
          className={classes.selectOption}
        >
          {allPodmembers?.map((productType) => (
            <MenuItem key={productType.Id} value={productType.Id}>
              {productType.AgentName}
            </MenuItem>
          ))}
        </Select> */}
         <Autocomplete
        {...defaultProps}
        id="copy-name"
        className={classes.copyFormName}
        value={membersList||[]}
        onChange={handleChangePodmembers}
        renderInput={(params) => (
          <TextField {...params}  
          placeholder={
            membersList==null && "Select Copy From"
          }
          />
        )}
      />
      </>
    );
  };

  const onConfirmDialogCopyForm = () => {
    setCopyMemberLoading(true);
    getteamMemberDetails(membersList.Id);
    // setOpenDialogCopyForm(false)
  };

  useEffect(() => {
    getteamMemberDetails(selectedIndexTeammember);
  }, [selectedIndexTeammember]);

  const defaultProps = {
    options: allPodmembers,
    getOptionLabel: (option) => option.AgentName||"",
   
  };
  const filteredValuesforOnChange = (newValue, currentValue) => {
    let newArray = [...newValue, ...currentValue];

    if (newValue.length) {
      let duplicateIds = newArray
        .map((e) => e["Id"])

        .map((e, i, final) => final.indexOf(e) !== i && i)

        .filter((obj) => newArray[obj])

        .map((e) => newArray[e]["Id"]);

      let ac = duplicateIds.filter((e, i, a) => a.indexOf(e) !== i); // [2, 4]

      if (ac.length) {
        let newvalues = newValue.filter((item) => item.Id !== ac[0]);

        return newvalues;
      }

      return newValue;
    }

    return [];
  };
  const SelectPlaceholder = ({ children }) => {
    //const classes = usePlaceholderStyles();
    return <div className={classes.placeholder}>{children}</div>;
  };
  return (
    <div>
      {loadingforedit ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress color="primary" />
        </Box>
      ) : (
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
              showdisableBtn={membersList==null?true:false}
              setOpen={setOpenDialogCopyForm}
            />
          )}
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={8} className={classes.titleContain}>
                <h1>Update Team Member</h1>
                {ActionNames.includes("Add")&& 
                <span className={classes.copyForm} onClick={dialogCopyForm}>
                  <CopyAllIcon /> Copy From
                </span>}
              </Grid>
            </Grid>
            <Grid container spacing={3} className={classes.marginBottom}>
              <Grid item xs={4}>
                <div className={classes.chipSelectHeading}>
                  Name <span className={classes.star}>*</span>
                </div>
                <TextFieldInput
                  placeholder="Enter Member Name"
                  value={memberName}
                  name="memberName"
                  onChange={handleFormData}
                  margin="dense"
                  onBlur={()=>Validatememberboundary("memberName")}
                  error={flagForVaidateName}
                  onFocus={()=>ValidateFocusmemberboundary("memberName")}
                />
              </Grid>
              <Grid item xs={4}>
                <div className={classes.chipSelectHeading}>
                Member ID <span className={classes.star}>*</span>
                </div>
                <TextFieldInput
                  placeholder="Enter Member ID"
                  value={memberId}
                  name="memberId"
                  onChange={RoleFlag=="Admin"&&
                    handleFormData}
                  margin="dense"
                  onBlur={()=>Validatememberboundary("memberId")}
                  error={flagForVaidateMemeberId}
                  onFocus={()=>ValidateFocusmemberboundary("memberId")}
                  disabled={RoleFlag==="Admin"?false:true}
                 
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} className={classes.marginBottom}>
              <Grid item xs={4}>
                <div className={classes.chipSelectHeading}>
                  Username <span className={classes.star}>*</span>
                </div>
                <TextFieldInput
                  placeholder="Enter Username"
                  value={userName}
                  name="userName"
                  onChange={handleFormData}
                  margin="dense"
                  onBlur={()=>Validatememberboundary("userName")}
                  error={flagForVaidateUserName}
                  onFocus={()=>ValidateFocusmemberboundary("userName")}
                />
              </Grid>
              <Grid item xs={4}>
                <div className={classes.chipSelectHeading}>
                  Email <span className={classes.star}>*</span>
                </div>
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
                  onFocus={()=>ValidateFocusmemberboundary("emailId")}
                  margin="dense"
                />
                {formData.emailIdErr && (
                  <div style={{ textAlign: "center" }}>
                    {" "}
                    <span style={{ color: "red" }}>
                      Please Enter Valid Email !
                    </span>
                  </div>
                )}
              </Grid>
            </Grid>

            {/* End Grid */}

            <Grid container spacing={3} className={classes.marginBottom}>
              <Grid item xs={8}>
                <div className={classes.chipSelectHeading}>
                  Primary Skills 
                </div>
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
                    // const newvalues = filteredValuesforOnChange(
                    //   newValue,
                    //   primarySkills
                    // );
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
                          selected ||
                          getCheckedFlag(option, primarySkills, "Name")
                        }
                        indeterminate={
                          option.Name === "Select All" ? true : false
                        }
                        indeterminateIcon={
                          <IndeterminateCheckBoxIcon
                            color={
                              selectAllIconFlag.primarySkills ? "primary" : ""
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
                        primarySkills.length ? "Select Primary Skills" : "Select Primary Skills"
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
              options={allSkills &&[{ Id: 0, Name: "Select All" }, ...allSkills] || []}
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
                    checked={
                      selected || getCheckedFlag(option, primarySkills, "Name")
                    }
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
                  onBlur={validatePrimarySkills}
                  error={flagForVaidatePrimarySkills}
                  className={classes.chipSelectInput}
                  onFocus={validatebackPrimarySkills}
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
                <div className={classes.chipSelectHeading}>
                  Secondary Skills
                </div>
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
                    // const newvalues = filteredValuesforOnChange(
                    //   newValue,
                    //   secondarySkills
                    // );
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
                        indeterminate={
                          option.Name === "Select All" ? true : false
                        }
                        indeterminateIcon={
                          <IndeterminateCheckBoxIcon
                            color={
                              selectAllIconFlag.secondaryTeamMember
                                ? "primary"
                                : ""
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
                      placeholder="Select Secondary Skills"
                      className={classes.chipSelectInput}
                    />
                  )}
                />
                {/* <Autocomplete
              multiple
              limitTags={2}
              id="secondary-team-member"
              className={classes.chipSelect}
              options={
                secondrySkillsDropdownValue.length
                  ? [
                      { Id: 0, Name: "Select All" },
                      ...secondrySkillsDropdownValue,
                    ]
                  : []
              }
              //defaultValue={[top100Films[2]]}

              disableCloseOnSelect
              loading={isLoading}
              value={secondarySkills}
              onChange={(e, newValue) => {
                setSelectedSecondarySkills(newValue);

                setFlagforIconPrimarySkills(newValue);
              }}
              getOptionLabel={(option) => option.Name}
              // renderTags={() => null}
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    checked={
                      selected ||
                      getCheckedFlag(option, secondarySkills, "Name")
                    }
                    color="primary"
                    indeterminate={option.Name === "Select All" ? true : false}
                    indeterminateIcon={
                      <IndeterminateCheckBoxIcon
                        color={
                          selectAllIconFlag.secondaryTeamMember ? "primary" : ""
                        }
                      />
                    }
                  />
                  <div className={classes.checkboxLabel}>{option.Name}</div>
                </React.Fragment>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Select Team Members"
                  className={classes.chipSelectInput}
                />
              )}
              renderValue={
                secondarySkills &&
                secondarySkills.map((p) => (
                  <Chip
                    key={p.Id}
                    label={p.Name}
                    className={classes.prodcutTypeChip}
                    color="primary"
                    onDelete={onDeleteSecondarySkillsChips(p.Id)}
                  />
                ))
              }
            /> */}
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={2}>
                <div className={classes.chipSelectHeading}>Role</div>
              </Grid>
              <Grid item xs={10}>
                <RadioGroup
                  row
                  aria-label="role"
                  name="row-radio-buttons-group"
                  value={roleValue}
                  onChange={(RoleFlag!="Admin"&&roleValue==="admin")?handleChangeRoleno:handleChangeRole}
                >
                  <FormControlLabel
                    value="user"
                    control={<Radio color="primary" size="small" />}
                    label="Team Member"
                    disabled={(RoleFlag!="Admin"&&roleValue==="admin")?
                    true: false}
                   
                  />
                  <FormControlLabel
                    value="manager"
                    control={<Radio color="primary" size="small" />}
                    label="Manager"
                    disabled={(RoleFlag!="Admin"&&roleValue==="admin")?
                    true: false}
                  />
                 {(RoleFlag!=="Manager"||roleValue==="admin") &&  <FormControlLabel
                value="admin"
                control={<Radio color="primary" size="small" />}
                label="Admin"
              />}
                </RadioGroup>
              </Grid>
            </Grid>
            {roleValue === "manager" ? (
              <Grid container spacing={3}>
                <Grid item xs={8}>
                  <div className={classes.chipSelectHeading}>
                    Manager Priority Level
                  </div>
                  <Select
                    id="manage-priority"
                    value={priorityLevel}
                    onChange={handleChangePriority}
                    style={{ width: "100%" }}
                    className={classes.selectOption}
                    displayEmpty
            renderValue={
              // productTypes == "" && () => <SelectPlaceholder>Select Product Type</SelectPlaceholder>
              priorityLevel !== "" ? undefined : () => <SelectPlaceholder>Select priority Level</SelectPlaceholder>
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
                    label="In-Active"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={2}>
                <div className={classes.chipSelectHeading}>
                  Request Allocation
                </div>
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
                            //  minDate={ISTtoCST(new Date())}
                            minDate={new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' }))}
                            value={dateValue}
                            onChange={(newValue) => {
                              setDateValue(newValue);
                              setFormData({
                                ...formData,
                                date: convert(newValue),
                              });
                              let flag = ValidateCurrentTimings(newValue)
                              flag ? setErrorfortime(true) : setErrorfortime(false)
                              flag? settimemark(true):settimemark(false)
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
                              onBlur={()=>{
                                let flag = ValidateCurrentTimings()
                               
                                flag ? setErrorfortime(true) : setErrorfortime(false)
                                flag? settimemark(true):settimemark(false)
                              }}
                              className={classes.selectOption}
                            >
                              {/* <MenuItem value="">
                        <em>None</em>
                      </MenuItem> */}
                              {Array.from({ length: 12 }, (_, i) => i + 1).map(
                                (item) => {
                                  return (
                                    <MenuItem key={item} value={item}>{item}</MenuItem>
                                  );
                                }
                              )}
                            </Select>
                            <div className={classes.timeSelectHeading}>
                              Hours
                            </div>
                          
                          </Grid>
                          <Grid item xs={4}>
                            <Select
                              id="minutes"
                              value={timeMM}
                              onChange={handleChangeMM}
                              onBlur={()=>{
                          
                                let flag = ValidateCurrentTimings()
                               
                                flag ? setErrorfortime(true) : setErrorfortime(false)
                                flag? settimemark(true):settimemark(false)
                              }}
                              className={classes.selectOption}
                            >
                               {Array.from(new Array(60), (x, i) => i).map(
                                (item) => {
                                  return (
                                    <MenuItem key={item} value={item}>{item}</MenuItem>
                                  );
                                }
                              )}
                            </Select>
                            <div className={classes.timeSelectHeading}>
                              Minutes
                            </div>
                          </Grid>
                          <Grid item xs={4}>
                            <Select
                              id="ampm"
                              value={timeAP}
                              onChange={handleChangeAP}
                              onBlur={()=>{
                                let flag = ValidateCurrentTimings()
                               
                                flag ? setErrorfortime(true) : setErrorfortime(false)
                                flag? settimemark(true):settimemark(false)
                              }}
                              className={classes.selectOption}
                            >
                              <MenuItem key={1} value={1}>AM</MenuItem>
                              <MenuItem key={2} value={2}>PM</MenuItem>
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
                    disabled={disableCheck()}
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
                title={`Do you want to update ${memberName}?`}
                saveIcon={true}
                message={"Please check the information before updating!"}
                saveText={"Update"}
                onSave={handleSaveSuccessDialog}
                showSaveBtn={true}
                showCancelBtn={true}
                isLoading={isSavedLoader}
                showOkBtn={false}
                setOpen={setSaveDialog}
                //onCancel={handleSaveCancel}
              />
            )}

            {saveSuccessDialog && (
              <ConfirmDialog
                name="auditrail"
                title={"Updated!"}
                successIcon={true}
                message={`${memberName} updated sucessfully!`}
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
      )}
    </div>
  );
});

export default EditMember;
