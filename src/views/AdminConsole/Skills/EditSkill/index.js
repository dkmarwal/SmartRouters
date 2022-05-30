import React, { useEffect, useState } from "react";
import styles from "./styles";
import TextFieldInput from "../../../../components/TextField";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import ViewDialog from "../../../../components/Dialogs";
import {
  Button,
  TextField,
  Grid,
  Box,
  Checkbox,
  // Chip,
  CircularProgress,
  // MenuItem,
  // ListItemText,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
// import { useParams } from "react-router-dom";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useDispatch, useSelector } from "react-redux";
//import { fetchAllProducts } from "../../../../actionTypesredux/actions/products";
import { fetchAllProducts } from "../../../../redux/actions/products";
import { fetchServicesByProductIds } from "../../../../redux/helpers/services";
import { fetchAllPodMembers } from "../../../../redux/helpers/podMembers";
import {
  fetchAllBusinessLine,
  fetchRequestType,
  fetchCustomerType,
  fetchAllProductaction,
} from "./../../../../redux/actions/skills";
import { saveRow } from "./../../../../redux/actions/saveindexAction";
import {
  fetchAddSkill,
  fetchSkillDetails,
} from "../../../../redux/helpers/skills";
import { withRouter } from "react-router-dom";
import ConfirmDialog from "../../../../components/Dialogs/ConfirmDialog";
import { fetchAllSkillsTeamMembers } from "./../../../../redux/helpers/teammemberskills";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const AddSkill = withRouter(({ history }) => {
  const classes = styles();
  const [formData, setFormData] = useState({
    skillName: "",
    skillDescription: "",
    businessLine: [],
    customerType: [],
    requestType: [],
    productTypes: [],
    servicesTypes: [],
    productAction: [],
    primaryTeamMember: [],
    secondaryTeamMember: [],
    podMembers: [],
    skillsList: null,
  });
  const [allPodMemberStore, setAllPodMembersStore] = useState([]);
  const [selectAllIconFlag, SetselectAllIconFlag] = useState({
    businessLine: false,
    customerType: false,
    requestType: false,
    productTypes: false,
    servicesTypes: false,
    productAction: false,
    primaryTeamMember: false,
    secondaryTeamMember: false,
  });
  const [selecteServiceTypesCheck, setServiceTypesCheck] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
  });

  // const isEditSkillPage =
  //   String(window.location.href).split("/")[4] === "editSkill";
  const [btnLoading, setBtnLoading] = useState(false);
  const [allPodMembers, setAllPodMembers] = useState([]);
  const [servicesByProductId, setServicesByProductId] = useState([]);
  const [loadingforedit, setLoadingforedit] = useState(false);
  const {
    skillName,
    skillDescription,
    businessLine,
    customerType,
    requestType,
    productTypes,
    // servicesTypes,
    productAction,
    primaryTeamMember,
    secondaryTeamMember,
    skillsList,
    // podMembers,
  } = formData;
  const [SpecializedIt, setSpecializedit] = useState("");
  const [openDialogCopyForm, setOpenDialogCopyForm] = useState(false);
  const [servicesNames, setServicesNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [SpecializedBoolean, setSpecializedBoolean] = useState(false);
  //   const [podMembersLoading, setPodMemberLoading] = useState(false);
  const [errormessage, setErrormessage] = useState("");
  const [secondryMembersDropdownValue, setSecondryMemberDropdownValues] =
    useState([]);
  const [errorDialog, setErrorDialog] = useState(false);
  const [selectedServices, setSelectedService] = useState([]);
  const [saveDialog, setSaveDialog] = useState(false);
  const actionbyId = localStorage.getItem("actionby");
  const [saveSuccessDialog, setSaveSuccessDialog] = useState(false);
  const [isSavedLoader, setIsSavedLoader] = useState(false);
  const [flagForVaidateSkillName, setFlagForVaidateSkillName] = useState(false);
  const [flagForVaidateSkillDiscription, setFlagForVaidateSkillDiscription] =
    useState(false);
  const [flagForVaidateBusinessLine, setFlagForVaidateBusinessLine] =
    useState(false);
  const [flagForVaidateCustomerType, setFlagForVaidateCustomerType] =
    useState(false);
  const [flagForVaidateRequestType, setFlagForVaidateRequestType] =
    useState(false);
  const [flagForVaidateProductType, setFlagForVaidateProductType] =
    useState(false);
  const [flagForVaidateServiceType, setFlagForVaidateServiceType] =
    useState(false);
  const [flagForVaidateProductAction, setFlagForVaidateProductAction] =
    useState(false);
  const [flagForVaidatePrimaryMembers, setFlagForVaidatePrimaryMembers] =
    useState(false);
  const [allSkills, setAllSkills] = useState([]);
  const store = useSelector((state) => state);
  const RowData =
    useSelector((state) => state.rowISelected.selecteditrow) || [];
  const selectedRowIndex = useSelector(
    (state) => state.indexSelected.selectedIndex
  );
  const [copySkillLoading, setCopySkillLoading] = useState(false);
  const allBusinessLineData =
    useSelector((state) => state.skills?.allBusinessLine?.data) || [];
  const allRequestTypeData =
    useSelector((state) => state.skills?.allRequestType?.data) || [];
  const allCustomerTypeData =
    useSelector((state) => state.skills?.allCustomerType?.data) || [];
  const allProductActionData = useSelector(
    (state) => state.skills?.allProductActionLine.data
  );
  const Permissions = localStorage.getItem("Permissions");
  let skillsPermissions = JSON.parse(Permissions)?.filter((value) => {
    return value.PageName === "Team Members";
  });

  let ActionNames = skillsPermissions.map((value) => {
    return value.ActionName;
  });
  const {
    products: { allProducts },
    // business: allBusinessLine,
  } = store;
  const dispatch = useDispatch();

  const getBusinessLine = () => {
    setIsLoading(true);
    dispatch(fetchAllBusinessLine()).then(() => {
      setIsLoading(false);
    });
  };
  const getProductActionLine = () => {
    setIsLoading(true);
    dispatch(fetchAllProductaction()).then(() => {
      setIsLoading(false);
    });
  };
  const getRequestType = () => {
    setIsLoading(true);
    dispatch(fetchRequestType()).then(() => {
      setIsLoading(false);
    });
  };

  const handleChangeSpecialized = (event) => {
    setSpecializedit(event.target.value);
    setSpecializedBoolean(event.target.value == "male" ? true : false);
  };
  const getCustomerType = () => {
    setIsLoading(true);
    dispatch(fetchCustomerType()).then(() => {
      setIsLoading(false);
    });
  };

  const getAllProducts = () => {
    setIsLoading(true);
    dispatch(fetchAllProducts()).then(() => {
      setIsLoading(false);
    });
  };
  const getAllPodMembers = () => {
    setIsLoading(true);
    fetchAllPodMembers().then((res) => {
      setIsLoading(false);

      setAllPodMembers(res.Data);
      filterSecondryMembers(res.Data);

      setAllPodMembersStore(res.Data);
    });
  };
  // const getAllPodMembersForSecondryMember = () => {

  //   fetchAllPodMembers().then((res) => {

  //     return res.Data
  //     setAllPodMembers(res.Data);
  //     filterSecondryMembers(res.Data)

  //    setAllPodMembersStore(res.Data)
  //   });
  // };
  function allLetter(inputtxt) {
    let letters = /^[a-zA-Z\s]*$/;
    //  let spaces=/^\s+$/;
    if (inputtxt.value.match(letters) || isNaN(inputtxt)) {
      return true;
    } else {
      return false;
    }
  }
  const getSavedProductType = (array) => {
    let newArray = [];
    array?.map((item) =>
      newArray.push({ Id: item.Id, ProdName: item.ProdName })
    );

    return newArray;
  };

  const getSavedServiceType = (array) => {
    let newArray = [];
    array?.map((item) => {
      if (item.Services.length) {
        item.Services.map((service) =>
          newArray.push({ Id: service.Id, ProdName: service.ServiceName })
        );
      }
      return newArray;
    });

    return newArray;
  };

  const getSkillDetails = () => {
    // const skillId = isEditSkillPage
    //   ? String(window.location.href).split("/")[5]
    //   : undefined;
    const skillId = parseInt(selectedID);

    const payload = { Id: skillId };
    setIsLoading(true);
    fetchSkillDetails(payload).then((res) => {
      //   const formData = res && res["Data"];
      setIsLoading(false);
      const SpecializedField = res?.Data?.IsSpecialized;
      setSpecializedBoolean(SpecializedField);

      setSpecializedit(SpecializedField === true ? "male" : "female");
    });

    if (selectedRowIndex == null) {
      HandleAfterSave();
      return;
    }
    setFormData({
      // Id: Id,
      skillName: RowData?.Name,
      skillDescription: RowData?.Description,
      productTypes: getSavedProductType(RowData?.Products),
      servicesTypes: getSavedServiceType(RowData?.Products),
      // podMembers: AgentIds && AgentIds.split(","),
      requestType: RowData?.RequestTypes,
      customerType: RowData?.CustomerTypes,
      productAction: RowData?.ProductActions,

      primaryTeamMember: RowData?.PrimaryAgents,
      secondaryTeamMember: RowData?.SecondaryAgents,

      // productAction:getSecondaryAgentIdsData(SecondaryAgentIds),
      // productAction:getPrimaryAgentIdsData(PrimaryAgentIds),
      // primaryTeamMember:getprimaryTeamMemberData(RequestTypeIds),
      // secondaryTeamMember: getsecondaryTeamMemberData(CustomerTypeIds),
      businessLine: RowData?.BusinessLines,
    });
    // let SpecializedField = IsSpecialized;
    // console.log('SpecializedField',SpecializedField)
    // setSpecializedit(SpecializedField == true ? "male" : "female");
    let selectedServices = getSavedServiceType(RowData?.Products);

    setSelectedService(selectedServices);
    fetchAllPodMembers().then((res) => {
      filterPrimaryMembersAccToSecondryMembersOnLoad(
        RowData?.SecondaryAgents,
        res.Data
      );
    });
    // });
  };

  const getSkillinfo = (skillinfoId) => {
    // const skillId = isEditSkillPage
    //   ? String(window.location.href).split("/")[5]
    //   : undefined;
    const skillId = parseInt(skillinfoId);

    const payload = { Id: skillId };

    fetchSkillDetails(payload).then((res) => {
      //   const formData = res && res["Data"];
      const skillsData = res && res["Data"];
      const {
        IsSpecialized,
        Name,
        Description,
        SecondaryAgents,
        BusinessLines,
        RequestTypes,
        Products,
        CustomerTypes,
        ProductActions,
        PrimaryAgents,
      } = skillsData;
      const SpecializedField = IsSpecialized;
      setSpecializedBoolean(SpecializedField);

      setSpecializedit(SpecializedField === true ? "male" : "female");

      //  debugger
      setFormData({
        ...formData,

        //   // Id: Id,
        //   // skillName:"ssss",
        skillName: Name ? Name : "",
        skillDescription: Description ? Description : "",
        productTypes: Products ? getSavedProductType(Products) : [],
        servicesTypes: Products ? getSavedServiceType(Products) : [],

        requestType: RequestTypes ? RequestTypes : [],
        customerType: CustomerTypes ? CustomerTypes : [],
        productAction: ProductActions ? ProductActions : [],

        primaryTeamMember: PrimaryAgents ? PrimaryAgents : [],
        secondaryTeamMember: SecondaryAgents ? SecondaryAgents : [],

        businessLine: BusinessLines ? BusinessLines : [],
      });

      let selectedServices = getSavedServiceType(Products ? Products : "");

      setSelectedService(selectedServices);
      fetchAllPodMembers().then((res1) => {
        filterPrimaryMembersAccToSecondryMembersOnLoad(
          SecondaryAgents ? SecondaryAgents : "",
          res1.Data
        );
      });
      setCopySkillLoading(false);
      setOpenDialogCopyForm(false);
    });

    if (selectedRowIndex == null) {
      HandleAfterSave();
      return;
    }

    // });
  };
  const getServicesByProductIds = () => {
    const productIds =
      productTypes &&
      productTypes.map((productType) => productType["Id"]).join(",");
    fetchServicesByProductIds({ productIds: productIds }).then((res) => {
      const filteredServices = res.Data.map((item) => {
        return item.Services;
      });
      const filteredServicesNames = filteredServices.map((item) => {
        return item.map((item1) => {
          return item1.ServiceName;
        });
      });
      setServicesNames(filteredServicesNames);
      if (productTypes.length > 0) {
        const refinedServices = res.Data.map((item) => {
          return item.Services;
        });
        const refinedServicesall = refinedServices.flat();
        const refinedServicesnames = refinedServicesall.map((item) => {
          return item.ServiceName;
        });
        const servicesboolean = selectedServices.map((item) => {
          return refinedServicesnames.includes(item.ProdName);
        });

        const arr1 = [];

        for (let i = 0; i < servicesboolean.length; i++) {
          if (servicesboolean[i] === true) arr1.push(selectedServices[i]);
        }
		// arr1.length?setSelectedService(arr1):setSelectedService(formData.servicesTypes);
		arr1.length&& setSelectedService(arr1);

        setServicesByProductId(res);
      }
    });
  };
  const dependentValue = JSON.stringify(productTypes);
  useEffect(() => {
    productTypes.length > 0
      ? getServicesByProductIds()
      : setServicesByProductId([]);
  }, [dependentValue]);

  const setSelectedBusinessLine = (value) => {
    const flag = findSelectAllInData(value, "BusinessLineName");
    if (flag) {
      SetselectAllIconFlag({
        ...selectAllIconFlag,
        businessLine: !selectAllIconFlag.businessLine,
      });
      if (allBusinessLineData.length === formData.businessLine.length) {
        setFormData({ ...formData, businessLine: [] });
      }
      setFormData({ ...formData, businessLine: allBusinessLineData });
      return;
    }
    const filteredValue = value.filter((item) => {
      return item.BusinessLineName !== "Select All";
    });

    SetselectAllIconFlag({ ...selectAllIconFlag, businessLine: false });
    setFormData({ ...formData, businessLine: filteredValue });
  };
  const setFlagforIcon = (value) => {
    const flag = findSelectAllInData(value, "BusinessLineName");
    if (flag) {
      if (allBusinessLineData.length === formData.businessLine.length) {
        setFormData({ ...formData, businessLine: [] });
      }
    }
  };
  const setSelectedCustomerType = (value) => {
    const flag = findSelectAllInData(value, "CustomerTypeName");

    if (flag) {
      SetselectAllIconFlag({
        ...selectAllIconFlag,
        customerType: !selectAllIconFlag.customerType,
      });
      if (allCustomerTypeData.length === formData.customerType.length) {
        setFormData({ ...formData, customerType: [] });
      }
      setFormData({ ...formData, customerType: allCustomerTypeData });
      return;
    }
    const filteredValue = value.filter((item) => {
      return item !== "Select All";
    });
    SetselectAllIconFlag({ ...selectAllIconFlag, customerType: false });

    setFormData({ ...formData, customerType: filteredValue });
  };
  const setFlagforIconCustomerType = (value) => {
    const flag = findSelectAllInData(value, "CustomerTypeName");

    if (flag) {
      if (allCustomerTypeData.length === formData.customerType.length) {
        setFormData({ ...formData, customerType: [] });
      }
    }
  };

  const setSelectedRequestType = (value) => {
    const flag = findSelectAllInData(value, "RequestTypeName");
    if (flag) {
      SetselectAllIconFlag({
        ...selectAllIconFlag,
        requestType: !selectAllIconFlag.requestType,
      });
      if (allRequestTypeData.length === formData.requestType.length) {
        setFormData({ ...formData, requestType: [] });
      }
      setFormData({ ...formData, requestType: allRequestTypeData });
      return;
    }
    const filteredValue = value.filter((item) => {
      return item !== "Select All";
    });

    SetselectAllIconFlag({
      ...selectAllIconFlag,
      requestType: !selectAllIconFlag.requestType,
    });
    setFormData({ ...formData, requestType: filteredValue });
  };

  const setFlagforIconRequestType = (value) => {
    const flag = findSelectAllInData(value, "RequestTypeName");

    if (flag) {
      if (allRequestTypeData.length === formData.requestType.length) {
        setFormData({ ...formData, requestType: [] });
      }
    }
  };
  const setSelectedProductAction = (value) => {
    const flag = findSelectAllInData(value, "ActionName");
    if (flag) {
      SetselectAllIconFlag({
        ...selectAllIconFlag,
        productAction: !selectAllIconFlag.productAction,
      });
      if (allProductActionData.length === formData.productAction.length) {
        setFormData({ ...formData, productAction: [] });
      }
      setFormData({ ...formData, productAction: allProductActionData });
      return;
    }
    const filteredValue = value.filter((item) => {
      return item !== "Select All";
    });
    SetselectAllIconFlag({ ...selectAllIconFlag, productAction: false });
    setFormData({ ...formData, productAction: filteredValue });
  };
  const setFlagforIconProductAction = (value) => {
    const flag = findSelectAllInData(value, "ActionName");

    if (flag) {
      if (allProductActionData.length === formData.productAction.length) {
        setFormData({ ...formData, productAction: [] });
      }
    }
  };

  function findSelectAllInData(value, Name = "Name") {
    let DataWithOnlyName = [];
    for (let i = 0; i < value.length; i++) {
      DataWithOnlyName.push(value[i]?.[Name]);
    }
    const Flag = DataWithOnlyName.includes("Select All");
    return Flag;
  }

  const setSelectedPrimaryTeamMembers = (value) => {
    // if (!value.length){
    //   setFormData({ ...formData, secondaryTeamMember: []  })
    // }
    const flag = findSelectAllInData(value, "AgentName");
    if (flag) {
      SetselectAllIconFlag({
        ...selectAllIconFlag,
        primaryTeamMember: !selectAllIconFlag.primaryTeamMember,
      });
      if (allPodMembers.length === formData.primaryTeamMember.length) {
        setFormData({ ...formData, primaryTeamMember: [] });
      }
      setFormData({ ...formData, primaryTeamMember: allPodMembers });
      return;
    }
    const filterSelectedData = value.filter((item) => {
      return item.AgentName !== "Select All";
    });
    SetselectAllIconFlag({ ...selectAllIconFlag, primaryTeamMember: false });
    setFormData({ ...formData, primaryTeamMember: filterSelectedData });
    let selectedValues = [...filterSelectedData];
    let selectedValuesWithOnlyName = [];
    for (let i = 0; i < selectedValues.length; i++) {
      selectedValuesWithOnlyName.push(selectedValues[i].AgentName);
    }

    const filteredData = allPodMemberStore.filter((item) => {
      if (item.AgentName === "Select All") {
        return [];
      }
      return !selectedValuesWithOnlyName.includes(item.AgentName);
    });
    setSecondryMemberDropdownValues(filteredData);
  };
  const setFlagforIconPrimaryTeamMembers = (value) => {
    const flag = findSelectAllInData(value, "AgentName");

    if (flag) {
      if (allPodMembers.length === formData.primaryTeamMember.length) {
        setFormData({ ...formData, primaryTeamMember: [] });
      }
    }
  };

  const setSelectedSecondaryTeamMembers = (value) => {
    const flag = findSelectAllInData(value, "AgentName");
    if (flag) {
      SetselectAllIconFlag({
        ...selectAllIconFlag,
        secondaryTeamMember: !selectAllIconFlag.secondaryTeamMember,
      });
      // if(primaryTeamMember.length==0) { setFormData({...formData,secondaryTeamMember:[]})}
      if (
        secondryMembersDropdownValue.length ===
        formData.secondaryTeamMember.length
      ) {
        setFormData({ ...formData, secondaryTeamMember: [] });
      }
      setFormData({
        ...formData,
        secondaryTeamMember: secondryMembersDropdownValue,
      });
      filterPrimaryMembersAccToSecondryMembers(secondryMembersDropdownValue);
      return;
    }
    const filteredValue = value.filter((item) => {
      return item !== "Select All";
    });
    filterPrimaryMembersAccToSecondryMembers(filteredValue);
    SetselectAllIconFlag({ ...selectAllIconFlag, secondaryTeamMember: false });
    setFormData({ ...formData, secondaryTeamMember: filteredValue });
  };
  const setFlagforIconSecondaryTeamMembers = (value) => {
    const flag = findSelectAllInData(value, "AgentName");

    if (flag) {
      if (
        secondryMembersDropdownValue.length ===
        formData.secondaryTeamMember.length
      ) {
        setFormData({ ...formData, secondaryTeamMember: [] });
      }
    }
  };

  const setSelectedProducts = (value) => {
    const flag = findSelectAllInData(value, "ProdName");

    if (flag) {
      SetselectAllIconFlag({
        ...selectAllIconFlag,
        productTypes: !selectAllIconFlag.productTypes,
      });
    }
    const filteredValue = value.filter((item) => {
      return item.ProdName !== "Select All";
    });
    if (flag) {
      if (allProducts?.data.length === formData.productTypes.length) {
        setFormData({ ...formData, productTypes: [] });
      }
      setFormData({ ...formData, productTypes: allProducts.data });

      return;
    }
    setFormData({ ...formData, productTypes: filteredValue });
  };

  const setFlagforIconProducts = (value) => {
    const flag = findSelectAllInData(value, "ProdName");

    if (flag) {
      if (allProducts?.data.length === formData.productTypes.length) {
        setFormData({ ...formData, productTypes: [] });
      }
    }
  };
  const dialogCopyForm = () => {
    setOpenDialogCopyForm(true);
    getAllSkills();
  };
  // const setSelectedPodMembers = (value) => {
  //   setFormData({ ...formData, podMembers: value });
  // };

  // const setSelectedServices = (value) => {
  //   if (productTypes.length) {
  //     const data = formData["servicesTypes"];
  //     const isExists = data && data.includes(value);
  //     const updatedServiceTypes = isExists
  //       ? data.filter((id) => id !== value)
  //       : [...data, value];
  //     setFormData({ ...formData, servicesTypes: updatedServiceTypes });
  //   }
  // };

  // const onDeleteProductTypeChip = (Id) => () => {
  //   const updatedProducts =
  //     productTypes && productTypes.filter((p) => p.Id !== Id);
  //   setSelectedProducts(updatedProducts);
  // };

  // const onDeleteBusinessLineChips = (Id) => () => {
  //   const updatedProducts =
  //     businessLine && businessLine.filter((p) => p.Id !== Id);
  //   setSelectedBusinessLine(updatedProducts);
  // };

  // const onDeleteCustomerTypeChips = (Id) => () => {
  //   const updatedProducts =
  //     customerType && customerType.filter((p) => p.Id !== Id);
  //   setSelectedCustomerType(updatedProducts);
  // };

  // const onDeleteRequestTypeChips = (Id) => () => {
  //   const updatedProducts =
  //     requestType && requestType.filter((p) => p.Id !== Id);
  //   setSelectedRequestType(updatedProducts);
  // };

  // const onDeleteProductActionChips = (Id) => () => {
  //   const updatedData =
  //     productAction && productAction.filter((p) => p.Id !== Id);
  //   setSelectedProductAction(updatedData);
  // };

  // const onDeletePrimaryTeamMembersChips = (Id) => () => {
  //   const updatedData =
  //     primaryTeamMember && primaryTeamMember.filter((p) => p.Id !== Id);
  //   setSelectedPrimaryTeamMembers(updatedData);
  // };

  // const onDeleteSecondaryTeamMembersChips = (Id) => () => {
  //   const updatedData =
  //     secondaryTeamMember && secondaryTeamMember.filter((p) => p.Id !== Id);
  //   setSelectedSecondaryTeamMembers(updatedData);
  // };

  // const onDeletePodMembersChips = (Id) => () => {
  //   const updatedData = podMembers && podMembers.filter((p) => p.Id !== Id);
  //   setSelectedPodMembers(updatedData);
  // };

  // const onDeleteServicesTypeChips = (Id) => () => {
  //   setSelectedServices(Id);
  // };

  function HandleAfterSave() {
    history.push("/admin/skills");
  }
  const handleFormData = (e) => {
    let flag = allLetter(e.target);
    const { name, value } = e.target;
    (flag || !value) && setFormData({ ...formData, [name]: value });
  };

  // const isSaveButtonDisabled =
  //   skillName &&
  //   skillDescription &&
  //   businessLine.length > 0 &&
  //   customerType.length > 0 &&
  //   requestType.length > 0 &&
  //   productTypes.length > 0 &&
  //   servicesTypes.length > 0 &&
  //   productAction.length > 0 &&
  //   primaryTeamMember.length > 0 &&
  //   secondaryTeamMember.length > 0;

  const convertArra2string = (array) => {
    const newarra = [];
    for (let i = 0; i < array.length; i++) {
      newarra.push(array[i].Id);
    }

    const newvalue = newarra.toString();

    return newvalue;
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
  const handleSave = () => {
    const {
      skillName,
      skillDescription,
      businessLine,
      customerType,
      requestType,
      productTypes,
      //   servicesTypes,
      productAction,
      primaryTeamMember,
      secondaryTeamMember,
      //   podMembers,
    } = formData;
    //{"Id":0,"Name":"Test Skill 4","Description":"Test Skill Descripton 4","ProSerIds":"1,10",
    // "PrimaryAgentIds":"2,5","SecondaryAgentIds":"1,4","CustomerTypeIds":"2",
    // "BusinessLineIds":"10,11,13","RequestTypeIds":"1,4,5","ProductActionIds":"1,2"}
    // setLoading(true);
    const payload = {
      IsSpecialized: SpecializedBoolean,
      id: selectedID,
      Name: skillName,
      Description: skillDescription,
      ProSerIds: convertArra2string(selectedServices),
      PrimaryAgentIds: convertArra2string(primaryTeamMember),
      SecondaryAgentIds: convertArra2string(secondaryTeamMember),
      CustomerTypeIds: convertArra2string(customerType),
      BusinessLineIds: convertArra2string(businessLine),
      RequestTypeIds: convertArra2string(requestType),
      ProductActionIds: convertArra2string(productAction),
      ProductIds: convertArra2string(productTypes),
      ActionBy: Number(actionbyId),
      // userId in ActionBy

      // ProSerIds:
      //   servicesTypes &&
      //   servicesTypes.map((s) => s && s.split("-")[1]).join(","),
      // AgentIds: podMembers && podMembers.map((p) => p["Id"]).join(","),
    };
    fetchAddSkill(payload).then((res) => {
      // setLoading(false);
      setIsSavedLoader(false);
      setSaveDialog(false);
      if (res && res["Success"]) {
        setSaveSuccessDialog(true);
        setBtnLoading(false);
        //HandleAfterSave()
        return;
        // history.push("admin/skills");
      }
      setErrormessage(res["Message"]);
      setErrorDialog(true);
    });
  };

  const handleCancel = () => {
    // HandleAfterSave()
    history.push("/admin/skills");
  };
  const errorDialogClose = () => {
    setErrorDialog(false);
  };
  const filterPrimaryMembersAccToSecondryMembersOnLoad = (
    value,
    allPodMemberStore
  ) => {
    const getAgentNameInArray =
      value.length &&
      value.map((item) => {
        return item.AgentName;
      });

    if (getAgentNameInArray.length) {
      const filteredValues =
        allPodMemberStore.length &&
        allPodMemberStore.filter((items) => {
          return !getAgentNameInArray.includes(items.AgentName);
        });

      setAllPodMembers(filteredValues);
    }
  };
  const filterPrimaryMembersAccToSecondryMembers = (value) => {
    const getAgentNameInArray =
      value.length &&
      value.map((item) => {
        return item.AgentName;
      });

    if (getAgentNameInArray.length) {
      const filteredValues =
        allPodMembers.length &&
        allPodMembers.filter((items) => {
          return !getAgentNameInArray.includes(items.AgentName);
        });

      setAllPodMembers(filteredValues);
    }
  };
  const filterSecondryMembers = (allPodMembers) => {
    const primaryTeamMember = RowData?.PrimaryAgents;

    const getArr =
      primaryTeamMember &&
      primaryTeamMember.length &&
      primaryTeamMember.map((item) => {
        return item.AgentName;
      });

    // setSecondryMemberDropdownValues
    if (getArr && getArr.length) {
      const finalVal =
        allPodMembers.length &&
        allPodMembers.filter((item) => {
          return !getArr.includes(item.AgentName);
        });

      //  filterPrimaryMembersAccToSecondryMembersOnLoad(finalVal,allPodMembers)
      setSecondryMemberDropdownValues(finalVal);
    }
  };

  const selectedID = useSelector((state) => state.rowIdSelected.selectedrow);
  useEffect(() => {
    getBusinessLine();
    getProductActionLine();
    getRequestType();
    getCustomerType();
    getAllProducts();
    getAllPodMembers();
    getSkillDetails();
  }, []);
  function uniqBy(arra, key) {
    var seen = {};
    return arra.filter(function (item) {
      var k = key(item);
      return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    });
  }
  const filterByReference = (arr1, arr2) => {
    let res = [];
    res = arr1.filter((el) => {
      return !arr2.find((element) => {
        return element.ProdName === el.ProdName;
      });
    });
    return res;
  };
  const getAndSetServicesValues = (options, value) => {
    let NameSelected = options.Id;
    let flag = value == 0;
    if (flag) {
      const servicesNameArray = options.Services;
      let arr = [...selectedServices];
      if (selecteServiceTypesCheck[`${NameSelected}`]) {
        let newArr = [];
        for (let i = 0; i < servicesNameArray.length; i++) {
          newArr.push({
            Id: servicesNameArray[i].Id,
            ProdName: servicesNameArray[i].ServiceName,
          });
        }
        let finalArray = uniqBy(newArr, JSON.stringify);
        const val = filterByReference(arr, finalArray);

        setSelectedService(val);
        setServiceTypesCheck({
          ...selecteServiceTypesCheck,
          [`${NameSelected}`]: !selecteServiceTypesCheck[`${NameSelected}`],
        });
        return;
      }
      for (let i = 0; i < servicesNameArray.length; i++) {
        arr.push({
          Id: servicesNameArray[i].Id,
          ProdName: servicesNameArray[i].ServiceName,
        });
      }
      let finalArray = uniqBy(arr, JSON.stringify);

      setSelectedService(finalArray);
      setServiceTypesCheck({
        ...selecteServiceTypesCheck,
        [`${NameSelected}`]: !selecteServiceTypesCheck[`${NameSelected}`],
      });
      return;
    }
    const servicesNameArray = options.Services;
    let arr = [...selectedServices];

    const serviceName = servicesNameArray.filter((item) => {
      if (item.Id == value) {
        return item;
      }
    });

    let selectedName = serviceName[0].ServiceName;
    let flagArray = selectedServices.map((item) => {
      return item.ProdName == selectedName;
    });

    let checkFlag = flagArray.includes(true);
    if (checkFlag) {
      let filterSelectedvaluesIfExist = arr.filter((item) => {
        return item.ProdName !== selectedName;
      });
      setSelectedService(filterSelectedvaluesIfExist);
    } else {
      for (let i = 0; i < serviceName.length; i++) {
        arr.push({
          Id: serviceName[i].Id,
          ProdName: serviceName[i].ServiceName,
        });
      }
      setSelectedService(arr);
    }
  };
  const getChecked = (id) => {
    // servicesTypes.includes(`${option["Id"]}-${service["Id"]}`)
    let selectedArray = [...selectedServices];
    //[{id:1,Name"dadad"},{id:2,Name:'222'}]
    let newArray = [];
    for (let i = 0; i < selectedArray.length; i++) {
      newArray.push(selectedArray[i].Id);
    }
    let flag = newArray.includes(id);
    return flag;
  };

  function getCheckedFlag(option, selectedarray, key) {
    let FieldData = option?.[`${key}`];
    let flag = false;
    for (let i = 0; i < selectedarray.length; i++) {
      if (selectedarray[i]?.[`${key}`] === FieldData) {
        flag = true;
      }
    }
    return flag;
  }
  function servicescheckit() {
    const servicesProdnames = selectedServices.map((item) => {
      return item.ProdName;
    });

    let newArr = [];

    for (let i = 0; i < servicesNames.length; i++) {
      let exist = false;
      servicesNames[i].map((item) => {
        if (servicesProdnames.includes(item)) {
          exist = true;
        }
        return exist;
      });
      newArr.push(exist);
    }
    let flagCheck;
    for (let i = 0; i < newArr.length; i++) {
      flagCheck = true;
      if (newArr[i] === false) {
        flagCheck = false;
        return;
      }
    }

    return flagCheck;
  }
  function disableCheck(formData) {
    // const [FlagSave,setFlagSave]=useState()
    let formDatas = { ...formData };
    console.log("disableCheck", formDatas);
    delete formDatas.podMembers;
    delete formDatas.servicesTypes;
    formDatas = { ...formDatas, servicesTypes: [...selectedServices] };
    delete formDatas["secondaryTeamMember"];
    delete formDatas["skillsList"];
    const propertyValues = Object.values(formDatas);

    const Flag = propertyValues.some((item) => {
      return !item.length;
    });

    const flagforeachServicesselected = servicescheckit();

    // const flag1 = false;

    const overallflag = Flag ? true : !flagforeachServicesselected;
    return overallflag;
  }

  const ValidateSkillboundary = (name) => {
    name === "skillName" &&
      !skillName.length &&
      setFlagForVaidateSkillName(true);
    name === "skillDescription" &&
      !skillDescription.length &&
      setFlagForVaidateSkillDiscription(true);
    name === "businessLine" &&
      !businessLine.length &&
      setFlagForVaidateBusinessLine(true);
    name === "customerType" &&
      !customerType.length &&
      setFlagForVaidateCustomerType(true);
    name === "requestType" &&
      !requestType.length &&
      setFlagForVaidateRequestType(true);
    name === "productTypes" &&
      !productTypes.length &&
      setFlagForVaidateProductType(true);
    name === "selectedServices" &&
      !selectedServices.length &&
      setFlagForVaidateServiceType(true);
    name === "productAction" &&
      !productAction.length &&
      setFlagForVaidateProductAction(true);
    name === "primaryTeamMember" &&
      !primaryTeamMember.length &&
      setFlagForVaidatePrimaryMembers(true);
  };
  const ValidateFocusSkillboundary = (name) => {
    name === "skillName" && setFlagForVaidateSkillName(false);
    name === "skillDescription" && setFlagForVaidateSkillDiscription(false);
    name === "businessLine" && setFlagForVaidateBusinessLine(false);
    name === "customerType" && setFlagForVaidateCustomerType(false);
    name === "requestType" && setFlagForVaidateRequestType(false);
    name === "productTypes" && setFlagForVaidateProductType(false);
    name === "selectedServices" && setFlagForVaidateServiceType(false);
    name === "productAction" && setFlagForVaidateProductAction(false);
    name === "primaryTeamMember" && setFlagForVaidatePrimaryMembers(false);
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

  const onConfirmDialogCopyForm = () => {
    setCopySkillLoading(true);
    getSkillinfo(skillsList.Id);
    // setOpenDialogCopyForm(false)
  };
  const getAllSkills = () => {
    // setIsLoading(true);
    setCopySkillLoading(true);
    fetchAllSkillsTeamMembers().then((res) => {
      // setIsLoading(false);
      setCopySkillLoading(false);
      setAllSkills(res.Data);
    });
  };
  const handleChangeSkills = (event, newvalue) => {
    // setPriorityLavel(event.target.value);
    setFormData({
      ...formData,
      skillsList: newvalue,
    });
  };
  const defaultProps = {
    options: allSkills,
    getOptionLabel: (option) => option.Name || "",
  };
  const skillsName = () => {
    return (
      <>
        <div className={classes.chipSelectHeading}>Skill Name</div>

        <Autocomplete
          {...defaultProps}
          id="copy-name"
          value={skillsList || []}
		      className={classes.copyFormName}
          onChange={handleChangeSkills}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={skillsList == null && "Select Copy From"}
            />
          )}
        />
      </>
    );
  };
  return (
    <>
      {isLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={8} className={classes.titleContain}>
              {/* <Grid item xs={12}> */}
              <h1>Update Skill Details</h1>
              {ActionNames.includes("Add") && (
                <span className={classes.copyForm} onClick={dialogCopyForm}>
                  <CopyAllIcon /> Copy From
                </span>
              )}
            </Grid>
            <Grid item xs={8}>
              <RadioGroup
                onChange={handleChangeSpecialized}
                value={SpecializedIt}
                row
                aria-label="gender"
                name="row-radio-buttons-group"
                className={classes.white}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Non Specialized (If non specialized is selected, the group will own request ONLY if there is no specialized product / member assigned)"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Specialized (If specialized is selected, this group will own request if assigned)"
                />
              </RadioGroup>
            </Grid>

            <Grid item xs={8}>
              <lable className={classes.chipSelectHeading}>
                Skill Name{" "}
                <span className={classes.selectLimit}>
                  (Max 50 characters are allowed)
                </span>{" "}
                <span className={classes.star}>*</span>
              </lable>
              <TextFieldInput
                placeholder="Enter Skill name here"
                value={skillName}
                name="skillName"
                //error={formData.skillName.length>50}
                //helperText = {formData.skillName.length>50?"Length should be less than 50":''}
                onChange={handleFormData}
                margin="dense"
                inputProps={{ maxLength: 50 }}
                onBlur={() => ValidateSkillboundary("skillName")}
                error={flagForVaidateSkillName}
                onFocus={() => ValidateFocusSkillboundary("skillName")}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={8} style={{ marginTop: "20px" }}>
              <lable className={classes.chipSelectHeading}>
                Skill Description{" "}
                <span className={classes.selectLimit}>
                  (Max 500 characters are allowed)
                </span>{" "}
                <span className={classes.star}>*</span>
              </lable>
              <TextFieldInput
                placeholder="Enter skill description here"
                rows="4"
                //error={formData.skillDescription.length>500}
                name="skillDescription"
                value={skillDescription}
                onChange={handleFormData}
                multiline="multiline"
                margin="dense"
                onBlur={() => ValidateSkillboundary("skillDescription")}
                error={flagForVaidateSkillDiscription}
                //helperText = {formData.skillDescription.length>500?"Length should be less than 500":''}
                inputProps={{ maxLength: 500 }}
                onFocus={() => ValidateFocusSkillboundary("skillDescription")}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} className={classes.noMarginTop}>
            <Grid item xs={8}>
              <lable className={classes.chipSelectHeading}>
              Business Line / Customer Type <span className={classes.star}>*</span>
              </lable>
              <Autocomplete
                multiple
                limitTags={5}
                id="business-line"
                className={classes.chipSelect}
                options={
                  [
                    { Id: 0, BusinessLineName: "Select All" },
                    ...allBusinessLineData,
                  ] || []
                }
                disableCloseOnSelect
                loading={isLoading}
                value={businessLine}
                onChange={(e, newValue) => {
                  const newvalues = filteredValuesforOnChange(
                    newValue,
                    businessLine
                  );
                  setSelectedBusinessLine(newvalues);
                  setFlagforIcon(newvalues);
                }}
                getOptionLabel={(option) => option.BusinessLineName}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      checked={
                        selected ||
                        getCheckedFlag(option, businessLine, "BusinessLineName")
                      }
                      indeterminate={
                        option.BusinessLineName === "Select All" ? true : false
                      }
                      indeterminateIcon={
                        <IndeterminateCheckBoxIcon
                          color={
                            selectAllIconFlag.businessLine ? "primary" : ""
                          }
                        />
                      }
                      color="primary"
                    />
                    <div className={classes.checkboxLabel}>
                      {option.BusinessLineName}
                    </div>
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder={
                      businessLine.length
                        ? "Select Business Line / Customer Type"
                        : "Select Business Line / Customer Type"
                    }
                    className={classes.chipSelectInput}
                    onBlur={() => ValidateSkillboundary("businessLine")}
                    error={flagForVaidateBusinessLine}
                    onFocus={() => ValidateFocusSkillboundary("businessLine")}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} className={classes.noMarginTop}>
            <Grid item xs={8}>
              <lable className={classes.chipSelectHeading}>
              NAIC / SIC Mapping <span className={classes.star}>*</span>
              </lable>
              <Autocomplete
                multiple
                limitTags={5}
                id="customer-type"
                className={classes.chipSelect}
                options={
                  [
                    { Id: 0, CustomerTypeName: "Select All" },
                    ...allCustomerTypeData,
                  ] || []
                }
                disableCloseOnSelect
                loading={isLoading}
                value={customerType}
                onChange={(e, newValue) => {
                  const newvalues = filteredValuesforOnChange(
                    newValue,
                    customerType
                  );

                  setSelectedCustomerType(newvalues);

                  setFlagforIconCustomerType(newvalues);
                }}
                getOptionLabel={(option) => option.CustomerTypeName}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      checked={
                        selected ||
                        getCheckedFlag(option, customerType, "CustomerTypeName")
                      }
                      indeterminate={
                        option.CustomerTypeName === "Select All" ? true : false
                      }
                      indeterminateIcon={
                        <IndeterminateCheckBoxIcon
                          color={
                            selectAllIconFlag.customerType ? "primary" : ""
                          }
                        />
                      }
                      color="primary"
                    />
                    <div className={classes.checkboxLabel}>
                      {option.CustomerTypeName}
                    </div>
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder={
                      customerType.length
                        ? "Select  NAIC / SIC Mapping"
                        : "Select  NAIC / SIC Mapping"
                    }
                    className={classes.chipSelectInput}
                    onBlur={() => ValidateSkillboundary("customerType")}
                    error={flagForVaidateCustomerType}
                    onFocus={() => ValidateFocusSkillboundary("customerType")}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} className={classes.noMarginTop}>
            <Grid item xs={8}>
              <lable className={classes.chipSelectHeading}>
                Request Type <span className={classes.star}>*</span>
              </lable>
              <Autocomplete
                multiple
                limitTags={5}
                id="request-type"
                className={classes.chipSelect}
                options={
                  [
                    { Id: 0, RequestTypeName: "Select All" },
                    ...allRequestTypeData,
                  ] || []
                }
                disableCloseOnSelect
                loading={isLoading}
                value={requestType}
                onChange={(e, newValue) => {
                  const newvalues = filteredValuesforOnChange(
                    newValue,
                    requestType
                  );
                  setSelectedRequestType(newvalues);
                  setFlagforIconRequestType(newvalues);
                }}
                getOptionLabel={(option) => option.RequestTypeName}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      checked={
                        selected ||
                        getCheckedFlag(option, requestType, "RequestTypeName")
                      }
                      indeterminate={
                        option.RequestTypeName === "Select All" ? true : false
                      }
                      indeterminateIcon={
                        <IndeterminateCheckBoxIcon
                          color={selectAllIconFlag.requestType ? "primary" : ""}
                        />
                      }
                      color="primary"
                    />
                    <div className={classes.checkboxLabel}>
                      {option.RequestTypeName}
                    </div>
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder={
                      requestType.length
                        ? "Select Request Type"
                        : "Select Request Type"
                    }
                    className={classes.chipSelectInput}
                    onBlur={() => ValidateSkillboundary("requestType")}
                    error={flagForVaidateRequestType}
                    onFocus={() => ValidateFocusSkillboundary("requestType")}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} className={classes.noMarginTop}>
            <Grid item xs={8}>
              <lable className={classes.chipSelectHeading}>
                Product Type <span className={classes.star}>*</span>
              </lable>
              <Autocomplete
                multiple
                limitTags={5}
                id="product-type"
                className={classes.chipSelect}
                options={
                  [{ Id: 0, ProdName: "Select All" }, ...allProducts?.data] ||
                  []
                }
                disableCloseOnSelect
                loading={isLoading}
                value={productTypes}
                onChange={(e, newValue) => {
                  const newvalues = filteredValuesforOnChange(
                    newValue,
                    productTypes
                  );
                  setSelectedProducts(newvalues);
                  setFlagforIconProducts(newvalues);
                  if (!newvalues.length) {
                    setSelectedService([]);
                  }
                }}
                getOptionLabel={(option) => option.ProdName}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      checked={
                        selected ||
                        getCheckedFlag(option, productTypes, "ProdName")
                      }
                      indeterminate={
                        option.ProdName === "Select All" ? true : false
                      }
                      indeterminateIcon={
                        <IndeterminateCheckBoxIcon
                          color={
                            selectAllIconFlag.productTypes ? "primary" : ""
                          }
                        />
                      }
                      color="primary"
                    />
                    <div className={classes.checkboxLabel}>
                      {option.ProdName}
                    </div>
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder={
                      productTypes.length
                        ? "Select Product Type"
                        : "Select Product Type"
                    }
                    className={classes.chipSelectInput}
                    onBlur={() => ValidateSkillboundary("productTypes")}
                    error={flagForVaidateProductType}
                    onFocus={() => ValidateFocusSkillboundary("productTypes")}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} className={classes.noMarginTop}>
            <Grid item xs={8}>
              <lable className={classes.chipSelectHeading}>
                Service Type <span className={classes.star}>*</span>
              </lable>
              <Autocomplete
                multiple
                limitTags={5}
                id="service-type"
                className={classes.chipSelect}
                options={servicesByProductId?.Data || []}
                disableCloseOnSelect
                loading={isLoading}
                value={selectedServices || []}
                onChange={(e, newValue) => {
                  const newvalues = filteredValuesforOnChange(
                    newValue,
                    selectedServices
                  );
                  if (newvalues.length < selectedServices.length)
                    setSelectedService(newvalues);
                }}
                getOptionLabel={(option) => option.ProdName}
                renderOption={(props, option, { selected }) => (
                  <>
                    <optgroup label={option["ProdName"]} />
                    {option &&
                      option["Services"].length &&
                      [
                        { Id: 0, ServiceId: 0, ServiceName: "Select All" },
                        ...option["Services"],
                      ].map((service) => (
                        <li {...props} key={service["Id"]}>
                          <Checkbox
                            value={service["Id"]}
                            icon={icon}
                            checkedIcon={checkedIcon}
                            checked={getChecked(service["Id"])}
                            onChange={(e) => {
                              getAndSetServicesValues(option, e.target.value);
                            }}
                            indeterminate={service.ServiceId === 0 && true}
                            indeterminateIcon={
                              <IndeterminateCheckBoxIcon
                                color={
                                  selecteServiceTypesCheck[`${option.Id}`] ===
                                  true
                                    ? "primary"
                                    : ""
                                }
                              />
                            }
                            color="primary"
                          />
                          <div
                            key={service["ServiceName"]}
                            className={classes.checkboxLabel}
                          >
                            {service["ServiceName"]}
                          </div>
                        </li>
                      ))}
                  </>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder={
                      selectedServices.length
                        ? "Select Service Type"
                        : "Select Service Type"
                    }
                    className={classes.chipSelectInput}
                    onBlur={() => ValidateSkillboundary("selectedServices")}
                    error={flagForVaidateServiceType}
                    onFocus={() =>
                      ValidateFocusSkillboundary("selectedServices")
                    }
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} className={classes.noMarginTop}>
            <Grid item xs={8}>
              <lable className={classes.chipSelectHeading}>
                Product Action <span className={classes.star}>*</span>
              </lable>
              <Autocomplete
                multiple
                limitTags={5}
                id="product-action"
                className={classes.chipSelect}
                options={
                  [
                    { Id: 0, ActionName: "Select All" },
                    ...allProductActionData,
                  ] || []
                }
                disableCloseOnSelect
                loading={isLoading}
                value={productAction}
                onChange={(e, newValue) => {
                  const newvalues = filteredValuesforOnChange(
                    newValue,
                    productAction
                  );
                  setSelectedProductAction(newvalues);
                  setFlagforIconProductAction(newvalues);
                }}
                getOptionLabel={(option) => option.ActionName}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      checked={
                        selected ||
                        getCheckedFlag(option, productAction, "ActionName")
                      }
                      indeterminate={
                        option.ActionName === "Select All" ? true : false
                      }
                      indeterminateIcon={
                        <IndeterminateCheckBoxIcon
                          color={
                            selectAllIconFlag.productAction ? "primary" : ""
                          }
                        />
                      }
                      color="primary"
                    />
                    <div className={classes.checkboxLabel}>
                      {option.ActionName}
                    </div>
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder={
                      productAction.length
                        ? "Select Product Action"
                        : "Select Product Action"
                    }
                    className={classes.chipSelectInput}
                    onBlur={() => ValidateSkillboundary("productAction")}
                    error={flagForVaidateProductAction}
                    onFocus={() => ValidateFocusSkillboundary("productAction")}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} className={classes.noMarginTop}>
            <Grid item xs={8}>
              <lable className={classes.chipSelectHeading}>
                Primary Team Member(s) <span className={classes.star}>*</span>
              </lable>
              <Autocomplete
                multiple
                limitTags={5}
                id="primary-team-member"
                className={classes.chipSelect}
                options={
                  (allPodMembers.length && [
                    { id: 0, AgentName: "Select All" },
                    ...allPodMembers,
                  ]) ||
                  []
                }
                disableCloseOnSelect
                loading={isLoading}
                value={primaryTeamMember}
                onChange={(e, newValue) => {
                  const newvalues = filteredValuesforOnChange(
                    newValue,
                    primaryTeamMember
                  );
                  if (!newvalues.length) {
                    setSecondryMemberDropdownValues([]);
                    setSelectedSecondaryTeamMembers([]);

                    setFormData({
                      ...formData,
                      primaryTeamMember: [],
                      secondaryTeamMember: [],
                    });
                    // setFormData({ ...formData, secondaryTeamMember: [] });

                    return;
                  }

                  setSelectedPrimaryTeamMembers(newvalues);

                  setFlagforIconPrimaryTeamMembers(newvalues);
                }}
                getOptionLabel={(option) => option.AgentName}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      checked={
                        selected ||
                        getCheckedFlag(option, primaryTeamMember, "AgentName")
                      }
                      indeterminate={
                        option.AgentName === "Select All" ? true : false
                      }
                      indeterminateIcon={
                        <IndeterminateCheckBoxIcon
                          color={
                            selectAllIconFlag.primaryTeamMember ? "primary" : ""
                          }
                        />
                      }
                      color="primary"
                    />
                    <div className={classes.checkboxLabel}>
                      {option.AgentName}
                    </div>
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder={
                      primaryTeamMember.length
                        ? "Select Primary Team Members"
                        : "Select Primary Team Members"
                    }
                    className={classes.chipSelectInput}
                    onBlur={() => ValidateSkillboundary("primaryTeamMember")}
                    error={flagForVaidatePrimaryMembers}
                    onFocus={() =>
                      ValidateFocusSkillboundary("primaryTeamMember")
                    }
                  />
                )}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3} className={classes.noMarginTop}>
            <Grid item xs={8}>
              <lable className={classes.chipSelectHeading}>
                Secondary Team Member(s)
              </lable>
              <Autocomplete
                multiple
                limitTags={5}
                id="secondary-team-member"
                className={classes.chipSelect}
                options={
                  (secondryMembersDropdownValue.length && [
                    { id: 0, AgentName: "Select All" },
                    ...secondryMembersDropdownValue,
                  ]) ||
                  []
                }
                disableCloseOnSelect
                loading={isLoading}
                value={secondaryTeamMember}
                onChange={(e, newValue) => {
                  const newvalues = filteredValuesforOnChange(
                    newValue,
                    secondaryTeamMember
                  );

                  setSelectedSecondaryTeamMembers(newvalues);
                  setFlagforIconSecondaryTeamMembers(newvalues);
                }}
                getOptionLabel={(option) => option.AgentName}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      checked={
                        selected ||
                        getCheckedFlag(option, secondaryTeamMember, "AgentName")
                      }
                      indeterminate={
                        option.AgentName === "Select All" ? true : false
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
                    <div className={classes.checkboxLabel}>
                      {option.AgentName}
                    </div>
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder={
                      primaryTeamMember.length
                        ? "Select Secondary Team Members"
                        : "Select Secondary Team Members"
                    }
                    className={classes.chipSelectInput}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={8}>
              {!btnLoading ? (
                <Box mt={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSaveDialog}
                    style={{ fontSize: "16px" }}
                    disabled={disableCheck(formData)}
                  >
                    Save
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleCancel()}
                    style={{ fontSize: "16px" }}
                  >
                    Cancel
                  </Button>
                </Box>
              ) : (
                <Box>
                  <CircularProgress />
                </Box>
              )}
            </Grid>
          </Grid>
        </div>
      )}
      {openDialogCopyForm === true && (
        <ViewDialog
          name="copyform"
          title={"Copy From"}
          loading={copySkillLoading}
          message={skillsName()}
          showCancelBtn={true}
          showSaveBtn={true}
          showOkBtn={false}
          clickOutsideToClose={onConfirmDialogCopyForm}
          showdisableBtn={skillsList == null ? true : false}
          setOpen={setOpenDialogCopyForm}
        />
      )}
      {saveDialog && (
        <ConfirmDialog
          name="auditrail"
          title={`Do you want to update ${skillName}?`}
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
      {saveSuccessDialog && (
        <ConfirmDialog
          name="auditrail"
          title={"Updated!"}
          successIcon={true}
          message={`${skillName} updated sucessfully!`}
          saveText={"Okay"}
          onSave={HandleAfterSave}
          showSaveBtn={true}
          showCancelBtn={false}
          showOkBtn={false}
          setOpen={setSaveDialog}
          //onCancel={handleSaveCancel}
        />
      )}
    </>
  );
});

export default AddSkill;
